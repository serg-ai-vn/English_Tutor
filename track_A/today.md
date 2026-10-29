---
title: "Lesson 9 — Week 2 Day 2 — Why Now? Speaking"
created: 2026-10-29
updated: 2026-10-29
tags: [english, lesson, speaking, track-a]
status: planned
related: [progress.json, LESSON_START.md, ../AGENTS.md, ../track_B/local/protocol.md]
---

# Lesson 9 — Week 2, Day 2: Why Now?

**Mode:** practice; standard scheduled lesson.
**Goal:** Explain why the proposed AI-English course is timely, using previously learned facts about the Vietnamese education reform and the English-teacher shortage.
**Main skill:** speaking — fluency and accurate use of already covered Present Perfect and other covered grammar.
**planned_learning_min:** 30
**actual_learning_min:** null (ask learner at Closure)
**model_wait_min:** null (record only if measured)
**hard_cap_min:** 35
**stop_new_questions_at_elapsed_min:** 25
**lesson_started_at:** null (set at learner plan confirmation if an actual clock is available)
**time_source:** pending_confirmation
**elapsed_min:** null
**step_index:** 0
**step_total:** 2 (lesson blocks; per-block step limits below)
**stop_new_tasks:** false

| Block | Minutes | Agent / Prompt | Expected result |
|---|---:|---|---|
| 1/2 — SRS review | 5 | `srs_review` | Exactly one batch of the first five oldest-due cards; one combined check; at most one bundled retry of incorrect cards |
| 2/2 — Speaking | 25 | `tutor_speaking` | Exactly 3 meaningful learner turns: warm-up, course/market explanation, transfer into work or everyday context; delayed feedback, at most 3 corrections, 2 chunks and one brief retry of one phrase |
| **Total** | **30** | | Stop new questions by elapsed minute 25 or after final allotted step, whichever is first; hard cap 35 |

## SRS reviews — canonical ordered batch

- Eligibility: `status != deprecated`, `reps > 0`, `due_lesson <= 9`.
- Sort: `due_lesson ASC, lapses DESC, id ASC` and use the first five only.
- `srs_step_total: 2` — (1) one numbered package, all responses in one message; (2) combined check and at most one bundled retry for incorrect items.
- `initial_learner_active_target_min: 3-4`, `total_srs_target_min: 5`, `bundled_retry_cap_min: 2`.
- Additional SRS learner-active time reduces speaking time and never extends the lesson.
- Show only these `front` fields during initial retrieval, never `back` before the learner's first answer.

1. id 40 (due 7, lapses 1, type vocab) — front: mitigate (v) — Guardrails help mitigate the risks of AI.
2. id 42 (due 7, lapses 0, type vocab) — front: cusp (n) — We are on the cusp of a transformation in education.
3. id 43 (due 7, lapses 0, type vocab) — front: deviation (n) — Tutoring lifts students two standard deviations above average.
4. id 44 (due 7, lapses 0, type vocab) — front: distribution (n) — A normal distribution shows most scores in the middle.
5. id 52 (due 7, lapses 0, type chunk) — front: English centers are ready to buy off-the-shelf programs.

## Speaking — strictly 3 turns (P25)

- Theme: **Why Now?** Vietnam's English-education reform, staffing shortage, the urgency of a practical AI-English course.
- `speaking_step_total: 3`: [Ход 1 из 3] brief warm-up; [Ход 2 из 3] longer explanation of why now with previously learned figures; [Ход 3 из 3] transfer to the learner's teaching/work or ordinary life.
- Practice previously covered Present Perfect in the replies where context permits; do not introduce or require any new C1 grammar/pattern.
- No fourth speaking question. After turn 3 (or the 25-minute stop): delayed feedback, at most 3 high-value corrections, at most 2 useful chunks (not introduced as new required material), and one brief retry of one corrected phrase.
- Use only facts in `introduced_material`; treat reform numbers as previously studied material rather than externally verified facts.
- Follow `track_B/prompts/tutor_speaking.md` and `track_B/prompts/analytics_contract.md`.

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

- All grammar not explicitly present in `covered_grammar` is `not yet covered - info` and must not trigger a score penalty, drill, SRS error card, or aggregated error log. Keep raw events privately for analytics when relevant.
- No new C1 patterns or vocabulary are required for today's speaking block.

## Agent payload and timing guard

- `lesson_number: 9`; `week: 2`; `day: 2`; `mode: practice`; `session_kind: Lesson`.
- Provide this plan, the block-specific payload, and the literal `track_B/prompts/analytics_contract.md` to each read-only role in sequence. The orchestrator is the only writer.
- Per role, supply `step_index`, `step_total`, `elapsed_min` (or null), `time_source` and `stop_new_tasks`.
- First line of each learner-facing **teaching** message: `⏱ [Блок X/2 | Шаг Y из Z | ~M/30 мин]`. When no clock is available, use `~?/30 мин` and rely on Step Budget without inventing measured time.
- Start lesson timer only after the learner confirms this plan; stop new questions at measured minute 25, at the last permitted step, or earlier if the learner stops. Safety hard cap 35.
- All prompts, cards, examples and exercises are shown in the chat. Learner explanations/tasks default to English.

## Closure

- [ ] SRS: record learner responses, update only cards actually reviewed.
- [ ] Speaking: capture 3 learner turns or earlier timebox stop; delayed corrections; limited retry.
- [ ] Obtain integer `actual_learning_min` from learner; `model_wait_min` only if known.
- [ ] Update the canonical lesson log, relevant JSON tables, `progress.json`, `session.md`, and this file (`status: completed`) after the timing gate.
- [ ] Commit/synchronize the completed lesson to GitHub `main`.
