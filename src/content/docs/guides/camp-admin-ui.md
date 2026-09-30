---
title: "Camp: the admin UI"
description: Add a ready-made CRM admin to your own Next.js app with one route and one config file.
sidebar:
  order: 8
---

Camp is a set of admin screens for Tandem. It mounts inside your own Next.js
app, so your team gets a working CRM interface without you building one. It
reads and writes through the same Tandem engine and database as the rest of
your code.

Camp needs a Next.js app on the App Router with React 19 and Tailwind 4, and a
Postgres database that already has Tandem's migrations applied. If you have
not set that up yet, start with [Start here](/guides/getting-started/).

## Install

```sh
npm install tandem-camp tandem-crm
```

## Add the styles

Tailwind does not look inside `node_modules`, so Camp ships a small stylesheet
that tells it where Camp's classes live and sets up default colors. Add one
line to your global CSS, right after the Tailwind import.

```css
/* app/globals.css */
@import "tailwindcss";
@import "tandem-camp/styles.css";
```

The default colors only apply inside Camp, so the rest of your app looks the
way it did before. To change Camp's colors, set the same variables on
`.tandem-camp` after that import.

```css
.tandem-camp {
  --primary: #2563eb;
  --primary-foreground: #ffffff;
}
```

Camp switches to its dark colors when a `dark` class is on `<html>` or any
parent element.

## Configure it

Create one config file. It gives Camp your database pool, your workspace ID,
and your auth adapter, which is the same adapter described in
[Bring your own authentication](/guides/bring-your-own-auth/).

```ts
// tandem-camp.config.ts
import { mountTandemCamp } from "tandem-camp";
import { createTandemPool } from "tandem-crm/db";
import { tandemAuth } from "./lib/tandem-auth";

mountTandemCamp({
  pool: createTandemPool(process.env.DATABASE_URL!),
  workspaceId: process.env.TANDEM_WORKSPACE_ID!,
  authAdapter: tandemAuth,
});
```

`npx tandem-crm init` prints the workspace ID when it creates a workspace.

## Add the route

Camp needs one catch-all route and handles every screen from there, so you
never create a file per page.

```tsx
// app/admin/[[...segments]]/page.tsx
import "../../../tandem-camp.config";
import { CampRootPage } from "tandem-camp";

export default function Page(props: {
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <CampRootPage {...props} basePath="/admin" />;
}
```

Set `basePath` to the path where you mounted the route, because Camp builds
its links from it. The config import has to come first so Camp is set up
before it renders.

Open `/admin` and you should see the Overview screen.

## What you get

| Screen | What it does |
| --- | --- |
| Overview | Open leads, wins, pending payouts, and agent progress. An agent sees their own onboarding checklist instead. |
| Leads | A list and a kanban board. Each lead has a page with its event history and its Trail activity, including CHAMP notes. |
| Agents | Onboarding progress, territory coverage, and assigned leads. |
| Payouts | Approve and pay commissions. |
| Earnings | Totals and a monthly chart of paid commissions. |
| Disputes | Review a dispute, ask a question, resolve it, and act on the result. |
| Settings | Onboarding steps, territories, commission rules, linking accounts, and lead routing. |

Owners and admins see the whole workspace. An agent sees only the leads
assigned to them. Postgres enforces that with row-level security, so it holds
even if someone calls Camp's actions directly.

## Paying commissions

Approving a commission needs nothing extra. Paying one needs a payout adapter,
because Tandem records payments and never moves money itself. Without an
adapter the Pay button says none is configured, and every other screen keeps
working.

```ts
import type { TandemPayoutAdapter } from "tandem-crm";

const payoutAdapter: TandemPayoutAdapter = {
  async executePayout({ payoutId, partnerId, amountMinor, currency }) {
    // Send the transfer with your payment provider. Use payoutId as the
    // idempotency key so a retry can never pay twice.
    const transfer = await sendTransfer({ payoutId, partnerId, amountMinor, currency });
    return { payoutReference: transfer.id };
  },
};
```

Pass it to `mountTandemCamp` as `payoutAdapter`. Camp reads the partner,
amount, and currency from the lead's event history and hands them to your
adapter, so nothing sent from a browser can change what gets paid. Only an
owner or admin can pay, and only a commission that has been approved.

## Good to know

- One mount serves one workspace. Run a second mount if you need a second one.
- Camp registers its config once when the server starts, so it expects a
  normal Node server and not an edge runtime.
- The database role in `DATABASE_URL` must belong to `authenticated`. The
  [database guide](/guides/database-migrations-and-rls/) shows the one-line
  grant.
