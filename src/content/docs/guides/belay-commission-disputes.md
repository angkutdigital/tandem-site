---
title: "Belay: commission disputes"
description: Keep a clear record when a partner questions a commission.
---

Belay records a partner-initiated dispute against a held, eligible, or
approved commission. A partner can open a dispute. A workspace owner or admin
can ask a question or record the resolution. Row-level security enforces that
role boundary in the database.

## Open a dispute

Belay supports three categories:

| Category | Meaning |
| --- | --- |
| `untracked` | The sale did not appear in the commission record. |
| `incorrect` | The recorded amount is wrong. Include `expectedAmountMinor`. |
| `declined` | The sale should have been approved. |

Your application chooses the time allowed for a response and snapshots the
resulting deadline in the opening event.

```ts
import { disputeAutoApproveAt, type DisputeEvent } from "tandem-crm";

const openedAt = "2026-09-27T12:00:00.000Z";

const dispute: DisputeEvent = {
  id: "dispute_evt_001",
  sequence: 1,
  workspaceId: "workspace_123",
  disputeId: "dispute_123",
  leadId: "lead_123",
  payoutId: "payout_123",
  source: "partner-portal",
  sourceEventId: "dispute-form_001",
  occurredAt: openedAt,
  type: "dispute.opened",
  data: {
    payoutId: "payout_123",
    category: "incorrect",
    expectedAmountMinor: 12_500,
    description: "The approved rate for this partner was 10 percent.",
    autoApproveAt: disputeAutoApproveAt(openedAt, 14),
  },
};
```

## Ask, then resolve

An operator can append `dispute.queried` with a question before resolving the
case. Resolution is either `upheld` or `dismissed` and requires a note.

```ts
import { isDisputeOverdue, replayDisputeEvents } from "tandem-crm";

const state = replayDisputeEvents(
  disputeEvents,
  "workspace_123",
  "dispute_123",
);

const needsAttention = isDisputeOverdue(
  state,
  new Date().toISOString(),
);
```

An overdue-dispute database function can append an upheld resolution on a
trusted schedule. Your deployment chooses the scheduler.

## A resolution records the decision

Belay records the outcome and keeps a payout on hold while a case is open or
queried. It does not create a replacement commission, change an amount, or
move money. Your application makes any financial follow-up as a separate,
reviewable action.
