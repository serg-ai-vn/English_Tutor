---
title: "Refresher Plan — Lessons 1–8 (before Lesson 9)"
created: 2026-10-27
updated: 2026-10-27
tags: [english, lesson, refresher, track-a]
status: planned
related: [progress.json, ../AGENTS.md, LESSON_START.md, ../track_B/local/protocol.md]
---

# Refresher — review of Lessons 1–8

**Mode:** practice; refresher after a break (no advancement of lesson number).
**Next scheduled lesson after this refresher:** Lesson 9, Week 2 Day 2.
**Goal:** rebuild recall and confidence using only previously covered grammar and introduced course material.
**Main skills:** grammar accuracy and spoken fluency.
**planned_learning_min:** 45
**actual_learning_min:** null (await explicit learner response at closure)
**model_wait_min:** null
**Hard cap:** 60 minutes; waiting for model/agent output is not productive learning time.

| Block | Minutes | Agent / Prompt | Expected result |
|---|---:|---|---|
| SRS review | 5–7 | `srs_review` | One package of 5 oldest-due cards, one combined evaluation, at most one combined retry |
| Grammar refresher | 18 | `grammar_lesson` → `check_grammar` | Brief contrasts of all covered topics and 6 check sentences; no new rules |
| Speaking refresher | 20 | `tutor_speaking` | 4–5 meaningful learner turns on previously introduced course facts and figures, with delayed correction |
| **Total planned** | **45** | | |

## SRS reviews — canonical P21 batch

- Selection condition: `status != deprecated`, `reps > 0`, `due_lesson <= 9`.
- Sort: `(due_lesson ASC, lapses DESC, id ASC)`; take first 5.
- `initial_learner_active_target_min: 5`; `bundled_retry_cap_min: 2`; excess active SRS time reduces the grammar portion, with no lesson extension.
- Show only `front` during first retrieval, in one numbered batch; answers 1–5 in a single reply; `не помню` allowed.

1. id 15 (due 6, lapses 0) — front: The data clearly shows a strong link between Decision 2371 and the surge in demand for English teachers.
2. id 50 (due 6, lapses 0) — front: The reform covers about 30 million students across 50,000 institutions.
3. id 51 (due 6, lapses 0) — front: Decision 2371 makes English compulsory from Grade 1 in 2026/27 and aims to make English a second language by 2035.
4. id 54 (due 6, lapses 0) — front: The number that really stands out is that Vietnam needs 22,000 more English teachers by 2030.
5. id 39 (due 7, lapses 1) — front: undermine (v) — Students using AI to cheat undermines trust in the new technology.

No new SRS items on a refresher. Do not modify unshown cards.

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

- Any structure not explicitly in the `covered_grammar` list is `not yet covered — info`, without score deduction, grammar drill, or SRS candidate.
- No new C1 patterns, facts, or vocabulary required.

## Agent payload

- `mode: practice`; `lesson_number: 9` for SRS due filtering only; `session_kind: Refresher`.
- Grammar: short English-language recap of present simple vs present continuous; past simple vs past continuous and used to; present perfect vs past simple with for/since/already/yet; practiced passive forms; will vs be going to. Exactly 6 discriminating sentences spanning these covered contrasts. Correct target mistakes only, at most two priority corrections, one short retry. No new grammar.
- Speaking: 4–5 turns building from basic description of learning English THROUGH using AI to explain the Vietnam education reform figures and the market need, with optional transfer to teaching or daily work. Require only supplied introduced material. Never assume an external fact is verified beyond its status as previously learned course material. Do not enter mock-pitch role. Fluency-first: delayed feedback, at most 3 high-value corrections, one focused retry.
- Use `track_B/prompts/analytics_contract.md` quietly; record verbatim learner utterances and only judge previously covered grammar.
- All exercises and learning materials are given directly in chat, in English. Switch to Russian only if specifically requested.

## Closure

- [ ] SRS batch completed; update only the shown cards.
- [ ] Grammar refresher completed; 6 check sentences reviewed.
- [ ] Speaking refresher completed; 4–5 conversational turns.
- [ ] Ask and record actual learner-active time in whole minutes; model wait separately if applicable.
- [ ] Record Refresher (not numbered Lesson 9 completed) in log, DB and session files, then update progress note/last date without incrementing `days_completed`.
- [ ] GitHub main synchronized after closure.
