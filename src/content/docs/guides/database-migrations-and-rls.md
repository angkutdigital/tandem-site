---
title: Database, migrations, and RLS
description: Apply Tandem’s Postgres schema and keep workspace data isolated.
---

Tandem stores its tables in a private `tandem` schema in your Postgres
database. The package ships SQL migrations and a runner that records every
applied migration in `tandem.schema_migrations`.

## Apply migrations

Run the migration runner during deploy or application startup. It applies only
new files. Each migration runs in its own transaction, so a failed migration
rolls back as one unit.

```ts
import { applyTandemMigrations, createTandemPool } from "tandem-crm/db";

const pool = createTandemPool(process.env.DATABASE_URL!);
const { applied } = await applyTandemMigrations(pool);

console.log("Applied Tandem migrations:", applied);
```

Use a connection string for a role that can create the `tandem` schema and
apply migrations. Keep that connection string on the server.

## Run request queries with an identity

Tandem uses Postgres row-level security to limit records to workspace members.
Wrap request-scoped database work in `withTandemSession`. It opens a
transaction, sets the current user ID only for that transaction, and runs the
query as the `authenticated` role.

```ts
import { withTandemSession } from "tandem-crm/db";

const leads = await withTandemSession(pool, currentUserId, (client) =>
  client.query("select * from tandem.leads"),
);
```

The database role used by `DATABASE_URL` needs membership in `authenticated`
once. Replace `your_connection_role` with the role behind your connection
string.

```sql
grant authenticated to your_connection_role;
```

This grant matters because a table owner or superuser bypasses row-level
security. `withTandemSession` uses `set local role authenticated`, so a
missing grant fails loudly instead of returning data under an unenforced
policy.

## Use a trusted scheduler for due commissions and disputes

Tandem provides database functions for due commission releases and overdue
dispute resolution. Your deployment chooses the scheduler and grants it only
the permissions it needs. This can be a Postgres scheduler, a serverless
scheduled job, or your own backend job runner.

Keep raw provider payloads and database credentials on the server. Raw
payloads can contain personal data, so give them an appropriate retention and
access policy.
