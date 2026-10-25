---
title: Lesson 8 Plan - Will vs Be Going To
created: 2026-09-01
updated: 2026-10-24
tags: [english, lesson, track-a, grammar]
status: completed
related: [progress.json, program/program.json, ../track_B/local/protocol.md]
---

# Lesson 8 - Week 2, Day 1

**Main skill:** grammar accuracy
**Goal:** choose naturally between `will` and `be going to` for spontaneous decisions, predictions, and plans based on present evidence, then use the contrast in course and general-work contexts.
**Planned productive learning time:** 45 minutes. **Actual productive learning time:** 40 minutes (learner's explicit answer). **Wall-clock/model wait:** not measured; excluded from productive time. **Hard cap:** 60 minutes, observed.

| Block | Minutes | Agent / Prompt | Result |
|---|---:|---|---|
| SRS review | 5 | `srs_review` | Completed (ids 41 and 49 reviewed; remaining due cards carried over to Lesson 9) |
| Narrow grammar lesson | 20 planned | `grammar_lesson` | Contrast taught and clarified; ambiguous prompt corrected |
| Grammar check | 15 planned | `check_grammar` | All four target choices correct |
| New SRS selection | 5 planned | `grammar_lesson` | Two unambiguous minimal-pair cards introduced (ids 60–61) |

## SRS reviews (Canonical P21 Batch Format)

- **Sort key:** `(due_lesson ASC, lapses DESC, id ASC)`
- **Batch size cap:** max 5 cards per lesson (single numbered batch `1–5`, one combined learner response, one combined check)
- **Timing rule:** `initial_learner_active_target_min: 5`, `bundled_retry_cap_min: 2` (model/agent generation wait excluded; any active SRS time over 5 min reduces the main block)
- **Lesson 8 historical execution note:** ids 41 and 49 were reviewed and updated (`easy`); overdue ids 15, 50, 51, 54, 39 (and 40) remain unchanged for the next oldest-due-first batch in Lesson 9.

## Planned new material ( max 2 new SRS items )

- `will` for a decision made at the moment of speaking and a prediction based mainly on opinion or belief.
- `be going to` for an existing intention/plan and a prediction based on present evidence.

## New SRS items (initialized with `status: active`, `reps: 1`, `due_lesson: 9`)

- id 60 — decision now (`will`) vs existing plan (`be going to`).
- id 61 — belief prediction (`will`) vs evidence-based prediction (`be going to`).

Both cards were read aloud and confirmed by the learner.

## introduced_material

- S14: The number that really stands out is that + clause.
- S15: The data clearly shows a strong link between + noun phrase A + and + noun phrase B.
- There is a striking mismatch between national ambitions and on-the-ground capacity.
- English is learned THROUGH commanding AI: the child uses English as a key to solve real tasks.
- The IELTS bubble: families spend up to 100 million VND on test preparation, yet children cannot hold a conversation.
- The white spot: nobody offers English through AI project work with a public English defense for 10-14-year-olds.
- Decision 2371 and the learned reform figures in SRS ids 26 and 49-51.
- English centers are ready to buy off-the-shelf programs.
- Vocab ids 39-41: undermine (v), mitigate (v), guardrails (n).
- Grammar minimal-pair cards ids 60-61 (`will` vs `be going to`).

## covered_grammar

- Present simple vs present continuous for facts, routines, and current changes.
- Past simple vs past continuous and `used to`.
- Present perfect with `for`, `since`, `already`, and `yet`, contrasted with past simple.
- Practised passive forms, including `is designed`, `is being repositioned`, and `has been made`.
- `will` vs `be going to` in the meanings explicitly taught in Lesson 8.

## not_scored_yet

- Any grammar or C1 pattern not listed in `covered_grammar` or explicitly introduced during today's grammar lesson (mark as `(not yet covered - info)` without score penalty).

## Agent payload

- `mode`: practice.
- Teach only the narrow `will` vs `be going to` contrast specified above.
- Use both an AI-course/professional context and a general-work or everyday context without adding a second lesson block.
- `grammar_lesson` gives a short contrast, 2-3 examples, and controlled attempts.
- `check_grammar` assesses only the taught contrast, shows at most two target corrections, and asks for one retry.
- All learner-facing material must appear directly in chat.
- Quiet analytics follow `track_B/prompts/analytics_contract.md`.

## Closure

- [x] SRS batch completed; only shown cards updated.
- [x] Grammar lesson and grammar check completed.
- [x] Two new SRS cards chosen only from material actually introduced (`reps: 1`, `due_lesson: 9`).
- [x] Actual productive learning time recorded as 40 whole minutes (`planned_learning_min: 45`, `actual_learning_min: 40`, `model_wait_min: null`).
- [x] Logs, local database, `progress.json`, and `session.md` updated.
