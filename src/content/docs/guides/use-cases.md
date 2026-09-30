---
title: What you can build with it
description: Three setups Tandem fits well, and the cases where you should pick something else.
sidebar:
  order: 3
---

Tandem is a building block, so the useful question is what you would build
with it. These are the setups it was made for.

## A partner or affiliate program

Partners send you leads and earn a commission when the customer pays. Tandem
records the payment, then holds the commission until a release date you
choose. Once the date passes, a scheduled database function makes it
eligible, an admin approves it, and your payment provider sends the money.

```ts
// Recorded after the customer's payment is confirmed.
{
  type: "commission.held",
  data: {
    payoutId: "payout_123",
    partnerId: "partner_42",
    amountMinor: 12_500,
    currency: "MYR",
    releaseAt: "2026-10-27T00:00:00.000Z",
  },
}
```

If a partner thinks a commission is wrong, they open a dispute and the payout
stays on hold until an admin resolves it. Every step stays in the record, so
you can always show why an amount is what it is.

This uses Terrain and [Belay](/guides/belay-commission-disputes/), and Camp
gives you the Payouts and Disputes screens.

## A CRM inside your own product

Say you sell software to property or insurance agents and each agent needs a
place to track their leads. Tandem gives you the leads, the pipeline, and a
log of every call and message, with a CHAMP note for each conversation. You
keep your own login, design, and pricing.

This uses Terrain and [Trail](/guides/trail-sales-activity/). You can build
the screens yourself or start from [Camp](/guides/camp-admin-ui/).

## A sales team that needs onboarding and routing

New agents complete a checklist, and your app decides what certification lets
them do. New leads need to reach the right person too. Ascent tracks the
checklist and the certification. Waypoint recommends an owner by round robin,
by fewest open leads, or leaves the choice to a person.

This uses [Ascent](/guides/ascent-agent-onboarding/) and
[Waypoint](/guides/waypoint-lead-ownership/).

## When to pick something else

Tandem is not the right tool in these cases.

- You want a finished CRM to sign up for and use today. Tandem is a library
  and an admin UI that you run yourself.
- You need email sync, calendar sync, marketing campaigns, or web forms. None
  of those are included.
- Your stack is not Node and Postgres.
- You need several contacts per lead, or a full company, contact, and deal
  model. Trail logs activity on a lead and has no separate contact records.
- You want Tandem to send the money. It records payments and asks your
  adapter to make them, and it never holds funds.
