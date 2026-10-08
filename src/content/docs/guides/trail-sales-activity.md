---
title: "Trail: sales activity"
description: Record calls, emails, visits, confidence, and sales stage without losing history.
sidebar:
  order: 10
---

Trail is Tandem’s lightweight activity log for a lead. An agent can log a
phone call, email, WhatsApp conversation, or in-person visit with a confidence
rating, a sales stage, and what they learned. It keeps the focus on the relationship work around a lead without
adding another contact or task system to your application.

## What an activity entry contains

Trail accepts these channels:

- `phone`
- `email`
- `physical`
- `whatsapp`

It also accepts a confidence rating from 1 to 10 and one of these stages:

`New`, `Contacted`, `Qualified`, `Negotiating`, `Closed_Won`, `Closed_Lost`.

## Record an entry

Create a typed event from the input your app has already validated. Use a new
event ID and source event ID for each distinct business action.

```ts
import type { TrailEvent } from "tandem-crm";

const event: TrailEvent = {
  id: "trail_evt_001",
  sequence: 1,
  workspaceId: "workspace_123",
  leadId: "lead_123",
  entryId: "entry_123",
  source: "crm-ui",
  sourceEventId: "activity-form_001",
  occurredAt: "2026-09-27T10:15:00.000Z",
  type: "trail.visit_logged",
  data: {
    channel: "phone",
    confidenceRating: 7,
    salesStage: "Qualified",
    note: "Confirmed the rollout timeline and procurement contact.",
  },
};
```

## Record what you learned with CHAMP

CHAMP is a simple way to qualify a lead: Challenges, Authority, Money, and
Prioritization. A visit report has a field for each one, and every field is
optional.

```ts
data: {
  channel: "whatsapp",
  confidenceRating: 7,
  salesStage: "Qualified",
  challenges: "Tracking which trucks are due for inspection.",
  authority: "The fleet manager decides and reports to the owner.",
  budget: "Around RM8,000 a month.",
  prioritization: "Wants it running before year end.",
},
```

An entry needs text in at least one of `note`, `challenges`, `authority`,
`budget`, or `prioritization`. Entries logged before CHAMP existed only have a
note, and they still work, so nothing you already recorded needs to change.

The money field is plain text on purpose. It records what the prospect told
you, and it is not a committed figure. Real amounts belong on Terrain's
`payment.confirmed` event.

Camp's Log activity form includes all five fields.

## Correct or retract an entry

Use `trail.entry_corrected` when the activity should stay in the record with
updated details. Use `trail.entry_retracted` when it should no longer count.
Both actions preserve the history that led to the current state.

```ts
import { replayTrailEntryEvents } from "tandem-crm";

const entry = replayTrailEntryEvents(
  eventsForThisEntry,
  "workspace_123",
  "lead_123",
  "entry_123",
);

if (entry?.retracted) {
  // Render it as retracted and keep it out of active workflow totals.
}
```

The reducer accepts exact retries of the same event and rejects conflicting
duplicate IDs, wrong workspace or lead IDs, invalid sequences, and attempts to
change an entry after it has been retracted.
