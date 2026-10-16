---
title: About Tandem
description: Who builds Tandem, why we built it, and how to join in.
template: splash
---

Hi, I'm Nick from Angkut Digital. We built Tandem, and we are sharing it as open source.

Angkut Digital Enterprise makes simple software for small businesses. Our other products are on [angkut.co](https://angkut.co), including Utuh, which tracks compliance and renewals for vehicle fleets.

## Why we built it

Tandem started inside a service we run at Angkut Digital. We needed a reliable way to record leads, sales activity and partner commissions in our own Postgres database, without adding another server to run or another vendor to depend on. We took that part out, tidied it up, and made it something other teams can use too.

## How it is built

We build with AI, and we are learning every step of the way. We try to be careful about it. The money code has been through two audit passes by a separate AI reviewer, and the test suites run against real Postgres, versions 14 to 18, on every change. The [homepage](/#tested) lists exactly where we have tested it, and where we have not.

## Where it is today

Tandem is early and pre-1.0. It has not been proven at scale, and it has rough edges. We would rather tell you that than have you find out. The [changelog](https://github.com/angkutdigital/tandem-crm/blob/main/CHANGELOG.md) shows what has shipped, and the [security notes](https://github.com/angkutdigital/tandem-crm/blob/main/SECURITY.md) say what the tests do and do not cover.

## Come aboard

If Tandem resonates with you, we would love your help.

- **Contribute.** Read the [contributing guide](https://github.com/angkutdigital/tandem-crm/blob/main/CONTRIBUTING.md) and look for a [good first issue](https://github.com/angkutdigital/tandem-crm/labels/good%20first%20issue).
- **Try it on your Postgres host.** Tell us how it went with a [host report](https://github.com/angkutdigital/tandem-crm/issues/new?template=host_report.yml). A failure is as useful as a pass.
- **Fork it.** Tandem is MIT licensed, so you can shape it to your own needs. We would like to hear what you changed.
- **Ask or report.** Open an [issue](https://github.com/angkutdigital/tandem-crm/issues). If you have found a security problem, please email hello@angkut.co with "Tandem security" in the subject instead of posting it publicly.

Everyone is welcome here, and we follow a [code of conduct](https://github.com/angkutdigital/tandem-crm/blob/main/CODE_OF_CONDUCT.md).

Nick, Angkut Digital
