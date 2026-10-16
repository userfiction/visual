// ============================================================================
// ui/main.test.ts — deterministic jsdom tests for the vanilla gallery UI
// (./main.ts bootstrap) — task animal-gallery-tests (owned test file)
// ============================================================================
// main.ts is a MODULE-LEVEL SIDE-EFFECT bootstrap: it captures the three
// mounts (#gallery-mount / #toolbar-mount / #toast — provided by
// ui/index.html lines 55/59/68), renders toolbar + gallery ONCE at import and
// keeps every state in module-level singletons (currentSubset='All',
// currentSize=32 — main.ts lines 78–80). Every test therefore bootstraps a
// FRESH shell: rebuild the three mounts exactly as index.html does, clear
// localStorage (readStoredMode/readStoredColor run at import, main.ts lines
// 122–130/175–184), then vi.resetModules() + a dynamic import('./main') so
// each test starts from the pristine boot state — no cross-test state leak
// and no fake timers leaking between tests (restored before AND after every
// test, plus inside the toast test's finally).
//
// CONTRACTS PINNED (all derived from source, never from observed runtime):
//   1. BOOT MOUNTS: importing ./main without the three mounts rejects with
//      the exact hardcoded error (main.ts lines 29–36) and renders nothing.
//   2. TOOLBAR SHAPE: exactly 16 seg-buttons in DOM order — set filter All +
//      SUBSET_NAMES order (main.ts lines 49–63: Generic, Fantasy, Flags,
//      Animals, Fruits, Nature, Landscape, Sky), then SIZES '16px'…'48px'
//      (line 78), then theme 'Auto'/'Light'/'Dark' (line 118).
//   3. 'All' GALLERY: count label '148 icons' (lines 340–345) and the EXACT
//      148-name card order = builtins.ts map order = generic 23 + fantasy 10
//      + flags 8 + animals 60 + fruits 19 + nature 28 (trees 18 + landscape
//      3 + sky 7). The animals block is the post-expansion 60-species set
//      (20 originals + 40 new: elephant … chameleon — builtins.ts lines
//      209–270, animals/index.ts lines 11–73, ui/main.ts line 58).
//   4. ANIMALS FILTER: count '60 icons' + the exact 60 names in builtins
//      order; the segment active/aria-pressed states flip exactly both ways
//      (Animals → All round-trip re-pins the full 148 gallery).
//   5. RENDERED SVGs: every Animals card's .well holds EXACTLY the known
//      factory's output — svgIcons[name]({ size }) compared byte-for-byte
//      through an IDENTICAL jsdom innerHTML set→get round-trip (same input
//      string → same parse+serialize, so equality is exact by construction),
//      plus explicit per-card pins: xmlns attribute + namespaceURI,
//      viewBox '0 0 24 24' (svg-icon.ts DEFAULT_VIEW_BOX, line 81),
//      width/height `${size}px` (resolveSize: number → px, line 179),
//      fill 'currentColor'. The chameleon card is ADDITIONALLY pinned
//      against an independently composed string (svg-icon shell + the
//      exported ICON_CHAMELEON from animals/chameleon.ts — same composition
//      pattern as the ICON_LIGHTNING pin in ../src/icons/icons.test.ts).
//   6. SIZE SWITCHING: 16/24/32/48 re-render all 60 Animals cards at the
//      exact new px size (full factory equality per card per size) while the
//      60-name membership and the '60 icons' count stay intact.
//   7. COPY: clicking a card calls navigator.clipboard.writeText EXACTLY
//      once with the DEFAULT-size standalone markup (factory() with no
//      options → width/height '1em', main.ts line 383; svg-icon.ts OUTPUT
//      CONTRACT lines 186–196/211–218: xmlns → viewBox → width → height →
//      fill, content verbatim) and shows the toast 'Copied <name> HTML'
//      (line 384) for EXACTLY 1600ms (window.setTimeout, line 108) —
//      asserted at the 1599/1600ms boundary under fake timers restored in
//      the same test.
// ============================================================================

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// ICON_CHAMELEON (animals/chameleon.ts): the copy test composes the exact
// default-size standalone markup from this definition constant + the svg-icon
// shell — byte-exact by construction (no hand-copied probe string).
import { ICON_CHAMELEON } from '../src/icons/animals/chameleon';

// ── static expected lists (transcribed from source — see header) ────────────

// The Animals subset, ui/main.ts line 58 / builtins.ts lines 209–270 — the 20
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

// The remaining subsets, in builtins.ts map order (generic 23: lines 165–187,
// fantasy 10: 189–198, flags 8: 200–207, fruits 19: 272–290, nature trees 18:
// 292–309, landscape 3: 311–313, sky 7: 315–321).
const GENERIC: string[] = [
    'check', 'close', 'plus', 'minus', 'menu', 'chevronDown', 'chevronUp', 'chevronLeft', 'chevronRight',
    'arrowRight', 'play', 'pause', 'stop', 'heart', 'star', 'book', 'bookmark', 'user', 'home', 'pin', 'trash',
    'search', 'download',
];
const FANTASY: string[] = [
    'sword', 'axe', 'wand', 'shield', 'potion', 'scroll', 'spellbook', 'crown', 'gem', 'key',
];
const FLAGS: string[] = [
    'flag', 'pennant', 'banner', 'wavingFlag', 'checkeredFlag', 'nordicFlag', 'swallowtailFlag', 'bunting',
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
const SKY: string[] = ['sun', 'moon', 'cloud', 'stars', 'sunrise', 'rainbow', 'lightning'];

// 'All' = the unfiltered builtins.ts map order; 148 = 23+10+8+60+19+18+3+7.
const ALL_NAMES: string[] = [
    ...GENERIC, ...FANTASY, ...FLAGS, ...ANIMALS, ...FRUITS, ...TREES, ...LANDSCAPE, ...SKY,
];
const ALL_COUNT = 148;

// ── exact SVG shell composition (svg-icon.ts OUTPUT CONTRACT) ────────────────

// svg-icon.ts lines 186–196 + 211–218: fixed attribute order xmlns → viewBox
// → width → height → fill, then the definition content verbatim, closed by
// </svg>. viewBox is DEFAULT_VIEW_BOX ('0 0 24 24', svg-icon.ts line 81) for
// every built-in; resolveSize maps number sizes to '<n>px' (line 179) and the
// no-options default to '1em' (line 153).
const svgShell = (size: string): string =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor">`;

// chameleon (animals/chameleon.ts): definition const + shell — pinned at the
// DEFAULT copy size ('1em'), the initial gallery size (32px, main.ts line 79)
// and the last size-test size (48px).
const CHAMELEON_DEFAULT_SVG = `${svgShell('1em')}${ICON_CHAMELEON}</svg>`;
const CHAMELEON_32PX_SVG = `${svgShell('32px')}${ICON_CHAMELEON}</svg>`;
const CHAMELEON_48PX_SVG = `${svgShell('48px')}${ICON_CHAMELEON}</svg>`;

// ── window.matchMedia shim ───────────────────────────────────────────────────
// The installed jsdom build exposes no window.matchMedia, but main.ts reads it
// at import (line 120: the prefers-color-scheme query) and registers a change
// listener (line 142). The shim returns a FRESH MediaQueryList-like object per
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
    // currentSize 32) and a re-run of the boot renders (lines 402–403).
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
// 216; color swatches are .swatch buttons and the wheel is an input).
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

describe('ui/main — icon gallery bootstrap (jsdom, fresh shell per test)', () => {
    // Fake-timer hygiene: force real timers before AND after every test so a
    // failure mid-test can never leak vi.useFakeTimers into a sibling test.
    // The matchMedia shim is (re)installed before every test so the module's
    // import-time read (main.ts line 120) always finds it.
    beforeEach(() => {
        vi.useRealTimers();
        installMatchMediaShim();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it('boot renders the exact 16 toolbar segments and the unfiltered All gallery (148 icons)', async () => {
        await bootMain();

        // DOM order: set filter (All + SUBSET_NAMES, main.ts lines 49–63,
        // 248–249) → size (SIZES, line 78) → theme (THEME_MODES, line 118)
        const labels = Array.from(
            document.querySelectorAll<HTMLButtonElement>('#toolbar-mount button.seg-button')
        ).map((button) => button.textContent);
        expect(labels).toEqual([
            'All', 'Generic', 'Fantasy', 'Flags', 'Animals', 'Fruits', 'Nature', 'Landscape', 'Sky',
            '16px', '24px', '32px', '48px',
            'Auto', 'Light', 'Dark',
        ]);

        // Default state: subset 'All' active + size 32px active (lines 78–80)
        expect(segment('All').getAttribute('class')).toBe('seg-button active');
        expect(segment('All').getAttribute('aria-pressed')).toBe('true');
        expect(segment('Animals').getAttribute('class')).toBe('seg-button');
        expect(segment('Animals').getAttribute('aria-pressed')).toBe('false');
        expect(segment('32px').getAttribute('class')).toBe('seg-button active');

        // Count reflects the FILTERED gallery (lines 340–345): all 148 builtins
        expect(countText()).toBe('148 icons');

        // Exact 148-name order = the builtins.ts map order
        expect(cardNames()).toEqual(ALL_NAMES);
        expect(cards().length).toBe(ALL_COUNT);
        // a11y: every card IS a button whose accessible name is built from its
        // icon name (main.ts line 364)
        expect(cardAriaLabels()).toEqual(ALL_NAMES.map((name) => `Copy ${name} icon HTML`));
    });

    it('the Animals filter shows exactly the 60 animal names in builtins order with a "60 icons" count', async () => {
        await bootMain();
        clickSegment('Animals');

        expect(countText()).toBe('60 icons');
        expect(cardNames()).toEqual(ANIMALS);
        expect(cardAriaLabels()).toEqual(ANIMALS.map((name) => `Copy ${name} icon HTML`));

        // Active pill moved: Animals active, All back to inactive (the filter
        // click re-runs renderGallery + renderToolbar — main.ts lines 241–246)
        expect(segment('All').getAttribute('class')).toBe('seg-button');
        expect(segment('All').getAttribute('aria-pressed')).toBe('false');
        expect(segment('Animals').getAttribute('class')).toBe('seg-button active');
        expect(segment('Animals').getAttribute('aria-pressed')).toBe('true');
    });

    it('switching back to All restores the full 148-name gallery and the "148 icons" count', async () => {
        await bootMain();
        clickSegment('Animals');
        clickSegment('All');

        expect(countText()).toBe('148 icons');
        expect(cardNames()).toEqual(ALL_NAMES);
        expect(segment('All').getAttribute('class')).toBe('seg-button active');
        expect(segment('Animals').getAttribute('class')).toBe('seg-button');
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
            // renderToolbar on size change — main.ts lines 261–266)
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

    it('clicking the chameleon card copies the exact default-size SVG markup and shows the toast for exactly 1600ms', async () => {
        await bootMain();
        clickSegment('Animals');

        // jsdom ships no navigator.clipboard — install a stub capture BEFORE
        // the click (main.ts copyText prefers navigator.clipboard, lines 86–90)
        const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
        const originalClipboard = Object.getOwnPropertyDescriptor(window.navigator, 'clipboard');
        Object.defineProperty(window.navigator, 'clipboard', {
            value: { writeText },
            configurable: true,
            writable: true,
        });

        // Fake timers BEFORE the click so the toast's 1600ms window.setTimeout
        // (main.ts line 108) lands on the fake clock
        vi.useFakeTimers();
        try {
            const chameleonCard = document.querySelector<HTMLButtonElement>(
                '#gallery-mount button.card[aria-label="Copy chameleon icon HTML"]'
            );
            if (!chameleonCard) throw new Error('no chameleon card under the Animals filter');

            // Pre-click toast state: the empty shell toast (ui/index.html line 68)
            const toast = document.getElementById('toast')!;
            expect(toast.textContent).toBe('');
            expect(toast.getAttribute('class')).toBe('toast');

            chameleonCard.click();

            // EXACTLY one clipboard write of the DEFAULT-size standalone markup
            // (factory() with no options → width/height '1em' — main.ts line 383)
            expect(writeText.mock.calls).toEqual([[CHAMELEON_DEFAULT_SVG]]);

            // Toast feedback, exact text + visible class (main.ts lines 103–109)
            expect(toast.textContent).toBe('Copied chameleon HTML');
            expect(toast.getAttribute('class')).toBe('toast visible');

            // Auto-hide boundary: still visible at 1599ms, gone at exactly 1600ms
            vi.advanceTimersByTime(1599);
            expect(toast.getAttribute('class')).toBe('toast visible');
            vi.advanceTimersByTime(1);
            expect(toast.getAttribute('class')).toBe('toast');
            // Only the class is cleared — the status text stays for readers
            expect(toast.textContent).toBe('Copied chameleon HTML');
        } finally {
            // No fake timers / clipboard stub leak past this test
            vi.useRealTimers();
            if (originalClipboard) {
                Object.defineProperty(window.navigator, 'clipboard', originalClipboard);
            } else {
                delete (window.navigator as unknown as { clipboard?: unknown }).clipboard;
            }
        }
    });

    it('boot without a required mount rejects with the exact hard-error message and renders nothing', async () => {
        document.body.innerHTML = '';
        localStorage.clear();
        // gallery-mount + toolbar-mount present, toast missing → the module
        // throws at evaluation time (main.ts lines 29–36)
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
