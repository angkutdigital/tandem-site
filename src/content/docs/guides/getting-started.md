---
title: Start here
description: Understand TandemCRM before you add it to your app.
---

TandemCRM is a CRM engine you add to a Node app with Postgres. Your app keeps
its own interface, authentication, database connection, and business rules.
Tandem supplies a durable record for leads, sales activity, agent onboarding,
lead ownership, commissions, and disputes.

Start with these guides:

- [What TandemCRM is](/guides/what-is-tandem/)
- [How Tandem records change](/guides/how-tandem-records-change/)
- [Database, migrations, and RLS](/guides/database-migrations-and-rls/)
- [Bring your own authentication](/guides/bring-your-own-auth/)

Then choose the module that matches the workflow you are building:

- [Trail: sales activity](/guides/trail-sales-activity/)
- [Waypoint: lead ownership](/guides/waypoint-lead-ownership/)
- [Ascent: agent onboarding](/guides/ascent-agent-onboarding/)
- [Belay: commission disputes](/guides/belay-commission-disputes/)

## Current setup status

The package includes a safe migration runner and database session helper.
The complete self-serve installation path, including first workspace and
first admin setup, is still being built. Until then, use the
[Database, migrations, and RLS](/guides/database-migrations-and-rls/) guide
with the repository README as the source of truth for database setup.
