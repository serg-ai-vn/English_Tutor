---
title: "Lesson 10 — Week 2 Day 3 — Parents, IELTS and Value of English Learning"
created: 2026-10-30
updated: 2026-10-30
tags: [english, lesson, reading, track-a]
status: completed
related: [progress.json, LESSON_START.md, ../AGENTS.md, ../track_B/local/protocol.md]
---

# Lesson 10 — Week 2, Day 3: Parents, IELTS and Value of English Learning

**Mode:** practice; standard scheduled lesson.
**Goal:** Read and understand a short text about parents' education spending, exam preparation and the difference between test results and practical communication.
**Main skill:** reading — identify the main message, distinguish details and inference, and summarize in your own words.
**planned_learning_min:** 30
**actual_learning_min:** 35 (learner explicitly reported)
**model_wait_min:** null (only record measured wait)
**hard_cap_min:** 35
**stop_new_questions_at_elapsed_min:** 25
**lesson_started_at:** 2026-10-30T07:53:33+07:00 (learner confirmed plan)
**time_source:** platform_local_clock (time widget)
**elapsed_min:** 37 (last measured at 08:30:34; not learner-active time)
**step_index:** 2
**step_total:** 2
**stop_new_tasks:** true

| Block | Minutes | Agent / Prompt | Expected result |
|---|---:|---|---|
| 1/2 — SRS review | 5 | `srs_review` | One numbered package of first five oldest-due cards; single combined check; at most one bundled retry for incorrect items |
| 2/2 — Reading | 25 | `reading_tutor` | Up to 3 necessary pre-words, 8–10-sentence text with >=70% new facts, exactly 2 comprehension questions, then 30–45-second summary (2–3 sentences), maximum 2 corrections, up to 2 SRS chunk candidates |
| **Total** | **30** | | At measured elapsed minute 25 (or last step) stop new questions and close; hard cap 35 |

## SRS reviews — canonical ordered batch

- `lesson_number: 10`; filter `status != deprecated`, `reps > 0`, `due_lesson <= 10`.
- Sort strictly `(due_lesson ASC, lapses DESC, id ASC)`; select first 5, leaving others unmodified.
- `srs_step_total: 2`: (1) show all five numbered `front` only and receive one combined reply; (2) one combined check, with at most one bundled retry for wrong answers.
- `initial_learner_active_target_min: 3-4`; `total_srs_target_min: 5`; `bundled_retry_cap_min: 2`. Any excess over five minutes replaces reading time.
- Do not reveal `back` until the learner responds.

1. id 15 (due 9, lapses 1, pattern) — front: The data clearly shows a strong link between Decision 2371 and the surge in demand for English teachers.
2. id 54 (due 9, lapses 1, pattern) — front: The number that really stands out is that Vietnam needs 22,000 more English teachers by 2030.
3. id 25 (due 9, lapses 0, chunk) — front: English is learned THROUGH commanding AI: the child uses English as a key to solve real tasks.
4. id 49 (due 9, lapses 0, chunk) — front: As of May 2026, there were 102,097 unfilled teaching positions nationwide, about 22,000 of them in English.
5. id 53 (due 9, lapses 0, chunk) — front: There is a striking mismatch between national ambitions and on-the-ground capacity.

## Reading — strictly 2 steps (P25)

- Theme from `program.json`, Week 2 Day 3: parents' stress around education costs, the IELTS test-preparation bubble, and reported willingness to spend 29–47% of family budget on education. Distinguish numbers from interpretations; do not invent statistics or imply that different expenditure figures have identical denominators.
- `reading_step_total: 2`. Step 1: explain at most 3 essential words with brief Russian glosses; print complete 8–10-sentence reading text in chat, >=70% of facts new relative to `introduced_material`, any review sentences explicitly marked `(review)`; ask exactly 2 questions (gist; detail/inference) in one message.
- Step 2: after comprehension reply, ask for a 30–45-second summary (2–3 sentences); after learner's answer give at most 2 high-value corrections and select up to 2 useful chunks (one professional and one general-use), without extra questions.
- No additional C1 pattern or unintroduced grammar required; every learning prompt and reading text appears in the chat.
- Apply `track_B/prompts/reading_tutor.md` and `track_B/prompts/analytics_contract.md`.

## covered_grammar

- Present simple vs present continuous for facts, routines, and current changes (Lesson 1)
- Past simple vs past continuous and used to (Lesson 2)
- Present perfect with for, since, already, and yet, contrasted with past simple (Lesson 3)
- Practised passive forms: is designed, is being repositioned, has been made (Lesson 3)
- Will vs be going to for spontaneous decisions, belief predictions, existing plans/intentions, and evidence-based predictions (Lesson 8)

## introduced_material

- S14: The number that really stands out is that + clause.
- S15: The data clearly shows a strong link between + noun phrase A + and + noun phrase B.
- There is a striking mismatch between national ambitions and on-the-ground capacity.
- English is learned THROUGH commanding AI: the child uses English as a key to solve real tasks.
- The IELTS bubble: families spend up to 100 million VND on test preparation, yet children cannot hold a conversation.
- The white spot: nobody offers English through AI project work with a public English defense for 10-14-year-olds.
- Decision 2371 and the learned reform figures in SRS ids 26 and 49-51 (102,097 unfilled teaching positions, ~22,000 in English; 30 million students across 50,000 institutions; compulsory from Grade 1 in 2026/27, second language by 2035).
- English centers are ready to buy off-the-shelf programs.
- Vocab ids 39-41: undermine (v), mitigate (v), guardrails (n).
- Grammar minimal-pair cards ids 60-61: will (decision now / belief prediction) vs be going to (existing plan / present evidence).

## not_scored_yet

- Grammar outside `covered_grammar` = `not yet covered - info`; no penalty, unsolicited drill, aggregated `error_log` entry or SRS error card; raw events may be saved privately as analytics.

## Agent payload and timing guard

- `lesson_number: 10`; `week: 2`; `day: 3`; `mode: practice`; `session_kind: Lesson`.
- Hand current plan, relevant block-only payload, and literal `track_B/prompts/analytics_contract.md` to read-only roles sequentially; orchestrator is the only writer.
- Provide each role `step_index`, `step_total`, `elapsed_min` (or null), `time_source`, `stop_new_tasks`.
- First line of every learner-facing teaching message: `⏱ [Блок X/2 | Шаг Y из Z | ~M/30 мин]`. If system clock cannot be read, use `~?/30 мин` and step-budget guard.
- Start timer on explicit learner confirmation; stop new tasks at minute 25 or last planned step, whichever comes first. Safety hard cap 35.
- Default language English, apart from the permitted short Russian glosses for reading pre-words.

## Closure

- [x] SRS: five cards 15,54,25,49,53 reviewed, 5/5 after instruction clarification, no retry.
- [x] Reading text and 2 questions delivered; gist correct, detail partly correct; summary omitted at time limit. P25 wall-clock hard cap was exceeded.
- [x] Learner-reported actual_learning_min 35; model_wait_min null (unmeasured).
- [x] Log, JSON records, progress, session, and plan updated.
- [x] Synchronize completed lesson files to GitHub main.

## Lesson 10 outcome

SRS 5/5 ids 15,54,25,49,53, no retry; ids 15/54 now due 13, ids 25/49/53 due 16. Reading: 10 sentences, two comprehension questions; gist correct, detail partly correct. Summary skipped due elapsed time. Learner explicitly reported 35 productive minutes; waiting time not measured. Elapsed 07:53:33–08:30:34 exceeded 35-minute hard cap, a protocol violation noted without concealing it. No new cards or grammar. Next Lesson 11 Week 2 Day 4 Data Speaking.
