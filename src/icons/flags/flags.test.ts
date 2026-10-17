/**
 * flags.test.ts — deterministic per-module tests for the FLAGS icon set
 * (./: one file per icon) after the FLAGS-PRODUCTION uplift, which re-drew
 * the original eight modules (flag/pennant/banner/wavingFlag/checkeredFlag/
 * nordicFlag/swallowtailFlag/bunting — bigger uplifted geometry, holes cut
 * EXPLICITLY with fill-rule="evenodd" instead of load-bearing winding) and
 * appended 16 new silhouettes/heraldry modules (triangularFlag …
 * ceremonialBanner) in flags/index.ts's given key order (cross-ref:
 * ../builtins.ts's svgIcons map appends them in the same order after the
 * original eight).
 *
 * SCOPE (companion to ../icons.test.ts and ../react.test.tsx): this file
 * pins the PER-MODULE contract for every one of the 24 flag files — the
 * public triple (ICON_<NAME> constant + svg<Name> factory + <Name>Icon
 * component, wired in the FLAGS table below):
 *   1. EXACT FULL GEOMETRY — each module's exported ICON_<NAME> constant
 *      equals its hand-derived full markup literal, composed ONLY from the
 *      d attribute transcribed from the module source and the two
 *      documented element templates (flatElement/evenoddElement helpers
 *      below ← ../svg-icon.ts:101 flatPath + the evenodd literal convention
 *      of checkered-flag.ts/nordic-flag.ts/cross-flag.ts/saltire-flag.ts/
 *      victory-flag.ts/striped-flag.ts/diamond-flag.ts/signal-flag.ts/
 *      ceremonial-banner.ts). NOT a circular const-vs-own-output pin.
 *   2. MODULE SELF-CONTAINMENT — each svg<Name> factory renders the
 *      documented svg-icon OUTPUT CONTRACT shell (../svg-icon.ts: xmlns →
 *      viewBox → width="1em" → height="1em" → fill="currentColor", then the
 *      definition content verbatim) around that hand-derived literal —
 *      byte-exact by construction.
 *   3. REGISTRATION + MAP WIRING — importing the module alone registers its
 *      name in the shared registry (svgIcon(name) === svg<Name>()), and
 *      ../builtins.ts's svgIcons map stores the SAME factory object the
 *      module exports (identity toBe). The 24 names sit at map offsets
 *      53..76 — generic 23 (0..22) + fantasy 30 (23..52) before, animals
 *      'cat' at 77 after; map total 207 = 23+30+24+60+19+51 (nature incl.
 *      its sky/weather block, read off builtins.ts).
 *   4. XML VALIDITY + ELEMENT CENSUS — every full render parses as a
 *      standalone SVG document (DOMParser 'image/svg+xml', no
 *      <parsererror>), roots on <svg viewBox="0 0 24 24">, is PATH-ONLY
 *      (1 path per module except saltireFlag and ceremonialBanner — 2), the
 *      exact per-element d attributes appear in definition order, every
 *      path carries the flat pair fill="currentColor" stroke="none",
 *      fill-rule appears ONLY as explicit 'evenodd' on the hole-cutting
 *      element (always element 0 when present; saltireFlag and
 *      ceremonialBanner paint their SECOND element solid via flatPath), and
 *      no gradient/stroke-family machinery exists anywhere.
 *   5. STRING/REACT PARITY — every <Name>Icon renders IconBase's exact
 *      shell defaults (../react.tsx: 16px square, 24×24 grid, currentColor,
 *      stroke none, decorative a11y) and its innerHTML equals BOTH the
 *      hand-derived post-serialization literal (self-closing <path …/> →
 *      <path …></path>, attribute order preserved — the documented jsdom
 *      rule in ../react.test.tsx's header) AND the module constant
 *      serialized through the same jsdom machinery (the ../react.test.tsx
 *      serialized() precedent) — both layers consume identical geometry.
 *
 * EXPECTED VALUES: every assertion is an exact value — full-string toBe on
 * hand-derived literals, exact toEqual arrays for d-attribute lists and
 * order pins, exact counts for evenodd/subpath censuses. Each d was first
 * derived from the hand-read source of its own module (+ its header
 * geometry comment), then confirmed against the focused vitest run; no
 * observed output was blessed without an independent source contract. No
 * range checks, no smoke tests, no blind capture.
 */
import { afterEach, describe, expect, it } from 'vitest';
import React from 'react';
import { cleanup, render } from '@testing-library/react';
// Per-module contract machinery: the svg-icon OUTPUT CONTRACT + registry
// (../svg-icon.ts) and the IconProps shape every <Name>Icon accepts
// (../react.tsx — IconBase shell, dangerouslySetInnerHTML pipeline).
import { svgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import type { IconProps } from '../react';
// The builtins discovery map: the ORDER/offsets pin reads its key list, and
// the map-wiring pin compares its stored factories against the modules'
// own exports. Importing it registers every built-in (side effect) —
// harmless here, the per-module pins below are name-specific.
import { svgIcons } from '../builtins';
// The 24 per-icon modules in flags/index.ts sub-barrel order (the original
// eight first, then the 16 FLAGS-PRODUCTION additions). Each import
// performs that name's registration side effect AND exports the public
// triple: ICON_<NAME> + svg<Name> + <NameIcon>.
import { ICON_FLAG, svgFlag, FlagIcon } from './flag';
import { ICON_PENNANT, svgPennant, PennantIcon } from './pennant';
import { ICON_BANNER, svgBanner, BannerIcon } from './banner';
import { ICON_WAVING_FLAG, svgWavingFlag, WavingFlagIcon } from './waving-flag';
import { ICON_CHECKERED_FLAG, svgCheckeredFlag, CheckeredFlagIcon } from './checkered-flag';
import { ICON_NORDIC_FLAG, svgNordicFlag, NordicFlagIcon } from './nordic-flag';
import { ICON_SWALLOWTAIL_FLAG, svgSwallowtailFlag, SwallowtailFlagIcon } from './swallowtail-flag';
import { ICON_BUNTING, svgBunting, BuntingIcon } from './bunting';
import { ICON_TRIANGULAR_FLAG, svgTriangularFlag, TriangularFlagIcon } from './triangular-flag';
import { ICON_DOUBLE_PENNANT, svgDoublePennant, DoublePennantIcon } from './double-pennant';
import { ICON_FORKED_FLAG, svgForkedFlag, ForkedFlagIcon } from './forked-flag';
import { ICON_ROUNDED_FLAG, svgRoundedFlag, RoundedFlagIcon } from './rounded-flag';
import { ICON_TATTERED_FLAG, svgTatteredFlag, TatteredFlagIcon } from './tattered-flag';
import { ICON_CROSSED_FLAGS, svgCrossedFlags, CrossedFlagsIcon } from './crossed-flags';
import { ICON_FLAG_GARLAND, svgFlagGarland, FlagGarlandIcon } from './flag-garland';
import { ICON_WINDSOCK, svgWindsock, WindsockIcon } from './windsock';
import { ICON_FLAG_ON_HILL, svgFlagOnHill, FlagOnHillIcon } from './flag-on-hill';
import { ICON_VICTORY_FLAG, svgVictoryFlag, VictoryFlagIcon } from './victory-flag';
import { ICON_STRIPED_FLAG, svgStripedFlag, StripedFlagIcon } from './striped-flag';
import { ICON_CROSS_FLAG, svgCrossFlag, CrossFlagIcon } from './cross-flag';
import { ICON_SALTIRE_FLAG, svgSaltireFlag, SaltireFlagIcon } from './saltire-flag';
import { ICON_DIAMOND_FLAG, svgDiamondFlag, DiamondFlagIcon } from './diamond-flag';
import { ICON_SIGNAL_FLAG, svgSignalFlag, SignalFlagIcon } from './signal-flag';
import { ICON_CEREMONIAL_BANNER, svgCeremonialBanner, CeremonialBannerIcon } from './ceremonial-banner';

// The fixed svg-icon OUTPUT CONTRACT shell every factory prepends to the
// definition content (../svg-icon.ts parts array, verbatim attribute order;
// default size '1em' + default fill 'currentColor', no class/attributes).
const SHELL_OPEN =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">';
const SHELL_CLOSE = '</svg>';

// ── element templates (the only two forms used in the whole set) ────────────
// flatElement — the ../svg-icon.ts:101 flatPath template verbatim: the solid
// per-element presentation pair, no fill-rule (winding is never
// load-bearing anywhere in the set: solid silhouettes union via nonzero,
// holes are cut by the EXPLICIT evenodd template below).
const flatElement = (d: string): string => `<path d="${d}" fill="currentColor" stroke="none"/>`;
// evenoddElement — the hole-carrying literal template (source attribute
// order d, fill, stroke, fill-rule — checkered-flag.ts:29 convention,
// ../svg-icon.ts flatPath cannot carry fill-rule): the explicit
// fill-rule="evenodd" makes every hole winding-independent.
const evenoddElement = (d: string): string =>
    `<path d="${d}" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;

// Post-serialization form of a definition: jsdom normalizes every
// self-closing <path …/> to <path …></path> and preserves attribute order
// and d spacing verbatim (the documented rule in ../react.test.tsx's
// header, probe-verified there via the Temp/visual/probe*.ts workflow) — so
// the exact React innerHTML pin is the hand-derived markup with that ONE
// mechanical normalization applied.
const reactHtml = (markup: string): string => markup.replace(/\/>/g, '></path>');

// Offscreen DOM probe (../react.test.tsx `serialized()` precedent): reads a
// definition string back through the SAME jsdom innerHTML machinery the
// components render through, so the React parity pin compares the module
// constant against the documented post-serialization form.
const probe = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const serialized = (markup: string): string => {
    probe.innerHTML = markup;
    return probe.innerHTML;
};

/**
 * The per-module contract table — the public triple + hand-derived
 * geometry per flag, in flags/index.ts sub-barrel order (original eight
 * first, then the 16 FLAGS-PRODUCTION additions — the same order
 * ../builtins.ts appends at map offsets 53..76).
 *
 * markup  = exact full definition literal, composed from ds via the two
 *           element templates (NEVER from the module's own output);
 * ds      = exact per-element d attributes, definition order;
 * evenodd = exact count of fill-rule="evenodd" attributes;
 * subpaths= exact total subpath count across all elements (each 'M').
 */
type FlagContract = {
    name: string;
    icon: string;
    svg: SvgIconFactory;
    component: React.ComponentType<IconProps>;
    markup: string;
    ds: string[];
    evenodd: number;
    subpaths: number;
};

const FLAGS: FlagContract[] = [
    {
        // flag.ts: full-height pole rect x4..6 y1..23 + attached flag rect
        // x6..21 y3..14 (uplift from the old x6..19 y3..10 field) — two
        // rect subpaths in ONE flat path, no holes.
        name: 'flag',
        icon: ICON_FLAG,
        svg: svgFlag,
        component: FlagIcon,
        markup: flatElement('M4 1h2v22H4zM6 3h15v11H6z'),
        ds: ['M4 1h2v22H4zM6 3h15v11H6z'],
        evenodd: 0,
        subpaths: 2,
    },
    {
        // pennant.ts: pole rect x4..6 y1..23 + symmetric tapering triangle
        // from the pole top (6,2) to the fly tip (22,7) — the tip sits on
        // the flag's vertical midline y7 (vs triangularFlag's right-angle
        // hoist).
        name: 'pennant',
        icon: ICON_PENNANT,
        svg: svgPennant,
        component: PennantIcon,
        markup: flatElement('M4 1h2v22H4zM6 2l16 5-16 5z'),
        ds: ['M4 1h2v22H4zM6 2l16 5-16 5z'],
        evenodd: 0,
        subpaths: 2,
    },
    {
        // banner.ts: hanging banner — rail rect x3..21 y1..3 + body x4..20
        // y4..20 whose closing edges cut a V notch with its apex UP at
        // (12,15) (vertical-hanging sibling: ceremonial-banner.ts).
        name: 'banner',
        icon: ICON_BANNER,
        svg: svgBanner,
        component: BannerIcon,
        markup: flatElement('M3 1h18v2H3zM4 4h16v16l-8-5-8 5z'),
        ds: ['M3 1h18v2H3zM4 4h16v16l-8-5-8 5z'],
        evenodd: 0,
        subpaths: 2,
    },
    {
        // waving-flag.ts: pole rect x4..6 y1..23 + constant-thickness
        // S-wave ribbon x6..21 — the ONLY cubic-curved fly edge in the set
        // (top edge crests UP to y≈1.9 by x13.5 then dips DOWN; right edge
        // v8 drops 8 units so the bottom edge rides exactly 8 below).
        name: 'wavingFlag',
        icon: ICON_WAVING_FLAG,
        svg: svgWavingFlag,
        component: WavingFlagIcon,
        markup: flatElement(
            'M4 1h2v22H4zM6 3c2.5-1.5 5-1.5 7.5 0s5 1.5 7.5 0v8c-2.5 1.5-5 1.5-7.5 0s-5-1.5-7.5 0z'
        ),
        ds: ['M4 1h2v22H4zM6 3c2.5-1.5 5-1.5 7.5 0s5 1.5 7.5 0v8c-2.5 1.5-5 1.5-7.5 0s-5-1.5-7.5 0z'],
        evenodd: 0,
        subpaths: 2,
    },
    {
        // checkered-flag.ts (uplift): pole rect x3..5 y1..23 + flag rect
        // x5..21 y3..11 + SIXTEEN 2×2 checker holes (4+4+4+4 per row, every
        // (col+row)-odd cell of the 8×4 grid at x5+2c / y3+2r) cut by the
        // ONE explicit evenodd attribute (dedicated census test below).
        name: 'checkeredFlag',
        icon: ICON_CHECKERED_FLAG,
        svg: svgCheckeredFlag,
        component: CheckeredFlagIcon,
        markup: evenoddElement(
            'M3 1h2v22H3z' +
                'M5 3h16v8H5z' +
                'M7 3v2h2V3zM11 3v2h2V3zM15 3v2h2V3zM19 3v2h2V3z' +
                'M5 5v2h2V5zM9 5v2h2V5zM13 5v2h2V5zM17 5v2h2V5z' +
                'M7 7v2h2V7zM11 7v2h2V7zM15 7v2h2V7zM19 7v2h2V7z' +
                'M5 9v2h2V9zM9 9v2h2V9zM13 9v2h2V9zM17 9v2h2V9z'
        ),
        ds: [
            'M3 1h2v22H3zM5 3h16v8H5zM7 3v2h2V3zM11 3v2h2V3zM15 3v2h2V3zM19 3v2h2V3zM5 5v2h2V5zM9 5v2h2V5zM13 5v2h2V5zM17 5v2h2V5zM7 7v2h2V7zM11 7v2h2V7zM15 7v2h2V7zM19 7v2h2V7zM5 9v2h2V9zM9 9v2h2V9zM13 9v2h2V9zM17 9v2h2V9z',
        ],
        evenodd: 1,
        subpaths: 18,
    },
    {
        // nordic-flag.ts (uplift): flag rect x3..21 y4..20 with the
        // LEFT-offset cross hole cut by explicit evenodd — vertical band
        // x9..11.5 full height, horizontal band y10.75..13.25 full width
        // (arms meet at (10.25,12); centered sibling: cross-flag.ts).
        name: 'nordicFlag',
        icon: ICON_NORDIC_FLAG,
        svg: svgNordicFlag,
        component: NordicFlagIcon,
        markup: evenoddElement(
            'M3 4h18v16H3zM9 10.75H3v2.5h6v6.75h2.5v-6.75h9.5v-2.5h-9.5V4h-2.5z'
        ),
        ds: ['M3 4h18v16H3zM9 10.75H3v2.5h6v6.75h2.5v-6.75h9.5v-2.5h-9.5V4h-2.5z'],
        evenodd: 1,
        subpaths: 2,
    },
    {
        // swallowtail-flag.ts (uplift): pole rect x4..6 y1..23 + flag
        // x6..21 y3..13 whose fly dips into a triangular notch — apex
        // (17,8), 4 deep (vs forkedFlag's protruding tails and
        // tatteredFlag's irregular zigzag).
        name: 'swallowtailFlag',
        icon: ICON_SWALLOWTAIL_FLAG,
        svg: svgSwallowtailFlag,
        component: SwallowtailFlagIcon,
        markup: flatElement('M4 1h2v22H4zM6 3h15l-4 5 4 5H6z'),
        ds: ['M4 1h2v22H4zM6 3h15l-4 5 4 5H6z'],
        evenodd: 0,
        subpaths: 2,
    },
    {
        // bunting.ts (uplift): rope rect x2..22 y5..6.5 + THREE triangular
        // pendants hung from it — 4.5-wide bases at x4/9.75/15.5 (1.25
        // gaps, 2 margins), 7-deep apices centered under each base at
        // (6.25/12/17.75, 13.5). Rect-flag sibling: flag-garland.ts.
        name: 'bunting',
        icon: ICON_BUNTING,
        svg: svgBunting,
        component: BuntingIcon,
        markup: flatElement(
            'M2 5h20v1.5H2zM4 6.5h4.5l-2.25 7zM9.75 6.5h4.5L12 13.5zM15.5 6.5h4.5l-2.25 7z'
        ),
        ds: ['M2 5h20v1.5H2zM4 6.5h4.5l-2.25 7zM9.75 6.5h4.5L12 13.5zM15.5 6.5h4.5l-2.25 7z'],
        evenodd: 0,
        subpaths: 4,
    },
    {
        // triangular-flag.ts: pole rect x4..6 y1..23 + RIGHT-ANGLE triangle
        // M6 3h15L6 13z — horizontal top edge to (21,3), hypotenuse back
        // down to (6,13) (vs pennant.ts's symmetric taper to a midline tip).
        name: 'triangularFlag',
        icon: ICON_TRIANGULAR_FLAG,
        svg: svgTriangularFlag,
        component: TriangularFlagIcon,
        markup: flatElement('M4 1h2v22H4zM6 3h15L6 13z'),
        ds: ['M4 1h2v22H4zM6 3h15L6 13z'],
        evenodd: 0,
        subpaths: 2,
    },
    {
        // double-pennant.ts: pole rect x4..6 y1..23 + TWO identical
        // tapering triangles — top tip (20,5.5), bottom tip (20,14.5) —
        // separated by a 2-unit gap (y9..11) so the pair stays distinct.
        name: 'doublePennant',
        icon: ICON_DOUBLE_PENNANT,
        svg: svgDoublePennant,
        component: DoublePennantIcon,
        markup: flatElement('M4 1h2v22H4zM6 2l14 3.5L6 9zM6 11l14 3.5L6 18z'),
        ds: ['M4 1h2v22H4zM6 2l14 3.5L6 9zM6 11l14 3.5L6 18z'],
        evenodd: 0,
        subpaths: 3,
    },
    {
        // forked-flag.ts: pole rect x4..6 y1..23 + flag body x6..16 y3..13
        // whose fly FORKS — two 5-out tails at (21,6)/(21,11) with a
        // 5-deep notch apex (16,8) between (vs swallowtailFlag's notch cut
        // INTO a rectangular fly).
        name: 'forkedFlag',
        icon: ICON_FORKED_FLAG,
        svg: svgForkedFlag,
        component: ForkedFlagIcon,
        markup: flatElement('M4 1h2v22H4zM6 3h10l5 3-5 2 5 3-5 2H6z'),
        ds: ['M4 1h2v22H4zM6 3h10l5 3-5 2 5 3-5 2H6z'],
        evenodd: 0,
        subpaths: 2,
    },
    {
        // rounded-flag.ts: pole rect x4..6 y1..23 + flag x6..20 y3..13 with
        // a capsule fly — h10.5 to (16.5,3), sweep-1 rx/ry-3.5 quarter arc
        // to (20,6.5), v3 straight fly edge, second sweep-1 arc back to
        // (16.5,13) — the only curved-corner flag in the set.
        name: 'roundedFlag',
        icon: ICON_ROUNDED_FLAG,
        svg: svgRoundedFlag,
        component: RoundedFlagIcon,
        markup: flatElement(
            'M4 1h2v22H4zM6 3h10.5a3.5 3.5 0 0 1 3.5 3.5v3a3.5 3.5 0 0 1-3.5 3.5H6z'
        ),
        ds: ['M4 1h2v22H4zM6 3h10.5a3.5 3.5 0 0 1 3.5 3.5v3a3.5 3.5 0 0 1-3.5 3.5H6z'],
        evenodd: 0,
        subpaths: 2,
    },
    {
        // tattered-flag.ts: pole rect x4..6 y1..23 + flag x6..21 y3..13
        // whose fly zigzags with IRREGULAR depths — l-4 3 / l3 2 / l-4 3 /
        // l3 2 (tooth pattern 3/2/3/2) reads as ripped fabric.
        name: 'tatteredFlag',
        icon: ICON_TATTERED_FLAG,
        svg: svgTatteredFlag,
        component: TatteredFlagIcon,
        markup: flatElement('M4 1h2v22H4zM6 3h15l-4 3 3 2-4 3 3 2H6z'),
        ds: ['M4 1h2v22H4zM6 3h15l-4 3 3 2-4 3 3 2H6z'],
        evenodd: 0,
        subpaths: 2,
    },
    {
        // crossed-flags.ts: TWO crossed pole quads along the
        // (6,21)→(18,3) / (18,21)→(6,3) centerlines + TWO pennant quads
        // riding the poles' upper arms — all four wound POSITIVE so the
        // overlap paints solid under nonzero (flatElement carries no
        // fill-rule; a same-path evenodd would XOR the crossing
        // transparent).
        name: 'crossedFlags',
        icon: ICON_CROSSED_FLAGS,
        svg: svgCrossedFlags,
        component: CrossedFlagsIcon,
        markup: flatElement(
            'M5.3 20.5L17.3 2.5 18.7 3.5 6.7 21.5z' +
                'M17.3 21.5L5.3 3.5 6.7 2.5 18.7 20.5z' +
                'M16.5 5.2L18 2.95 22.17 5.73 20.67 7.98z' +
                'M3.33 7.98L1.83 5.73 6 2.95 7.5 5.2z'
        ),
        ds: [
            'M5.3 20.5L17.3 2.5 18.7 3.5 6.7 21.5zM17.3 21.5L5.3 3.5 6.7 2.5 18.7 20.5zM16.5 5.2L18 2.95 22.17 5.73 20.67 7.98zM3.33 7.98L1.83 5.73 6 2.95 7.5 5.2z',
        ],
        evenodd: 0,
        subpaths: 4,
    },
    {
        // flag-garland.ts: 1.5-thick sagging rope swag (top edge sags to
        // y8 at center, underside 9.5) + THREE 3×6 rect flags sunk 0.5
        // into the rope's lower edge (outer pair top y7.8, center y9).
        // Triangular-pendant sibling: bunting.ts.
        name: 'flagGarland',
        icon: ICON_FLAG_GARLAND,
        svg: svgFlagGarland,
        component: FlagGarlandIcon,
        markup: flatElement(
            'M2 5Q12 11 22 5v1.5Q12 12.5 2 6.5z' +
                'M4.25 7.8h3v6h-3zM10.5 9h3v6h-3zM16.75 7.8h3v6h-3z'
        ),
        ds: [
            'M2 5Q12 11 22 5v1.5Q12 12.5 2 6.5zM4.25 7.8h3v6h-3zM10.5 9h3v6h-3zM16.75 7.8h3v6h-3z',
        ],
        evenodd: 0,
        subpaths: 4,
    },
    {
        // windsock.ts: pole rect x4..6 y1..23 + THREE quad cone segments
        // (the 2-unit gaps are the negative-space stripes — no holes
        // needed) tapering from an 8-tall mouth at x6 to a 2-tall tip at
        // x21, both cone edges sloping 0.2 units per x.
        name: 'windsock',
        icon: ICON_WINDSOCK,
        svg: svgWindsock,
        component: WindsockIcon,
        markup: flatElement(
            'M4 1h2v22H4z' +
                'M6 3l4 .8v6.4L6 11z' +
                'M12 4.2l3 .6v4.4l-3 .6z' +
                'M17 5.2l4 .8v2l-4 .8z'
        ),
        ds: ['M4 1h2v22H4zM6 3l4 .8v6.4L6 11zM12 4.2l3 .6v4.4l-3 .6zM17 5.2l4 .8v2l-4 .8z'],
        evenodd: 0,
        subpaths: 4,
    },
    {
        // flag-on-hill.ts: hill mound M2 21Q12 12 22 21z (apex (12,16.5))
        // + pole rect x11.4..12.6 y4..17.5 (sunk 1 unit past the apex) +
        // flag rect x12.6..21.6 y4..10.5 — all three wound positive so the
        // pole/hill overlap paints solid under nonzero.
        name: 'flagOnHill',
        icon: ICON_FLAG_ON_HILL,
        svg: svgFlagOnHill,
        component: FlagOnHillIcon,
        markup: flatElement(
            'M2 21Q12 12 22 21z' + 'M11.4 4h1.2v13.5h-1.2z' + 'M12.6 4h9v6.5h-9z'
        ),
        ds: ['M2 21Q12 12 22 21zM11.4 4h1.2v13.5h-1.2zM12.6 4h9v6.5h-9z'],
        evenodd: 0,
        subpaths: 3,
    },
    {
        // victory-flag.ts: pole rect x4..6 y1..23 + swallowtail-bottom
        // banner x6..21 y3..15 (V notch apex UP at (13.5,10.5)) with the
        // five-point star hole (outer r2.9 / inner r1.2 centered
        // (13.5,8.2), listed tip-first) cut by explicit evenodd — the star
        // never bleeds into the notch (lower outer tips stay above the
        // notch boundary y ≈ 10.5+|x−13.5|·0.6).
        name: 'victoryFlag',
        icon: ICON_VICTORY_FLAG,
        svg: svgVictoryFlag,
        component: VictoryFlagIcon,
        markup: evenoddElement(
            'M4 1h2v22H4z' +
                'M6 3h15v12l-7.5-4.5L6 15z' +
                'M13.5 5.3 14.21 7.23 16.26 7.3 14.64 8.57 15.2 10.55 13.5 9.4 11.8 10.55 12.36 8.57 10.74 7.3 12.79 7.23z'
        ),
        ds: [
            'M4 1h2v22H4zM6 3h15v12l-7.5-4.5L6 15zM13.5 5.3 14.21 7.23 16.26 7.3 14.64 8.57 15.2 10.55 13.5 9.4 11.8 10.55 12.36 8.57 10.74 7.3 12.79 7.23z',
        ],
        evenodd: 1,
        subpaths: 3,
    },
    {
        // striped-flag.ts: pole rect x4..6 y1..23 + flag body x6..20 y3..13
        // with TWO full-width stripe holes (2 tall at y5..7 and y9..11) —
        // the holes reach both flag edges, so explicit evenodd (not
        // winding) resolves the body into three 2-tall filled stripes.
        name: 'stripedFlag',
        icon: ICON_STRIPED_FLAG,
        svg: svgStripedFlag,
        component: StripedFlagIcon,
        markup: evenoddElement('M4 1h2v22H4zM6 3h14v10H6zM6 5h14v2H6zM6 9h14v2H6z'),
        ds: ['M4 1h2v22H4zM6 3h14v10H6zM6 5h14v2H6zM6 9h14v2H6z'],
        evenodd: 1,
        subpaths: 4,
    },
    {
        // cross-flag.ts: pole rect x4..6 y1..23 + flag body x6..20 y3..13
        // with a CENTERED cross hole — vertical band x11.75..14.25,
        // horizontal band y6.75..9.25 (both 2.5 wide, spanning the full
        // flag so the body resolves into four corner blocks; centered on
        // the flag midlines (13,8); offset sibling: nordic-flag.ts).
        name: 'crossFlag',
        icon: ICON_CROSS_FLAG,
        svg: svgCrossFlag,
        component: CrossFlagIcon,
        markup: evenoddElement(
            'M4 1h2v22H4zM6 3h14v10H6zM11.75 3h2.5v3.75H20v2.5h-5.75V13h-2.5V9.25H6V6.75h5.75z'
        ),
        ds: [
            'M4 1h2v22H4zM6 3h14v10H6zM11.75 3h2.5v3.75H20v2.5h-5.75V13h-2.5V9.25H6V6.75h5.75z',
        ],
        evenodd: 1,
        subpaths: 3,
    },
    {
        // saltire-flag.ts: TWO elements — (1) evenodd framed field: outer
        // rect x6..20 y3..14 with the inner rect x8..18 y5..12 as an
        // EXPLICIT hole → a 2-thick border ring, interior transparent;
        // (2) flatPath saltire bands painted OVER the frame (two
        // positive-wound diagonal quads, 2-thick vertical ends at the flag
        // edges, meeting solid at (13,8.5) — separate elements so the
        // center overlap UNIONS instead of XORing transparent; the
        // fantasy/crown.ts paint-over precedent).
        name: 'saltireFlag',
        icon: ICON_SALTIRE_FLAG,
        svg: svgSaltireFlag,
        component: SaltireFlagIcon,
        markup:
            evenoddElement('M6 3h14v11H6zM8 5v7h10V5z') +
            flatElement('M6 3L20 12 20 14 6 5zM20 5L6 14 6 12 20 3z'),
        ds: ['M6 3h14v11H6zM8 5v7h10V5z', 'M6 3L20 12 20 14 6 5zM20 5L6 14 6 12 20 3z'],
        evenodd: 1,
        subpaths: 4,
    },
    {
        // diamond-flag.ts: pole rect x4..6 y1..23 + flag body x6..20 y3..13
        // with a diamond hole cut by explicit evenodd, centered on the
        // flag midlines (13,8) — points (13,5)/(10,8)/(13,11)/(16,8), a
        // 6×6 rhombus (same evenodd convention as cross-flag.ts).
        name: 'diamondFlag',
        icon: ICON_DIAMOND_FLAG,
        svg: svgDiamondFlag,
        component: DiamondFlagIcon,
        markup: evenoddElement('M4 1h2v22H4zM6 3h14v10H6zM13 5l-3 3 3 3 3-3z'),
        ds: ['M4 1h2v22H4zM6 3h14v10H6zM13 5l-3 3 3 3 3-3z'],
        evenodd: 1,
        subpaths: 3,
    },
    {
        // signal-flag.ts: pole rect x4..6 y1..23 + flag body x6..18 y3..13
        // whose fly rises to a single point (21,8) + centered roundel hole
        // (r2.4 at (12,8), an a2.4 arc pair) cut by explicit evenodd.
        name: 'signalFlag',
        icon: ICON_SIGNAL_FLAG,
        svg: svgSignalFlag,
        component: SignalFlagIcon,
        markup: evenoddElement(
            'M4 1h2v22H4z' +
                'M6 3h12l3 5-3 5H6z' +
                'M14.4 8a2.4 2.4 0 1 1-4.8 0a2.4 2.4 0 1 1 4.8 0z'
        ),
        ds: ['M4 1h2v22H4zM6 3h12l3 5-3 5H6zM14.4 8a2.4 2.4 0 1 1-4.8 0a2.4 2.4 0 1 1 4.8 0z'],
        evenodd: 1,
        subpaths: 3,
    },
    {
        // ceremonial-banner.ts: TWO elements — (1) evenodd BODY path:
        // crossbar rect x4..20 y2..3.5 + banner cloth x6..18 y3.5..14.5
        // coming to a downward point (apex (12,18.5)) + diamond emblem
        // hole centered (12,9.5) — points (12,7)/(14.5,9.5)/(12,12)/
        // (9.5,9.5); (2) flatPath FINIALS paint-over: two r-1.2 balls at
        // (3.5,2.75)/(20.5,2.75) riding the crossbar ends (they overlap
        // the crossbar tips, so a same-path evenodd would XOR them
        // transparent; horizontal-banner sibling: banner.ts).
        name: 'ceremonialBanner',
        icon: ICON_CEREMONIAL_BANNER,
        svg: svgCeremonialBanner,
        component: CeremonialBannerIcon,
        markup:
            evenoddElement('M4 2h16v1.5H4zM6 3.5h12v11l-6 4-6-4zM12 7l2.5 2.5L12 12l-2.5-2.5z') +
            flatElement(
                'M2.3 2.75a1.2 1.2 0 1 1 2.4 0a1.2 1.2 0 1 1-2.4 0zM19.3 2.75a1.2 1.2 0 1 1 2.4 0a1.2 1.2 0 1 1-2.4 0z'
            ),
        ds: [
            'M4 2h16v1.5H4zM6 3.5h12v11l-6 4-6-4zM12 7l2.5 2.5L12 12l-2.5-2.5z',
            'M2.3 2.75a1.2 1.2 0 1 1 2.4 0a1.2 1.2 0 1 1-2.4 0zM19.3 2.75a1.2 1.2 0 1 1 2.4 0a1.2 1.2 0 1 1-2.4 0z',
        ],
        evenodd: 1,
        subpaths: 5,
    },
];

describe('flags per-module contract (FLAGS-PRODUCTION uplift)', () => {
    it('places the 24 flag names at builtins offsets 53..76, wired to the same factory objects', () => {
        // MAP POSITION (../builtins.ts ORDER contract): generic 23
        // (offsets 0..22) + fantasy 30 (23..52) put the flags block at
        // 53..76 — 'skull' is the fantasy tail immediately before 'flag',
        // animals 'cat' is the next category immediately after
        // 'ceremonialBanner'. Map total 207 = 23 + 30 + 24 + 60 + 19 + 51
        // (nature incl. its landscape + sky/weather blocks, read off
        // builtins.ts).
        expect(Object.keys(svgIcons).length).toBe(207);
        expect(Object.keys(svgIcons).slice(52, 78)).toEqual([
            'skull',
            // ── the original eight flags ────────────────────────────────
            'flag',
            'pennant',
            'banner',
            'wavingFlag',
            'checkeredFlag',
            'nordicFlag',
            'swallowtailFlag',
            'bunting',
            // ── the 16 FLAGS-PRODUCTION additions (flags/index.ts order) ─
            'triangularFlag',
            'doublePennant',
            'forkedFlag',
            'roundedFlag',
            'tatteredFlag',
            'crossedFlags',
            'flagGarland',
            'windsock',
            'flagOnHill',
            'victoryFlag',
            'stripedFlag',
            'crossFlag',
            'saltireFlag',
            'diamondFlag',
            'signalFlag',
            'ceremonialBanner',
            // ── next category (animals head) ─────────────────────────────
            'cat',
        ]);
        // MAP WIRING: svgIcons stores the SAME factory object each module
        // exports (identity, not a re-creation) — the string layer, the
        // ui/gallery and VisualIcon all resolve through one factory per
        // name.
        for (const flag of FLAGS) {
            expect(svgIcons[flag.name]).toBe(flag.svg);
        }
    });

    it('renders every module factory as the documented shell around the hand-derived geometry, byte-exact', () => {
        for (const flag of FLAGS) {
            // MODULE SELF-CONTAINMENT + OUTPUT CONTRACT (../svg-icon.ts):
            // xmlns → viewBox → width="1em" → height="1em" →
            // fill="currentColor", then the definition content verbatim —
            // composed here from the HAND-DERIVED markup literal, not from
            // the module constant, so the pin is not circular.
            expect(flag.svg()).toBe(SHELL_OPEN + flag.markup + SHELL_CLOSE);
            // REGISTRATION: importing the module alone registered its
            // name — the live registry resolves to the identical string.
            expect(svgIcon(flag.name)).toBe(flag.svg());
            // FLAT-DESIGN PURITY of the full render: solid currentColor
            // fills, stroke disabled, NO gradient or stroke-family drawing
            // anywhere (the byte-exact pin above already implies this —
            // asserted explicitly per the flat contract).
            const render = flag.svg();
            expect(render).not.toContain('<linearGradient');
            expect(render).not.toContain('<radialGradient');
            expect(render).not.toContain(' stroke="currentColor"');
        }
    });

    it('carries the exact FLAGS-PRODUCTION markup on every module constant', () => {
        for (const flag of FLAGS) {
            // EXACT FULL GEOMETRY: the module constant equals the
            // hand-derived markup literal (ds + the two documented element
            // templates) — derived from the module sources, never from the
            // module's own output.
            expect(flag.icon).toBe(flag.markup);
            // EVENODD CENSUS (the winding-bug guard): every hole is cut by
            // an EXPLICIT fill-rule="evenodd" attribute (never
            // load-bearing winding); solid-silhouette modules carry NO
            // fill-rule at all (the null match is the exact absence
            // assertion). 15 modules 0, 9 modules exactly 1
            // (checkeredFlag/nordicFlag/victoryFlag/stripedFlag/crossFlag/
            // saltireFlag/diamondFlag/signalFlag/ceremonialBanner).
            expect(flag.icon.match(/fill-rule="evenodd"/g)).toEqual(
                flag.evenodd === 0
                    ? null
                    : new Array(flag.evenodd).fill('fill-rule="evenodd"')
            );
            // SUBPATH CENSUS: every d opens exactly one subpath with 'M'
            // (no lowercase m anywhere in the set) — pole/body/hole counts
            // are exact per module (e.g. checkeredFlag 2 bodies + 16 holes
            // = 18; ceremonialBanner 3 body/hole + 2 finials = 5).
            expect(
                flag.ds.reduce(
                    (count, d) => count + (d.match(/M/g) as RegExpMatchArray).length,
                    0
                )
            ).toBe(flag.subpaths);
        }
    });

    it('cuts the checkered flag exactly 16 holes deep through the explicit evenodd attribute', () => {
        // FLAGS-PRODUCTION uplift: the field grew to x5..21 y3..11 with an
        // 8×4 checker grid — SIXTEEN hole subpaths (4+4+4+4 per row, every
        // (col+row)-odd cell), each `M<x> <rowY>v2h2V<rowY>z`. The census
        // counts EXACTLY 16; the full d (bodies + holes) is pinned
        // byte-exact in the geometry tests above.
        const checkered = FLAGS.find((flag) => flag.name === 'checkeredFlag') as FlagContract;
        expect(checkered.icon.match(/v2h2V/g)).toEqual(new Array(16).fill('v2h2V'));
        // …all cut by the ONE explicit evenodd attribute (winding is never
        // load-bearing — same convention as nordicFlag/crossFlag/
        // diamondFlag/signalFlag).
        expect(checkered.icon.match(/fill-rule="evenodd"/g)).toEqual(['fill-rule="evenodd"']);
    });

    it('parses every full render as a standalone SVG document with the exact element census and d list', () => {
        for (const flag of FLAGS) {
            // XML VALIDITY: 'image/svg+xml' parse of the factory's real
            // output — a <parsererror> report element means malformed
            // markup (never expected: every definition is well-formed).
            const doc = new DOMParser().parseFromString(flag.svg(), 'image/svg+xml');
            expect(doc.querySelector('parsererror')).toBeNull();
            // Standalone-SVG root on the shared 24×24 grid.
            expect(doc.documentElement.tagName).toBe('svg');
            expect(doc.documentElement.getAttribute('viewBox')).toBe('0 0 24 24');
            // PATH-ONLY CENSUS: every flags module is one <path> — except
            // saltireFlag and ceremonialBanner, whose paint-over second
            // element makes two. NO non-path elements anywhere in the set
            // (every "circle"/"rect" silhouette is a subpath inside a d).
            expect(doc.getElementsByTagName('path').length).toBe(flag.ds.length);
            expect(doc.getElementsByTagName('g').length).toBe(0);
            expect(doc.getElementsByTagName('circle').length).toBe(0);
            expect(doc.getElementsByTagName('rect').length).toBe(0);
            // EXACT ELEMENT LIST: the d attribute of every path, in
            // definition order, byte-equal to the hand-derived ds.
            expect(
                Array.from(doc.getElementsByTagName('path')).map((path) => path.getAttribute('d'))
            ).toEqual(flag.ds);
            // FLAT-DESIGN PRESENTATION on every path: solid currentColor
            // fill, stroke disabled; fill-rule rides ONLY the hole-cutting
            // element — always element 0 when present (saltireFlag and
            // ceremonialBanner paint their SECOND element solid via
            // flatElement) — and then exactly 'evenodd'.
            Array.from(doc.getElementsByTagName('path')).forEach((path, index) => {
                expect(path.getAttribute('fill')).toBe('currentColor');
                expect(path.getAttribute('stroke')).toBe('none');
                expect(path.getAttribute('fill-rule')).toBe(
                    flag.evenodd > 0 && index === 0 ? 'evenodd' : null
                );
            });
        }
    });
});

describe('string/React parity — every <Name>Icon through the exact IconBase shell', () => {
    afterEach(cleanup);

    it('renders the shared flat shell defaults carrying the module definition exactly', () => {
        for (const flag of FLAGS) {
            const { container } = render(React.createElement(flag.component));
            const el = container.querySelector(
                `svg[data-icon="${flag.name}"]`
            ) as SVGSVGElement;
            expect(el).not.toBeNull();
            // IconBase shell defaults (../react.tsx): 16px square on the
            // 24×24 grid, flat currentColor/stroke-none pair,
            // decorative-by-default a11y, data-icon machine name.
            expect(el.getAttribute('width')).toBe('16');
            expect(el.getAttribute('height')).toBe('16');
            expect(el.getAttribute('viewBox')).toBe('0 0 24 24');
            expect(el.getAttribute('fill')).toBe('currentColor');
            expect(el.getAttribute('stroke')).toBe('none');
            expect(el.getAttribute('aria-hidden')).toBe('true');
            expect(el.getAttribute('focusable')).toBe('false');
            // STRING/REACT PARITY (exact): the component's innerHTML equals
            // the hand-derived post-serialization literal — the markup
            // literal with every self-closing <path …/> normalized to
            // <path …></path> (the documented jsdom rule, ../react.test.tsx
            // header) — AND the module's ICON_<NAME> constant serialized
            // through the same jsdom machinery (the ../react.test.tsx
            // serialized() precedent). Both layers consume identical
            // geometry bytes, including the multi-element saltireFlag and
            // ceremonialBanner orderings.
            expect(el.innerHTML).toBe(reactHtml(flag.markup));
            expect(el.innerHTML).toBe(serialized(flag.icon));
        }
    });
});
