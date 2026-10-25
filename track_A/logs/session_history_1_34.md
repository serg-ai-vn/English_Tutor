---
title: Журнал сессий - English Tutuor
created: 2026-08-11
updated: 2026-09-01
tags: [english, daily-log]
status: active
related: [План_реализации.md, AGENTS.md]
---

# Журнал сессий

## Session 34 - 2026-09-01

### Done

- Audited Lesson 8 closure data across `today.md`, the daily log, `progress.json`, `lesson_sessions.json`, `daily_tasks.json`, `error_events.json`, and `srs_items.json`. The records are internally consistent: 40 productive minutes, 5 grouped error events containing 11 occurrences, two new cards (ids 60-61), and no false error for the learner's valid challenge to an ambiguous grammar prompt.
- Found that Lesson 8 accurately logged a runtime SRS failure: only ids 41 and 49 were shown, while older overdue ids 50-51 (`due_lesson: 6`) and 39-40 (`due_lesson: 7`) remained unseen. The canonical protocol mentioned overdue priority, but startup/orchestrator instructions did not define or repeat a deterministic sort, so input order won.
- Applied P21: future SRS uses one batch of at most five cards sorted strictly by `(due_lesson ASC, lapses DESC, id ASC)`, one learner response, one combined check, and at most one bundled retry for failed numbers.
- Replaced the wall-clock deadline with learner-active timing: five minutes for initial retrieval, excluding model/agent wait; an optional retry may use up to two additional learner-active minutes and reduces the main block by the same amount.
- Found a second scheduling mismatch: explicitly introduced S14/S15 (ids 54/15) and Lesson 8 grammar cards (ids 60-61) were left at `reps: 0`, so the canonical `reps > 0` review filter would never select them. Corrected only these four documented introduced items to `reps: 1` and made that initialization rule explicit; their content, due lessons, errors, and lesson-time records were not changed.
- Synchronized `AGENTS.md`, `LESSON_START.md`, the local protocol, SRS prompts/wrappers for Codex and OpenCode, the daily-log template, `program.json`, the master plan, and the applied-corrections registry. Historical Lesson 8 content/error/time records were preserved.

### Next step

- Start Lesson 9 with the five-card oldest-due-first batch. Based on the corrected queue, the exact first batch is ids 15, 50, 51, 54, and 39; id 40 remains first in the carried-over queue for Lesson 10 unless an earlier-due item legitimately appears.

### Blocked

- No blocker.

## Session 33 - 2026-09-01

### Done

- Diagnosed the repeated `helper_unknown_error: setup refresh had errors` that blocked lesson startup. The sandbox log identified one exact failure: Windows error 5 while Codex tried to apply a protective deny ACE to `D:\Projects\English\English Tutuor\.codex`.
- Confirmed that `.codex` was incorrectly owned by the service account `CodexSandboxOffline`, so the normal HP process could not update its ACL.
- Saved an ACL backup at `C:\Users\HP\AppData\Local\Temp\english-tutor-dotcodex-acl-20260901-0850.xml`, temporarily granted HP control through the current sandbox owner, restored ownership to `DESKTOP-DPLB46H\HP`, and removed the temporary explicit grant.
- Verified the repair with two ordinary, non-elevated tool launches. Codex then applied its intended deny ACE successfully and read `track_A/LESSON_START.md` normally.
- Prepared `track_A/today.md` for Lesson 8, Week 2 Day 1: six due SRS reviews and the narrow grammar contrast `will` vs `be going to`.
- Completed Lesson 8 in 40 minutes of productive learning. The five-minute SRS hard stop was observed: ids 41 and 49 were shown; ids 50, 51, 39, and 40 remained due and unchanged.
- Completed the narrow `will` vs `be going to` lesson and grammar check. All four final target choices were correct.
- Corrected an under-specified client-request prompt: `I'll send it now` and `I'm going to send it now` can both be grammatical depending on whether the speaker decides now or already has the intention. The learner's original form was not logged as an error.
- Added two unambiguous grammar minimal-pair SRS cards for decision vs plan and belief vs evidence.

### Next step

- Start Lesson 9, Week 2 Day 2 speaking, using only covered grammar and introduced material.

### Blocked

- No blocker. The recurring lesson-start tool failure is repaired for this project.

## Текущий статус

- **Главный путь — локальный агентный прототип Codex/OpenCode.** `track_B/local/protocol.md` — канон урока; `program.json` задаёт текущий навык, `today.md` — единственный контекст дня, `progress.json` — позицию без календаря. Supabase/n8n/Telegram остаются отложенным вторичным путём.
- **Архитектура:** основной чат только оркестрирует и пишет состояние; каждый learner-facing блок ведёт отдельный read-only агент. Codex-роли находятся в `.codex/agents/`, OpenCode-роли — в `.opencode/agents/`, подробные общие инструкции — в `track_B/prompts/`. Codex: до 3 агентов, `gpt-5.6-terra`, reasoning `medium`; три параллельных вызова используются для CAF.
- **Формат урока:** один главный навык, обычно 40-50 минут (day 7 — 30-45), hard cap 60. SRS — один oldest-due-first пакет максимум из 5 карточек, 5 минут learner-active retrieval без model wait и максимум один bundled retry до 2 минут за счёт главного блока; максимум 2 новых элемента. Свободная речь получает максимум 2-3 отложенные коррекции, grammar/drill — immediate target correction + одна повторная попытка.
- **Цели:** 12-недельный горизонт — функциональный B2+/приближение к C1 для pitch/professional Q&A; полный общий spoken C1 — долгосрочный результат. Темы: около 50% AI-курс/продажи, 30% teaching/AI work/clients, 20% everyday/social. EF SET baseline: 52 B2, Reading 56 B2, Listening 48 B1 — поэтому listening усилен.
- **Track A:** уроки 1-8 завершены. Следующий — урок 9 (W2 day 2, speaking). Lesson 8: 40 минут productive learning; `will` vs `be going to` освоены в узком контрасте, а неоднозначный prompt исправлен без ложной learner-error записи.
- **Оценивание и аналитика:** ошибки вне `covered_grammar` не штрафуются. Practice feedback компактный, но тихий occurrence-слой сохраняет все обнаружимые случаи в `error_events.json`; время по каждому уроку — в `lesson_sessions.json`. Формальный benchmark только W4/W8/W12.
- **Быстрый новый чат:** ученик пишет «Начинаем урок»; агент следует `track_A/LESSON_START.md` и не перечитывает весь master plan/research. Полный протокол сессии нужен только для ремонта системы или Track B.
- База курса остаётся read-only в `course_base/`; индекс — `track_A/program/course_base_index.md`, 2 отчёта помечены SUPERSEDED.

## Сессия 24 - 2026-08-28

### Сделано

- По аудиту урока 4 добавлен обязательный gate: actual time в целых минутах должен быть получен до статуса completed; оценка или пропуск недопустимы.
- Синхронизированы AGENTS.md, 	rack_A/LESSON_START.md, 	rack_B/local/protocol.md и шаблон дневного лога.

### Следующий шаг

- Получить фактическую длительность урока 4 от ученика и закрыть единственный незавершённый пункт лога.

### Где застрял

- Нужна фактическая длительность урока 4; в чате и артефактах её нет.

## Сессия 23 - 2026-08-28

### Сделано

- Урок 4 (data speaking) завершён: SRS 7 due-карточек и два коротких data-speaking выступления с одним retry.
- Обновлены SRS-интервалы просмотренных карточек, `daily_tasks.json`, `progress.json` и лог `track_A/logs/2026-08-28.md`; новых карточек нет.

### Следующий шаг

- Урок 5: S14/S15 + listening + drilling.

### Где застрял

- Фактическое время урока не записано в чате.
## Сессия 22 - 2026-08-26

### Сделано

- Проведён полный аудит активных правил, программы, истории уроков 1-3, текущего урока 4, SRS, prompt/wrapper-слоя и исследовательской базы. Подтверждена причина двухчасовых уроков: исходное хорошее ядро было превращено в одновременный тест grammar + input + SRS + speaking + pitch, а feedback и новые карточки не имели пределов.
- Методическая сверка: сохранены task-based output, retrieval/SRS, deliberate practice и привязка к реальной речи; добавлены timebox, дозированная коррекция, отдельный listening, перенос в general English и реалистичное разделение 12-недельной/долгосрочной цели.
- Синхронизированы `AGENTS.md`, `track_B/local/protocol.md`, `track_A/program/program.json`, `track_A/today.md`, `_template_daily.md`, `pattern_bank_v2.md`, `План_реализации.md`, `Корректировки_урока.md`, общие prompts и OpenCode wrappers.
- Создан `track_A/LESSON_START.md`: обычный новый учебный чат читает только минимальный рабочий набор. Все learner-facing блоки делегируются named agents; один оркестратор обновляет JSON/логи.
- В `srs_items.json` 20 живых S1-S20 приведены к `item_type: pattern`, `status: active`; deprecated-элементы сохранены.
- Codex-архитектура подготовлена по официальной схеме project-scoped custom agents: `.codex/config.toml` + 12 узких read-only ролей, default Terra medium, concurrency 3.

### Следующий шаг

- Начать урок 4 командой «Начинаем урок»: `srs_review` (7 due, hard stop 5 мин) → `data_speaking` (35 мин) → немедленное закрытие. На уроке 5 ввести S14/S15 и провести полноценный listening.

### Где застрял

- Блокеров учебного курса нет. После создания `.codex/` текущая горячая среда Codex может потребовать новый чат/перезапуск проекта, чтобы перечитать project-agent configuration; это не влияет на OpenCode-файлы или данные курса.

## Сессия 18 - 2026-08-19

### Сделано

- Патч по обратной связи ученика (пометки P1-P5 из `Корректировки_урока.md` + голосовое: слово в контексте предложения, контрастные сводки времён, «всё в чате» как глобальный принцип):
  - `AGENTS.md`: правило 1 - русский ТОЛЬКО по явному запросу (неудачная попытка по-английски = переформулировать проще, не переключаться); правило 3 - внутри SRS три типа карточек = три подзадания с маркерами [НОВОЕ СЛОВО]/[НОВЫЙ CHUNK]/[НОВЫЙ ПАТТЕРН], не смешивать; новое правило 7 - однозначные развёрнутые инструкции к заданиям (переехало «Общее правило» из Корректировки); новое правило 8 - все материалы только в чате, отсылки к книге/файлам запрещены; оркестрация п.7 - закрытие дня сразу после урока
  - `track_B/local/protocol.md`: SRS - формат трёх типов новых карточек (vocab: слово в контексте, ученик объясняет по-английски, оркестратор подтверждает + даёт русский перевод; chunk: читать вслух 3-6 раз и заучить, факт не пересказывать; паттерн: сначала пример); grammar - мини-урок полностью в чате (правило -> контрастная мини-сводка с пройденными путающимися временами -> примеры -> упражнение -> 5 своих предложений -> @check-grammar); reading - текст целиком в чат; формат today.md - подгруппы SRS + «выдаётся в чат»; «Вечернее закрытие» -> «Закрытие дня» с правилом «немедленно, в тот же сеанс»
  - `program.json` (по решению владельца - вариант Б из P2): material_ref всех grammar-блоков -> «мини-урок в чате оркестратором (тема по плану Hewings)», убрана инструкция «левая страница» (день 1), grammar_path - формат «книга не используется», юниты = метки тем; JSON провалидирован
  - `План_реализации.md`: протокол шага 4-L (блоки 3-4), таблица материалов шага 0.3, рутина 0.4, KPI-таблица - синхронизированы (мини-уроки в чате, закрытие дня)
  - `.opencode/agents/check-grammar.md`: description без отсылки к книге
  - `Корректировки_урока.md`: P1-P5 удалены как применённые, файл пуст
- Замечание сессии 17 («переключаться на русский после одной неудачной попытки») ОТМЕНЕНО правкой P4 - новое правило 1 AGENTS.md

### Следующий шаг

- Неделя 1, день 3 (в новом формате): SRS (повторы id 39-41, 49-51 + день-1/-3 по id 23, 26-30 + новые раздельными подзаданиями) + мини-задание по временам от check-grammar (5 глаголов, день 2) + grammar в чате: present perfect basics (for/since, already/yet) с контрастом past simple vs present perfect + speaking диалог T-A1 «Почему сейчас» + Advanced Passives в питч (3 предложения, T-A3)

### Где застрял

- Блокеров нет

## Сессия 21 - 2026-08-25

### Сделано

- Жалоба ученика на урок 4: 2+ часа, SRS раздут, паттерны звучат как робот, карточки оторваны от истории, ученик чинит примеры учителя
- Диагноз по файлам: program.json исказил оригинальную модель исследования — вместо «1 навык/день, 45-55 мин» (Chapter 7 research_materials.md) сделал «4 блока/день, 70 мин»; банк 40 паттернов из Manchester Academic Phrasebook (научный регистр, не разговорный); SRS 5 мин при 10 карточках = нереально 30-40 мин
- Патч P10-P12 (одобрен владельцем — «делай как было изначально запрограммировано»):
  - `track_B/research/pattern_bank_v2.md`: банк 20 живых устных C1-паттернов (замена 40 академических)
  - `track_B/local/db/srs_items.json`: 20 active карточек переписаны (front=питч-предложение, due_lesson по новому расписанию — паттерны в день 5), 6 deprecated
  - `track_A/program/program.json`: полная пересборка по оригинальной модели исследования — 1 навык/урок (день 1=grammar 45мин, день 2=speaking 40мин, день 3=reading 40мин, день 4=data speaking 40мин, день 5=patterns+listening+drilling 45мин, день 6=pitch 50мин, день 7=rest+review 30-45мин); SRS=5 мин разминка (не 20); новые 2-3/день ввода (не 5); паттерны 2/неделю в день 5; srs_rules обновлены. Дни недели НЕ используются (P6) — только позиция в 7-урочном цикле
  - `track_B/local/protocol.md`: переписан под новую модель — блоки по дням недели, SRS-повторы=5 мин, новый материал в день навыка
  - `AGENTS.md`: оркестрация п.3 — «1 навык в день» (P12), рамп 2-3 новых
  - `track_A/today.md`: урок 4 = день 4 цикла = data speaking (без новых паттернов, первый ввод — урок 5)
  - `Корректировки_урока.md`: P10-P12 применены
  - `track_A/progress.json`: note обновлён
  - `track_B/research/pattern_bank_v2.md`: расписание вводов обновлено (день 5 каждой недели)
  - Все JSON валидны

### Следующий шаг

- Урок 4 (день 4 цикла = data speaking, ~40 мин): SRS-повторы (8 карточек, 5 мин) → data description вслух (35 мин, выученные chunks, без новых паттернов) → закрытие (урок 5 = день 5 = S14+S15 + listening + drilling)

### Где застрял

- Блокеров нет

## Сессия 20 - 2026-08-23

### Сделано

- Аудит программы по жалобе ученика на урок 4 (speaking - паттерны «из ниоткуда», reading - пересказ выученного «другими словами», grammar - ошибки в непройдённых временах засчитаны). Все три дефекта подтверждены файлами:
  - Рассинхрон паттернов: Cat 4 требовалась W1D4, но не вводилась нигде до; Cat 1 drill W1D5 - ввод W2D3 (на 5 дней позже); Cat 3/5 - нет ввода; Cat 2 drill W9D5 - ввод W11 (на 2 недели позже). Все 20 паттернов лежали в srs_items (ids 1-20, reps 0), ни один не выдавался
  - Reading: в протоколе нет дедупликации против srs_items/логов; задание «5 chunks из текста на 5 предложений» = переписывание
  - check-grammar: промпт «list every mistake» без скоупа; passive drilling на уроках 3-4 при grammar_path = неделя 6
- Записана P7 в `Корректировки_урока.md` (P6/P8/P9 уже были от сегодняшней сессии)
- Патч P6-P9 (одобрен владельцем - «доведи всё до ума», плюс «убрать календарь, только номера уроков»):
  - `program.json`: 15 правок - в SRS-блоках W1D4-D5 (Cat 4: G13-G16), W2D1-D3 (Cat 1: G1-G4, N8, N9, + N5), W3D3-D4 (Cat 3: G9-G12), W4D3-D4 (Cat 5: G17-G20), W9D3-D4 (Cat 2: G5-G8) расписаны конкретные каркасы с вводом за 1-2 урока (или в SRS того же урока, раньше speaking) до drilling; speaking/pitch-блоки W1D4-D5 переписаны под введённое; srs_rules дополнена расписанием вводов
  - `track_B/local/db/srs_items.json`: `due` (дата) -> `due_lesson` (int), `interval_days` -> `interval_lessons`; 53 карточек конвертированы; добавлены 6 новых карточек паттернов (ids 54-59: G13, G15, G3, G12, G18, G8) с примерами к курсу; итого 59
  - `track_B/local/protocol.md`: старт сессии и SRS - по due_lesson/номеру урока (кап ~10, без нагона); reading - дедупликация фактов + лексика до текста + мин. ~10 предложений; grammar - оркестратор передаёт «пройдено на сегодня» в @check-grammar; speaking/pitch - только введённое ранее; закрытие - field names; данные - program.json изменения только патчем, due_lesson/interval_lessons = int (Supabase: int-колонки)
  - `track_B/prompts/check_grammar.md`: вход {ПРОЙДЕНО}; scoring - только пройденное в счёт, непройдённое = «not yet covered - info» без штрафа
  - `.opencode/agents/check-grammar.md`: трёхуровневые границы (тема дня / пройденное ранее / непройдённое)
  - `AGENTS.md`: правила урока 9-12 (P9 speaking-только-введённое, P8 reading-новые-факты, P7 оценка-по-пройдённому, P6 без-календаря); оркестрация п.1 - по due_lesson
  - `track_A/today.md`: пересобран урок 4 - speaking по G13+G14 (введены в SRS этого урока) + выученные chunks; reading по P8; grammar с covered-списком; 8 повторов по due_lesson<=4
  - `track_A/progress.json`: note обновлён
  - `Корректировки_урока.md`: P6-P9 -> применены, тело пусто

### Следующий шаг

- Урок 4 по пересобранному `today.md`: SRS (8 повторов + новые incl. G13/G14) -> grammar Past Perfect + @check-grammar со скоупом -> reading по P8 -> speaking data description по G13+G14 -> закрытие (урок 5)

### Где застрял

- Блокеров нет

## Сессия 19 - 2026-08-20

### Сделано

- Неделя 1, день 3 проведён и закрыт в новом формате: SRS (6 повторов: guardrails/49/50/51 вспомнил, undermine/mitigate лапс -> due 08-21; 6 новых раздельными подзаданиями по P1: cusp/deviation/distribution + English through commanding AI/off-the-shelf/striking mismatch), grammar Present Perfect в чате (warm-up 5 глаголов + мини-урок for/since/already/yet + контраст past simple + упражнение 5/5 + 5 переводов с русского -> @check-grammar 9/10), speaking диалог T-A1 «Почему сейчас» (4 обмена, PP в каждом ответе + монолог-резюме -> 8.5/10 по PP, применил большинство исправлений), pitch Advanced Passives (4 формы пассива + 3 перевода с русского -> @check-grammar 5.5/10, главный провал - пропуск been)
- Ученик дважды запросил русские предложения для перевода (грамматика и питч) - формат «русский источник -> английский перевод» сработал хорошо, зафиксирован в логе
- Закрытие дня: лог `track_A/logs/2026-08-20.md`, daily_tasks.json (+4 строки done), srs_items.json (id 39-40 лапс due 08-21; id 41, 49-51 -> reps 2 interval 3 due 08-23; новые id 42-44, 25, 52, 53 -> reps 1 due 08-21), progress.json (current_day 4, days_completed 3)

### Следующий шаг

- Неделя 1, день 4: SRS (повторы due 08-21: 39-40, 42-48, 25, 52-53 + новые) + мини-задание пассива от check-grammar (5 глаголов в форму) + grammar Hewings Units 7-8 (past perfect, present perfect vs past) + reading бриф рынок/легаль (готовность платить 29-47%, короткие модули, 5 chunks) + data description паттернами Category 4 вслух
- Остаточные паттерны на повтор дня 4: since vs from (2x в день 3), compulsory (орфография с дня 1), on-the-ground capacity (chunk запомнен неточно - underground), guess vs understand

### Где застрял

- Блокеров нет

## Сессия 17 - 2026-08-19

### Сделано

- Неделя 1, день 2 проведён и закрыт: SRS (6 повторов id 23, 26-30 - все вспомнены + 6 новых: 3 слова + 3 chunks цифр реформы), grammar Hewings Units 3-4 в чате (7/10, целевые конструкции 5/5, слабое место - предлоги), reading сводка Decision 2371 (5 chunks, текст выдан в чат), speaking pushed output 2 мин + @check-monologue (grammar 5/10, vocab 6/10, persuasiveness 6/10)
- **Создан `Корректировки_урока.md`** - накопитель pending-правок от ученика: P1 (формат подачи новых SRS-карточек: слова и chunks - разные подзадания, не смешивать; правило «формулировать задания конкретно и развёрнуто»), P2 (учебник Hewings отсутствует - grammar-блоки вести в чате, пока владелец не решит A/B). Ссылка на файл добавлена в AGENTS.md (структура + старт сессии). Ничего из структуры не менялось - правки ждут патча
- Вечернее закрытие: лог `track_A/logs/2026-08-19.md`, daily_tasks.json (4 строки done), srs_items.json (id 23, 26-30 -> reps 2, interval 3, due 2026-08-22; id 39-41 -> reps 1, due 2026-08-20; добавлены новые ids 49-51), progress.json (current_day 3, days_completed 2)
- Урок вёл диалог с учеником на русском по его запросам (формат урока требует English - правило 1; учтено, но ученик сам переключал на русский при фрустрации)

### Следующий шаг

- Неделя 1, день 3: SRS (повторы id 39-41, 49-51 + день-1/-3 по id 23, 26-30 + новые) + мини-задание по временам от check-grammar (5 глаголов в форму, день 2) + grammar Hewings Units 5-6 (present perfect basics: for/since, already/yet) в чате + speaking диалог T-A1 «Почему сейчас» + Advanced Passives в питч (3 предложения, T-A3)
- Владелец: принять решение по P2 (купить/положить Hewings или грамматика всегда в чате) и по P1 (патч формата SRS)

### Где застрял

- Блокеров нет. Замечание: ученик в стрессовых моментах просил русский - важно по правилу 1 переключаться после одной неудачной попытки по-английски

## Сессия 16 - 2026-08-18

### Сделано

- Неделя 1, день 1 переиграна и ЗАСЧИТАНА в новом формате (субагенты): srs (6 новых why now, рамп), grammar Hewings U1-2 через @check-grammar (0 ошибок по временам), listening Sal Khan TED первые 3 мин (субтитры, shadowing x6, разбор открытия и two-sigma), speaking @tutor-speaking (диалог с James + 1-минутный монолог-резюме в чате)
- Проверена работа субагентов в живой версии opencode: @check-grammar и @tutor-speaking отработали чисто (артефакты в чат, файлы не трогали), resume-сессии между сообщениями работают
- Словарный запас из listening: 10 незнакомых слов добавлены в SRS (ids 39-48: undermine, mitigate, guardrails, cusp, deviation, distribution, asterisks, approximate, safeguards, appreciate), ротация на дни 2-4 (по 3-4 слова в день - не грузить сразу)
- Вечернее закрытие: лог `track_A/logs/2026-08-18.md`, `daily_tasks.json` (4 строки done), srs_items.json (id 23, 26-30 -> reps 1, due 2026-08-19), progress.json (current_day 2, days_completed 1, start_date 2026-08-18)
- **Критерий готовности Шага 4-L закрыт** (один полный чистый день в новом формате) - шаг 4-L помечен [x] в План_реализации.md

### Следующий шаг

- Неделя 1, день 2: SRS (повторы id 23, 26-30 + новые 10: chunks 22 000 учителей/102 097 вакансий/английский с 1 класса, vocab из ids 39-41) + мини-задание по временам от check-grammar (5 глаголов в форму) + grammar Hewings Units 3-4 (past simple vs continuous, used to) + reading сводка Decision 2371 (5 chunks) + speaking pushed output 2 мин + T-A2
- Замечание для listening: незнакомые слова вводить ДО прослушивания (акцент Кана трудный)

### Где застрял

- Блокеров нет

## Сессия 15 - 2026-08-15

### Сделано

- Разбор провалившегося урока 1 (жалоба владельца: шум в интерфейсе, лишние данные в уроке, разбор непройденных структур). Первопричина найдена: один общий чат - агент видел весь `srs_items.json` (38 карточек) и весь `program.json`, поэтому в speaking попала карточка id 11 (thereby-конструкция C1), которой не было в плане дня 1, и паттерны требовались «с ходу»
- Разбор предложения внешнего агента (субагенты opencode + AGENTS.md + today.md). Вердикт: концепция верная и применима; 3 ошибки исправлены - путь `.opencode/agent/` -> `.opencode/agents/` (по документации opencode, сверено 2026-08-15), его AGENTS.md нельзя было класть вместо существующего (снёс бы протокол сессий и правила проекта - выполнен слияние), добавлены жёсткие `permission: edit/bash deny` (субагент физически не пишет в базу/логи, пишет только оркестратор). Докручено: 6-й субагент weekly-review, `track_A/progress.json` (нумерация дней не от календаря), исключения в правилах 4-5 (frontmatter не добавляется в конфиги opencode - неизвестные ключи уходят провайдеру; today.md/progress.json - перезаписываемые рабочие файлы)
- Созданы `.opencode/agents/`: tutor-speaking, check-grammar, check-monologue, monologue-caf (temperature 0), mock-pitch (расписание исправлено на недели 6-12 по program.json), weekly-review - все read-only, обёртки над `track_B/prompts/` (источник правды сохранён)
- `AGENTS.md`: разделы «Правила урока (антишум)» (тихий бэкенд, маркеры блоков, паттерн сначала на примере, роль директора только в mock-pitch, компактность) и «Оркестрация урока (субагенты)» (today.md как контракт дня, рамп дней 1-3, listening-правила); таблица структуры дополнена
- `track_B/local/protocol.md`: старт через progress.json, блоки привязаны к @субагентам, формат today.md, вечернее закрытие обновляет progress.json
- `План_реализации.md`: шаг 4-L дополнен слоем субагентов (структура + принципы + протокол)
- `track_A/today.md`: готовый план переигровки недели 1, день 1 (рамп: 6 новых карточек id 23, 26-30, C1-паттерны не требуются)

### Следующий шаг

- Переиграть неделю 1, день 1 в новом формате: «Начинаем день» -> today.md -> блоки через субагентов -> вечернее закрытие. Если день прошёл чисто - критерий 4-L закрыт, пометить шаг [x]
- Если синтаксис @вызова или поведение субагентов в живой версии opencode отличается от документации - поправить описания/конфиги `.opencode/agents/`
- Track B (secondary): шаги 4-8 только после появления сервера

### Где застрял

- Блокеров нет

## Сессия 13 - 2026-08-13

### Сделано

- Владелец одобрил `program.json` - шаг 3 закрыт, программа становится единственным источником ежедневных заданий
- Решение по архитектуре: локальный прототип на opencode становится ГЛАВНЫМ путём на текущий момент; шаги 4-8 (Supabase + n8n + Telegram на сервере) - вторичный путь, отложен до появления сервера, план не удаляется
- Из прототипа убраны все внешние зависимости: API-ключ не нужен (CAF-прогоны делает сам opencode в чате), транскрипции голоса ученик присылает текстом - Whisper и скрипты-коннекторы не нужны; единственный опциональный скрипт - `median.js` без API
- `План_реализации.md`: статусы обновлены (шаг 3 [x], шаги 4-8 [-], 4-L [/] как текущий главный), Шаг 4-L переписан под opencode-протокол (план дня → блоки → вечерний лог → JSON-база), Track A дополнен режимом исполнения через opencode

### Следующий шаг

- Собрать Шаг 4-L: `track_B/local/db/*.json` (пустые базы по схеме) + `track_B/local/protocol.md` (протокол дня)
- Track A: первый день по program.json через opencode (план дня → блоки); Cambridge test - когда будет время, не блокер
- Track B (secondary): шаги 4-8 только после появления сервера

### Где застрял

- Блокеров нет

## Сессия 14 - 2026-08-13

### Сделано

- Cambridge test закрыт по решению владельца: не нужен, пройден полный EF SET (50 мин); `diagnostics.md` обновлён, диагностика официально закрыта
- Собран Шаг 4-L (инфраструктура локального режима):
  - `track_B/local/db/` - JSON-базы по схеме Supabase 1:1: `daily_tasks.json` (0 строк), `srs_items.json` (38 chunks из chunk_bank_seed), `error_log.json` (13 систематизированных ошибок baseline), `speaking_recordings.json` (baseline-монолог с метриками T-A2 + CAF), `assessments.json` (полный EF SET). Всё провалидировано (валидный JSON, структуры корректны)
  - `track_B/local/protocol.md` - протокол дня в opencode: старт сессии → план из program.json + повторы SRS → блоки (T-A1/T-A3/T-A4) → CAF x3 в чате → вечернее закрытие (лог + daily_tasks + srs_items) → воскресный срез + weekly review
  - `track_B/local/median.js` - опциональный скрипт без API: 3 JSON прогонов CAF → медиана + флаги надёжности (тест: 3 прогона, медианы корректны, разброс 5% < 15% лимита)
- Исправление: median.js устойчив к BOM (PowerShell пишет UTF-8 with BOM - ломал JSON.parse)

### Следующий шаг

- **Первый учебный день** (неделя 1, день 1): команда "Начинаем день" → план из program.json → блоки (srs 5 мин, grammar Hewings U1-2 15 мин, listening Sal Khan TED 15 мин, speaking T-A1 20 мин) → вечернее закрытие с заполнением daily_tasks + srs_items
- Track B (secondary): шаги 4-8 только после появления сервера

### Где застрял

- Блокеров нет. Всё готово к старту занятий.

## Сессия 1 - 2026-08-11

### Сделано

- Прочитана постановка задачи (`Задача.md`)
- Уточнены параметры: 45-60 мин в день, дедлайн 1-2 месяца (запуск курса), приоритет - говорение на темы продажи курса + грамматика, интерфейс - Telegram-бот, инфраструктура с нуля, бюджет в основном бесплатный
- Зафиксировано два трека: Track A (учёба сразу) и Track B (сборка системы параллельно)
- Создана структура проекта: `AGENTS.md`, `session.md`, `План_реализации.md`, папки треков
- Создан банк промптов: `track_B/prompts/` (T-A1 tutor, T-A2 проверка монолога, T-A3 грамматика, T-A4 mock pitch, weekly review)
- Промпты исследования шагов 1-3 сохранены в `track_B/research/`
- Шаблоны Track A: `track_A/logs/diagnostics.md`, `track_A/logs/_template_daily.md`, `track_A/speaking/baseline.md`

### Следующий шаг

- Track A: выполнить Шаг 0 плана (диагностика уровня + базовый набор материалов), стартовать ежедневную рутину завтра
- Track B: выполнить Шаг 1 плана - промпт исследования методологий в Gemini Deep Research, артефакт сохранить в `track_B/research/`

### Где застрял

- Ни на чём, блокеров нет

## Сессия 2 - 2026-08-11

### Сделано

- Проведён экспертный разбор проекта: сверка плана с `Задача.md`, проверка AGENTS.md, session.md, всех промптов и шаблонов
- Внесены 5 правок по итогам разбора:
  - `AGENTS.md`: добавлен протокол сессии (старт/завершение), исключение для `Задача.md` в правиле frontmatter
  - `План_реализации.md`: день 1 разделён (диагностика + baseline без рутины, рутина со дня 2); в рутину 0.4 добавлен ручной SRS-блок 5 мин; воскресный срез приведён к формату baseline (2 мин, та же тема)
  - `План_реализации.md`, шаг 4: добавлен обязательный fit-check program.json на схему БД перед созданием таблиц (защита от переделки воркфлоу)
  - `session.md`: добавлен раздел "Текущий статус"

### Следующий шаг

- Без изменений: Track A - шаг 0 (диагностика + baseline), Track B - шаг 1 (исследование методологий)

### Где застрял

- Блокеров нет

## Сессия 3 - 2026-08-11

### Сделано

- Ученик подключил базу собственного курса: платформа (`PLATFORM.md`), 5 уроков (`Lesson_1-5.md`), 13 исследовательских отчётов (методология CLIL/PBL, реформа Вьетнама, легальность/PDPL, рынок и родители, конкуренты, AI-грамотность)
- Проверена структура базы на диске, пути зафиксированы
- Создан `track_A/program/course_base_index.md`: карта базы, карта владения C1 (7 тем), банк реальных возражений для mock pitch
- `План_реализации.md`: добавлена стартовая последовательность дней 1-4 (заглушка максимум 3 дня, учёба по program.json с дня 3-4); шаг 3 - база курса стала третьим обязательным входом синтеза, speaking/pitch блоки строятся вокруг реального продукта
- `track_B/prompts/mock_pitch.md`: добавлено усиление реальным банком возражений

### Следующий шаг

- Track A: день 1 - диагностика (EF SET + Cambridge) + baseline-монолог
- Track B: день 1 - запустить промпты шагов 1-2 в Gemini Deep Research; день 3 - синтез program.json с тремя входами (2 отчёта + база курса)

### Где застрял

- Блокеров нет

## Сессия 4 - 2026-08-11

### Сделано

- Разбор плана на несостыковки по запросу владельца; найдено: устаревший промпт шага 3 в `track_B/research/` (нет базы как третьего входа), промпт шага 2 без роли и контекста, путь к базе нарушал правило 1
- `AGENTS.md`: правило 1 ужесточено - агент не выходит за пределы папки даже в чтение; выход только через запрос (зачем / что сделать / какие файлы) и явное «да»; копирование внешних материалов выполняет сам владелец; в структуру добавлена `course_base/`
- Создана папка `course_base/` - сюда владелец сам скопирует базу курса (платформа, уроки, исследования)
- `course_base_index.md`: расположение базы исправлено на `course_base/` внутри папки
- `prompt_step2_materials.md`: промпт переписан с нуля - роль, контекст ученика, задача, формат результата; добавлено явное указание куда вставлять
- `prompt_step3_synthesis.md`: синхронизирован с планом - база курса как третий обязательный вход (список входов в шапке файла)

### Следующий шаг

- Владелец копирует базу курса в `course_base/` (PLATFORM.md, Lesson_1-5.md, файлы research из фаз 0-4.1)
- Track A: день 1 - диагностика + baseline; Track B: запуск шагов 1-2 в Gemini Deep Research

### Где застрял

- Блокеров нет

## Сессия 5 - 2026-08-11

### Сделано

- Слиты два отчёта Phase 1 (`track_B/Step 1/`): Notebook LM (мастер-каркас) + Gemini (обогащение) в единый `B2-C1 Phase 1 (Merged).md` (с YAML frontmatter). Все 9 блоков плана выполнены; источники объединены (124 позиции, дубли по URL убраны)
- Исправлены нестыковки (подробно в отчёте владельцу): цифры часов времени объединены (63-112 ч), цели метрик EFT/T (80% vs 70%) и E/100 (2.5 vs 2-3) приведены к одному ряду, конфликт нумерации юнитов Hewings (2-е vs 3-е издание) помечен, недели 13-16 оформлены как явная фаза финальной интеграции (в NLM они висели без силлабуса), Advanced Passives на неделях 1-2 не дублируют неделю 6 (перекрёстная ссылка), добавлены 5-й и 6-й failure modes из Gemini (Inconsistent Spacing + Premature Automatization), добавлены строки British Council и edX в таблицу программ, раздел SAT (DeKeyser, Norris & Ortega) включён в теоретическую базу

### Следующий шаг

- Track B: шаг 3 - синтез program.json с тремя входами (2 отчёта Phase 1 + база курса); владелец проверяет Merged-отчёт
- Track A: день 1 - диагностика + baseline

### Где застрял

- Блокеров нет

## Сессия 7 - 2026-08-12

### Сделано

- Выполнен шаг 3 (синтез программы): создан `track_A/program/program.json` из трёх входов - Merged Phase 1 (методология SLA), Merged Phase 2 (материалы + банк 40 паттернов) и база курса (платформа, 5 уроков, методичка, 13 отчётов; отчёты диджестированы сабагентами по фазам)
- Структура: 12 недель x 7 дней (6 учебных + лёгкое воскресенье), каждый день 45-60 мин, воскресенье ~35-40 мин; JSON валиден, все skill-значения в допустимом наборе (grammar/speaking/listening/reading/srs/pitch), у каждого блока есть material_ref
- Недели 1-4: грамматический ребилд по Hewings (U1-8 -> 9-14 -> 44-47 -> 40-43/48-52) + питч-скрипт по сегментам (зачин/why now -> боли родителей -> методология -> платформа); неделя 4 - месячный EF SET
- Недели 5-8 заточены под питч: W5 первая сборка 10-минутного питча, W6 mock Q&A, W7 все 6 возражений из банка по LAER x ACR, W8 дедлайн - полный mock pitch >= 8/10 (генеральные репетиции каждый день)
- Недели 9-12: консолидация (регистры директор/родитель), price/value, clefts, инверсия, финальный mock >= 9/10 + план поддержания C1
- Сгенерирован chunk_bank_seed: 20 паттернов из исследования + 14 доменных chunks из базы курса (Decision 2371, боли, белое пятно, Operator Rule, PDPL и т.д.); srs_rules: 10 новых/день (5 chunks + 3 слова + 2 грамматических каркаса), цель >= 300 карточек к неделе 8
- Валидация: ConvertFrom-Json, проверка бюджетов времени, наборов skill, наличия material_ref, прогрессии милестоунов

### Следующий шаг

- Владелец просматривает `program.json` глазами (критерий готовности шага 3); после одобрения программа - единственный источник ежедневных заданий
- Track A: день 1 - диагностика (EF SET + Cambridge) + baseline-монолог (промпт уже ждёт: тема из шага 0.2)
- Track B: шаг 4 - fit-check program.json на схему Supabase (daily_tasks: skill/duration_min/activity/material_ref - ложится без изменений), затем DDL

### Где застрял

- Блокеров нет

## Сессия 6 - 2026-08-11

### Сделано

- Слиты два отчёта Phase 2 (`track_B/Step 2/`): Gemini (коммерческо-лингвистическая база) + Notebook LM (когнитивно-риторический мастер-шаблон) в единый `B2-C1 Phase 2 (Merged).md` с YAML frontmatter. Структура строго по плану владельца: 7 глав (контекст -> риторика -> LAER x ACR -> план продаж -> каталог -> банк 40 паттернов -> расписание)
- Все 40 паттернов сохранены: 20 Gemini + 20 Notebook LM, классифицированы по 5 категориям Gemini, отформатированы по 3-колоночной структуре Notebook LM (7+8+8+9+8); источники консолидированы (89 позиций, 1 точный дубль Highspot отмечен)
- Исправлены нестыковки плана (детально в отчёте владельцу): конфликт выходных (pitch-симуляция vs extensive reading -> суббота/воскресенье), конфликт будних дней (Gemini vs NLM), маппинг Example 1/2 не соответствовал B2B/B2C (~10 примеров адаптировано, помечено "adapted"), дубль Cambridge Readers (The Best of Times? - это книга внутри серии Level 6, объединены в одну строку)
- `План_реализации.md`: Шаг 2 отмечен [x]

### Следующий шаг

- Track B: шаг 3 - синтез program.json с тремя входами (Merged Phase 2 + Merged Phase 1 + база курса); владелец проверяет Merged Phase 2
- Track A: день 1 - диагностика + baseline

### Где застрял

- Блокеров нет

## Сессия 8 - 2026-08-12

### Сделано

- Полный аудит проекта по запросу владельца: research-отчёты, program.json, course_base, сверка с Задача.md и планом (3 параллельных сабагента + ручная валидация JSON)
- Вердикт: курс собран грамотно (8/10), ничего критически не упущено; найдено 6 содержательных дефектов и ряд рассинхронов в документации - все исправлены
- `program.json` (JSON пере-валидирован, все дни 35-60 мин):
  - EF SET больше не ломает бюджет дня: нед. 4 д.7 = reading 25 + listening 25 (монолог недели перенесён на д.6); нед. 8 д.5 = EF SET-день (протокол требовал W4/W8/W12, на W8 теста не было); нед. 12: финальный mock перенесён на д.6, EF SET на д.7
  - Milestones нед. 8 и 12 теперь содержат метрики протокола (E/100 <= 4.5 / EFT/T >= 60% к W8; <= 2.5 / >= 80% к W12)
  - grammar_path: диагностика уточнена (EF SET + Cambridge + Collins, до старта недели 1)
  - Hewings нед. 4: 3 юнита в 15 мин исправлено (д.3 = Units 48-50, д.4 = Units 51-52)
  - chunk_bank_seed: добавлены 4 chunks по CLIL 4C / PBL Gold Standard / GRR / process-over-product (38 вместо 34)
  - Опечатки: boli -> боли, Репитиция -> Репетиция (x4), SRS нед. 1 д.1 теперь ссылается на chunk_bank_seed вместо несуществующих логов
  - assessment_protocol: зафиксированы дни EF SET (W4 вс, W8 пт, W12 вс) и исключение воскресного монолога для недели 4
- course_base: 2 устаревших отчёта помечены баннером SUPERSEDED («Фаза 0. Интеграция CLIL и PBL...» с чат-ботом; «Фаза 4.1 Интеграция стандартов...» с другой структурой занятий); в Lesson_1/2 восстановлены таблицы гейтинга §7; убраны устаревшие маркеры «нужен источник» (Lesson_1 §5, Lesson_2 §8); сломанный markdown блока Board Example в Lesson_2 §5 приведён в порядок; 16_source_theme_presets.md: 5 -> 6 presets; PLATFORM.md: ссылка на спеку исправлена
- `course_base_index.md`: 13 -> 16 отчётов, веса рубрики 40/20/40 -> 40/30/30 (по методичке), путь Kimi K3/PLATFORM.md -> PLATFORM.md, пути Research/ -> корень course_base/, добавлено предупреждение о SUPERSEDED-отчётах
- `План_реализации.md`: шаг 1 отмечен [x], пути к Merged-отчётам исправлены на track_B/research/ (папок track_B/Step 1-2 не существовало)

### Следующий шаг

- Владелец просматривает исправленный `program.json` (критерий готовности шага 3); после одобрения программа - единственный источник ежедневных заданий
- Track A: день 1 - диагностика (EF SET + Cambridge) + baseline-монолог; без этого метрики программы нечем мерить
- Track B: шаг 4 - fit-check program.json на схему Supabase, затем DDL
- Открытый вопрос к владельцу: будущий модуль - 10 занятий (3_platform_architecture_spec.md §6) или 12 занятий (2_business_market_legal_brief.md §2.4)? Нужно привести к одному числу

### Где застрял

- Блокеров нет; Track A не стартует без диагностики владельца (шаг 0)

## Сессия 9 - 2026-08-12

### Сделано

- Разбор независимой внешней оценки проекта; все ключевые претензии подтвердились по файлам:
  - Дыра в инструментарии: assessment_protocol и все milestones W1-W12 ссылались на метрики E/100, EFT/T, MLT, subordination, но промпт T-A2 (check_monologue.md) их не считает - ни одной из четырёх цифр получить было нельзя
  - Шапка T-A2 говорила про «10-минутный срез», milestones - про 3-минутные монологи (неделя 9 - 4-минутный)
  - Шапка T-A4 («с недели 3, минимум 2 раза в неделю») расходилась с program.json: первый mock только на неделе 6
- Создан `track_B/prompts/check_monologue_caf.md` (T-A2-CAF): отдельный промпт только под метрики, явный пошаговый метод подсчёта T-units с обязательной разметкой и арифметикой (взята внешняя заготовка, доработана: ошибки считаются по каждому вхождению, а не «distinct» - distinct вносит дополнительный шум и занижает систематические ошибки; добавлено правило для фрагментов без финитного глагола)
- `check_monologue.md`: формат исправлен на 3-минутный baseline (неделя 9 - 4-минутный), добавлена связка с T-A2-CAF
- `mock_pitch.md`: расписание синхронизировано с program.json (недели 6-12, полные mock на 8/10/11/12)
- `check_grammar.md` (T-A3): расширен - принимает и ответы на упражнения, и свои предложения о курсе (в program.json дни 1-5 часто просят «5 своих предложений»)
- `program.json` assessment_protocol: T-A2 -> связка T-A2 + T-A2-CAF; добавлена калибровочная оговорка для недели 1 (если первый замер сильно расходится с порогами, пороги W1-W4 корректируются от реального baseline) и дрейф-контроль метрик
- `План_реализации.md`: добавлен блок T-A2-CAF, метка T-A4 исправлена на «недели 6-12»
- Владелец проходит диагностику (EF SET + Cambridge) сегодня; следом - baseline-монолог, который теперь прогоняется через T-A2 + T-A2-CAF для стартовых цифр

### Следующий шаг

- Владелец: диагностика -> результаты в `track_A/logs/diagnostics.md`; baseline-монолог -> транскрипт + 4 метрики T-A2-CAF в `track_A/speaking/baseline.md`
- После первых цифр: при большом расхождении с порогами W1-W4 скорректировать milestones под реальный baseline
- Track B: шаг 4 - fit-check program.json на схему Supabase, затем DDL

### Где застрял

- Блокеров нет

## Сессия 10 - 2026-08-12

- Пройден EF SET: Reading 56 (B2), Listening 48 (B1), Final 52 (B2 Upper Intermediate)
- Результаты записаны в `track_A/logs/diagnostics.md`
- Cambridge test ещё не пройден

### Следующий шаг

- Пройти Cambridge test (https://www.cambridgeenglish.org/test-your-english/) — нужен для полноты диагностики и решения по грамматике
- Записать baseline-монолог (шаг 0.2) — транскрипт + 4 метрики T-A2-CAF в `track_A/speaking/baseline.md`
- После этого — старт ежедневной рутины (день 2)

### Где застрял

- Блокеров нет

## Сессия 12 - 2026-08-13

### Сделано

- Независимый разбор 4 результатов тест-прогона baseline (2 сети × 2 чата каждый):
  - N1+N2 = одна сеть (два независимых прогона); N3+N4 = вторая сеть
  - Главная находка: **LLM недетерминированны** — одна и та же модель в одном прогоне "почистила" транскрипт и слила T-units (30, MLT 14, E/100 6.4), в другом честно следовала промпту (61, MLT 10, E/100 8.7). Разброс E/100 от 5.2 до 8.7 на одном тексте = ±40%
  - Вердикт: сеть N1/N2 рабочая (N2 — единственный корректный CAF), промпт менять не нужно; N3/N4 не использовать для CAF (N4 выдаёт garbled output)
  - Решение: в автоматическом режиме CAF прогоняется **3 раза → медиана**; разброс >15% флагируется как unreliable
- `check_monologue_caf.md`: добавлен STEP 5 (JSON-вывод для парсинга), указание "count words AS-IS" (не чистить транскрипт), секция про 3-прогонную медиану
- `План_реализации.md` шаг 6 (WF-3): переписан — T-A2 (1 прогон) + T-A2-CAF (3 прогона → медиана → JSON → Supabase с флагами надёжности). Добавлен **Шаг 4-L: локальный прототип** — до появления сервера вся инфраструктура заменяется на JSON-файлы + скрипты в `track_B/local/`, совместимые с будущей миграцией в Supabase + n8n
- `program.json` assessment_protocol: дописано про 3-прогонную CAF и флаги надёжности
- Владелец сохранил результаты N2 в `track_A/speaking/baseline.md` (через другую модель)

### Следующий шаг

- **Шаг 4-L**: собрать `track_B/local/` — JSON-базу (поля 1:1 со схемой Supabase) + скрипт `assess_monologue.js` (транскрипт → T-A2×1 + T-A2-CAF×3 → медиана → JSON + markdown)
- `program.json` ждёт одобрения владельца — после одобрения программа единственный источник заданий
- Track A: Cambridge test + старт ежедневной рутины (день 2, неделя 1)
- Шаги 4-8 (Supabase + n8n) — отложены до появления сервера; Шаг 4-L их заменяет на локальном уровне

### Где застрял

- Блокеров нет; нужен API-ключ для LLM в скриптах прототипа (владелец предоставляет .env)




## Session 29 - 2026-08-29

### Done

- Completed Track A Week 1, Lesson 5: S14/S15, TED listening with captions, comprehension response, and compact shadowing.
- Actual lesson time recorded from the learner: 60 minutes.
- SRS ids 23, 26-30 were reviewed; 28-30 required immediate retries. id 53 remains due because the learner did not answer it.
- Added S14/S15 as the two new items; both are due in Lesson 6.
- Recorded a pending time-control correction: SRS ran to 15 minutes instead of its five-minute hard stop.

### Next step

- Track A Lesson 6: pitch practice, with SRS stopped automatically at five minutes.

### Blocked

- No blocker. The SRS time-control fix remains pending in `Корректировки_урока.md`.

## Session 30 - 2026-08-30

### Done

- Completed Track A Week 1, Lesson 6: five-minute SRS warm-up and pitch practice with one full retry.
- Recorded 30 minutes of actual learning time from the learner's explicit answer. Wall-clock time was longer because stronger-model responses required 2-3 minutes of waiting; that latency was excluded from learning time.
- SRS hard stop was enforced. ids 53 and 25 were answered; ids 41, 49, 50, and 51 remained unseen and unchanged.
- Removed the unlearned hook requirement after the learner's stop signal. Recorded the orchestration issue as P20; no new hook or replacement pattern was introduced.
- Pitch retry corrected `white spot`, `on-the-ground capacity`, and `What I suggest is ...`. No CAF or full rubric was used.

### Next step

- Track A Lesson 7: light weekly review, planned for 30-45 minutes.
- Keep productive learning time separate from model-response latency when recording actual duration.

### Blocked

- No lesson blocker. P20 remains pending for a later system patch.

## Session 31 - 2026-08-30

### Done

- Audited six saved chat exports: OpenCode JSON for Lessons 1-3 and Codex Markdown for Lessons 4-6; source files were preserved unchanged and indexed in track_A/transcripts/index.md.
- Added the shared Codex/OpenCode analytics contract without changing the seven-lesson cycle, program, SRS scheduling, or agent routing.
- Added lesson_sessions.json: Lessons 1-3 store auditable chat spans (117.4 / 101.6 / 130.5 minutes) without mislabelling them as productive time; Lessons 4-6 store explicit actual values (30 / 60 / 30) and known variance reasons.
- Backfilled 42 source-linked error groups containing 212 detectable occurrences across Lessons 1-6 into error_events.json; added recurring/high-impact covered candidates to error_log.json.
- Backfilled ten lesson speaking/listening/pitch transcripts plus the existing baseline in speaking_recordings.json.
- Normalised daily_tasks.json with lesson number and separate planned/actual fields while retaining legacy duration_min.
- Strengthened SRS deadline enforcement (P19), the untaught-material stop signal (P20), lesson closure telemetry, the daily log template, and the Week 1 review inputs.
- Made track_A/LESSON_START.md the explicit universal start file and documented the exact Codex/OpenCode command.

### Next step

- Run Lesson 7 through the universal start route and use the new telemetry files for the first evidence-based weekly review.

### Blocked

- Productive learning time for Lessons 1-3 cannot be reconstructed exactly from chat spans; it remains null rather than estimated.

## Session 32 - 2026-08-31

### Done

- Completed Track A Week 1, Lesson 7: voice-first course-and-market sample followed by a light evidence-based weekly review.
- Recorded approximately 30 minutes of productive learning time from the learner's explicit answer; model wait was not measured and is excluded.
- Preserved method provenance: the learner spoke first, then manually corrected approximately half of the speech-to-text transcript and checked approximately two constructions in personal notes. The saved sample measures retrieval plus independent self-repair, not clean spontaneous fluency.
- Recorded two Week 1 signals: the learner can connect course, market, and policy coherently; sentence control and exact chunk retrieval remain the next accuracy priority.
- Recorded one bounded Week 2 adjustment: replace one pitch-expansion turn with revision of two existing key claims, without adding work.
- Added the exact submitted transcript, process metadata, and quiet analytics to the local database. No SRS items, numerical score, or CAF were added.

### Next step

- Track A Lesson 8: Week 2 Day 1 grammar.
- Preserve the normal lesson timebox and apply the bounded revision replacement later in Week 2 without increasing volume.

### Blocked

- No lesson blocker. The raw auto-transcript and original audio were not retained, so Lesson 7 cannot be used as a clean spontaneous-fluency benchmark.
