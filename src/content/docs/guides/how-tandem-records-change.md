---
title: How Tandem records change
description: Learn how events and projections give a sales record a trustworthy history.
---

Tandem records business facts as typed events. A lead can be created,
assigned, converted, paid, held for commission, and paid out. Each fact stays
in the event history. A projection is the current view rebuilt from those
facts.

This gives your team two useful things at the same time: a fast current view
for a dashboard and a history that explains how that view was reached.

## Events are ordered facts

Every event has a positive `sequence`. Tandem replays events in sequence
order. `occurredAt` describes the business time of the fact and does not
change ordering when a source sends something late.

Each event also carries an `id`, `source`, and `sourceEventId`. Replaying the
same exact event is safe. Reusing one of those IDs with different contents
throws an error, which helps catch a broken upstream integration early.

```ts
import { replayLeadEvents, type TandemEvent } from "tandem-crm";

const events: TandemEvent[] = [
  {
    id: "evt_001",
    sequence: 1,
    workspaceId: "workspace_123",
    leadId: "lead_123",
    source: "website-form",
    sourceEventId: "submission_456",
    occurredAt: "2026-09-27T09:30:00.000Z",
    type: "lead.created",
    data: {
      companyName: "Northstar Logistics",
      qualificationMetric: 8,
      qualification: "Automated_Setup",
    },
  },
];

const lead = replayLeadEvents(events, "workspace_123", "lead_123");
```

## Projections are current views

The database keeps rebuildable read models for leads, payouts, activity, and
disputes. A write path should validate and append its event and update its
projection in one database transaction. The projection is there to serve your
application quickly. The event log is there to preserve the business record.

## Corrections preserve context

Some workflows need a correction or a retraction. Trail activity has explicit
`trail.entry_corrected` and `trail.entry_retracted` events. The entry remains
visible to a reviewer with its corrected or retracted state. No one has to
guess why a previous activity entry disappeared.

## Money is stored in minor units

Commission amounts use whole minor units such as cents or sen. Tandem uses
integer math and validates a three-letter currency code.

```ts
import { calculateCommissionMinor } from "tandem-crm";

const commissionMinor = calculateCommissionMinor(125_00, 800);
// 1000, meaning 10.00 in a two-decimal currency.
```

The `commission.held` event snapshots the amount, currency, and release time.
Changing a workspace rule later does not rewrite a past commission decision.
