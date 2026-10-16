/**
 * icons.test.ts — deterministic tests for the built-in icon registry
 * (./builtins.ts) over the ONE-FILE-PER-ICON architecture (generic/*.ts ×23,
 * fantasy/*.ts ×10, flags/*.ts ×8, animals/*.ts ×20, fruits/*.ts ×19,
 * nature/*.ts ×28 — cross-reference the FILE ARCHITECTURE header in
 * svg-icon.ts): the exact 108-factory key list, the per-icon flat-design
 * structural invariants, exact full-string spot checks (generic trio +
 * fantasy trio + one per themed subset: flag/checkeredFlag, cat,
 * apple/watermelon + the new-animal trio horse/penguin/butterfly + the
 * new-fruit trio kiwi/coconut/blueberry + flower and sunflower for the
 * round-trip + lightning — the round-trip's new LAST name, pinned via the
 * ICON_LIGHTNING composition), geometry wiring (including the load-bearing
 * hole-winding subpaths), and the registry round-trip proving that
 * importing this module registers every built-in name — including the
 * late-alphabet fantasy, animal, fruit and nature sets.
 *
 * EXPECTED VALUES: every full-string pin below is composed from the
 * documented svgIcon OUTPUT CONTRACT (svg-icon.ts: xmlns → viewBox →
 * width="1em" → height="1em" → fill="currentColor", then the definition
 * content verbatim — flatPath in svg-icon.ts supplies the per-element
 * fill="currentColor" stroke="none" pair) and was verified byte-for-byte
 * against the real runtime via a scratch probe under the repo-root Temp/
 * directory (Temp/visual/probe-icons8.ts prints the registry key order +
 * the exact full render of every one of the then-98 built-ins + a per-icon
 * svgIcon delegation identity check; run with
 * `npx vite-node Temp/visual/probe-icons8.ts` from the workspace root —
 * the map has since grown to 108; see the VISUAL-TESTS-11 APPEND NOTE at
 * the end of this header for how the ten new entries are pinned).
 * All full-string constants in this file — the generic/fantasy/flags/
 * animal sets AND the nature set after its VISUAL-TESTS-8 detail pass —
 * were re-verified byte-for-byte against that probe output
 * (Temp/visual/verify-icons8.ts re-checks every composed pin below against
 * the runtime before the pins were committed; the SIX fruit full strings
 * were re-verified against Temp/visual/probe-fruits-vt12*.ts in
 * VISUAL-TESTS-12 — see the REWORK NOTE at the end of this header).
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
 *   1. svgIcons exposes EXACTLY the 108 built-in names in registration
 *      order — generic 23 first, then fantasy 10, then the themed
 *      subsets flags 8 → animals 20 → fruits 19 → nature 28 (builtins.ts
 *      appends; an insertion would change key order and break this
 *      contract). The nature block grew from 12 to 18 (VISUAL-TESTS-8):
 *      the four tree additions (appleTree/cherryTree/redwood/spruce) sit
 *      between 'willow' and 'bush', the two bloom additions
 *      (tulip/sunflower) after 'flower' — both slots follow
 *      nature/index.ts's sub-barrel order — and from 18 to 28
 *      (VISUAL-TESTS-11): the LANDSCAPE subset (mountain/hills/river)
 *      then the SKY subset (sun/moon/cloud/stars/sunrise/rainbow/
 *      lightning) appended after 'sunflower', making 'lightning' the
 *      map's LAST name.
 *   2. EVERY factory renders the flat-design shell: starts with `<svg `,
 *      ends with `</svg>`, carries the xmlns declaration, per-element flat
 *      attributes fill="currentColor" stroke="none", and NO gradient or
 *      stroke-family markup (solid fills only).
 *   3. EVERY factory delegates to svgIcon(name) — the registration side
 *      effect is real and the two paths produce byte-identical strings.
 *   4. Exact full strings for the generic trio: check / plus / menu.
 *   5. Exact full strings for the fantasy trio: sword / gem / crown
 *      (sword exercises the literal non-path <circle> pommel element).
 *   6. Exact full strings for the new-subset quintet: flag /
 *      checkeredFlag (14 counterclockwise checker holes cut from the
 *      clockwise flag rect — hole winding is load-bearing, same-direction
 *      subpaths would render the flag solid) / cat (inner-ear + sweep-0
 *      eye/nose/mouth holes inside the sweep-1 head + solid whiskers) /
 *      apple (the VISUAL-TESTS-12 rework: the two-lobe body rising to a
 *      (12,7.4) top dimple with the evenodd left highlight hole + the
 *      flatPath stem and leaf lens) / watermelon (the VISUAL-TESTS-12
 *      rework: the evenodd flesh half-disc with three teardrop seed holes
 *      + the SEPARATED flatPath 1.4-unit rind band).
 *   7. Exact full strings for the new-animal trio: horse (single
 *      flatPath: Q-curved head/neck profile + ears/mane + eye/nostril
 *      holes) / penguin (single flatPath: belly hole with the beak
 *      re-filling it + flipper lenses) / butterfly (mixed literal
 *      elements: four <ellipse transform> wings + <rect rx> body +
 *      <circle> head/antenna dots).
 *   8. Exact full strings for the new-fruit trio: kiwi (THREE path
 *      elements: the evenodd skin ring — outer 9.5×10.5 oval + inner 8×9
 *      sweep-0 reversed hole — the evenodd flesh oval with EIGHT radial
 *      seed slots and the flatPath solid core lens; the VISUAL-TESTS-12
 *      rework replaced the old circular doughnut + float-noise seed
 *      ring) / coconut (the evenodd hull ellipse ring over the flatPath
 *      flesh bowl with three fiber notches — the VISUAL-TESTS-12 rework
 *      replaced the old crack band + face eyes) / blueberry (one evenodd
 *      path holding the three berry circles AND their five-point calyx
 *      star holes, plus the flatPath leaf — the old
 *      stars-behind-opaque-circles bug is gone).
 *   9. Geometry is actually wired per name (243 fragment spot checks) —
 *      including hole subpaths whose WINDING (sweep-0 vs sweep-1, or
 *      reversed vertex order) is load-bearing under nonzero fill: if a
 *      hole subpath wound the same direction as its enclosing shape the
 *      icon would render solid, so the pins assert the exact hole
 *      fragments exist verbatim (same approach as the spellbook
 *      star-hole pin in the original set). Covers the reworked animals
 *      (cat/dog/bird/fish/rabbit/bear/dragon/snake/turtle), the ten
 *      added animals (horse/lion/owl/fox/whale/frog/snail/penguin/
 *      butterfly/duck), ALL NINETEEN VISUAL-TESTS-12 reworked fruits
 *      (apple/banana/cherry/grape/orange/lemon/watermelon/pear/
 *      strawberry/peach/pineapple/kiwi/mango/avocado/blueberry/coconut/
 *      pomegranate/plum/melon) and the
 *      fragment-covered nature subset (18 of its 28 icons: the
 *      detail-passed originals oak/pine/palm/birch/maple/fir/cypress/
 *      willow/bush/cactus/fern/flower plus the six additions appleTree/
 *      cherryTree/redwood/spruce/tulip/sunflower — the ten
 *      VISUAL-TESTS-11 landscape/sky icons carry no full-string/fragment
 *      pins yet; they are covered by the key-list pin, the all-icons
 *      shell/delegation loop and the round-trip's 'lightning' pin).
 *
 *  10. Registry round-trip: svgIcon('spellbook') AND svgIcon('duck') AND
 *      svgIcon('strawberry') AND svgIcon('flower') AND
 *      svgIcon('sunflower') render the exact strings after importing this
 *      module — importing the builtins map (via the
 *      generic/fantasy/flags/animals/fruits/nature sub-barrels)
 *      registered ALL built-ins, and all five names sit late in their
 *      subsets, so a stale/missing registration could not fake this pass.
 *      ('sunflower' WAS the very LAST name in the map until
 *      VISUAL-TESTS-11 appended the landscape + sky subsets; the
 *      round-trip now also pins the new LAST name 'lightning' —
 *      svgIcon('lightning') equals svgIcons.lightning() AND the shell +
 *      ICON_LIGHTNING composition.)
 *
 * VISUAL-TESTS-10 REWORK NOTE: the fruit geometry pass re-laid apple
 * (two-lobe silhouette + deep dimple), peach (beak tip), mango (beaked
 * body path, ellipse removed), pear (single teardrop, circles removed),
 * plum (squat wide body), coconut (the fiber tufts → a REVERSE-WOUND
 * zigzag CRACK band hole down the left side, face kept, circle
 * element removed), pineapple (leafy crown + pre-rotated lattice band
 * holes), pomegranate (the three round seed holes → SIX reverse-wound
 * diamond aril holes, rows 2-3-1), melon (the old stem stub → a
 * five-point star calyx hole: the reverse-wound star scar, center
 * (12,7.6)) and strawberry (the bare-top berry → a short stem rect
 * poking above the leaf crown, x 11.55..12.45 spanning y 2.6..6.2,
 * prepended as the flatPath's FIRST subpath) and the nature pair maple
 * (rounded
 * lobes, veins dropped) and fern (fiddlehead spiral band, stem/leaflets
 * re-seated) — the touched full-string constants and fragment pins below
 * were re-verified byte-for-byte against Temp/visual/probe-vt10.ts
 * (string layer) and Temp/visual/probe-vt10-react.tsx (jsdom
 * serialization for the React layer pin), and the pomegranate and melon
 * fragment pins against Temp/visual/probe-pom.ts and
 * Temp/visual/probe-melon.ts (no full-string pin exists for either), and
 * the strawberry rework pins (full string + stem fragment) against
 * Temp/visual/probe-strawberry.ts, and the FINAL coconut rework pins
 * (full string + crack-band fragment) against
 * Temp/visual/probe-coconut2.ts.
 *
 * VISUAL-TESTS-11 APPEND NOTE: the nature barrel gained TEN one-file-per-
 * icon entries in two subsets — LANDSCAPE (mountain/hills/river) and SKY
 * (sun/moon/cloud/stars/sunrise/rainbow/lightning) — re-exported by
 * nature/index.ts after 'sunflower' and appended to the builtins.ts map in
 * that same order (map total 98 → 108, LAST name 'sunflower' →
 * 'lightning'). This update touches ONLY the count-bearing pins: the
 * key-list pin (full 108-name array), the header cross-references and the
 * round-trip test, which now also pins 'lightning' via the registry
 * delegation identity AND the shell + ICON_LIGHTNING composition
 * (imported from nature/lightning.ts — no hand-copied full-string probe
 * pin exists for the ten new icons yet; they ARE covered by the all-icons
 * shell/delegation loop test, which iterates every
 * Object.entries(svgIcons) entry).
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
// cat (animals/cat.ts): two ear triangles each carrying an inner-ear hole
// (reversed winding, fully above the head circle), the sweep-1 head
// circle, the sweep-0 eye holes and reversed nose triangle, a v-first
// mouth-line hole and four solid whisker rects (the eye/mouth winding is
// load-bearing: they sit inside the head only, so nonzero fill cuts them;
// ears and whiskers overlap the head as SOLID subpaths).
const CAT =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M6.5 2.5L11 5.5 8 9zM7.4 4.2L7.9 7 9.1 5.4zM17.5 2.5L13 5.5l3 3.5zM16.6 4.2L14.9 5.4 16.1 7zM5.5 14a6.5 6.5 0 1 1 13 0a6.5 6.5 0 1 1 -13 0zM8.2 12.6a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0zM13.6 12.6a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0zM11 15l1 1.6L13 15zM11.3 17.6v0.9h1.4v-0.9zM2.6 12.9h4v0.8h-4zM2.6 15.7h4v0.8h-4zM17.4 12.9h4v0.8h-4zM17.4 15.7h4v0.8h-4z" fill="currentColor" stroke="none"/></svg>';
// New-animal trio — one exact full default render each (probe-verified).
// horse (animals/horse.ts): ONE flatPath — Q-curved head/neck profile
// drawn clockwise, two solid ear triangles + three mane triangles riding
// the neck's back edge, sweep-0 eye/nostril holes inside head/muzzle.
const HORSE =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M9.2 5.6L9.8 2 12.4 4.4zM12.4 5L14.4 2.4 15.4 5.6zM2.4 9.6Q3 7.4 5.4 6.8L9.6 5.6Q12.6 5.2 14 7.6Q15.2 9.6 15.6 12.4L16.6 21L11.8 21L11.4 16.2Q8.2 15.8 6 13.6Q3.4 13.2 2.6 11.4Q2.2 10.4 2.4 9.6zM15.2 10.4L18.2 11 15.4 12.6zM15.8 13.4L19 14.2 16 15.8zM16.2 16.6L19.2 17.6 16.4 19zM5.65 8.6a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0zM3 10a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z" fill="currentColor" stroke="none"/></svg>';
// penguin (animals/penguin.ts): ONE flatPath — clockwise body ellipse,
// counterclockwise belly hole, sweep-0 eye holes in the dark band ABOVE
// the belly hole's top edge, the solid beak triangle re-filling part of
// the belly hole, rounded-bottom feet and the two Q-curved flipper lenses.
const PENGUIN =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M5.4 13.2a6.6 8.4 0 1 1 13.2 0a6.6 8.4 0 1 1 -13.2 0zM7.9 14.2a4.1 5.9 0 1 0 8.2 0a4.1 5.9 0 1 0 -8.2 0zM8.65 8.2a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0zM13.65 8.2a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0zM11.05 10h1.9l-0.95 1.8zM8.5 20.9h2.4v0.4a1.2 1.2 0 0 1 -2.4 0zM13.1 20.9h2.4v0.4a1.2 1.2 0 0 1 -2.4 0zM5.8 11.2L6.2 17.4Q4.6 16.6 4.4 14.4Q4.2 12 5.8 11.2zM18.2 17.4L17.8 11.2Q19.4 12 19.6 14.4Q19.8 16.6 18.2 17.4z" fill="currentColor" stroke="none"/></svg>';
// butterfly (animals/butterfly.ts): the richest literal-element mix in the
// set — FOUR <ellipse> wing elements (upper/lower pairs tilted ±24° via
// the transform attribute), the counterclockwise wing-spot holes + antenna
// wedges as one flatPath, the <rect rx> body segment and three <circle>
// elements (head + two antenna tip dots) — pinned byte-for-byte.
const BUTTERFLY =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><ellipse cx="7.4" cy="9.2" rx="3.7" ry="4.5" transform="rotate(-24 7.4 9.2)" fill="currentColor" stroke="none"/><ellipse cx="16.6" cy="9.2" rx="3.7" ry="4.5" transform="rotate(24 16.6 9.2)" fill="currentColor" stroke="none"/><ellipse cx="8.6" cy="15.8" rx="2.9" ry="3.3" transform="rotate(24 8.6 15.8)" fill="currentColor" stroke="none"/><ellipse cx="15.4" cy="15.8" rx="2.9" ry="3.3" transform="rotate(-24 15.4 15.8)" fill="currentColor" stroke="none"/><path d="M6.3 9.2a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0zM15.5 9.2a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0zM7.5 15.8a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0zM14.3 15.8a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0zM11.3 5.6L9.9 2.6 10.7 2.3 12 5.5zM12.7 5.5L14.1 2.5 14.9 2.8 13.3 5.6z" fill="currentColor" stroke="none"/><rect x="11.25" y="7.4" width="1.5" height="11.6" rx="0.75" fill="currentColor" stroke="none"/><circle cx="12" cy="6.2" r="1.25" fill="currentColor" stroke="none"/><circle cx="10.3" cy="2.4" r="0.65" fill="currentColor" stroke="none"/><circle cx="14.5" cy="2.6" r="0.65" fill="currentColor" stroke="none"/></svg>';
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
// duck (animals/duck.ts): body + head circles drawn clockwise, solid
// tail/bill triangles, sweep-0 eye + wing holes and two solid water ripple
// bars under the body. Pinned here for the round-trip test below (the
// late-alphabet ANIMAL name that proves the animals sub-barrel's
// registration side effects fired).
const DUCK =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M5.2 12L2.4 9.4 6.2 10zM3.6 15a6.2 6.2 0 1 1 12.4 0a6.2 6.2 0 1 1 -12.4 0zM10.7 7.4a3.5 3.5 0 1 1 7 0a3.5 3.5 0 1 1 -7 0zM17.5 6.2L21.9 7.5 17.5 8.8zM13.75 6.6a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0zM6.5 14.6a2.3 1.7 0 1 0 4.6 0a2.3 1.7 0 1 0 -4.6 0zM2.6 21.4h13.6v0.9h-13.6zM5.4 22.9h9v0.7h-9z" fill="currentColor" stroke="none"/></svg>';
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
// <circle> elements on a ring around (12,8.9) plus the center disc. Pinned
// here for the round-trip test below — 'flower' closed the map until
// VISUAL-TESTS-8; 'sunflower' then closed it until the VISUAL-TESTS-11
// landscape + sky appends made 'lightning' the LAST name (see SUNFLOWER
// below and the round-trip test at the bottom).
const FLOWER =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M11.4 12.2h1.2v9h-1.2zM12.6 16.4c2.4-1.4 4.6-1 5.6.4-2.2 1.6-4.4 1.2-5.6-.4zM11.4 18.6c-2.4-1.4-4.6-1-5.6.4 2.2 1.6 4.4 1.2 5.6-.4z" fill="currentColor" stroke="none"/><circle cx="12" cy="5.6" r="2.3" fill="currentColor" stroke="none"/><circle cx="15.4" cy="8" r="2.3" fill="currentColor" stroke="none"/><circle cx="14.1" cy="12" r="2.3" fill="currentColor" stroke="none"/><circle cx="9.9" cy="12" r="2.3" fill="currentColor" stroke="none"/><circle cx="8.6" cy="8" r="2.3" fill="currentColor" stroke="none"/><circle cx="12" cy="9" r="2.1" fill="currentColor" stroke="none"/></svg>';
// sunflower (nature/sunflower.ts): ONE flatPath — the TWELVE thin ray wedges
// (template-computed from the RAYS table via
// `M12 7L${cx} ${cy}L${cx + (12-cx)*0.62} ${cy + (7-cy)*0.62}z` — every
// runtime value kept verbatim, e.g. the bottom ray closes at `L12 9.128z`),
// the r-3.6 disc over the wedge bases, the FIVE counterclockwise seed-dot
// holes (four on the r 1.9 ring + the center dot), stem, both leaf lenses
// and the ground line. Pinned here for the round-trip test below —
// 'sunflower' WAS the VERY LAST name in the 98-name map (VISUAL-TESTS-8),
// so the nature sub-barrel's registration side effects must have fired
// for it to resolve at all; VISUAL-TESTS-11 appended the landscape + sky
// subsets after it and 'lightning' is now the LAST name (the round-trip
// test below pins that too).
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
    it('exposes exactly the 108 built-in registry names, in registration order', () => {
        // Generic 23, then fantasy 10, then flags 8, animals 20, fruits 19,
        // nature 28 — the exact object-literal order in builtins.ts
        // (appending is the only safe evolution; the ui/gallery and
        // VisualIcon/data-icon resolve through these same keys). The
        // animals block lists the 10 reworked originals first, then the 10
        // additions; the fruits block follows fruits/index.ts's sub-barrel
        // order (the original ten first, then the nine 2026 additions —
        // VISUAL-TESTS-12 re-laid all 19 without touching the order); the
        // nature block lists the 12
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

    it('pins the exact full output strings for one icon per new subset: flag, checkeredFlag, cat, apple, watermelon', () => {
        // flags: plain rect flag and the winding-sensitive checkered flag
        expect(svgIcons.flag()).toBe(FLAG);
        expect(svgIcons.checkeredFlag()).toBe(CHECKERED_FLAG);
        // animals: cat — inner-ear + sweep-0 eye/nose/mouth holes inside
        // the sweep-1 head circle, plus the solid whisker rects
        expect(svgIcons.cat()).toBe(CAT);
        // fruits: apple (the VISUAL-TESTS-12 rework: evenodd two-lobe body
        // rising to the (12,7.4) top dimple with the left highlight hole +
        // the flatPath stem and leaf lens) and watermelon (the
        // VISUAL-TESTS-12 rework: evenodd flesh half-disc with three
        // teardrop seed holes + the separated flatPath rind band)
        expect(svgIcons.apple()).toBe(APPLE);
        expect(svgIcons.watermelon()).toBe(WATERMELON);
    });

    it('pins the exact full output strings for the new animals: horse, penguin, butterfly', () => {
        // horse: single flatPath (clockwise head/neck profile with Q
        // curves, solid ears + mane triangles, sweep-0 eye/nostril holes)
        expect(svgIcons.horse()).toBe(HORSE);
        // penguin: single flatPath (clockwise body ellipse + sweep-0
        // belly/eye holes + solid beak re-filling the belly + flippers)
        expect(svgIcons.penguin()).toBe(PENGUIN);
        // butterfly: mixed literal elements — four <ellipse transform>
        // wings + the spot-hole/antenna flatPath + <rect rx> body +
        // <circle> head and antenna tip dots
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

        // ── animals subset — REWORKED originals (detail pass) ─────────────
        // cat: left ear triangle + nose hole + ONE eye hole with BOTH arcs
        // sweep-0 (`1 0`) — sweep-0 is the counterclockwise winding that
        // makes nonzero fill cut the eye out of the clockwise head; a
        // sweep-1 eye would fill solid.
        expect(svgIcons.cat()).toContain('M6.5 2.5L11 5.5 8 9z');
        expect(svgIcons.cat()).toContain('M11 15l1 1.6L13 15z');
        expect(svgIcons.cat()).toContain('M8.2 12.6a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z');
        // cat detail: the inner-ear hole (reversed winding, fully above the
        // head circle), the LEFT whisker pair and the v-first mouth-line
        // hole below the nose
        expect(svgIcons.cat()).toContain('M7.4 4.2L7.9 7 9.1 5.4z');
        expect(svgIcons.cat()).toContain('M2.6 12.9h4v0.8h-4zM2.6 15.7h4v0.8h-4z');
        expect(svgIcons.cat()).toContain('M11.3 17.6v0.9h1.4v-0.9z');
        // dog: floppy ear with the sweep-1 rounded bottom, the thin
        // inner-ear hole kept clear of the head circle, and the sweep-0 eye
        // hole (same load-bearing winding pattern as the cat's eyes)
        expect(svgIcons.dog()).toContain('M2.6 6.4h4.6v8.9a2.3 2.3 0 0 1 -4.6 0z');
        expect(svgIcons.dog()).toContain('M3.3 7.6v6.6h1.5v-6.6z');
        expect(svgIcons.dog()).toContain('M8.35 10.4a1.05 1.05 0 1 0 2.1 0a1.05 1.05 0 1 0 -2.1 0z');
        // rabbit: upright rounded ear + inner-ear hole + LEFT whisker pair
        // + sweep-0 eye hole
        expect(svgIcons.rabbit()).toContain('M8 1.5h2.8v8.6a1.4 1.4 0 0 1 -2.8 0z');
        expect(svgIcons.rabbit()).toContain('M8.7 2.6v6.4h1.4v-6.4z');
        expect(svgIcons.rabbit()).toContain('M4.2 14.4h3.8v0.7h-3.8zM4.2 16h3.8v0.7h-3.8z');
        expect(svgIcons.rabbit()).toContain('M8.3 14.2a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z');
        // bird: crest triangle on the head's top edge + the two legs and
        // the two feet bars (each contiguous pair pinned verbatim)
        expect(svgIcons.bird()).toContain('M14.2 5.4L14.6 2.6 16.4 4.4z');
        expect(svgIcons.bird()).toContain('M9.7 19.4h0.9v2.8h-0.9zM12.4 19.4h0.9v2.8h-0.9z');
        expect(svgIcons.bird()).toContain('M9.25 22.2h1.8v0.6h-1.8zM11.95 22.2h1.8v0.6h-1.8z');
        // fish: dorsal fin triangle + EXACTLY two solid bubble <circle>
        // elements above the tail (larger one pinned verbatim)
        expect(svgIcons.fish()).toContain('M9 8.4L11.6 4.6 14.2 8.4z');
        expect(svgIcons.fish().match(/<circle /g)).toEqual(['<circle ', '<circle ']);
        expect(svgIcons.fish()).toContain('<circle cx="20.8" cy="6.6" r="0.7"');
        // bear: the two solid ear <circle> elements + a concentric sweep-0
        // inner-ear hole path riding on top of them
        expect(svgIcons.bear().match(/<circle /g)).toEqual(['<circle ', '<circle ']);
        expect(svgIcons.bear()).toContain('<circle cx="6.8" cy="7.2" r="2.6"');
        expect(svgIcons.bear()).toContain('M5.85 7.2a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z');
        // dragon: two horns, the two neck spikes on the back edge and the
        // sweep-0 nostril hole inside the upper jaw band
        expect(svgIcons.dragon()).toContain('M5.6 6.8L3.6 2.6 8.8 5.4z');
        expect(svgIcons.dragon()).toContain('M9.6 6.2L9.2 2 13.2 4.8z');
        expect(svgIcons.dragon()).toContain('M3.4 8.2L1.8 8.6 3.4 9.4zM3.4 10.6L1.8 11 3.4 11.8z');
        expect(svgIcons.dragon()).toContain('M20.05 10.4a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z');
        // snake: the MIRRORED bottom edge of the constant-thickness S
        // ribbon (c/s curves with negated y offsets — the mirrored return
        // path), EXACTLY two ribbon copies (the pinch-free union), the
        // sweep-1 head circle overlapping the ribbon's right end, EXACTLY
        // three sweep-0 spot holes and the forked-tongue bar pair
        expect(svgIcons.snake()).toContain('c-2.6 2.6-5.4 2.6-8 0s-5.4-2.6-8 0z');
        expect(svgIcons.snake().match(/c-2\.6 2\.6-5\.4 2\.6-8 0s-5\.4-2\.6-8 0z/g)).toEqual(
            new Array(2).fill('c-2.6 2.6-5.4 2.6-8 0s-5.4-2.6-8 0z')
        );
        expect(svgIcons.snake()).toContain('M17.1 13.8a2.5 2.5 0 1 1 5 0a2.5 2.5 0 1 1 -5 0z');
        expect(svgIcons.snake().match(/a0\.55 0\.55 0 1 0 1\.1 0/g)).toEqual(
            new Array(3).fill('a0.55 0.55 0 1 0 1.1 0')
        );
        expect(svgIcons.snake()).toContain('M22.2 13.2h1.5v0.5h-1.5zM22.2 14h1.5v0.5h-1.5z');
        // turtle: the v-first rim-line hole separating shell plates from
        // the body, the tail triangle at the shell's left base and the
        // head's sweep-0 eye hole (separate flatPath after the head circle)
        expect(svgIcons.turtle()).toContain('M5 13.7v0.8h13v-0.8z');
        expect(svgIcons.turtle()).toContain('M3.5 15.2L1.5 16.4 3.5 17.2z');
        expect(svgIcons.turtle()).toContain('M21.35 12.7a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z');

        // ── animals subset — the ten NEW animals ───────────────────────────
        // horse: the Q-curved head/neck profile (single clockwise outline
        // from the muzzle tip to the base) + one mane triangle verbatim
        expect(svgIcons.horse()).toContain(
            'M2.4 9.6Q3 7.4 5.4 6.8L9.6 5.6Q12.6 5.2 14 7.6Q15.2 9.6 15.6 12.4L16.6 21L11.8 21L11.4 16.2Q8.2 15.8 6 13.6Q3.4 13.2 2.6 11.4Q2.2 10.4 2.4 9.6z'
        );
        expect(svgIcons.horse()).toContain('M15.2 10.4L18.2 11 15.4 12.6z');
        // lion: EXACTLY eight r-2.9 scallop <circle> elements on the r 7.2
        // mane ring (first scallop pinned verbatim) + the r-6.6 face circle
        expect(svgIcons.lion().match(/<circle /g)).toEqual(new Array(8).fill('<circle '));
        expect(svgIcons.lion()).toContain('<circle cx="19.2" cy="12" r="2.9"');
        expect(svgIcons.lion()).toContain('M5.4 12a6.6 6.6 0 1 1 13.2 0');
        // owl: sweep-0 eye-RING holes with solid pupil dots re-filling each
        // ring's center (the dots are separate <circle> elements AFTER the
        // hole path, so both survive verbatim)
        expect(svgIcons.owl()).toContain('M6.8 11a2.3 2.3 0 1 0 4.6 0a2.3 2.3 0 1 0 -4.6 0z');
        expect(svgIcons.owl()).toContain('<circle cx="9.1" cy="11" r="1"');
        expect(svgIcons.owl()).toContain('<circle cx="14.9" cy="11" r="1"');
        // fox: the Q-rounded brow corners of the clockwise head outline
        // (chin → cheeks → brows → close)
        expect(svgIcons.fox()).toContain(
            'M12 21.6L4.2 10.6Q3.6 7.4 6.2 5.8Q9 4.2 12 5.8Q15 4.2 17.8 5.8Q20.4 7.4 19.8 10.6z'
        );
        // whale: the three-bar water spout above the dome (contiguous) and
        // the notched double-spike tail flukes
        expect(svgIcons.whale()).toContain(
            'M4.9 4.6h0.9v4.2h-0.9zM6.7 2.6h0.9v5.8h-0.9zM8.5 4.4h0.9v3.6h-0.9z'
        );
        expect(svgIcons.whale()).toContain('M17.2 9.8L21.8 6.4Q22.8 12.2 21.8 18L17.2 14.6z');
        // frog: solid eye-bump <circle> overlapping the body's top edge +
        // the wide mouth-line hole spanning the body
        expect(svgIcons.frog()).toContain('<circle cx="7.6" cy="6.6" r="2.5"');
        expect(svgIcons.frog()).toContain('M6.8 14.3v0.9h10.4v-0.9z');
        // snail: the concentric shell rings — sweep-0 ring hole r 3.7 and
        // sweep-0 core hole r 1.35 (alternating solid/hole/solid/hole)
        expect(svgIcons.snail()).toContain('M11.3 12.6a3.7 3.7 0 1 0 7.4 0a3.7 3.7 0 1 0 -7.4 0z');
        expect(svgIcons.snail()).toContain('M13.65 12.6a1.35 1.35 0 1 0 2.7 0a1.35 1.35 0 1 0 -2.7 0z');
        // duck: the solid bill triangle pointing right and BOTH water
        // ripple bars under the body
        expect(svgIcons.duck()).toContain('M17.5 6.2L21.9 7.5 17.5 8.8z');
        expect(svgIcons.duck()).toContain('M2.6 21.4h13.6v0.9h-13.6z');
        expect(svgIcons.duck()).toContain('M5.4 22.9h9v0.7h-9z');
        // butterfly: EXACTLY four rotated wing <ellipse> elements + the
        // segmented body <rect> (rx'd, verbatim)
        expect(svgIcons.butterfly().match(/<ellipse /g)).toEqual(new Array(4).fill('<ellipse '));
        expect(svgIcons.butterfly()).toContain(
            '<rect x="11.25" y="7.4" width="1.5" height="11.6" rx="0.75"'
        );

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

    it('registers every built-in on import: svgIcon resolves spellbook, duck, strawberry, flower, sunflower and lightning to their exact strings', () => {
        // Importing THIS module (builtins.ts) keeps all built-ins registered
        // through the shared registry — the round-trip through the live
        // registry must yield the identical default render. 'spellbook' is
        // late-alphabet fantasy, 'duck' is the LAST animal name,
        // 'strawberry' sits at the tail of the reworked fruits block and
        // 'flower' closed the map until VISUAL-TESTS-8 — the nature
        // sub-barrel's registration side effects must have fired for any
        // of them to resolve, so a map entry without registration would
        // fail on any of the first five.
        expect(svgIcon('spellbook')).toBe(SPELLBOOK);
        expect(svgIcons.spellbook()).toBe(SPELLBOOK);
        expect(svgIcon('duck')).toBe(DUCK);
        expect(svgIcons.duck()).toBe(DUCK);
        expect(svgIcon('strawberry')).toBe(STRAWBERRY);
        expect(svgIcons.strawberry()).toBe(STRAWBERRY);
        expect(svgIcon('flower')).toBe(FLOWER);
        expect(svgIcons.flower()).toBe(FLOWER);
        // 'sunflower' WAS the LAST name of the ENTIRE 98-name map
        // (VISUAL-TESTS-8); VISUAL-TESTS-11 appended the landscape
        // (mountain/hills/river) and sky (sun…lightning) subsets after it,
        // so it now closes only the trees/plants block.
        expect(svgIcon('sunflower')).toBe(SUNFLOWER);
        expect(svgIcons.sunflower()).toBe(SUNFLOWER);
        // 'lightning' (nature/lightning.ts) is the new LAST name of the
        // ENTIRE 108-name map — the sky sub-barrel's registration side
        // effects must have fired for it to resolve. Two exact pins: the
        // delegation identity AND the full render composed from the
        // imported ICON_LIGHTNING definition (svg-icon OUTPUT CONTRACT:
        // xmlns → viewBox → width="1em" → height="1em" → fill=
        // "currentColor", then the definition content verbatim) —
        // byte-exact by construction, no hand-copied probe string.
        expect(svgIcon('lightning')).toBe(svgIcons.lightning());
        expect(svgIcon('lightning')).toBe(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">' +
                ICON_LIGHTNING +
                '</svg>'
        );
    });
});
