---
title: "Waypoint: lead ownership"
description: Choose a recommended lead owner with round robin, least loaded, or manual routing.
---

Waypoint helps an application choose who should own a lead. It takes the
eligible agents and a workspace routing strategy, then returns the recommended
agent ID. Your application writes the assignment event after it has applied
its own rules.

## Choose a strategy

| Strategy | Result |
| --- | --- |
| `round_robin` | Moves through eligible agents in stable ID order. |
| `least_loaded` | Selects the agent with the fewest open leads. Stable ID order breaks a tie. |
| `manual` | Returns `null`, leaving the decision to a person or your own workflow. |

The candidate list should already contain only agents who are eligible for the
lead’s territory and current operating rules.

```ts
import { selectAgentForLead } from "tandem-crm";

const agentId = selectAgentForLead(
  [
    { agentId: "agent_amelia", openLeadCount: 3 },
    { agentId: "agent_daniel", openLeadCount: 1 },
  ],
  "least_loaded",
  null,
);

// "agent_daniel"
```

## Save the decision in your event writer

Waypoint does not write to the database. Once your application accepts the
recommendation, append a `lead.assigned` event in the same transaction that
updates the lead projection.

```ts
const assignment = {
  type: "lead.assigned" as const,
  data: {
    agentId,
    territoryId: "territory_selangor",
  },
};
```

This split keeps the record clear. Terrain records what happened to the lead.
Waypoint gives your application a repeatable recommendation before that fact is
recorded.

## Input checks

Waypoint returns `null` when there are no candidates or when the strategy is
`manual`. It rejects blank or duplicate agent IDs and invalid open-lead counts.
Pass whole, non-negative counts from the read model your app trusts.
