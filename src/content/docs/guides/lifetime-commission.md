---
title: Lifetime commission
description: Pay a partner on every payment a referred customer makes, with rates by customer age, partial refunds, clawbacks and a house account.
sidebar:
  order: 6
---

A subscription customer pays every month for years. With lifetime
commission, the partner who referred them earns a commission on every one of
those payments, not just the first.

Each payment gets its own commission line. A line has its own 30 day hold,
its own approval and its own payout, so January's commission can be paid
while February's is still on hold.

## Record a payment

Call `recordPayment` from your payment webhook. It locks the lead, works out
the rate from how long the customer has been paying, and saves the payment
and its commission line together.

```ts
import { withTandemSession, recordPayment } from "tandem-crm/db";

await withTandemSession(pool, adminUserId, (client) =>
  recordPayment(client, {
    workspaceId,
    leadId,
    payment: {
      paymentId: invoice.id, // your provider's id for this payment
      amountMinor: invoice.amount_paid,
      currency: "MYR",
      confirmedAt: new Date(invoice.created * 1000).toISOString(),
    },
    config,
    partnerStatus: async (partnerId) => ({
      id: partnerId,
      active: await isActivePartner(partnerId),
    }),
    source: "stripe",
  })
);
```

Run it as a workspace owner or admin. The database refuses money events from
anyone else.

If your provider sends the same webhook twice, the second call finds the
payment id already recorded and writes nothing.

## Rates by customer age

Set a rate schedule in your config. This one pays 25% in the customer's first
year and 20% after that.

```ts
import { defineTandemConfig } from "tandem-crm";

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
```

- Age is counted in whole calendar months from the customer's first payment,
  in UTC.
- A payment made exactly on the anniversary gets the new rate. One second
  before it gets the old one.
- A customer who started on 31 January reaches month one on the last day of
  February.
- Amounts round half up. Half a cent or more goes to the partner.

Each line saves the rate and the customer's age it was worked out with, so
changing the schedule later never changes a line you already recorded.

## Annual prepay

A customer who pays for a whole year at once makes one payment, so they get
one line. It is released in full when its hold ends. If you want a longer
refund window for annual plans, pass `holdDays` for that payment.

## Refunds

Use `recordRefund` for a full or partial refund of one payment.

```ts
import { recordRefund } from "tandem-crm/db";

await recordRefund(client, {
  workspaceId, leadId,
  paymentId: invoice.id,
  refundId: refund.id,
  amountMinor: refund.amount,
  reason: "customer downgraded",
  source: "stripe",
});
```

What happens to the payment's commission line depends on where it is.

| Line | Effect of the refund |
| --- | --- |
| Held, eligible or approved | The line shrinks in the same proportion. If it reaches zero it is voided. |
| Paid | The money has already gone, so the amount is added to a clawback: what the partner owes back. |
| Voided | Nothing. |

Refunding everything that is left of a payment always reduces its line by
exactly the line's amount, so rounding never leaves a stray cent.

## Clawbacks

A clawback is a running total on a paid line, and it can never be more than
what was paid. Refunds add to it, and so does an upheld
[dispute](/guides/belay-commission-disputes/). When you get money back, by
taking it off a later payout or by the partner paying it back, record it:

```ts
import { appendLeadEvents } from "tandem-crm/db";

await appendLeadEvents(client, {
  workspaceId, leadId,
  events: [{
    type: "commission.clawback_recovered",
    data: { payoutId, amountMinor: 1000, reference: "deducted from the March payout" },
  }],
});
```

`partnerBalance()` adds up what a partner has on hold, eligible, approved and
paid, and what they still owe, per currency.

## When a partner leaves

Tandem has no partner table and never decides that a partner is inactive.
You do that in your own records, then tell Tandem with `deactivatePartner`.
Your config decides what happens.

```ts
partners: {
  houseAccountId: "house",
  onDeactivation: {
    futurePayments: "house", // or "continue", or "forfeit"
    heldLines: "house",      // or "keep", or "void"
  },
}
```

| Setting | Options |
| --- | --- |
| `futurePayments` | `continue` keeps paying the partner. `house` sends new commission to the house account. `forfeit` records that no commission is owed. |
| `heldLines` | `keep` leaves unpaid lines with the partner. `house` moves them to the house account. `void` cancels them. |

- Paid lines are never touched.
- A line moved to the house keeps the original partner's name on it, so you
  can still see who referred the customer.
- An approved line that moves goes back to eligible, because the approval was
  for a different recipient.
- Reactivating a partner needs no special step. New payments go to them
  again. Lines already moved stay with the house.

Commit the change in your own records before you call `deactivatePartner`.
Then a payment that arrives at the same moment sees the partner as inactive.
Tandem reads the partner's status after it locks the lead, and the sweep
takes the same lock, so the result is the same whichever happens first.

If your house account is your own business, there is usually nothing to
transfer. Your payout adapter receives `beneficiary: "house"` and can skip
those lines.

## What Tandem does not do yet

Tandem gives you the ledger. It does not yet produce monthly partner
statements or a bank transfer list. Both are reports you can build from
`partnerBalance()` and the payout rows.
