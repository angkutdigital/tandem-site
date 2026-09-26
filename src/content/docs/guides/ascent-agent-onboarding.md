---
title: "Ascent: agent onboarding"
description: Track required onboarding steps and keep agent certification current.
---

Ascent tracks a workspace-defined checklist for each agent. It is useful when
a team needs a simple record of onboarding or certification before an agent
can take on work. Your application decides what a current certification allows.

## Define your workspace steps

Your application owns the checklist. Each step has a stable code, a label, and
a flag that says whether it is required.

```ts
import type { OnboardingStepDefinition } from "tandem-crm";

const steps: OnboardingStepDefinition[] = [
  { code: "identity-check", label: "Identity check", required: true },
  { code: "product-training", label: "Product training", required: true },
  { code: "optional-intro", label: "Company introduction", required: false },
];
```

## Record progress as events

The lifecycle is small: start, complete steps, certify, and reopen when a
requirement changes. Each event is append-only and belongs to one agent in one
workspace.

```ts
import type { AgentOnboardingEvent } from "tandem-crm";

const completed: AgentOnboardingEvent = {
  id: "onboarding_evt_002",
  sequence: 2,
  workspaceId: "workspace_123",
  agentId: "agent_123",
  source: "team-dashboard",
  sourceEventId: "step-click_001",
  occurredAt: "2026-09-27T11:00:00.000Z",
  type: "onboarding.step_completed",
  data: { stepCode: "identity-check" },
};
```

## Check current certification

An earlier `onboarding.certified` event is meaningful only while the agent has
completed every step that is required today. Pass the current required codes to
the helper whenever your app needs to decide what to show or unlock.

```ts
import {
  isAgentCertified,
  replayAgentOnboardingEvents,
} from "tandem-crm";

const state = replayAgentOnboardingEvents(
  events,
  "workspace_123",
  "agent_123",
);

const certified = isAgentCertified(state, [
  "identity-check",
  "product-training",
]);
```

When a team adds a new required step, an owner or admin can append
`onboarding.reopened`. The earlier certification stays in the record, the
agent completes the new requirement, and a fresh certification can follow.
