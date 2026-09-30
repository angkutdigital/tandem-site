---
title: Start here
description: Set up TandemCRM against a Postgres database and see it working in a few minutes.
sidebar:
  order: 1
---

TandemCRM is a CRM engine you add to a Node app with Postgres. Your app keeps
its own interface, authentication, database connection, and business rules.
Tandem supplies a durable record for leads, sales activity, agent onboarding,
lead ownership, commissions, and disputes.

## Try it in five minutes

You need a Postgres database you can experiment in. One command applies
Tandem's migrations, runs a health check, and adds a small demo workspace.

```sh
npx tandem-crm init --database-url "$DATABASE_URL" --sample-data
```

Use a connection string for the database owner or a superuser, since it has to
create the `tandem` schema. The command finishes by printing a
`TANDEM_WORKSPACE_ID`. Keep it, because your app uses it to say which
workspace it is working with.

To start with an empty workspace, replace `--sample-data` with
`--admin-user-id <uuid>`, using an ID from your own login system. Tandem never
creates user accounts itself.

## Then pick a path

If you want a working admin screen straight away, add the admin UI to a
Next.js app. It takes one config file and one route.

- [Camp: the admin UI](/guides/camp-admin-ui/)

If you are building your own interface, use the engine directly. Read these
first:

- [What TandemCRM is](/guides/what-is-tandem/)
- [How Tandem records change](/guides/how-tandem-records-change/)
- [Database, migrations, and RLS](/guides/database-migrations-and-rls/)
- [Bring your own authentication](/guides/bring-your-own-auth/)

Then choose the module that matches the workflow you are building:

- [Trail: sales activity](/guides/trail-sales-activity/)
- [Waypoint: lead ownership](/guides/waypoint-lead-ownership/)
- [Ascent: agent onboarding](/guides/ascent-agent-onboarding/)
- [Belay: commission disputes](/guides/belay-commission-disputes/)

Not sure whether Tandem fits your project? [What you can build with it](/guides/use-cases/)
shows a few real setups and where it is the wrong tool.
