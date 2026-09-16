# Design

## World — Force Signals Insignia, in constabulary blue and white

The survey is a **warrant card that fills itself in**. Force identity is carried
as structure, not decoration: the Sillitoe chequer band pinned to the top edge,
the real JCF crest as the seal, engraved-caps serif for the force name, and a
chevron rank bar that stitches one bar per completed section.

The roll dealt this direction; the user pinned **blue and white** and the
**official JCF crest**, which overrides the roll's bullion-gold palette. Gold
appears only where it already exists inside the crest artwork itself.

### Raises carried in from declined challengers

- **Monumental fixed counter** (from the nixie counter): `SECTION 02 / 05` holds
  a reserved slot at display scale in mono. Never a hairline bar to hunt for.
- **State legible without colour** (from the one-bit desktop): a selected option
  inverts to solid blue *and* carries a stamped check. Readable in bright sun and
  for colour-blind officers.
- **Structure visible from the first screen** (from the Miura sheet): all five
  sections are named on the cover; advancing is a single rigid step, never a soft
  cross-fade.
- **One question owns the phone viewport** (from the gravity garden): on small
  screens nothing competes with the question being answered.

## Palette

Sampled from the official crest artwork, not invented.

| Token | Value | Use |
|---|---|---|
| `--jcf-blue` | `#314095` | The crest's own shield blue. Brand anchor, primary action, selected state. |
| `--jcf-blue-deep` | `#1F2A6B` | Pressed and hovered blue, chequer band dark squares. |
| `--ink` | `#0E1638` | Body text, headings. Never pure black. |
| `--ink-muted` | `#5C6488` | Secondary text, tinted from the brand hue — never gray. |
| `--paper` | `#F7F8FC` | Page ground. |
| `--white` | `#FFFFFF` | Card and field ground. |
| `--rule` | `#D2D7E8` | 1px hairlines, field borders. |
| `--crest-red` | `#C8102E` | The crest's cross red. Errors only, nothing else. |
| `--focus` | `#314095` | Focus ring, 3px offset 2px. |

Light, not dark: officers fill this out on a phone, often outdoors in Jamaican
daylight, where a dark ground is unreadable behind glare.

## Type

IBM Plex superfamily — engineered, institutional, and legible at small sizes.

- **Display / headings:** IBM Plex Serif, 600. Force name in caps at `0.18em`
  tracking between hairline rules; question headings at 400.
- **Body / controls:** IBM Plex Sans, 400/500/600. Body measure capped at 68ch.
- **Counters / labels:** IBM Plex Mono, 500, caps, `0.12em` tracking. Used for
  measurement and position only, never as a technical costume.

Display ceiling 3.5rem. Tracking floor -0.02em.

## Components

- **Chequer band** — 2 rows of 14px blue/white squares, pinned to the top edge of
  every screen. The one ornament, and it is a police signifier, not decoration.
- **Chevron rank bar** — one chevron per section, filling solid blue as each is
  completed, with the current chevron outlined. Sits beside the mono counter.
- **Option** — full-width, 56px minimum, 1px rule, white ground. Selected inverts
  to solid `--jcf-blue` with a drawn check glyph. Hover raises the rule to blue.
- **Scale row** — 1–5 as five equal stamped cells, anchored by labels at both ends.
- **Field** — label above, 1px rule, 2px blue underline on focus, zero radius on
  the underline, 2px radius on the box.
- **Action** — solid blue rect, 2px radius, mono caps. Secondary is a 1px outline.

## Motion

One authored moment: the **section deploy**. Advancing slides the outgoing
section out and the incoming one in over 260ms on
`cubic-bezier(.2,.8,.2,1)`, while the completing chevron fills over 400ms. No
scattered entrances, no parallax. Every transition is disabled wholesale under
`prefers-reduced-motion`.

## Browser surfaces

Themed, not defaults: selection is `--jcf-blue` at 14% with ink text, the caret
is `--jcf-blue`, the scrollbar thumb is `--jcf-blue` at 30%, focus rings are
`--focus`, and the counter uses `font-variant-numeric: tabular-nums`.
