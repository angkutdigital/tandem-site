---
title: Create a lead from your code
description: Create a lead, mark it converted and record a payment using the engine's own helpers, with no admin UI.
sidebar:
  order: 1.5
---

You do not need Camp to use Tandem. This page uses only the `tandem-crm`
package. By the end you will have created a lead, marked it won, and recorded
a payment that earned a commission line.

## Before you start

- You ran `npx tandem-crm init` from [Start here](/guides/getting-started/), so
  the database has Tandem's tables and a workspace.
- You have that workspace's ID. `init` prints it as `TANDEM_WORKSPACE_ID`.
- You have the ID of a user who is an owner or admin of that workspace. After
  `init --sample-data` this is `c0000000-0000-0000-0000-000000000001`, which
  `init` also prints. The database only lets owners and admins create leads and
  record payments.

## The whole thing

```ts
import { createTandemPool, withTandemSession, createLead, appendLeadEvents, recordPayment } from "tandem-crm/db";
import { defineTandemConfig } from "tandem-crm";

const pool = createTandemPool(process.env.DATABASE_URL!);
const workspaceId = process.env.TANDEM_WORKSPACE_ID!;
const adminUserId = "c0000000-0000-0000-0000-000000000001";

const config = defineTandemConfig({
  qualification: { automatedSetupMaxQualificationMetric: 15 },
  commission: {
    holdDays: 30,
    rateSchedule: [
      { fromMonth: 0, basisPoints: 2500 },
      { fromMonth: 12, basisPoints: 2000 },
    ],
  },
});

// 1. Create the lead.
const { leadId, state } = await withTandemSession(pool, adminUserId, (client) =>
  createLead(client, {
    workspaceId,
    companyName: "Aman Logistics",
    contactPhone: "+60 12-345 6789",
    qualificationMetric: 0,
    productTag: "starter",
    partnerId: "partner-1",
    attributes: { contactName: "Aisha" },
    config,
    source: "signup-form",
    sourceEventId: "form-submission-1042",
  })
);
console.log(state.status); // "Automated_Setup"

// 2. The customer said yes.
await withTandemSession(pool, adminUserId, (client) =>
  appendLeadEvents(client, { workspaceId, leadId, events: [{ type: "conversion.confirmed", data: {} }] })
);

// 3. They paid. This is what your payment webhook would call.
const paid = await withTandemSession(pool, adminUserId, (client) =>
  recordPayment(client, {
    workspaceId,
    leadId,
    payment: { paymentId: "inv_001", amountMinor: 10000, currency: "MYR", confirmedAt: new Date().toISOString() },
    config,
    partnerStatus: async (partnerId) => ({ id: partnerId, active: true }),
    source: "stripe",
  })
);
console.log(paid.state.commissions.map((line) => `${line.amountMinor} ${line.status}`));
// [ "2500 held" ]
```

That is 10,000 sen paid, a 25% rate, so 2,500 sen of commission, held for 30
days before it can be released.

## What each step does

**Create the lead.** `createLead` writes the lead's first event and its row
together, so they can never disagree. Three of the fields matter:

- `qualificationMetric` is one number that says how big the lead is. Pass `0` if
  you do not want a manual review step. See
  [Qualifying leads](/guides/qualifying-leads/).
- `partnerId` is the partner who referred the customer. A lead only earns
  commission if it has one. You can also attach it later. See
  [Lifetime commission](/guides/lifetime-commission/).
- `sourceEventId` makes a retry harmless. Use something stable, such as a form
  submission ID or a webhook ID. If the same request arrives twice, the second
  call returns the lead that already exists and writes nothing.

**Mark it converted.** A payment is only accepted once the lead has converted,
so `conversion.confirmed` comes first.

**Record the payment.** `recordPayment` locks the lead, works out the rate from
how long the customer has been paying, and saves the payment and its
commission line in one step.

## Worth knowing

- Running the script a second time is safe. Step 1 finds the lead it already
  made and returns it, so you do not get a duplicate. Step 2 then stops with
  "invalid transition", because that lead is already won. Change the
  `sourceEventId` to make a new lead.
- Call these helpers inside `withTandemSession`, as above. They never commit by
  themselves, so the transaction is yours.
- Only owners and admins can create leads. An agent gets a clear error, and the
  database refuses it as well.
- To give the lead to an agent, append a `lead.assigned` event with
  `appendLeadEvents`. [Waypoint](/guides/waypoint-lead-ownership/) can recommend
  which agent.
- To see the result, open the lead in [Camp](/guides/camp-admin-ui/), or read
  `tandem.leads` and `tandem.payouts` directly.
