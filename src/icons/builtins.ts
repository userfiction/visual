/**
 * builtins — every built-in icon factory keyed by its shared registry name.
 *
 * This is the dynamic-discovery entry point: enumerating `svgIcons` gives
 * every built-in name AND its bound factory in one structure (the ui/
 * gallery renders from it, and tests iterate it). The generic and fantasy
 * sub-barrels are imported HERE — which is what performs every module's
 * registration side effect — so importing this map (or any barrel that
 * re-exports it) registers ALL built-ins into the shared registry.
 *
 * Registration visibility trade-off (see also ../svg-icon.ts): names are
 * only resolvable via svgIcon(name)/VisualIcon(name) once their module has
 * loaded — the tree-shakable path is a direct per-icon import
 * (e.g. `import { svgSword } from '@userfiction/visual'` pulls only
 * fantasy/sword.ts + the machinery); this map is the load-everything path.
 *
 * ORDER: generic set first (UI/utility glyphs), then the fantasy set —
 * Object.keys(svgIcons) is asserted in tests, so appending is the only
 * safe evolution (insertions change key order and break that contract).
 */
import { svgCheck, svgClose, svgPlus, svgMinus, svgMenu, svgChevronDown, svgChevronUp, svgChevronLeft, svgChevronRight, svgArrowRight, svgPlay, svgPause, svgStop, svgHeart, svgStar, svgBook, svgBookmark, svgUser, svgHome, svgPin, svgTrash, svgSearch, svgDownload } from './generic';
import {
    svgSword,
    svgAxe,
    svgWand,
    svgShield,
    svgPotion,
    svgScroll,
    svgSpellbook,
    svgCrown,
    svgGem,
    svgKey,
} from './fantasy';
import type { SvgIconFactory } from './svg-icon';

export const svgIcons: { [name: string]: SvgIconFactory } = {    // ── generic ─────────────────────────────────────────────────────────────
    check: svgCheck,
    close: svgClose,
    plus: svgPlus,
    minus: svgMinus,
    menu: svgMenu,
    chevronDown: svgChevronDown,
    chevronUp: svgChevronUp,
    chevronLeft: svgChevronLeft,
    chevronRight: svgChevronRight,
    arrowRight: svgArrowRight,
    play: svgPlay,
    pause: svgPause,
    stop: svgStop,
    heart: svgHeart,
    star: svgStar,
    book: svgBook,
    bookmark: svgBookmark,
    user: svgUser,
    home: svgHome,
    pin: svgPin,
    trash: svgTrash,
    search: svgSearch,
    download: svgDownload,
    // ── fantasy ─────────────────────────────────────────────────────────────
    sword: svgSword,
    axe: svgAxe,
    wand: svgWand,
    shield: svgShield,
    potion: svgPotion,
    scroll: svgScroll,
    spellbook: svgSpellbook,
    crown: svgCrown,
    gem: svgGem,
    key: svgKey,
};
