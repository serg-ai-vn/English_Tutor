# CLAUDE.md — Project Entry Point

This repository (`English_Tutor`) uses **`AGENTS.md`** as its single canonical constitution and **`track_A/LESSON_START.md`** as the universal lesson execution router across **Claude Code**, **OpenCode**, **OpenAI Codex**, **Cursor / Windsurf**, and GitHub web agents.

## Mandatory Instructions for Any AI Agent

1. **Always read `AGENTS.md` first.** Its rules are strict invariants:
   - Never read or write outside the `English_Tutor` folder without explicit user permission.
   - Default lesson language for explanations, examples, and tasks is **English**; switch to Russian **only** upon explicit learner request ("объясни по-русски").
   - Output all lesson materials (SRS cards, grammar rules, reading texts, exercises, corrections) **directly in chat** — never ask the learner to open a project file to read a task.
   - Grade and count only grammar structures listed in `covered_grammar`; mark any other structure as `(not yet covered - info)` without score penalty, rule lecture, or extra drill.
   - Require only patterns, vocabulary, and facts listed in `introduced_material`; never introduce a new C1 pattern outside Day 5 (`patterns_listening`).
   - Exclude model/agent generation wait from productive learning time (`actual_learning_min`).
2. **When starting or running a lesson** (command: `"Начинаем урок"` or `"Давай повторим пройденное после перерыва"`):
   - If Git is available, silently run `git pull --rebase` first so you have the latest state on `main`.
   - Read and strictly follow **`track_A/LESSON_START.md`** and **`track_B/local/protocol.md`** (supports both the scheduled `Lesson N` and the `Refresher Lesson` mode after a break without advancing `days_completed`).
   - Read only the minimal startup files: `track_A/progress.json` (which holds `days_completed`, `covered_grammar`, and `introduced_material`), the current day in `track_A/program/program.json`, due items from `track_B/local/db/srs_items.json`, `track_B/prompts/analytics_contract.md`, and the `Pending` section of `Корректировки_урока.md`.
   - Do **not** read the full `session.md`, `track_A/logs/session_history_1_34.md`, `План_реализации.md`, `track_B/research/*`, or all 24 files in `course_base/*` (read only `track_A/program/course_base_index.md` or the single `course_base/` file referenced by today's block).
   - Use **`track_B/prompts/<role>.md`** + **`track_B/prompts/analytics_contract.md`** as the single source of truth for each of the 12 lesson roles (`srs_review`, `grammar_lesson`, `check_grammar`, `tutor_speaking`, `reading_tutor`, `data_speaking`, `patterns_listening`, `pitch_coach`, `mock_pitch`, `check_monologue`, `check_monologue_caf`, `weekly_review`).
   - Upon lesson closure (after recording `actual_learning_min` and updating logs/DB), commit and push all updated state files directly to `main` (`git add -A && git commit -m "Lesson N completed" && git push`), or create/merge the PR into `main` if running in a branch-isolated cloud environment.
3. **When the learner reports an issue or wants to adjust lesson mechanics:**
   - **During a lesson:** immediately append the learner's feedback to the `Pending` section of `Корректировки_урока.md` without derailing the lesson.
   - **In a dedicated maintenance/audit session:** follow **"Сценарий Б: Чат разработки, разбора замечаний или аудита системы"** in `AGENTS.md`. Read `AGENTS.md`, the top section of `session.md`, the relevant daily log in `track_A/logs/YYYY-MM-DD.md`, and `Корректировки_урока.md` (including the registry of applied patches P1–P24 so you never regress past fixes), apply the fix across `track_B/prompts/` and wrappers, log the new patch `P<N>`, and `git commit && git push` to `main`.
