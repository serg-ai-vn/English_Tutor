---
title: Журнал сессий - English_Tutor
created: 2026-08-11
updated: 2026-10-25
tags: [english, daily-log, status, github]
status: active
related: [AGENTS.md, track_A/LESSON_START.md, План_реализации.md, Корректировки_урока.md]
---

# Журнал сессий

> **Правило ведения файла:** раздел `## Текущий статус` всегда остаётся первым. Новые сессии добавляются строго под ним (от новых к старым). Полный исторический архив сессий 1–34 хранится в `track_A/logs/session_history_1_34.md`, а сводный реестр всех применённых патчей P1–P24 — в `Корректировки_урока.md`.

## Текущий статус

- **Единая точка входа:** `AGENTS.md` (конституция, читается автоматически в OpenCode, Codex, Cursor) + `CLAUDE.md` (авто-указатель для Claude Code) → `track_A/LESSON_START.md` (старт урока или урока-повторения `Refresher`) → `track_B/local/protocol.md` (протокол 7-урочного цикла и Git-синхронизации) → `track_B/prompts/*.md` (канонические промпты 12 блоков + `analytics_contract.md`).
- **Мульти-агентная совместимость и GitHub-протокол:**
  - Все 12 ролей имеют единые канонические имена во всех трёх директориях (`track_B/prompts/<role>.md`, `.codex/agents/<role>.toml`, `.opencode/agents/<role-kebab>.md`): `srs_review`, `grammar_lesson`, `check_grammar`, `tutor_speaking`, `reading_tutor`, `data_speaking`, `patterns_listening`, `pitch_coach`, `mock_pitch`, `check_monologue`, `check_monologue_caf`, `weekly_review`.
  - **GitHub-дисциплина:** вся история обучения ведётся последовательно в основной ветке `main` (`git pull --rebase` перед стартом сессии; `git add -A && git commit && git push` при закрытии урока или после применения патча; в облачных средах с временными ветками — слияние PR в `main` сразу после завершения урока).
- **Формат урока:** один главный навык, обычно 40–50 минут (day 7 — 30–45), hard cap 60 минут. SRS — один oldest-due-first пакет максимум из 5 карточек (`due_lesson ASC, lapses DESC, id ASC`), 5 минут learner-active retrieval без model wait и максимум один bundled retry до 2 минут за счёт главного блока; максимум 2 новых элемента (`status: active`, `reps: 1`, `due_lesson: lesson_number + 1`). Поддерживается режим **«Урок-повторение после перерыва» (`Refresher Lesson`)** без сдвига счётчика `days_completed`.
- **Цели:** 12-недельный горизонт — функциональный B2+/приближение к C1 для pitch/professional Q&A; полный общий spoken C1 — долгосрочный результат. Баланс тем: 50% AI-курс/продажи, 30% teaching/AI work/clients, 20% everyday/social. EF SET baseline: 52 B2 (Reading 56 B2, Listening 48 B1).
- **Track A (прогресс):** уроки 1–8 завершены. Накопительные списки `covered_grammar` и `introduced_material` за уроки 1–8 зафиксированы напрямую в `track_A/progress.json`. **Следующий по плану — Урок 9 (Week 2, Day 2 — speaking)** либо **Урок-повторение (`Refresher`) по материалам уроков 1–8** после перерыва. Пакет SRS на старт по очереди `(due_lesson ASC, lapses DESC, id ASC)`: карточки `15, 50, 51, 54, 39` (карточка `40` переходит первой на следующий урок).
- **База курса и память об изменениях:** актуальная база курса (`course_base/`, 24 файла с чистыми именами без кавычек и двойных пробелов) — только для чтения по индексу `track_A/program/course_base_index.md`. В `Корректировки_урока.md` закреплён полный реестр патчей P1–P24 (память о всех правках уроков 1–8), чтобы при будущих доработках агенты не допускали регрессий.

---

## Session 38 - 2026-10-25

### Done

- По запросу владельца прочитана инструкция по первичной загрузке проекта на GitHub.
- В текущей папке инициализирован Git с основной веткой `main`; настроен `origin`: `https://github.com/serg-ai-vn/English_Tutor.git`.
- Подготовлен полный состав проекта: 101 файл, включая `.codex/` и `.opencode/`, материалы курса, историю уроков и локальные JSON-таблицы. Проверена читаемость всех 9 JSON-файлов.
- Учебный прогресс и материалы курса сохранены без изменений.

### Next step

- Отправить исходный коммит в `origin/main` после предоставления доступа и проверить совпадение локального и удалённого коммитов.
- Учебный следующий шаг: Урок 9 либо Refresher по материалам уроков 1–8.

### Blocked

- При подготовке загрузки GitHub-коннектор возвращает `404`, а Git без интерактивного входа не находит авторизацию. Владелец сообщил, что доступ к репозиторию ещё не предоставлен.

---

## Session 37 - 2026-10-24

### Done

- Выполнена финальная выверка путей, конфигов, GitHub-протокола и режима повторения после перерыва (P24):
  1. **Исправлены все пути к файлам в `track_A/LESSON_START.md`, `CLAUDE.md`, `README.md` и `Корректировки_урока.md`:** возвращены реальные пути к `track_B/local/db/srs_items.json` (с каноническим фильтром `status != "deprecated"`, `reps > 0`, `due_lesson <= lesson_number`), корневому `session.md`, `track_A/LESSON_START.md`, дневным отчётам `track_A/logs/YYYY-MM-DD.md` (по шаблону `_template_daily.md`), 7 таблицам в `track_B/local/db/*.json` и 12-недельной программе `track_A/program/program.json`.
  2. **Добавлен протокол синхронизации с GitHub и режим `Refresher Lesson` (повторение после перерыва):** в `AGENTS.md`, `track_A/LESSON_START.md`, `track_B/local/protocol.md`, `CLAUDE.md` и `README.md` прописаны правила работы с основной веткой `main` (`git pull --rebase` на старте, `git add/commit/push` при закрытии урока или патча, слияние PR для облачных агентов), явная точка входа для OpenCode (`.opencode/agents/` + `AGENTS.md`) и сценарий обзорного урока-повторения после перерыва без сдвига `days_completed`.
  3. **Синхронизированы правила в `CLAUDE.md` и `.codex/config.toml`:** в `CLAUDE.md` закреплено Правило №1 из `AGENTS.md` (объяснения и задания по умолчанию на английском, переход на русский только по запросу ученика); в `.codex/config.toml` возвращён лимит `max_concurrent_threads_per_session = 3` и точные описания всех 12 ролей по канону `track_B/prompts/*.md`.
  4. **В `Корректировки_урока.md` восстановлен сводный реестр всех применённых патчей P1–P24:** любой агент при будущих корректировках механики урока видит причины всех прошлых изменений (уроки 1–8) и не сможет случайно откатить их назад.
  5. **Уточнено количество файлов в `course_base/` (24 актуальных файла):** синхронизировано в `AGENTS.md`, `session.md`, `CLAUDE.md`, `README.md` и `track_A/program/course_base_index.md`.

### Next step

- Провести Урок-повторение (`Refresher`) по материалам уроков 1–8 после перерыва либо сразу начать Урок 9 (Week 2, Day 2 — speaking) по команде «Начинаем урок». Пакет SRS из 5 карточек: ids `15, 50, 51, 54, 39`.

### Blocked

- Блокеров нет.

---

## Session 36 - 2026-10-24

### Done

- Выполнена доводка репозитория и протоколов по 6 пунктам кросс-аудита (P23):
  1. Полное удаление `_archive/` и перенос истории сессий 1–34 в `track_A/logs/session_history_1_34.md`.
  2. Приведение всех 12 промптов в `track_B/prompts/` к единому системному формату субагента с обязательным возвратом `ANALYTICS_PACKET` по `track_B/prompts/analytics_contract.md`.
  3. 100%-ная синхронизация имён ролей в `track_B/prompts/`, `.codex/agents/` и `.opencode/agents/`.
  4. Приведение закрытого плана Урока 8 в `track_A/today.md` к каноническому формату P21 и фиксация накопительных списков `covered_grammar` и `introduced_material` в `track_A/progress.json`.
  5. Закрытие `[x] Шаг 0` в `План_реализации.md`; обновление `track_A/transcripts/index.md` и `track_A/program/course_base_index.md`.
  6. Удаление устаревшего `4_implementation_roadmap.md` и очистка имён файлов отчётов в `course_base/`.

### Next step

- Выверка путей в `LESSON_START.md`, `CLAUDE.md`, `README.md` и `.codex/config.toml` (выполнено в Session 37 / P24).

### Blocked

- Блокеров нет.

---

## Session 35 - 2026-10-24

### Done

- Проведена первичная ревизия и уборка папки `English_Tutor` на Google Диске для выгрузки на GitHub и совместимости с ИИ-агентами (P22):
  - Удалён технический мусор из `.opencode/` (`node_modules`, `package.json`, `package-lock.json`, локальный `.gitignore`).
  - Устранён «двойной прыжок» и хардкод модели `gpt-5.6-terra` в `.codex/agents/*.toml`.
  - Исправлена опечатка `English Tutuor` → `English_Tutor`, добавлены корневые файлы `.gitignore`, `CLAUDE.md` и `README.md`.

### Next step

- Финальная кросс-проверка и синхронизация имён ролей и промптов (выполнено в Session 36–37).

### Blocked

- Блокеров нет.

---

## Session 34 - 2026-09-01

### Done

- Audited Lesson 8 closure data across `today.md`, the daily log, `progress.json`, `lesson_sessions.json`, `daily_tasks.json`, `error_events.json`, and `srs_items.json`. The records are internally consistent: 40 productive minutes, 5 grouped error events containing 11 occurrences, two new cards (ids 60-61), and no false error for the learner's valid challenge to an ambiguous grammar prompt.
- Found that Lesson 8 accurately logged a runtime SRS failure: only ids 41 and 49 were shown, while older overdue ids 50-51 (`due_lesson: 6`) and 39-40 (`due_lesson: 7`) remained unseen.
- Applied P21: future SRS uses one batch of at most five cards sorted strictly by `(due_lesson ASC, lapses DESC, id ASC)`, one learner response, one combined check, and at most one bundled retry for failed numbers.
- Replaced the wall-clock deadline with learner-active timing: five minutes for initial retrieval, excluding model/agent wait; an optional retry may use up to two additional learner-active minutes and reduces the main block by the same amount.
- Corrected explicitly introduced S14/S15 (ids 54/15) and Lesson 8 grammar cards (ids 60-61) from `reps: 0` to `reps: 1` so the canonical `reps > 0` review filter selects them.

### Next step

- Start Lesson 9 with the five-card oldest-due-first batch: ids 15, 50, 51, 54, and 39; id 40 remains first in the carried-over queue for Lesson 10.

### Blocked

- No blocker.

---

## Session 33 - 2026-09-01

### Done

- Diagnosed and repaired the Windows ACL ownership issue on `.codex`.
- Prepared `track_A/today.md` for Lesson 8, Week 2 Day 1: six due SRS reviews and the narrow grammar contrast `will` vs `be going to`.
- Completed Lesson 8 in 40 minutes of productive learning. The five-minute SRS hard stop was observed: ids 41 and 49 were shown; ids 50, 51, 39, and 40 remained due and unchanged.
- Completed the narrow `will` vs `be going to` lesson and grammar check. All four final target choices were correct.
- Added two unambiguous grammar minimal-pair SRS cards (ids 60-61) for decision vs plan and belief vs evidence.

### Next step

- Start Lesson 9, Week 2 Day 2 speaking, using only covered grammar and introduced material.

### Blocked

- No blocker.

---

## Session 32 - 2026-08-31

### Done

- Completed Track A Week 1, Lesson 7: voice-first course-and-market sample followed by a light evidence-based weekly review (30 minutes of productive learning time).
- Recorded two Week 1 signals: the learner can connect course, market, and policy coherently; sentence control and exact chunk retrieval remain the next accuracy priority.
- Recorded one bounded Week 2 adjustment: replace one pitch-expansion turn with revision of two existing key claims, without adding work.
- Added the exact submitted transcript, process metadata, and quiet analytics to the local database.

### Next step

- Track A Lesson 8: Week 2 Day 1 grammar.

### Blocked

- No lesson blocker.

---

## Session 31 - 2026-08-30

### Done

- Audited six saved chat exports (OpenCode JSON for Lessons 1-3 and Codex Markdown for Lessons 4-6); indexed in `track_A/transcripts/index.md`.
- Added `track_B/prompts/analytics_contract.md`, `lesson_sessions.json`, and backfilled 42 source-linked error groups (212 occurrences) across Lessons 1-6 into `error_events.json`.
- Backfilled ten lesson speaking/listening/pitch transcripts in `speaking_recordings.json` and normalised `daily_tasks.json`.
- Made `track_A/LESSON_START.md` the explicit universal start route.

### Next step

- Run Lesson 7 through the universal start route.

### Blocked

- Productive learning time for Lessons 1-3 remains null rather than estimated.
