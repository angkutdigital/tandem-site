# Tandem site handoff

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
