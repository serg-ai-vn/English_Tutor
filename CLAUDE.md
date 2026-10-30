# Project entry point

Read AGENTS.md, track_A/LESSON_START.md and track_B/local/lesson_contract.md before running a lesson. Read the current-day program/progress/SRS and Pending only, not the whole history. The shared state is the live GitHub main of serg-ai-vn/English_Tutor; old local drafts are archives. A connector read does not establish successful write access.

Use the canonical role prompt and analytics_contract with literal today and lesson_contract payloads. Roles are read-only; one orchestrator writes. All teaching material is delivered in chat, English by default, Russian explanations only on learner request (short Russian glosses/meaning answers explicitly allowed by a role). Require only introduced material; new C1 patterns only on Day 5. Preserve verbatim source replies and record not-yet-covered errors without penalties or automatic SRS.

Apply the task-budget and clock guards in lesson_contract.md; never invent timestamps or promise interruption while the learner is composing a reply. Preserve known/introduced/explicitly explained distinctions. Refresher does not advance ordinary lessons.

Persist one complete validated bundle, then reread every changed file at the published SHA and verify current main. Never claim Completed/fully saved when storage is incomplete. An error overrides silent-backend instructions. Report its actual category and where the recovery data really exists. Do not bypass policy blocks through another channel.

For maintenance use Scenario B in AGENTS.md, check the patch registry and apply only authorized changes. Update the patch registry/session and verify publication. See node track_B/local/lesson_tools.cjs validate and node --test track_B/local/lesson_tools.test.cjs.
