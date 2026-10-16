/**
 * fruits.test.ts — deterministic per-module tests for the FRUITS icon set
 * (./: one file per icon) after the VISUAL-TESTS-12 silhouette rework,
 * which re-laid ALL 19 modules as recognizable single-color silhouettes.
 *
 * SCOPE (companion to ../icons.test.ts): ../icons.test.ts pins the GLOBAL
 * registry view — the 108-name key list, six exact fruit full-string
 * literals (apple/watermelon/strawberry/kiwi/coconut/blueberry) and the
 * exhaustive per-name fragment wiring. THIS file pins the PER-MODULE
 * contract for every one of the 19 fruit files:
 *   1. MODULE SELF-CONTAINMENT — each svg<Name> factory renders the
 *      documented svg-icon OUTPUT CONTRACT shell (svg-icon.ts: xmlns →
 *      viewBox → width="1em" → height="1em" → fill="currentColor", then
 *      the definition content verbatim) around THAT module's exported
 *      ICON_<NAME> constant, byte-exact by construction (the
 *      ICON_LIGHTNING composition precedent in ../icons.test.ts's
 *      round-trip test).
 *   2. REGISTRATION — importing the module alone registers its name in
 *      the shared registry: svgIcon(name) === svg<Name>().
 *   3. XML VALIDITY — every full render parses as a standalone SVG
 *      document (DOMParser 'image/svg+xml', no <parsererror> report),
 *      roots on <svg viewBox="0 0 24 24">, every <path> carries the
 *      flat-design fill/stroke pair, and the element census is exact per
 *      module (grape is the ONLY module with literal non-path elements —
 *      one <g> wrapping six attribute-free berry <circle> children).
 *   4. VISUAL-TESTS-12 SILHOUETTE CONTRACT — exact hand-derived geometry
 *      fragments per module: the recognizable bodies (banana thick
 *      crescent, strawberry tapered heart, coconut cut half, kiwi oval
 *      skin, watermelon separated rind, avocado outlined skin, …), the
 *      explicit fill-rule="evenodd" hole subpaths (cherry shines and
 *      blueberry calyx stars live INSIDE their berry paths; watermelon
 *      teardrop seeds, pineapple diamond scales, pomegranate Q-teardrop
 *      arils, melon ribs, plum/orange/lemon/pear/mango/peach/apple
 *      highlights, strawberry rect+slant seeds are cut by evenodd rather
 *      than by load-bearing winding), and the per-module evenodd census
 *      (18 modules exactly one, kiwi two, grape zero).
 *   5. STRING/REACT PARITY — every <Name>Icon renders IconBase's exact
 *      shell defaults (react.tsx: 16px square, 24×24 grid, currentColor,
      decorative a11y) and its innerHTML equals the definition constant
 *      serialized through the same jsdom machinery — the ../react.test.tsx
 *      `serialized()` precedent — so both layers consume the identical
 *      geometry bytes.
 *
 * BLUEBERRY RE-CUT NOTE: blueberry.ts's bottom berry was re-cut
 * r 4.5 → 3.9 (center unchanged (11.2,18)) so the three berry circles sit
 * STRICTLY disjoint inside the single evenodd path — the old r 4.5
 * overlapped the r 4.8 right berry (center distance 8.77268 < 9.3) and
 * evenodd XOR'd the shared lens transparent. Only the blueberry entries
 * changed: its second signature fragment and the NEW dedicated
 * disjointness regression below.
 *
 * EXPECTED VALUES: every assertion is an exact value — full-string toBe
 * compositions (byte-exact by construction from the documented OUTPUT
 * CONTRACT in ../svg-icon.ts), exact fragment toContain pins transcribed
 * from the per-icon source files and cross-verified against the runtime
 * probes Temp/visual/probe-fruits-vt12.ts (full strings as JSON) and
 * Temp/visual/probe-fruits-vt12-elements.ts (per-element SEG lines, run
 * with `npx vite-node Temp/visual/<probe>.ts` from the workspace root) —
 * every fragment below was first derived from the hand-read source of its
 * own module, THEN confirmed byte-for-byte against the probe output; no
 * observed output was blessed without an independent source contract.
 * Census numbers and fragments are hand-authored from the sources; the
 * probes only confirm them. No range checks, no smoke tests.
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
// The 19 per-icon modules in fruits/index.ts sub-barrel order (original
// ten first, then the 2026 additions) — the same order ../icons.test.ts
// pins as the registry key order. Each import performs that name's
// registration side effect AND exports ICON_<NAME> + svg<Name> + <Name>Icon.
import { ICON_APPLE, svgApple, AppleIcon } from './apple';
import { ICON_BANANA, svgBanana, BananaIcon } from './banana';
import { ICON_CHERRY, svgCherry, CherryIcon } from './cherry';
import { ICON_GRAPE, svgGrape, GrapeIcon } from './grape';
import { ICON_ORANGE, svgOrange, OrangeIcon } from './orange';
import { ICON_LEMON, svgLemon, LemonIcon } from './lemon';
import { ICON_WATERMELON, svgWatermelon, WatermelonIcon } from './watermelon';
import { ICON_PEAR, svgPear, PearIcon } from './pear';
import { ICON_STRAWBERRY, svgStrawberry, StrawberryIcon } from './strawberry';
import { ICON_PEACH, svgPeach, PeachIcon } from './peach';
import { ICON_PINEAPPLE, svgPineapple, PineappleIcon } from './pineapple';
import { ICON_KIWI, svgKiwi, KiwiIcon } from './kiwi';
import { ICON_MANGO, svgMango, MangoIcon } from './mango';
import { ICON_AVOCADO, svgAvocado, AvocadoIcon } from './avocado';
import { ICON_BLUEBERRY, svgBlueberry, BlueberryIcon } from './blueberry';
import { ICON_COCONUT, svgCoconut, CoconutIcon } from './coconut';
import { ICON_POMEGRANATE, svgPomegranate, PomegranateIcon } from './pomegranate';
import { ICON_PLUM, svgPlum, PlumIcon } from './plum';
import { ICON_MELON, svgMelon, MelonIcon } from './melon';

// The fixed svg-icon OUTPUT CONTRACT shell every factory prepends to the
// definition content (svg-icon.ts parts array, verbatim attribute order).
const SHELL_OPEN =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">';
const SHELL_CLOSE = '</svg>';

// Offscreen DOM probe (../react.test.tsx `serialized()` precedent): reads a
// definition string back through the SAME jsdom innerHTML machinery the
// components render through, so the React parity pin compares against the
// documented post-serialization form (`<path …/>` → `<path …></path>`,
// attribute order preserved) instead of a hand-duplicated literal.
const probe = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const serialized = (markup: string): string => {
    probe.innerHTML = markup;
    return probe.innerHTML;
};

/**
 * The per-module contract table. Census numbers and signature fragments
 * are hand-authored from each module's source (apple.ts … melon.ts) and
 * cross-verified against the Temp/visual/probe-fruits-vt12*.ts output.
 *
 * census fields = parsed-document element counts (XML validity test);
 * evenodd      = exact count of fill-rule="evenodd" attributes on the
 *                definition constant (the winding-bug guard: the rework
 *                cut every hole explicitly instead of relying on sweep
 *                direction);
 * signature    = exact silhouette fragments that MUST appear verbatim.
 */
type FruitContract = {
    name: string;
    icon: string;
    svg: SvgIconFactory;
    component: React.ComponentType<IconProps>;
    paths: number;
    groups: number;
    circles: number;
    evenodd: number;
    signature: string[];
};

const FRUITS: FruitContract[] = [
    {
        // apple.ts: wide two-lobe body rising to the (12,7.4) top dimple +
        // evenodd left highlight + flatPath stem and leaf lens.
        name: 'apple',
        icon: ICON_APPLE,
        svg: svgApple,
        component: AppleIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M12 7.4C9.5 5.3 5.8 6.1 4.1 8.8 1.9 12.5 4.2 19.2 7.2 21.4 9.2 22.9 10.5 21.2 12 21.2S14.8 22.9 16.8 21.4C19.8 19.2 22.1 12.5 19.9 8.8 18.2 6.1 14.5 5.3 12 7.4z',
            'M6.3 10C5 11.7 5.1 14 5.8 15.4L7 14.9C6.5 13.4 6.6 11.9 7.4 10.8z',
        ],
    },
    {
        // banana.ts: thick crescent (concave top edge + raised blossom tip)
        // + evenodd inner ridge hole + flatPath stem and blossom wedges.
        name: 'banana',
        icon: ICON_BANANA,
        svg: svgBanana,
        component: BananaIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M4.3 5.3C4.2 11.7 10.7 17.3 18.1 15.1L20.9 12.9C21.4 17.3 17.5 21.6 12.6 21.6 6.1 21.6 1.9 15.3 2.6 8.2z',
            'M5.2 12.1C7.3 17.3 12.3 19.7 17.2 17.7L16.8 16.7C12.4 18.1 8.2 16.2 6.2 11.7z',
        ],
    },
    {
        // cherry.ts: INVERTED element order — the flatPath (two diverging
        // stalk bands + leaf lens) comes FIRST, then the evenodd berry
        // path whose two berries each carry a Q-curve shine hole INSIDE
        // the berry subpath (the old solid berry <circle> elements are
        // gone — shines cut through the fruit now).
        name: 'cherry',
        icon: ICON_CHERRY,
        svg: svgCherry,
        component: CherryIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M6.7 13.9C7.2 8.6 10 4.2 13.8 2.1L14.6 3.2C11.1 5.8 8.9 9.3 8.2 14.1zM16.5 14.7C16.5 9.8 15.6 6.3 13.8 2.8L15 2.2C17.2 6.4 17.9 10.2 17.9 14.7zM15.3 3C16.9 0.9 19.5 1.1 21 2.2 19.4 4.2 17.3 4.8 15.3 3z',
            'M7.6 13.4C4.2 11.5 1.8 14 2.2 17.1 2.6 20.1 4.8 22 7.4 21.5 10.2 22 12.2 19.7 12 16.8 11.8 14 9.9 12.1 7.6 13.4zM4.2 15.1Q3 16.5 3.8 18.1L4.9 17.7Q4.4 16.6 5.2 15.8z',
            'M17 14.5C14.4 12.7 12 14.9 12.2 17.8 12.5 20.7 14.6 22.5 17 22 19.8 22.5 22 20.2 21.8 17.5 21.6 14.7 19.3 12.9 17 14.5zM14.3 16Q13.3 17.3 14 18.7L15.1 18.3Q14.7 17.3 15.4 16.7z',
        ],
    },
    {
        // grape.ts: the ONLY literal-element module — one flatPath (stem
        // + right leaf blade + left tendril curl) then a <g> carrying the
        // per-element flat attributes for SIX r-2.6 berry <circle>
        // children in the 3-2-1 hanging cluster (the old 9-berry diamond
        // is gone).
        name: 'grape',
        icon: ICON_GRAPE,
        svg: svgGrape,
        component: GrapeIcon,
        paths: 1,
        groups: 1,
        circles: 6,
        evenodd: 0,
        signature: [
            'M11.4 7V2h1.4v5zM13.4 4.7C14.2 1.5 17.9 1.3 20.1 2.8L17.9 3.7 18.6 5.2 16.4 5 15.7 6.5zM10.2 4.9C7.8 2.7 5.1 3.4 5.2 5.4 5.3 6.8 6.5 7.2 7.6 6.7L7.2 5.7C6.6 6 6.2 5.8 6.2 5.3 6.2 4.4 8 4.2 9.5 5.8z',
            '<g fill="currentColor" stroke="none"><circle cx="6.5" cy="9.2" r="2.6"/><circle cx="12" cy="8.8" r="2.6"/><circle cx="17.5" cy="9.2" r="2.6"/><circle cx="9.2" cy="14.1" r="2.6"/><circle cx="14.8" cy="14.1" r="2.6"/><circle cx="12" cy="19.1" r="2.6"/></g>',
        ],
    },
    {
        // orange.ts: round body (the silhouette that contrasts apple's
        // lobes) + evenodd curved highlight + THREE r-0.65 peel-pore
        // holes + flatPath stem and broad leaf.
        name: 'orange',
        icon: ICON_ORANGE,
        svg: svgOrange,
        component: OrangeIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M20.6 13.9a8.6 8.6 0 1 1 -17.2 0 8.6 8.6 0 1 1 17.2 0z',
            'M14.4 18a.65.65 0 1 0 1.3 0 .65.65 0 1 0 -1.3 0zM17 15.4a.65.65 0 1 0 1.3 0 .65.65 0 1 0 -1.3 0zM17.1 18.6a.65.65 0 1 0 1.3 0 .65.65 0 1 0 -1.3 0z',
        ],
    },
    {
        // lemon.ts: ONE continuous pointed oval (the old tilted <ellipse>
        // + detached nub circles are gone) + evenodd diagonal highlight
        // following the rind + flatPath leaf.
        name: 'lemon',
        icon: ICON_LEMON,
        svg: svgLemon,
        component: LemonIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M3.8 14.1C3.6 10.3 8.2 6.2 12.8 6.2 15.6 6.1 17.1 7.3 18.6 7.1L20.3 6.9 20.1 9C20 10.1 21 11.1 20.4 13.6 19.5 17.8 15.1 21.1 10.7 21 7.8 21 6.2 19.6 5.2 19.7L3.3 19.9 3.5 18C3.7 16.9 3.4 15.8 3.8 14.1z',
            'M6 13.1C7.1 10.3 9.6 8.7 12.5 8.5L12.6 9.8C10.1 10 8.3 11.4 7.2 13.6z',
        ],
    },
    {
        // watermelon.ts: separated flesh and rind — evenodd lower
        // half-disc flesh + THREE teardrop seed holes, and a SEPARATE
        // flatPath 1.4-unit rind/pith band annulus (the old sweep-wound
        // seed arcs filled solid — evenodd is the fix).
        name: 'watermelon',
        icon: ICON_WATERMELON,
        svg: svgWatermelon,
        component: WatermelonIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M4 7H20C20 11.8 16.5 15.6 12 15.6S4 11.8 4 7z',
            'M7.3 8.4C6.4 9.2 6.7 10.5 7.5 10.5 8.4 10.4 8.4 9.3 7.3 8.4zM12 11C10.9 11.9 11 13.2 12 13.2S13.1 11.9 12 11zM16.7 8.4C15.6 9.3 15.6 10.4 16.5 10.5 17.3 10.5 17.6 9.2 16.7 8.4z',
            'M1.5 7H2.8C2.8 12.6 6.8 17 12 17S21.2 12.6 21.2 7H22.5C22.5 14.3 18 20.4 12 20.4S1.5 14.3 1.5 7z',
        ],
    },
    {
        // pear.ts: gently bent neck flaring into heavy rounded hips (not
        // a flask's straight neck) + evenodd left-hip highlight + flatPath
        // stem and leaf.
        name: 'pear',
        icon: ICON_PEAR,
        svg: svgPear,
        component: PearIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M12 5.2C14.8 5.2 14.5 8.7 15.8 11 17 13.1 19.8 14.6 19.6 17.7 19.4 21 16.4 22.4 12 22.4 7.8 22.4 4.4 20.9 4.4 17.6 4.4 14.7 7 12.8 8.2 10.4 9.4 8.1 9.2 5.2 12 5.2z',
            'M7.2 14.4C5.8 16.5 6.2 18.5 7.6 19.6L8.4 18.6C7.4 17.7 7.4 16.4 8.3 15.1z',
        ],
    },
    {
        // strawberry.ts: broad shoulders tapering to a rounded point
        // (reads as strawberry before any detail) + evenodd SEVEN seed
        // holes (four slanted quads + three centerline rects) + flatPath
        // stem stub and five-blade calyx (the old round berry + arc seeds
        // are gone).
        name: 'strawberry',
        icon: ICON_STRAWBERRY,
        svg: svgStrawberry,
        component: StrawberryIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M4.4 8.2C6.1 6.8 8.8 7 12 7.7 15.2 7 17.9 6.8 19.6 8.2 22.9 11.2 17.3 20.3 12 22.5 6.7 20.3 1.1 11.2 4.4 8.2z',
            'M11.4 4.8V1.5h1.3v3.3L17 3.5 15.5 6 19 6.9 14.4 8 12 6.4 9.6 8 5 6.9 8.5 6 7 3.5z',
        ],
    },
    {
        // peach.ts: symmetric full cheeks + evenodd long curved suture
        // (the cleft that distinguishes peach from orange) + flatPath
        // stem and ONE lanceolate leaf (the old flanking leaf pair is
        // gone).
        name: 'peach',
        icon: ICON_PEACH,
        svg: svgPeach,
        component: PeachIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M12 7.5C8 5.2 3.2 7.6 3 12.7 2.8 17.5 7.1 20.7 12 22.3 16.9 20.7 21.2 17.5 21 12.7 20.8 7.6 16 5.2 12 7.5z',
            'M12.8 8.8C16.1 11.1 16.5 16.4 12.5 20L11.7 19.1C15 15.8 14.8 11.7 12.1 9.8z',
        ],
    },
    {
        // pineapple.ts: broad upright oval body + evenodd SEVEN isolated
        // diamond scale holes (the old intersecting lattice bands
        // cancelled/overfilled under nonzero winding) + flatPath five-blade
        // pointed crown.
        name: 'pineapple',
        icon: ICON_PINEAPPLE,
        svg: svgPineapple,
        component: PineappleIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M12 8C16.6 8 19.2 10.7 19.2 15.3 19.2 19.8 16.7 22.5 12 22.5S4.8 19.8 4.8 15.3C4.8 10.7 7.4 8 12 8z',
            'M12 9.5l-1.2 1.3 1.2 1.3 1.2-1.3zM8.8 12.1l-1.2 1.3 1.2 1.3 1.2-1.3zM15.2 12.1L14 13.4l1.2 1.3 1.2-1.3zM12 14.7L10.8 16l1.2 1.3 1.2-1.3zM8.8 17.3l-1.2 1.3 1.2 1.3 1.2-1.3zM15.2 17.3L14 18.6l1.2 1.3 1.2-1.3zM12 19.5l-1 1 1 1 1-1z',
            'M9.5 8.2C6.8 7.9 5.8 5.7 5.2 3.5L9.5 6.1 8.6 1.6 11.1 4.5 12 .6 12.9 4.5 15.4 1.6 14.5 6.1 18.8 3.5C18.2 5.7 17.2 7.9 14.5 8.2z',
        ],
    },
    {
        // kiwi.ts: the only THREE-element module — (1) evenodd skin ring
        // (outer 9.5×10.5 oval + inner 8×9 sweep-0 reversed hole), (2)
        // evenodd flesh oval + EIGHT radial seed slots (four axis-aligned
        // rects at N/S/E/W + four diagonal parallelograms pointing at the
        // core), (3) flatPath solid elongated core lens (the old circular
        // doughnut + float-noise seed ring is gone).
        name: 'kiwi',
        icon: ICON_KIWI,
        svg: svgKiwi,
        component: KiwiIcon,
        paths: 3,
        groups: 0,
        circles: 0,
        evenodd: 2,
        signature: [
            'M21.5 12a9.5 10.5 0 1 1 -19 0 9.5 10.5 0 1 1 19 0zM20 12a8 9 0 1 0 -16 0 8 9 0 1 0 16 0z',
            'M11.4 6v2h1.2V6zM11.4 16v2h1.2v-2zM6.7 11.4v1.2h2v-1.2zM15.3 11.4v1.2h2v-1.2zM8.2 7.7l-.8.8 1.4 1.4.8-.8zM15.8 7.7l-1.4 1.4.8.8 1.4-1.4zM8.8 14.1l-1.4 1.4.8.8 1.4-1.4zM15.2 14.1l-.8.8 1.4 1.4.8-.8z',
            'M11.7 9.8Q10.9 12 11.7 14.2H12.3Q13.1 12 12.3 9.8z',
        ],
    },
    {
        // mango.ts: asymmetric kidney body with the hooked beak (differs
        // from peach's symmetric cheeks and pear's upright neck) +
        // evenodd inner highlight + flatPath stem and leaf.
        name: 'mango',
        icon: ICON_MANGO,
        svg: svgMango,
        component: MangoIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M12.8 5.8C17.7 4.4 21.4 8 20.6 12.8 19.9 17.8 14.8 22.3 8.9 22.1 6.7 22 4.7 21 3.2 19.3 6 18.7 5.6 15.5 5.9 12.7 6.3 8.7 8.7 6.1 12.8 5.8z',
            'M16.2 8.2C18.7 9.6 18.7 12.6 17 15.2L15.9 14.5C17.2 12.3 17.2 10.2 15.6 9.3z',
        ],
    },
    {
        // avocado.ts: outlined skin — evenodd ring of the outer body
        // outline + inner flesh outline hole — over a SEPARATE solid
        // flatPath pit ellipse (sweep-1, NO fill-rule: the pit must stay
        // solid, the old pear-with-a-hole read is gone).
        name: 'avocado',
        icon: ICON_AVOCADO,
        svg: svgAvocado,
        component: AvocadoIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M12 1.5C15.6 1.5 15.6 6 17.8 8.8 20 11.6 21 13.2 21 16.1 21 20.2 17.1 22.5 12 22.5S3 20.2 3 16.1C3 13.2 4 11.6 6.2 8.8 8.4 6 8.4 1.5 12 1.5zM12 3.2C9.8 3.2 9.8 7 7.5 9.8 5.5 12.4 4.7 13.9 4.7 16.1 4.7 19.1 7.8 20.8 12 20.8S19.3 19.1 19.3 16.1C19.3 13.9 18.5 12.4 16.5 9.8 14.2 7 14.2 3.2 12 3.2z',
            'M16.1 15.7a4.1 4.3 0 1 1 -8.2 0 4.1 4.3 0 1 1 8.2 0z',
        ],
    },
    {
        // blueberry.ts: three berry circles + their five-point calyx star
        // holes all INSIDE one evenodd path (the old stars painted before
        // opaque circles disappeared — evenodd cuts them through now) +
        // flatPath leaf in the upper-right gap. Bottom berry re-cut
        // r 4.5 → 3.9 (center unchanged (11.2,18)) so the three circles
        // stay strictly disjoint — overlap inside one evenodd path XORs a
        // transparent lens (dedicated regression test below).
        name: 'blueberry',
        icon: ICON_BLUEBERRY,
        svg: svgBlueberry,
        component: BlueberryIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M12.6 8.2a5.5 5.5 0 1 1 -11 0 5.5 5.5 0 1 1 11 0zM7.1 4.7L6.3 6.2 4.6 6.4 5.8 7.7 5.6 9.4 7.1 8.6 8.6 9.4 8.4 7.7 9.6 6.4 7.9 6.2z',
            'M22.4 12a4.8 4.8 0 1 1 -9.6 0 4.8 4.8 0 1 1 9.6 0zM17.6 8.9L16.9 10.2 15.4 10.4 16.5 11.5 16.3 13 17.6 12.3 18.9 13 18.7 11.5 19.8 10.4 18.3 10.2zM15.1 18a3.9 3.9 0 1 1 -7.8 0 3.9 3.9 0 1 1 7.8 0zM11.2 15.5L10.6 16.6 9.3 16.8 10.2 17.8 10 19.1 11.2 18.5 12.4 19.1 12.2 17.8 13.1 16.8 11.8 16.6z',
        ],
    },
    {
        // coconut.ts: cut half — evenodd hull ellipse ring (outer 10×5.5 +
        // inner 7.6×3.4 sweep-0 cavity hole) over a flatPath flesh bowl
        // whose bottom edge carries THREE fiber notches (the old tiny
        // circle with face-like eyes and a lightning crack is gone).
        name: 'coconut',
        icon: ICON_COCONUT,
        svg: svgCoconut,
        component: CoconutIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M22 9a10 5.5 0 1 1 -20 0 10 5.5 0 1 1 20 0zM19.6 8.7a7.6 3.4 0 1 0 -15.2 0 7.6 3.4 0 1 0 15.2 0z',
            'M2.3 12.5C4.5 15 7.8 16 12 16S19.5 15 21.7 12.5C21.2 16.1 19.6 19 17.1 20.4L17.8 17.5 16.5 17.2 15.5 21.1C14.6 21.5 13.7 21.7 12.7 21.8V18.8H11.3V21.8C10.3 21.7 9.4 21.5 8.5 21.1L7.5 17.2 6.2 17.5 6.9 20.4C4.4 19 2.8 16.1 2.3 12.5z',
        ],
    },
    {
        // pomegranate.ts: wide angular calyx + rounded slightly-squared
        // body + evenodd EIGHT larger Q-teardrop aril holes in rows
        // 3-3-2 (the old face-like round dots are gone).
        name: 'pomegranate',
        icon: ICON_POMEGRANATE,
        svg: svgPomegranate,
        component: PomegranateIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M8 10.4Q5.9 11.9 8 13.1 10.1 11.9 8 10.4zM12 9.8Q9.9 11.3 12 12.5 14.1 11.3 12 9.8zM16 10.4Q13.9 11.9 16 13.1 18.1 11.9 16 10.4zM8 14.4Q5.9 15.9 8 17.1 10.1 15.9 8 14.4zM12 13.8Q9.9 15.3 12 16.5 14.1 15.3 12 13.8zM16 14.4Q13.9 15.9 16 17.1 18.1 15.9 16 14.4zM10 18Q8.1 19.4 10 20.5 11.9 19.4 10 18zM14 18Q12.1 19.4 14 20.5 15.9 19.4 14 18z',
            'M9 7.7L7.7 2.8 10.6 4.5 12 1.4 13.4 4.5 16.3 2.8 15 7.7z',
        ],
    },
    {
        // plum.ts: oval drupe (not the old flattened onion) + evenodd long
        // off-centre suture hole + flatPath stem and leaf.
        name: 'plum',
        icon: ICON_PLUM,
        svg: svgPlum,
        component: PlumIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M12 7.4C15.8 5.5 20 8.3 20 13.4 20 18.3 16.8 22.3 12 22.3S4 18.3 4 13.4C4 8.3 8.2 5.5 12 7.4z',
            'M10.7 8.7C8.2 11.5 8.4 17.6 11.2 20.4L12.1 19.5C9.8 16.8 9.7 12 11.7 9.4z',
        ],
    },
    {
        // melon.ts: whole muskmelon — body circle + evenodd FOUR curved
        // rib holes (two inner, two outer; the old crossing net bands
        // collapsed into a near-plain circle) + flatPath short curved
        // stalk (not a long cherry stem).
        name: 'melon',
        icon: ICON_MELON,
        svg: svgMelon,
        component: MelonIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        evenodd: 1,
        signature: [
            'M21.5 13a9.5 9.5 0 1 1 -19 0 9.5 9.5 0 1 1 19 0z',
            'M10.3 5.5C6.7 9.3 6.7 16.8 10.3 20.5L11.2 19.7C8.3 16.1 8.3 9.9 11.2 6.3zM13.7 5.5L12.8 6.3C15.7 9.9 15.7 16.1 12.8 19.7L13.7 20.5C17.3 16.8 17.3 9.3 13.7 5.5zM5.7 8.1C3.7 10.9 3.7 15.1 5.7 17.9L6.7 17.2C5.2 14.6 5.2 11.4 6.7 8.8zM18.3 8.1L17.3 8.8C18.8 11.4 18.8 14.6 17.3 17.2L18.3 17.9C20.3 15.1 20.3 10.9 18.3 8.1z',
            'M11.3 4.2C11 2.4 11.9 1 13.8 1L14 2.3C12.8 2.3 12.5 3 12.7 4.2z',
        ],
    },
];

describe('fruits per-module contract (VISUAL-TESTS-12 silhouette rework)', () => {
    it('renders every module factory as the documented shell around its own definition, byte-exact', () => {
        for (const fruit of FRUITS) {
            // MODULE SELF-CONTAINMENT + OUTPUT CONTRACT (svg-icon.ts):
            // xmlns → viewBox → width="1em" → height="1em" →
            // fill="currentColor", then the module's own ICON_<NAME>
            // content verbatim — byte-exact by construction (the
            // ICON_LIGHTNING composition precedent in ../icons.test.ts).
            expect(fruit.svg()).toBe(SHELL_OPEN + fruit.icon + SHELL_CLOSE);
            // REGISTRATION: importing the module alone registered its
            // name — the live registry resolves to the identical string.
            expect(svgIcon(fruit.name)).toBe(fruit.svg());
        }
    });

    it('parses every full render as a standalone SVG document with the exact per-module element census', () => {
        for (const fruit of FRUITS) {
            // XML VALIDITY: 'image/svg+xml' parse of the factory's real
            // output — a <parsererror> report element means malformed
            // markup (never expected: every definition is well-formed).
            const doc = new DOMParser().parseFromString(fruit.svg(), 'image/svg+xml');
            expect(doc.querySelector('parsererror')).toBeNull();
            // Standalone-SVG root on the shared 24×24 grid.
            expect(doc.documentElement.tagName).toBe('svg');
            expect(doc.documentElement.getAttribute('viewBox')).toBe('0 0 24 24');
            // Exact per-module census: paths carry the flat design; grape
            // is the only module with a <g> and literal berry circles;
            // kiwi is the only three-path module (skin + flesh + core).
            expect(doc.getElementsByTagName('path').length).toBe(fruit.paths);
            expect(doc.getElementsByTagName('g').length).toBe(fruit.groups);
            expect(doc.getElementsByTagName('circle').length).toBe(fruit.circles);
            // Flat-design presentation contract on EVERY path element:
            // solid currentColor fill, stroke disabled (fill-rule varies).
            for (const path of Array.from(doc.getElementsByTagName('path'))) {
                expect(path.getAttribute('fill')).toBe('currentColor');
                expect(path.getAttribute('stroke')).toBe('none');
            }
        }
    });

    it('carries the exact VISUAL-TESTS-12 silhouette fragments and evenodd census per module', () => {
        for (const fruit of FRUITS) {
            // EVENODD CENSUS (the winding-bug guard): 18 modules cut
            // their holes with exactly one explicit fill-rule="evenodd"
            // attribute, kiwi carries two (skin ring + flesh), grape
            // none (its berries are solid <g> circles — nothing to cut).
            // match() returning null is the exact absence assertion for
            // the zero case.
            expect(fruit.icon.match(/fill-rule="evenodd"/g)).toEqual(
                fruit.evenodd === 0
                    ? null
                    : new Array(fruit.evenodd).fill('fill-rule="evenodd"')
            );
            // Exact hand-derived silhouette fragments — each module's
            // recognizable body, its hole subpaths and its flatPath top
            // piece, transcribed from the module source and confirmed
            // byte-for-byte against Temp/visual/probe-fruits-vt12*.ts.
            for (const fragment of fruit.signature) {
                expect(fruit.icon).toContain(fragment);
            }
        }
    });

    it('renders grape as one flatPath over a <g>-wrapped six-circle cluster with inherited (null) circle attributes', () => {
        // grape is the ONLY fruit using literal non-path elements: the
        // single <g> carries the per-element flat attribute pair and its
        // six r-2.6 berry circles stay attribute-free — fill/stroke
        // inherit from the group (parsed attribute value null).
        const grape = FRUITS.find((fruit) => fruit.name === 'grape') as FruitContract;
        const doc = new DOMParser().parseFromString(grape.svg(), 'image/svg+xml');
        const group = doc.getElementsByTagName('g')[0];
        expect(group.getAttribute('fill')).toBe('currentColor');
        expect(group.getAttribute('stroke')).toBe('none');
        const circles = doc.getElementsByTagName('circle');
        expect(circles.length).toBe(6);
        // The 3-2-1 hanging cluster: exact cx/cy/r of every berry, in
        // definition order (top row of three, middle pair, bottom apex).
        expect(
            Array.from(circles).map((circle) => [
                circle.getAttribute('cx'),
                circle.getAttribute('cy'),
                circle.getAttribute('r'),
            ])
        ).toEqual([
            ['6.5', '9.2', '2.6'],
            ['12', '8.8', '2.6'],
            ['17.5', '9.2', '2.6'],
            ['9.2', '14.1', '2.6'],
            ['14.8', '14.1', '2.6'],
            ['12', '19.1', '2.6'],
        ]);
        // Inheritance design: the berry circles carry NO fill/stroke of
        // their own (null attribute = inherit from the <g>).
        for (const circle of Array.from(circles)) {
            expect(circle.getAttribute('fill')).toBeNull();
            expect(circle.getAttribute('stroke')).toBeNull();
        }
    });

    it('keeps the three blueberry berry circles strictly disjoint inside the single evenodd path', () => {
        // THE XOR-LENS REGRESSION (blueberry.ts bottom-berry re-cut): all
        // three berry silhouettes share ONE fill-rule="evenodd" path, so
        // any pairwise overlap fills the lens region twice and evenodd
        // renders it TRANSPARENT — the old r 4.5 bottom berry did exactly
        // that against the r 4.8 right berry (center distance
        // sqrt(6.4²+6²)=8.77268 < 4.8+4.5=9.3). At r 3.9 (center unchanged
        // (11.2,18)) the sum drops to 8.7 and every pair separates. Each
        // berry circle subpath is the exact arc pair
        // M{cx+r} {cy}a{r} {r} 0 1 1 -{2r} 0 {r} {r} 0 1 1 {2r} 0z — the
        // calyx star holes carry only L/Q line data and cannot match, so
        // this census lifts EXACTLY the three circles out of the d.
        const blueberry = FRUITS.find((fruit) => fruit.name === 'blueberry') as FruitContract;
        const circleSubpath =
            /M(\d+(?:\.\d+)?) (\d+(?:\.\d+)?)a(\d+(?:\.\d+)?) \3 0 1 1 -(\d+(?:\.\d+)?) 0 \3 \3 0 1 1 \4 0z/g;
        const matches = blueberry.icon.match(circleSubpath) as RegExpMatchArray;
        // Exact census: exactly three circle subpaths, byte-verbatim, in
        // definition order (left big, right middle, bottom) — the bottom
        // one pins the re-cut r 3.9 arc (M start 15.1 = 11.2 + 3.9).
        expect(matches).toEqual([
            'M12.6 8.2a5.5 5.5 0 1 1 -11 0 5.5 5.5 0 1 1 11 0z',
            'M22.4 12a4.8 4.8 0 1 1 -9.6 0 4.8 4.8 0 1 1 9.6 0z',
            'M15.1 18a3.9 3.9 0 1 1 -7.8 0 3.9 3.9 0 1 1 7.8 0z',
        ]);
        // Exact centers/radii in ×10 integers: every berry literal has at
        // most ONE fraction digit, so the string→integer scaling below is
        // EXACT — no float arithmetic anywhere in this test. The arc
        // starts at the circle's 3-o'clock point (cx + r, cy), so the
        // center is startX − r: left (71,82) r 55, right (176,120) r 48,
        // bottom (112,180) r 39 — i.e. (7.1,8.2) r 5.5, (17.6,12) r 4.8,
        // (11.2,18) r 3.9 per blueberry.ts's geometry comment.
        const scale10 = (decimal: string): number => {
            const [whole, fraction = '0'] = decimal.split('.');
            return Number(whole) * 10 + Number(fraction.padEnd(1, '0'));
        };
        const circleShape =
            /^M(\d+(?:\.\d+)?) (\d+(?:\.\d+)?)a(\d+(?:\.\d+)?) \3 0 1 1 -(\d+(?:\.\d+)?) 0 \3 \3 0 1 1 \4 0z$/;
        const berries = matches.map((subpath) => {
            // The census pin above already proved these exact bytes; this
            // re-match only lifts the four literals out (start x/y, r, 2r).
            const parts = subpath.match(circleShape) as RegExpMatchArray;
            return {
                subpath,
                cx10: scale10(parts[1]) - scale10(parts[3]),
                cy10: scale10(parts[2]),
                r10: scale10(parts[3]),
            };
        });
        expect(berries).toEqual([
            {
                subpath: 'M12.6 8.2a5.5 5.5 0 1 1 -11 0 5.5 5.5 0 1 1 11 0z',
                cx10: 71,
                cy10: 82,
                r10: 55,
            },
            {
                subpath: 'M22.4 12a4.8 4.8 0 1 1 -9.6 0 4.8 4.8 0 1 1 9.6 0z',
                cx10: 176,
                cy10: 120,
                r10: 48,
            },
            {
                subpath: 'M15.1 18a3.9 3.9 0 1 1 -7.8 0 3.9 3.9 0 1 1 7.8 0z',
                cx10: 112,
                cy10: 180,
                r10: 39,
            },
        ]);
        // Strict pairwise disjointness in exact ×10-integer arithmetic:
        // squared center distance > squared radius sum (the exact boolean
        // this regression exists for). The old bottom r 45 failed the
        // bottom/right pair — 7696 < 93² = 8649, the transparent lens; the
        // re-cut r 39 restores 7696 > 87² = 7569 (linear margin 0.07268).
        type Berry = (typeof berries)[number];
        const squaredDistance = (a: Berry, b: Berry): number =>
            (a.cx10 - b.cx10) ** 2 + (a.cy10 - b.cy10) ** 2;
        const squaredRadiusSum = (a: Berry, b: Berry): number => (a.r10 + b.r10) ** 2;
        const [left, right, bottom] = berries;
        // bottom (112,180) vs right (176,120): 64²+60² = 7696 > (39+48)² = 7569
        expect(squaredDistance(bottom, right)).toBe(7696);
        expect(squaredRadiusSum(bottom, right)).toBe(7569);
        expect(squaredDistance(bottom, right) > squaredRadiusSum(bottom, right)).toBe(true);
        // bottom (112,180) vs left (71,82): 41²+98² = 11285 > (39+55)² = 8836
        expect(squaredDistance(bottom, left)).toBe(11285);
        expect(squaredRadiusSum(bottom, left)).toBe(8836);
        expect(squaredDistance(bottom, left) > squaredRadiusSum(bottom, left)).toBe(true);
        // left (71,82) vs right (176,120): 105²+38² = 12469 > (55+48)² = 10609
        expect(squaredDistance(left, right)).toBe(12469);
        expect(squaredRadiusSum(left, right)).toBe(10609);
        expect(squaredDistance(left, right) > squaredRadiusSum(left, right)).toBe(true);
    });

    describe('string/React parity — every <Name>Icon through the exact IconBase shell', () => {
        afterEach(cleanup);

        it('renders the shared flat shell defaults carrying the module definition exactly', () => {
            for (const fruit of FRUITS) {
                const { container } = render(React.createElement(fruit.component));
                const el = container.querySelector(
                    `svg[data-icon="${fruit.name}"]`
                ) as SVGSVGElement | null;
                expect(el).not.toBeNull();
                // IconBase shell defaults (react.tsx): 16px square on the
                // 24×24 grid, flat currentColor/stroke-none pair,
                // decorative-by-default a11y, data-icon machine name.
                expect(el.getAttribute('width')).toBe('16');
                expect(el.getAttribute('height')).toBe('16');
                expect(el.getAttribute('viewBox')).toBe('0 0 24 24');
                expect(el.getAttribute('fill')).toBe('currentColor');
                expect(el.getAttribute('stroke')).toBe('none');
                expect(el.getAttribute('aria-hidden')).toBe('true');
                expect(el.getAttribute('focusable')).toBe('false');
                // STRING/REACT PARITY: the component's innerHTML equals
                // the module's ICON_<NAME> constant serialized through
                // the SAME jsdom machinery (self-closing elements read
                // back as open/close pairs, attribute order preserved) —
                // so both layers consume the identical geometry bytes.
                expect(el.innerHTML).toBe(serialized(fruit.icon));
            }
        });
    });
});
