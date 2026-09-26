---
title: "Trail: sales activity"
description: Record calls, emails, visits, confidence, and sales stage without losing history.
---

Trail is Tandem’s lightweight activity log for a lead. An agent can log a
phone call, email, or in-person visit with a confidence rating, a sales stage,
and a note. It keeps the focus on the relationship work around a lead without
adding another contact or task system to your application.

## What an activity entry contains

Trail accepts these channels:

- `phone`
- `email`
- `physical`

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
