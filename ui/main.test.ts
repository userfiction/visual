// ============================================================================
// ui/main.test.ts — deterministic jsdom tests for the vanilla gallery UI
// (./main.ts bootstrap) — task GALLERY-TEST (owned test file)
// ============================================================================
// main.ts is a MODULE-LEVEL SIDE-EFFECT bootstrap: it captures the three
// mounts (#gallery-mount / #toolbar-mount / #toast — provided by
// ui/index.html lines 55/59/68), renders toolbar + gallery ONCE at import and
// keeps every state in module-level singletons (currentSubset='All',
// currentSize=32 — main.ts lines 85–86). Every test therefore bootstraps a
// FRESH shell: rebuild the three mounts exactly as index.html does, clear
// localStorage (readStoredMode/readStoredColor run at import, main.ts
// lines 128–136/181–190), then vi.resetModules() + a dynamic import('./main')
// so each test starts from the pristine boot state — no cross-test state leak
// and no fake timers leaking between tests (restored before AND after every
// test, plus inside each copy test's finally).
//
// CONTRACTS PINNED (all derived from source, never from observed runtime):
//   1. BOOT MOUNTS: importing ./main without the three mounts rejects with
//      the exact hardcoded error (main.ts lines 31–36) and renders nothing.
//   2. TOOLBAR SHAPE: exactly 16 seg-buttons in DOM order — set filter All +
//      SUBSET_NAMES order (main.ts lines 49–69: Generic, Fantasy, Flags,
//      Animals, Fruits, Nature, Landscape, Sky), then SIZES '16px'…'48px'
//      (line 84), then theme 'Auto'/'Light'/'Dark' (line 124).
//   3. 'All' GALLERY: count label '207 icons' (main.ts lines 347–352) and the
//      EXACT 207-name card order = builtins.ts map order = generic 23 +
//      fantasy 30 + flags 24 + animals 60 + fruits 19 + nature 49 (trees 18 +
//      landscape 3 + sky 30). Flags = the 8 originals + the 16
//      FLAGS-PRODUCTION uplift additions triangularFlag … ceremonialBanner
//      (builtins.ts lines 233–258, flags/index.ts lines 26–41, ui/main.ts
//      line 59). Sky = the 7 originals + the 23 SKY-PRODUCTION weather +
//      celestial additions sunset … aurora (builtins.ts lines 366–396,
//      nature/index.ts lines 53–75, ui/main.ts line 68).
//   4. SUBSET FILTERS: Fantasy 30 / Flags 24 / Sky 30 / Animals 60 — each
//      shows its 'N icons' count + the exact names in builtins order +
//      `Copy <name> icon HTML` aria labels, and the segment active /
//      aria-pressed states flip exactly both ways (the filter click re-runs
//      renderGallery + renderToolbar — main.ts lines 247–251); switching
//      back to All re-pins the full 207 gallery.
//   5. RENDERED SVGs: every card of every pinned view (the unfiltered All
//      parity sweep + Fantasy/Flags/Sky/Animals) holds EXACTLY the known
//      factory's output — svgIcons[name]({ size }) compared byte-for-byte
//      through an IDENTICAL jsdom innerHTML set→get round-trip (same input
//      string → same parse+serialize, so equality is exact by construction),
//      plus explicit per-card pins: xmlns attribute + namespaceURI, viewBox
//      '0 0 24 24' (svg-icon.ts DEFAULT_VIEW_BOX, line 81), width/height
//      `${size}px` (resolveSize: number → px, line 179), fill 'currentColor'.
//      Chameleon / ceremonialBanner / aurora are ADDITIONALLY pinned against
//      independently composed strings (svg-icon shell + the exported ICON_*
//      definition constant — same composition pattern as the ICON_LIGHTNING
//      pin in ../src/icons/icons.test.ts).
//   6. SIZE SWITCHING: 16/24/32/48 re-render all Animals (60), Flags (24)
//      and Sky (30) cards at the exact new px size (full factory equality
//      per card per size) while the name membership, the count label and the
//      exactly-one-active size segment stay intact.
//   7. COPY: clicking a card calls navigator.clipboard.writeText EXACTLY
//      once with the DEFAULT-size standalone markup (factory() with no
//      options → width/height '1em', main.ts line 390; svg-icon.ts OUTPUT
//      CONTRACT lines 186–196/211–218: xmlns → viewBox → width → height →
//      fill, content verbatim) and shows the toast 'Copied <name> HTML'
//      (line 391) for EXACTLY 1600ms (window.setTimeout, line 114) —
//      asserted at the 1599/1600ms boundary under fake timers restored in
//      the same test. Pinned for chameleon (Animals), ceremonialBanner
//      (Flags — the last flag) and aurora (Sky — the last sky icon).
//   8. GALLERY NAMES ARE MAP KEYS: card names, aria labels and copy toast
//      texts come from the builtins.ts map keys — camelCase ('fullMoon',
//      'moonCloud', 'moonStars', …). They NEVER come from the per-icon
//      files' INTERNAL registry keys: a factory's rendered output contains
//      no name at all (svg-icon.ts emits only xmlns/viewBox/width/height/
//      fill + content), so even a wrong internal registration key cannot
//      change the gallery contract — these tests pin the camelCase map keys
//      regardless of any internal per-icon key drift.
// ============================================================================

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Definition constants for the independent-composition copy pins: the copy
// tests compose the exact default-size standalone markup from the definition
// constant + the svg-icon shell — byte-exact by construction (no hand-copied
// probe string).
import { ICON_CHAMELEON } from '../src/icons/animals/chameleon';
import { ICON_CEREMONIAL_BANNER } from '../src/icons/flags/ceremonial-banner';
import { ICON_AURORA } from '../src/icons/nature/aurora';

// ── static expected lists (transcribed from source — see header) ────────────

// The Animals subset, ui/main.ts line 62 / builtins.ts lines 260–321 — the 20
// reworked originals plus the 40 species added by the gallery expansion, in
// builtins.ts map order (= the order the gallery renders them in).
const ANIMALS: string[] = [
    // original ten (animals/index.ts lines 11–20)
    'cat', 'dog', 'bird', 'fish', 'rabbit', 'bear', 'dragon', 'snake', 'turtle', 'paw',
    // horse … duck (animals/index.ts lines 21–30)
    'horse', 'lion', 'owl', 'fox', 'whale', 'frog', 'snail', 'penguin', 'butterfly', 'duck',
    // expanded wildlife 1/4 (animals/index.ts lines 34–43)
    'elephant', 'giraffe', 'zebra', 'rhinoceros', 'hippopotamus', 'monkey', 'gorilla', 'panda', 'koala', 'kangaroo',
    // expanded wildlife 2/4 (animals/index.ts lines 44–53)
    'deer', 'moose', 'wolf', 'tiger', 'cow', 'pig', 'sheep', 'goat', 'camel', 'donkey',
    // expanded wildlife 3/4 (animals/index.ts lines 54–63)
    'bat', 'eagle', 'parrot', 'flamingo', 'swan', 'chicken', 'rooster', 'peacock', 'ostrich', 'shark',
    // expanded wildlife 4/4 (animals/index.ts lines 64–73)
    'dolphin', 'octopus', 'squid', 'jellyfish', 'crab', 'lobster', 'seahorse', 'crocodile', 'lizard', 'chameleon',
];

// The remaining subsets, in builtins.ts map order (generic 23: lines 177–199,
// fantasy 30: 201–231, flags 24: 233–258, fruits 19: 323–341, nature trees 18:
// 343–360, landscape 3: 362–364, sky 30: 366–396).
const GENERIC: string[] = [
    'check', 'close', 'plus', 'minus', 'menu', 'chevronDown', 'chevronUp', 'chevronLeft', 'chevronRight',
    'arrowRight', 'play', 'pause', 'stop', 'heart', 'star', 'book', 'bookmark', 'user', 'home', 'pin', 'trash',
    'search', 'download',
];
// Fantasy = the post-FANTASY-REDRAW 30-icon set, in builtins.ts map order
// (= ui/main.ts's Fantasy row, line 56): the redrawn original ten first,
// then the 20 equipment/consumable/loot additions appended after 'key'.
const FANTASY: string[] = [
    // original ten (fantasy/index.ts lines 9–18)
    'sword', 'axe', 'wand', 'shield', 'potion', 'scroll', 'spellbook', 'crown', 'gem', 'key',
    // equipment/consumable/loot additions (fantasy/index.ts lines 22–41)
    'mace', 'vial', 'dagger', 'bow', 'arrow', 'staff', 'spear', 'warhammer', 'helmet', 'armor',
    'gauntlet', 'boots', 'ring', 'amulet', 'torch', 'backpack', 'chest', 'coins', 'dice', 'skull',
];
// Flags = the post-FLAGS-PRODUCTION 24-icon set, in builtins.ts map order
// (= ui/main.ts's Flags row, line 59): the original eight first, then the 16
// uplift silhouettes/heraldry additions appended after 'bunting'.
const FLAGS: string[] = [
    // original eight (flags/index.ts lines 16–23)
    'flag', 'pennant', 'banner', 'wavingFlag', 'checkeredFlag', 'nordicFlag', 'swallowtailFlag', 'bunting',
    // FLAGS-PRODUCTION uplift batch (flags/index.ts lines 26–41)
    'triangularFlag', 'doublePennant', 'forkedFlag', 'roundedFlag', 'tatteredFlag', 'crossedFlags',
    'flagGarland', 'windsock', 'flagOnHill', 'victoryFlag', 'stripedFlag', 'crossFlag', 'saltireFlag',
    'diamondFlag', 'signalFlag', 'ceremonialBanner',
];
const FRUITS: string[] = [
    'apple', 'banana', 'cherry', 'grape', 'orange', 'lemon', 'watermelon', 'pear', 'strawberry', 'peach',
    'pineapple', 'kiwi', 'mango', 'avocado', 'blueberry', 'coconut', 'pomegranate', 'plum', 'melon',
];
const TREES: string[] = [
    'oak', 'pine', 'palm', 'birch', 'maple', 'fir', 'cypress', 'willow', 'appleTree', 'cherryTree', 'redwood',
    'spruce', 'bush', 'cactus', 'fern', 'flower', 'tulip', 'sunflower',
];
const LANDSCAPE: string[] = ['mountain', 'hills', 'river'];
// Sky = the post-SKY-PRODUCTION 30-icon set, in builtins.ts map order
// (= ui/main.ts's Sky row, line 68): the original seven first, then the 14
// weather additions (sunset … umbrella), then the 9 celestial additions
// (crescentMoon … aurora).
const SKY: string[] = [
    // original seven (nature/index.ts lines 38–44)
    'sun', 'moon', 'cloud', 'stars', 'sunrise', 'rainbow', 'lightning',
    // SKY-PRODUCTION weather block (nature/index.ts lines 53–66)
    'sunset', 'sunCloud', 'moonCloud', 'cloudRain', 'cloudDrizzle', 'cloudSnow', 'cloudLightning', 'cloudWind',
    'fog', 'wind', 'tornado', 'snowflake', 'raindrop', 'umbrella',
    // SKY-PRODUCTION celestial block (nature/index.ts lines 67–75)
    'crescentMoon', 'fullMoon', 'halfMoon', 'moonStars', 'shootingStar', 'constellation', 'comet', 'eclipse', 'aurora',
];

// 'All' = the unfiltered builtins.ts map order; 207 = 23+30+24+60+19+18+3+30.
const ALL_NAMES: string[] = [
    ...GENERIC, ...FANTASY, ...FLAGS, ...ANIMALS, ...FRUITS, ...TREES, ...LANDSCAPE, ...SKY,
];
const ALL_COUNT = 207;

// ── exact SVG shell composition (svg-icon.ts OUTPUT CONTRACT) ────────────────

// svg-icon.ts lines 186–196 + 211–218: fixed attribute order xmlns → viewBox
// → width → height → fill, then the definition content verbatim, closed by
// </svg>. viewBox is DEFAULT_VIEW_BOX ('0 0 24 24', svg-icon.ts line 81) for
// every built-in; resolveSize maps number sizes to '<n>px' (line 179) and the
// no-options default to '1em' (line 153).
const svgShell = (size: string): string =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor">`;

// chameleon (animals/chameleon.ts): definition const + shell — pinned at the
// DEFAULT copy size ('1em'), the initial gallery size (32px, main.ts line 85)
// and the last size-test size (48px).
const CHAMELEON_DEFAULT_SVG = `${svgShell('1em')}${ICON_CHAMELEON}</svg>`;
const CHAMELEON_32PX_SVG = `${svgShell('32px')}${ICON_CHAMELEON}</svg>`;
const CHAMELEON_48PX_SVG = `${svgShell('48px')}${ICON_CHAMELEON}</svg>`;

// ceremonialBanner (flags/ceremonial-banner.ts): the LAST Flags icon —
// definition const + shell at the same three pinned sizes as chameleon.
const CEREMONIAL_BANNER_DEFAULT_SVG = `${svgShell('1em')}${ICON_CEREMONIAL_BANNER}</svg>`;
const CEREMONIAL_BANNER_32PX_SVG = `${svgShell('32px')}${ICON_CEREMONIAL_BANNER}</svg>`;
const CEREMONIAL_BANNER_48PX_SVG = `${svgShell('48px')}${ICON_CEREMONIAL_BANNER}</svg>`;

// aurora (nature/aurora.ts): the LAST Sky icon — definition const + shell at
// the same three pinned sizes as chameleon.
const AURORA_DEFAULT_SVG = `${svgShell('1em')}${ICON_AURORA}</svg>`;
const AURORA_32PX_SVG = `${svgShell('32px')}${ICON_AURORA}</svg>`;
const AURORA_48PX_SVG = `${svgShell('48px')}${ICON_AURORA}</svg>`;

// ── window.matchMedia shim ───────────────────────────────────────────────────
// The installed jsdom build exposes no window.matchMedia, but main.ts reads it
// at import (line 126: the prefers-color-scheme query) and registers a change
// listener (line 148). The shim returns a FRESH MediaQueryList-like object per
// call (matches=false → light, the jsdom-consistent default) with a working
// addEventListener — fresh-per-call also gives every module cycle its own
// query object, so cycle N's change listener can never accumulate onto an
// earlier cycle's (never-fired) listener list.
const installMatchMediaShim = (): void => {
    window.matchMedia = ((query: string) => {
        const listeners: Array<() => void> = [];
        return {
            media: query,
            matches: false,
            addEventListener: (type: string, listener: () => void): void => {
                if (type === 'change') listeners.push(listener);
            },
            removeEventListener: (type: string, listener: () => void): void => {
                const index = listeners.indexOf(listener);
                if (index !== -1) listeners.splice(index, 1);
            },
        };
    }) as unknown as typeof window.matchMedia;
};

// ── fresh-shell bootstrap (see header) ───────────────────────────────────────

const bootMain = async (): Promise<{
    svgIcons: { [name: string]: (options?: { size?: string | number }) => string };
}> => {
    // Wipe the previous test's DOM, then rebuild the three mounts EXACTLY as
    // ui/index.html provides them (lines 55, 59, 68 — ids + classes/attrs)
    document.body.innerHTML = '';
    // The module reads persisted theme/color ONCE at import — clear storage
    // so every boot starts pristine regardless of what an earlier test wrote.
    localStorage.clear();
    const galleryMount = document.createElement('main');
    galleryMount.id = 'gallery-mount';
    galleryMount.className = 'gallery';
    galleryMount.setAttribute('aria-label', 'Icon gallery');
    const toolbarMount = document.createElement('div');
    toolbarMount.id = 'toolbar-mount';
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(galleryMount, toolbarMount, toast);
    // Fresh module registry → fresh module-level state (currentSubset 'All',
    // currentSize 32) and a re-run of the boot renders (lines 409–410).
    vi.resetModules();
    await import('./main');
    // Same-cycle read-back: builtins was already evaluated inside main's own
    // import graph for THIS cycle, so this handle IS the map the UI renders
    // from — the "known factories" every rendered SVG is compared against.
    const icons = (await import('../src/icons/builtins')) as {
        svgIcons: { [name: string]: (options?: { size?: string | number }) => string };
    };
    return { svgIcons: icons.svgIcons };
};

// ── DOM query helpers (main.ts's rendered structure) ─────────────────────────

const cards = (): HTMLButtonElement[] =>
    Array.from(document.querySelectorAll<HTMLButtonElement>('#gallery-mount button.card'));

const cardNames = (): string[] =>
    cards().map((card) => card.querySelector('.name')!.textContent as string);

const cardAriaLabels = (): Array<string | null> =>
    cards().map((card) => card.getAttribute('aria-label'));

const countText = (): string =>
    document.querySelector('#toolbar-mount .count')!.textContent as string;

// Toolbar segment lookup by exact label text (seg-buttons cover the set
// filter, the size control and the theme control — main.ts makeSegment, line
// 222; color swatches are .swatch buttons and the wheel is an input).
const segment = (label: string): HTMLButtonElement => {
    const found = Array.from(
        document.querySelectorAll<HTMLButtonElement>('#toolbar-mount button.seg-button')
    ).find((button) => button.textContent === label);
    if (!found) throw new Error(`toolbar has no seg-button labeled "${label}"`);
    return found;
};

const clickSegment = (label: string): void => {
    segment(label).click();
};

// jsdom round-trips innerHTML through parse5 (self-closing SVG elements come
// back as paired end tags). Both sides of every innerHTML comparison below
// run the SAME set→get on IDENTICAL input (the exact factory string), so the
// comparison is byte-exact by construction — no serialization guesswork.
const domHtml = (markup: string): string => {
    const probe = document.createElement('span');
    probe.innerHTML = markup;
    return probe.innerHTML;
};

// Full exactness pin for ONE rendered card: the .well holds ONLY the icon's
// <svg>, namespace-correct, with the exact shell attributes (viewBox/size/
// fill pinned individually per the render contract), and its innerHTML equals
// the known factory's output for the current size byte-for-byte.
const expectCardSvg = (
    card: HTMLButtonElement,
    factory: (options?: { size?: string | number }) => string,
    size: number
): void => {
    const well = card.querySelector('.well') as HTMLElement;
    expect(well.children.length).toBe(1);
    const svg = well.firstElementChild as Element;
    expect(svg.namespaceURI).toBe('http://www.w3.org/2000/svg');
    expect(svg.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svg.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(svg.getAttribute('width')).toBe(`${size}px`);
    expect(svg.getAttribute('height')).toBe(`${size}px`);
    expect(svg.getAttribute('fill')).toBe('currentColor');
    expect(well.innerHTML).toBe(domHtml(factory({ size })));
};

// Copy+toast pin for ONE card (the chameleon test template, parameterized):
// bootMain() must have run BEFORE this helper; it installs the clipboard
// stub, switches to fake timers, clicks the requested filter (no-op for the
// already-active 'All') + the requested card, then asserts — all exact:
//   • navigator.clipboard.writeText called EXACTLY once with expectedMarkup
//     (the DEFAULT-size '1em' standalone markup — main.ts line 390)
//   • toast text toastText + class 'toast visible' (main.ts lines 110–111)
//   • still visible at 1599ms, class cleared at exactly 1600ms, text kept
// Fake timers + the clipboard stub are restored in the same finally.
const expectCardCopyAndToast = async (
    filter: string,
    ariaLabel: string,
    expectedMarkup: string,
    toastText: string
): Promise<void> => {
    // jsdom ships no navigator.clipboard — install a stub capture BEFORE the
    // click (main.ts copyText prefers navigator.clipboard, lines 93–95)
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
    const originalClipboard = Object.getOwnPropertyDescriptor(window.navigator, 'clipboard');
    Object.defineProperty(window.navigator, 'clipboard', {
        value: { writeText },
        configurable: true,
        writable: true,
    });

    // Fake timers BEFORE the click so the toast's 1600ms window.setTimeout
    // (main.ts line 114) lands on the fake clock
    vi.useFakeTimers();
    try {
        clickSegment(filter);
        const card = document.querySelector<HTMLButtonElement>(
            `#gallery-mount button.card[aria-label="${ariaLabel}"]`
        );
        if (!card) throw new Error(`no card labeled "${ariaLabel}" under the ${filter} filter`);

        // Pre-click toast state: the empty shell toast (ui/index.html line 68)
        const toast = document.getElementById('toast')!;
        expect(toast.textContent).toBe('');
        expect(toast.getAttribute('class')).toBe('toast');

        card.click();

        // EXACTLY one clipboard write of the DEFAULT-size standalone markup
        // (factory() with no options → width/height '1em' — main.ts line 390)
        expect(writeText.mock.calls).toEqual([[expectedMarkup]]);

        // Toast feedback, exact text + visible class (main.ts lines 110–111)
        expect(toast.textContent).toBe(toastText);
        expect(toast.getAttribute('class')).toBe('toast visible');

        // Auto-hide boundary: still visible at 1599ms, gone at exactly 1600ms
        vi.advanceTimersByTime(1599);
        expect(toast.getAttribute('class')).toBe('toast visible');
        vi.advanceTimersByTime(1);
        expect(toast.getAttribute('class')).toBe('toast');
        // Only the class is cleared — the status text stays for readers
        expect(toast.textContent).toBe(toastText);
    } finally {
        // No fake timers / clipboard stub leak past this test
        vi.useRealTimers();
        if (originalClipboard) {
            Object.defineProperty(window.navigator, 'clipboard', originalClipboard);
        } else {
            delete (window.navigator as unknown as { clipboard?: unknown }).clipboard;
        }
    }
};

describe('ui/main — icon gallery bootstrap (jsdom, fresh shell per test)', () => {
    // Fake-timer hygiene: force real timers before AND after every test so a
    // failure mid-test can never leak vi.useFakeTimers into a sibling test.
    // The matchMedia shim is (re)installed before every test so the module's
    // import-time read (main.ts line 126) always finds it.
    beforeEach(() => {
        vi.useRealTimers();
        installMatchMediaShim();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it('boot renders the exact 16 toolbar segments and the unfiltered All gallery (207 icons)', async () => {
        await bootMain();

        // DOM order: set filter (All + SUBSET_NAMES, main.ts lines 49–69,
        // 254–255) → size (SIZES, line 84) → theme (THEME_MODES, line 124)
        const labels = Array.from(
            document.querySelectorAll<HTMLButtonElement>('#toolbar-mount button.seg-button')
        ).map((button) => button.textContent);
        expect(labels).toEqual([
            'All', 'Generic', 'Fantasy', 'Flags', 'Animals', 'Fruits', 'Nature', 'Landscape', 'Sky',
            '16px', '24px', '32px', '48px',
            'Auto', 'Light', 'Dark',
        ]);

        // Default state: subset 'All' active + size 32px active (lines 84–86)
        expect(segment('All').getAttribute('class')).toBe('seg-button active');
        expect(segment('All').getAttribute('aria-pressed')).toBe('true');
        expect(segment('Flags').getAttribute('class')).toBe('seg-button');
        expect(segment('Flags').getAttribute('aria-pressed')).toBe('false');
        expect(segment('Sky').getAttribute('class')).toBe('seg-button');
        expect(segment('Sky').getAttribute('aria-pressed')).toBe('false');
        expect(segment('Animals').getAttribute('class')).toBe('seg-button');
        expect(segment('Animals').getAttribute('aria-pressed')).toBe('false');
        expect(segment('32px').getAttribute('class')).toBe('seg-button active');

        // Count reflects the FILTERED gallery (lines 347–352): all 207 builtins
        expect(countText()).toBe('207 icons');

        // Exact 207-name order = the builtins.ts map order
        expect(cardNames()).toEqual(ALL_NAMES);
        expect(cards().length).toBe(ALL_COUNT);
        // a11y: every card IS a button whose accessible name is built from its
        // icon name (main.ts line 371)
        expect(cardAriaLabels()).toEqual(ALL_NAMES.map((name) => `Copy ${name} icon HTML`));
    });

    it('renders every one of the 207 All cards from its known factory with the exact 32px shell', async () => {
        const { svgIcons } = await bootMain();

        // Full parity sweep over the UNFILTERED view at the boot size: card
        // position N must render exactly svgIcons[ALL_NAMES[N]]({ size: 32 })
        // — pins map order ↔ gallery order ↔ factory binding in one shot.
        const galleryCards = cards();
        expect(galleryCards.length).toBe(ALL_COUNT);
        for (let index = 0; index < ALL_NAMES.length; index += 1) {
            expectCardSvg(galleryCards[index], svgIcons[ALL_NAMES[index]], 32);
        }
    });

    it('the Fantasy filter shows exactly the 30 fantasy names in builtins order with a "30 icons" count', async () => {
        await bootMain();
        clickSegment('Fantasy');

        expect(countText()).toBe('30 icons');
        expect(cardNames()).toEqual(FANTASY);
        expect(cardAriaLabels()).toEqual(FANTASY.map((name) => `Copy ${name} icon HTML`));

        // Active pill moved: Fantasy active, All back to inactive (the filter
        // click re-runs renderGallery + renderToolbar — main.ts lines 247–251)
        expect(segment('All').getAttribute('class')).toBe('seg-button');
        expect(segment('All').getAttribute('aria-pressed')).toBe('false');
        expect(segment('Fantasy').getAttribute('class')).toBe('seg-button active');
        expect(segment('Fantasy').getAttribute('aria-pressed')).toBe('true');
    });

    it('the Flags filter shows exactly the 24 flag names in builtins order with a "24 icons" count', async () => {
        await bootMain();
        clickSegment('Flags');

        expect(countText()).toBe('24 icons');
        expect(cardNames()).toEqual(FLAGS);
        expect(cardAriaLabels()).toEqual(FLAGS.map((name) => `Copy ${name} icon HTML`));

        // Active pill moved: Flags active, All back to inactive (the filter
        // click re-runs renderGallery + renderToolbar — main.ts lines 247–251)
        expect(segment('All').getAttribute('class')).toBe('seg-button');
        expect(segment('All').getAttribute('aria-pressed')).toBe('false');
        expect(segment('Flags').getAttribute('class')).toBe('seg-button active');
        expect(segment('Flags').getAttribute('aria-pressed')).toBe('true');
    });

    it('the Sky filter shows exactly the 30 sky names in builtins order with a "30 icons" count', async () => {
        await bootMain();
        clickSegment('Sky');

        expect(countText()).toBe('30 icons');
        expect(cardNames()).toEqual(SKY);
        expect(cardAriaLabels()).toEqual(SKY.map((name) => `Copy ${name} icon HTML`));

        // Active pill moved: Sky active, All back to inactive (the filter
        // click re-runs renderGallery + renderToolbar — main.ts lines 247–251)
        expect(segment('All').getAttribute('class')).toBe('seg-button');
        expect(segment('All').getAttribute('aria-pressed')).toBe('false');
        expect(segment('Sky').getAttribute('class')).toBe('seg-button active');
        expect(segment('Sky').getAttribute('aria-pressed')).toBe('true');
    });

    it('the Animals filter shows exactly the 60 animal names in builtins order with a "60 icons" count', async () => {
        await bootMain();
        clickSegment('Animals');

        expect(countText()).toBe('60 icons');
        expect(cardNames()).toEqual(ANIMALS);
        expect(cardAriaLabels()).toEqual(ANIMALS.map((name) => `Copy ${name} icon HTML`));

        // Active pill moved: Animals active, All back to inactive (the filter
        // click re-runs renderGallery + renderToolbar — main.ts lines 247–251)
        expect(segment('All').getAttribute('class')).toBe('seg-button');
        expect(segment('All').getAttribute('aria-pressed')).toBe('false');
        expect(segment('Animals').getAttribute('class')).toBe('seg-button active');
        expect(segment('Animals').getAttribute('aria-pressed')).toBe('true');
    });

    it('switching back to All from Flags, Sky and Animals restores the full 207-name gallery and the "207 icons" count', async () => {
        await bootMain();
        // Walk three subsets (each re-pins its own count along the way), then
        // return to All — the round-trip must restore the pristine gallery
        clickSegment('Flags');
        expect(countText()).toBe('24 icons');
        clickSegment('Sky');
        expect(countText()).toBe('30 icons');
        clickSegment('Animals');
        expect(countText()).toBe('60 icons');
        clickSegment('All');

        expect(countText()).toBe('207 icons');
        expect(cardNames()).toEqual(ALL_NAMES);
        expect(cards().length).toBe(ALL_COUNT);

        // Active pill round-trip: All active again, EVERY subset pill inactive
        const subsetLabels = ['All', 'Generic', 'Fantasy', 'Flags', 'Animals', 'Fruits', 'Nature', 'Landscape', 'Sky'];
        expect(subsetLabels.map((label) => segment(label).getAttribute('aria-pressed'))).toEqual(
            subsetLabels.map((label) => (label === 'All' ? 'true' : 'false'))
        );
        expect(segment('All').getAttribute('class')).toBe('seg-button active');
    });

    it('renders every Fantasy card from its known factory with the exact 32px shell', async () => {
        const { svgIcons } = await bootMain();
        clickSegment('Fantasy');

        const galleryCards = cards();
        expect(galleryCards.length).toBe(30);
        for (let index = 0; index < FANTASY.length; index += 1) {
            expectCardSvg(galleryCards[index], svgIcons[FANTASY[index]], 32);
        }
    });

    it('renders every Flags card from its known factory with the exact 32px shell', async () => {
        const { svgIcons } = await bootMain();
        clickSegment('Flags');

        const galleryCards = cards();
        expect(galleryCards.length).toBe(24);
        for (let index = 0; index < FLAGS.length; index += 1) {
            expectCardSvg(galleryCards[index], svgIcons[FLAGS[index]], 32);
        }

        // Independent composition cross-check: the factory output the loop
        // pinned for ceremonialBanner equals the svg-icon shell +
        // ICON_CEREMONIAL_BANNER (composed above from
        // flags/ceremonial-banner.ts — not from the DOM).
        expect(svgIcons.ceremonialBanner({ size: 32 })).toBe(CEREMONIAL_BANNER_32PX_SVG);
    });

    it('renders every Sky card from its known factory with the exact 32px shell', async () => {
        const { svgIcons } = await bootMain();
        clickSegment('Sky');

        const galleryCards = cards();
        expect(galleryCards.length).toBe(30);
        for (let index = 0; index < SKY.length; index += 1) {
            expectCardSvg(galleryCards[index], svgIcons[SKY[index]], 32);
        }

        // Independent composition cross-check: the factory output the loop
        // pinned for aurora equals the svg-icon shell + ICON_AURORA (composed
        // above from nature/aurora.ts — not from the DOM).
        expect(svgIcons.aurora({ size: 32 })).toBe(AURORA_32PX_SVG);
    });

    it('renders every Animals card from its known factory with the exact 32px shell', async () => {
        const { svgIcons } = await bootMain();
        clickSegment('Animals');

        const galleryCards = cards();
        expect(galleryCards.length).toBe(60);
        for (let index = 0; index < ANIMALS.length; index += 1) {
            expectCardSvg(galleryCards[index], svgIcons[ANIMALS[index]], 32);
        }

        // Independent composition cross-check: the factory output the loop
        // pinned for chameleon equals the svg-icon shell + ICON_CHAMELEON
        // (composed above from animals/chameleon.ts — not from the DOM).
        expect(svgIcons.chameleon({ size: 32 })).toBe(CHAMELEON_32PX_SVG);
    });

    it('preview size changes re-render all 60 Animals cards at the exact new px while preserving membership', async () => {
        const { svgIcons } = await bootMain();
        clickSegment('Animals');

        const sizeLabels = ['16px', '24px', '32px', '48px'];
        for (const size of [16, 24, 32, 48]) {
            clickSegment(`${size}px`);

            // Membership + count survive the full re-render (renderGallery +
            // renderToolbar on size change — main.ts lines 266–274)
            expect(countText()).toBe('60 icons');
            expect(cardNames()).toEqual(ANIMALS);

            // Active pill state across the four size segments
            expect(sizeLabels.map((label) => segment(label).getAttribute('aria-pressed'))).toEqual(
                sizeLabels.map((label) => (label === `${size}px` ? 'true' : 'false'))
            );

            // EVERY card re-rendered at the exact new size from its factory
            const galleryCards = cards();
            for (let index = 0; index < ANIMALS.length; index += 1) {
                expectCardSvg(galleryCards[index], svgIcons[ANIMALS[index]], size);
            }
        }

        // Independent composition cross-check at the last size (48px)
        expect(svgIcons.chameleon({ size: 48 })).toBe(CHAMELEON_48PX_SVG);
    });

    it('preview size changes re-render all 24 Flags cards at the exact new px while preserving membership', async () => {
        const { svgIcons } = await bootMain();
        clickSegment('Flags');

        const sizeLabels = ['16px', '24px', '32px', '48px'];
        for (const size of [16, 24, 32, 48]) {
            clickSegment(`${size}px`);

            // Membership + count survive the full re-render (renderGallery +
            // renderToolbar on size change — main.ts lines 266–274)
            expect(countText()).toBe('24 icons');
            expect(cardNames()).toEqual(FLAGS);

            // Active pill state across the four size segments
            expect(sizeLabels.map((label) => segment(label).getAttribute('aria-pressed'))).toEqual(
                sizeLabels.map((label) => (label === `${size}px` ? 'true' : 'false'))
            );

            // EVERY card re-rendered at the exact new size from its factory
            const galleryCards = cards();
            for (let index = 0; index < FLAGS.length; index += 1) {
                expectCardSvg(galleryCards[index], svgIcons[FLAGS[index]], size);
            }
        }

        // Independent composition cross-check at the last size (48px)
        expect(svgIcons.ceremonialBanner({ size: 48 })).toBe(CEREMONIAL_BANNER_48PX_SVG);
    });

    it('preview size changes re-render all 30 Sky cards at the exact new px while preserving membership', async () => {
        const { svgIcons } = await bootMain();
        clickSegment('Sky');

        const sizeLabels = ['16px', '24px', '32px', '48px'];
        for (const size of [16, 24, 32, 48]) {
            clickSegment(`${size}px`);

            // Membership + count survive the full re-render (renderGallery +
            // renderToolbar on size change — main.ts lines 266–274)
            expect(countText()).toBe('30 icons');
            expect(cardNames()).toEqual(SKY);

            // Active pill state across the four size segments
            expect(sizeLabels.map((label) => segment(label).getAttribute('aria-pressed'))).toEqual(
                sizeLabels.map((label) => (label === `${size}px` ? 'true' : 'false'))
            );

            // EVERY card re-rendered at the exact new size from its factory
            const galleryCards = cards();
            for (let index = 0; index < SKY.length; index += 1) {
                expectCardSvg(galleryCards[index], svgIcons[SKY[index]], size);
            }
        }

        // Independent composition cross-check at the last size (48px)
        expect(svgIcons.aurora({ size: 48 })).toBe(AURORA_48PX_SVG);
    });

    it('clicking the chameleon card copies the exact default-size SVG markup and shows the toast for exactly 1600ms', async () => {
        await bootMain();
        await expectCardCopyAndToast(
            'Animals',
            'Copy chameleon icon HTML',
            CHAMELEON_DEFAULT_SVG,
            'Copied chameleon HTML'
        );
    });

    it('clicking the ceremonialBanner card (last Flags icon) copies the exact default-size SVG markup and shows the toast for exactly 1600ms', async () => {
        await bootMain();
        await expectCardCopyAndToast(
            'Flags',
            'Copy ceremonialBanner icon HTML',
            CEREMONIAL_BANNER_DEFAULT_SVG,
            'Copied ceremonialBanner HTML'
        );
    });

    it('clicking the aurora card (last Sky icon) copies the exact default-size SVG markup and shows the toast for exactly 1600ms', async () => {
        await bootMain();
        await expectCardCopyAndToast(
            'Sky',
            'Copy aurora icon HTML',
            AURORA_DEFAULT_SVG,
            'Copied aurora HTML'
        );
    });

    it('boot without a required mount rejects with the exact hard-error message and renders nothing', async () => {
        document.body.innerHTML = '';
        localStorage.clear();
        // gallery-mount + toolbar-mount present, toast missing → the module
        // throws at evaluation time (main.ts lines 31–36)
        const galleryMount = document.createElement('main');
        galleryMount.id = 'gallery-mount';
        const toolbarMount = document.createElement('div');
        toolbarMount.id = 'toolbar-mount';
        document.body.append(galleryMount, toolbarMount);
        vi.resetModules();

        await expect(import('./main')).rejects.toThrow(
            /^ui\/index\.html is missing a required mount \(gallery-mount \/ toolbar-mount \/ toast\)$/
        );
        // The throw happens at bootstrap — nothing was ever rendered
        expect(galleryMount.childElementCount).toBe(0);
    });
});
