---
title: Контракт тихой аналитики урока
created: 2026-08-30
updated: 2026-08-30
tags: [english, analytics, lesson, agents]
status: active
related: [../local/protocol.md, ../../track_A/LESSON_START.md]
---

# Контракт тихой аналитики

Этот контракт одинаков для Codex и OpenCode. Оркестратор передаёт его каждому learner-facing агенту вместе с `today.md` и payload блока. Агент остаётся read-only и ничего не записывает сам.

## Разделение обратной связи и хранения

- Ученику показываются только коррекции, разрешённые режимом урока: target correction в accuracy/drill или максимум 2–3 high-value corrections во fluency.
- Для аналитики агент возвращает оркестратору все обнаружимые случаи ошибок в содержательных английских ответах ученика, включая spelling, lexical/chunk, grammar и meaning-impeding broken phrases.
- Непройденная структура не штрафуется, не получает drill и не попадает автоматически в `error_log.json` или SRS. Она всё равно фиксируется в `error_events.json` с `covered_status: not_yet_covered`.
- Очевидная неопределённость распознавания речи помечается `confidence: low` и не превращается в вывод о навыке без повторного появления.
- Пунктуационные и регистровые отклонения отдельно не фиксируются, если они не меняют смысл и не являются целью письменного блока.

## Служебный ответ агентa

После learner-facing ответа агент возвращает оркестратору отдельный `ANALYTICS_PACKET`. Оркестратор не показывает пакет ученику дословно.

```json
{
  "learner_turns": [
    {
      "block": "speaking",
      "attempt": "first|retry|controlled|srs",
      "text": "verbatim learner wording",
      "source_type": "typed|voice_transcript|unknown"
    }
  ],
  "error_events": [
    {
      "error_text": "verbatim error span",
      "correction": "minimal natural correction",
      "category": "grammar|vocabulary|chunk|spelling|pronunciation|broken_phrase|task_pragmatics",
      "grammar_topic": "short topic or null",
      "covered_status": "covered|not_yet_covered|lexical_or_spelling|task_pragmatics",
      "severity": "slip|recurring|meaning_impeding",
      "feedback_shown": true,
      "confidence": "high|medium|low"
    }
  ],
  "block_result": {
    "completed": true,
    "retry_completed": false,
    "priority_corrections_shown": 0,
    "new_srs_candidates": []
  }
}
```

`feedback_shown` отражает только показ ученику; `false` не означает, что ошибка проигнорирована аналитикой. Оркестратор сохраняет exact learner wording и не исправляет транскрипт задним числом.

## Куда пишет оркестратор

- каждое завершённое занятие — `track_B/local/db/lesson_sessions.json`;
- каждый пакет случаев ошибок — `track_B/local/db/error_events.json`;
- содержательные speaking/pitch/data попытки — `track_B/local/db/speaking_recordings.json`;
- только повторяющиеся/high-impact covered errors — агрегированно в `error_log.json` и, при необходимости, максимум одна error-card в пределах дневного лимита SRS.
