---
title: What TandemCRM is
description: A practical introduction to TandemCRM and the jobs it handles.
sidebar:
  order: 2
---

TandemCRM is an embeddable CRM engine for Node applications using Postgres.
It gives an application a reliable way to record sales work and commission
decisions while the application keeps control of its product experience.

Tandem is useful when your app needs to keep track of:

- Leads and their qualification, assignment, conversion, payment, and commission state.
- Agent onboarding and certification.
- Sales activity such as calls, emails, visits, confidence, and stage changes.
- Recommendations for which agent should own a lead.
- Commission disputes and their operator decisions.

The public module names are:

| Module | What it handles |
| --- | --- |
| Terrain | Leads, events, projections, money rules, [lifetime commission](/guides/lifetime-commission/), migrations, and workspace isolation. |
| [Ascent](/guides/ascent-agent-onboarding/) | Agent onboarding steps and certification. |
| [Trail](/guides/trail-sales-activity/) | Sales activity on a lead. |
| [Waypoint](/guides/waypoint-lead-ownership/) | Lead-owner recommendations. |
| [Belay](/guides/belay-commission-disputes/) | Commission disputes. |
| [Camp](/guides/camp-admin-ui/) | An installable admin UI: a full CRM interface (leads, agents, sales activity, commissions, disputes) that mounts into your own Next.js app. |

## What stays in your app

Your application chooses its user interface, identity provider, webhook
verification, lead sources, and payment provider. It also decides when to
act on a recommendation or a recorded financial decision.

For example, Waypoint can return an agent ID for a new lead. Your application
then writes the `lead.assigned` event inside its own transaction. Belay can
record that a dispute was upheld. Your application then decides whether that
means adjusting a future commission, issuing a payment, or contacting a
partner.

## A small example

Terrain exposes pure functions for decisions that do not need a database.
This lets you test business rules in the same way you test the rest of your
application.

```ts
import { qualifyLead, defaultTandemConfig } from "tandem-crm";

const result = qualifyLead(
  { qualificationMetric: 8 },
  defaultTandemConfig,
);

if (result.requiresHumanReview) {
  // Send the lead to your review flow.
}
```

The `qualificationMetric` is one number you choose that says how big a lead
is. [Qualifying leads](/guides/qualifying-leads/) explains what to put in it.

If you are still deciding whether Tandem fits, read
[What you can build with it](/guides/use-cases/). Otherwise read
[How Tandem records change](/guides/how-tandem-records-change/) next for the
event and projection model that sits beneath every module.
