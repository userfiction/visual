/**
 * react.test.tsx — deterministic tests for the React layer: the IconBase
 * flat shell defaults (react.tsx machinery), size plumbing,
 * spread-props-after-defaults precedence, the registry-driven VisualIcon,
 * and per-component spot checks over the ONE-FILE-PER-ICON architecture.
 *
 * IMPORT SOURCES (post-restructure): per-icon components live in their own
 * files — CheckIcon in ./generic/check, CloseIcon in ./generic/close,
 * BookIcon in ./generic/book, DownloadIcon in ./generic/download,
 * SwordIcon in ./fantasy/sword, GemIcon in ./fantasy/gem — each built with
 * React.createElement(IconBase, …) so the per-icon files stay .ts. The
 * themed subsets (VISUAL-TESTS-2) follow the same contract: FlagIcon in
 * ./flags/flag, CatIcon in ./animals/cat (REWORKED in VISUAL-TESTS-4),
 * OwlIcon in ./animals/owl (VISUAL-TESTS-4), AppleIcon in ./fruits/apple
 * (REDESIGNED in the fruit pass — broad shoulders cresting over the top
 * dimple at (12,7.4), two bottom lobes dipping to y 22.9, an evenodd
 * highlight hole on the upper-left body, curved stem + leaf in a SECOND
 * flatPath), WillowIcon in ./nature/willow (VISUAL-TESTS-6: the
 * brand-new nature subset; REWORKED in VISUAL-TESTS-9 — ground line
 * appended), SunflowerIcon in ./nature/sunflower (VISUAL-TESTS-9: the new
 * code-generated ray-ring geometry). The old ./icons barrel and
 * ./definitions module are DELETED; ./react.tsx now exports only the
 * machinery (IconBase/VisualIcon + IconProps types).
 *
 * IMPORT ORDER: ./builtins is imported FIRST among icon modules — loading
 * the svgIcons map performs the registration side effects for ALL 168
 * built-ins (builtins.ts pulls the generic/ + fantasy/ + flags/ + animals/
 * + fruits/ + nature/ sub-barrels — 23 generic + 30 fantasy + 8 flags +
 * 60 animals + 19 fruits + 28 nature; react.tsx does no registration of
 * its own), which is what
 * VisualIcon resolves against at render time. LOAD-BEARING: svgIcons must
 * actually be USED
 * below — esbuild elides unused imports in TS files, which would skip the
 * ./builtins module evaluation entirely and leave the registry empty.
 * Assertions here are NAME-specific (per data-icon hook), never count-coupled,
 * so the 33→61→71→92→98→148→168 growth needs no assertion changes.
 *
 * EXPECTED VALUES: attributes are asserted as exact strings; innerHTML
 * expectations are the hardcoded POST-SERIALIZATION forms of the per-icon
 * geometry constants — jsdom normalizes self-closing SVG elements when
 * serializing innerHTML (`<path …/>` reads back as `<path …></path>`,
 * attribute order preserved verbatim), verified against this exact jsdom
 * via a scratch probe under the repo-root Temp/ directory
 * (Temp/visual/probe3.ts for the original pins, probe-react2.ts for the
 * VISUAL-TESTS-2 flags/animals/fruits pins, probe-react4.ts for the
 * VISUAL-TESTS-4 animals-rework pins — reworked cat + new owl/butterfly —
 * probe-react6.ts for the VISUAL-TESTS-6 pins — reworked apple + nature
 * willow/flower — and probe-react9.ts for the VISUAL-TESTS-9 pins —
 * reworked willow (ground line) + reworked flower (second leaf) + new
 * sunflower/tulip — probe-vt10-react.tsx for the superseded VISUAL-TESTS-10
 * apple pin (two-lobe body) — and probe-react11.tsx for the CURRENT
 * fruit-redesign apple pin (broad shoulders / two bottom lobes / evenodd
 * highlight / stem+leaf flatPath; that probe DIFFS jsdom's serialization
 * against the hand-derived expected string instead of capturing a blind
 * baseline) —
 * run with `npx vite-node Temp/visual/<probe>.ts`
 * from the workspace root — jsdom imported explicitly there because plain
 * Node has no DOM). The `serialized()` probe below derives the same
 * normalized value from the geometry constant itself through the SAME DOM
 * machinery the components render through, so the React pipeline is pinned
 * to the per-icon files (single source of truth) AND to the literal string.
 *
 * QUERY STYLE: the svgs are aria-hidden by design (decorative-by-default),
 * so role-based queries would fail — the container.querySelector /
 * screen.getByTestId pattern below is the deliberate a11y-context choice.
 */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { svgIcon } from './svg-icon';
// FIRST: the built-in factory map import registers every name in the shared
// registry (builtins.ts side effects via the generic/ + fantasy/ sub-barrels)
// for VisualIcon lookups. LOAD-BEARING — see header note.
import { svgIcons } from './builtins';
// Per-icon files: each import performs that name's registration side effect
// AND exports the geometry constant + the React component.
import { ICON_CHECK, CheckIcon } from './generic/check';
import { ICON_CLOSE, CloseIcon } from './generic/close';
import { ICON_BOOK, BookIcon } from './generic/book';
import { ICON_DOWNLOAD, DownloadIcon } from './generic/download';
import { ICON_SWORD, SwordIcon } from './fantasy/sword';
import { ICON_GEM, GemIcon } from './fantasy/gem';
// VISUAL-TESTS-2: themed-subset per-icon files (flags/, animals/, fruits/,
// nature/) follow the identical one-file-per-icon contract. The CHECKERED_FLAG,
// BUTTERFLY and FLOWER constants are imported WITHOUT their components because
// checkeredFlag (VISUAL-TESTS-2), butterfly (VISUAL-TESTS-4) and flower
// (VISUAL-TESTS-6) back the VisualIcon live-registry round-trips below —
// names resolvable ONLY through builtins.ts, not a direct import here.
import { ICON_FLAG, FlagIcon } from './flags/flag';
import { ICON_CHECKERED_FLAG, CheckeredFlagIcon } from './flags/checkered-flag';
// FLAGS-PRODUCTION React coverage: SaltireFlagIcon pins the TWO-element
// (evenodd frame + flatPath saltire paint-over) ordering through the shell;
// CEREMONIAL_BANNER is imported WITHOUT its component and backs the
// VisualIcon live-registry round-trip (butterfly/checkeredFlag precedent —
// the flags block sits at builtins offsets 53..76, so its tail resolves
// ONLY through the builtins.ts side effects).
import { ICON_SALTIRE_FLAG, SaltireFlagIcon } from './flags/saltire-flag';
import { ICON_CEREMONIAL_BANNER } from './flags/ceremonial-banner';
import { ICON_CAT, CatIcon } from './animals/cat';
// VISUAL-TESTS-4: the reworked/expanded animals set. Owl mixes flatPath
// holes with TWO literal pupil <circle> elements (the SwordIcon
// path+circle multi-element precedent).
import { ICON_OWL, OwlIcon } from './animals/owl';
import { ICON_BUTTERFLY } from './animals/butterfly';
// The apple geometry was REDESIGNED in the fruit pass (broad shoulders + two
// bottom lobes + evenodd highlight hole in path ONE; curved stem + leaf in
// the SECOND flatPath) — APPLE_SERIALIZED re-probed below from
// Temp/visual/probe-react11.tsx. The nature subset follows the same
// one-file-per-icon contract: WillowIcon
// got the per-component spot check; FLOWER is imported WITHOUT its
// component and backs the VisualIcon live-registry round-trip
// (butterfly/checkeredFlag precedent).
import { ICON_APPLE, AppleIcon } from './fruits/apple';
import { ICON_WILLOW, WillowIcon } from './nature/willow';
import { ICON_FLOWER } from './nature/flower';
// VISUAL-TESTS-9: the nature set expanded 12→18. WillowIcon was REWORKED
// (ground line `M6.4 21.8h11.2v1h-11.2z` appended) and flower gained a
// second stem leaf — BOTH pins re-probed below. SunflowerIcon gets the new
// per-component spot check (its petal-ring geometry is GENERATED in code —
// see the RAYS table in nature/sunflower.ts — so the pin freezes the
// generated output). TULIP is imported WITHOUT its component and backs the
// VisualIcon live-registry round-trip (butterfly/checkeredFlag/flower
// precedent).
import { ICON_SUNFLOWER, SunflowerIcon } from './nature/sunflower';
import { ICON_TULIP } from './nature/tulip';
// LAST: the machinery module itself (IconBase/VisualIcon/IconProps). The
// per-icon files above already import it — the layering stays acyclic
// (machinery ← icons, see the react.tsx header).
import { VisualIcon } from './react';

// Offscreen probe: serializes a raw definition string through the SAME DOM
// machinery (innerHTML setter → parser → getter) the components render
// through, so expected and actual markup are compared post-normalization.
const probe = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const serialized = (markup: string): string => {
    probe.innerHTML = markup;
    return probe.innerHTML;
};

// Hardcoded post-serialization innerHTML pins (jsdom: `…/>` → `…></path>`
// and `…/>` → `…></circle>`, attribute order preserved) — probe-captured
// exact values from Temp/visual/probe3.ts, serializer-independent.
const CHECK_SERIALIZED =
    '<path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" fill="currentColor" stroke="none"></path>';
const BOOK_SERIALIZED =
    '<path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" fill="currentColor" stroke="none"></path>';
const CLOSE_SERIALIZED =
    '<path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="currentColor" stroke="none"></path>';
const DOWNLOAD_SERIALIZED =
    '<path d="M11 4h2v8h3l-4 4-4-4h3zM5 18h14v2H5z" fill="currentColor" stroke="none"></path>';
// Sword (fantasy/sword.ts, FANTASY-REDRAW) = TWO evenodd path elements —
// the main silhouette (blade with the transparent fuller slot + the two
// grip-wrap notches) and the pommel RING (outer r 1.5 + r 0.65 hole) as a
// separate paint-over path (ring/grip overlap 0.4 deep would XOR under a
// same-path evenodd); BOTH elements appear in the serialized innerHTML, in
// definition order.
const SWORD_SERIALIZED =
    '<path d="M12 1L14.5 5V15H9.5V5ZM11.45 6H12.55V13.9H11.45ZM6 15H18V17.5H6ZM11 17.5H13V21H11ZM11 18.4H13V19H11ZM11 19.8H13V20.4H11Z" fill="currentColor" stroke="none" fill-rule="evenodd"></path><path d="M12 20.6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 1 1 0-3zM12 21.45a0.65 0.65 0 1 0 0 1.3a0.65 0.65 0 1 0 0-1.3z" fill="currentColor" stroke="none" fill-rule="evenodd"></path>';
// Gem (fantasy/gem.ts, FANTASY-REDRAW): ONE evenodd path — the brilliant
// silhouette carrying the girdle slot (confined to the silhouette
// intersection), two crown slots and two pavilion wedges as facet holes.
const GEM_SERIALIZED =
    '<path d="M12 21L3 10L6 5H18L21 10ZM3.24 9.6H20.76L21 10L20.67273 10.4H3.32727L3 10ZM6 5L9 9.6H9.8L6.8 5ZM17.2 5H18L15 9.6H14.2ZM9 10.4H9.8L12 21ZM14.2 10.4H15L12 21Z" fill="currentColor" stroke="none" fill-rule="evenodd"></path>';
// ── VISUAL-TESTS-2 new-subset pins — UPDATED for the FLAGS-PRODUCTION
// uplift (hand-derived from flags/flag.ts + the jsdom normalization rules,
// not probe-captured) ──
// Flag (flags/flag.ts, uplifted): full-height pole rect x4..6 y1..23 +
// attached flag rect x6..19→21 y3..14 as two rect subpaths in ONE flat
// path — single element, no holes.
const FLAG_SERIALIZED =
    '<path d="M4 1h2v22H4zM6 3h15v11H6z" fill="currentColor" stroke="none"></path>';
// Cat (animals/cat.ts, REWORKED in VISUAL-TESTS-13): the single-silhouette
// head+ears body carries the inner-ear/eye/nose/ω-mouth holes cut by
// EXPLICIT fill-rule="evenodd" (source order d, fill, stroke, fill-rule),
// and the whisker bars are a SECOND flatPath element — two <path> elements
// total, in definition order (same two-element precedent as the SwordIcon
// pin). Re-derived from animals/cat.ts + the flatPath template
// (svg-icon.ts:101) + the jsdom normalization rules, then diffed against
// the live serialization by Temp/visual/probe-animals-vt13.ts.
const CAT_SERIALIZED =
    '<path d="M5 2.4L8.6 8.2Q12 7.2 15.4 8.2L19 2.4Q21.1 3.6 20.6 9.4Q21 13 20.2 15.2Q19.4 20.6 12 20.6Q4.6 20.6 3.8 15.2Q3 13 3.6 9.4Q3.1 4.4 5 2.4zM5.5 4.2L7.2 7.2 5.6 7.6zM18.5 4.2L16.8 7.2 18.4 7.6zM7.15 13.2a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0zM14.55 13.2a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0zM11 15.4L13 15.4 12 16.9zM10.4 17.2A0.8 0.8 0 0 1 12 17.2A0.8 0.8 0 0 1 13.6 17.2z" fill="currentColor" stroke="none" fill-rule="evenodd"></path><path d="M1.4 12.4h3.2v0.6h-3.2zM1.2 14.3h3.4v0.6h-3.4zM1.6 16.2h3v0.6h-3zM19.4 12.4h3.2v0.6h-3.2zM19.4 14.3h3.4v0.6h-3.4zM19.4 16.2h3v0.6h-3z" fill="currentColor" stroke="none"></path>';
// Apple (fruits/apple.ts, REDESIGNED in the fruit pass): the broad-shoulder
// two-lobe body (top dimple seating the stem at (12,7.4), bottom lobes
// dipping to y 22.9 around the bottom-center cleft at (12,21.2)) carries the
// upper-left highlight lens as an EVENODD hole via fill-rule="evenodd" in
// path ONE, plus a SECOND flatPath element with the curved stem + leaf —
// two <path> elements total, in definition order (same two-element precedent
// as the SwordIcon pin). Re-probed from Temp/visual/probe-react11.tsx, whose
// EXPECTED_DERIVED constant is HAND-WRITTEN from the source markup + the
// flatPath template + the jsdom normalization rules and diffed against the
// live serialization — the pin below IS that derived string, not a blind
// baseline capture.
const APPLE_SERIALIZED =
    '<path d="M12 7.4C9.5 5.3 5.8 6.1 4.1 8.8 1.9 12.5 4.2 19.2 7.2 21.4 9.2 22.9 10.5 21.2 12 21.2S14.8 22.9 16.8 21.4C19.8 19.2 22.1 12.5 19.9 8.8 18.2 6.1 14.5 5.3 12 7.4zM6.3 10C5 11.7 5.1 14 5.8 15.4L7 14.9C6.5 13.4 6.6 11.9 7.4 10.8z" fill="currentColor" stroke="none" fill-rule="evenodd"></path><path d="M11.3 7.8C11.1 5.4 11.5 3.5 12.8 1.8L14 2.7C12.9 4.2 12.6 5.8 12.8 7.8zM14 5.2C14.1 2.6 17.1 1.5 20 2.3 18.9 4.9 16.8 6.2 14 5.2z" fill="currentColor" stroke="none"></path>';
// CheckeredFlag (flags/checkered-flag.ts, uplifted): pole + flag rect + 16
// 2×2 checker holes in ONE path cut by the EXPLICIT fill-rule="evenodd"
// attribute (source order d, fill, stroke, fill-rule) — used by the
// CheckeredFlagIcon pin AND the VisualIcon live-registry round-trip below.
const CHECKERED_FLAG_SERIALIZED =
    '<path d="M3 1h2v22H3zM5 3h16v8H5zM7 3v2h2V3zM11 3v2h2V3zM15 3v2h2V3zM19 3v2h2V3zM5 5v2h2V5zM9 5v2h2V5zM13 5v2h2V5zM17 5v2h2V5zM7 7v2h2V7zM11 7v2h2V7zM15 7v2h2V7zM19 7v2h2V7zM5 9v2h2V9zM9 9v2h2V9zM13 9v2h2V9zM17 9v2h2V9z" fill="currentColor" stroke="none" fill-rule="evenodd"></path>';
// ── VISUAL-TESTS-4 animals pins — VISUAL-TESTS-13 redraw refresh
// (re-derived from the animals/* source constants + the flatPath template +
// the jsdom normalization rules and diffed against the live serialization
// by Temp/visual/probe-animals-vt13.ts) ──
// Owl (animals/owl.ts, redrawn): flatPath (sharp ear tufts + egg body +
// eye-ring / beak / belly-chevron holes + feet, explicit evenodd) + TWO
// literal pupil <circle> dots — THREE elements total, in definition order
// (path first, circles after); same path+circle multi-element precedent as
// the SwordIcon pin.
const OWL_SERIALIZED =
    '<path d="M6.6 8L4.6 2.6Q4.5 2.2 5 2.4L10 5.2zM17.4 8L19.4 2.6Q19.5 2.2 19 2.4L14 5.2zM12 4.8Q18.6 4.8 18.6 12L18.6 18Q18.6 20.8 15.8 20.8L8.2 20.8Q5.4 20.8 5.4 18L5.4 12Q5.4 4.8 12 4.8zM6.9 10.9a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0 -4.8 0zM12.3 10.9a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0 -4.8 0zM11.15 13.9l0.85 2.2 0.85-2.2zM8.15 17l0.85 1.3 0.85-1.3zM11.15 17l0.85 1.3 0.85-1.3zM14.15 17l0.85 1.3 0.85-1.3zM8.5 20.7h1.9v0.4a0.95 0.95 0 0 1 -1.9 0zM13.6 20.7h1.9v0.4a0.95 0.95 0 0 1 -1.9 0z" fill="currentColor" stroke="none" fill-rule="evenodd"></path><circle cx="9.3" cy="10.9" r="1.05" fill="currentColor" stroke="none"></circle><circle cx="14.7" cy="10.9" r="1.05" fill="currentColor" stroke="none"></circle>';
// Butterfly (animals/butterfly.ts, redrawn): FOUR rotated evenodd PATH
// wings (each carries its own spot hole in the same d) + the antenna
// flatPath + <rect> body + THREE <circle> (head + antenna tips) — SIX
// elements total; imported WITHOUT its component and used ONLY by the
// VisualIcon live-registry round-trip below.
const BUTTERFLY_SERIALIZED =
    '<path d="M3.5 9.2a3.9 4.7 0 1 1 7.8 0a3.9 4.7 0 1 1 -7.8 0zM6.3 9.2a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z" transform="rotate(-24 7.4 9.2)" fill="currentColor" stroke="none" fill-rule="evenodd"></path><path d="M12.7 9.2a3.9 4.7 0 1 1 7.8 0a3.9 4.7 0 1 1 -7.8 0zM15.5 9.2a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z" transform="rotate(24 16.6 9.2)" fill="currentColor" stroke="none" fill-rule="evenodd"></path><path d="M5.7 15.8a2.9 3.3 0 1 1 5.8 0a2.9 3.3 0 1 1 -5.8 0zM7.5 15.8a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z" transform="rotate(24 8.6 15.8)" fill="currentColor" stroke="none" fill-rule="evenodd"></path><path d="M12.5 15.8a2.9 3.3 0 1 1 5.8 0a2.9 3.3 0 1 1 -5.8 0zM14.3 15.8a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z" transform="rotate(-24 15.4 15.8)" fill="currentColor" stroke="none" fill-rule="evenodd"></path><path d="M11.3 5.6L9.9 2.6 10.7 2.3 12 5.5zM12.7 5.5L14.1 2.5 14.9 2.8 13.3 5.6z" fill="currentColor" stroke="none"></path><rect x="11.25" y="7.4" width="1.5" height="11.6" rx="0.75" fill="currentColor" stroke="none"></rect><circle cx="12" cy="6.2" r="1.25" fill="currentColor" stroke="none"></circle><circle cx="10.3" cy="2.4" r="0.65" fill="currentColor" stroke="none"></circle><circle cx="14.5" cy="2.6" r="0.65" fill="currentColor" stroke="none"></circle>';
// ── VISUAL-TESTS-6 fruits-rework + nature pins (probe-captured from
// Temp/visual/probe-react6.ts via the same jsdom machinery) ──
// Willow (nature/willow.ts, REWORKED in VISUAL-TESTS-9 — a ground line
// `M6.4 21.8h11.2v1h-11.2z` was APPENDED and WILLOW_SERIALIZED was
// re-probed from Temp/visual/probe-react9.ts): ONE flatPath element —
// five rounded-bottom curtain tubes (drawn FIRST, tops hidden under the
// dome) + the umbrella dome + the trunk + the ground line — single
// element, no holes.
const WILLOW_SERIALIZED =
    '<path d="M4.6 8h1.9v4.6a0.95 0.95 0 0 1 -1.9 0zM8.2 8.6h1.9v5.2a0.95 0.95 0 0 1 -1.9 0zM11.05 9.4h1.9v5.4a0.95 0.95 0 0 1 -1.9 0zM13.9 8.6h1.9v5.2a0.95 0.95 0 0 1 -1.9 0zM17.5 8h1.9v4.6a0.95 0.95 0 0 1 -1.9 0zM12 1.2a8.8 4.4 0 0 1 8.8 4.4c0 2.4-4 4.3-8.8 4.3S3.2 8 3.2 5.6A8.8 4.4 0 0 1 12 1.2zM10.9 15h2.2v6.8h-2.2zM6.4 21.8h11.2v1h-11.2z" fill="currentColor" stroke="none"></path>';
// Flower (nature/flower.ts, REWORKED in VISUAL-TESTS-9 — a SECOND leaf
// lens `M11.4 18.6c…` was APPENDED to the stem path and FLOWER_SERIALIZED
// was re-probed from Temp/visual/probe-react9.ts): stem + TWO leaf
// lenses flatPath + SIX literal <circle> elements (five r-2.3 petal ring
// + the r-2.1 center) — still SEVEN elements total, in definition order;
// imported WITHOUT its component and used
// ONLY by the VisualIcon live-registry round-trip below.
const FLOWER_SERIALIZED =
    '<path d="M11.4 12.2h1.2v9h-1.2zM12.6 16.4c2.4-1.4 4.6-1 5.6.4-2.2 1.6-4.4 1.2-5.6-.4zM11.4 18.6c-2.4-1.4-4.6-1-5.6.4 2.2 1.6 4.4 1.2 5.6-.4z" fill="currentColor" stroke="none"></path><circle cx="12" cy="5.6" r="2.3" fill="currentColor" stroke="none"></circle><circle cx="15.4" cy="8" r="2.3" fill="currentColor" stroke="none"></circle><circle cx="14.1" cy="12" r="2.3" fill="currentColor" stroke="none"></circle><circle cx="9.9" cy="12" r="2.3" fill="currentColor" stroke="none"></circle><circle cx="8.6" cy="8" r="2.3" fill="currentColor" stroke="none"></circle><circle cx="12" cy="9" r="2.1" fill="currentColor" stroke="none"></circle>';
// ── VISUAL-TESTS-9 nature-expansion pins (probe-captured from
// Temp/visual/probe-react9.ts via the same jsdom machinery) ──
// Sunflower (nature/sunflower.ts): ONE flatPath element whose petal ring
// is GENERATED in code — twelve 3-point wedge triangles (`M12 7L<cx>
// <cy>L<third>z`) radiating from the disc center (12,7), coordinates
// straight from the RAYS table at 30° steps (raw JS toString formatting:
// 14.128, 13.843, 0.62-truncated thirds) — plus the r-3.6 disc (drawn
// over the wedge bases), FIVE counterclockwise r-0.7 seed-dot holes +
// the center dot hole (nonzero fill subtracts the sweep-0 subpaths),
// the stem rect, TWO leaf lenses and the ground line.
const SUNFLOWER_SERIALIZED =
    '<path d="M12 7L17.6 7L14.128 7zM12 7L16.85 9.8L13.843 8.064zM12 7L14.8 11.85L13.064 8.843zM12 7L12 12.6L12 9.128zM12 7L9.2 11.85L10.936 8.843zM12 7L7.15 9.8L10.157 8.064zM12 7L6.4 7L9.872 7zM12 7L7.15 4.2L10.157 5.936zM12 7L9.2 2.15L10.936 5.157zM12 7L12 1.4L12 4.872zM12 7L14.8 2.15L13.064 5.157zM12 7L16.85 4.2L13.843 5.936zM8.4 7a3.6 3.6 0 1 1 7.2 0a3.6 3.6 0 1 1 -7.2 0zM9.95 7a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0zM11.35 9.1a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0zM13.65 7a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0zM11.35 4.9a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0zM11.3 7a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0zM11.4 10.8h1.2v10.4h-1.2zM12.6 15.4c2.4-1.4 4.6-1 5.6.4-2.2 1.6-4.4 1.2-5.6-.4zM11.4 18.2c-2.4-1.4-4.6-1-5.6.4 2.2 1.6 4.4 1.2 5.6-.4zM4.4 21.2h15.2v1h-15.2z" fill="currentColor" stroke="none"></path>';
// Tulip (nature/tulip.ts): ONE flatPath element — the cup bloom outline
// (rim with three top points, sides curving down to a rounded base y
// 13.4), TWO counterclockwise petal-seam line holes inside the cup,
// the stem rect, TWO leaf lenses hugging the stem and the ground line.
// Used ONLY by the VisualIcon live-registry round-trip below.
const TULIP_SERIALIZED =
    '<path d="M6.6 3.4L8.6 5.4 10.3 3.4 12 5.4 13.7 3.4 15.4 5.4 17.4 3.4V9.4a5.4 4 0 0 1 -10.8 0zM10.35 6.4v6h.7v-6zM12.95 6.4v6h.7v-6zM11.4 13.4h1.2v7.8h-1.2zM11.3 17.6C8.6 15.4 6.2 15.6 4.6 17.4c2.6 2.6 5.4 2.2 6.7.2zM12.7 17.6c2.7-2.2 5.1-2 6.7-.2-2.6 2.6-5.4 2.2-6.7.2zM4.4 21.2h15.2v1h-15.2z" fill="currentColor" stroke="none"></path>';

describe('CheckIcon (per-icon file, IconBase shell defaults)', () => {
    it('renders the shared flat-design shell with decorative-by-default a11y', () => {
        const { container } = render(<CheckIcon />);
        const svg = container.querySelector('svg[data-icon="check"]');
        expect(svg).not.toBeNull();
        const el = svg as SVGSVGElement;
        // Default box: 16px square on the shared 24×24 grid
        expect(el.getAttribute('width')).toBe('16');
        expect(el.getAttribute('height')).toBe('16');
        expect(el.getAttribute('viewBox')).toBe('0 0 24 24');
        // Flat shell matches the per-element definition attributes
        expect(el.getAttribute('fill')).toBe('currentColor');
        expect(el.getAttribute('stroke')).toBe('none');
        // Decorative-by-default accessibility (controls own the names)
        expect(el.getAttribute('aria-hidden')).toBe('true');
        expect(el.getAttribute('focusable')).toBe('false');
        // Geometry: exactly the ICON_CHECK definition from generic/check.ts
        // (hardcoded literal pin)
        expect(el.innerHTML).toBe(CHECK_SERIALIZED);
        // …and the per-icon constant normalizes to the same exact string
        expect(el.innerHTML).toBe(serialized(ICON_CHECK));
    });

    it('sizes number props as px (width AND height stay locked together)', () => {
        const { container } = render(<CheckIcon size={24} />);
        const el = container.querySelector('svg[data-icon="check"]') as SVGSVGElement;
        expect(el.getAttribute('width')).toBe('24');
        expect(el.getAttribute('height')).toBe('24');
    });

    it('sizes string props verbatim (text-relative sizing)', () => {
        const { container } = render(<CheckIcon size="1em" />);
        const el = container.querySelector('svg[data-icon="check"]') as SVGSVGElement;
        expect(el.getAttribute('width')).toBe('1em');
        expect(el.getAttribute('height')).toBe('1em');
    });
});

describe('CloseIcon (spread props land AFTER the shell defaults)', () => {
    it('forwards className and data hooks onto the svg element', () => {
        render(<CloseIcon className="xyz" data-testid="x" />);
        const el = screen.getByTestId('x');
        expect(el.getAttribute('class')).toBe('xyz');
        expect(el.getAttribute('data-icon')).toBe('close');
        // Geometry flows from the per-icon file exactly like the shell props
        expect(el.innerHTML).toBe(CLOSE_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_CLOSE));
    });

    it('lets a consumer override the decorative a11y defaults', () => {
        const { container } = render(<CloseIcon aria-hidden="false" aria-label="Close" />);
        const el = container.querySelector('svg[data-icon="close"]') as SVGSVGElement;
        // Spread props win over the defaults (applied after them in IconBase)
        expect(el.getAttribute('aria-hidden')).toBe('false');
        expect(el.getAttribute('aria-label')).toBe('Close');
    });
});

describe('VisualIcon (registry-driven render-any)', () => {
    it('renders a registered name through the shared registry', () => {
        // svgIcons was imported (and used) — 'check' is registered by now
        const { container } = render(<VisualIcon name="check" />);
        const el = container.querySelector('svg[data-icon="check"]') as SVGSVGElement;
        expect(el.innerHTML).toBe(CHECK_SERIALIZED);
        // Cross-layer pin: the registry entry VisualIcon reads produces the
        // exact same string markup as the builtins.ts factory for that name.
        // svgIcons stores createSvgIcon's BOUND factory, so ONE call renders
        // (probe-verified: typeof svgIcons.check() === 'string').
        expect(svgIcon('check')).toBe(svgIcons.check());
    });

    it('renders a themed-subset name through the live registry (checkeredFlag)', () => {
        // checkeredFlag has NO direct per-icon component import in this file —
        // it resolves ONLY through the builtins.ts map (imported first), so a
        // pass proves the flags/ sub-barrel registration side effects are
        // live for VisualIcon at render time.
        const { container } = render(<VisualIcon name="checkeredFlag" />);
        const el = container.querySelector('svg[data-icon="checkeredFlag"]') as SVGSVGElement;
        expect(el.innerHTML).toBe(CHECKERED_FLAG_SERIALIZED);
        // …and the registry-backed definition normalizes to the same string
        expect(el.innerHTML).toBe(serialized(ICON_CHECKERED_FLAG));
    });

    it('renders a late-alphabet animal name through the live registry (butterfly)', () => {
        // butterfly has NO direct per-icon component import in this file —
        // it resolves ONLY through the builtins.ts map (imported first), so a
        // pass proves the animals/ sub-barrel registration side effects are
        // live for VisualIcon at render time. Butterfly sits 19th of the
        // 60 animals, far from the
        // set head, so a registration-order mistake would not pass unnoticed.
        const { container } = render(<VisualIcon name="butterfly" />);
        const el = container.querySelector('svg[data-icon="butterfly"]') as SVGSVGElement;
        // SIX serialized elements (4 rotated evenodd wing paths, each
        // carrying its own spot hole + the antenna path + the rect body +
        // head/antenna-tip circles) — exact full-string pin:
        expect(el.innerHTML).toBe(BUTTERFLY_SERIALIZED);
        // …and the registry-backed definition normalizes to the same string
        expect(el.innerHTML).toBe(serialized(ICON_BUTTERFLY));
    });

    it('renders a late-alphabet nature name through the live registry (flower)', () => {
        // flower has NO direct per-icon component import in this file — it
        // resolves ONLY through the builtins.ts map (imported first), so a
        // pass proves the nature/ sub-barrel registration side effects are
        // live for VisualIcon at render time. Flower sits 16th of the
        // 18-name trees/plants block (nature then grew to 28 with the
        // VISUAL-TESTS-11 landscape + sky subsets appended after
        // sunflower) — the expansion added five trees + a
        // bush/cactus/fern cluster BEFORE it (oak→fern, VISUAL-TESTS-9),
        // then tulip and sunflower AFTER it, so a registration-order
        // mistake in the middle of the nature set would not pass unnoticed.
        const { container } = render(<VisualIcon name="flower" />);
        const el = container.querySelector('svg[data-icon="flower"]') as SVGSVGElement;
        // SEVEN serialized elements (stem + TWO-leaf path + five petal
        // circles + the center circle) — exact full-string pin:
        expect(el.innerHTML).toBe(FLOWER_SERIALIZED);
        // …and the registry-backed definition normalizes to the same string
        expect(el.innerHTML).toBe(serialized(ICON_FLOWER));
    });

    it('renders a near-end nature name through the live registry (tulip)', () => {
        // tulip has NO direct per-icon component import in this file — it
        // resolves ONLY through the builtins.ts map (imported first), so a
        // pass proves the nature/ sub-barrel registration side effects are
        // live for VisualIcon at render time. Tulip sits 17th of the
        // 18-name trees/plants block (VISUAL-TESTS-9 expansion; the
        // landscape + sky subsets follow in the 28-name nature set), just
        // short of the block tail, so a late-insertion mistake would not
        // pass unnoticed.
        const { container } = render(<VisualIcon name="tulip" />);
        const el = container.querySelector('svg[data-icon="tulip"]') as SVGSVGElement;
        // ONE serialized element (cup bloom + seam holes + stem + leaves +
        // ground, one path) — exact full-string pin:
        expect(el.innerHTML).toBe(TULIP_SERIALIZED);
        // …and the registry-backed definition normalizes to the same string
        expect(el.innerHTML).toBe(serialized(ICON_TULIP));
    });

    it('renders nothing for an unregistered name (no empty svg shell)', () => {
        const { container } = render(<VisualIcon name="never-registered-x" />);
        expect(container.innerHTML).toBe('');
    });

    it('renders nothing for a non-string name (isString guard before registry access)', () => {
        // iconRegistry(<non-string>) would return the whole map — VisualIcon
        // string-checks first and returns null instead of a broken render.
        const { container } = render(<VisualIcon name={undefined as unknown as string} />);
        expect(container.innerHTML).toBe('');
    });
});

describe('per-component spot checks (one file per icon)', () => {
    it('BookIcon renders the book definition on its machine hook', () => {
        const { container } = render(<BookIcon />);
        const el = container.querySelector('svg[data-icon="book"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        expect(el.innerHTML).toBe(BOOK_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_BOOK));
    });

    it('DownloadIcon renders with its machine hook', () => {
        const { container } = render(<DownloadIcon />);
        const el = container.querySelector('svg[data-icon="download"]') as SVGSVGElement;
        expect(el.getAttribute('data-icon')).toBe('download');
        expect(el.innerHTML).toBe(DOWNLOAD_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_DOWNLOAD));
    });

    it('SwordIcon renders the sword definition including the pommel ring path element', () => {
        const { container } = render(<SwordIcon />);
        const el = container.querySelector('svg[data-icon="sword"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        // The fantasy geometry is TWO elements (FANTASY-REDRAW): the
        // evenodd main silhouette path (blade fuller + grip notches) + the
        // pommel RING as a separate evenodd path — both must survive the
        // React shell (dangerouslySetInnerHTML) and the jsdom serialization
        // intact, in definition order: main path first, pommel ring second.
        expect(el.innerHTML).toBe(SWORD_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_SWORD));
    });

    it('GemIcon renders the gem definition on its machine hook', () => {
        const { container } = render(<GemIcon />);
        const el = container.querySelector('svg[data-icon="gem"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        expect(el.innerHTML).toBe(GEM_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_GEM));
    });

    it('FlagIcon renders the flags-subset definition (pole + flag, one path)', () => {
        const { container } = render(<FlagIcon />);
        const el = container.querySelector('svg[data-icon="flag"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        // Two rect subpaths (pole + attached flag) in ONE flat path — single
        // element, no holes, so exactly one serialized <path> appears.
        expect(el.innerHTML).toBe(FLAG_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_FLAG));
    });

    it('CatIcon renders the animals-subset definition on its machine hook', () => {
        const { container } = render(<CatIcon />);
        const el = container.querySelector('svg[data-icon="cat"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        // TWO elements (REWORKED in VISUAL-TESTS-13): flatPath ONE is the
        // single-silhouette head+ears body whose inner-ear/eye/nose/ω-mouth
        // holes are cut by the EXPLICIT fill-rule="evenodd" attribute (the
        // source order is d, fill, stroke, fill-rule); flatPath TWO carries
        // the six whisker bars. Like the SwordIcon two-element precedent,
        // both must survive the React shell (dangerouslySetInnerHTML) and
        // jsdom serialization intact, in definition order: body first,
        // whiskers second.
        expect(el.innerHTML).toBe(CAT_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_CAT));
    });

    it('OwlIcon renders the animals-subset definition including the pupil circle elements', () => {
        const { container } = render(<OwlIcon />);
        const el = container.querySelector('svg[data-icon="owl"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        // The owl geometry is THREE elements (flatPath ear-tuft/body/holes/
        // feet path + TWO literal pupil <circle> dots re-centering inside the
        // eye-ring holes) — like the SwordIcon path+circle precedent, all
        // must survive the React shell (dangerouslySetInnerHTML) and the
        // jsdom serialization intact, in definition order: path first,
        // circles after. (Redrawn in VISUAL-TESTS-13 — see OWL_SERIALIZED.)
        expect(el.getAttribute('data-icon')).toBe('owl');
        expect(el.innerHTML).toBe(OWL_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_OWL));
    });

    it('AppleIcon renders the fruits-subset definition including the evenodd highlight and stem/leaf path element', () => {
        const { container } = render(<AppleIcon />);
        const el = container.querySelector('svg[data-icon="apple"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        // TWO elements (REDESIGNED in the fruit pass): flatPath ONE is the
        // broad-shoulder two-lobe body whose upper-left highlight is an
        // EVENODD hole (fill-rule="evenodd" keeps it transparent on any
        // theme — the source order is d, fill, stroke, fill-rule); flatPath
        // TWO carries the curved stem + leaf. Like the SwordIcon two-element
        // precedent, both must survive the React shell
        // (dangerouslySetInnerHTML) and jsdom serialization intact, in
        // definition order: body path first, stem/leaf path second.
        expect(el.innerHTML).toBe(APPLE_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_APPLE));
    });

    it('WillowIcon renders the nature-subset definition (dome + tubes + trunk + ground, one path)', () => {
        const { container } = render(<WillowIcon />);
        const el = container.querySelector('svg[data-icon="willow"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        // Single flatPath (nature/willow.ts, REWORKED in VISUAL-TESTS-9):
        // five rounded-bottom curtain tubes drawn FIRST (their tops hide
        // under the dome), then the umbrella dome, then the trunk, then the
        // APPENDED ground line — one element, no holes, so exactly one
        // serialized <path> appears.
        expect(el.getAttribute('data-icon')).toBe('willow');
        expect(el.innerHTML).toBe(WILLOW_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_WILLOW));
    });

    it('SunflowerIcon renders the new nature-subset definition (ray ring + disc + holes, one path)', () => {
        const { container } = render(<SunflowerIcon />);
        const el = container.querySelector('svg[data-icon="sunflower"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        // Single flatPath (nature/sunflower.ts, NEW in VISUAL-TESTS-9): the
        // TWELVE-ray petal ring is GENERATED in code — wedge triangles
        // joined in a loop over the RAYS table (nature/sunflower.ts) — so
        // the literal pin freezes the generated output: a coordinate or
        // number-formatting drift in the generator would fail here. Seed
        // dots are COUNTERCLOCKWISE holes (nonzero fill subtracts the
        // sweep-0 subpaths) and the ground line sits at the end of the
        // joined string.
        expect(el.getAttribute('data-icon')).toBe('sunflower');
        expect(el.innerHTML).toBe(SUNFLOWER_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_SUNFLOWER));
    });
});

// ── FLAGS-PRODUCTION React coverage (uplifted flags set) ──
describe('flags uplift React coverage (FLAGS-PRODUCTION)', () => {
    it('CheckeredFlagIcon renders the uplifted 16-hole evenodd definition on its machine hook', () => {
        const { container } = render(<CheckeredFlagIcon />);
        const el = container.querySelector('svg[data-icon="checkeredFlag"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        // Uplifted shell defaults (16px square on the 24×24 grid, flat pair,
        // decorative a11y) around the pole x3..5 + flag x5..21 y3..11 field
        // with the SIXTEEN 2×2 checker holes cut by the ONE explicit
        // fill-rule="evenodd" attribute — exact full-string pin.
        expect(el.getAttribute('width')).toBe('16');
        expect(el.getAttribute('height')).toBe('16');
        expect(el.getAttribute('viewBox')).toBe('0 0 24 24');
        expect(el.getAttribute('fill')).toBe('currentColor');
        expect(el.getAttribute('stroke')).toBe('none');
        expect(el.getAttribute('aria-hidden')).toBe('true');
        expect(el.getAttribute('focusable')).toBe('false');
        expect(el.innerHTML).toBe(CHECKERED_FLAG_SERIALIZED);
        // …and the module constant normalizes to the same exact string
        expect(el.innerHTML).toBe(serialized(ICON_CHECKERED_FLAG));
    });

    it('SaltireFlagIcon renders the two-element definition (evenodd frame + flatPath saltire) in definition order', () => {
        const { container } = render(<SaltireFlagIcon />);
        const el = container.querySelector('svg[data-icon="saltireFlag"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        // TWO serialized <path> elements in definition order (the
        // SwordIcon multi-element precedent): the evenodd framed field
        // (border ring with the EXPLICIT inner-rect hole) FIRST, then the
        // solid flatPath saltire bands painted over it — the paint-over
        // overlap must UNION across elements, not XOR inside one evenodd.
        const paths = Array.from(el.querySelectorAll('path'));
        expect(paths.length).toBe(2);
        expect(paths[0].getAttribute('d')).toBe('M6 3h14v11H6zM8 5v7h10V5z');
        expect(paths[0].getAttribute('fill-rule')).toBe('evenodd');
        expect(paths[1].getAttribute('d')).toBe('M6 3L20 12 20 14 6 5zM20 5L6 14 6 12 20 3z');
        expect(paths[1].getAttribute('fill-rule')).toBeNull();
        // Full-serial parity: the shell innerHTML equals the module
        // constant through the same jsdom machinery.
        expect(el.innerHTML).toBe(serialized(ICON_SALTIRE_FLAG));
    });

    it('VisualIcon resolves the flags-block tail (ceremonialBanner) through the live registry', () => {
        // ceremonialBanner has NO direct per-icon component import in this
        // file — it resolves ONLY through the builtins.ts map (imported
        // first), so a pass proves the flags/ sub-barrel registration side
        // effects cover the block TAIL (offset 76) for VisualIcon at
        // render time. TWO serialized elements (evenodd body + flatPath
        // finial balls), exact full-serial pin via the module constant.
        const { container } = render(<VisualIcon name="ceremonialBanner" />);
        const el = container.querySelector('svg[data-icon="ceremonialBanner"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        expect(el.innerHTML).toBe(serialized(ICON_CEREMONIAL_BANNER));
        // Cross-layer pin: the registry entry VisualIcon reads produces
        // the exact same string markup as the builtins.ts factory.
        expect(svgIcon('ceremonialBanner')).toBe(svgIcons.ceremonialBanner());
    });
});

describe('React layer ↔ string layer integration (fantasy icon)', () => {
    it('VisualIcon name="sword" renders exactly the serialized string-layer geometry', () => {
        // One name resolves in BOTH layers: the React render-any path pulls
        // the same fantasy/sword.ts definition the string layer (svgSword →
        // svgIcon) renders — agreement is the cross-layer contract.
        const { container } = render(<VisualIcon name="sword" />);
        const el = container.querySelector('svg[data-icon="sword"]') as SVGSVGElement;
        expect(el.innerHTML).toBe(serialized(ICON_SWORD));
        expect(el.innerHTML).toBe(SWORD_SERIALIZED);
    });
});
