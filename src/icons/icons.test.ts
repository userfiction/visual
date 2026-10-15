/**
 * icons.test.ts — deterministic tests for the built-in icon registry
 * (./builtins.ts) over the ONE-FILE-PER-ICON architecture (generic/*.ts ×23,
 * fantasy/*.ts ×10 — cross-reference the FILE ARCHITECTURE header in
 * svg-icon.ts): the exact 33-factory key list, the per-icon flat-design
 * structural invariants, exact full-string spot checks (generic trio +
 * fantasy trio), geometry wiring, and the registry round-trip proving that
 * importing this module registers every built-in name — including the
 * late-alphabet fantasy set.
 *
 * EXPECTED VALUES: every full-string pin below is composed from the
 * documented svgIcon OUTPUT CONTRACT (svg-icon.ts: xmlns → viewBox →
 * width="1em" → height="1em" → fill="currentColor", then the definition
 * content verbatim — flatPath in svg-icon.ts supplies the per-element
 * fill="currentColor" stroke="none" pair) and was verified byte-for-byte
 * against the real runtime via a scratch probe under the repo-root Temp/
 * directory (Temp/visual/probe2.ts, run with `npx vite-node
 * Temp/visual/probe2.ts` from the workspace root).
 *
 * CONTRACTS PINNED:
 *   1. svgIcons exposes EXACTLY the 33 built-in names in registration order —
 *      generic 23 first, then fantasy 10 (builtins.ts appends; an insertion
 *      would change key order and break this contract).
 *   2. EVERY factory renders the flat-design shell: starts with `<svg `,
 *      ends with `</svg>`, carries the xmlns declaration, per-element flat
 *      attributes fill="currentColor" stroke="none", and NO gradient or
 *      stroke-family markup (solid fills only).
 *   3. EVERY factory delegates to svgIcon(name) — the registration side
 *      effect is real and the two paths produce byte-identical strings.
 *   4. Exact full strings for the generic trio: check / plus / menu.
 *   5. Exact full strings for the fantasy trio: sword / gem / crown
 *      (sword exercises the literal non-path <circle> pommel element).
 *   6. Geometry is actually wired per name (nine fragment spot checks).
 *   7. Registry round-trip: svgIcon('spellbook') renders the exact string
 *      after importing this module — importing the builtins map (via the
 *      generic/fantasy sub-barrels) registered ALL built-ins, and
 *      'spellbook' is late-alphabet fantasy, so a stale/missing fantasy
 *      registration could not fake this pass.
 */
import { describe, expect, it } from 'vitest';
import { svgIcon } from './svg-icon';
import { svgIcons } from './builtins';

// ── exact expected strings (probe-verified full outputs) ────────────────────
const CHECK =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" fill="currentColor" stroke="none"/></svg>';
const PLUS =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" fill="currentColor" stroke="none"/></svg>';
const MENU =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z" fill="currentColor" stroke="none"/></svg>';
// Fantasy trio — sword's pommel is a literal <circle> element (fantasy/sword.ts
// line 17), not flatPath, so it also pins the non-path uniform-attribute rule.
const SWORD =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M12 1L14.5 5V15H9.5V5ZM6 15H18V17.5H6ZM11 17.5H13V21H11Z" fill="currentColor" stroke="none"/><circle cx="12" cy="22" r="1.5" fill="currentColor" stroke="none"/></svg>';
const GEM =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M12 21L3 10L6 5H18L21 10Z" fill="currentColor" stroke="none"/></svg>';
const CROWN =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M4 16V8L7.8 10.8L12 5.5L16.2 10.8L20 8V16ZM4 16H20V18.5H4Z" fill="currentColor" stroke="none"/></svg>';
// spellbook (fantasy/spellbook.ts): wound clockwise with a counterclockwise
// star subpath so nonzero fill cuts the hole — the pin proves both subpaths
// survive registration verbatim.
const SPELLBOOK =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M7 3H17A2 2 0 0 1 19 5V19A2 2 0 0 1 17 21H7A2 2 0 0 1 5 19V5A2 2 0 0 1 7 3ZM12 14.8L14.8 12L12 9.2L9.2 12Z" fill="currentColor" stroke="none"/></svg>';

// Shared presentation attributes every definition element carries
// (svg-icon.ts flatPath + the literal FLAT constant in fantasy/scroll.ts) —
// asserted verbatim inside every output.
const FLAT_ELEMENT_ATTRS = 'fill="currentColor" stroke="none"';

describe('svgIcons built-in set', () => {
    it('exposes exactly the 33 built-in registry names, in registration order', () => {
        // Generic 23 first, then fantasy 10 — the exact object-literal order
        // in builtins.ts (appending is the only safe evolution; the ui/
        // gallery and VisualIcon/data-icon resolve through these same keys).
        expect(Object.keys(svgIcons)).toEqual([
            'check',
            'close',
            'plus',
            'minus',
            'menu',
            'chevronDown',
            'chevronUp',
            'chevronLeft',
            'chevronRight',
            'arrowRight',
            'play',
            'pause',
            'stop',
            'heart',
            'star',
            'book',
            'bookmark',
            'user',
            'home',
            'pin',
            'trash',
            'search',
            'download',
            'sword',
            'axe',
            'wand',
            'shield',
            'potion',
            'scroll',
            'spellbook',
            'crown',
            'gem',
            'key',
        ]);
    });

    it('renders every icon on the flat-design shell and delegates to svgIcon byte-identically', () => {
        for (const [name, factory] of Object.entries(svgIcons)) {
            const markup = factory();
            // Standalone-SVG shell: opens with `<svg ` and closes with `</svg>`
            expect(markup.startsWith('<svg ')).toBe(true);
            expect(markup.endsWith('</svg>')).toBe(true);
            // xmlns present → every output is a valid standalone .svg file
            expect(markup).toContain('xmlns="http://www.w3.org/2000/svg"');
            // Flat-design convention: solid per-element fills, no outlines
            expect(markup).toContain(FLAT_ELEMENT_ATTRS);
            // …and NO gradient machinery or stroke-family drawing anywhere
            expect(markup).not.toContain('<linearGradient');
            expect(markup).not.toContain('<radialGradient');
            expect(markup).not.toContain(' stroke="currentColor"');
            // Registration side effect + delegation: the name resolves
            // through the LIVE registry to the exact same string.
            expect(svgIcon(name)).toBe(markup);
        }
    });

    it('pins the exact full output strings for check, plus and menu', () => {
        expect(svgIcons.check()).toBe(CHECK);
        expect(svgIcons.plus()).toBe(PLUS);
        expect(svgIcons.menu()).toBe(MENU);
    });

    it('pins the exact full output strings for sword, gem and crown', () => {
        expect(svgIcons.sword()).toBe(SWORD);
        expect(svgIcons.gem()).toBe(GEM);
        expect(svgIcons.crown()).toBe(CROWN);
    });

    it('wires the distinctive geometry per name (nine fragment spot checks)', () => {
        // Material favorite/search geometry — heart lens and search handle
        expect(svgIcons.heart()).toContain('M12 21.35');
        expect(svgIcons.search()).toContain('M15.5 14h');
        // wand: 4-point sparkle just past the stick tip + its dot circle
        expect(svgIcons.wand()).toContain('M16.5 4.5l0.8 2.2');
        expect(svgIcons.wand()).toContain('cx="19.5" cy="3.5"');
        // potion: rim bar and the sweep-0 corner arc rounding the flask base
        expect(svgIcons.potion()).toContain('A2.2 2.2 0 0 0 6.6 21');
        expect(svgIcons.potion()).toContain('M9 2H15V4H9Z');
        // scroll: roll pill + EXACTLY three <rect> elements (two rolls, body)
        expect(svgIcons.scroll()).toContain('<rect x="3" y="3" width="18" height="4" rx="2"');
        expect(svgIcons.scroll().match(/<rect /g)).toEqual(['<rect ', '<rect ', '<rect ']);
        // spellbook: the counterclockwise star subpath that cuts the hole
        expect(svgIcons.spellbook()).toContain('M12 14.8L14.8 12L12 9.2L9.2 12Z');
        // key: sweep-0 outer ring and sweep-1 hole — winding is load-bearing
        expect(svgIcons.key()).toContain('M7 8A4 4 0 1 0 7 16');
        expect(svgIcons.key()).toContain('M7 10.2A1.8 1.8 0 1 1 7 13.8');
        // axe: double-quadratic blade lens against the haft
        expect(svgIcons.axe()).toContain('M13 3Q20 3.5 21 7Q20 10.5 13 11Z');
        // shield: mirrored cubic curves down to the bottom point
        expect(svgIcons.shield()).toContain('C20 16.25 16.6 19.6 12 22C7.4 19.6 4 16.25 4 11V5Z');
    });

    it('registers every built-in on import: svgIcon resolves spellbook to its exact string', () => {
        // Importing THIS module (builtins.ts) keeps all built-ins registered
        // through the shared registry — the round-trip through the live
        // registry must yield the identical default render. 'spellbook' is
        // late-alphabet fantasy, so this proves the fantasy modules' side
        // effects fired too (a map entry without registration would fail).
        expect(svgIcon('spellbook')).toBe(SPELLBOOK);
        expect(svgIcons.spellbook()).toBe(SPELLBOOK);
    });
});
