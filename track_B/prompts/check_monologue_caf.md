---
title: Промпт - CAF-метрики монолога (T-A2-CAF)
created: 2026-08-12
updated: 2026-10-27
tags: [english, task, metrics]
status: active
related: [../../План_реализации.md, check_monologue.md]
---

# T-A2-CAF - Подсчёт E/100, EFT/T, MLT, subordination index

Когда использовать: сразу после T-A2, тем же транскриптом. Отдельный промпт
специально — чтобы точный количественный подсчёт не смешивался с
качественной обратной связью (ошибки/рерайт/чанки) в одном проходе. Одна
задача на промпт = меньше шансов, что подсчёт "поплывёт" от недели к неделе.

T-A2 (check_monologue.md) эти четыре цифры не считает — его промпт их не
просит; до 2026-08-12 assessment_protocol в program.json ссылался на них,
но инструмента не было. Теперь метрики считаются здесь.

```
You are doing a precise linguistic analysis, not general feedback.
Follow these steps in order and show your work - do not skip to the
final numbers.

STEP 1 - Segment the text into T-units.
A T-unit = one independent (main) clause plus every subordinate clause
attached to or embedded in it. Apply these rules consistently:
- Two independent clauses joined by "and / but / or / so" -> two
  separate T-units.
- Two independent clauses joined only by a comma (comma splice) -> two
  separate T-units.
- Non-finite phrases (participle, infinitive, gerund phrases without
  their own subject) stay INSIDE the T-unit they modify - never a
  separate T-unit or clause.
- A fragment with no finite verb of its own attaches to the nearest
  T-unit and never counts as a separate T-unit.
Number every T-unit: [T1], [T2], ...

STEP 2 - For each T-unit, count finite subordinate clauses inside it
(relative clauses, that-clauses, because/if/when/while-clauses, etc. -
each must have its own subject + finite verb to count). If a
subordinate clause itself contains two finite clauses coordinated by
"and/but/or", count both. Show: [T-unit number] -> main clause (1) +
subordinate clauses (n) = total clauses.

STEP 3 - For each T-unit, mark ERROR-FREE or CONTAINS-ERROR (any
grammatical error anywhere inside it counts), and list every error
occurrence with its location - count repeated errors of the same type
each time they occur.

STEP 4 - Compute and show the arithmetic, not just the result:
- Total words (approximate is fine, but count AS-IS — include false
  starts, self-corrections, repeated words; do not clean the transcript)
- E/100 = (total grammatical errors, every occurrence counted / total
  words) x 100
- EFT/T = (error-free T-units / total T-units) x 100%
- MLT = total words / total T-units
- Subordination index = total clauses from Step 2 (main + subordinate,
  summed across all T-units) / total T-units

STEP 5 - After the required segmentation and arithmetic above, output one
final JSON block and no commentary after that block:
```json
{
  "t_units": <int>,
  "words": <int>,
  "errors": <int>,
  "e_per_100": <float>,
  "eft_per_t": <float>,
  "mlt": <float>,
  "subordination": <float>
}
```

IMPORTANT: Count all words in the transcript AS-IS — include false
starts, self-corrections, and repeated words. Do not clean or
normalize the text before counting.

Text:
{ТЕКСТ}
```

## Автоматический режим (3 прогона → медиана)

Для ручного использования: один прогон через чат с LLM — достаточно.

Для автоматического использования (воркфлоу, скрипты): промпт
прогоняется **3 раза** на одном и том же транскрипте. Из трёх
результатов берётся **медиана** по каждой метрике. Если разброс
между прогонами по любой метрике превышает 15% от медианы —
метрика помечается `reliable: false`.

JSON-вывод STEP 5 парсится из каждого прогона, агрегатор берёт
3 значения по каждой метрике → медиана (среднее из трёх, т.к.
нечётное число).

Дрейф-контроль: раз в 2-3 недели перепрогонять старый транскрипт.
Если медиана на неизменном тексте сдвигается > 15% — недельным
точкам доверять нельзя, переходить на 3-недельное скользящее
среднее.

Выход артефактов: 7 полей JSON (`t_units`, `words`, `errors`, `e_per_100`,
`eft_per_t`, `mlt`, `subordination`) - в тот же benchmark-файл, что и
качественная оценка T-A2. CAF не запускается на каждом обычном practice pitch.

Проверка на дрейф: раз в 2-3 недели прогонять один и тот же (старый)
транскрипт через T-A2-CAF ещё раз. Если те же 4 числа отличаются больше
чем на 10-15% на неизменном тексте - конвенция подсчёта "плывёт", и
недельным точкам доверять нельзя, нужно смотреть на 3-недельное
скользящее среднее, а не на отдельную неделю.

## P25 — двухуровневый контроль (приоритет над прежними квотами)

Любой урок: 25–30 мин, hard cap 35. На 25-й минуте ИЛИ последнем шаге новых вопросов больше нет — краткий feedback и Closure. Первой строкой каждого learner-facing сообщения: `⏱ [Блок X/2 | Шаг Y из Z | ~M/30 мин]` (Refresher X/3). Если системных часов нет, `~?/30 мин`: не выдумывать время. Оркестратор передаёт `step_index`, `step_total`, `elapsed_min`, `time_source`, `stop_new_tasks`; read-only роль завершает шаги, возвращает `ANALYTICS_PACKET` и прекращает работу. Для аналитических JSON-only ролей индикатор показывает оркестратор, не внутри машинного JSON.

**Лимит и сценарий `check_monologue_caf`:** Только W4/W8/W12 benchmark в общем бюджете 25–30 мин; один заранее предоставленный транскрипт, три параллельных независимых прогона, точная семиполевая JSON-оценка и возврат без дополнительных вопросов. Роль не learner-facing, индикатор добавляет оркестратор только к своим сообщениям, НЕ внутрь JSON.
