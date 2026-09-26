# Tandem site handoff

## Update (2026-09-27): mobile facts return and roadmap cards get a width cap

- The owner asked for the useful package facts to return on mobile without
  reverting to the squeezed desktop sidebar. Added a mobile-only field-card
  grid above the hero with the engine, runtime dependency, database, MIT
  license, and the static transparent Cloud marker. Desktop continues to use
  the original sidebars, so facts are defined once visually for each layout.
- Roadmap cards now have a deliberate maximum width of 380px and stay centered
  in their section. This prevents wide screens from stretching the module art
  and long copy across oversized cards. Tablet uses two capped cards and mobile
  remains one card per row.

**Verified:** `npm run build` succeeds. A 390px visual check confirms the
mobile fact grid stays compact and leads naturally into the main claim. The
Roadmap’s capped grid is centered by CSS at wide widths, with each card kept
between 280px and 380px. Existing Astro warnings remain unchanged: empty
i18n/docs 404 content and no configured sitemap `site` value.

## Update (2026-09-27): focused mobile hero and transparent Cloud accent

- Mobile no longer squeezes the desktop sidebars into a two-column grid. Below
  768px it now hides the desktop-only facts, module list, and docs list, then
  presents a single bordered hero with the product claim, concise explanation,
  actions, and the tandem-climbers art. This keeps the first screen focused on
  what Tandem is and lets the rest of the landing page explain the detail.
- Removed the Early / Pre-1.0 announcement and status treatment from the hero
  on every screen size.
- Added `public/illustrations/tandem-cloud-v2.png`, a genuine alpha-transparent
  cloud-and-ridge PNG. It replaces the off-white-background asset in the
  desktop Cloud card. Cloud is now static and has no Motion animation.

**Verified:** `npm run build` succeeds. A 390px visual check confirms the
mobile page now opens with the focused hero and has no sidebar grid. A desktop
check confirms the Early/Pre-1.0 copy is absent and Cloud is a static
alpha-transparent accent with no opaque rectangle. Existing Astro warnings
remain unchanged: empty i18n/docs 404 content and no configured sitemap
`site` value.

## Update (2026-09-27): stable product documentation started

- Reworked the opening Starlight page into a short route map. It explains the
  current package boundary and clearly says the self-serve first-workspace
  installer is still in progress.
- Added source-grounded guides for the stable surface only: the Terrain event
  model, Postgres migrations and RLS, host-owned authentication, Trail sales
  activity, Waypoint routing, Ascent onboarding, and Belay disputes. Each
  guide uses plain language and a small code example that matches the exported
  TypeScript API.
- Deliberately excluded Camp mount/setup instructions, dashboard internals,
  and generic install/onboarding steps. Those are active product work and
  should remain absent until their public contracts are tested.
- Deliberately excluded the proposed Payout Adapter guide from this commit.
  `TandemPayoutAdapter`, `resolveConnectedAccountId`, and
  `STRIPE_CONNECTED_ACCOUNTS` are not present in the checked-out public source,
  so writing that guide now would risk documenting a missing or stale API.

**Verified:** `npm run build` succeeds and Starlight generated all nine guide
routes. The sidebar discovers the new Markdown files automatically. Existing
Astro warnings remain unchanged: empty i18n/docs 404 content and no configured
sitemap `site` value. Do not add a Camp or self-serve install guide until the
implementation lands on `main`.

## Update (2026-09-27): corrected module art placement and Cloud card

- The owner clarified that the field-guide illustrations belong only on the
  six roadmap module cards, never in the “A CRM foundation for your app”
  feature grid. That grid is text-led again.
- Added `public/illustrations/tandem-module-field-guide-v2.png`, an original
  six-panel stippled ink atlas designed for the shallow module-card headers:
  Terrain is a topo map and stone, Ascent is an uphill checkpoint path, Camp
  is a team shelter, Trail is footprints and a field notebook, Waypoint is a
  clear destination pin and route, and Belay is rope, carabiner, and belay
  hardware. The art replaces the previous dark generic atlas in the roadmap.
- Rebuilt the final left hero card using the same stat-card hierarchy as the
  MIT block: “Managed tandem-crm”, “tandem Cloud”, and “coming soon”. Its cloud
  is now a subdued background accent in the card’s top-right corner, and the
  final card has no bottom separator.
- Removed every “in use” and “in progress” label from the right-side module
  list. Each public module now shows a version link, leaving room for future
  independent module releases without making an adoption claim in the hero.

**Verified:** `npm run build` succeeds. A desktop visual check confirms the
Cloud card now follows the MIT card hierarchy and module statuses are gone. A
single 390px mobile Roadmap check confirms the feature grid is text-only and
the new Terrain, Ascent, Camp, and Waypoint cards frame their individual
drawings cleanly; Waypoint is a clear pin and route rather than a stretched
generic image. Existing Astro warnings remain unchanged: empty i18n/docs 404
content and no configured sitemap `site` value.

## Update (2026-09-27): field-guide feature cards, Cloud marker, and simpler copy

- Fetched the latest `tandem-crm` `main` README (`c828b16`) before editing.
  It now explicitly confirms that **Terrain, Camp, Ascent, Trail, Waypoint,
  and Belay** are the public names while the source identifiers are renamed
  separately. The site continues to use the public names only.
- Added `public/illustrations/tandem-feature-field-guide-v2.png`, a six-panel
  original stippled ink atlas for the lower feature cards: event notebook,
  rebuildable maps, locked ledger, signpost, safety rope, and shelter key.
  The cards crop the matching panel rather than reuse a generic icon.
- Added `public/illustrations/tandem-cloud-v1.png` below the MIT block in the
  hero. It introduces **TandemCRM Cloud** as `COMING SOON` only. The owner
  explicitly requested this marketing placeholder; it does not claim Cloud is
  available or alter the package architecture.
- Moved the compatible-host marquee ahead of the dark expedition field plate.
  Removed the top-right GitHub button, removed the bottom divider after Docs,
  and replaced the roadmap subtitle with the customer journey message.
- Rewrote the visible product copy in plainer language and removed em dashes
  and contrast-led framing such as “not another SaaS.”
- Motion now includes a calm hero entrance, a floating Cloud mark, feature
  art reveals and hover movement, as well as the existing marquee and module
  atlas behavior. Every Motion effect remains disabled for reduced-motion
  visitors.

**Verified:** `npm run build` succeeds. A desktop check confirms the top-right
GitHub button is gone, Cloud sits beneath the MIT card, and the host marquee
appears before the black field plate. A 390px mobile check confirms the Docs
area ends cleanly and the individual feature drawings and their card copy stay
readable. The known Astro warnings are unchanged: empty i18n/docs 404 content
and a missing `site` value for sitemap generation.

## Update (2026-09-26): public module naming + Tandem hero

- Fetched and read the current `tandem-crm` `main` README and handoff first
  (currently `b53aea9`). The site copy remains aligned with the real product:
  an embeddable, event-sourced CRM engine; the installable admin and a
  first-class sales stage are still explicitly in progress.
- The public-facing module names now follow the agreed expedition system:
  **Terrain, Camp, Ascent, Trail, Waypoint, Belay**. This is a website naming
  update only; package/source renaming is being handled separately. The module
  atlas continues to map one original hand-drawn panel to each name.
- Added `public/illustrations/tandem-climbers-hero-v2.png`: two climbers tied
  to the same rope, climbing together toward one yellow flag. It makes the
  origin of “Tandem” visible without adding decorative copy. The dark, inked
  asset is intentionally tucked into the hero edge so the product claim stays
  readable on desktop and mobile.
- Generated with the built-in image workflow. Prompt: original editorial
  field-guide black-ink climbers, sparse hatching, one restrained yellow flag,
  no text or logos. It is original artwork, not an imitation of another
  company’s illustration system.

**Verified:** `npm run build` succeeds. The local preview was checked once at
desktop width and once at 390px mobile width: the new names render in the
hero and atlas, the climbers stay decorative rather than covering the claim,
and the module cards remain one-column/readable on mobile. The known Astro
warnings are unchanged: the empty i18n collection/docs 404 entry and missing
`site` value for sitemap generation.

## Update (2026-09-26): copy corrected for the embeddable CRM direction

- Read the current `tandem-crm` main README and handoff before this edit. The
  site now positions Tandem as an **embeddable CRM engine** for leads, agents,
  sales activity, commissions, and disputes—not as a commission-only engine
  or a planned Cloud product.
- Rewrote the hero, its metadata, the field plate, the feature framing, and
  the module section to make that useful to a prospective adopter. The field
  plate now explains the actual workflow: lead → routing → agent activity →
  commission → dispute, while Tandem retains the immutable business record.
- Replaced the stale roadmap cards with the actual stack: Core, Ramp, Nest
  (in progress as the installable admin workspace), Trail, Routing, and
  Coaster. Removed the no-longer-aligned Tandem Cloud card.
- Added `public/illustrations/tandem-module-atlas.png`, an original six-panel
  ink atlas. Its panels map to the module names (compass, ramp, basecamp,
  trail notebook, signpost, safety crossing) and are cropped into the matching
  cards with CSS.
- Added deliberately light Motion.dev behavior: each atlas panel enters once
  on scroll and rises slightly on hover. It respects `prefers-reduced-motion`.

## Update (2026-09-26): expedition illustration direction started

- Added an original black-ink expedition field plate below the hero at
  `public/illustrations/tandem-expedition-hero.png`. It is a canyon landscape
  with a nest, two hikers, a route fork, a rising trail, a river, and a small
  Tandem-yellow summit flag. It is an original asset; it does not copy
  Saleor's artwork.
- The landing page presents it in a dark two-column panel with the message
  “One trail system. Your rules, your data.” The field-note copy deliberately
  connects Nest, Trail, Ramp, and routing without claiming a separate product
  feature.
- Corrected stale roadmap copy: the reference CRM now includes Trail activity,
  earnings, and Coaster disputes; its remaining gap is generic first-run
  installation, not a missing dispute screen.
- Verified `npm run build` succeeds and checked the local Astro preview in a
  browser. The panel is responsive down to the mobile layout.

## Next visual slice

Create a small matching family of section-level marks—not a new illustration
for every card. Highest leverage: a trail-marker/compass illustration for
“How it works,” then compact field-note accents for Core, Ramp, Trail, and
Coaster. Keep all assets original, ink-first, sparse, and lightweight.
