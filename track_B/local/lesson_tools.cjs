/* Read-only CLI and pure helpers. No network access, credentials, or implicit writes. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const invariant=(x,m)=>{if(!x)throw new Error(m);};
const clone=x=>structuredClone(x);
function queue(cards,n){return cards.filter(c=>c.status!=='deprecated'&&c.reps>0&&c.due_lesson<=n).sort((a,b)=>a.due_lesson-b.due_lesson||b.lapses-a.lapses||a.id-b.id).slice(0,5);}
function interval(card,result,policy){
 invariant(['easy','lapse'].includes(result),'Unknown review result');
 if(result==='lapse')return 1;
 return policy.success_intervals.find(n=>n>card.interval_lessons)||policy.maximum;
}
function canIssue(elapsed,estimatedMinutes,lastStep=false,stop=false){
 if(stop||lastStep)return false;
 if(elapsed===null)return true; // Step-only fallback; no claim of elapsed-time enforcement.
 invariant(Number.isFinite(elapsed)&&elapsed>=0,'Invalid elapsed time');
 invariant(Number.isFinite(estimatedMinutes)&&estimatedMinutes>=0,'Missing task budget');
 return elapsed<25&&elapsed+estimatedMinutes<=25;
}
function unique(rows,key,label){const seen=new Set();for(const r of rows){if(r[key]===undefined)continue;invariant(!seen.has(r[key]),'Duplicate '+label+': '+r[key]);seen.add(r[key]);}}
function prepareClosure(state,payload,policy){
 invariant(payload.session?.session_id,'session_id required');
 const existing=state.lesson_sessions.find(s=>s.session_id===payload.session.session_id);
 if(existing){invariant(JSON.stringify(existing)===JSON.stringify(payload.session),'Conflicting replay of session');return {state:clone(state),status:'already_prepared'};}
 invariant(payload.expected_days_completed===state.progress.days_completed,'Stale progress');
 invariant(Number.isInteger(payload.session.actual_learning_min)&&payload.session.actual_learning_min>=0,'actual_learning_min required');
 const refresher=payload.session.session_kind==='Refresher',n=state.progress.days_completed+1;
 invariant(payload.session.lesson_number===n,'Wrong lesson number');
 const reviews=payload.reviews||[],introduced=payload.new_cards||[];
 invariant(reviews.length<=5,'Review cap');unique(reviews,'id','review');
 const eligible=new Set(queue(state.srs_items,n).map(c=>c.id));
 for(const r of reviews)invariant(eligible.has(r.id),'Unplanned review');
 invariant(introduced.length<=(refresher?0:2),'New-card cap');
 for(const c of introduced)invariant(c.status==='active'&&c.reps===1&&c.due_lesson===n+1&&c.interval_lessons===1&&c.retrieval_confirmed===true,'Unconfirmed new card');
 const out=clone(state);
 for(const r of reviews){const c=out.srs_items.find(c=>c.id===r.id);c.interval_lessons=interval(c,r.result,policy);c.due_lesson=n+c.interval_lessons;if(r.result==='easy')c.reps++;else c.lapses++;}
 out.srs_items.push(...clone(introduced));unique(out.srs_items,'id','SRS');
 out.lesson_sessions.push(clone(payload.session));
 for(const name of ['daily_tasks','error_events','speaking_recordings','assessments']){
   out[name]||=[];for(const r of payload[name]||[]){invariant(r.session_id===payload.session.session_id,'Wrong session link');out[name].push(clone(r));}unique(out[name],'id',name);
 }
 if(!refresher){out.progress.days_completed=n;out.progress.current_week=Math.floor(n/7)+1;out.progress.current_day=n%7+1;}
 out.progress.last_completed_date=payload.session.lesson_date;
 return {state:out,status:'prepared_not_verified'};
}
function hash(text){return crypto.createHash('sha256').update(text).digest('hex');}
function verifyReceipt(receipt){
 if(receipt.error||receipt.conflict||receipt.branch!=='main'||receipt.commit_in_main!==true||receipt.main_files_checked!==true)return false;
 if(!/^[a-f0-9]{40}$/.test(receipt.commit||'')||!receipt.expected||!Object.keys(receipt.expected).length)return false;
 return Object.entries(receipt.expected).every(([p,h])=>receipt.published?.[p]===h&&receipt.current_main?.[p]===h);
}
function validate(root){
 const load=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
 const names=['lesson_sessions','daily_tasks','error_events','speaking_recordings','assessments','error_log','srs_items'];
 const db=Object.fromEntries(names.map(n=>[n,load('track_B/local/db/'+n+'.json')]));
 for(const [n,rows]of Object.entries(db)){invariant(Array.isArray(rows),n+' must be array');unique(rows,'id',n);}
 const progress=load('track_A/progress.json'),program=load('track_A/program/program.json');
 const sessions=db.lesson_sessions.filter(s=>s.session_kind!=='Refresher');
 unique(sessions,'lesson_number','ordinary lesson');unique(db.lesson_sessions,'session_id','session');
 invariant(Math.max(...sessions.filter(s=>s.completed).map(s=>s.lesson_number))===progress.days_completed,'Progress/session mismatch');
 invariant(progress.current_week===Math.floor(progress.days_completed/7)+1&&progress.current_day===progress.days_completed%7+1,'Cycle mismatch');
 const ids=new Set(db.lesson_sessions.map(s=>s.session_id).filter(Boolean));
 for(const name of ['daily_tasks','error_events','speaking_recordings'])for(const r of db[name]){
   if(r.session_id)invariant(ids.has(r.session_id),'Unresolved session in '+name);
   if(r.source_event_id)invariant(db.error_events.some(e=>e.id===r.source_event_id),'Unresolved event');
 }
 for(const s of db.lesson_sessions.filter(s=>s.session_id)){
   invariant(Number.isInteger(s.actual_learning_min),'Missing actual learning time');
   invariant(fs.existsSync(path.join(root,'track_A/logs/'+s.lesson_date+'.md')),'Missing daily log');
 }
 const targets=new Set();
 for(const c of db.srs_items){
   invariant(Number.isInteger(c.id)&&Number.isInteger(c.reps)&&c.reps>=0&&Number.isInteger(c.lapses)&&c.lapses>=0,'Invalid SRS fields');
   invariant(Number.isInteger(c.due_lesson)&&Number.isInteger(c.interval_lessons),'Invalid SRS timing');
   if(c.status==='deprecated')continue;
   invariant(['meaning','definition','gapfill'].includes(c.exercise_type)&&c.front&&c.back&&c.answer_criteria&&c.accepted_answers?.length,'Incomplete SRS contract '+c.id);
   invariant(!targets.has(c.retrieval_target),'Duplicate target '+c.id);targets.add(c.retrieval_target);
   invariant(c.status!=='seed'||c.reps===0,'Seed already learned');
   invariant(c.exercise_type==='gapfill'||!c.front.includes(' / '),'Multiple targets '+c.id);
 }
 const days=program.weeks.flatMap(w=>w.days);invariant(days.length===84,'Wrong program length');
 for(const d of days)invariant(d.blocks.reduce((n,b)=>n+b.duration_min,0)===30,'Daily budget mismatch');
 for(const e of progress.material_exposure||[])invariant(e.status!=='explained'||e.retrieval_confirmed===false,'Exposure promoted to mastery');
 const migration=load('track_B/local/migrations/P26_srs.json');
 for(const m of migration.migrations){if(!m.before)continue;const now=db.srs_items.find(c=>c.id===m.id);invariant(now,'Lost old card');for(const field of ['reps','lapses','due_lesson','interval_lessons'])invariant(m.after[field]===m.before[field],'Migration rewrote history '+m.id);if(m.action==='editorial_same_target'){for(const example of [m.before.front,m.before.example].filter(Boolean))invariant(now.examples.includes(example),'Example lost');}}
 return {ok:true,json_tables:names.length,days:days.length,next_lesson:progress.days_completed+1,queue:queue(db.srs_items,progress.days_completed+1).map(c=>c.id)};
}
module.exports={queue,interval,canIssue,prepareClosure,hash,verifyReceipt,validate};
if(require.main===module){try{const root=path.resolve(__dirname,'../..'),command=process.argv[2]||'validate';if(command==='validate')console.log(JSON.stringify(validate(root)));else if(command==='queue'){const cards=JSON.parse(fs.readFileSync(path.join(__dirname,'db/srs_items.json'),'utf8'));const n=Number(process.argv[3]);invariant(Number.isInteger(n)&&n>0,'Lesson number required');console.log(JSON.stringify(queue(cards,n).map(c=>({id:c.id,front:c.front,exercise_type:c.exercise_type}))));}else throw Error('Use validate or queue N');}catch(e){console.error(e.message);process.exitCode=1;}}
