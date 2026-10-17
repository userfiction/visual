/**
 * animals.test.ts — deterministic per-module tests for the ANIMALS icon set
 * (./: one file per icon, 60 modules after the wildlife expansion).
 *
 * SCOPE (companion to ../icons.test.ts): THIS file pins the PER-MODULE
 * contract for every one of the 60 animal files, mirroring the
 * fruits/fruits.test.ts conventions:
 *   1. MODULE SELF-CONTAINMENT — each svg<Name> factory renders the
 *      documented svg-icon OUTPUT CONTRACT shell (../svg-icon.ts: xmlns →
 *      viewBox → width="1em" → height="1em" → fill="currentColor", then
 *      the definition content verbatim) around THAT module's ICON_<NAME>
 *      constant, byte-exact, and the module import alone registers the
 *      name in the shared registry (svgIcon(name) === svg<Name>()).
 *   2. XML VALIDITY + EXACT ELEMENT CENSUS — every full render parses as
 *      a standalone SVG document; the per-module path/g/circle/ellipse/
 *      rect counts are exact and every <path> carries the flat-design
 *      fill="currentColor" stroke="none" pair.
 *   3. SOURCE-DERIVED SIGNATURES + evenodd CENSUS — one distinctive
 *      geometry fragment per module transcribed from that module's own
 *      source (no output blessing), plus the exact count of
 *      fill-rule="evenodd" attributes (explicit hole-cutting guard).
 *   4. GROUP TRANSLATIONS — deer/moose/goat wrap their silhouette in a
 *      single <g transform="translate(…)"> for 24px centering; the exact
 *      offsets and the attribute-free <g> (fill/stroke inherit) are pinned.
 *   5. LITERAL ELEMENTS — the fine-element modules' circle/ellipse/rect
 *      geometry (cx/cy/r, rx/ry/transform, x/y/w/h/rx) is exact.
 *   6. REGISTRATION SURFACE — the 60 names sit contiguously in ../builtins
 *      svgIcons order, the gallery bootstrap (../../../ui/main.ts) lists
 *      all 60 under its Animals subset, and the root ../index barrel
 *      re-exports every svg<Name> factory.
 *   7. STRING/REACT PARITY — every <Name>Icon renders IconBase's exact
 *      shell defaults (../react.tsx: 16px square, 24×24 grid, currentColor,
 *      stroke none, decorative a11y, data-icon) and its innerHTML equals
 *      the definition constant serialized through the same jsdom
 *      machinery (../react.test.tsx `serialized()` precedent).
 *
 * SAME-PAINT FIX (final triage, production stable): the earlier defect —
 * butterfly/bear/turtle/snake painting hole subpaths AFTER opaque shapes
 * (or across separate operations), which cannot subtract — is fixed.
 * Every intended hole now rides INSIDE its containing silhouette's ONE
 * evenodd path (butterfly wing+spot, bear ear+opening, turtle head+eye,
 * snake ribbon+spots), and silhouettes that must union or stay
 * independent are separate paints (rabbit ear↔face, snail shell↔body).
 * The dedicated structural same-paint test below pins those exact
 * per-path arrays — jsdom has no geometric fill hit-test, so no renderer
 * is faked (Chrome spot-checks independently verified the pixels).
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
import { ICON_CAT, svgCat, CatIcon } from './cat';
import { ICON_DOG, svgDog, DogIcon } from './dog';
import { ICON_BIRD, svgBird, BirdIcon } from './bird';
import { ICON_FISH, svgFish, FishIcon } from './fish';
import { ICON_RABBIT, svgRabbit, RabbitIcon } from './rabbit';
import { ICON_BEAR, svgBear, BearIcon } from './bear';
import { ICON_DRAGON, svgDragon, DragonIcon } from './dragon';
import { ICON_SNAKE, svgSnake, SnakeIcon } from './snake';
import { ICON_TURTLE, svgTurtle, TurtleIcon } from './turtle';
import { ICON_PAW, svgPaw, PawIcon } from './paw';
import { ICON_HORSE, svgHorse, HorseIcon } from './horse';
import { ICON_LION, svgLion, LionIcon } from './lion';
import { ICON_OWL, svgOwl, OwlIcon } from './owl';
import { ICON_FOX, svgFox, FoxIcon } from './fox';
import { ICON_WHALE, svgWhale, WhaleIcon } from './whale';
import { ICON_FROG, svgFrog, FrogIcon } from './frog';
import { ICON_SNAIL, svgSnail, SnailIcon } from './snail';
import { ICON_PENGUIN, svgPenguin, PenguinIcon } from './penguin';
import { ICON_BUTTERFLY, svgButterfly, ButterflyIcon } from './butterfly';
import { ICON_DUCK, svgDuck, DuckIcon } from './duck';
import { ICON_ELEPHANT, svgElephant, ElephantIcon } from './elephant';
import { ICON_GIRAFFE, svgGiraffe, GiraffeIcon } from './giraffe';
import { ICON_ZEBRA, svgZebra, ZebraIcon } from './zebra';
import { ICON_RHINOCEROS, svgRhinoceros, RhinocerosIcon } from './rhinoceros';
import { ICON_HIPPOPOTAMUS, svgHippopotamus, HippopotamusIcon } from './hippopotamus';
import { ICON_MONKEY, svgMonkey, MonkeyIcon } from './monkey';
import { ICON_GORILLA, svgGorilla, GorillaIcon } from './gorilla';
import { ICON_PANDA, svgPanda, PandaIcon } from './panda';
import { ICON_KOALA, svgKoala, KoalaIcon } from './koala';
import { ICON_KANGAROO, svgKangaroo, KangarooIcon } from './kangaroo';
import { ICON_DEER, svgDeer, DeerIcon } from './deer';
import { ICON_MOOSE, svgMoose, MooseIcon } from './moose';
import { ICON_WOLF, svgWolf, WolfIcon } from './wolf';
import { ICON_TIGER, svgTiger, TigerIcon } from './tiger';
import { ICON_COW, svgCow, CowIcon } from './cow';
import { ICON_PIG, svgPig, PigIcon } from './pig';
import { ICON_SHEEP, svgSheep, SheepIcon } from './sheep';
import { ICON_GOAT, svgGoat, GoatIcon } from './goat';
import { ICON_CAMEL, svgCamel, CamelIcon } from './camel';
import { ICON_DONKEY, svgDonkey, DonkeyIcon } from './donkey';
import { ICON_BAT, svgBat, BatIcon } from './bat';
import { ICON_EAGLE, svgEagle, EagleIcon } from './eagle';
import { ICON_PARROT, svgParrot, ParrotIcon } from './parrot';
import { ICON_FLAMINGO, svgFlamingo, FlamingoIcon } from './flamingo';
import { ICON_SWAN, svgSwan, SwanIcon } from './swan';
import { ICON_CHICKEN, svgChicken, ChickenIcon } from './chicken';
import { ICON_ROOSTER, svgRooster, RoosterIcon } from './rooster';
import { ICON_PEACOCK, svgPeacock, PeacockIcon } from './peacock';
import { ICON_OSTRICH, svgOstrich, OstrichIcon } from './ostrich';
import { ICON_SHARK, svgShark, SharkIcon } from './shark';
import { ICON_DOLPHIN, svgDolphin, DolphinIcon } from './dolphin';
import { ICON_OCTOPUS, svgOctopus, OctopusIcon } from './octopus';
import { ICON_SQUID, svgSquid, SquidIcon } from './squid';
import { ICON_JELLYFISH, svgJellyfish, JellyfishIcon } from './jellyfish';
import { ICON_CRAB, svgCrab, CrabIcon } from './crab';
import { ICON_LOBSTER, svgLobster, LobsterIcon } from './lobster';
import { ICON_SEAHORSE, svgSeahorse, SeahorseIcon } from './seahorse';
import { ICON_CROCODILE, svgCrocodile, CrocodileIcon } from './crocodile';
import { ICON_LIZARD, svgLizard, LizardIcon } from './lizard';
import { ICON_CHAMELEON, svgChameleon, ChameleonIcon } from './chameleon';

// The fixed svg-icon OUTPUT CONTRACT shell every factory prepends (verbatim
// attribute order from ../svg-icon.ts).
const SHELL_OPEN =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">';
const SHELL_CLOSE = '</svg>';

// Offscreen DOM probe: reads a definition string back through the SAME jsdom
// innerHTML machinery the React components render through (attribute order
// preserved, self-closing elements read back as open/close pairs).
const probe = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const serialized = (markup: string): string => {
    probe.innerHTML = markup;
    return probe.innerHTML;
};

/**
 * The per-module contract table. Census numbers and signature fragments are
 * hand-authored from each module's source file (cat.ts … chameleon.ts).
 * census fields = parsed-document element counts (test 2); evenodd = exact
 * count of fill-rule="evenodd" attributes on the definition constant (test
 * 3); signature = one distinctive silhouette fragment that MUST appear
 * verbatim (test 3).
 */
type AnimalContract = {
    name: string;
    icon: string;
    svg: SvgIconFactory;
    component: React.ComponentType<IconProps>;
    paths: number;
    groups: number;
    circles: number;
    ellipses: number;
    rects: number;
    evenodd: number;
    signature: string;
};

const ANIMALS: AnimalContract[] = [
    {
        // cat.ts: head+ears silhouette with inner-ear/eye/nose/mouth holes
        // (evenodd) + solid whisker bars (flatPath).
        name: 'cat',
        icon: ICON_CAT,
        svg: svgCat,
        component: CatIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature: 'M5 2.4L8.6 8.2Q12 7.2 15.4 8.2L19 2.4',
    },
    {
        // dog.ts: head/face element (evenodd, muzzle depth-3 re-fills) +
        // drooping-ear element (evenodd, roots inside the head circle).
        name: 'dog',
        icon: ICON_DOG,
        svg: svgDog,
        component: DogIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 2,
        signature: 'M6.2 12.8a5.8 5.8 0 1 1 11.6 0a5.8 5.8 0 1 1 -11.6 0z',
    },
    {
        // bird.ts: songbird profile — head (eye hole) + body (wing slot)
        // evenodd elements + flatPath crest/beak/tail/legs overlay.
        name: 'bird',
        icon: ICON_BIRD,
        svg: svgBird,
        component: BirdIcon,
        paths: 3,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 2,
        signature: 'M12.3 8.4a3.3 3.3 0 1 1 6.6 0a3.3 3.3 0 1 1 -6.6 0z',
    },
    {
        // fish.ts: evenodd body (eye + gill crescent) + flatPath fins +
        // THREE solid bubble circles rising to the upper left.
        name: 'fish',
        icon: ICON_FISH,
        svg: svgFish,
        component: FishIcon,
        paths: 2,
        groups: 0,
        circles: 3,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature:
            'M15.8 10.6L20.6 7Q21.7 6.4 21.4 7.6L20.1 11.5Q19.9 12.6 20.1 13.7L21.4 17.6Q21.7 18.8 20.6 18.2L15.8 15z',
    },
    {
        // rabbit.ts: THREE paths — evenodd ear bands (inner-ear slots), a
        // SEPARATE evenodd face element (head circle + eye/nose/philtrum/ω
        // mouth holes; bases union the ears across elements) + flatPath
        // whisker bars.
        name: 'rabbit',
        icon: ICON_RABBIT,
        svg: svgRabbit,
        component: RabbitIcon,
        paths: 3,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 2,
        signature: 'M5.8 3.2Q5.8 1.4 7.8 1.4Q9.8 1.4 9.8 3.2L9.8 12L5.8 12z',
    },
    {
        // bear.ts: evenodd face (muzzle depth-3 re-fills) + evenodd ear
        // element — each cupped ear outline and its r 0.8 opening hole at
        // (5.9 5.8)/(18.1 5.8) share ONE path (no solid ear circles).
        name: 'bear',
        icon: ICON_BEAR,
        svg: svgBear,
        component: BearIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 2,
        signature: 'M4.4 13.2a7.6 7.6 0 1 1 15.2 0a7.6 7.6 0 1 1 -15.2 0z',
    },
    {
        // dragon.ts: evenodd head + flatPath body/tail/feet + evenodd bat
        // wing with scalloped membrane.
        name: 'dragon',
        icon: ICON_DRAGON,
        svg: svgDragon,
        component: DragonIcon,
        paths: 3,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 2,
        signature: 'M10.5 16L2 5.6Q2.7 10 1.5 13Q4.1 11.8 5.2 15.2Q7 13.7 8.3 18z',
    },
    {
        // snake.ts: THREE paths — evenodd ribbon whose THREE spot holes ride
        // the SAME ribbon d, evenodd head (eye hole inside it; the head
        // unions the ribbon ACROSS elements) + solid flatPath forked tongue.
        name: 'snake',
        icon: ICON_SNAKE,
        svg: svgSnake,
        component: SnakeIcon,
        paths: 3,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 2,
        signature: 'M1.6 10.8C4.4 7.2 7.6 7.2 10.2 10.4C12.8 13.6 16 13.6 18.8 10.8L18.8 14.4',
    },
    {
        // turtle.ts: THREE paths — evenodd shell dome (spots + rim band) +
        // flatPath legs/tail + evenodd head element whose r 0.5 eye hole at
        // (21.8 13.3) rides the SAME head path (no solid head circle).
        name: 'turtle',
        icon: ICON_TURTLE,
        svg: svgTurtle,
        component: TurtleIcon,
        paths: 3,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 2,
        signature: 'M2.8 15.4a8.7 7.4 0 0 1 17.4 0z',
    },
    {
        // paw.ts: bilobed palm bean (flatPath) + FOUR rotated teardrop
        // <ellipse> toe pads — gaps stay negative via cross-element union.
        name: 'paw',
        icon: ICON_PAW,
        svg: svgPaw,
        component: PawIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 4,
        rects: 0,
        evenodd: 0,
        signature: 'M12 12.8Q16.6 12.8 17.1 16.2Q17.6 18.9 16.1 20.5',
    },
    {
        // horse.ts: head/neck profile (eye/nostril/mouth holes, evenodd) +
        // flatPath ears + jagged three-spike mane.
        name: 'horse',
        icon: ICON_HORSE,
        svg: svgHorse,
        component: HorseIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature: 'M2 10.4Q2.2 9.4 3.4 9.2L7.6 4.6Q8.6 3.8 10 4.4L12.6 5.8',
    },
    {
        // lion.ts: 12-spike mane star with r-6.4 face disc hole (evenodd) +
        // separate evenodd ear-bump element.
        name: 'lion',
        icon: ICON_LION,
        svg: svgLion,
        component: LionIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 2,
        signature: 'M1.9 12.2L4.66 10.23L4.29 7L7.28 6.77',
    },
    {
        // owl.ts: one evenodd element (tufts/body/ring holes/beak/chevrons/
        // feet) + TWO solid pupil circles re-filling the ring centers.
        name: 'owl',
        icon: ICON_OWL,
        svg: svgOwl,
        component: OwlIcon,
        paths: 1,
        groups: 0,
        circles: 2,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature: 'M6.6 8L4.6 2.6Q4.5 2.2 5 2.4L10 5.2z',
    },
    {
        // fox.ts: evenodd ears + evenodd head (eye/nose holes in the same
        // paint) + flatPath chin wedge completing the V jaw.
        name: 'fox',
        icon: ICON_FOX,
        svg: svgFox,
        component: FoxIcon,
        paths: 3,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 2,
        signature: 'M12 21.4L7.6 16.4Q4.4 14.6 3.2 13.6L4.4 10.4',
    },
    {
        // whale.ts: evenodd body (eye + smile slit) + flatPath horizontal
        // flukes / pectoral flipper / V spout.
        name: 'whale',
        icon: ICON_WHALE,
        svg: svgWhale,
        component: WhaleIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature: 'M18.8 8.8Q15 8.7 13.8 4.5Q16.4 4.4 18.8 6.7Q20.3 4.2 23 3.9Q22.6 7.8 18.8 8.8z',
    },
    {
        // frog.ts: three evenodd elements — nested eye bumps, body (smile +
        // nostril holes), webbed feet with toe slits.
        name: 'frog',
        icon: ICON_FROG,
        svg: svgFrog,
        component: FrogIcon,
        paths: 3,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 3,
        signature: 'M4.65 5.9a2.55 2.55 0 1 1 5.1 0a2.55 2.55 0 1 1 -5.1 0z',
    },
    {
        // snail.ts: SEPARATE evenodd paints — shell (alternating ring
        // depths) vs body/head stalk (antennae + eye hole) — plus TWO solid
        // antenna-tip dot circles.
        name: 'snail',
        icon: ICON_SNAIL,
        svg: svgSnail,
        component: SnailIcon,
        paths: 2,
        groups: 0,
        circles: 2,
        ellipses: 0,
        rects: 0,
        evenodd: 2,
        signature: 'M9.8 12.4a5.3 5.3 0 1 1 10.6 0a5.3 5.3 0 1 1 -10.6 0z',
    },
    {
        // penguin.ts: ONE evenodd element — body ellipse, belly + face
        // patch holes, dark eyes/beak re-fills, feet, flippers.
        name: 'penguin',
        icon: ICON_PENGUIN,
        svg: svgPenguin,
        component: PenguinIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature: 'M5.4 13.2a6.6 8.4 0 1 1 13.2 0a6.6 8.4 0 1 1 -13.2 0z',
    },
    {
        // butterfly.ts: FOUR rotated evenodd wing paths, each d carrying the
        // wing AND its r 1.1 spot hole (one paint per wing; no <ellipse>) +
        // flatPath antennae + body <rect> + head/dot <circle>s.
        name: 'butterfly',
        icon: ICON_BUTTERFLY,
        svg: svgButterfly,
        component: ButterflyIcon,
        paths: 5,
        groups: 0,
        circles: 3,
        ellipses: 0,
        rects: 1,
        evenodd: 4,
        // Upper-left wing + its spot hole: two subpaths of ONE d (the spot
        // can no longer drift into a later separate paint; the spot center
        // (7.4 9.2) is the rotation origin, pinned by test 6's transforms).
        signature:
            'M3.5 9.2a3.9 4.7 0 1 1 7.8 0a3.9 4.7 0 1 1 -7.8 0zM6.3 9.2a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z',
    },
    {
        // duck.ts: tail + body (wing slot) + head (eye hole) evenodd
        // elements + flatPath bill and water ripples.
        name: 'duck',
        icon: ICON_DUCK,
        svg: svgDuck,
        component: DuckIcon,
        paths: 4,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 3,
        signature: 'M17 5.8Q21.8 5.5 22 7Q21.8 8.5 17 8.2z',
    },
    {
        // elephant.ts: single flatPath — clockwise head/trunk/body/ear +
        // CCW eye + v-first leg-gap holes (nonzero-winding silhouette).
        name: 'elephant',
        icon: ICON_ELEPHANT,
        svg: svgElephant,
        component: ElephantIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M6.8 7.2Q5.5 8.6 5.1 11Q4.7 13.6 5.4 16Q6.2 18.4 7.8 20.2L6.2 21.4',
    },
    {
        // giraffe.ts: single flatPath — ossicones/head/muzzle/neck/body +
        // CCW eye and reversed-l diamond patch holes.
        name: 'giraffe',
        icon: ICON_GIRAFFE,
        svg: svgGiraffe,
        component: GiraffeIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M5 2.8h0.9v3.8h-0.9zM8 2.8h0.9v3.8h-0.9z',
    },
    {
        // zebra.ts: single flatPath — head/neck profile + mane triangles +
        // CCW eye/nostril + v-first stripe holes.
        name: 'zebra',
        icon: ICON_ZEBRA,
        svg: svgZebra,
        component: ZebraIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M2.6 10.2Q2.8 8.8 4.6 8.2L8.8 6.6Q11.8 6 13.4 8Q14.8 10 15.2 12.8L17.4 21L12.6 21',
    },
    {
        // rhinoceros.ts: single flatPath — low-slung body + TWO horns +
        // CCW eye + v-first skin-fold holes.
        name: 'rhinoceros',
        icon: ICON_RHINOCEROS,
        svg: svgRhinoceros,
        component: RhinocerosIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M18.2 11.6L20.2 6.6 20.6 12.6z',
    },
    {
        // hippopotamus.ts: single flatPath — boxy muzzle/body + leg stubs +
        // CCW eye + two CCW nostril holes.
        name: 'hippopotamus',
        icon: ICON_HIPPOPOTAMUS,
        svg: svgHippopotamus,
        component: HippopotamusIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M2.4 11.6L8 11.2Q9.6 11 10.6 9.8Q11.8 8.2 13.6 7.8Q17 7 19.8 8.2Q21.6 9.2 21.6 12L21.6 16.6',
    },
    {
        // monkey.ts: single flatPath — head + ear rings (solid circles +
        // CCW inner holes) + CCW face window with SOLID re-filled features.
        name: 'monkey',
        icon: ICON_MONKEY,
        svg: svgMonkey,
        component: MonkeyIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M5.4 12.4a6.6 6.6 0 1 1 13.2 0a6.6 6.6 0 1 1 -13.2 0z',
    },
    {
        // gorilla.ts: single flatPath — dome head + crest + CCW face window
        // with solid brow/eyes/muzzle and CCW nostrils punched inside.
        name: 'gorilla',
        icon: ICON_GORILLA,
        svg: svgGorilla,
        component: GorillaIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M5 9.4Q5 5.4 9 5Q12 4.4 15 5Q19 5.4 19 9.4L19 16.4',
    },
    {
        // panda.ts: single flatPath — head + solid ear circles + CCW eye
        // patches with SOLID re-filled dots + CCW nose/mouth.
        name: 'panda',
        icon: ICON_PANDA,
        svg: svgPanda,
        component: PandaIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M5 12.6a7 7 0 1 1 14 0a7 7 0 1 1 -14 0z',
    },
    {
        // koala.ts: evenodd ear-ring path first + flatPath face path with
        // CCW eye holes and the oversized CCW central nose hole.
        name: 'koala',
        icon: ICON_KOALA,
        svg: svgKoala,
        component: KoalaIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature: 'M2 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 1 1 -7 0z',
    },
    {
        // kangaroo.ts: single flatPath — head blob/ears/neck/torso/thigh +
        // arm/tail/foot + CCW eye hole.
        name: 'kangaroo',
        icon: ICON_KANGAROO,
        svg: svgKangaroo,
        component: KangarooIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M4.6 6.2Q5.6 4.6 7.6 4.4Q9.6 4.2 10.6 5.4Q11.4 6.4 11 8L10.4 10',
    },
    {
        // deer.ts: antlers/head/muzzle/neck single flatPath wrapped in a
        // centering <g transform="translate(3.6 0)"> (attribute-free <g>).
        name: 'deer',
        icon: ICON_DEER,
        svg: svgDeer,
        component: DeerIcon,
        paths: 1,
        groups: 1,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M7 8.4L5.8 2.6 6.8 2.4 8.2 5.2 8.6 2.4 9.6 2.6 9.2 5.6 11 3.6 11.6 4.4 9 8.2z',
    },
    {
        // moose.ts: palmate antler dome + head/muzzle/dewlap/neck inside a
        // <g transform="translate(3 0)">; three CCW finger-slot rects cut it.
        name: 'moose',
        icon: ICON_MOOSE,
        svg: svgMoose,
        component: MooseIcon,
        paths: 1,
        groups: 1,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M4 7.8Q3.4 5.8 4.6 4.2Q6 2.6 8.4 2.6Q10.8 2.6 11.4 4.6Q12 6.6 10.6 8z',
    },
    {
        // wolf.ts: ONE evenodd path — howling silhouette + round eye +
        // hip-slit hole (hand-written string, lowercase decimal style).
        name: 'wolf',
        icon: ICON_WOLF,
        svg: svgWolf,
        component: WolfIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature: 'M4.5 2.5L8.1 4.2 10.2 2 10.8 6Q12.3 7.3 12.8 9.8L14.2 11.5 13 11.4',
    },
    {
        // tiger.ts: single flatPath — head circle + solid ears/cheek spikes
        // + CCW stripe/eye/nose/mouth holes.
        name: 'tiger',
        icon: ICON_TIGER,
        svg: svgTiger,
        component: TigerIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M5.2 12.8a6.8 6.8 0 1 1 13.6 0a6.8 6.8 0 1 1 -13.6 0z',
    },
    {
        // cow.ts: single flatPath — dome head + side ear ellipses + Q-arc
        // horns + CCW eyes + CCW muzzle window with SOLID re-filled nostrils.
        name: 'cow',
        icon: ICON_COW,
        svg: svgCow,
        component: CowIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M7.8 16.6a4.2 3 0 1 0 8.4 0a4.2 3 0 1 0 -8.4 0z',
    },
    {
        // pig.ts: single flatPath — wide Q-silhouette head + mirrored folded
        // ear lobes + CCW eyes + CCW snout window with SOLID re-filled dots.
        name: 'pig',
        icon: ICON_PIG,
        svg: svgPig,
        component: PigIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature:
            'M4.6 12.2Q4.4 8.4 8 7.4Q12 6.4 16 7.4Q19.6 8.4 19.4 12.2Q19.2 16.6 16.4 18.6Q12 20.6 7.6 18.6Q4.8 16.6 4.6 12.2z',
    },
    {
        // sheep.ts: scalloped fleece ring (evenodd) + separate bare-face
        // element (evenodd eye) + flatPath ears/hooves.
        name: 'sheep',
        icon: ICON_SHEEP,
        svg: svgSheep,
        component: SheepIcon,
        paths: 3,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 2,
        signature: 'M4 8Q2 5 5 4.8Q5.5 2 8.3 3.2Q10.2 1.2 12.4 3',
    },
    {
        // goat.ts: scimitar horn band + head/muzzle/beard/neck inside a
        // <g transform="translate(2.75 0)">.
        name: 'goat',
        icon: ICON_GOAT,
        svg: svgGoat,
        component: GoatIcon,
        paths: 1,
        groups: 1,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M9.2 8.4Q10.2 5.6 12.6 4.2Q14.2 3.4 15.6 3.6L15.4 5',
    },
    {
        // camel.ts: single flatPath dromedary silhouette with the deep
        // neck/hump saddle + solid ear/tail + CCW eye hole.
        name: 'camel',
        icon: ICON_CAMEL,
        svg: svgCamel,
        component: CamelIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M4.2 4.8Q5.2 3.2 7.2 3.4Q8.8 3.6 9.8 5.6Q10.4 7 11.4 10.2Q12.4 5.2 14.2 5.8',
    },
    {
        // donkey.ts: single flatPath — long dome head + VERY long Q-blade
        // ears + CCW inner-ear slots + CCW muzzle window with re-filled dots.
        name: 'donkey',
        icon: ICON_DONKEY,
        svg: svgDonkey,
        component: DonkeyIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M7.4 7.6Q6.6 2.8 8.4 2.2Q9.6 2.2 9.3 6.4L9.2 8.2z',
    },
    {
        // bat.ts: single flatPath — head/eyes/body + two mirrored scalloped
        // wings (leading edge out to the tip, concave trailing edge back).
        name: 'bat',
        icon: ICON_BAT,
        svg: svgBat,
        component: BatIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M13.7 10Q18.4 6.2 21.6 6.8Q19.2 9.2 18.6 12Q16.6 13.2 15.8 16.2L13.7 14.6z',
    },
    {
        // eagle.ts: single flatPath — hooked beak profile + reverse-wound
        // brow wedge + CCW nostril inside the upper-beak band.
        name: 'eagle',
        icon: ICON_EAGLE,
        svg: svgEagle,
        component: EagleIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'Q21.4 11.4 20 13.2L19.6 13.4L17.4 12.2L16.2 12.4',
    },
    {
        // parrot.ts: evenodd body/tail/wing path (eye + swept feather slit
        // inside it) + flatPath hooked bill + feet/perch.
        name: 'parrot',
        icon: ICON_PARROT,
        svg: svgParrot,
        component: ParrotIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature: 'M8 4Q9 1.8 12 2Q16 2.3 16 6.5L17.4 13.5Q18 16 16 17.4L19.5 22L15.3 20',
    },
    {
        // flamingo.ts: single flatPath — S-neck ribbon, down-curved bill,
        // CCW wing/eye holes, straight leg + zigzag bent leg.
        name: 'flamingo',
        icon: ICON_FLAMINGO,
        svg: svgFlamingo,
        component: FlamingoIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M11.2 12.8L12.7 13.6 14.2 16 15.9 13.9 17 14.7 15.1 17.3 13.6 17.1z',
    },
    {
        // swan.ts: evenodd unified contour (S-neck + swept feather cutout +
        // eye) + flatPath water ripples.
        name: 'swan',
        icon: ICON_SWAN,
        svg: svgSwan,
        component: SwanIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature: 'M2 11L5.8 13Q10 10 13.5 13Q17.5 12.8 16 9Q13.2 4 16 2.6Q19 1.4 20 4L22 4.8 19.6 5.5',
    },
    {
        // chicken.ts: evenodd body contour (rounded comb lobes, tapered wing
        // slit, eye) + flatPath legs with toes.
        name: 'chicken',
        icon: ICON_CHICKEN,
        svg: svgChicken,
        component: ChickenIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature: 'Q13 3 14.5 3.3Q15.2 1.8 16.3 3Q18 2.4 18 4Q19 4.1 18.6 5.5Q20 6.3 19.5 8.5L22 9.3',
    },
    {
        // rooster.ts: single flatPath — body/head circles + three comb
        // triangles + long sickle tail wedges + CCW eye/wing slit.
        name: 'rooster',
        icon: ICON_ROOSTER,
        svg: svgRooster,
        component: RoosterIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M6.8 12Q5.2 5.2 1.5 6Q2.2 3.1 4.4 4.2Q7.6 5.8 8.6 11.2z',
    },
    {
        // peacock.ts: evenodd fan sector (five eyespot holes + head
        // clearance) + flatPath body/crest/legs + THREE crest dot circles.
        name: 'peacock',
        icon: ICON_PEACOCK,
        svg: svgPeacock,
        component: PeacockIcon,
        paths: 2,
        groups: 0,
        circles: 3,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature: 'M12 15.6L3.2 10A9.6 9.6 0 0 1 20.8 10z',
    },
    {
        // ostrich.ts: single flatPath — raised body ellipse + tail tuft +
        // thin neck ribbon + small head + CCW feather slit + long legs.
        name: 'ostrich',
        icon: ICON_OSTRICH,
        svg: svgOstrich,
        component: OstrichIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M5.2 10.7L2 8.4 3.1 12.8 5.4 13z',
    },
    {
        // shark.ts: single flatPath — dorsal fin + notched caudal body +
        // pectoral fin + CCW eye/gill/mouth holes.
        name: 'shark',
        icon: ICON_SHARK,
        svg: svgShark,
        component: SharkIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M9.8 9.5L12.6 5.4 14.6 9.6z',
    },
    {
        // dolphin.ts: single flatPath — rostrum body + back-swept dorsal +
        // notched flukes + flipper + CCW eye/smile holes.
        name: 'dolphin',
        icon: ICON_DOLPHIN,
        svg: svgDolphin,
        component: DolphinIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M2.4 14.6Q2.8 13.4 4.2 12.8L4.6 12.6',
    },
    {
        // octopus.ts: single flatPath — mantle head circle + CCW eye holes
        // + four mirrored arm wedges per side.
        name: 'octopus',
        icon: ICON_OCTOPUS,
        svg: svgOctopus,
        component: OctopusIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M6.4 8.2a5.6 5.6 0 1 1 11.2 0a5.6 5.6 0 1 1 -11.2 0z',
    },
    {
        // squid.ts: flatPath fins/mantle/head band/arms/tentacles + TWO
        // paddle-dot circles + separate evenodd ringed-eyes path.
        name: 'squid',
        icon: ICON_SQUID,
        svg: svgSquid,
        component: SquidIcon,
        paths: 2,
        groups: 0,
        circles: 2,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature: 'M12 2.6Q14 4.4 14.6 10.2L14.6 11.4Q13.6 12.4 12 12.4Q10.4 12.4 9.4 11.4L9.4 10.2',
    },
    {
        // jellyfish.ts: single flatPath — six-scallop bell skirt with the
        // reverse-wound highlight crescent + four wavy tentacle ribbons.
        name: 'jellyfish',
        icon: ICON_JELLYFISH,
        svg: svgJellyfish,
        component: JellyfishIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M4.6 13.2A7.4 6.6 0 0 1 19.4 13.2Q18.2 12 17 13.2',
    },
    {
        // crab.ts: flatPath body/claws/legs/mouth + separate evenodd
        // stalked-eye path (ring outlines with transparent pupils).
        name: 'crab',
        icon: ICON_CRAB,
        svg: svgCrab,
        component: CrabIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature:
            'M7 12.4Q4.4 12.2 3.4 10.2L4.6 9.4L2.4 6.8L4.6 7L4.4 5.2L6.2 6.8Q6.8 8.8 7.2 10.6z',
    },
    {
        // lobster.ts: single flatPath — antennae, open claws with notch
        // valleys, carapace ellipse with CCW eye holes, segmented tail fan.
        name: 'lobster',
        icon: ICON_LOBSTER,
        svg: svgLobster,
        component: LobsterIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature:
            'M8.6 9.6Q5 10 3.6 7.8Q4.6 7.4 5.2 6.8L3 4.6L5.8 5.2L5.4 2.8L7.6 4.8Q8.8 7 8.4 9.4z',
    },
    {
        // seahorse.ts: single flatPath — coronet/snout/head/ribbon body +
        // belly-plate holes + two interlocking C-ribbon tail spiral +
        // ONE center-dot circle.
        name: 'seahorse',
        icon: ICON_SEAHORSE,
        svg: svgSeahorse,
        component: SeahorseIcon,
        paths: 1,
        groups: 0,
        circles: 1,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M11.6 17.8A3 3 0 1 1 14.6 20.8L14.6 19.7A1.9 1.9 0 1 0 12.7 17.8z',
    },
    {
        // crocodile.ts: evenodd jaw/back contour (eye + zigzag mouth +
        // tooth line inside it) + flatPath scutes and bent legs.
        name: 'crocodile',
        icon: ICON_CROCODILE,
        svg: svgCrocodile,
        component: CrocodileIcon,
        paths: 2,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 1,
        signature: 'M1.5 10.6L6.1 10.3Q6 8.3 8 8.4L9.2 9.3Q12 8.4 15.2 10Q19 11.8 22.5 11L21.3 13',
    },
    {
        // lizard.ts: single flatPath — spiky back + body-to-curl tail +
        // zigzag legs with toe bars + CCW eye/mouth holes.
        name: 'lizard',
        icon: ICON_LIZARD,
        svg: svgLizard,
        component: LizardIcon,
        paths: 1,
        groups: 0,
        circles: 0,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M2.4 10.6Q3 9.4 4.6 9.2',
    },
    {
        // chameleon.ts: single flatPath — casque head + turret eye ring +
        // coiled tail (outer ribbon + wedge + inner ribbon) + TWO dot
        // circles (pupil re-centered in the ring + spiral center).
        name: 'chameleon',
        icon: ICON_CHAMELEON,
        svg: svgChameleon,
        component: ChameleonIcon,
        paths: 1,
        groups: 0,
        circles: 2,
        ellipses: 0,
        rects: 0,
        evenodd: 0,
        signature: 'M10.6 16A4 4 0 1 1 14.6 20L14.6 18.9A2.9 2.9 0 1 0 11.7 16z',
    },
];
describe('animals per-module contract', () => {
    it('renders every module factory as the documented shell around its own definition, byte-exact', () => {
        for (const animal of ANIMALS) {
            // OUTPUT CONTRACT (../svg-icon.ts): fixed attribute order, then
            // the module's ICON_<NAME> content verbatim.
            expect(animal.svg()).toBe(SHELL_OPEN + animal.icon + SHELL_CLOSE);
            // REGISTRATION: importing the module alone registered its name —
            // the live registry resolves to the identical string.
            expect(svgIcon(animal.name)).toBe(animal.svg());
        }
    });

    it('parses every full render as a standalone SVG document with the exact per-module element census', () => {
        for (const animal of ANIMALS) {
            // XML VALIDITY: a <parsererror> report element means malformed
            // markup (deer/moose/goat carry literal <g> wrappers — still
            // well-formed standalone SVG).
            const doc = new DOMParser().parseFromString(animal.svg(), 'image/svg+xml');
            expect(doc.querySelector('parsererror')).toBeNull();
            expect(doc.documentElement.tagName).toBe('svg');
            expect(doc.documentElement.getAttribute('viewBox')).toBe('0 0 24 24');
            // Exact per-module census (source-derived, see the table).
            expect(doc.getElementsByTagName('path').length).toBe(animal.paths);
            expect(doc.getElementsByTagName('g').length).toBe(animal.groups);
            expect(doc.getElementsByTagName('circle').length).toBe(animal.circles);
            expect(doc.getElementsByTagName('ellipse').length).toBe(animal.ellipses);
            expect(doc.getElementsByTagName('rect').length).toBe(animal.rects);
            // Flat-design presentation contract on EVERY path element.
            for (const path of Array.from(doc.getElementsByTagName('path'))) {
                expect(path.getAttribute('fill')).toBe('currentColor');
                expect(path.getAttribute('stroke')).toBe('none');
            }
        }
    });

    it('carries the exact source-derived silhouette fragment and evenodd census per module', () => {
        for (const animal of ANIMALS) {
            // EVENODD CENSUS (the winding-bug guard): every explicit
            // fill-rule="evenodd" attribute, counted exactly — match()
            // returning null is the exact absence assertion for the zero case.
            expect(animal.icon.match(/fill-rule="evenodd"/g)).toEqual(
                animal.evenodd === 0
                    ? null
                    : new Array(animal.evenodd).fill('fill-rule="evenodd"')
            );
            // Exact silhouette fragment, hand-transcribed from that module's
            // own source (cat.ts … chameleon.ts) — a missing or re-laid body
            // breaks the pin byte-for-byte.
            expect(animal.icon).toContain(animal.signature);
        }
    });

    it('wraps deer/moose/goat in one attribute-free centering <g> with the exact translate offset', () => {
        // These three profiles lean far left unshifted; each module wraps
        // its flatPath in a single <g transform="translate(x 0)">. The <g>
        // carries NO fill/stroke (children inherit flatPath's pair), and
        // the offset pin keeps the 24px centering intent.
        const offsets: Array<[string, string]> = [
            ['deer', 'translate(3.6 0)'],
            ['moose', 'translate(3 0)'],
            ['goat', 'translate(2.75 0)'],
        ];
        expect(offsets.map(([name]) => name)).toEqual(['deer', 'moose', 'goat']);
        for (const [name, transform] of offsets) {
            const animal = ANIMALS.find((entry) => entry.name === name) as AnimalContract;
            // Exact wrapper bytes: group opens with the exact offset, closes
            // immediately after the single flatPath child.
            expect(animal.icon).toBe('<g transform="' + transform + '">' + animal.icon.slice(
                animal.icon.indexOf('>') + 1,
                animal.icon.lastIndexOf('<')
            ) + '</g>');
            const doc = new DOMParser().parseFromString(animal.svg(), 'image/svg+xml');
            const group = doc.getElementsByTagName('g')[0];
            expect(group.getAttribute('transform')).toBe(transform);
            // Inheritance design: no presentation attributes on the group.
            expect(group.getAttribute('fill')).toBeNull();
            expect(group.getAttribute('stroke')).toBeNull();
            // Exactly one path child carrying the flat pair.
            const children = Array.from(group.children);
            expect(children.length).toBe(1);
            expect(children[0].tagName).toBe('path');
            expect(children[0].getAttribute('fill')).toBe('currentColor');
            expect(children[0].getAttribute('stroke')).toBe('none');
        }
    });

    it('carries the exact literal circle/ellipse/rect geometry for the fine-element modules', () => {
        // Per-module literal-element geometry, transcribed from source:
        // solid feature dots/pads/heads with exact centers and radii (all
        // attribute values are the SVG strings the parser reports back).
        const circleGeometry: Array<[string, Array<[string, string, string]>]> = [
            // fish.ts: three bubbles rising to the upper left.
            ['fish', [['3.4', '8.4', '0.55'], ['4.9', '6.7', '0.42'], ['6.7', '5.4', '0.32']]],
            // owl.ts: two pupil dots re-centered in the eye-ring holes.
            ['owl', [['9.3', '10.9', '1.05'], ['14.7', '10.9', '1.05']]],
            // snail.ts: two antenna-tip dots.
            ['snail', [['5.4', '4.3', '0.8'], ['10.3', '4.2', '0.8']]],
            // butterfly.ts: head + two antenna dots.
            ['butterfly', [['12', '6.2', '1.25'], ['10.3', '2.4', '0.65'], ['14.5', '2.6', '0.65']]],
            // peacock.ts: three crest dots at the stem tips.
            ['peacock', [['10.55', '6.6', '0.55'], ['12', '6', '0.55'], ['13.45', '6.6', '0.55']]],
            // squid.ts: two tentacle paddle dots.
            ['squid', [['11.5', '21', '0.9'], ['13.7', '21', '0.9']]],
            // seahorse.ts: spiral center dot.
            ['seahorse', [['14.6', '17.8', '0.6']]],
            // chameleon.ts: pupil in the turret ring + spiral center dot.
            ['chameleon', [['5.6', '8', '0.55'], ['14.6', '16', '0.55']]],
        ];
        const ellipseGeometry: Array<[string, Array<[string, string, string, string]>]> = [
            // paw.ts: four rotated teardrop toe pads.
            [
                'paw',
                [
                    ['9.9', '7.7', '2', '2.55'],
                    ['14.1', '7.7', '2', '2.55'],
                    ['5', '10.9', '1.9', '2.4'],
                    ['19', '10.9', '1.9', '2.4'],
                ],
            ],
        ];
        expect(circleGeometry.map(([name]) => name)).toEqual([
            'fish', 'owl', 'snail', 'butterfly', 'peacock', 'squid', 'seahorse', 'chameleon',
        ]);
        // butterfly's wings are now FOUR rotated evenodd PATHS (wing + spot
        // hole per d; see the structural same-paint test below) — paw.ts is
        // the only module left with literal <ellipse> elements.
        expect(ellipseGeometry.map(([name]) => name)).toEqual(['paw']);
        for (const [name, expected] of circleGeometry) {
            const doc = new DOMParser().parseFromString(svgIcon(name), 'image/svg+xml');
            const circles = Array.from(doc.getElementsByTagName('circle'));
            expect(circles.length).toBe(expected.length);
            expect(
                circles.map((circle) => [
                    circle.getAttribute('cx'),
                    circle.getAttribute('cy'),
                    circle.getAttribute('r'),
                ])
            ).toEqual(expected);
            // Solid flat pair on every literal circle (never inherited).
            for (const circle of circles) {
                expect(circle.getAttribute('fill')).toBe('currentColor');
                expect(circle.getAttribute('stroke')).toBe('none');
            }
        }
        for (const [name, expected] of ellipseGeometry) {
            const doc = new DOMParser().parseFromString(svgIcon(name), 'image/svg+xml');
            const ellipses = Array.from(doc.getElementsByTagName('ellipse'));
            expect(ellipses.length).toBe(expected.length);
            expect(
                ellipses.map((ellipse) => [
                    ellipse.getAttribute('cx'),
                    ellipse.getAttribute('cy'),
                    ellipse.getAttribute('rx'),
                    ellipse.getAttribute('ry'),
                ])
            ).toEqual(expected);
            for (const ellipse of ellipses) {
                expect(ellipse.getAttribute('fill')).toBe('currentColor');
                expect(ellipse.getAttribute('stroke')).toBe('none');
            }
        }
        // butterfly.ts is the ONLY animal with a literal <rect>: the body
        // bar behind the wings.
        const butterflyDoc = new DOMParser().parseFromString(svgIcon('butterfly'), 'image/svg+xml');
        const rects = Array.from(butterflyDoc.getElementsByTagName('rect'));
        expect(rects.length).toBe(1);
        expect(rects[0].getAttribute('x')).toBe('11.25');
        expect(rects[0].getAttribute('y')).toBe('7.4');
        expect(rects[0].getAttribute('width')).toBe('1.5');
        expect(rects[0].getAttribute('height')).toBe('11.6');
        expect(rects[0].getAttribute('rx')).toBe('0.75');
    });

    it('cuts every hole inside its own silhouette path and keeps independent silhouettes as separate paints', () => {
        // STRUCTURAL SAME-PAINT REGRESSION: jsdom cannot geometrically
        // hit-test fills (no renderer is faked here), so the regression
        // guard is structural — parse each fixed module and pin the EXACT
        // per-path [d, fill-rule] (butterfly: + transform) arrays
        // transcribed from that module's source. A hole drifting out of
        // its containing silhouette's path (the old butterfly/bear/
        // turtle/snake defect) or two independent silhouettes collapsing
        // into one path (rabbit ear↔face, snail shell↔body) breaks the
        // exact array. Chrome independently verified the corresponding
        // pixels: transparent at turtle eye (21.8 13.3), butterfly spot
        // (7.4 9.2), bear ear (5.6 5.5); solid at rabbit ear (8 11.5) and
        // snail base (15.1 17.2).
        const pathsOf = (name: string): Element[] =>
            Array.from(
                new DOMParser().parseFromString(svgIcon(name), 'image/svg+xml').getElementsByTagName('path')
            );

        // butterfly.ts — four wing paints, each wing subpath + its r 1.1
        // spot hole in ONE evenodd d (spot centers concentric with the
        // rotation origin), then the solid antennae flatPath (no
        // transform, no fill-rule).
        expect(
            pathsOf('butterfly').map((path) => [
                path.getAttribute('d'),
                path.getAttribute('transform'),
                path.getAttribute('fill-rule'),
            ])
        ).toEqual([
            ['M3.5 9.2a3.9 4.7 0 1 1 7.8 0a3.9 4.7 0 1 1 -7.8 0zM6.3 9.2a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z', 'rotate(-24 7.4 9.2)', 'evenodd'],
            ['M12.7 9.2a3.9 4.7 0 1 1 7.8 0a3.9 4.7 0 1 1 -7.8 0zM15.5 9.2a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z', 'rotate(24 16.6 9.2)', 'evenodd'],
            ['M5.7 15.8a2.9 3.3 0 1 1 5.8 0a2.9 3.3 0 1 1 -5.8 0zM7.5 15.8a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z', 'rotate(24 8.6 15.8)', 'evenodd'],
            ['M12.5 15.8a2.9 3.3 0 1 1 5.8 0a2.9 3.3 0 1 1 -5.8 0zM14.3 15.8a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z', 'rotate(-24 15.4 15.8)', 'evenodd'],
            ['M11.3 5.6L9.9 2.6 10.7 2.3 12 5.5zM12.7 5.5L14.1 2.5 14.9 2.8 13.3 5.6z', null, null],
        ]);

        // turtle.ts — shell dome (spot holes + rim band) / solid legs+tail
        // flatPath / head whose r 0.5 eye hole rides the SAME head path
        // (eye center (21.8 13.3) — Chrome verified transparent).
        expect(
            pathsOf('turtle').map((path) => [path.getAttribute('d'), path.getAttribute('fill-rule')])
        ).toEqual([
            ['M2.8 15.4a8.7 7.4 0 0 1 17.4 0zM5.4 13a1 1 0 1 0 2 0a1 1 0 1 0 -2 0zM9.4 11.6a1 1 0 1 0 2 0a1 1 0 1 0 -2 0zM13.4 13a1 1 0 1 0 2 0a1 1 0 1 0 -2 0zM4.2 13.9v0.75h15.2v-0.75z', 'evenodd'],
            ['M5.2 15.4h2.6v3.1a1.3 1.3 0 0 1 -2.6 0zM14.2 15.4h2.6v3.1a1.3 1.3 0 0 1 -2.6 0zM3.4 15.4L1.4 16.6 3.4 17.4z', null],
            ['M18.7 13.6a2.3 2.3 0 1 1 4.6 0a2.3 2.3 0 1 1 -4.6 0zM21.3 13.3a.5 .5 0 1 1 1 0a.5 .5 0 1 1 -1 0z', 'evenodd'],
        ]);

        // bear.ts — face (eye/muzzle/nose/mouth holes inside the head
        // circle) / ear pair whose r 0.8 openings at (5.9 5.8)/(18.1 5.8)
        // ride the SAME ear path (Chrome verified transparent at 5.6 5.5).
        expect(
            pathsOf('bear').map((path) => [path.getAttribute('d'), path.getAttribute('fill-rule')])
        ).toEqual([
            ['M4.4 13.2a7.6 7.6 0 1 1 15.2 0a7.6 7.6 0 1 1 -15.2 0zM8.1 11.6a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0zM14 11.6a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0zM8.7 16.9a3.3 2.5 0 1 0 6.6 0a3.3 2.5 0 1 0 -6.6 0zM10.5 15.5a1.5 1.1 0 1 0 3 0a1.5 1.1 0 1 0 -3 0zM11.7 17.2v2h0.6v-2z', 'evenodd'],
            ['M4.2 7a2.7 2.7 0 1 1 5.4 0a2.7 2.7 0 1 1 -5.4 0zM5.1 5.8a.8 .8 0 1 1 1.6 0a.8 .8 0 1 1 -1.6 0zM14.4 7a2.7 2.7 0 1 1 5.4 0a2.7 2.7 0 1 1 -5.4 0zM17.3 5.8a.8 .8 0 1 1 1.6 0a.8 .8 0 1 1 -1.6 0z', 'evenodd'],
        ]);

        // rabbit.ts — ear bands and face are SEPARATE evenodd paints (the
        // bases union across elements instead of XOR-seaming; Chrome
        // verified solid at (8 11.5) inside the left ear band below the
        // inner slot) + solid whisker bars.
        expect(
            pathsOf('rabbit').map((path) => [path.getAttribute('d'), path.getAttribute('fill-rule')])
        ).toEqual([
            ['M5.8 3.2Q5.8 1.4 7.8 1.4Q9.8 1.4 9.8 3.2L9.8 12L5.8 12zM6.9 3v6.6h1.8V3zM14.2 3.2Q14.2 1.4 16.2 1.4Q18.2 1.4 18.2 3.2L18.2 12L14.2 12zM15.3 3v6.6h1.8V3z', 'evenodd'],
            ['M6.1 15.4a5.9 5.9 0 1 1 11.8 0a5.9 5.9 0 1 1 -11.8 0zM7.9 14.6a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0zM13.8 14.6a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0zM11.1 16.6h1.8l-0.9 1.4zM11.7 18.4v0.9h0.6v-0.9zM10.55 19.9A0.55 0.55 0 0 1 11.65 19.9A0.55 0.55 0 0 1 12.75 19.9z', 'evenodd'],
            ['M3.2 14.4h2.8v0.55h-2.8zM3.2 16.1h2.8v0.55h-2.8zM18 14.4h2.8v0.55h-2.8zM18 16.1h2.8v0.55h-2.8z', null],
        ]);

        // snail.ts — shell (alternating ring depths) and body/head stalk
        // (antennae + eye hole) stay SEPARATE evenodd paints (Chrome
        // verified solid at (15.1 17.2) on the outer shell ring above the
        // body top edge); the two solid antenna-tip <circle>s are pinned
        // by the literal circle geometry test above.
        expect(
            pathsOf('snail').map((path) => [path.getAttribute('d'), path.getAttribute('fill-rule')])
        ).toEqual([
            ['M9.8 12.4a5.3 5.3 0 1 1 10.6 0a5.3 5.3 0 1 1 -10.6 0zM11.45 12.4a3.65 3.65 0 1 0 7.3 0a3.65 3.65 0 1 0 -7.3 0zM12.25 12.4a2.85 2.85 0 1 1 5.7 0a2.85 2.85 0 1 1 -5.7 0zM13.75 12.4a1.35 1.35 0 1 0 2.7 0a1.35 1.35 0 1 0 -2.7 0z', 'evenodd'],
            ['M2.2 19.6L2.2 18.2Q2.2 16 5 15.9L6 15.9L6 10.8Q6 8.4 8 8.4Q10 8.4 10 10.8L10 16.6L18.6 16.6Q20.4 16.6 20.4 18.2L20.4 19.6zM6.6 8.8L5.1 4.6 5.9 4.3 7.3 8.7zM8.7 8.8L9.7 4.2 10.5 4.4 9.5 8.8zM7.05 10.4a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z', 'evenodd'],
        ]);

        // snake.ts — ribbon whose THREE spot holes ride the SAME ribbon d /
        // head with the eye hole inside it (the head unions the ribbon
        // ACROSS elements) / solid forked tongue.
        expect(
            pathsOf('snake').map((path) => [path.getAttribute('d'), path.getAttribute('fill-rule')])
        ).toEqual([
            ['M1.6 10.8C4.4 7.2 7.6 7.2 10.2 10.4C12.8 13.6 16 13.6 18.8 10.8L18.8 14.4C16 17.2 12.8 17.2 10.2 14C7.6 10.8 4.4 10.8 1.6 14.4zM3.8 12.2a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0zM8.2 10.7a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0zM13.6 14.9a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z', 'evenodd'],
            ['M16.8 9.9Q21 9 22.2 11Q22.6 12 21.9 13.2Q20.3 15.3 16.8 14.4zM19.4 11.3a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z', 'evenodd'],
            ['M22.2 11.8L23.5 10.6 23.7 10.9 22.5 12.1zM22.3 12.2L23.7 13.3 23.5 13.6 22.2 12.5z', null],
        ]);
    });

    it('exposes all 60 animals contiguously through builtins, the root barrel and the gallery subset', () => {
        // BUILTINS ORDER: 23 generic + 30 fantasy + 24 flags = 77 keys
        // precede the animals block (the FANTASY-REDRAW pass grew the
        // fantasy block 10 → 30 and REGISTRY-EXPANSION grew flags 8 → 24,
        // shifting the animals window); the 60 animals sit at indices
        // 77..137 in the animals/index.ts order, followed by the 19 fruits.
        const keys = Object.keys(svgIcons);
        expect(keys.length).toBe(77 + 60 + 19 + 18 + 3 + 7 + 23);
        const animalKeys = keys.slice(77, 77 + 60);
        expect(animalKeys).toEqual(ANIMALS.map((animal) => animal.name));
        expect(keys[77 + 60]).toBe('apple'); // the fruits block starts next
        // Each builtins factory IS the module's own factory (same registry
        // name resolves to the identical string).
        for (const animal of ANIMALS) {
            expect(svgIcons[animal.name]()).toBe(animal.svg());
        }
        // ROOT BARREL: every module's svg factory, ICON constant and
        // component re-export through ../index under the computed export
        // names (svg<Name> / ICON_<NAME> / <Name>Icon) — same binding identity.
        const pascal = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1);
        for (const animal of ANIMALS) {
            const svgExport = rootBarrel['svg' + pascal(animal.name)] as SvgIconFactory;
            const iconExport = rootBarrel['ICON_' + animal.name.toUpperCase()] as string;
            const componentExport = rootBarrel[pascal(animal.name) + 'Icon'];
            expect(svgExport).toBe(animal.svg);
            expect(iconExport).toBe(animal.icon);
            expect(typeof componentExport).toBe('function');
        }
        // GALLERY (ui/main.ts bootstrap): its explicit Animals subset row
        // lists all 60 names in the same order (read as source text — the
        // bootstrap itself is DOM-app code, not importable under jsdom).
        const uiSource = readFileSync(resolve(__dirname, '../../../ui/main.ts'), 'utf8');
        expect(uiSource).toContain(
            animalKeys.map((key) => `'${key}'`).join(', ')
        );
    });

    describe('string/React parity — every <Name>Icon through the exact IconBase shell', () => {
        afterEach(cleanup);

        it('renders the shared flat shell defaults carrying the module definition exactly', () => {
            for (const animal of ANIMALS) {
                const { container } = render(React.createElement(animal.component));
                const el = container.querySelector(
                    `svg[data-icon="${animal.name}"]`
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
                // jsdom machinery — identical geometry bytes in both layers.
                expect(el.innerHTML).toBe(serialized(animal.icon));
            }
        });
    });
});
