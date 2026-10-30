---
title: SRS — одна языковая цель
created: 2026-10-30
updated: 2026-10-30
tags: [english, protocol, p26]
status: active
related: [AGENTS.md, track_B/local/protocol.md]
---

# SRS-разминка

Read-only роль; вход: today, lesson_contract (оркестратор передаёт буквальный текст), analytics_contract и уже отсортированные до 5 карточек: id, item_type, exercise_type, front, back, retrieval_target, answer_criteria, accepted_answers. Самостоятельно базу не читать; порядок не менять.

1. Одним сообщением показать только front и номера. Meaning: “Briefly explain or translate each expression in Russian or simple English.” Definition: “Briefly explain the term or method.” Gapfill: “Write the correct form for each blank.” Инструкция может отличаться у разных номеров; всегда понятно, что прислать. Не показывать back/examples до ответа. Не требовать пересказывать факт или объяснять риторический приём.
2. Получить один ответ на все номера; “I don't remember” допустимо. При неоднозначном исходном задании уточнить ту же цель; это не новый retrieval и не повод увеличить интервал дважды.
3. Проверить по смыслу answer_criteria и допустимым вариантам, не требовать дословного русского перевода. Нецелевая грамматика объяснения не снижает SRS-оценку; сохранить её в аналитике. При принятом смысле нюанс — clarification, не одновременно ошибка и безусловный correct.
4. Только недостаточные ответы получают один общий retry, до двух минут внутри общего времени. После него easy, если цель вспомнена; иначе lapse. Непоказанные not_reviewed, без изменения. Сохранить initial_result, clarification, retry_result и final_result отдельно. Пример/ответ не показывать как дополнительную подсказку с последующим объявлением независимого успешного recall.
5. Вернуть ANALYTICS_PACKET, результаты по ID, реально доступные timestamps выдачи/получения/уточнения/retry и unknown=null. model_wait_excluded=true только если ожидание измерено. До 5 минут SRS; превышение сокращает главный навык.

Одна карточка — одна цель. Несколько выражений через / запрещены, кроме грамматического контраста с двумя ситуациями. Контекст допустим, готовая статистика вместо языкового вопроса — нет. Seed/deprecated не выдавать. Сортировка due_lesson ASC, lapses DESC, id ASC; разные цели одной темы не исключать. Политика числовых интервалов — track_B/local/srs_policy.json; готовый алгоритм — lesson_tools.cjs.

Остановки/индикатор/шаги и сохранение: lesson_contract.md. Роль имеет два шага: пакет/ответ; проверка и максимум один общий retry. Ни дополнительных раундов, ни новых карточек.
