/**
 * fantasy.test.ts — deterministic per-module tests for the FANTASY icon set
 * (./: one file per icon, 30 modules after the FANTASY-REDRAW of the original
 * ten + the 20 RPG equipment additions).
 *
 * SCOPE (companion to ../icons.test.ts and ../react.test.tsx, which other
 * files own): THIS file pins the PER-MODULE contract for every one of the 30
 * fantasy files, mirroring the animals/animals.test.ts and
 * fruits/fruits.test.ts conventions:
 *   1. MODULE SELF-CONTAINMENT — each svg<Name> factory renders the
 *      documented svg-icon OUTPUT CONTRACT shell (../svg-icon.ts: xmlns →
 *      viewBox → width="1em" → height="1em" → fill="currentColor", then the
 *      definition content verbatim) around THAT module's ICON_<NAME>
 *      constant, byte-exact, and the module import alone registers the name
 *      in the shared registry (svgIcon(name) === svg<Name>()).
 *   2. DEFINITION BYTES — every ICON_<NAME> constant is pinned to the
 *      hand-transcribed source markup composed from the per-element paint
 *      table below (the ICON_LIGHTNING composition precedent in
 *      ../icons.test.ts). The table bytes were first transcribed from
 *      fantasy/sword.ts … fantasy/skull.ts, then diffed byte-for-byte
 *      against the live renders via Temp/fantasy-test/probe.ts (run with
 *      `npx vite-node Temp/fantasy-test/probe.ts` from the repo root) —
 *      no observed output was blessed without the independent source read.
 *   3. XML VALIDITY + EXACT ELEMENT CENSUS — every full render parses as a
 *      standalone SVG document; the per-module path/circle/rect counts are
 *      exact (no fantasy module uses <g> or <ellipse>) and every <path>
 *      carries the flat-design fill="currentColor" stroke="none" pair.
 *   4. EXACT PER-ELEMENT STRUCTURE — element ORDER (scroll sandwiches its
 *      body between the two rolls; wand/axe/potion append literal
 *      elements), each path's [d, fill-rule] pair, and every literal
 *      circle/rect geometry (axe pommel, wand sparkle dots, potion
 *      cork/fizz, scroll rolls) are pinned per module.
 *   5. EXPLICIT EVENODD CUTS — the exact count of fill-rule="evenodd"
 *      attributes per module (the winding-bug guard: every redraw hole is
 *      cut explicitly, NOT by load-bearing sweep direction) plus the
 *      distinctive detail fragments (sword fuller + wrap notches + pommel
 *      ring, axe bevel, shield border/chevron, potion cavity/liquid/
 *      bubbles, scroll writing lines, spellbook spine/rune, crown band
 *      jewels/orbs, gem girdle/crown/pavilion facets, key bow/bit, mace
 *      flanges/boss/grip, vial meniscus, dagger fuller, ring band, …).
 *   6. ELEMENT-SPLIT PAINT CONTRACT — overlaps that must UNION paint over
 *      as SEPARATE elements (sword pommel ring over grip, axe pommel
 *      circle over haft, crown orb finials over spike tips, key shaft over
 *      bow tip, chest keyhole plate bridging lid/body, potion cork/fizz
 *      over the transparent cavity, scroll bottom roll over line 4) stay
 *      out of the evenodd parent — the per-element structure table makes
 *      that split load-bearing (same evenodd XOR rationale as
 *      fruits/fruits.test.ts disjointness notes).
 *   7. REGISTRATION SURFACE — the 30 names sit contiguously in ../builtins
 *      svgIcons order (indices 23..52 after the 23 generic keys), the
 *      gallery bootstrap (../../../ui/main.ts) lists all 30 under its
 *      Fantasy subset, and the root ../index barrel re-exports every
 *      svg<Name> factory, ICON_<NAME> constant and <Name>Icon component.
 *   8. STRING/REACT OPTIONS — numeric size → px and string size → verbatim
 *      on every string factory AND every React component, fill/color and
 *      a11y props forwarded over the IconBase shell defaults (../react.tsx
 *      spread-after-defaults precedence), and full exact output strings
 *      for option combinations on the set head (sword) and tail (skull).
 *
 * SAME-PAINT RATIONALE: inside ONE evenodd element every hole nests in a
 * filled subpath so evenodd depth stays even for holes / odd for metal;
 * overlapping details ride as separate paints so the overlap paints over
 * (union) instead of XOR-cancelling transparent. jsdom has no geometric
 * fill hit-test, so the guard is structural — the exact bytes + element
 * tables below ARE the pins (the module header comments in sword.ts/
 * axe.ts/crown.ts/key.ts/chest.ts document the overlap geometry).
 */
import { afterEach, describe, expect, it } from 'vitest';
import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { svgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import type { IconProps } from '../react';
import { svgIcons } from '../builtins';
import * as rootBarrel from '../index';
import { ICON_SWORD, svgSword, SwordIcon } from './sword';
import { ICON_AXE, svgAxe, AxeIcon } from './axe';
import { ICON_WAND, svgWand, WandIcon } from './wand';
import { ICON_SHIELD, svgShield, ShieldIcon } from './shield';
import { ICON_POTION, svgPotion, PotionIcon } from './potion';
import { ICON_SCROLL, svgScroll, ScrollIcon } from './scroll';
import { ICON_SPELLBOOK, svgSpellbook, SpellbookIcon } from './spellbook';
import { ICON_CROWN, svgCrown, CrownIcon } from './crown';
import { ICON_GEM, svgGem, GemIcon } from './gem';
import { ICON_KEY, svgKey, KeyIcon } from './key';
import { ICON_MACE, svgMace, MaceIcon } from './mace';
import { ICON_VIAL, svgVial, VialIcon } from './vial';
import { ICON_DAGGER, svgDagger, DaggerIcon } from './dagger';
import { ICON_BOW, svgBow, BowIcon } from './bow';
import { ICON_ARROW, svgArrow, ArrowIcon } from './arrow';
import { ICON_STAFF, svgStaff, StaffIcon } from './staff';
import { ICON_SPEAR, svgSpear, SpearIcon } from './spear';
import { ICON_WARHAMMER, svgWarhammer, WarhammerIcon } from './warhammer';
import { ICON_HELMET, svgHelmet, HelmetIcon } from './helmet';
import { ICON_ARMOR, svgArmor, ArmorIcon } from './armor';
import { ICON_GAUNTLET, svgGauntlet, GauntletIcon } from './gauntlet';
import { ICON_BOOTS, svgBoots, BootsIcon } from './boots';
import { ICON_RING, svgRing, RingIcon } from './ring';
import { ICON_AMULET, svgAmulet, AmuletIcon } from './amulet';
import { ICON_TORCH, svgTorch, TorchIcon } from './torch';
import { ICON_BACKPACK, svgBackpack, BackpackIcon } from './backpack';
import { ICON_CHEST, svgChest, ChestIcon } from './chest';
import { ICON_COINS, svgCoins, CoinsIcon } from './coins';
import { ICON_DICE, svgDice, DiceIcon } from './dice';
import { ICON_SKULL, svgSkull, SkullIcon } from './skull';

// The fixed svg-icon OUTPUT CONTRACT shell every factory prepends (verbatim
// attribute order from ../svg-icon.ts).
const SHELL_OPEN =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">';
const SHELL_CLOSE = '</svg>';

// Shell builder for the size-option tests (same fixed attribute order, only
// width/height change — resolveSize in ../svg-icon.ts).
const shell = (size: string): string =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor">`;

// Offscreen DOM probe: reads a definition string back through the SAME jsdom
// innerHTML machinery the React components render through (attribute order
// preserved, self-closing elements read back as open/close pairs) — the
// ../react.test.tsx `serialized()` precedent.
const probe = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const serialized = (markup: string): string => {
    probe.innerHTML = markup;
    return probe.innerHTML;
};

// ── element templates (byte-exact mirrors of the markup the per-icon files
// write: ../svg-icon.ts flatPath + the literal circle/rect convention) ──────
const evenoddPath = (d: string): string =>
    `<path d="${d}" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;
const flatPathMarkup = (d: string): string => `<path d="${d}" fill="currentColor" stroke="none"/>`;
const circleMarkup = (cx: string, cy: string, r: string): string =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="currentColor" stroke="none"/>`;
const rectMarkup = (x: string, y: string, w: string, h: string, rx: string): string =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="currentColor" stroke="none"/>`;

// Paint = one markup ELEMENT in definition order. rule=null is the plain
// flat path (nonzero, no fill-rule attribute); rule='evenodd' carries the
// explicit hole-cutting attribute.
type PathPaint = { kind: 'path'; d: string; rule: string | null };
type CirclePaint = { kind: 'circle'; cx: string; cy: string; r: string };
type RectPaint = { kind: 'rect'; x: string; y: string; w: string; h: string; rx: string };
type Paint = PathPaint | CirclePaint | RectPaint;

// Compose the exact definition content from the paint table (byte-exact by
// construction — the ICON_LIGHTNING composition precedent).
const composeContent = (paints: Paint[]): string =>
    paints
        .map((paint) => {
            if (paint.kind === 'path') {
                return paint.rule === 'evenodd' ? evenoddPath(paint.d) : flatPathMarkup(paint.d);
            }
            if (paint.kind === 'circle') {
                return circleMarkup(paint.cx, paint.cy, paint.r);
            }
            return rectMarkup(paint.x, paint.y, paint.w, paint.h, paint.rx);
        })
        .join('');

type FantasyContract = {
    name: string;
    icon: string;
    svg: SvgIconFactory;
    component: React.ComponentType<IconProps>;
    // Every markup element in definition order (source-transcribed).
    paints: Paint[];
    // Distinctive detail fragments that MUST appear verbatim (the redraw
    // details: fuller/bevel/meniscus/facets/flanges/holes).
    signature: string[];
};

/**
 * The per-module contract table, in fantasy/index.ts order. Every d string,
 * literal geometry and fragment is hand-transcribed from that module's own
 * source file (fantasy/sword.ts … fantasy/skull.ts) and cross-verified
 * byte-for-byte against the Temp/fantasy-test/probe.ts output.
 */
const FANTASIES: FantasyContract[] = [
    {
        // sword.ts: blade (tip (12,1) → shoulders (9.5/14.5,5) → guard y 15)
        // with the 1.1-wide transparent FULLER slot + TWO grip wrap notches
        // in ONE evenodd element; the pommel ring (outer r 1.5 at (12,22.1),
        // hole r 0.65) is a SEPARATE evenodd element because ring and grip
        // overlap y 20.6..21 — cross-element paint-over unions, same-path
        // overlap would XOR transparent (sword.ts ELEMENT SPLIT note).
        name: 'sword',
        icon: ICON_SWORD,
        svg: svgSword,
        component: SwordIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M12 1L14.5 5V15H9.5V5ZM11.45 6H12.55V13.9H11.45ZM6 15H18V17.5H6ZM11 17.5H13V21H11ZM11 18.4H13V19H11ZM11 19.8H13V20.4H11Z',
            },
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M12 20.6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 1 1 0-3zM12 21.45a0.65 0.65 0 1 0 0 1.3a0.65 0.65 0 1 0 0-1.3z',
            },
        ],
        signature: [
            'M11.45 6H12.55V13.9H11.45Z',
            'M11 18.4H13V19H11ZM11 19.8H13V20.4H11Z',
            'M12 20.6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 1 1 0-3zM12 21.45a0.65 0.65 0 1 0 0 1.3a0.65 0.65 0 1 0 0-1.3z',
        ],
    },
    {
        // axe.ts: haft bar (x 11..13, y 4..21) + single-bit lens blade
        // ((13,3) → (21,7) → (13,11)) with the inset CHEEK BEVEL lens hole
        // in ONE evenodd element; the r-1.3 pommel knob at (12,21.8) is a
        // literal circle SEPARATE from the haft it overlaps (paint-over).
        name: 'axe',
        icon: ICON_AXE,
        svg: svgAxe,
        component: AxeIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M11 4H13V21H11ZM13 3Q20 3.5 21 7Q20 10.5 13 11ZM14 4.1Q19 4.6 19.8 7Q19 9.4 14 9.9Q15 7 14 4.1Z',
            },
            { kind: 'circle', cx: '12', cy: '21.8', r: '1.3' },
        ],
        signature: [
            'M13 3Q20 3.5 21 7Q20 10.5 13 11Z',
            'M14 4.1Q19 4.6 19.8 7Q19 9.4 14 9.9Q15 7 14 4.1Z',
            'M11 4H13V21H11Z',
        ],
    },
    {
        // wand.ts: 2px diagonal stick + TWO concave sparkles (main arm 4.2
        // at (16.8,7.2), second arm 2.2 at (20.2,14.4)) as disjoint subpaths
        // of one flat path; two literal sparkle-dot circles — no evenodd
        // anywhere (all four elements mutually disjoint, wand.ts note).
        name: 'wand',
        icon: ICON_WAND,
        svg: svgWand,
        component: WandIcon,
        paints: [
            {
                kind: 'path',
                rule: null,
                d: 'M3.6 19.2l9.2-9.2 1.4 1.4-9.2 9.2zM16.8 3Q17.6 6.4 21 7.2Q17.6 8 16.8 11.4Q16 8 12.6 7.2Q16 6.4 16.8 3zM20.2 12.2Q20.7 13.9 22.4 14.4Q20.7 14.9 20.2 16.6Q19.7 14.9 18 14.4Q19.7 13.9 20.2 12.2z',
            },
            { kind: 'circle', cx: '13.3', cy: '2.9', r: '0.9' },
            { kind: 'circle', cx: '21.6', cy: '9.6', r: '0.7' },
        ],
        signature: [
            'M3.6 19.2l9.2-9.2 1.4 1.4-9.2 9.2z',
            'M16.8 3Q17.6 6.4 21 7.2Q17.6 8 16.8 11.4Q16 8 12.6 7.2Q16 6.4 16.8 3z',
            'M20.2 12.2Q20.7 13.9 22.4 14.4Q20.7 14.9 20.2 16.6Q19.7 14.9 18 14.4Q19.7 13.9 20.2 12.2z',
        ],
    },
    {
        // shield.ts: heater silhouette (apex (12,2), shoulders to (20,5)/
        // (4,5), bottom point (12,22)) + ~1.6-unit INSET BORDER hole
        // (apex (12,3.7), bottom (12,20.4)) + bold chevron emblem refill —
        // border (1) → field hole (2) → emblem (3) evenodd depth arithmetic,
        // ONE element (shield.ts GEOMETRY note).
        name: 'shield',
        icon: ICON_SHIELD,
        svg: svgShield,
        component: ShieldIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M12 2L20 5V11C20 16.25 16.6 19.6 12 22C7.4 19.6 4 16.25 4 11V5ZM12 3.7L18.4 6.1V11C18.4 15.4 15.5 18.3 12 20.4C8.5 18.3 5.6 15.4 5.6 11V6.1ZM12 7.8L17 12.4V15L12 10.6L7 15V12.4Z',
            },
        ],
        signature: [
            'M12 2L20 5V11C20 16.25 16.6 19.6 12 22C7.4 19.6 4 16.25 4 11V5Z',
            'M12 3.7L18.4 6.1V11C18.4 15.4 15.5 18.3 12 20.4C8.5 18.3 5.6 15.4 5.6 11V6.1Z',
            'M12 7.8L17 12.4V15L12 10.6L7 15V12.4Z',
        ],
    },
    {
        // potion.ts: ONE evenodd element carrying glass (1) → cavity (2) →
        // liquid refill from surface y 13.4 (3) → TWO bubbles punched at
        // (10.2,16.9) r 0.85 / (13.6,18.4) r 0.65 (4); the r-2.2/r-1.4
        // sweep-1 corner arcs close both flare silhouettes. Cork rounded
        // rect + fizz dot are SEPARATE paints over the transparent cavity.
        name: 'potion',
        icon: ICON_POTION,
        svg: svgPotion,
        component: PotionIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M9 2H15V4H14V8.3L19.4 18.6A2.2 2.2 0 0 1 17.4 21.7H6.6A2.2 2.2 0 0 1 4.6 18.6L10 8.3V4H9ZM11 4.9H13V8.4L17.9 18.2A1.4 1.4 0 0 1 16.6 20.3H7.4A1.4 1.4 0 0 1 6.1 18.2L11 8.4ZM8.5 13.4H15.5L17.9 18.2A1.4 1.4 0 0 1 16.6 20.3H7.4A1.4 1.4 0 0 1 6.1 18.2ZM9.35 16.9a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0zM12.95 18.4a0.65 0.65 0 1 0 1.3 0a0.65 0.65 0 1 0 -1.3 0z',
            },
            { kind: 'rect', x: '10.6', y: '0.6', w: '2.8', h: '1.8', rx: '0.7' },
            { kind: 'circle', cx: '12', cy: '10.9', r: '0.75' },
        ],
        signature: [
            'M11 4.9H13V8.4L17.9 18.2A1.4 1.4 0 0 1 16.6 20.3H7.4A1.4 1.4 0 0 1 6.1 18.2L11 8.4Z',
            'M8.5 13.4H15.5L17.9 18.2A1.4 1.4 0 0 1 16.6 20.3H7.4A1.4 1.4 0 0 1 6.1 18.2Z',
            'M9.35 16.9a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0zM12.95 18.4a0.65 0.65 0 1 0 1.3 0a0.65 0.65 0 1 0 -1.3 0z',
        ],
    },
    {
        // scroll.ts: top roll rect (x 3..21, y 3..7, rx 2) + evenodd body
        // path (x 5..19, y 5..19) with FOUR writing-line holes (height 1.1,
        // pitch 2.8, varied right ends: y 7.6→16.4, 10.4→14.2, 13.2→16.4,
        // 16→12.4) + bottom roll rect (y 17..21) painting OVER line 4's
        // 0.1 tuck-under sliver (scroll.ts LITERAL ELEMENTS note).
        name: 'scroll',
        icon: ICON_SCROLL,
        svg: svgScroll,
        component: ScrollIcon,
        paints: [
            { kind: 'rect', x: '3', y: '3', w: '18', h: '4', rx: '2' },
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M5 5H19V19H5ZM7.6 7.6H16.4V8.7H7.6ZM7.6 10.4H14.2V11.5H7.6ZM7.6 13.2H16.4V14.3H7.6ZM7.6 16H12.4V17.1H7.6Z',
            },
            { kind: 'rect', x: '3', y: '17', w: '18', h: '4', rx: '2' },
        ],
        signature: [
            'M7.6 7.6H16.4V8.7H7.6ZM7.6 10.4H14.2V11.5H7.6ZM7.6 13.2H16.4V14.3H7.6ZM7.6 16H12.4V17.1H7.6Z',
        ],
    },
    {
        // spellbook.ts: rounded tome (x 5..19, y 3..21, corner r 2) with the
        // full-height SPINE slot (x 7.1..7.9) splitting the left band off,
        // the concave 4-point RUNE sparkle (arm 3.2 at (13.5,12)) and TWO
        // mote-dot holes (r 0.7 at (17.1,8.6), r 0.6 at (10.2,16.4)) — all
        // holes nest inside the tome subpath, ONE evenodd element.
        name: 'spellbook',
        icon: ICON_SPELLBOOK,
        svg: svgSpellbook,
        component: SpellbookIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M7 3H17A2 2 0 0 1 19 5V19A2 2 0 0 1 17 21H7A2 2 0 0 1 5 19V5A2 2 0 0 1 7 3ZM7.1 3H7.9V21H7.1ZM13.5 8.8Q14.1 11.4 16.7 12Q14.1 12.6 13.5 15.2Q12.9 12.6 10.3 12Q12.9 11.4 13.5 8.8ZM16.4 8.6a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0zM9.6 16.4a0.6 0.6 0 1 0 1.2 0a0.6 0.6 0 1 0 -1.2 0z',
            },
        ],
        signature: [
            'M7.1 3H7.9V21H7.1Z',
            'M13.5 8.8Q14.1 11.4 16.7 12Q14.1 12.6 13.5 15.2Q12.9 12.6 10.3 12Q12.9 11.4 13.5 8.8Z',
            'M16.4 8.6a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0zM9.6 16.4a0.6 0.6 0 1 0 1.2 0a0.6 0.6 0 1 0 -1.2 0z',
        ],
    },
    {
        // crown.ts: three-spike body + flush base bar (x 4..20, y 16..18.5)
        // with THREE r-0.8 band-jewel holes punched at (7.5/12/16.5, 17.25)
        // in ONE evenodd element; the THREE orb finials (r 1.05 at
        // (4,7.3)/(20,7.3), r 1.15 at (12,4.7)) are a SEPARATE flat path —
        // each overlaps its spike tip and same-path overlap would XOR
        // (crown.ts ORB FINIALS note).
        name: 'crown',
        icon: ICON_CROWN,
        svg: svgCrown,
        component: CrownIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M4 16V8L7.8 10.8L12 5.5L16.2 10.8L20 8V16ZM4 16H20V18.5H4ZM6.7 17.25a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0zM11.2 17.25a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0zM15.7 17.25a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0z',
            },
            {
                kind: 'path',
                rule: null,
                d: 'M4 6.25a1.05 1.05 0 1 1 0 2.1a1.05 1.05 0 1 1 0-2.1zM12 3.55a1.15 1.15 0 1 1 0 2.3a1.15 1.15 0 1 1 0-2.3zM20 6.25a1.05 1.05 0 1 1 0 2.1a1.05 1.05 0 1 1 0-2.1z',
            },
        ],
        signature: [
            'M6.7 17.25a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0zM11.2 17.25a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0zM15.7 17.25a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0z',
            'M4 6.25a1.05 1.05 0 1 1 0 2.1a1.05 1.05 0 1 1 0-2.1zM12 3.55a1.15 1.15 0 1 1 0 2.3a1.15 1.15 0 1 1 0-2.3zM20 6.25a1.05 1.05 0 1 1 0 2.1a1.05 1.05 0 1 1 0-2.1z',
        ],
    },
    {
        // gem.ts: brilliant silhouette (table (6,5)..(18,5), girdle (3,10)/
        // (21,10), culet (12,21)) with the CONFINED girdle slot band
        // (y 9.6..10.4, top x 3.24..20.76, bottom x 3.32727..20.67273 —
        // rides the silhouette lines exactly, zero poke), TWO crown slots
        // from the table corners and TWO pavilion wedges converging at the
        // culet — all ONE evenodd element (gem.ts GEOMETRY note).
        name: 'gem',
        icon: ICON_GEM,
        svg: svgGem,
        component: GemIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M12 21L3 10L6 5H18L21 10ZM3.24 9.6H20.76L21 10L20.67273 10.4H3.32727L3 10ZM6 5L9 9.6H9.8L6.8 5ZM17.2 5H18L15 9.6H14.2ZM9 10.4H9.8L12 21ZM14.2 10.4H15L12 21Z',
            },
        ],
        signature: [
            'M12 21L3 10L6 5H18L21 10Z',
            'M3.24 9.6H20.76L21 10L20.67273 10.4H3.32727L3 10Z',
            'M6 5L9 9.6H9.8L6.8 5ZM17.2 5H18L15 9.6H14.2Z',
            'M9 10.4H9.8L12 21ZM14.2 10.4H15L12 21Z',
        ],
    },
    {
        // key.ts: ornate diamond bow ((7,7)(12,12)(7,17)(2,12)) with the
        // r-1.9 pierced hole at (7,12) in ONE evenodd element; collar+shaft
        // (y 10.2..13.8 raised collar at x 11..12.2, shaft y 11..13 to x
        // 19.4), tooth and the STEPPED L-shaped bit plate are a SEPARATE
        // flat path (bow/shaft overlap x 11..12 — cross-element union,
        // key.ts GEOMETRY note).
        name: 'key',
        icon: ICON_KEY,
        svg: svgKey,
        component: KeyIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M7 7L12 12L7 17L2 12ZM5.1 12a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0z',
            },
            {
                kind: 'path',
                rule: null,
                d: 'M11 10.2H12.2V11H19.4V13H12.2V13.8H11ZM14 13H15.6V15.4H14ZM17 13H19.6V17.2H18V15.4H17Z',
            },
        ],
        signature: [
            'M7 7L12 12L7 17L2 12ZM5.1 12a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0z',
            'M11 10.2H12.2V11H19.4V13H12.2V13.8H11Z',
            'M17 13H19.6V17.2H18V15.4H17Z',
        ],
    },
    {
        // mace.ts: radial-flange head (eight flange spikes out to
        // (21,7)/(20,13)/(3,7)/(4,13)) with the inner head cavity
        // ((12,5)(8,8)(9,11)(15,11)(16,8)) and the hollow r-2 boss slot
        // (x 11..13, y 6..10) cut in ONE evenodd element; THREE separated
        // grip bands (y 14..17, 18..20, 21..23 stepping narrower) ride as
        // the second flat path (mace.ts header).
        name: 'mace',
        icon: ICON_MACE,
        svg: svgMace,
        component: MaceIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M10 1H14L15 4L18 3L21 7L19 10L20 13L16 15L14 13H10L8 15L4 13L5 10L3 7L6 3L9 4ZM12 5L8 8L9 11H15L16 8ZM11 6H13V10H11Z',
            },
            {
                kind: 'path',
                rule: null,
                d: 'M10.5 14H13.5V17H10.5ZM10 18H14V20H10ZM9.5 21H14.5V23H9.5Z',
            },
        ],
        signature: [
            'M10 1H14L15 4L18 3L21 7L19 10L20 13L16 15L14 13H10L8 15L4 13L5 10L3 7L6 3L9 4Z',
            'M12 5L8 8L9 11H15L16 8Z',
            'M11 6H13V10H11Z',
            'M10.5 14H13.5V17H10.5ZM10 18H14V20H10ZM9.5 21H14.5V23H9.5Z',
        ],
    },
    {
        // vial.ts: TWO lip bars (y 1..4 and y 5..7) as the flat path, then
        // the tube ((9,8)..(15,20) with the Q r-3 rounded bottom at y 23)
        // whose transparent HEADROOM slot (x 10.5..13.5 down to the Q-
        // meniscus liquid line y 14) is cut INSIDE the tube's evenodd d —
        // the liquid reads as the filled remainder below y 14 (vial.ts
        // header).
        name: 'vial',
        icon: ICON_VIAL,
        svg: svgVial,
        component: VialIcon,
        paints: [
            { kind: 'path', rule: null, d: 'M9 1H15V4H9ZM8 5H16V7H8Z' },
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M9 8H15V20Q15 23 12 23Q9 23 9 20ZM10.5 9.5V14Q12 13 13.5 14V9.5Z',
            },
        ],
        signature: [
            'M9 1H15V4H9ZM8 5H16V7H8Z',
            'M9 8H15V20Q15 23 12 23Q9 23 9 20Z',
            'M10.5 9.5V14Q12 13 13.5 14V9.5Z',
        ],
    },
    {
        // dagger.ts: leaf blade ((12,1)(16,7)(14,13)(10,13)(8,7)) with the
        // central fuller wedge ((12,4)(11,8)(12,11)(13,8)) in ONE evenodd
        // element; swept guard + TWO wrapped grip bands + pommel bar are
        // the second flat path (dagger.ts header).
        name: 'dagger',
        icon: ICON_DAGGER,
        svg: svgDagger,
        component: DaggerIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M12 1L16 7L14 13H10L8 7ZM12 4L11 8L12 11L13 8Z',
            },
            {
                kind: 'path',
                rule: null,
                d: 'M6 12L10 14H14L18 12V15L14 16H10L6 15ZM10.5 17H13.5V18.5H10.5ZM10.5 19.5H13.5V21H10.5ZM10 22H14V23H10Z',
            },
        ],
        signature: [
            'M12 1L16 7L14 13H10L8 7ZM12 4L11 8L12 11L13 8Z',
            'M6 12L10 14H14L18 12V15L14 16H10L6 15Z',
            'M10.5 17H13.5V18.5H10.5ZM10.5 19.5H13.5V21H10.5ZM10 22H14V23H10Z',
        ],
    },
    {
        // bow.ts: recurved limbs (upper (6,1)→(18,12)→lower (6,23)) + string
        // bar (x 6..7) + nocked horizontal arrow (shaft y 11..13 with the
        // (23,12) head and (1..2) fletch tails) as three disjoint-enough
        // subpaths of ONE flat path — nonzero unions the limb/shaft overlap,
        // no evenodd anywhere (bow.ts header).
        name: 'bow',
        icon: ICON_BOW,
        svg: svgBow,
        component: BowIcon,
        paints: [
            {
                kind: 'path',
                rule: null,
                d: 'M6 1Q21 5 18 12Q21 19 6 23L8 20Q17 17 15 13V11Q17 7 8 4ZM6 3H7V21H6ZM3 11H18V10L23 12L18 14V13H3L1 15V13L2 12L1 11V9Z',
            },
        ],
        signature: [
            'M6 1Q21 5 18 12Q21 19 6 23L8 20Q17 17 15 13V11Q17 7 8 4Z',
            'M6 3H7V21H6Z',
            'M3 11H18V10L23 12L18 14V13H3L1 15V13L2 12L1 11V9Z',
        ],
    },
    {
        // arrow.ts: broadhead arrow (diagonal shaft from (8,18) to the
        // (22,9)/(15,2) head barbs, tail notches at (5..8, 16..22)) + TWO
        // fletching wedges — disjoint subpaths of ONE flat path (arrow.ts
        // header).
        name: 'arrow',
        icon: ICON_ARROW,
        svg: svgArrow,
        component: ArrowIcon,
        paints: [
            {
                kind: 'path',
                rule: null,
                d: 'M15 2H22V9L19 7L8 18L8 22H5V19H2V16H6L17 5ZM3 12L6 13L4 15L1 14ZM10 18L11 21L10 24L8 21Z',
            },
        ],
        signature: [
            'M15 2H22V9L19 7L8 18L8 22H5V19H2V16H6L17 5Z',
            'M3 12L6 13L4 15L1 14ZM10 18L11 21L10 24L8 21Z',
        ],
    },
    {
        // staff.ts: crystal diamond ((12,1)(15,5)(12,9)(9,5)) seated between
        // the curved prongs band ((6,4)..(18,4) crown into the (13,12)→
        // (11,17) shaft), then TWO separated ferrule bands — disjoint
        // subpaths of ONE flat path (staff.ts header).
        name: 'staff',
        icon: ICON_STAFF,
        svg: svgStaff,
        component: StaffIcon,
        paints: [
            {
                kind: 'path',
                rule: null,
                d: 'M12 1L15 5L12 9L9 5ZM6 4H8Q7 9 11 10H13Q17 9 16 4H18Q20 11 13 12V17H11V12Q4 11 6 4ZM10 18H14V20H10ZM11 21H13V23H11Z',
            },
        ],
        signature: [
            'M12 1L15 5L12 9L9 5Z',
            'M6 4H8Q7 9 11 10H13Q17 9 16 4H18Q20 11 13 12V17H11V12Q4 11 6 4Z',
            'M10 18H14V20H10ZM11 21H13V23H11Z',
        ],
    },
    {
        // spear.ts: pierced leaf head ((12,0)(16,7)(13,11)(11,11)(8,7)) with
        // the central slit hole ((12,3)(11,7)(12,8)(13,7)) in ONE evenodd
        // element; socket band + square haft + butt cap are the second flat
        // path (spear.ts header).
        name: 'spear',
        icon: ICON_SPEAR,
        svg: svgSpear,
        component: SpearIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M12 0L16 7L13 11H11L8 7ZM12 3L11 7L12 8L13 7Z',
            },
            {
                kind: 'path',
                rule: null,
                d: 'M10 12H14V14H10ZM11 15H13V22H11ZM10.5 23H13.5V24H10.5Z',
            },
        ],
        signature: [
            'M12 0L16 7L13 11H11L8 7ZM12 3L11 7L12 8L13 7Z',
            'M10 12H14V14H10ZM11 15H13V22H11ZM10.5 23H13.5V24H10.5Z',
        ],
    },
    {
        // warhammer.ts: squared striking head (x 2..14, y 3..11) with TWO
        // inset metalwork slots ((4..5, 5..9) and (8..12, 5..9)) in ONE
        // evenodd element; opposing spike wedge + handle grip gaps
        // (y 12..16 block, bands y 17..19, 20..22, butt y 23..24) are the
        // second flat path (warhammer.ts header).
        name: 'warhammer',
        icon: ICON_WARHAMMER,
        svg: svgWarhammer,
        component: WarhammerIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M2 3H14V11H2ZM4 5V9H5V5ZM8 5V9H12V5Z',
            },
            {
                kind: 'path',
                rule: null,
                d: 'M15 5H18L23 9H15ZM9 12H12V16H9ZM8.5 17H12.5V19H8.5ZM8.5 20H12.5V22H8.5ZM8 23H13V24H8Z',
            },
        ],
        signature: [
            'M2 3H14V11H2ZM4 5V9H5V5ZM8 5V9H12V5Z',
            'M15 5H18L23 9H15Z',
            'M9 12H12V16H9ZM8.5 17H12.5V19H8.5ZM8.5 20H12.5V22H8.5ZM8 23H13V24H8Z',
        ],
    },
    {
        // helmet.ts: nasal bar stub (x 11..13, y 1..4) as the flat path,
        // then the great-helm dome ((12,4) Q-crown to the (4,11)/(20,11)
        // walls, V-split skirt to y 23) with the TWO eye slits and FOUR
        // breathing holes cut by evenodd inside the dome element
        // (helmet.ts header).
        name: 'helmet',
        icon: ICON_HELMET,
        svg: svgHelmet,
        component: HelmetIcon,
        paints: [
            { kind: 'path', rule: null, d: 'M11 1H13V4H11Z' },
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M12 4Q4 4 4 11V20L10 23V15H14V23L20 20V11Q20 4 12 4ZM6 10V12L10 13V11ZM14 11V13L18 12V10ZM6 16H8V17H6ZM6 19H8V20H6ZM16 16H18V17H16ZM16 19H18V20H16Z',
            },
        ],
        signature: [
            'M11 1H13V4H11Z',
            'M12 4Q4 4 4 11V20L10 23V15H14V23L20 20V11Q20 4 12 4Z',
            'M6 10V12L10 13V11ZM14 11V13L18 12V10Z',
            'M6 16H8V17H6ZM6 19H8V20H6ZM16 16H18V17H16ZM16 19H18V20H16Z',
        ],
    },
    {
        // armor.ts: pauldron-flanked breastplate ((7,3)(10,5)(14,5)(17,3)
        // shoulders, side plates to (19,8)/(5,8)) with the heraldic diamond
        // ((12,7)(9,10)(12,14)(15,10)) and the waist notch (x 11..13,
        // y 15..17) cut in ONE evenodd element; the TWO pauldron wedges and
        // the articulated skirt (V-split at x 11..13) are the second flat
        // path (armor.ts header).
        name: 'armor',
        icon: ICON_ARMOR,
        svg: svgArmor,
        component: ArmorIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M7 3L10 5H14L17 3L19 8L17 12V18H7V12L5 8ZM12 7L9 10L12 14L15 10ZM11 15H13V17H11Z',
            },
            {
                kind: 'path',
                rule: null,
                d: 'M2 4H5L4 9H1ZM19 4H22L23 9H20ZM7 19H17L19 23H13V21H11V23H5Z',
            },
        ],
        signature: [
            'M7 3L10 5H14L17 3L19 8L17 12V18H7V12L5 8ZM12 7L9 10L12 14L15 10ZM11 15H13V17H11Z',
            'M2 4H5L4 9H1ZM19 4H22L23 9H20Z',
            'M7 19H17L19 23H13V21H11V23H5Z',
        ],
    },
    {
        // gauntlet.ts: FOUR offset finger plates (staggered y 2..11 tops) +
        // back-of-hand plate + hinged thumb wedge + flared cuff — seven
        // disjoint subpaths of ONE flat path, no evenodd (gauntlet.ts
        // header).
        name: 'gauntlet',
        icon: ICON_GAUNTLET,
        svg: svgGauntlet,
        component: GauntletIcon,
        paints: [
            {
                kind: 'path',
                rule: null,
                d: 'M5 4L8 3V10H5ZM9 2H12V10H9ZM13 3H16V10H13ZM17 5H20V11H17ZM5 11H16V17L13 19H7L5 16ZM17 12L20 10L22 12L18 18L15 19V17ZM6 20H15L17 23H4Z',
            },
        ],
        signature: [
            'M5 4L8 3V10H5ZM9 2H12V10H9ZM13 3H16V10H13ZM17 5H20V11H17Z',
            'M5 11H16V17L13 19H7L5 16Z',
            'M17 12L20 10L22 12L18 18L15 19V17Z',
            'M6 20H15L17 23H4Z',
        ],
    },
    {
        // boots.ts: left boot (cuff y 2..5, shaft to the (11,14) toe step)
        // + right cuff + the shared sole bar (y 22..24) as the flat path;
        // the right boot shaft ((14,9)..(23,18) heel flare, y 21 foot) with
        // TWO transparent buckle slots (y 11..13 and y 15..17, x 16..19) is
        // the evenodd element (boots.ts header).
        name: 'boots',
        icon: ICON_BOOTS,
        svg: svgBoots,
        component: BootsIcon,
        paints: [
            {
                kind: 'path',
                rule: null,
                d: 'M2 2H10V5H2ZM3 6H9V12L11 14V17H2V14H3ZM13 5H22V8H13ZM12 22H23V24H12Z',
            },
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M14 9H21V16L23 18V21H12V18H14ZM16 11V13H19V11ZM16 15V17H19V15Z',
            },
        ],
        signature: [
            'M2 2H10V5H2ZM3 6H9V12L11 14V17H2V14H3Z',
            'M14 9H21V16L23 18V21H12V18H14Z',
            'M16 11V13H19V11ZM16 15V17H19V15Z',
            'M12 22H23V24H12Z',
        ],
    },
    {
        // ring.ts: faceted gemstone ((8,1)(16,1) table to (19,5)/(5,5) girdle
        // points, (12,10) pavilion tip) with the left-shoulder facet cut
        // ((8,4)(12,7)(10,4)) in ONE evenodd element; the BAND annulus
        // (outer r 8 / inner r 5, concentric at (12,15) so the base stays
        // inside the 24px viewBox — ring.ts header) is the SECOND evenodd
        // element.
        name: 'ring',
        icon: ICON_RING,
        svg: svgRing,
        component: RingIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M8 1H16L19 5L12 10L5 5ZM8 4L12 7L10 4Z',
            },
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M20 15A8 8 0 1 1 4 15A8 8 0 1 1 20 15ZM17 15A5 5 0 1 1 7 15A5 5 0 1 1 17 15Z',
            },
        ],
        signature: [
            'M8 1H16L19 5L12 10L5 5ZM8 4L12 7L10 4Z',
            'M20 15A8 8 0 1 1 4 15A8 8 0 1 1 20 15ZM17 15A5 5 0 1 1 7 15A5 5 0 1 1 17 15Z',
        ],
    },
    {
        // amulet.ts: open V necklace chains (x 5..7 / 17..19 from y 1 into
        // the (9..15, 8) bail bar, meeting the (14,11)/(10,11) pendant
        // shoulders) as the flat path; the diamond pendant ((12,10)(20,16)
        // (12,24)(4,16)) with the inner diamond ring and the central rune
        // diamond cut by evenodd inside it (amulet.ts header).
        name: 'amulet',
        icon: ICON_AMULET,
        svg: svgAmulet,
        component: AmuletIcon,
        paints: [
            {
                kind: 'path',
                rule: null,
                d: 'M5 1H7L9 8H15L17 1H19L17 9L14 11H10L7 9Z',
            },
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M12 10L20 16L12 24L4 16ZM12 13L8 16L12 20L16 16ZM12 15L14 16L12 18L10 16Z',
            },
        ],
        signature: [
            'M5 1H7L9 8H15L17 1H19L17 9L14 11H10L7 9Z',
            'M12 10L20 16L12 24L4 16Z',
            'M12 13L8 16L12 20L16 16ZM12 15L14 16L12 18L10 16Z',
        ],
    },
    {
        // torch.ts: flame (Q-curved tongue from (13,0) out to (18,7)/(21,13)
        // down to the (8..16, 15) base) with the hollow flame core
        // ((12,8) Q-teardrop) cut by evenodd in ONE element; the iron
        // basket bar (x 7..17, y 16..18) and the tapered handle ((9,19) →
        // (13,24) tip) are the second flat path (torch.ts header).
        name: 'torch',
        icon: ICON_TORCH,
        svg: svgTorch,
        component: TorchIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M13 0Q14 5 18 7Q21 13 16 15H8Q3 12 7 7L9 4L10 8Q13 5 13 0ZM12 8Q7 12 12 14Q17 12 12 8Z',
            },
            { kind: 'path', rule: null, d: 'M7 16H17V18H7ZM9 19H15L13 24H11Z' },
        ],
        signature: [
            'M13 0Q14 5 18 7Q21 13 16 15H8Q3 12 7 7L9 4L10 8Q13 5 13 0Z',
            'M12 8Q7 12 12 14Q17 12 12 8Z',
            'M7 16H17V18H7ZM9 19H15L13 24H11Z',
        ],
    },
    {
        // backpack.ts: bedroll capsule (x 3..21, y 1..7, Q-rounded ends) +
        // TWO side straps (x 1..3 / 21..23, y 12..21) as the flat path; the
        // pack body ((5,8)..(19,23)) with the flap buckle slot ((7..10 ∪
        // 14..17, y 10..13) around the (10..14, 11..13) tab) and the outer
        // pocket ((8..16, 16..21) minus the (10..14, 17..19) slit) cut by
        // evenodd inside it (backpack.ts header).
        name: 'backpack',
        icon: ICON_BACKPACK,
        svg: svgBackpack,
        component: BackpackIcon,
        paints: [
            {
                kind: 'path',
                rule: null,
                d: 'M6 1H18Q21 1 21 4Q21 7 18 7H6Q3 7 3 4Q3 1 6 1ZM1 12H3V21H1ZM21 12H23V21H21Z',
            },
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M5 8H19V23H5ZM7 10V13H10V11H14V13H17V10ZM8 16V21H16V16ZM10 17H14V19H10Z',
            },
        ],
        signature: [
            'M6 1H18Q21 1 21 4Q21 7 18 7H6Q3 7 3 4Q3 1 6 1ZM1 12H3V21H1ZM21 12H23V21H21Z',
            'M7 10V13H10V11H14V13H17V10Z',
            'M8 16V21H16V16ZM10 17H14V19H10Z',
        ],
    },
    {
        // chest.ts: rounded lid ((2,11) up the r-5 Q-corners to y 3) with
        // TWO corner strap recesses + the hasp-notched body ((2,13) plate
        // dipping to (9..15, 17)) with TWO corner recesses in ONE evenodd
        // element; the keyhole plate ((10..14, 12..16) minus the
        // (11.5..12.5, 13..15) slot) is a SEPARATE evenodd element because
        // it bridges the lid/body gap (y 11..13) — cross-element overlap
        // unions (chest.ts header).
        name: 'chest',
        icon: ICON_CHEST,
        svg: svgChest,
        component: ChestIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M2 11V8Q2 3 7 3H17Q22 3 22 8V11ZM5 6V10H7V6ZM17 6V10H19V6ZM2 13H9V17H15V13H22V22H2ZM5 15V20H7V15ZM17 15V20H19V15Z',
            },
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M10 12H14V16H10ZM11.5 13V15H12.5V13Z',
            },
        ],
        signature: [
            'M2 11V8Q2 3 7 3H17Q22 3 22 8V11ZM5 6V10H7V6ZM17 6V10H19V6ZM2 13H9V17H15V13H22V22H2ZM5 15V20H7V15ZM17 15V20H19V15Z',
            'M10 12H14V16H10ZM11.5 13V15H12.5V13Z',
        ],
    },
    {
        // coins.ts: FOUR stacked coin tiers (top ellipse-tier (2..14, 2..8)
        // + three stepped, offset slip tiers down to (11,22)) as the flat
        // path; the engraved foreground coin (r 6 at (17,16)) with the
        // outer diamond engraving cut and the inner diamond refill
        // (evenodd depth 3) is the evenodd element (coins.ts header).
        name: 'coins',
        icon: ICON_COINS,
        svg: svgCoins,
        component: CoinsIcon,
        paints: [
            {
                kind: 'path',
                rule: null,
                d: 'M2 5Q2 2 8 2Q14 2 14 5Q14 8 8 8Q2 8 2 5ZM2 8Q6 11 12 9L10 12Q4 13 2 11ZM2 13Q5 15 9 14V17Q4 18 2 16ZM2 18Q5 20 9 19L11 22Q4 23 2 21Z',
            },
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M23 16A6 6 0 1 1 11 16A6 6 0 1 1 23 16ZM17 12L14 16L17 20L20 16ZM17 14L18.5 16L17 18L15.5 16Z',
            },
        ],
        signature: [
            'M2 5Q2 2 8 2Q14 2 14 5Q14 8 8 8Q2 8 2 5ZM2 8Q6 11 12 9L10 12Q4 13 2 11ZM2 13Q5 15 9 14V17Q4 18 2 16ZM2 18Q5 20 9 19L11 22Q4 23 2 21Z',
            'M23 16A6 6 0 1 1 11 16A6 6 0 1 1 23 16ZM17 12L14 16L17 20L20 16ZM17 14L18.5 16L17 18L15.5 16Z',
        ],
    },
    {
        // dice.ts: d20 silhouette ((12,1)(22,7)(22,18)(12,24)(2,18)(2,7))
        // with SEVEN inset triangular facet holes (top face, left/right
        // edge triangles, center triangle, two lower facets) cut by evenodd
        // in ONE element (dice.ts header).
        name: 'dice',
        icon: ICON_DICE,
        svg: svgDice,
        component: DiceIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M12 1L22 7V18L12 24L2 18V7ZM12 4L8 10H16ZM5 8V16L8 12ZM19 8L16 12L19 16ZM10 12L12 18L14 12ZM5 18L10 21L8 14ZM19 18L16 14L14 21Z',
            },
        ],
        signature: [
            'M12 1L22 7V18L12 24L2 18V7Z',
            'M12 4L8 10H16Z',
            'M5 8V16L8 12ZM19 8L16 12L19 16ZM10 12L12 18L14 12ZM5 18L10 21L8 14ZM19 18L16 14L14 21Z',
        ],
    },
    {
        // skull.ts: cranium dome ((12,1) Q-shoulders to (2,10)/(22,10), jaw
        // plates to (6,18)/(18,18), teeth bands at y 19..23) with TWO deep
        // eye sockets, the nasal cavity wedge and the tooth gaps cut by
        // evenodd in ONE element (skull.ts header).
        name: 'skull',
        icon: ICON_SKULL,
        svg: svgSkull,
        component: SkullIcon,
        paints: [
            {
                kind: 'path',
                rule: 'evenodd',
                d: 'M12 1Q2 1 2 10V15L6 18V22H9V19H10V23H14V19H15V22H18V18L22 15V10Q22 1 12 1ZM5 9V13L9 14L10 10ZM14 10L15 14L19 13V9ZM12 14L10 17H14Z',
            },
        ],
        signature: [
            'M12 1Q2 1 2 10V15L6 18V22H9V19H10V23H14V19H15V22H18V18L22 15V10Q22 1 12 1Z',
            'M5 9V13L9 14L10 10ZM14 10L15 14L19 13V9ZM12 14L10 17H14Z',
        ],
    },
];

describe('fantasy per-module contract (FANTASY-REDRAW + 20 RPG additions)', () => {
    it('pins every ICON_<NAME> constant to the hand-transcribed source bytes, byte-exact', () => {
        for (const fantasy of FANTASIES) {
            // DEFINITION BYTES: the module constant equals the paint table
            // composed with the exact element templates — any geometry,
            // attribute-order or element-split drift fails byte-for-byte.
            expect(fantasy.icon).toBe(composeContent(fantasy.paints));
        }
    });

    it('renders every module factory as the documented shell around its own definition, byte-exact', () => {
        for (const fantasy of FANTASIES) {
            // OUTPUT CONTRACT (../svg-icon.ts): xmlns → viewBox →
            // width="1em" → height="1em" → fill="currentColor", then the
            // module's ICON_<NAME> content verbatim.
            expect(fantasy.svg()).toBe(SHELL_OPEN + fantasy.icon + SHELL_CLOSE);
            // REGISTRATION: importing the module alone registered its name —
            // the live registry resolves to the identical string.
            expect(svgIcon(fantasy.name)).toBe(fantasy.svg());
        }
    });

    it('parses every full render as a standalone SVG document with the exact per-module element census', () => {
        for (const fantasy of FANTASIES) {
            // XML VALIDITY: a <parsererror> report element means malformed
            // markup (never expected: every definition is well-formed).
            const doc = new DOMParser().parseFromString(fantasy.svg(), 'image/svg+xml');
            expect(doc.querySelector('parsererror')).toBeNull();
            // Standalone-SVG root on the shared 24×24 grid, 1em square,
            // currentColor-filled.
            expect(doc.documentElement.tagName).toBe('svg');
            expect(doc.documentElement.getAttribute('viewBox')).toBe('0 0 24 24');
            expect(doc.documentElement.getAttribute('width')).toBe('1em');
            expect(doc.documentElement.getAttribute('height')).toBe('1em');
            expect(doc.documentElement.getAttribute('fill')).toBe('currentColor');
            // Exact per-module census derived from the paint table; the
            // fantasy set uses NO <g> wrappers and NO <ellipse> elements.
            const expectedPaths = fantasy.paints.filter((paint) => paint.kind === 'path').length;
            const expectedCircles = fantasy.paints.filter((paint) => paint.kind === 'circle').length;
            const expectedRects = fantasy.paints.filter((paint) => paint.kind === 'rect').length;
            expect(doc.getElementsByTagName('path').length).toBe(expectedPaths);
            expect(doc.getElementsByTagName('circle').length).toBe(expectedCircles);
            expect(doc.getElementsByTagName('rect').length).toBe(expectedRects);
            expect(doc.getElementsByTagName('g').length).toBe(0);
            expect(doc.getElementsByTagName('ellipse').length).toBe(0);
            // Flat-design presentation contract on EVERY path element:
            // solid currentColor fill, stroke disabled (fill-rule varies).
            for (const path of Array.from(doc.getElementsByTagName('path'))) {
                expect(path.getAttribute('fill')).toBe('currentColor');
                expect(path.getAttribute('stroke')).toBe('none');
            }
        }
    });

    it('carries the exact per-element structure — definition order, [d, fill-rule], literal circle/rect geometry', () => {
        for (const fantasy of FANTASIES) {
            const doc = new DOMParser().parseFromString(svgIcon(fantasy.name), 'image/svg+xml');
            const children = Array.from(doc.documentElement.children);
            // ELEMENT ORDER: the tags appear in definition order — scroll
            // sandwiches its body path between the two roll rects, axe
            // appends its pommel circle, potion its cork rect then fizz
            // circle, wand its two sparkle dots.
            expect(children.map((element) => element.tagName)).toEqual(
                fantasy.paints.map((paint) =>
                    paint.kind === 'path' ? 'path' : paint.kind === 'circle' ? 'circle' : 'rect'
                )
            );
            // PATH PAINTS: exact [d, fill-rule] per element in definition
            // order — the element-split paint contract (overlap unions ride
            // as separate elements; holes ride INSIDE their silhouette's
            // evenodd d) is load-bearing here.
            expect(
                Array.from(doc.getElementsByTagName('path')).map((path) => [
                    path.getAttribute('d'),
                    path.getAttribute('fill-rule'),
                ])
            ).toEqual(
                fantasy.paints
                    .filter((paint): paint is PathPaint => paint.kind === 'path')
                    .map((paint) => [paint.d, paint.rule])
            );
            // LITERAL CIRCLES: axe pommel knob, wand sparkle dots, potion
            // fizz dot — exact cx/cy/r as the parser reports them.
            expect(
                Array.from(doc.getElementsByTagName('circle')).map((circle) => [
                    circle.getAttribute('cx'),
                    circle.getAttribute('cy'),
                    circle.getAttribute('r'),
                ])
            ).toEqual(
                fantasy.paints
                    .filter((paint): paint is CirclePaint => paint.kind === 'circle')
                    .map((paint) => [paint.cx, paint.cy, paint.r])
            );
            // LITERAL RECTS: potion cork, scroll rolls — exact x/y/w/h/rx.
            expect(
                Array.from(doc.getElementsByTagName('rect')).map((rect) => [
                    rect.getAttribute('x'),
                    rect.getAttribute('y'),
                    rect.getAttribute('width'),
                    rect.getAttribute('height'),
                    rect.getAttribute('rx'),
                ])
            ).toEqual(
                fantasy.paints
                    .filter((paint): paint is RectPaint => paint.kind === 'rect')
                    .map((paint) => [paint.x, paint.y, paint.w, paint.h, paint.rx])
            );
        }
    });

    it('cuts every detail hole explicitly with the exact fill-rule="evenodd" census per module', () => {
        for (const fantasy of FANTASIES) {
            // EVENODD CENSUS (the winding-bug guard): the count of explicit
            // fill-rule="evenodd" attributes equals the evenodd paint
            // elements; bow/arrow/staff/gauntlet/wand cut NOTHING (their
            // subpaths are disjoint or nonzero-unioned) — match() returning
            // null is the exact absence assertion for the zero case.
            const expectedEvenodd = fantasy.paints.filter(
                (paint) => paint.kind === 'path' && paint.rule === 'evenodd'
            ).length;
            expect(fantasy.icon.match(/fill-rule="evenodd"/g)).toEqual(
                expectedEvenodd === 0
                    ? null
                    : new Array(expectedEvenodd).fill('fill-rule="evenodd"')
            );
            // Distinctive detail fragments — each module's redraw details
            // (fuller, bevel, meniscus, facets, flanges, holes) transcribed
            // from its source and cross-verified against the probe; a
            // re-laid detail breaks the fragment pin byte-for-byte.
            for (const fragment of fantasy.signature) {
                expect(fantasy.icon).toContain(fragment);
            }
        }
    });

    it('exposes all 30 fantasy icons contiguously through builtins, the root barrel and the gallery subset', () => {
        // BUILTINS ORDER: 23 generic keys precede the fantasy block; the 30
        // fantasy names sit at indices 23..52 in fantasy/index.ts order,
        // followed by the 24 REGISTRY-EXPANSION flags.
        const keys = Object.keys(svgIcons);
        expect(keys.length).toBe(23 + 30 + 24 + 60 + 19 + 18 + 3 + 7 + 23);
        const fantasyKeys = keys.slice(23, 23 + 30);
        expect(fantasyKeys).toEqual(FANTASIES.map((fantasy) => fantasy.name));
        expect(keys[23 + 30]).toBe('flag'); // the flags block starts next
        // Each builtins factory IS the module's own factory (same registry
        // name resolves to the identical string).
        for (const fantasy of FANTASIES) {
            expect(svgIcons[fantasy.name]()).toBe(fantasy.svg());
        }
        // ROOT BARREL: every module's svg factory, ICON constant and
        // component re-export through ../index under the computed export
        // names (svg<Name> / ICON_<NAME> / <Name>Icon) — same binding identity.
        const pascal = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1);
        for (const fantasy of FANTASIES) {
            const svgExport = rootBarrel['svg' + pascal(fantasy.name)] as SvgIconFactory;
            const iconExport = rootBarrel['ICON_' + fantasy.name.toUpperCase()] as string;
            const componentExport = rootBarrel[pascal(fantasy.name) + 'Icon'];
            expect(svgExport).toBe(fantasy.svg);
            expect(iconExport).toBe(fantasy.icon);
            expect(typeof componentExport).toBe('function');
        }
        // GALLERY (ui/main.ts bootstrap): its explicit Fantasy subset row
        // lists all 30 names in the same order (read as source text — the
        // bootstrap itself is DOM-app code, not importable under jsdom).
        const uiSource = readFileSync(resolve(__dirname, '../../../ui/main.ts'), 'utf8');
        expect(uiSource).toContain(
            "['Fantasy', [" + fantasyKeys.map((key) => `'${key}'`).join(', ') + ']]'
        );
    });

    it('applies numeric size as px and string size verbatim on every string factory, byte-exact', () => {
        for (const fantasy of FANTASIES) {
            // Number size → px on BOTH axes (resolveSize in ../svg-icon.ts).
            expect(fantasy.svg({ size: 32 })).toBe(shell('32px') + fantasy.icon + SHELL_CLOSE);
            // String size → verbatim CSS (text-relative sizing).
            expect(fantasy.svg({ size: '2em' })).toBe(shell('2em') + fantasy.icon + SHELL_CLOSE);
        }
        // FULL exact output for an option combination on the set head:
        // xmlns → viewBox → width → height → fill → class → extra
        // attributes (fixed svg-icon.ts parts order, attributes last).
        expect(
            svgSword({
                size: 32,
                fill: '#4ade80',
                className: 'rpg',
                attributes: { 'aria-label': 'Sword', role: 'img' },
            })
        ).toBe(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32px" height="32px" fill="#4ade80" class="rpg" aria-label="Sword" role="img">' +
                ICON_SWORD +
                '</svg>'
        );
        // …and on the set tail (late-alphabet registration-order guard):
        expect(
            svgSkull({
                size: '1em',
                fill: '#f59e0b',
                className: 'loot',
                attributes: { role: 'img', 'aria-label': 'Skull' },
            })
        ).toBe(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="#f59e0b" class="loot" role="img" aria-label="Skull">' +
                ICON_SKULL +
                '</svg>'
        );
    });

    describe('string/React parity — every <Name>Icon through the exact IconBase shell', () => {
        afterEach(cleanup);

        it('renders the shared flat shell defaults carrying the module definition exactly', () => {
            for (const fantasy of FANTASIES) {
                const { container } = render(React.createElement(fantasy.component));
                const el = container.querySelector(
                    `svg[data-icon="${fantasy.name}"]`
                ) as SVGSVGElement | null;
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
                // STRING/REACT PARITY: the component's innerHTML equals the
                // module's ICON_<NAME> constant serialized through the SAME
                // jsdom machinery (self-closing elements read back as
                // open/close pairs, attribute order preserved) — both layers
                // consume the identical geometry bytes.
                expect(el.innerHTML).toBe(serialized(fantasy.icon));
            }
        });

        it('forwards size, color and accessibility props over the shell defaults exactly', () => {
            for (const fantasy of FANTASIES) {
                // SIZE (number → px, width AND height stay locked together).
                const sized = render(React.createElement(fantasy.component, { size: 24 }));
                const sizedEl = sized.container.querySelector(
                    `svg[data-icon="${fantasy.name}"]`
                ) as SVGSVGElement;
                expect(sizedEl.getAttribute('width')).toBe('24');
                expect(sizedEl.getAttribute('height')).toBe('24');
                expect(sizedEl.getAttribute('viewBox')).toBe('0 0 24 24');
                // SIZE (string → verbatim CSS).
                const emSized = render(React.createElement(fantasy.component, { size: '2em' }));
                const emEl = emSized.container.querySelector(
                    `svg[data-icon="${fantasy.name}"]`
                ) as SVGSVGElement;
                expect(emEl.getAttribute('width')).toBe('2em');
                expect(emEl.getAttribute('height')).toBe('2em');
                // COLOR: a consumer fill overrides the currentColor shell
                // default (spread props land AFTER the defaults in
                // ../react.tsx IconBase) while the flat stroke stays none —
                // geometry bytes are untouched by forwarding.
                const colored = render(
                    React.createElement(fantasy.component, { fill: '#1d4ed8' })
                );
                const coloredEl = colored.container.querySelector(
                    `svg[data-icon="${fantasy.name}"]`
                ) as SVGSVGElement;
                expect(coloredEl.getAttribute('fill')).toBe('#1d4ed8');
                expect(coloredEl.getAttribute('stroke')).toBe('none');
                expect(coloredEl.innerHTML).toBe(serialized(fantasy.icon));
                // ACCESSIBILITY: a consumer overrides the decorative a11y
                // defaults (aria-hidden → false + a real label) while
                // focusable=false and the data-icon hook persist.
                const labelled = render(
                    React.createElement(fantasy.component, {
                        'aria-hidden': 'false',
                        'aria-label': fantasy.name,
                    })
                );
                const labelledEl = labelled.container.querySelector(
                    `svg[data-icon="${fantasy.name}"]`
                ) as SVGSVGElement;
                expect(labelledEl.getAttribute('aria-hidden')).toBe('false');
                expect(labelledEl.getAttribute('aria-label')).toBe(fantasy.name);
                expect(labelledEl.getAttribute('focusable')).toBe('false');
                // CLASSNAME forwarding (styledComponent composition hook).
                const classed = render(
                    React.createElement(fantasy.component, { className: 'rpg-slot' })
                );
                const classedEl = classed.container.querySelector(
                    `svg[data-icon="${fantasy.name}"]`
                ) as SVGSVGElement;
                expect(classedEl.getAttribute('class')).toBe('rpg-slot');
            }
        });
    });
});
