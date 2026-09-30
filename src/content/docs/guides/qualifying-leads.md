---
title: Qualifying leads
description: What the qualification metric is, how the threshold works, and what to put in it.
sidebar:
  order: 5
---

Every lead you create in Tandem has a `qualificationMetric`. It is one whole
number that you choose, and it answers a single question: is this lead small
enough to set up automatically, or big enough that a person should look at it
first?

Tandem does not care what the number measures. It only compares it with a
threshold.

## What it does

When a lead is created, Tandem compares the metric with a limit. The default
limit is 15.

| Metric | Status | What Tandem tells you |
| --- | --- | --- |
| 15 or lower | `Automated_Setup` | `shouldStartCheckout: true` |
| Above 15 | `Manual_Review` | `requiresHumanReview: true` |

That is the whole rule. The metric can be any whole number from 0 up. It
cannot be negative, and it cannot have decimals.

```ts
import { qualifyLead, defaultTandemConfig } from "tandem-crm";

qualifyLead({ qualificationMetric: 8 }, defaultTandemConfig);
// { status: "Automated_Setup", requiresHumanReview: false, shouldStartCheckout: true }

qualifyLead({ qualificationMetric: 40 }, defaultTandemConfig);
// { status: "Manual_Review", requiresHumanReview: true, shouldStartCheckout: false }
```

## What to put in it

Pick something that tells you how much work or risk a lead brings. The same
number should mean the same thing for every lead.

| Your business | A sensible metric |
| --- | --- |
| Fleet or logistics software | Number of vehicles |
| Team software | Number of seats |
| Services | Expected hours per month |
| Insurance | Number of policies |

A small customer with 5 vehicles can be set up on its own. A customer with 80
vehicles probably needs a conversation before anything is switched on.

If you do not want this step at all, pass `0` for every lead. Zero is always
under the limit, so every lead is set up automatically.

## Change the limit

The limit is the only setting that changes the rule. Define your own config
and pass it to `qualifyLead`.

```ts
import { defineTandemConfig, qualifyLead } from "tandem-crm";

const config = defineTandemConfig({
  qualification: { automatedSetupMaxQualificationMetric: 25 },
  commission: { holdDays: 30 },
});

qualifyLead({ qualificationMetric: 20 }, config);
// Automated_Setup
```

## What Tandem does not do

Tandem only reports the result. It does not start a checkout, send an email,
or assign a person. Your app reads `shouldStartCheckout` or
`requiresHumanReview` and decides what happens next.

## Why the result is saved with the lead

The `lead.created` event stores the metric and the status it produced. If you
change the limit later, existing leads keep the status they were given, and
replaying the history gives the same answer as before. This is the same
reason every other decision in Tandem is saved in the event instead of
recomputed. See [How Tandem records change](/guides/how-tandem-records-change/).

## A note on the name

This field started life as a vehicle count, in the fleet software Tandem came
from. It was renamed to `qualification_metric` once it was clear the idea works
for any business. If you see `vehicleCount` in an old note or commit, it is the
same thing.
