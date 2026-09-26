---
title: Bring your own authentication
description: Connect Tandem to the user and membership system your app already uses.
---

Tandem does not create user accounts or require an authentication vendor. Your
application verifies a request with its existing identity system, then provides
Tandem with the signed-in user and that user’s workspace membership.

## Implement the auth adapter

`TandemAuthAdapter` is the small contract Tandem needs. It works with
Supabase, Clerk, Better Auth, a custom session table, or another provider.

```ts
import type { TandemAuthAdapter } from "tandem-crm";

export const tandemAuth: TandemAuthAdapter = {
  async getCurrentUserId() {
    return getVerifiedUserIdFromYourSession();
  },

  async getMember(workspaceId, userId) {
    return findMembership(workspaceId, userId);
  },

  async getAnyMember(userId) {
    return findFirstMembership(userId);
  },
};
```

The membership result has these fields:

```ts
type TandemMemberRow = {
  id: string;
  workspaceId: string;
  userId: string;
  role: "owner" | "admin" | "agent";
  agentId: string | null;
};
```

## Ask Tandem about access

Use the adapter with Tandem’s helpers where your application needs a membership
or an owner/admin check.

```ts
import {
  getCurrentTandemMember,
  isCurrentUserTandemAdmin,
} from "tandem-crm";

const member = await getCurrentTandemMember(tandemAuth, workspaceId);
const canManageWorkspace = await isCurrentUserTandemAdmin(
  tandemAuth,
  workspaceId,
);
```

The workspace ID comes from your own route, subdomain, or selected workspace.
Your app should keep that choice explicit for every request.

## Link an existing account to a workspace

When an application provisions a Tandem member, it creates the login account
through its own auth provider first. Then it uses `TandemAdminAdapter` to
create the membership row. Tandem never creates a password, invitation, or
identity record.

```ts
import type { TandemAdminAdapter } from "tandem-crm";

async function addAgent(
  admin: TandemAdminAdapter,
  workspaceId: string,
  userId: string,
  agentId: string,
) {
  return admin.createMembership(workspaceId, userId, "agent", agentId);
}
```

Use [Database, migrations, and RLS](/guides/database-migrations-and-rls/) to
make the same verified user ID available to Postgres for each request.
