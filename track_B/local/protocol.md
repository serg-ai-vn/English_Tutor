---
title: Канонический протокол урока — English_Tutor
created: 2026-08-13
updated: 2026-10-30
tags: [english, lesson, agents, protocol, github]
status: active
related: [../../AGENTS.md, ../../track_A/LESSON_START.md, ../../План_реализации.md, ../../Корректировки_урока.md]
---

# Протокол урока

Это канонический протокол Track A. Любая среда исполнения (**OpenCode**, **OpenAI Codex**, **Claude Code**, **Cursor / Windsurf** или веб-чат) исполняет одну и ту же программу по единым промптам из `track_B/prompts/`. Схема JSON-файлов в `track_B/local/db/` сохраняет совместимость для будущей миграции в Supabase.

## Роли и границы

- **Основной чат — оркестратор и единственный писатель (`Single Writer`).** Он планирует урок, записывает `track_A/today.md`, передаёт узкий контекст в учебные блоки и после урока обновляет JSON-базу, логи и Git-репозиторий.
- **Учебные блоки — read-only роли.** Каждый учебный блок работает строго по своему промпту из `track_B/prompts/*.md` и контракту `track_B/prompts/analytics_contract.md`:
  - В **Codex**: вызываются субагенты `.codex/agents/*.toml` (которые напрямую читают `track_B/prompts/*.md`).
  - В **OpenCode**: вызываются субагенты `.opencode/agents/*.md` (которые напрямую читают `track_B/prompts/*.md`).
  - В **других средах**: вызывается read-only субагент (через `Task` tool) или включается режим строгой ролевой изоляции напрямую по `track_B/prompts/*.md`.
- Одновременно разрешено до 3 субагентов. Обычные блоки идут строго последовательно; три параллельных вызова используются только для расчёта медианы `check_monologue_caf.md` на бенчмарках W4/W8/W12.
- Учебный блок получает буквальное содержимое `track_A/today.md`, `track_B/prompts/analytics_contract.md` и только нужный для его блока payload. Самостоятельно расширять контекст, читать логи, архивы или писать файлы он не имеет права. Learner-facing ответ остаётся компактным; отдельный `ANALYTICS_PACKET` получает только оркестратор.

| День цикла | Главный навык | Канонический промпт (`track_B/prompts/`) | Codex / OpenCode агент |
|---:|---|---|---|
| 1 | grammar | `srs_review.md` → `grammar_lesson.md` → `check_grammar.md` | `srs_review` (`@srs-review`) → `grammar_lesson` (`@grammar-lesson`) → `check_grammar` (`@check-grammar`) |
| 2 | speaking | `srs_review.md` → `tutor_speaking.md` | `srs_review` (`@srs-review`) → `tutor_speaking` (`@tutor-speaking`) |
| 3 | reading | `srs_review.md` → `reading_tutor.md` | `srs_review` (`@srs-review`) → `reading_tutor` (`@reading-tutor`) |
| 4 | data speaking | `srs_review.md` → `data_speaking.md` | `srs_review` (`@srs-review`) → `data_speaking` (`@data-speaking`) |
| 5 | patterns + listening | `srs_review.md` → `patterns_listening.md` | `srs_review` (`@srs-review`) → `patterns_listening` (`@patterns-listening`) |
| 6, W1–W5 | pitch practice | `srs_review.md` → `pitch_coach.md` | `srs_review` (`@srs-review`) → `pitch_coach` (`@pitch-coach`) |
| 6, W6–W12 | mock pitch | `srs_review.md` → `mock_pitch.md` | `srs_review` (`@srs-review`) → `mock_pitch` (`@mock-pitch`) |
| 7 | light review / benchmark | подходящий input → `weekly_review.md`; для benchmark (day 6 W4/W8/W12): `check_monologue.md` + `check_monologue_caf.md` ×3 | `weekly_review` (`@weekly-review`); benchmark: `check_monologue` (`@check-monologue`) + `check_monologue_caf` (`@check-monologue-caf`) ×3 |

## Старт нового урока

Команда ученика: **«Начинаем урок»** (или **«У меня был перерыв, давай повторим пройденное»**). Быстрый маршрут описан в `track_A/LESSON_START.md`.

1. Проверить живой main, целостность последнего закрытия и prerequisites по `lesson_contract.md`; прочитать контракт и передать его ролям.
2. Оркестратор читает `track_A/progress.json` (включая накопительные списки `covered_grammar` и `introduced_material`) и вычисляет `lesson_number = days_completed + 1`.
3. Из `track_A/program/program.json` берёт только текущую неделю и позицию дня, не весь курс (либо включает **Режим повторения после перерыва `Refresher`**, если ученик попросил освежить пройденный материал перед тем, как идти дальше).
4. Из `track_B/local/db/srs_items.json` выбирает только карточки с `status != "deprecated"`, `reps > 0`, `due_lesson <= lesson_number`. Сортировка обязательна и детерминирована: **`(due_lesson ASC, lapses DESC, id ASC)`**. Из отсортированной очереди берутся первые максимум 5 карточек; порядок записей в исходном JSON не имеет значения.
5. Все выбранные `front` выдаются одним нумерованным пакетом (`1–5`). Ученик отвечает на 1–5 одним сообщением (`не помню` — допустимый ответ), затем получает одну общую проверку. Только карточки с ошибкой получают один общий retry; новых примеров и дополнительных раундов нет.
6. Первичный retrieval планируется на 5 минут learner-active time: от момента, когда пакет показан ученику, до получения его ответа. Время генерации пакета, проверки и других model/agent waits не считается. Единый retry может занять максимум ещё 2 learner-active минуты. Всё фактическое SRS-время сверх первых 5 минут сокращает главный блок на ту же величину, поэтому общий урок не удлиняется. Не показанные карточки остаются без изменения.
7. Новые карточки не берутся из общего пула автоматически. Они создаются только из материала главного навыка: максимум 2 за урок. После фактического ввода и подтверждения ученика новая карточка получает `status: "active"`, `reps: 1`, `lapses: 0`, `interval_lessons: 1`, `due_lesson: lesson_number + 1`; `reps: 0` зарезервирован для ещё не введённых seed-элементов. Одна повторяющаяся высокочастотная ошибка может заменить одну из двух, но не добавляется сверх лимита.
8. Оркестратор перезаписывает `track_A/today.md`, показывает один компактный план и ждёт подтверждения.
9. После подтверждения каждый учебный блок передаётся соответствующему агенту вместе с контрактом тихой аналитики (`track_B/prompts/analytics_contract.md`).

Календарь не управляет курсом. Пропуск дня или двухмесячный перерыв не создаёт долг и не увеличивает урок.

## Объём по дням и Refresher

Единственная таблица квот — `lesson_contract.md` (25–30 минут, safety cap 35; на 25 стоп). Refresher не увеличивает days_completed и не вводит новые карточки. Все квоты — максимум, не обязательство превысить время. Программа определяет тему, промпт — механику, контракт — общие границы.

## Режим коррекции

- Контролируемая grammar/drill практика: target-ошибка исправляется сразу, затем одна повторная попытка.
- Свободная speaking/pitch практика: не перебивать; в конце максимум 2–3 высокополезные коррекции.
- Ошибка в непройденной структуре помечается `not yet covered — info`, не штрафуется и не попадает в агрегированный `error_log` или SRS; для аналитики occurrence сохраняется в `error_events.json`.
- SRS-карточкой становится не каждая ошибка, а только повторяющаяся или сильно мешающая коммуникации ошибка в уже пройденном материале.
- Ограничение 2–3 коррекции относится к показу ученику. Агент молча возвращает оркестратору все обнаружимые случаи по `analytics_contract.md`; оркестратор сохраняет verbatim wording, coverage и уверенность, не превращая каждую запись в drill.

## Канонический формат `track_A/today.md`

1. YAML frontmatter с номером урока и датой обновления.
2. Цель, главный навык, плановое время и hard cap 35 минут.
3. Таблица: блок, минуты, агент/промпт, ожидаемый результат.
4. `SRS reviews`: точный отсортированный пакет максимум из 5 `id + front`, ключ сортировки `(due_lesson ASC, lapses DESC, id ASC)` и поля времени пакета/retry; новые элементы отдельно и максимум 2.
5. `introduced_material`: весь ранее введённый материал, который разрешено требовать сегодня.
6. `covered_grammar`: структуры, по которым разрешено оценивать.
7. `not_scored_yet`: известные, но ещё не освоенные структуры.
8. Источники и payload для агента; весь учебный материал всё равно выдаётся в чате.
9. Чек-лист закрытия и раздельные поля `planned_learning_min` / `actual_learning_min` / `model_wait_min`.

## CAF — только benchmark

1. `check_monologue` (`check_monologue.md`) получает transcript, `mode: benchmark`, `covered_grammar`, `introduced_material`.
2. Тот же исходный transcript без очистки параллельно получают три экземпляра `check_monologue_caf` (`check_monologue_caf.md`).
3. Оркестратор берёт медиану 7 полей (при необходимости используя `node track_B/local/median.js`): `t_units`, `words`, `errors`, `e_per_100`, `eft_per_t`, `mlt`, `subordination`. Разброс более 15% от медианы помечается `reliable: false`.
4. Результат сохраняется в существующие `speaking_recordings.json`, `assessments.json` и дневной лог без изменения схемы.

## Закрытие урока и синхронизация

Выполнить полный контракт `lesson_contract.md`: actual_learning_min, единый комплект, проверка, атомарный commit, перечитывание GitHub. Неподтверждённая запись не verified_main. При ошибке немедленный понятный отчёт. Условные файлы не обновлять искусственно.

## Правила данных

- `program.json` во время урока только читается; содержательные изменения вносятся отдельным согласованным патчем.
- JSON-строки не удаляются: устаревшие элементы получают `status: "deprecated"`, ошибки — `resolved: true`.
- `due_lesson` и `interval_lessons` измеряются уроками, не календарными днями.
- Субагент не пишет в JSON и логи. Один писатель — один источник состояния.
- `lesson_sessions.json` — один объект на session_id (Refresher — самостоятельная сессия); `error_events.json` — append-only occurrence log; `error_log.json` — агрегированные педагогические кандидаты, а не полный архив.
- Исходная learner wording сохраняется дословно. Исправленный текст хранится рядом и никогда не заменяет источник.
