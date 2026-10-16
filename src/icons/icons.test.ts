/**
 * icons.test.ts — deterministic tests for the built-in icon registry
 * (./builtins.ts) over the ONE-FILE-PER-ICON architecture (generic/*.ts ×23,
 * fantasy/*.ts ×10, flags/*.ts ×8, animals/*.ts ×60, fruits/*.ts ×19,
 * nature/*.ts ×28 — cross-reference the FILE ARCHITECTURE header in
 * svg-icon.ts): the exact 148-factory key list, the per-icon flat-design
 * structural invariants, exact full-string spot checks (generic trio +
 * fantasy trio + flags pair flag/checkeredFlag + the redrawn animal trio
 * cat/horse/penguin + literal butterfly + tail duck + the fruit trio
 * apple/watermelon/kiwi-coconut-blueberry + flower and sunflower for the
 * round-trip + lightning — the round-trip's LAST name, pinned via the
 * ICON_LIGHTNING composition), geometry wiring (including hole subpaths),
 * and the registry round-trip proving that importing this module registers
 * every built-in name — including the late-alphabet fantasy, animal, fruit
 * and nature sets. All 60 animals/*.ts modules carry their own focused
 * contract tests (animals/animals.test.ts); this file pins the registry
 * contract and spot geometry.
 *
 * EXPECTED VALUES: every pin below is composed from the documented svgIcon
 * OUTPUT CONTRACT (svg-icon.ts: xmlns → viewBox → width="1em" → height="1em"
 * → fill="currentColor", then the definition content verbatim — flatPath in
 * svg-icon.ts supplies the per-element fill="currentColor" stroke="none"
 * pair, the evenodd template appends fill-rule="evenodd") and was verified
 * byte-for-byte against the runtime via scratch probes under the repo-root
 * Temp/ directory (most recently Temp/visual/probe-animals-vt13.ts, which
 * diffs hand-derived strings against the live render; run with
 * `npx vite-node Temp/visual/<probe>.ts` from the workspace root).
 * Nature specifics: the
 * EXISTING 12 icons gained detail (oak leaf-cluster holes + ground line,
 * pine ground, palm trunk-ring/midrib holes + ground, birch THREE re-laid
 * bark dashes + ground, maple veins, fir snow lines + ground, cypress
 * shading line + ground, willow ground, bush berry holes, cactus flower
 * dots, fern fiddlehead, flower second leaf) and SIX icons joined
 * (appleTree/cherryTree/redwood/spruce/tulip/sunflower). NOTE: sunflower's
 * ray wedges are template-computed from
 * the RAYS table (12.6 + (7-12.6)·0.62 → 9.128) and the pin keeps every
 * runtime value verbatim. (VISUAL-TESTS-10 later dropped maple's veins and
 * reworked fern's fiddlehead into a spiral band; VISUAL-TESTS-12 later
 * replaced kiwi's template-computed seed ring with the static oval
 * silhouette — see the REWORK NOTE at the end of this header.)
 *
 * CONTRACTS PINNED:
 *   1. svgIcons exposes EXACTLY the 148 built-in names in registration
 *      order — generic 23 first, then fantasy 10, then the themed
 *      subsets flags 8 → animals 60 → fruits 19 → nature 28 (builtins.ts
 *      appends; an insertion would change key order and break this
 *      contract). The animals block grew from 20 to 60
 *      (VISUAL-TESTS-13 redraw/expansion): the 20 originals keep their
 *      redrawn geometry and relative order (cat → duck), then the 40
 *      wildlife additions elephant … chameleon append after 'duck' —
 *      chameleon is the animals tail, immediately before 'apple'.
 *   2. EVERY factory renders the flat-design shell: starts with `<svg `,
 *      ends with `</svg>`, carries the xmlns declaration, per-element flat
 *      attributes fill="currentColor" stroke="none", and NO gradient or
 *      stroke-family markup (solid fills only).
 *   3. EVERY factory delegates to svgIcon(name) — the registration side
 *      effect is real and the two paths produce byte-identical strings.
 *   4. Exact full strings for the generic trio: check / plus / menu.
 *   5. Exact full strings for the fantasy trio: sword / gem / crown
 *      (sword exercises the literal non-path <circle> pommel element).
 *   6. Exact full strings for the flags pair: flag / checkeredFlag (14
 *      counterclockwise checker holes cut from the clockwise flag rect —
 *      hole winding is load-bearing, same-direction subpaths would render
 *      the flag solid).
 *   7. Exact full strings for the redrawn animals cat / horse / penguin
 *      and the literal-element butterfly (probe-verified against the
 *      CURRENT geometry — cat/horse/penguin use the evenodd-template
 *      composition; butterfly's FOUR rotated evenodd path wings each
 *      carry their spot hole in the SAME path, so every wing spot cuts
 *      visually and the pins track present source verbatim).
 *   8. Exact full strings for the fruit trio kiwi/coconut/blueberry and
 *      the apple/watermelon pair (the VISUAL-TESTS-12 evenodd rework).
 *   9. Geometry is actually wired per name (fragment spot checks) —
 *      including hole subpaths whose winding or evenodd depth is
 *      load-bearing, asserted verbatim. Covers the redrawn animal
 *      originals (dog/bird/fish/rabbit (2 evenodd)/bear (2 evenodd)/
 *      dragon/snake (ribbon+spots)/turtle (head+eye evenodd)/paw/lion/
 *      owl/fox/whale/frog/snail (shell/body evenodd) + the
 *      cat/horse/penguin/butterfly (4 evenodd wing paths)/duck
 *      full-string pins), chameleon from the additions, ALL NINETEEN
 *      VISUAL-TESTS-12 reworked fruits (apple/banana/cherry/grape/orange/
 *      lemon/watermelon/pear/strawberry/peach/pineapple/kiwi/mango/
 *      avocado/blueberry/coconut/pomegranate/plum/melon) and the
 *      fragment-covered nature subset (18 of its 28 icons — the ten
 *      VISUAL-TESTS-11 landscape/sky icons carry no full-string/fragment
 *      pins; they are covered by the key-list pin, the all-icons
 *      shell/delegation loop and the round-trip's 'lightning' pin).
 *
 *  10. Registry round-trip: svgIcon('spellbook') AND svgIcon('chameleon')
 *      AND svgIcon('strawberry') AND svgIcon('flower') AND
 *      svgIcon('sunflower') render the exact strings after importing this
 *      module — importing the builtins map (via the
 *      generic/fantasy/flags/animals/fruits/nature sub-barrels)
 *      registered ALL built-ins, and all five names sit late in their
 *      subsets, so a stale/missing registration could not fake this pass.
 *      ('chameleon' is the NEW late-alphabet animals-tail addition —
 *      late enough that an animals sub-barrel omission could not fake it;
 *      'lightning' remains the map's LAST name, pinned via the registry
 *      delegation identity AND the shell + ICON_LIGHTNING composition.)
 *
 * VISUAL-TESTS-13 REWORK NOTE (animals): ALL TWENTY animal original modules
 * were re-laid (recognizable species silhouettes — cat single-silhouette
 * head+ears, dog drooping ears, bird songbird profile, fish almond body,
 * rabbit long ears, bear muzzle patch, dragon full body, snake S-ribbon,
 * turtle domed shell, paw real pads, horse elongated muzzle, lion jagged
 * 12-spike mane, owl ringed eyes, fox V jaw, whale horizontal flukes, frog
 * periscope eyes, snail target-ring shell, penguin emperor face patch,
 * butterfly rotated wings, duck flat bill) AND 40 wildlife species joined
 * (elephant … chameleon — see animals/index.ts's sub-barrel order). Every
 * redrawn hole is cut EXPLICITLY by fill-rule="evenodd" at nested depth,
 * NOT by load-bearing sweep direction. This update re-derived the animal
 * full-string constants (cat/horse/penguin/butterfly/duck) and the animal
 * fragment section byte-for-byte against Temp/visual/probe-animals-vt13.ts
 * (hand-derived strings diffed against the live render), then confirmed the
 * React-layer cat/owl/butterfly serialized pins the same way through jsdom.
 * The key-list pin grew 108 → 148 preserving existing order (the 40
 * additions append after 'duck'); the round-trip swaps 'duck' →
 * 'chameleon'. The per-module complement (all 60 animals individually)
 * lives in the NEW animals/animals.test.ts. The animal-hole triage fixes
 * (each butterfly wing + its spot, the turtle head + eye, the snake spots,
 * the rabbit ears/body, the snail shell/body and the bear ears now share
 * ONE evenodd paint operation) are applied in production and re-derived
 * below.
 *
 * VISUAL-TESTS-11 APPEND NOTE: the nature barrel gained TEN one-file-per-
 * icon entries in two subsets — LANDSCAPE (mountain/hills/river) and SKY
 * (sun/moon/cloud/stars/sunrise/rainbow/lightning) — re-exported by
 * nature/index.ts after 'sunflower' and appended to the builtins.ts map in
 * that same order (map total 98 → 108, LAST name 'sunflower' →
 * 'lightning'). That update touched ONLY the count-bearing pins: the
 * key-list pin, the header cross-references and the round-trip test.
 *
 * VISUAL-TESTS-12 REWORK NOTE: ALL NINETEEN fruit modules were re-laid as
 * recognizable single-color silhouettes (banana thick crescent, cherry
 * shines INSIDE the berry paths, grape six-berry 3-2-1 <g> cluster,
 * orange peel pores, lemon continuous pointed oval, watermelon separated
 * rind + teardrop seeds, pear bent neck, strawberry tapered heart +
 * seven seeds, peach symmetric cheeks + suture, pineapple seven isolated
 * diamond scales, kiwi oval skin + eight radial seed slots + solid core,
 * mango kidney beak, avocado outlined skin + SOLID pit, blueberry calyx
 * stars cut INSIDE the berry paths, coconut cut half with fiber notches,
 * pomegranate Q-teardrop arils, plum oval drupe + suture, melon curved
 * ribs). Every hole is now cut EXPLICITLY with fill-rule="evenodd"
 * instead of load-bearing sweep direction. This update re-derived the six
 * fruit full-string constants and the ENTIRE fruit fragment section
 * byte-for-byte against Temp/visual/probe-fruits-vt12.ts (full strings as
 * JSON) and Temp/visual/probe-fruits-vt12-elements.ts (per-element SEG
 * lines; run with `npx vite-node Temp/visual/<probe>.ts` from the
 * workspace root) — every fragment was first derived from the hand-read
 * module source, then confirmed against the probe output. The key-list
 * pin, the shell/delegation loop, the non-fruit full strings and the
 * non-fruit fragment pins are UNTOUCHED. The per-module complement
 * (self-containment, registration, XML validity, element censuses and
 * string/React parity for all 19) lives in the NEW fruits/fruits.test.ts.
 */
import { describe, expect, it } from 'vitest';
import { svgIcon } from './svg-icon';
import { svgIcons } from './builtins';
// ICON_LIGHTNING (nature/lightning.ts): the round-trip test composes the
// 'lightning' full render from this definition const (svg-icon shell +
// content) — byte-exact by construction, no hand-copied probe string.
import { ICON_LIGHTNING } from './nature/lightning';

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
// New-subset quintet — one exact full default render per themed subset.
// flag (flags/flag.ts): pole rect + flag rect, two solid subpaths, no holes.
const FLAG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M4 2h2v20H4zM6 3h13v7H6z" fill="currentColor" stroke="none"/></svg>';
// checkeredFlag (flags/checkered-flag.ts): pole + flag rect wound CLOCKWISE,
// then 14 checker holes (3+4+3+4 per row, every (col+row)-odd cell of the
// 7×4 grid) wound COUNTERCLOCKWISE (`v2h2V<rowY>z`) — under nonzero fill the
// reversed-winding subpaths are what leave the checker pattern; if they were
// wound like the body the flag would render as a solid rectangle. Winding is
// structural-only here: the exact hole fragment existence is pinned in the
// geometry test below (14× `v2h2V` matches).
const CHECKERED_FLAG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M3 2h2v20H3zM5 3h14v8H5zM7 3v2h2V3zM11 3v2h2V3zM15 3v2h2V3zM5 5v2h2V5zM9 5v2h2V5zM13 5v2h2V5zM17 5v2h2V5zM7 7v2h2V7zM11 7v2h2V7zM15 7v2h2V7zM5 9v2h2V9zM9 9v2h2V9zM13 9v2h2V9zM17 9v2h2V9z" fill="currentColor" stroke="none"/></svg>';
// cat (animals/cat.ts, VISUAL-TESTS-13 redraw): TWO elements — the
// single-silhouette head+ears body (wide trapezoid with bulged sides, ear
// tips at (5,2.4)/(19,2.4), forehead dip Q12 7.2, rounded chin Q12 20.6)
// carrying inner-ear / eye / nose / ω-mouth holes at evenodd depth 2
// (explicit fill-rule="evenodd" — winding irrelevant), then the flatPath
// whisker overlay (three thin bars per cheek).
const CAT =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">' +
    '<path d="M5 2.4L8.6 8.2Q12 7.2 15.4 8.2L19 2.4Q21.1 3.6 20.6 9.4Q21 13 20.2 15.2Q19.4 20.6 12 20.6Q4.6 20.6 3.8 15.2Q3 13 3.6 9.4Q3.1 4.4 5 2.4zM5.5 4.2L7.2 7.2 5.6 7.6zM18.5 4.2L16.8 7.2 18.4 7.6zM7.15 13.2a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0zM14.55 13.2a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0zM11 15.4L13 15.4 12 16.9zM10.4 17.2A0.8 0.8 0 0 1 12 17.2A0.8 0.8 0 0 1 13.6 17.2z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M1.4 12.4h3.2v0.6h-3.2zM1.2 14.3h3.4v0.6h-3.4zM1.6 16.2h3v0.6h-3zM19.4 12.4h3.2v0.6h-3.2zM19.4 14.3h3.4v0.6h-3.4zM19.4 16.2h3v0.6h-3z" fill="currentColor" stroke="none"/>' +
    '</svg>';
// New-animal trio — one exact full default render each (probe-verified
// against the VISUAL-TESTS-13 redrawn geometry).
// horse (animals/horse.ts): TWO elements — the evenodd head/neck profile
// (elongated straight muzzle bridge L7.6 4.6, crown → back of head → neck
// slanting to the base, with eye/nostril/mouth-line holes at depth 2) + the
// flatPath ears-and-mane overlay (two solid ear triangles at the crown +
// three jagged mane triangles riding the neck's back edge).
const HORSE =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">' +
    '<path d="M2 10.4Q2.2 9.4 3.4 9.2L7.6 4.6Q8.6 3.8 10 4.4L12.6 5.8Q14.4 6.8 15 9.4Q15.8 12.6 16.6 16.4L17.6 21L10.8 21Q10.6 16.8 9.6 14.6Q6.4 14 4.4 12.4Q2.4 12 2 10.4zM6.2 8.4a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0zM2.9 10.4a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0zM2.6 11.6h2.4v0.5h-2.4z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M8.2 4.6L8.6 1.2Q8.7 0.8 9.1 1.1L11.4 3.6zM11.6 4L13.6 1.6Q13.9 1.3 14 1.7L14.4 5zM14.8 8.6L18 9.2 15.2 11zM15.4 12L18.8 12.8 15.8 14.6zM16 15.6L19.4 16.6 16.4 18.2z" fill="currentColor" stroke="none"/>' +
    '</svg>';
// penguin (animals/penguin.ts): ONE evenodd element — clockwise body ellipse
// (rx 6.6 ry 8.4 at (12,13.2)), counterclockwise belly window hole, the Q-
// curved face patch hole (the dark rim around it reads as the species cap),
// eyes/beak re-filled dark at evenodd depth 3 inside the patch, rounded-
// bottom feet and the two Q-curved flipper lenses.
const PENGUIN =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M5.4 13.2a6.6 8.4 0 1 1 13.2 0a6.6 8.4 0 1 1 -13.2 0zM7.9 14.2a4.1 5.9 0 1 0 8.2 0a4.1 5.9 0 1 0 -8.2 0zM7.6 8.6Q7.6 6.4 10 6.2Q12 6 12 7.4Q12 6 14 6.2Q16.4 6.4 16.4 8.6Q16.4 10.8 12 11.6Q7.6 10.8 7.6 8.6zM9.15 8.1a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0zM13.15 8.1a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0zM11.2 9.4h1.6l-0.8 1.5zM8.5 20.9h2.4v0.4a1.2 1.2 0 0 1 -2.4 0zM13.1 20.9h2.4v0.4a1.2 1.2 0 0 1 -2.4 0zM5.8 11.2L6.2 17.4Q4.6 16.6 4.4 14.4Q4.2 12 5.8 11.2zM18.2 17.4L17.8 11.2Q19.4 12 19.6 14.4Q19.8 16.6 18.2 17.4z" fill="currentColor" stroke="none" fill-rule="evenodd"/></svg>';
// butterfly (animals/butterfly.ts): the richest literal-element mix in the
// set — FOUR rotated evenodd path wings (each wing's spot hole rides the
// SAME d as its outer wing subpath, so every spot cuts visually), the
// antenna flatPath, the <rect rx> body segment and three <circle> elements
// (head + two antenna tip dots) — pinned byte-for-byte.
const BUTTERFLY =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">' +
    '<path d="M3.5 9.2a3.9 4.7 0 1 1 7.8 0a3.9 4.7 0 1 1 -7.8 0zM6.3 9.2a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z" transform="rotate(-24 7.4 9.2)" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M12.7 9.2a3.9 4.7 0 1 1 7.8 0a3.9 4.7 0 1 1 -7.8 0zM15.5 9.2a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z" transform="rotate(24 16.6 9.2)" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M5.7 15.8a2.9 3.3 0 1 1 5.8 0a2.9 3.3 0 1 1 -5.8 0zM7.5 15.8a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z" transform="rotate(24 8.6 15.8)" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M12.5 15.8a2.9 3.3 0 1 1 5.8 0a2.9 3.3 0 1 1 -5.8 0zM14.3 15.8a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z" transform="rotate(-24 15.4 15.8)" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M11.3 5.6L9.9 2.6 10.7 2.3 12 5.5zM12.7 5.5L14.1 2.5 14.9 2.8 13.3 5.6z" fill="currentColor" stroke="none"/>' +
    '<rect x="11.25" y="7.4" width="1.5" height="11.6" rx="0.75" fill="currentColor" stroke="none"/>' +
    '<circle cx="12" cy="6.2" r="1.25" fill="currentColor" stroke="none"/>' +
    '<circle cx="10.3" cy="2.4" r="0.65" fill="currentColor" stroke="none"/>' +
    '<circle cx="14.5" cy="2.6" r="0.65" fill="currentColor" stroke="none"/>' +
    '</svg>';
// apple (fruits/apple.ts): TWO path elements — the VISUAL-TESTS-12 rework
// body (a literal evenodd-template shape, NOT flatPath: the wide two-lobe
// silhouette whose shoulder curves rise to the top dimple at (12,7.4) and
// whose bottom lobes meet through the S command, with the left highlight
// crescent cut EXPLICITLY by fill-rule="evenodd" instead of winding) + the
// trailing flatPath (the curved stem seating inside the dimple + the leaf
// lens to its right). Two paths pin the two-element composition.
const APPLE =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">' +
    '<path d="M12 7.4C9.5 5.3 5.8 6.1 4.1 8.8 1.9 12.5 4.2 19.2 7.2 21.4 9.2 22.9 10.5 21.2 12 21.2S14.8 22.9 16.8 21.4C19.8 19.2 22.1 12.5 19.9 8.8 18.2 6.1 14.5 5.3 12 7.4zM6.3 10C5 11.7 5.1 14 5.8 15.4L7 14.9C6.5 13.4 6.6 11.9 7.4 10.8z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M11.3 7.8C11.1 5.4 11.5 3.5 12.8 1.8L14 2.7C12.9 4.2 12.6 5.8 12.8 7.8zM14 5.2C14.1 2.6 17.1 1.5 20 2.3 18.9 4.9 16.8 6.2 14 5.2z" fill="currentColor" stroke="none"/>' +
    '</svg>';
// watermelon (fruits/watermelon.ts): TWO path elements — the VISUAL-TESTS-12
// rework SEPARATES flesh and rind: the literal evenodd-template flesh
// (lower half-disc via the mirrored S cubic through (12,15.6) + THREE
// teardrop seed holes cut by evenodd — the old sweep-wound seed arcs
// filled solid, which is what evenodd fixes) + the trailing flatPath rind
// band annulus (outer rim x 1.5..22.5 at y 7, inner rim x 2.8..21.2 — the
// 1.4-unit white-pith + green-rind band).
const WATERMELON =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">' +
    '<path d="M4 7H20C20 11.8 16.5 15.6 12 15.6S4 11.8 4 7zM7.3 8.4C6.4 9.2 6.7 10.5 7.5 10.5 8.4 10.4 8.4 9.3 7.3 8.4zM12 11C10.9 11.9 11 13.2 12 13.2S13.1 11.9 12 11zM16.7 8.4C15.6 9.3 15.6 10.4 16.5 10.5 17.3 10.5 17.6 9.2 16.7 8.4z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M1.5 7H2.8C2.8 12.6 6.8 17 12 17S21.2 12.6 21.2 7H22.5C22.5 14.3 18 20.4 12 20.4S1.5 14.3 1.5 7z" fill="currentColor" stroke="none"/>' +
    '</svg>';
// strawberry (fruits/strawberry.ts): TWO path elements — the VISUAL-TESTS-12
// rework tapers the berry: the literal evenodd-template body (broad
// shoulders at y 8.2 tapering to the rounded point at (12,22.5), with
// SEVEN seed holes cut by evenodd — four slanted quads on the flanks +
// three centerline rects) + the trailing flatPath calyx (the stem stub
// rising to V1.5 + the five-blade zigzag crown). Pinned here for the
// round-trip test below.
const STRAWBERRY =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">' +
    '<path d="M4.4 8.2C6.1 6.8 8.8 7 12 7.7 15.2 7 17.9 6.8 19.6 8.2 22.9 11.2 17.3 20.3 12 22.5 6.7 20.3 1.1 11.2 4.4 8.2zM6.3 10.3l.4 1.9 1-.3-.4-1.9zM11.4 10.2v2h1.2v-2zM17.7 10.3l-1-.3-.4 1.9 1 .3zM8.1 14.1l.5 1.8 1.1-.3-.5-1.8zM14.8 13.8l-.5 1.8 1.1.3.5-1.8zM11.4 17.4v1.8h1.2v-1.8zM11.4 14v1.8h1.2V14z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M11.4 4.8V1.5h1.3v3.3L17 3.5 15.5 6 19 6.9 14.4 8 12 6.4 9.6 8 5 6.9 8.5 6 7 3.5z" fill="currentColor" stroke="none"/>' +
    '</svg>';
// strawberry/flower round-trip assertions use svgIcon delegation only —
// both names sit late in their subsets, so registration must have fired.

// duck (animals/duck.ts, VISUAL-TESTS-13 redraw): FOUR elements — tail
// wedge / body circle + wing teardrop slot / head circle + eye hole
// (three separate evenodd elements — cross-element overlap = union) + the
// flatPath bill-and-ripples overlay. Pinned here for the round-trip test
// (the former animals tail; still mid-block, so a wildlife insertion
// mistake would show here).
const DUCK =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">' +
    '<path d="M4.6 11.6L1.8 8.8Q1.2 8.2 2.2 8.3L6.8 10.4z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M3.4 14.8a6 6 0 1 1 12 0a6 6 0 1 1 -12 0zM6.2 14.4Q8.4 12.4 11.4 13Q12.7 13.3 12 14.7Q11.2 16.1 9.2 16Q7 15.9 6.2 14.4z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M10.6 7.2a3.4 3.4 0 1 1 6.8 0a3.4 3.4 0 1 1 -6.8 0zM13.35 6.4a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M17 5.8Q21.8 5.5 22 7Q21.8 8.5 17 8.2zM2.6 21.2h13.6v0.9h-13.6zM5.4 22.7h9v0.7h-9z" fill="currentColor" stroke="none"/>' +
    '</svg>';
// New-fruit trio — one exact full default render each (probe-verified).
// kiwi (fruits/kiwi.ts): THREE path elements — the VISUAL-TESTS-12 rework
// replaces the old circular doughnut + float-noise seed ring: (1) the
// literal evenodd-template SKIN ring (outer 9.5×10.5 oval swept sweep-1 +
// the inner 8×9 hole swept sweep-0 — the reversed winding keeps the hole
// open even under nonzero fill, and evenodd is explicit belt-and-braces),
// (2) the evenodd flesh oval (6.8×7.8) carrying EIGHT radial seed slots
// (four axis-aligned rects at N/S/E/W + four diagonal parallelograms
// pointing at the core), (3) the flatPath solid elongated core lens (the
// core stays SOLID — no central hole).
const KIWI =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">' +
    '<path d="M21.5 12a9.5 10.5 0 1 1 -19 0 9.5 10.5 0 1 1 19 0zM20 12a8 9 0 1 0 -16 0 8 9 0 1 0 16 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M18.8 12a6.8 7.8 0 1 1 -13.6 0 6.8 7.8 0 1 1 13.6 0zM11.4 6v2h1.2V6zM11.4 16v2h1.2v-2zM6.7 11.4v1.2h2v-1.2zM15.3 11.4v1.2h2v-1.2zM8.2 7.7l-.8.8 1.4 1.4.8-.8zM15.8 7.7l-1.4 1.4.8.8 1.4-1.4zM8.8 14.1l-1.4 1.4.8.8 1.4-1.4zM15.2 14.1l-.8.8 1.4 1.4.8-.8z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M11.7 9.8Q10.9 12 11.7 14.2H12.3Q13.1 12 12.3 9.8z" fill="currentColor" stroke="none"/>' +
    '</svg>';
// coconut (fruits/coconut.ts): TWO path elements — the VISUAL-TESTS-12
// rework replaces the old crack band + face eyes: (1) the literal
// evenodd-template HULL ellipse ring (outer 10×5.5 ellipse swept sweep-1 +
// the inner 7.6×3.4 cavity hole swept sweep-0), (2) the flatPath flesh
// bowl (top rim at y 12.5, bottom edge dropping to y 21.8 with THREE
// fiber notches — the notched zigzag IS the cut-half silhouette).
const COCONUT =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">' +
    '<path d="M22 9a10 5.5 0 1 1 -20 0 10 5.5 0 1 1 20 0zM19.6 8.7a7.6 3.4 0 1 0 -15.2 0 7.6 3.4 0 1 0 15.2 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M2.3 12.5C4.5 15 7.8 16 12 16S19.5 15 21.7 12.5C21.2 16.1 19.6 19 17.1 20.4L17.8 17.5 16.5 17.2 15.5 21.1C14.6 21.5 13.7 21.7 12.7 21.8V18.8H11.3V21.8C10.3 21.7 9.4 21.5 8.5 21.1L7.5 17.2 6.2 17.5 6.9 20.4C4.4 19 2.8 16.1 2.3 12.5z" fill="currentColor" stroke="none"/>' +
    '</svg>';
// blueberry (fruits/blueberry.ts): TWO path elements — the VISUAL-TESTS-12
// rework moves the calyx stars INSIDE the berry paths (the old stars were
// painted BEFORE the opaque berry circles and vanished under them): one
// literal evenodd-template path holding the three berry circles (r 5.5 at
// (7.1,8.2), r 4.8 at (17.6,12), r 3.9 at (11.2,18)) AND their three
// five-point calyx star holes, + the trailing flatPath leaf lens filling
// the upper-right gap. Bottom berry re-cut 4.5 → 3.9 (center unchanged):
// the three circles now sit strictly disjoint inside the single evenodd
// path — at 4.5 the bottom/right pair overlapped (center distance
// 8.77268 < 9.3) and evenodd XOR'd the shared lens transparent (see the
// disjointness regression in fruits/fruits.test.ts).
const BLUEBERRY =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">' +
    '<path d="M12.6 8.2a5.5 5.5 0 1 1 -11 0 5.5 5.5 0 1 1 11 0zM7.1 4.7L6.3 6.2 4.6 6.4 5.8 7.7 5.6 9.4 7.1 8.6 8.6 9.4 8.4 7.7 9.6 6.4 7.9 6.2zM22.4 12a4.8 4.8 0 1 1 -9.6 0 4.8 4.8 0 1 1 9.6 0zM17.6 8.9L16.9 10.2 15.4 10.4 16.5 11.5 16.3 13 17.6 12.3 18.9 13 18.7 11.5 19.8 10.4 18.3 10.2zM15.1 18a3.9 3.9 0 1 1 -7.8 0 3.9 3.9 0 1 1 7.8 0zM11.2 15.5L10.6 16.6 9.3 16.8 10.2 17.8 10 19.1 11.2 18.5 12.4 19.1 12.2 17.8 13.1 16.8 11.8 16.6z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M12 5.2C12.1 2.5 14.7 1.2 17.2 1.7 16.5 4.2 14.5 5.6 12 5.2z" fill="currentColor" stroke="none"/>' +
    '</svg>';
// flower (nature/flower.ts): stem + TWO leaf lenses flatPath (the left lens
// at y 18.6 was added by the nature detail pass), then five solid petal
// <circle> elements on a ring around (12,8.9) plus the center disc. 'flower'
// closed the map until VISUAL-TESTS-8; 'sunflower' then closed it until the
// VISUAL-TESTS-11 landscape + sky appends made 'lightning' the LAST name
// (see SUNFLOWER below and the round-trip test at the bottom). The
// round-trip test pins it via svgIcon delegation only.
const FLOWER =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M11.4 12.2h1.2v9h-1.2zM12.6 16.4c2.4-1.4 4.6-1 5.6.4-2.2 1.6-4.4 1.2-5.6-.4zM11.4 18.6c-2.4-1.4-4.6-1-5.6.4 2.2 1.6 4.4 1.2 5.6-.4z" fill="currentColor" stroke="none"/><circle cx="12" cy="5.6" r="2.3" fill="currentColor" stroke="none"/><circle cx="15.4" cy="8" r="2.3" fill="currentColor" stroke="none"/><circle cx="14.1" cy="12" r="2.3" fill="currentColor" stroke="none"/><circle cx="9.9" cy="12" r="2.3" fill="currentColor" stroke="none"/><circle cx="8.6" cy="8" r="2.3" fill="currentColor" stroke="none"/><circle cx="12" cy="9" r="2.1" fill="currentColor" stroke="none"/></svg>';
// sunflower (nature/sunflower.ts): ONE flatPath — the TWELVE thin ray wedges
// (template-computed from the RAYS table via
// `M12 7L${cx} ${cy}L${cx + (12-cx)*0.62} ${cy + (7-cy)*0.62}z` — every
// runtime value kept verbatim, e.g. the bottom ray closes at `L12 9.128z`),
// the r-3.6 disc over the wedge bases, the FIVE counterclockwise seed-dot
// holes (four on the r 1.9 ring + the center dot), stem, both leaf lenses
// and the ground line. 'sunflower' WAS the VERY LAST name in the 98-name
// map (VISUAL-TESTS-8), so the nature sub-barrel's registration side
// effects must have fired for it to resolve at all; VISUAL-TESTS-11
// appended the landscape + sky subsets after it and 'lightning' is now the
// LAST name (the round-trip test below pins that too).
const SUNFLOWER =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M12 7L17.6 7L14.128 7zM12 7L16.85 9.8L13.843 8.064zM12 7L14.8 11.85L13.064 8.843zM12 7L12 12.6L12 9.128zM12 7L9.2 11.85L10.936 8.843zM12 7L7.15 9.8L10.157 8.064zM12 7L6.4 7L9.872 7zM12 7L7.15 4.2L10.157 5.936zM12 7L9.2 2.15L10.936 5.157zM12 7L12 1.4L12 4.872zM12 7L14.8 2.15L13.064 5.157zM12 7L16.85 4.2L13.843 5.936zM8.4 7a3.6 3.6 0 1 1 7.2 0a3.6 3.6 0 1 1 -7.2 0zM9.95 7a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0zM11.35 9.1a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0zM13.65 7a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0zM11.35 4.9a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0zM11.3 7a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0zM11.4 10.8h1.2v10.4h-1.2zM12.6 15.4c2.4-1.4 4.6-1 5.6.4-2.2 1.6-4.4 1.2-5.6-.4zM11.4 18.2c-2.4-1.4-4.6-1-5.6.4 2.2 1.6 4.4 1.2 5.6-.4zM4.4 21.2h15.2v1h-15.2z" fill="currentColor" stroke="none"/></svg>';

// Shared presentation attributes every definition element carries
// (svg-icon.ts flatPath + the literal template paths — the fantasy scroll
// roll, EVERY fruit evenodd body path (whose literal template appends
// fill-rule="evenodd" after the pair — see the VISUAL-TESTS-12 REWORK
// NOTE), grape's <g> carrier (its six berry circles stay attribute-free
// and inherit), the nature palm/cactus/flower literals and the
// literal-element animals fish/bear/lion/owl/frog/snail/turtle/butterfly)
// — asserted verbatim inside every output.
const FLAT_ELEMENT_ATTRS = 'fill="currentColor" stroke="none"';

describe('svgIcons built-in set', () => {
    it('exposes exactly the 148 built-in registry names, in registration order', () => {
        // Generic 23, then fantasy 10, then flags 8, animals 60, fruits 19,
        // nature 28 — the exact object-literal order in builtins.ts
        // (appending is the only safe evolution; the ui/gallery and
        // VisualIcon/data-icon resolve through these same keys). The
        // animals block lists the 20 redrawn originals first (cat → duck),
        // then the 40 wildlife additions (VISUAL-TESTS-13) in
        // animals/index.ts's sub-barrel order — chameleon is the animals
        // tail, immediately before 'apple'; the fruits block follows
        // fruits/index.ts's sub-barrel order (the original ten first, then
        // the nine 2026 additions — VISUAL-TESTS-12 re-laid all 19 without
        // touching the order); the nature block lists the 12
        // detail-passed originals with the four tree additions
        // (appleTree/cherryTree/redwood/spruce) between 'willow' and
        // 'bush' and the two bloom additions (tulip/sunflower) after
        // 'flower' — the sub-barrel order of nature/index.ts.
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
            // ── flags ───────────────────────────────────────────────────────
            'flag',
            'pennant',
            'banner',
            'wavingFlag',
            'checkeredFlag',
            'nordicFlag',
            'swallowtailFlag',
            'bunting',
            // ── animals ─────────────────────────────────────────────────────
            'cat',
            'dog',
            'bird',
            'fish',
            'rabbit',
            'bear',
            'dragon',
            'snake',
            'turtle',
            'paw',
            'horse',
            'lion',
            'owl',
            'fox',
            'whale',
            'frog',
            'snail',
            'penguin',
            'butterfly',
            'duck',
            // ── animals: the 40 VISUAL-TESTS-13 wildlife additions ─────────
            // appended after 'duck' in animals/index.ts's sub-barrel order —
            // chameleon CLOSES the animals block immediately before 'apple'
            'elephant',
            'giraffe',
            'zebra',
            'rhinoceros',
            'hippopotamus',
            'monkey',
            'gorilla',
            'panda',
            'koala',
            'kangaroo',
            'deer',
            'moose',
            'wolf',
            'tiger',
            'cow',
            'pig',
            'sheep',
            'goat',
            'camel',
            'donkey',
            'bat',
            'eagle',
            'parrot',
            'flamingo',
            'swan',
            'chicken',
            'rooster',
            'peacock',
            'ostrich',
            'shark',
            'dolphin',
            'octopus',
            'squid',
            'jellyfish',
            'crab',
            'lobster',
            'seahorse',
            'crocodile',
            'lizard',
            'chameleon',
            // ── fruits ──────────────────────────────────────────────────────
            'apple',
            'banana',
            'cherry',
            'grape',
            'orange',
            'lemon',
            'watermelon',
            'pear',
            'strawberry',
            'peach',
            'pineapple',
            'kiwi',
            'mango',
            'avocado',
            'blueberry',
            'coconut',
            'pomegranate',
            'plum',
            'melon',
            // ── nature (trees + plants) ─────────────────────────────────────
            'oak',
            'pine',
            'palm',
            'birch',
            'maple',
            'fir',
            'cypress',
            'willow',
            // four VISUAL-TESTS-8 tree additions (between 'willow' and
            // 'bush', per nature/index.ts's sub-barrel order)
            'appleTree',
            'cherryTree',
            'redwood',
            'spruce',
            'bush',
            'cactus',
            'fern',
            'flower',
            // two VISUAL-TESTS-8 bloom additions — they closed the map
            // until VISUAL-TESTS-11 appended the two subsets below
            'tulip',
            'sunflower',
            // ── nature: the VISUAL-TESTS-11 LANDSCAPE subset ───────────────
            // mountain/hills/river — appended AFTER the blooms, per the
            // nature/index.ts sub-barrel order (its entries were added
            // after './sunflower')
            'mountain',
            'hills',
            'river',
            // ── nature: the VISUAL-TESTS-11 SKY subset ─────────────────────
            // sun/moon/cloud/stars/sunrise/rainbow/lightning — appended
            // right after landscape and CLOSES the whole map; 'lightning'
            // is the LAST name, pinned by the round-trip test below
            'sun',
            'moon',
            'cloud',
            'stars',
            'sunrise',
            'rainbow',
            'lightning',
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

    it('pins the exact full output strings for one icon per themed subset: flag, checkeredFlag, cat, apple, watermelon', () => {
        // flags: plain rect flag and the winding-sensitive checkered flag
        expect(svgIcons.flag()).toBe(FLAG);
        expect(svgIcons.checkeredFlag()).toBe(CHECKERED_FLAG);
        // animals: cat — the VISUAL-TESTS-13 redraw single-silhouette
        // head+ears body with inner-ear/eye/nose/ω-mouth holes (explicit
        // evenodd) + the separate whisker flatPath
        expect(svgIcons.cat()).toBe(CAT);
        // fruits: apple (the VISUAL-TESTS-12 rework: evenodd two-lobe body
        // rising to the (12,7.4) top dimple with the left highlight hole +
        // the flatPath stem and leaf lens) and watermelon (the
        // VISUAL-TESTS-12 rework: evenodd flesh half-disc with three
        // teardrop seed holes + the separated flatPath rind band)
        expect(svgIcons.apple()).toBe(APPLE);
        expect(svgIcons.watermelon()).toBe(WATERMELON);
    });

    it('pins the exact full output strings for the redrawn animals: horse, penguin, butterfly', () => {
        // horse: TWO elements (the evenodd head/neck profile with the
        // elongated straight muzzle + eye/nostril/mouth holes, then the
        // flatPath ears + three-jagged-mane overlay)
        expect(svgIcons.horse()).toBe(HORSE);
        // penguin: ONE evenodd element (clockwise body ellipse + belly/face
        // holes + depth-3 eye/beak re-fills + feet + flippers)
        expect(svgIcons.penguin()).toBe(PENGUIN);
        // butterfly: SIX elements — four rotated evenodd PATH wings (each
        // carries its own spot hole in the same d), the antenna flatPath,
        // the <rect rx> body and the <circle> head + two antenna tip dots
        expect(svgIcons.butterfly()).toBe(BUTTERFLY);
    });

    it('pins the exact full output strings for the new fruits: kiwi, coconut, blueberry', () => {
        // kiwi: THREE path elements — evenodd skin ring (outer sweep-1
        // oval + inner sweep-0 reversed hole), evenodd flesh oval with
        // the EIGHT radial seed slots (four axis rects + four diagonal
        // parallelograms) and the flatPath solid core lens (the
        // VISUAL-TESTS-12 rework dropped the old doughnut + float-noise
        // seed ring entirely — the new kiwi is a static literal string)
        expect(svgIcons.kiwi()).toBe(KIWI);
        // coconut: TWO path elements — the evenodd hull ellipse ring
        // (outer sweep-1 + inner sweep-0 cavity hole) over the flatPath
        // flesh bowl with the three bottom fiber notches (the
        // VISUAL-TESTS-12 rework replaced the old crack band + face eyes)
        expect(svgIcons.coconut()).toBe(COCONUT);
        // blueberry: TWO path elements — one evenodd path holding the
        // three berry circles AND their five-point calyx star holes (the
        // stars now cut THROUGH the fruit) + the trailing flatPath leaf
        expect(svgIcons.blueberry()).toBe(BLUEBERRY);
    });

    it('wires the distinctive geometry per name (243 fragment spot checks)', () => {
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

        // ── flags subset ───────────────────────────────────────────────────
        // checkeredFlag: EXACTLY 14 checker-hole subpaths (`v2h2V<rowY>z` —
        // each hole starts v2 h2 then absolute V back up). The count proves
        // every hole survived registration; the holes are wound opposite to
        // the flag rect, so under nonzero fill the checker pattern shows —
        // same-direction winding would render the flag solid.
        expect(svgIcons.checkeredFlag().match(/v2h2V/g)).toEqual(
            new Array(14).fill('v2h2V')
        );
        // checkeredFlag: one full bottom-row hole verbatim (row y=9, col 0)
        expect(svgIcons.checkeredFlag()).toContain('M5 9v2h2V9z');
        // nordicFlag: the CROSS hole cut from the clockwise flag rect —
        // reversed vertex order (M starts at the cross's right edge and
        // walks the hole counterclockwise). If it wound like the flag body
        // the icon would be a solid rectangle.
        expect(svgIcons.nordicFlag()).toContain('M9 11H4v2h5v6h2v-6h9v-2h-9V5h-2z');
        // bunting: rope + EXACTLY three pendant triangles (each `l-2.5 6z`)
        expect(svgIcons.bunting().match(/l-2\.5 6z/g)).toEqual(
            new Array(3).fill('l-2.5 6z')
        );
        expect(svgIcons.bunting()).toContain('M16 5h5l-2.5 6z');

        // ── animals subset — REDRAWN originals (VISUAL-TESTS-13) ──────────
        // cat: the single-silhouette head+ears body (ear tips, forehead dip,
        // rounded chin) + the LEFT inner-ear / nose / ω-mouth hole
        // fragments verbatim + the evenodd attribute (explicit, winding
        // irrelevant) + the whisker overlay
        expect(svgIcons.cat()).toContain('M5 2.4L8.6 8.2Q12 7.2 15.4 8.2L19 2.4Q21.1 3.6 20.6 9.4');
        expect(svgIcons.cat()).toContain('M5.5 4.2L7.2 7.2 5.6 7.6zM18.5 4.2L16.8 7.2 18.4 7.6z');
        expect(svgIcons.cat()).toContain(
            'M11 15.4L13 15.4 12 16.9zM10.4 17.2A0.8 0.8 0 0 1 12 17.2A0.8 0.8 0 0 1 13.6 17.2z'
        );
        expect(svgIcons.cat()).toContain('M1.4 12.4h3.2v0.6h-3.2zM1.2 14.3h3.4v0.6h-3.4zM1.6 16.2h3v0.6h-3z');
        expect(svgIcons.cat().match(/fill-rule="evenodd"/g)).toEqual(new Array(1).fill('fill-rule="evenodd"'));
        // dog: drooping-ear lobes rooted INSIDE the head outline (Q-rounded
        // bottom cap), the thin inner-ear slots clear of the head circle and
        // the light muzzle patch hole with the dark nose + mouth re-fills —
        // TWO evenodd elements (face + ears), no <circle>
        expect(svgIcons.dog()).toContain(
            'M10.6 8.2Q8.4 6.8 6 7.6Q3.6 8.6 2.8 11.4Q2.2 14.4 4 16.6Q5.6 18.2 7.4 17.2Q8.8 16.2 9.2 13.4Q9.6 10.6 10.6 8.2z'
        );
        expect(svgIcons.dog()).toContain('M4.2 10.2v5h1.4v-5z');
        expect(svgIcons.dog()).toContain('M18.4 10.2v5h1.4v-5z');
        expect(svgIcons.dog()).toContain(
            'M9.3 16a2.7 2.1 0 1 0 5.4 0a2.7 2.1 0 1 0 -5.4 0zM10.9 14.9L13.1 14.9 12 16.4zM11.7 16.7v1.1h0.6v-1.1z'
        );
        expect(svgIcons.dog().match(/fill-rule="evenodd"/g)).toEqual(new Array(2).fill('fill-rule="evenodd"'));
        // rabbit: the long rounded-band ears with tall inner-ear slots
        // (left pair verbatim) + the head circle + the eye/nose/philtrum/ω
        // mouth holes — TWO evenodd elements (ears + body — cross-element
        // overlap unions at the ear roots instead of XOR-punching seams) +
        // the whisker overlay
        expect(svgIcons.rabbit()).toContain('M5.8 3.2Q5.8 1.4 7.8 1.4Q9.8 1.4 9.8 3.2L9.8 12L5.8 12zM6.9 3v6.6h1.8V3z');
        expect(svgIcons.rabbit()).toContain('M6.1 15.4a5.9 5.9 0 1 1 11.8 0a5.9 5.9 0 1 1 -11.8 0z');
        expect(svgIcons.rabbit()).toContain(
            'M11.1 16.6h1.8l-0.9 1.4zM11.7 18.4v0.9h0.6v-0.9zM10.55 19.9A0.55 0.55 0 0 1 11.65 19.9A0.55 0.55 0 0 1 12.75 19.9z'
        );
        expect(svgIcons.rabbit()).toContain(
            'M3.2 14.4h2.8v0.55h-2.8zM3.2 16.1h2.8v0.55h-2.8zM18 14.4h2.8v0.55h-2.8zM18 16.1h2.8v0.55h-2.8z'
        );
        expect(svgIcons.rabbit().match(/fill-rule="evenodd"/g)).toEqual(new Array(2).fill('fill-rule="evenodd"'));
        // bird: songbird profile — head circle + near-beak eye hole, body
        // ellipse + folded-wing leaf slot, the two crest plumes, the short
        // thick beak wedge, the two up-left tail feathers and the legs/feet
        // pairs (each contiguous pair pinned verbatim) — TWO evenodd
        // elements, no <circle>
        expect(svgIcons.bird()).toContain('M12.3 8.4a3.3 3.3 0 1 1 6.6 0a3.3 3.3 0 1 1 -6.6 0z');
        expect(svgIcons.bird()).toContain('M15.45 7.9a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z');
        expect(svgIcons.bird()).toContain(
            'M4.5 14.4a5.9 4.5 0 1 1 11.8 0a5.9 4.5 0 1 1 -11.8 0zM7.6 14.4Q9.6 12.6 12.6 13Q13.9 13.2 13.2 14.6Q12.4 16 10.4 16Q8.2 16 7.6 14.4z'
        );
        expect(svgIcons.bird()).toContain('M13.8 6Q13.2 3.2 14.6 1.8Q14.9 1.6 15 2L15.4 5.4zM15.8 5.2Q16 2.6 17.6 1.6Q18 1.5 17.9 2L17.6 6z');
        expect(svgIcons.bird()).toContain('M18.6 7.4L21.9 9.2 18.5 10.6z');
        expect(svgIcons.bird()).toContain('M5.8 13.4L2.4 9Q1.8 8.2 2.8 8.4L7 11.2zM5.8 15L2.2 12.6Q1.6 12.2 2.4 11.8L6.8 13.6z');
        expect(svgIcons.bird()).toContain('M9.6 18.5h0.9v2.3h-0.9zM12.3 18.5h0.9v2.3h-0.9zM9.1 20.8h2v0.6h-2zM11.9 20.8h2v0.6h-2z');
        expect(svgIcons.bird().match(/fill-rule="evenodd"/g)).toEqual(new Array(2).fill('fill-rule="evenodd"'));
        // fish: almond body + eye hole + gill crescent slot in ONE evenodd
        // element, the curved dorsal fin, the forked two-lobe tail with the
        // pinch notch, the pectoral fin and EXACTLY three solid bubble
        // <circle> elements (largest one verbatim)
        expect(svgIcons.fish()).toContain(
            'M2.2 12.6Q4.4 9 8.4 8.6Q13 8.2 16.4 10.6L16.4 15Q13 17.4 8.4 17Q4.4 16.6 2.2 12.6z'
        );
        expect(svgIcons.fish()).toContain(
            'M4.4 11.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0zM9 9.9A3.3 3.3 0 0 0 9 15.3A2.7 3.3 0 0 1 9 9.9z'
        );
        expect(svgIcons.fish()).toContain('M15.8 10.6L20.6 7Q21.7 6.4 21.4 7.6L20.1 11.5Q19.9 12.6 20.1 13.7L21.4 17.6Q21.7 18.8 20.6 18.2L15.8 15z');
        expect(svgIcons.fish().match(/<circle /g)).toEqual(['<circle ', '<circle ', '<circle ']);
        expect(svgIcons.fish()).toContain('<circle cx="3.4" cy="8.4" r="0.55"');
        // bear: head circle + eye/muzzle-patch holes + nose/mouth re-fills
        // in ONE evenodd element + the SEPARATE ear evenodd element (both
        // outer-ear circle pairs and their r-0.8 inner-ear holes share ONE
        // paint operation — left outer/hole pair verbatim; EXACTLY two
        // evenodd elements and NO <circle> remain, the null match is the
        // exact absence assertion)
        expect(svgIcons.bear()).toContain('M4.4 13.2a7.6 7.6 0 1 1 15.2 0a7.6 7.6 0 1 1 -15.2 0z');
        expect(svgIcons.bear()).toContain(
            'M8.1 11.6a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0zM14 11.6a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z'
        );
        expect(svgIcons.bear()).toContain(
            'M8.7 16.9a3.3 2.5 0 1 0 6.6 0a3.3 2.5 0 1 0 -6.6 0zM10.5 15.5a1.5 1.1 0 1 0 3 0a1.5 1.1 0 1 0 -3 0zM11.7 17.2v2h0.6v-2z'
        );
        expect(svgIcons.bear()).toContain(
            'M4.2 7a2.7 2.7 0 1 1 5.4 0a2.7 2.7 0 1 1 -5.4 0zM5.1 5.8a.8 .8 0 1 1 1.6 0a.8 .8 0 1 1 -1.6 0zM14.4 7a2.7 2.7 0 1 1 5.4 0a2.7 2.7 0 1 1 -5.4 0zM17.3 5.8a.8 .8 0 1 1 1.6 0a.8 .8 0 1 1 -1.6 0z'
        );
        expect(svgIcons.bear().match(/<circle /g)).toBeNull();
        expect(svgIcons.bear().match(/fill-rule="evenodd"/g)).toEqual(new Array(2).fill('fill-rule="evenodd"'));
        // dragon: full body — horned head (crown → open jaw → throat), eye +
        // nostril holes, the two horn spikes, the fang, the serpentine
        // chest, the curled tail, the two feet claws and the bat wing with
        // its membrane slot — TWO evenodd elements (head + wing)
        expect(svgIcons.dragon()).toContain(
            'M9 4.6Q10 3.8 11.6 4Q15 4.4 18 6.6Q20.8 8.4 21.8 9.4L21.7 10.9Q19.4 11.5 17 11L17.2 11.8L20.4 13.4L20 14.8Q17 14.2 14.6 15.2Q12.6 16 11 16L8.6 16.6L7.4 8z'
        );
        expect(svgIcons.dragon()).toContain('M11.7 7a1 1 0 1 0 2 0a1 1 0 1 0 -2 0zM19.5 8.5a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z');
        expect(svgIcons.dragon()).toContain(
            'M9.2 14.2Q7.4 16 7.8 18.4Q8.2 20.8 10.8 21L16.2 21Q17.6 19.4 17.2 17Q16.8 14.6 14.8 13.6Q11.8 12.6 9.2 14.2z'
        );
        expect(svgIcons.dragon()).toContain('M9.2 20.6h1.6v1.3h-1.6zM13.4 20.8h1.6v1.1h-1.6z');
        expect(svgIcons.dragon()).toContain('M10.5 16L2 5.6Q2.7 10 1.5 13Q4.1 11.8 5.2 15.2Q7 13.7 8.3 18zM8.7 14.7L3.5 8.8 8 15.3z');
        expect(svgIcons.dragon().match(/fill-rule="evenodd"/g)).toEqual(new Array(2).fill('fill-rule="evenodd"'));
        // snake: the smooth S-ribbon (C curves top and mirrored bottom),
        // the ovoid blunt-snouted head overlapping the ribbon's right end
        // ACROSS elements (union, no same-element XOR), the head's eye
        // hole, the THREE spot holes MERGED INTO the ribbon's d (one evenodd
        // paint operation — spots can never be opaque circles over a filled
        // ribbon) and the forked-tongue bar pair — THREE evenodd elements
        // (ribbon+spots / head / tongue is the flatPath overlay)
        expect(svgIcons.snake()).toContain(
            'M1.6 10.8C4.4 7.2 7.6 7.2 10.2 10.4C12.8 13.6 16 13.6 18.8 10.8L18.8 14.4C16 17.2 12.8 17.2 10.2 14C7.6 10.8 4.4 10.8 1.6 14.4zM3.8 12.2a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0zM8.2 10.7a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0zM13.6 14.9a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z'
        );
        expect(svgIcons.snake()).toContain('M16.8 9.9Q21 9 22.2 11Q22.6 12 21.9 13.2Q20.3 15.3 16.8 14.4zM19.4 11.3a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z');
        expect(svgIcons.snake()).toContain('M22.2 11.8L23.5 10.6 23.7 10.9 22.5 12.1zM22.3 12.2L23.7 13.3 23.5 13.6 22.2 12.5z');
        expect(svgIcons.snake().match(/fill-rule="evenodd"/g)).toEqual(new Array(2).fill('fill-rule="evenodd"'));
        // turtle: the domed shell (flat chord at y 15.4) + plate spots + rim
        // band hole in ONE evenodd element, the rounded-bottom legs + tail
        // wedge flatPath, and the head/eye pair sharing ONE evenodd paint
        // operation (the eye hole rides the head's own d — the old opaque
        // head <circle> + trailing eye flatPath is gone)
        expect(svgIcons.turtle()).toContain('M2.8 15.4a8.7 7.4 0 0 1 17.4 0z');
        expect(svgIcons.turtle()).toContain(
            'M5.4 13a1 1 0 1 0 2 0a1 1 0 1 0 -2 0zM9.4 11.6a1 1 0 1 0 2 0a1 1 0 1 0 -2 0zM13.4 13a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z'
        );
        expect(svgIcons.turtle()).toContain('M4.2 13.9v0.75h15.2v-0.75z');
        expect(svgIcons.turtle()).toContain('M5.2 15.4h2.6v3.1a1.3 1.3 0 0 1 -2.6 0zM14.2 15.4h2.6v3.1a1.3 1.3 0 0 1 -2.6 0z');
        expect(svgIcons.turtle()).toContain('M3.4 15.4L1.4 16.6 3.4 17.4z');
        expect(svgIcons.turtle()).toContain('M18.7 13.6a2.3 2.3 0 1 1 4.6 0a2.3 2.3 0 1 1 -4.6 0zM21.3 13.3a.5 .5 0 1 1 1 0a.5 .5 0 1 1 -1 0z');
        expect(svgIcons.turtle().match(/<circle /g)).toBeNull();
        expect(svgIcons.turtle().match(/fill-rule="evenodd"/g)).toEqual(new Array(2).fill('fill-rule="evenodd"'));
        // paw: the bilobed palm bean (Q-shoulders + heel lobes) + EXACTLY
        // four solid rotated teardrop <ellipse> pads — the gaps between pads
        // stay negative space (cross-element union, no same-element XOR)
        expect(svgIcons.paw()).toContain(
            'M12 12.8Q16.6 12.8 17.1 16.2Q17.6 18.9 16.1 20.5Q14.4 22 12 21.9Q9.6 22 7.9 20.5Q6.4 18.9 6.9 16.2Q7.4 12.8 12 12.8z'
        );
        expect(svgIcons.paw().match(/<ellipse /g)).toEqual(new Array(4).fill('<ellipse '));
        expect(svgIcons.paw()).toContain('<ellipse cx="5" cy="10.9" rx="1.9" ry="2.4" transform="rotate(-24 5 10.9)"');

        // ── animals subset — the 2019-Addition block (horse … duck),
        // redrawn in VISUAL-TESTS-13 ─────────────────────────────────────
        // horse: the Q-curved head/neck profile (elongated straight muzzle
        // bridge from the muzzle tip to the forehead) + the mane triangles
        // verbatim
        expect(svgIcons.horse()).toContain(
            'M2 10.4Q2.2 9.4 3.4 9.2L7.6 4.6Q8.6 3.8 10 4.4L12.6 5.8Q14.4 6.8 15 9.4Q15.8 12.6 16.6 16.4L17.6 21L10.8 21Q10.6 16.8 9.6 14.6Q6.4 14 4.4 12.4Q2.4 12 2 10.4z'
        );
        expect(svgIcons.horse()).toContain('M14.8 8.6L18 9.2 15.2 11zM15.4 12L18.8 12.8 15.8 14.6zM16 15.6L19.4 16.6 16.4 18.2z');
        // lion: the jagged 12-spike mane star (outer/inner radii jittered ±4°
        // — verbatim), the r-6.4 face disc as an evenodd hole inside it, the
        // depth-3 dark features and the ear bumps on the face's top edge in
        // the SECOND evenodd element — NO <circle> elements (the old 8-scallop
        // circle mane is gone)
        expect(svgIcons.lion()).toContain(
            'M1.9 12.2L4.66 10.23L4.29 7L7.28 6.77L6.5 3.73L9.59 4.78L12.33 2.81L14.16 5.12L16.38 3.21L16.99 6.46L20.29 7.98L19.04 10.7L22.09 11.85L19.6 13.95L19.79 17.46L16.99 17.94L17.45 20.59L14.22 19.05L11.68 21.49L9.84 19.28L7.57 21.28L7.01 17.94L3.62 16.47L4.37 13.82z'
        );
        expect(svgIcons.lion()).toContain('M5.6 12.2a6.4 6.4 0 1 0 12.8 0a6.4 6.4 0 1 0 -12.8 0z');
        expect(svgIcons.lion()).toContain(
            'M10.9 13.7h2.2l-1.1 1.7zM11.7 15.6v1.2h0.6v-1.2zM10.35 17.4A0.65 0.65 0 0 1 11.65 17.4A0.65 0.65 0 0 1 12.95 17.4A0.65 0.65 0 0 1 14.25 17.4z'
        );
        expect(svgIcons.lion()).toContain('M5.8 7.1a1.5 1.5 0 1 1 3 0a1.5 1.5 0 1 1 -3 0zM6.55 7.1a0.75 0.75 0 1 0 1.5 0a0.75 0.75 0 1 0 -1.5 0z');
        expect(svgIcons.lion()).toContain('M15.2 7.1a1.5 1.5 0 1 1 3 0a1.5 1.5 0 1 1 -3 0zM15.95 7.1a0.75 0.75 0 1 0 1.5 0a0.75 0.75 0 1 0 -1.5 0z');
        expect(svgIcons.lion().match(/<circle /g)).toBeNull();
        expect(svgIcons.lion().match(/fill-rule="evenodd"/g)).toEqual(new Array(2).fill('fill-rule="evenodd"'));
        // owl: sharp ear tufts, the egg body (narrow top Q to the wider
        // base), the TWO r-2.4 eye-ring holes with solid pupil dots
        // re-centered inside (the dots are separate <circle> elements AFTER
        // the hole path, so both survive verbatim), the beak + belly
        // chevron holes and the rounded feet
        expect(svgIcons.owl()).toContain('M6.6 8L4.6 2.6Q4.5 2.2 5 2.4L10 5.2zM17.4 8L19.4 2.6Q19.5 2.2 19 2.4L14 5.2z');
        expect(svgIcons.owl()).toContain('M12 4.8Q18.6 4.8 18.6 12L18.6 18Q18.6 20.8 15.8 20.8L8.2 20.8Q5.4 20.8 5.4 18L5.4 12Q5.4 4.8 12 4.8z');
        expect(svgIcons.owl()).toContain('M6.9 10.9a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0 -4.8 0zM12.3 10.9a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0 -4.8 0z');
        expect(svgIcons.owl()).toContain('<circle cx="9.3" cy="10.9" r="1.05"');
        expect(svgIcons.owl()).toContain('<circle cx="14.7" cy="10.9" r="1.05"');
        expect(svgIcons.owl()).toContain(
            'M11.15 13.9l0.85 2.2 0.85-2.2zM8.15 17l0.85 1.3 0.85-1.3zM11.15 17l0.85 1.3 0.85-1.3zM14.15 17l0.85 1.3 0.85-1.3zM8.5 20.7h1.9v0.4a0.95 0.95 0 0 1 -1.9 0zM13.6 20.7h1.9v0.4a0.95 0.95 0 0 1 -1.9 0z'
        );
        // fox: the tall ear triangles + inner-ear holes near the tips, the
        // Q-rounded brow corners of the head outline and the flatPath chin
        // wedge completing the V jaw
        expect(svgIcons.fox()).toContain('M6.4 7.4L4.8 1.4Q4.7 1 5.2 1.2L10 5.2zM17.6 7.4L19.2 1.4Q19.3 1 18.8 1.2L14 5.2z');
        expect(svgIcons.fox()).toContain('M6.1 3.3L6.5 5.6 7.7 4.4zM17.9 3.3L17.5 5.6 16.3 4.4z');
        expect(svgIcons.fox()).toContain(
            'M12 21.4L7.6 16.4Q4.4 14.6 3.2 13.6L4.4 10.4Q5 7.4 7.6 6.4Q10 5.6 12 6.8Q14 5.6 16.4 6.4Q19 7.4 19.6 10.4L20.8 13.6Q16.4 14.6 16.4 16.4z'
        );
        expect(svgIcons.fox()).toContain('M12 21.4L7.6 16.4Q9.4 17.6 12 17.6Q14.6 17.6 16.4 16.4z');
        // whale: the domed back + raised tail stock, the eye + smile slit
        // holes, the WIDE two-lobed horizontal flukes (not a vertical fish
        // fork), the pectoral flipper and the three-bar spout (column +
        // two V branches, contiguous pairs verbatim)
        expect(svgIcons.whale()).toContain(
            'M2.4 13.2Q2.4 10 5.4 8.8Q10 6.9 14.6 8.6Q17 10.2 18.2 7.1L19.6 8.1Q19.7 13.2 17.6 15.6Q14.4 17.9 10 17.9Q5 17.9 2.9 15.2Q2 14.3 2.4 13.2z'
        );
        expect(svgIcons.whale()).toContain('M4.5 12.4a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0zM4.3 15.7Q8.4 16.9 12.6 15.8L12.6 15Q8.4 16.1 4.3 14.9z');
        expect(svgIcons.whale()).toContain('M18.8 8.8Q15 8.7 13.8 4.5Q16.4 4.4 18.8 6.7Q20.3 4.2 23 3.9Q22.6 7.8 18.8 8.8z');
        expect(svgIcons.whale()).toContain('M6.55 8.4L6.55 4.4 7.45 4.4 7.45 8.4z');
        expect(svgIcons.whale()).toContain('M6.7 4.7L4.7 2.5Q4.4 2.2 4.9 2.3L7.6 4.1zM7.3 4.1L9.7 2.1Q10.1 2 9.9 2.5L8.3 4.7z');
        // frog: periscope eye bumps (dark circle → light iris hole → dark
        // pupil, strictly nested), the wide body with the long smile slit +
        // two nostril holes and the webbed feet with two toe slits each —
        // THREE evenodd elements, no <circle>
        expect(svgIcons.frog()).toContain(
            'M4.65 5.9a2.55 2.55 0 1 1 5.1 0a2.55 2.55 0 1 1 -5.1 0zM6.05 5.9a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0zM7.2 5.9a0.55 0.55 0 1 1 1.1 0a0.55 0.55 0 1 1 -1.1 0z'
        );
        expect(svgIcons.frog()).toContain(
            'M14.25 5.9a2.55 2.55 0 1 1 5.1 0a2.55 2.55 0 1 1 -5.1 0zM15.65 5.9a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0zM16.8 5.9a0.55 0.55 0 1 1 1.1 0a0.55 0.55 0 1 1 -1.1 0z'
        );
        expect(svgIcons.frog()).toContain('M5.6 13.4Q12 15.6 18.4 13.4L18.4 12.6Q12 14.8 5.6 12.6z');
        expect(svgIcons.frog()).toContain(
            'M5.6 19.4h4.4v1.5a2.2 2.2 0 0 1 -4.4 0zM7.4 21.2v-1h0.45v1zM8.35 21.2v-1h0.45v1zM14 19.4h4.4v1.5a2.2 2.2 0 0 1 -4.4 0zM15.8 21.2v-1h0.45v1zM16.75 21.2v-1h0.45v1z'
        );
        expect(svgIcons.frog().match(/<circle /g)).toBeNull();
        expect(svgIcons.frog().match(/fill-rule="evenodd"/g)).toEqual(new Array(3).fill('fill-rule="evenodd"'));
        // snail: the concentric target-ring shell (solid r 5.3 → hole r 3.65
        // → refill r 2.85 → hole r 1.35 — alternating solid/hole by evenodd
        // depth), the SEPARATE evenodd body path (arched base + head stalk +
        // antennae — solid wedges INSIDE the same paint op, so they cannot
        // be covered by later fills — + the eye hole inside the head stalk)
        // and the two solid antenna tip <circle> dots
        expect(svgIcons.snail()).toContain(
            'M9.8 12.4a5.3 5.3 0 1 1 10.6 0a5.3 5.3 0 1 1 -10.6 0zM11.45 12.4a3.65 3.65 0 1 0 7.3 0a3.65 3.65 0 1 0 -7.3 0zM12.25 12.4a2.85 2.85 0 1 1 5.7 0a2.85 2.85 0 1 1 -5.7 0zM13.75 12.4a1.35 1.35 0 1 0 2.7 0a1.35 1.35 0 1 0 -2.7 0z'
        );
        expect(svgIcons.snail()).toContain(
            'M2.2 19.6L2.2 18.2Q2.2 16 5 15.9L6 15.9L6 10.8Q6 8.4 8 8.4Q10 8.4 10 10.8L10 16.6L18.6 16.6Q20.4 16.6 20.4 18.2L20.4 19.6zM6.6 8.8L5.1 4.6 5.9 4.3 7.3 8.7zM8.7 8.8L9.7 4.2 10.5 4.4 9.5 8.8zM7.05 10.4a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z'
        );
        expect(svgIcons.snail()).toContain('<circle cx="5.4" cy="4.3" r="0.8"');
        expect(svgIcons.snail()).toContain('<circle cx="10.3" cy="4.2" r="0.8"');
        // duck: the solid bill wedge pointing right (Q-rounded) and BOTH
        // water ripple bars under the body
        expect(svgIcons.duck()).toContain('M17 5.8Q21.8 5.5 22 7Q21.8 8.5 17 8.2z');
        expect(svgIcons.duck()).toContain('M2.6 21.2h13.6v0.9h-13.6zM5.4 22.7h9v0.7h-9z');
        // butterfly: EXACTLY four rotated wing <path> elements (upper pair
        // rx 3.9 ry 4.7; each evenodd path carries its own spot hole) +
        // the antenna flatPath + the segmented body <rect> (rx'd, verbatim)
        // + EXACTLY three <circle> elements (head + two antenna tips) and
        // EXACTLY four evenodd attributes (the four wing paths)
        expect(svgIcons.butterfly().match(/<path /g)).toEqual(new Array(5).fill('<path '));
        expect(svgIcons.butterfly().match(/transform="rotate\(-24 7\.4 9\.2\)"/g)).toEqual(
            new Array(1).fill('transform="rotate(-24 7.4 9.2)"')
        );
        expect(svgIcons.butterfly()).toContain(
            '<path d="M3.5 9.2a3.9 4.7 0 1 1 7.8 0a3.9 4.7 0 1 1 -7.8 0zM6.3 9.2a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z" transform="rotate(-24 7.4 9.2)"'
        );
        expect(svgIcons.butterfly()).toContain(
            '<rect x="11.25" y="7.4" width="1.5" height="11.6" rx="0.75"'
        );
        expect(svgIcons.butterfly().match(/<circle /g)).toEqual(new Array(3).fill('<circle '));
        expect(svgIcons.butterfly().match(/fill-rule="evenodd"/g)).toEqual(new Array(4).fill('fill-rule="evenodd"'));

        // ── animals subset — one addition block fragment (chameleon) ──────
        // chameleon: the casque head + arched body outline, the eye turret
        // ring hole + mouth line hole, the zigzag front leg, the outer and
        // inner C-ribbon tail spiral (with the connecting wedge) and the
        // two solid dots (pupil re-centered in the ring + spiral center) —
        // the round-trip name for the 40 additions
        expect(svgIcons.chameleon()).toContain(
            'M2.6 8.8Q4.2 6.4 5.6 5.6Q6.6 3.6 8 3.8Q9.4 4.2 10.2 6Q13.6 6.8 15 10.2Q16.2 13.2 14.6 15.6Q13.6 16.6 12 16.6L10.8 16.2L11 15Q11.6 13.8 10.6 12.4Q9.6 11 8.6 10.6Q7.4 10.2 6.4 10.4Q4.4 10.6 3 10.2L2.6 9.4z'
        );
        expect(svgIcons.chameleon()).toContain('M4.3 8a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0zM2.9 9.2v0.6h2.6v-0.6z');
        expect(svgIcons.chameleon()).toContain('M10.6 16A4 4 0 1 1 14.6 20L14.6 18.9A2.9 2.9 0 1 0 11.7 16z');
        expect(svgIcons.chameleon()).toContain('M16.2 16A1.6 1.6 0 1 1 14.6 14.4L14.6 15.3A0.7 0.7 0 1 0 15.3 16z');
        expect(svgIcons.chameleon()).toContain('<circle cx="5.6" cy="8" r="0.55"');
        expect(svgIcons.chameleon()).toContain('<circle cx="14.6" cy="16" r="0.55"');

        // ── fruits subset — ALL 19 reworked by VISUAL-TESTS-12 ─────────────
        // Every hole below is cut EXPLICITLY by fill-rule="evenodd" (the
        // template literal appends it after the flat pair) instead of
        // load-bearing sweep direction; fragments were derived from each
        // module source and confirmed byte-for-byte against
        // Temp/visual/probe-fruits-vt12*.ts.
        // apple: the two-lobe body rising to the (12,7.4) top dimple and
        // closing through the S command, the evenodd left highlight
        // crescent and the flatPath stem + leaf lens
        expect(svgIcons.apple()).toContain(
            'M12 7.4C9.5 5.3 5.8 6.1 4.1 8.8 1.9 12.5 4.2 19.2 7.2 21.4 9.2 22.9 10.5 21.2 12 21.2S14.8 22.9 16.8 21.4C19.8 19.2 22.1 12.5 19.9 8.8 18.2 6.1 14.5 5.3 12 7.4z'
        );
        expect(svgIcons.apple()).toContain('M6.3 10C5 11.7 5.1 14 5.8 15.4L7 14.9C6.5 13.4 6.6 11.9 7.4 10.8z');
        expect(svgIcons.apple()).toContain(
            'M11.3 7.8C11.1 5.4 11.5 3.5 12.8 1.8L14 2.7C12.9 4.2 12.6 5.8 12.8 7.8zM14 5.2C14.1 2.6 17.1 1.5 20 2.3 18.9 4.9 16.8 6.2 14 5.2z'
        );
        // EXACTLY one fill-rule="evenodd" attribute (the body template)
        expect(svgIcons.apple().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // watermelon: the evenodd flesh half-disc (mirrored S cubic through
        // (12,15.6)), the THREE contiguous teardrop seed holes and the
        // SEPARATED flatPath rind band annulus (the 1.4-unit pith + rind)
        expect(svgIcons.watermelon()).toContain('M4 7H20C20 11.8 16.5 15.6 12 15.6S4 11.8 4 7z');
        expect(svgIcons.watermelon()).toContain(
            'M7.3 8.4C6.4 9.2 6.7 10.5 7.5 10.5 8.4 10.4 8.4 9.3 7.3 8.4zM12 11C10.9 11.9 11 13.2 12 13.2S13.1 11.9 12 11zM16.7 8.4C15.6 9.3 15.6 10.4 16.5 10.5 17.3 10.5 17.6 9.2 16.7 8.4z'
        );
        expect(svgIcons.watermelon()).toContain(
            'M1.5 7H2.8C2.8 12.6 6.8 17 12 17S21.2 12.6 21.2 7H22.5C22.5 14.3 18 20.4 12 20.4S1.5 14.3 1.5 7z'
        );
        expect(svgIcons.watermelon().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // banana: the thick crescent (concave top edge dipping through
        // (18.1,15.1) + the raised blossom tip), the evenodd inner ridge
        // hole and the flatPath stem + blossom-tip wedges
        expect(svgIcons.banana()).toContain(
            'M4.3 5.3C4.2 11.7 10.7 17.3 18.1 15.1L20.9 12.9C21.4 17.3 17.5 21.6 12.6 21.6 6.1 21.6 1.9 15.3 2.6 8.2z'
        );
        expect(svgIcons.banana()).toContain(
            'M5.2 12.1C7.3 17.3 12.3 19.7 17.2 17.7L16.8 16.7C12.4 18.1 8.2 16.2 6.2 11.7z'
        );
        expect(svgIcons.banana()).toContain('M2.6 8.3L2.1 3.1 4.2 2.7 4.7 5.7zM18.1 15.2L20 10.8 21.5 11.4 20.9 14.3z');
        expect(svgIcons.banana().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // cherry: the flatPath comes FIRST here (two diverging stalk bands
        // + the leaf lens), then the evenodd berry path — each berry
        // carrying its Q-curve shine hole INSIDE the berry subpath (the
        // old solid berry <circle> elements are GONE — match() null is
        // the exact absence assertion)
        expect(svgIcons.cherry()).toContain(
            'M6.7 13.9C7.2 8.6 10 4.2 13.8 2.1L14.6 3.2C11.1 5.8 8.9 9.3 8.2 14.1zM16.5 14.7C16.5 9.8 15.6 6.3 13.8 2.8L15 2.2C17.2 6.4 17.9 10.2 17.9 14.7zM15.3 3C16.9 0.9 19.5 1.1 21 2.2 19.4 4.2 17.3 4.8 15.3 3z'
        );
        expect(svgIcons.cherry()).toContain(
            'M7.6 13.4C4.2 11.5 1.8 14 2.2 17.1 2.6 20.1 4.8 22 7.4 21.5 10.2 22 12.2 19.7 12 16.8 11.8 14 9.9 12.1 7.6 13.4zM4.2 15.1Q3 16.5 3.8 18.1L4.9 17.7Q4.4 16.6 5.2 15.8z'
        );
        expect(svgIcons.cherry()).toContain(
            'M17 14.5C14.4 12.7 12 14.9 12.2 17.8 12.5 20.7 14.6 22.5 17 22 19.8 22.5 22 20.2 21.8 17.5 21.6 14.7 19.3 12.9 17 14.5zM14.3 16Q13.3 17.3 14 18.7L15.1 18.3Q14.7 17.3 15.4 16.7z'
        );
        expect(svgIcons.cherry().match(/<circle /g)).toBeNull();
        expect(svgIcons.cherry().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // grape: the flatPath (stem + right leaf blade + left tendril
        // curl), the <g> cluster block verbatim and EXACTLY six r-2.6
        // berry circles in the 3-2-1 hanging rows (the old nine-berry
        // diamond is gone)
        expect(svgIcons.grape()).toContain(
            'M11.4 7V2h1.4v5zM13.4 4.7C14.2 1.5 17.9 1.3 20.1 2.8L17.9 3.7 18.6 5.2 16.4 5 15.7 6.5zM10.2 4.9C7.8 2.7 5.1 3.4 5.2 5.4 5.3 6.8 6.5 7.2 7.6 6.7L7.2 5.7C6.6 6 6.2 5.8 6.2 5.3 6.2 4.4 8 4.2 9.5 5.8z'
        );
        expect(svgIcons.grape()).toContain(
            '<g fill="currentColor" stroke="none"><circle cx="6.5" cy="9.2" r="2.6"/><circle cx="12" cy="8.8" r="2.6"/><circle cx="17.5" cy="9.2" r="2.6"/><circle cx="9.2" cy="14.1" r="2.6"/><circle cx="14.8" cy="14.1" r="2.6"/><circle cx="12" cy="19.1" r="2.6"/></g>'
        );
        expect(svgIcons.grape().match(/<circle /g)).toEqual(new Array(6).fill('<circle '));
        // orange: the round body arc (the silhouette that contrasts
        // apple's lobes), the evenodd curved highlight, the THREE
        // contiguous r-0.65 peel-pore holes and the flatPath stem + leaf
        expect(svgIcons.orange()).toContain('M20.6 13.9a8.6 8.6 0 1 1 -17.2 0 8.6 8.6 0 1 1 17.2 0z');
        expect(svgIcons.orange()).toContain('M7.7 7.9C5.8 9 4.9 11 5.2 13.1L6.5 13C6.3 11.3 7 10 8.4 9.1z');
        expect(svgIcons.orange()).toContain(
            'M14.4 18a.65.65 0 1 0 1.3 0 .65.65 0 1 0 -1.3 0zM17 15.4a.65.65 0 1 0 1.3 0 .65.65 0 1 0 -1.3 0zM17.1 18.6a.65.65 0 1 0 1.3 0 .65.65 0 1 0 -1.3 0z'
        );
        expect(svgIcons.orange()).toContain(
            'M11.4 6.2L11 2.3 12.5 2.1 12.9 6.2zM13.6 4.4C14.6 1.5 18.2 1 21 2.2 19.3 4.7 16.3 5.8 13.6 4.4z'
        );
        expect(svgIcons.orange().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // lemon: the ONE continuous pointed oval (the old tilted
        // <ellipse> + detached nub circles are GONE — both match() nulls
        // are exact absence assertions), the evenodd diagonal highlight
        // and the flatPath leaf
        expect(svgIcons.lemon()).toContain(
            'M3.8 14.1C3.6 10.3 8.2 6.2 12.8 6.2 15.6 6.1 17.1 7.3 18.6 7.1L20.3 6.9 20.1 9C20 10.1 21 11.1 20.4 13.6 19.5 17.8 15.1 21.1 10.7 21 7.8 21 6.2 19.6 5.2 19.7L3.3 19.9 3.5 18C3.7 16.9 3.4 15.8 3.8 14.1z'
        );
        expect(svgIcons.lemon()).toContain('M6 13.1C7.1 10.3 9.6 8.7 12.5 8.5L12.6 9.8C10.1 10 8.3 11.4 7.2 13.6z');
        expect(svgIcons.lemon()).toContain('M16.7 4.9C17.4 2.2 20 1.3 22.1 1.8 21.7 4.1 19.4 5.6 16.7 4.9z');
        expect(svgIcons.lemon().match(/<ellipse /g)).toBeNull();
        expect(svgIcons.lemon().match(/<circle /g)).toBeNull();
        expect(svgIcons.lemon().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // pear: the bent-neck body (neck curving through (15.8,11) into the
        // heavy rounded hips), the evenodd left-hip highlight and the
        // flatPath stem + leaf
        expect(svgIcons.pear()).toContain(
            'M12 5.2C14.8 5.2 14.5 8.7 15.8 11 17 13.1 19.8 14.6 19.6 17.7 19.4 21 16.4 22.4 12 22.4 7.8 22.4 4.4 20.9 4.4 17.6 4.4 14.7 7 12.8 8.2 10.4 9.4 8.1 9.2 5.2 12 5.2z'
        );
        expect(svgIcons.pear()).toContain('M7.2 14.4C5.8 16.5 6.2 18.5 7.6 19.6L8.4 18.6C7.4 17.7 7.4 16.4 8.3 15.1z');
        expect(svgIcons.pear()).toContain(
            'M11.2 6C10.9 4.2 11.6 2.2 12.9 1L14 2C13 3.1 12.4 4.4 12.7 6zM14.2 4.3C15.3 1.9 17.7 1.8 19.7 2.9 18.3 4.9 16.1 5.4 14.2 4.3z'
        );
        expect(svgIcons.pear().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // strawberry: the tapered body (broad shoulders at y 8.2 narrowing
        // to the rounded point at (12,22.5)), the SEVEN evenodd seed holes
        // in their two contiguous runs (upper slant-rect-slant trio + the
        // mid/lower quartet) and the flatPath stem-stub + five-blade calyx
        // (the old round berry + arc seeds are gone)
        expect(svgIcons.strawberry()).toContain(
            'M4.4 8.2C6.1 6.8 8.8 7 12 7.7 15.2 7 17.9 6.8 19.6 8.2 22.9 11.2 17.3 20.3 12 22.5 6.7 20.3 1.1 11.2 4.4 8.2z'
        );
        expect(svgIcons.strawberry()).toContain(
            'M6.3 10.3l.4 1.9 1-.3-.4-1.9zM11.4 10.2v2h1.2v-2zM17.7 10.3l-1-.3-.4 1.9 1 .3z'
        );
        expect(svgIcons.strawberry()).toContain(
            'M8.1 14.1l.5 1.8 1.1-.3-.5-1.8zM14.8 13.8l-.5 1.8 1.1.3.5-1.8zM11.4 17.4v1.8h1.2v-1.8zM11.4 14v1.8h1.2V14z'
        );
        expect(svgIcons.strawberry()).toContain(
            'M11.4 4.8V1.5h1.3v3.3L17 3.5 15.5 6 19 6.9 14.4 8 12 6.4 9.6 8 5 6.9 8.5 6 7 3.5z'
        );
        expect(svgIcons.strawberry().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // peach: the symmetric cheeks rising to the (12,7.5) cleft, the
        // evenodd long curved suture and the flatPath stem + ONE
        // lanceolate leaf (the old flanking leaf pair is gone)
        expect(svgIcons.peach()).toContain(
            'M12 7.5C8 5.2 3.2 7.6 3 12.7 2.8 17.5 7.1 20.7 12 22.3 16.9 20.7 21.2 17.5 21 12.7 20.8 7.6 16 5.2 12 7.5z'
        );
        expect(svgIcons.peach()).toContain(
            'M12.8 8.8C16.1 11.1 16.5 16.4 12.5 20L11.7 19.1C15 15.8 14.8 11.7 12.1 9.8z'
        );
        expect(svgIcons.peach()).toContain(
            'M11.4 7.8V3.7h1.3v4.1zM13.4 5.5C14.4 2.1 18.2 1.1 21.7 1.8 20.1 4.8 17 6.4 13.4 5.5z'
        );
        expect(svgIcons.peach().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );

        // ── fruits subset — the nine 2026 additions, all re-laid ───────────
        // pineapple: the broad upright oval body, the SEVEN isolated
        // diamond scale holes as ONE contiguous run (the old intersecting
        // lattice bands cancelled/overfilled under nonzero winding — the
        // evenodd diamonds are isolated now) and the flatPath five-blade
        // pointed crown
        expect(svgIcons.pineapple()).toContain(
            'M12 8C16.6 8 19.2 10.7 19.2 15.3 19.2 19.8 16.7 22.5 12 22.5S4.8 19.8 4.8 15.3C4.8 10.7 7.4 8 12 8z'
        );
        expect(svgIcons.pineapple()).toContain(
            'M12 9.5l-1.2 1.3 1.2 1.3 1.2-1.3zM8.8 12.1l-1.2 1.3 1.2 1.3 1.2-1.3zM15.2 12.1L14 13.4l1.2 1.3 1.2-1.3zM12 14.7L10.8 16l1.2 1.3 1.2-1.3zM8.8 17.3l-1.2 1.3 1.2 1.3 1.2-1.3zM15.2 17.3L14 18.6l1.2 1.3 1.2-1.3zM12 19.5l-1 1 1 1 1-1z'
        );
        expect(svgIcons.pineapple()).toContain(
            'M9.5 8.2C6.8 7.9 5.8 5.7 5.2 3.5L9.5 6.1 8.6 1.6 11.1 4.5 12 .6 12.9 4.5 15.4 1.6 14.5 6.1 18.8 3.5C18.2 5.7 17.2 7.9 14.5 8.2z'
        );
        expect(svgIcons.pineapple().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // kiwi: the evenodd skin ring (outer sweep-1 oval + inner sweep-0
        // reversed hole), the four axis-aligned seed rects + four diagonal
        // seed parallelograms (each run contiguous; the old float-noise
        // seed ring is GONE) and the flatPath solid core lens
        expect(svgIcons.kiwi()).toContain(
            'M21.5 12a9.5 10.5 0 1 1 -19 0 9.5 10.5 0 1 1 19 0zM20 12a8 9 0 1 0 -16 0 8 9 0 1 0 16 0z'
        );
        expect(svgIcons.kiwi()).toContain(
            'M11.4 6v2h1.2V6zM11.4 16v2h1.2v-2zM6.7 11.4v1.2h2v-1.2zM15.3 11.4v1.2h2v-1.2z'
        );
        expect(svgIcons.kiwi()).toContain(
            'M8.2 7.7l-.8.8 1.4 1.4.8-.8zM15.8 7.7l-1.4 1.4.8.8 1.4-1.4zM8.8 14.1l-1.4 1.4.8.8 1.4-1.4zM15.2 14.1l-.8.8 1.4 1.4.8-.8z'
        );
        expect(svgIcons.kiwi()).toContain('M11.7 9.8Q10.9 12 11.7 14.2H12.3Q13.1 12 12.3 9.8z');
        // TWO evenodd attributes: the skin ring AND the flesh path
        expect(svgIcons.kiwi().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(2).fill('fill-rule="evenodd"')
        );
        // mango: the kidney body with the hooked beak, the evenodd inner
        // highlight and the flatPath stem + leaf (the old rotated
        // <ellipse> stays gone)
        expect(svgIcons.mango()).toContain(
            'M12.8 5.8C17.7 4.4 21.4 8 20.6 12.8 19.9 17.8 14.8 22.3 8.9 22.1 6.7 22 4.7 21 3.2 19.3 6 18.7 5.6 15.5 5.9 12.7 6.3 8.7 8.7 6.1 12.8 5.8z'
        );
        expect(svgIcons.mango()).toContain(
            'M16.2 8.2C18.7 9.6 18.7 12.6 17 15.2L15.9 14.5C17.2 12.3 17.2 10.2 15.6 9.3z'
        );
        expect(svgIcons.mango()).toContain(
            'M12 6.6L11.8 2.2 13.2 2.1 13.4 6.6zM10.8 4.9C7.4 5.5 4.5 3.9 2.9 1.6 6.4 1.2 9.5 2 10.8 4.9z'
        );
        expect(svgIcons.mango().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // avocado: the evenodd skin ring (outer body outline + inner flesh
        // outline hole) and the SEPARATE SOLID flatPath pit ellipse — the
        // pit must stay filled, so its element carries NO fill-rule (the
        // exactly-one evenodd count proves the pit lives OUTSIDE the ring
        // path)
        expect(svgIcons.avocado()).toContain(
            'M12 1.5C15.6 1.5 15.6 6 17.8 8.8 20 11.6 21 13.2 21 16.1 21 20.2 17.1 22.5 12 22.5S3 20.2 3 16.1C3 13.2 4 11.6 6.2 8.8 8.4 6 8.4 1.5 12 1.5zM12 3.2C9.8 3.2 9.8 7 7.5 9.8 5.5 12.4 4.7 13.9 4.7 16.1 4.7 19.1 7.8 20.8 12 20.8S19.3 19.1 19.3 16.1C19.3 13.9 18.5 12.4 16.5 9.8 14.2 7 14.2 3.2 12 3.2z'
        );
        expect(svgIcons.avocado()).toContain('M16.1 15.7a4.1 4.3 0 1 1 -8.2 0 4.1 4.3 0 1 1 8.2 0z');
        expect(svgIcons.avocado().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // pomegranate: the rounded slightly-squared body, the EIGHT larger
        // Q-teardrop aril holes as ONE contiguous run (rows 3-3-2; the old
        // face-like round dots and the VISUAL-TESTS-10 diamond grid are
        // gone) and the flatPath wide angular calyx crown
        expect(svgIcons.pomegranate()).toContain(
            'M12 6.9C7 5.7 3 9.3 3 14.2 3 19.5 6.4 22.4 12 22.4S21 19.5 21 14.2C21 9.3 17 5.7 12 6.9z'
        );
        expect(svgIcons.pomegranate()).toContain(
            'M8 10.4Q5.9 11.9 8 13.1 10.1 11.9 8 10.4zM12 9.8Q9.9 11.3 12 12.5 14.1 11.3 12 9.8zM16 10.4Q13.9 11.9 16 13.1 18.1 11.9 16 10.4zM8 14.4Q5.9 15.9 8 17.1 10.1 15.9 8 14.4zM12 13.8Q9.9 15.3 12 16.5 14.1 15.3 12 13.8zM16 14.4Q13.9 15.9 16 17.1 18.1 15.9 16 14.4zM10 18Q8.1 19.4 10 20.5 11.9 19.4 10 18zM14 18Q12.1 19.4 14 20.5 15.9 19.4 14 18z'
        );
        expect(svgIcons.pomegranate()).toContain('M9 7.7L7.7 2.8 10.6 4.5 12 1.4 13.4 4.5 16.3 2.8 15 7.7z');
        expect(svgIcons.pomegranate().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // blueberry: the big berry circle + its five-point calyx star hole
        // INSIDE the same evenodd path (the old stars-behind-opaque-
        // circles bug is gone — NO <circle> element remains, match() null
        // is the exact absence assertion), the middle + bottom berries with
        // their stars as one contiguous run and the flatPath leaf
        expect(svgIcons.blueberry()).toContain('M12.6 8.2a5.5 5.5 0 1 1 -11 0 5.5 5.5 0 1 1 11 0z');
        expect(svgIcons.blueberry()).toContain(
            'M7.1 4.7L6.3 6.2 4.6 6.4 5.8 7.7 5.6 9.4 7.1 8.6 8.6 9.4 8.4 7.7 9.6 6.4 7.9 6.2z'
        );
        expect(svgIcons.blueberry()).toContain(
            'M22.4 12a4.8 4.8 0 1 1 -9.6 0 4.8 4.8 0 1 1 9.6 0zM17.6 8.9L16.9 10.2 15.4 10.4 16.5 11.5 16.3 13 17.6 12.3 18.9 13 18.7 11.5 19.8 10.4 18.3 10.2zM15.1 18a3.9 3.9 0 1 1 -7.8 0 3.9 3.9 0 1 1 7.8 0zM11.2 15.5L10.6 16.6 9.3 16.8 10.2 17.8 10 19.1 11.2 18.5 12.4 19.1 12.2 17.8 13.1 16.8 11.8 16.6z'
        );
        expect(svgIcons.blueberry().match(/<circle /g)).toBeNull();
        expect(svgIcons.blueberry()).toContain(
            'M12 5.2C12.1 2.5 14.7 1.2 17.2 1.7 16.5 4.2 14.5 5.6 12 5.2z'
        );
        expect(svgIcons.blueberry().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // coconut: the evenodd hull ellipse ring (outer sweep-1 + inner
        // sweep-0 cavity hole) and the flatPath flesh bowl with the three
        // bottom fiber notches (the old crack band + face eyes are GONE —
        // match() null is the exact absence assertion)
        expect(svgIcons.coconut()).toContain(
            'M22 9a10 5.5 0 1 1 -20 0 10 5.5 0 1 1 20 0zM19.6 8.7a7.6 3.4 0 1 0 -15.2 0 7.6 3.4 0 1 0 15.2 0z'
        );
        expect(svgIcons.coconut()).toContain(
            'M2.3 12.5C4.5 15 7.8 16 12 16S19.5 15 21.7 12.5C21.2 16.1 19.6 19 17.1 20.4L17.8 17.5 16.5 17.2 15.5 21.1C14.6 21.5 13.7 21.7 12.7 21.8V18.8H11.3V21.8C10.3 21.7 9.4 21.5 8.5 21.1L7.5 17.2 6.2 17.5 6.9 20.4C4.4 19 2.8 16.1 2.3 12.5z'
        );
        expect(svgIcons.coconut().match(/<circle /g)).toBeNull();
        expect(svgIcons.coconut().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // plum: the oval drupe body (not the old flattened onion — the
        // shoulders round through (15.8,5.5) now), the evenodd long
        // off-centre suture hole and the flatPath stem + leaf
        expect(svgIcons.plum()).toContain(
            'M12 7.4C15.8 5.5 20 8.3 20 13.4 20 18.3 16.8 22.3 12 22.3S4 18.3 4 13.4C4 8.3 8.2 5.5 12 7.4z'
        );
        expect(svgIcons.plum()).toContain(
            'M10.7 8.7C8.2 11.5 8.4 17.6 11.2 20.4L12.1 19.5C9.8 16.8 9.7 12 11.7 9.4z'
        );
        expect(svgIcons.plum()).toContain(
            'M11.3 7.7C11 5.3 11.7 3.4 13 2L14.1 3C13 4.2 12.5 5.6 12.7 7.7zM14.2 5C14.6 2.6 17.6 1.7 20.2 2.4 18.7 4.7 16.6 5.6 14.2 5z'
        );
        expect(svgIcons.plum().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );
        // melon: the whole-melon body circle, the four curved rib holes
        // (inner pair + outer pair, each run contiguous — the old crossing
        // net bands collapsed into a near-plain circle) and the flatPath
        // short curved stalk (not a long cherry stem)
        expect(svgIcons.melon()).toContain('M21.5 13a9.5 9.5 0 1 1 -19 0 9.5 9.5 0 1 1 19 0z');
        expect(svgIcons.melon()).toContain(
            'M10.3 5.5C6.7 9.3 6.7 16.8 10.3 20.5L11.2 19.7C8.3 16.1 8.3 9.9 11.2 6.3zM13.7 5.5L12.8 6.3C15.7 9.9 15.7 16.1 12.8 19.7L13.7 20.5C17.3 16.8 17.3 9.3 13.7 5.5z'
        );
        expect(svgIcons.melon()).toContain(
            'M5.7 8.1C3.7 10.9 3.7 15.1 5.7 17.9L6.7 17.2C5.2 14.6 5.2 11.4 6.7 8.8zM18.3 8.1L17.3 8.8C18.8 11.4 18.8 14.6 17.3 17.2L18.3 17.9C20.3 15.1 20.3 10.9 18.3 8.1z'
        );
        expect(svgIcons.melon()).toContain(
            'M11.3 4.2C11 2.4 11.9 1 13.8 1L14 2.3C12.8 2.3 12.5 3 12.7 4.2z'
        );
        expect(svgIcons.melon().match(/fill-rule="evenodd"/g)).toEqual(
            new Array(1).fill('fill-rule="evenodd"')
        );

        // ── nature subset (trees + plants, 18 icons) ───────────────────────
        // oak: the blobby crown outline (center ellipse + side-bulge
        // sweep-1 arcs in ONE subpath, verbatim) + the trunk — a CLOSED
        // rect x 10.9..13.1, y 16.7..21.8 (`h2.2 v5.1 h-2.2 z`, per the
        // geometry comment in nature/oak.ts; the VISUAL-TESTS-7 fix
        // replaced the degenerate unterminated `zM10.9 16.7h2.2`). The
        // VISUAL-TESTS-8 detail pass appended the leaf-cluster holes and
        // the ground line AFTER the trunk, so the trunk is no longer the
        // path's final subpath (the d attribute's closing quote now
        // terminates the ground line) — the pin therefore drops the old
        // trailing-quote suffix and pins the closed-rect `zM…z` fragment.
        expect(svgIcons.oak()).toContain(
            'M12 2.2a6.6 5.6 0 0 1 5.6 3.1 4.7 4.7 0 0 1 2.3 8.5 5.1 5.1 0 0 1-5.9 2.9h-.9l.7 5.1h-3.6l.7-5.1h-.9a5.1 5.1 0 0 1-5.9-2.9 4.7 4.7 0 0 1 2.3-8.5A6.6 5.6 0 0 1 12 2.2z'
        );
        expect(svgIcons.oak()).toContain('zM10.9 16.7h2.2v5.1h-2.2z');
        // oak detail: BOTH leaf-cluster holes (sweep-0, counterclockwise —
        // the reversed winding cuts the foliage blobs out of the crown)
        // contiguous in the d, the count pinning every hole survived
        // registration, + the ground line under the trunk
        expect(svgIcons.oak()).toContain(
            'M7.85 9.8a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0zM14.15 12.2a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z'
        );
        expect(svgIcons.oak().match(/a1\.15 1\.15 0 1 0 2\.3 0a1\.15 1\.15 0 1 0 -2\.3 0z/g)).toEqual(
            new Array(2).fill('a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z')
        );
        expect(svgIcons.oak()).toContain('M6 21.4h12v1.2h-12z');
        // pine: the three stacked triangle tiers verbatim (bases widening
        // 9.2/11.6/14.4) + the trunk rect
        expect(svgIcons.pine()).toContain(
            'M12 1.6L16.6 8.2H7.4zM12 6.2L17.8 13.2H6.2zM12 11.2L19.2 18.8H4.8z'
        );
        expect(svgIcons.pine()).toContain('M10.7 18.8h2.6v3.4h-2.6z');
        // pine detail: the v-first ground-line hole under the trunk (the
        // ground is part of the trunk path so it unions cleanly — see
        // nature/pine.ts)
        expect(svgIcons.pine()).toContain('M6.4 22.2v0.8h11.2v-0.8z');
        // palm: EXACTLY five fronds radiating from the crown point (every
        // frond starts at `M13.6 9.6`; the left droop pinned verbatim) +
        // EXACTLY two solid coconut <circle> dots (right one verbatim)
        expect(svgIcons.palm().match(/M13\.6 9\.6/g)).toEqual(new Array(5).fill('M13.6 9.6'));
        expect(svgIcons.palm()).toContain(
            'M13.6 9.6C10.8 7.6 7.4 6.9 3.8 7.8l.4 1.6c3.2-.7 6 .1 8.3 1.9z'
        );
        expect(svgIcons.palm().match(/<circle /g)).toEqual(['<circle ', '<circle ']);
        expect(svgIcons.palm()).toContain('<circle cx="14.6" cy="11.8" r="1"');
        // palm detail: the two trunk-ring line holes (contiguous — the
        // bark-ring bands crossing the trunk band), the left frond's
        // midrib line hole (one of five — every frond blade carries its
        // spine) and the ground line
        expect(svgIcons.palm()).toContain(
            'M10.05 16.2c1.4-.9 2.8-1.1 4.2-.5l-.3.8c-1.2-.5-2.4-.4-3.6.5zM9.9 19c1.3-.7 2.6-.9 3.9-.4l-.3.8c-1.1-.4-2.2-.3-3.3.4z'
        );
        expect(svgIcons.palm()).toContain('M6.4 7.8v1h4.4v-1z');
        expect(svgIcons.palm()).toContain('M3.6 21.8h16.8v1h-16.8z');
        // birch: the THREE white-bark dash holes (re-laid by the detail
        // pass — were two; contiguous, v-first, top dash shorter) + the
        // slimmer trunk rect; the count proves every dash survived
        // registration, and the ground line rides under the trunk
        expect(svgIcons.birch()).toContain(
            'M11.4 19.6v.7h1.7v-.7zM10.9 20.8v.7h2.2v-.7zM11.2 21.9v.7h1.6v-.7z'
        );
        expect(svgIcons.birch().match(/v\.7h/g)).toEqual(new Array(3).fill('v.7h'));
        expect(svgIcons.birch()).toContain('M10.9 19h2.2v3.2h-2.2z');
        expect(svgIcons.birch()).toContain('M6.6 22.2h10.8v.8h-10.8z');
        // maple: the VISUAL-TESTS-10 five fat ROUNDED lobes (each lobe a
        // cubic V with deep notch bottoms — the old straight-segment
        // zigzag star read as an explosion; the three vein line holes were
        // DROPPED) + the re-seated stem from the bottom notch down to
        // y 20.4
        expect(svgIcons.maple()).toContain(
            'M12 2.4C13.6 3.2 14.6 5 14.4 6.6 15.6 5.6 17.6 5.6 18.8 6.8 18.4 8.6 17 9.8 15.4 10 17.2 10.8 18.2 12.4 17.8 14.2 16 14.4 14.4 13.6 13.6 12.4 13.4 14 12.4 15.2 12 15.4 11.6 15.2 10.6 14 10.4 12.4 9.6 13.6 8 14.4 6.2 14.2 5.8 12.4 6.8 10.8 8.6 10 7 9.8 5.6 8.6 5.2 6.8 6.4 5.6 8.4 5.6 9.6 6.6 9.4 5 10.4 3.2 12 2.4z'
        );
        expect(svgIcons.maple()).toContain('M11.6 15.4h0.8l0.2 5h-1.2z');
        // fir: EXACTLY four slim tiers (each starts `M12 ` — the trunk's
        // `M11 ` start keeps the count clean), first tier verbatim + the
        // short trunk rect
        expect(svgIcons.fir().match(/M12 /g)).toEqual(new Array(4).fill('M12 '));
        expect(svgIcons.fir()).toContain('M12 1.4L15 6.4h-6z');
        expect(svgIcons.fir()).toContain('M11 21.4h2v1.2h-2z');
        // fir detail: the four snow-line holes (one per tier bottom,
        // contiguous) with the count pinning one per tier + the ground line
        expect(svgIcons.fir()).toContain(
            'M8.4 5.6v.7h5.2v-.7zM9 10.2v.7h6v-.7zM7.8 15.6v.7h8.4v-.7zM6.6 20.6v.7h10.8v-.7z'
        );
        expect(svgIcons.fir().match(/v\.7h/g)).toEqual(new Array(4).fill('v.7h'));
        expect(svgIcons.fir()).toContain('M7 22.6h10v.8h-10z');
        // cypress: the tall teardrop body (cubic swell to rx 4.6 + taper
        // back to the narrow base, verbatim) + the tiny trunk stub
        expect(svgIcons.cypress()).toContain(
            'M12 1.4c3 2.6 4.6 6.4 4.6 10.2 0 4.4-1.9 7.6-4.6 9.8-2.7-2.2-4.6-5.4-4.6-9.8C7.4 7.8 9 4 12 1.4z'
        );
        expect(svgIcons.cypress()).toContain('M10.9 21.8h2.2v1h-2.2z');
        // cypress detail: the inner shading line hole riding the body's
        // right side (thin arc band, v-first) + the ground line
        expect(svgIcons.cypress()).toContain(
            'M14.9 6.2c.7 1.7 1.1 3.6 1.1 5.4 0 2.4-.6 4.6-1.6 6.5l-.8-.5c.9-1.7 1.4-3.7 1.4-6 0-1.7-.4-3.4-1-5z'
        );
        expect(svgIcons.cypress()).toContain('M7.6 22.8h8.8v.8h-8.8z');
        // willow: EXACTLY five hanging curtain tubes (each ends in the same
        // sweep-1 rounded-bottom arc), the umbrella dome verbatim + trunk
        expect(svgIcons.willow().match(/a0\.95 0\.95 0 0 1 -1\.9 0z/g)).toEqual(
            new Array(5).fill('a0.95 0.95 0 0 1 -1.9 0z')
        );
        expect(svgIcons.willow()).toContain(
            'M12 1.2a8.8 4.4 0 0 1 8.8 4.4c0 2.4-4 4.3-8.8 4.3S3.2 8 3.2 5.6A8.8 4.4 0 0 1 12 1.2z'
        );
        expect(svgIcons.willow()).toContain('M10.9 15h2.2v6.8h-2.2z');
        // willow detail: the ground line under the trunk
        expect(svgIcons.willow()).toContain('M6.4 21.8h11.2v1h-11.2z');
        // bush: the layered mound outline (center bump + cubic shoulders,
        // verbatim) + the wide ground bar
        expect(svgIcons.bush()).toContain(
            'M4 17.6c-1.9-2.4-1.4-5.6 1.2-6.9.2-2.6 2.3-4.4 4.8-4.2A4.3 4.3 0 0 1 12 4.6c.9 0 1.6.7 2 1.9 2.5-.2 4.6 1.6 4.8 4.2 2.6 1.3 3.1 4.5 1.2 6.9z'
        );
        expect(svgIcons.bush()).toContain('M2.4 17.6h19.2v1.6H2.4z');
        // bush detail: the three berry holes (sweep-0, counterclockwise)
        // contiguous in the d + the count pinning every berry survived
        // registration
        expect(svgIcons.bush()).toContain(
            'M7.1 12.4a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0zM11.2 9.4a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0zM15.3 12.4a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0z'
        );
        expect(svgIcons.bush().match(/a0\.8 0\.8 0 1 0 1\.6 0a0\.8 0\.8 0 1 0 -1\.6 0z/g)).toEqual(
            new Array(3).fill('a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0z')
        );
        // cactus: BOTH arms (rounded elbow rising into the vertical
        // section, mirrored) + the two rib-line holes (contiguous) + the
        // ground bar
        expect(svgIcons.cactus()).toContain(
            'M4.4 10.2a1.6 1.6 0 0 1 3.2 0v4.2a2 2 0 0 0 2 2v1.8a3.8 3.8 0 0 1-3.8-3.8z'
        );
        expect(svgIcons.cactus()).toContain(
            'M16.4 7.4a1.6 1.6 0 0 1 3.2 0v6.4a3.8 3.8 0 0 1-3.8 3.8v-1.8a2 2 0 0 0 2-2z'
        );
        expect(svgIcons.cactus()).toContain('M11.2 5.4v14.2h.4v-14.2zM12.6 5.4v14.2h.4v-14.2z');
        expect(svgIcons.cactus()).toContain('M4.4 19.6h15.2v1.4H4.4z');
        // cactus detail: EXACTLY two five-petal flower dots — tiny solid
        // <circle> elements crowning the column and the right arm
        expect(svgIcons.cactus().match(/<circle /g)).toEqual(['<circle ', '<circle ']);
        expect(svgIcons.cactus()).toContain('<circle cx="12" cy="1.9" r="0.9"');
        expect(svgIcons.cactus()).toContain('<circle cx="18" cy="5.7" r="0.9"');
        // fern: the VISUAL-TESTS-10 fiddlehead — a constant-thickness
        // SPIRAL BAND outline riding the stem top (starts on the stem's
        // left edge (11.4,5.9) and closes back there after the outer sweep,
        // cap and inner walk; the old r-0.4 fiddlehead hole is GONE), the
        // re-seated stem rect (y 7..21.4) and the four leaflet pairs (first
        // + last left leaflets pinned verbatim; EXACTLY four right leaflet
        // starts `M12.6 ` — eight leaflets total, four per side)
        expect(svgIcons.fern()).toContain('M11.4 5.9L12.00 3.50L11.58 3.57L11.18 3.71');
        expect(svgIcons.fern()).toContain('L11.79 4.74L12.00 4.70L11.4 5.9z');
        expect(svgIcons.fern()).toContain('M11.4 7h1.2v14.4h-1.2z');
        expect(svgIcons.fern()).toContain('M11.4 9.4L6.6 12.5l4.8-.6z');
        expect(svgIcons.fern()).toContain('M11.4 19.8l-3.4 2.9 3.4-1.2z');
        expect(svgIcons.fern().match(/M12\.6 /g)).toEqual(new Array(4).fill('M12.6 '));
        // flower: the stem + TWO leaf lenses path (the left lens was added
        // by the detail pass) + EXACTLY six <circle> elements (five petals
        // + center disc) with the center disc verbatim
        expect(svgIcons.flower()).toContain(
            'M11.4 12.2h1.2v9h-1.2zM12.6 16.4c2.4-1.4 4.6-1 5.6.4-2.2 1.6-4.4 1.2-5.6-.4zM11.4 18.6c-2.4-1.4-4.6-1-5.6.4 2.2 1.6 4.4 1.2 5.6-.4z'
        );
        expect(svgIcons.flower().match(/<circle /g)).toEqual(new Array(6).fill('<circle '));
        expect(svgIcons.flower()).toContain('<circle cx="12" cy="9" r="2.1"');

        // ── nature subset — the six ADDED icons (VISUAL-TESTS-8) ──────────
        // appleTree: the round crown outline (wide ellipse + bottom bulge,
        // ONE subpath, verbatim), EXACTLY three sweep-0 apple holes (left,
        // top-right, bottom-center) with the bottom-center one verbatim,
        // the trunk rect and the ground line
        expect(svgIcons.appleTree()).toContain(
            'M4.6 9.6a7.4 5.6 0 0 1 14.8 0 7.4 5.6 0 0 1 -3 4.2 4.6 4.6 0 0 1 -8.8 0 7.4 5.6 0 0 1 -3 -4.2z'
        );
        expect(svgIcons.appleTree().match(/a1\.15 1\.15 0 1 0 2\.3 0a1\.15 1\.15 0 1 0 -2\.3 0z/g)).toEqual(
            new Array(3).fill('a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z')
        );
        expect(svgIcons.appleTree()).toContain('M10.85 12.4a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z');
        expect(svgIcons.appleTree()).toContain('M10.9 17h2.2v4.8h-2.2z');
        expect(svgIcons.appleTree()).toContain('M6 21.4h12v1.2h-12z');
        // cherryTree: the blossom crown outline (verbatim), EXACTLY three
        // sweep-0 blossom holes with the top-left one verbatim, trunk + ground
        expect(svgIcons.cherryTree()).toContain(
            'M4.4 9.4a7.6 5.4 0 0 1 15.2 0 7.6 5.4 0 0 1 -3.2 4.2 4.6 4.6 0 0 1 -8.8 0 7.6 5.4 0 0 1 -3.2 -4.2z'
        );
        expect(svgIcons.cherryTree().match(/a1\.3 1\.3 0 1 0 2\.6 0a1\.3 1\.3 0 1 0 -2\.6 0z/g)).toEqual(
            new Array(3).fill('a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0z')
        );
        expect(svgIcons.cherryTree()).toContain('M7.65 7.8a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0z');
        expect(svgIcons.cherryTree()).toContain('M10.9 16.8h2.2v5h-2.2z');
        expect(svgIcons.cherryTree()).toContain('M6 21.4h12v1.2h-12z');
        // redwood: EXACTLY four stacked tiers (taller/narrower than fir —
        // `M12 ` starts, first and bottom tier verbatim), the shaggy
        // bottom-tier zigzag edge (contiguous), the buttressed trunk and
        // the ground line
        expect(svgIcons.redwood().match(/M12 /g)).toEqual(new Array(4).fill('M12 '));
        expect(svgIcons.redwood()).toContain('M12 0.6L14.8 5h-5.6z');
        expect(svgIcons.redwood()).toContain('M12 11.4L17.8 18.8H6.2z');
        expect(svgIcons.redwood()).toContain(
            'M7.6 18.8l1.6 1.4 1.4-1.4 1.4 1.4 1.6-1.4 1.4 1.4 1.4-1.4 1.6 1.4 1.4-1.4z'
        );
        expect(svgIcons.redwood()).toContain('M10.6 20.4h2.8v1.6l0.9 0.8h-4.6l0.9-0.8z');
        expect(svgIcons.redwood()).toContain('M6.8 22.8h10.4v.8h-10.4z');
        // spruce: EXACTLY five slim tiers (`M12 ` starts, first tier
        // verbatim), the THREE upturned-branch notch holes (contiguous,
        // thin wedges under the tier tips), trunk + ground
        expect(svgIcons.spruce().match(/M12 /g)).toEqual(new Array(5).fill('M12 '));
        expect(svgIcons.spruce()).toContain('M12 1L14.2 4.4h-4.4z');
        expect(svgIcons.spruce()).toContain(
            'M9.8 5.4l2.2-1 2.2 1-2.2.4zM9 9.6l3-1.4 3 1.4-3 .5zM8.6 13.6l3.4-1.6 3.4 1.6-3.4.6z'
        );
        expect(svgIcons.spruce()).toContain('M11.2 20.6h1.6v1.2h-1.6z');
        expect(svgIcons.spruce()).toContain('M7.6 21.8h8.8v.8h-8.8z');
        // tulip: the cup bloom — rim with THREE points and the curved sides
        // down to the rounded base (verbatim), the TWO petal-seam line
        // holes (contiguous, v-first), the stem and BOTH leaf lenses
        // flanking it + ground
        expect(svgIcons.tulip()).toContain(
            'M6.6 3.4L8.6 5.4 10.3 3.4 12 5.4 13.7 3.4 15.4 5.4 17.4 3.4V9.4a5.4 4 0 0 1 -10.8 0z'
        );
        expect(svgIcons.tulip()).toContain('M10.35 6.4v6h.7v-6zM12.95 6.4v6h.7v-6z');
        expect(svgIcons.tulip()).toContain('M11.4 13.4h1.2v7.8h-1.2z');
        expect(svgIcons.tulip()).toContain(
            'M11.3 17.6C8.6 15.4 6.2 15.6 4.6 17.4c2.6 2.6 5.4 2.2 6.7.2zM12.7 17.6c2.7-2.2 5.1-2 6.7-.2-2.6 2.6-5.4 2.2-6.7.2z'
        );
        expect(svgIcons.tulip()).toContain('M4.4 21.2h15.2v1h-15.2z');
        // sunflower: EXACTLY twelve ray wedges (`M12 7L` starts, first ray
        // verbatim — the template-computed RAYS values are kept verbatim),
        // the r-3.6 disc over the wedge bases, EXACTLY five sweep-0
        // seed-dot holes (four on the r 1.9 ring + the center dot) with
        // the top one verbatim, the stem + ground
        expect(svgIcons.sunflower().match(/M12 7L/g)).toEqual(new Array(12).fill('M12 7L'));
        expect(svgIcons.sunflower()).toContain('M12 7L17.6 7L14.128 7z');
        expect(svgIcons.sunflower()).toContain('M8.4 7a3.6 3.6 0 1 1 7.2 0a3.6 3.6 0 1 1 -7.2 0z');
        expect(svgIcons.sunflower().match(/a0\.7 0\.7 0 1 0 1\.4 0a0\.7 0\.7 0 1 0 -1\.4 0z/g)).toEqual(
            new Array(5).fill('a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z')
        );
        expect(svgIcons.sunflower()).toContain('M9.95 7a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z');
        expect(svgIcons.sunflower()).toContain('M11.4 10.8h1.2v10.4h-1.2z');
        expect(svgIcons.sunflower()).toContain('M4.4 21.2h15.2v1h-15.2z');
    });

    it('registers every built-in on import: svgIcon resolves spellbook, chameleon, strawberry, flower, sunflower and lightning to their exact strings', () => {
        // Importing THIS module (builtins.ts) keeps all built-ins registered
        // through the shared registry — the round-trip through the live
        // registry must yield the identical default render. 'spellbook' is
        // late-alphabet fantasy, 'chameleon' is the LAST animal name (the
        // 40 additions' tail — an animals sub-barrel omission could not
        // fake it), 'strawberry' sits at the tail of the reworked fruits
        // block and 'flower' closed the map until VISUAL-TESTS-8 — the
        // nature sub-barrel's registration side effects must have fired for
        // any of them to resolve, so a map entry without registration would
        // fail on any of the first five.
        expect(svgIcon('spellbook')).toBe(SPELLBOOK);
        expect(svgIcons.spellbook()).toBe(SPELLBOOK);
        expect(svgIcon('chameleon')).toBe(svgIcons.chameleon());
        // 'strawberry' and 'flower' resolve through the live registry with
        // the same delegation identity (their exact string constants are
        // pinned by the fruits subset pins / nature comments above).
        expect(svgIcon('strawberry')).toBe(svgIcons.strawberry());
        expect(svgIcon('flower')).toBe(svgIcons.flower());
        // 'sunflower' WAS the LAST name of the ENTIRE 98-name map
        // (VISUAL-TESTS-8); VISUAL-TESTS-11 appended the landscape
        // (mountain/hills/river) and sky (sun…lightning) subsets after it,
        // so it now closes only the trees/plants block.
        expect(svgIcon('sunflower')).toBe(SUNFLOWER);
        expect(svgIcons.sunflower()).toBe(SUNFLOWER);
        // 'lightning' (nature/lightning.ts) is the LAST name of the
        // 148-name map — the sky sub-barrel's registration side effects
        // must have fired for it to resolve. Two exact pins: the delegation
        // identity AND the full render composed from the imported
        // ICON_LIGHTNING definition (svg-icon OUTPUT CONTRACT: xmlns →
        // viewBox → width="1em" → height="1em" → fill="currentColor", then
        // the definition content verbatim) — byte-exact by construction, no
        // hand-copied probe string.
        expect(svgIcon('lightning')).toBe(svgIcons.lightning());
        expect(svgIcon('lightning')).toBe(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">' +
                ICON_LIGHTNING +
                '</svg>'
        );
    });
});
