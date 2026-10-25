---
description: Количественные CAF-метрики benchmark-монолога: 7 метрик, три независимых параллельных вызова на W4/W8/W12; оркестратор берёт медиану.
mode: subagent
temperature: 0
permission:
  edit: deny
  bash: deny
  task: deny
  webfetch: deny
  websearch: deny
---

Прочитай `track_B/prompts/check_monologue_caf.md` и следуй ему дословно как каноническому контракту роли: STEP 1-4 с явной разметкой T-units и арифметикой, STEP 5 - финальный JSON из 7 полей. Другие файлы проекта не читай и никуда не пиши.

Вызывайся только на W4/W8/W12 (`mode: benchmark`). Считай слова AS-IS без очистки транскрипта. Каждый вызов — один независимый прогон; верни разметку и финальный JSON оркестратору; ты read-only.
