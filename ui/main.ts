// ============================================================================
// ui/main.ts — bootstrap for the @userfiction/visual icon gallery
// ============================================================================
// Vanilla DOM app (no React, no backend, no fetch): enumerates every built-in
// icon through the package's OWN string layer and renders one card per icon —
// rendered SVG, registry name, click-to-copy of the RAW HTML (the standalone
// <svg …> markup, ready for pasting into any HTML surface).
//
// Controls (all state in-memory; theme + color persist to localStorage):
//   set filter     — All / Generic / Fantasy / Flags / Animals / Fruits /
//                    Nature / Landscape / Sky
//   preview size   — 16 / 24 / 32 / 48 px segmented control
//   color picker   — preset swatches + native <input type="color"> + reset;
//                    recolors every rendered icon via the --icon-color token
//                    (icons are currentColor, so one token drives them all)
//   theme          — Auto (follows prefers-color-scheme, live) / Light / Dark
//
// IMPORT CONTRACT: the UI deep-imports '../src/icons/builtins' (NOT the
// package barrel). The barrel also re-exports react.tsx, which imports
// 'react' — the vanilla showcase must not drag React into its bundle.
// Importing the svgIcons map both registers every built-in into the shared
// registry (see builtins.ts REGISTRY VISIBILITY) and guarantees nothing is
// dropped by tree-shaking: every factory is referenced from this module.
// ============================================================================

import { svgIcons } from '../src/icons/builtins';
import type { SvgIconFactory } from '../src/icons/svg-icon';

// The static shell (index.html) must provide these mounts; a missing id is a
// hard error at bootstrap (fail loudly instead of an empty page)
const galleryMount = document.getElementById('gallery-mount');
const toolbarMount = document.getElementById('toolbar-mount');
const toast = document.getElementById('toast');
if (!galleryMount || !toolbarMount || !toast) {
    throw new Error('ui/index.html is missing a required mount (gallery-mount / toolbar-mount / toast)');
}

// Built-ins, enumerated from the map (single source of truth for names AND
// factories — no duplicated name list in the UI). Object.keys + index lookup
// instead of Object.entries: the shared tsconfig lib stops at es2015
// (tsconfig.json line 14) and Object.entries needs es2017.
const builtins: Array<[string, SvgIconFactory]> = Object.keys(svgIcons).map(
    (name) => [name, svgIcons[name]] as [string, SvgIconFactory]
);

// ── subsets: explicit name→set membership (self-documenting, survives any
// future reordering of the svgIcons map; 'All' is the unfiltered view) ──────

const SUBSET_NAMES: Array<[string, string[]]> = [
    [
        'Generic',
        ['check', 'close', 'plus', 'minus', 'menu', 'chevronDown', 'chevronUp', 'chevronLeft', 'chevronRight', 'arrowRight', 'play', 'pause', 'stop', 'heart', 'star', 'book', 'bookmark', 'user', 'home', 'pin', 'trash', 'search', 'download'],
    ],
    // Keep the RPG catalog aligned with src/icons/fantasy/index.ts so new
    // equipment is discoverable in Fantasy as well as the unfiltered gallery.
    ['Fantasy', ['sword', 'axe', 'wand', 'shield', 'potion', 'scroll', 'spellbook', 'crown', 'gem', 'key', 'mace', 'vial', 'dagger', 'bow', 'arrow', 'staff', 'spear', 'warhammer', 'helmet', 'armor', 'gauntlet', 'boots', 'ring', 'amulet', 'torch', 'backpack', 'chest', 'coins', 'dice', 'skull']],
    // Keep expanded flag silhouettes discoverable; order matches flags/index.ts
    // and src/icons/builtins.ts without changing the existing filter contract.
    ['Flags', ['flag', 'pennant', 'banner', 'wavingFlag', 'checkeredFlag', 'nordicFlag', 'swallowtailFlag', 'bunting', 'triangularFlag', 'doublePennant', 'forkedFlag', 'roundedFlag', 'tatteredFlag', 'crossedFlags', 'flagGarland', 'windsock', 'flagOnHill', 'victoryFlag', 'stripedFlag', 'crossFlag', 'saltireFlag', 'diamondFlag', 'signalFlag', 'ceremonialBanner']],
    // Match src/icons/animals/index.ts so every new species is discoverable
    // through the Animals filter as well as the unfiltered gallery.
    ['Animals', ['cat', 'dog', 'bird', 'fish', 'rabbit', 'bear', 'dragon', 'snake', 'turtle', 'paw', 'horse', 'lion', 'owl', 'fox', 'whale', 'frog', 'snail', 'penguin', 'butterfly', 'duck', 'elephant', 'giraffe', 'zebra', 'rhinoceros', 'hippopotamus', 'monkey', 'gorilla', 'panda', 'koala', 'kangaroo', 'deer', 'moose', 'wolf', 'tiger', 'cow', 'pig', 'sheep', 'goat', 'camel', 'donkey', 'bat', 'eagle', 'parrot', 'flamingo', 'swan', 'chicken', 'rooster', 'peacock', 'ostrich', 'shark', 'dolphin', 'octopus', 'squid', 'jellyfish', 'crab', 'lobster', 'seahorse', 'crocodile', 'lizard', 'chameleon']],
    ['Fruits', ['apple', 'banana', 'cherry', 'grape', 'orange', 'lemon', 'watermelon', 'pear', 'strawberry', 'peach', 'pineapple', 'kiwi', 'mango', 'avocado', 'blueberry', 'coconut', 'pomegranate', 'plum', 'melon']],
    ['Nature', ['oak', 'pine', 'palm', 'birch', 'maple', 'fir', 'cypress', 'willow', 'appleTree', 'cherryTree', 'redwood', 'spruce', 'bush', 'cactus', 'fern', 'flower', 'tulip', 'sunflower']],
    ['Landscape', ['mountain', 'hills', 'river']],
    // Weather and celestial variants share the same copy, color and size
    // controls as the original sky set; geometry lives in icons/nature/.
    ['Sky', ['sun', 'moon', 'cloud', 'stars', 'sunrise', 'rainbow', 'lightning', 'sunset', 'sunCloud', 'moonCloud', 'cloudRain', 'cloudDrizzle', 'cloudSnow', 'cloudLightning', 'cloudWind', 'fog', 'wind', 'tornado', 'snowflake', 'raindrop', 'umbrella', 'crescentMoon', 'fullMoon', 'halfMoon', 'moonStars', 'shootingStar', 'constellation', 'comet', 'eclipse', 'aurora']],
];

// name → subset label lookup (unknown names never filter out of 'All' but
// also never match a subset filter — forward-compatible with new subsets
// before this table is extended)
const nameSubset: { [name: string]: string } = {};
arrayEach(SUBSET_NAMES, ([subset, names]) => {
    arrayEach(names, (name) => {
        nameSubset[name] = subset;
    });
});

// ── gallery state ────────────────────────────────────────────────────────────

// Selected preview size for the grid — one of the toolbar's fixed choices
const SIZES = [16, 24, 32, 48];
let currentSize = 32;
let currentSubset = 'All';

// ── copy-to-clipboard with a non-secure-context fallback ────────────────────

// navigator.clipboard only exists in secure contexts (localhost counts, plain
// http over LAN does not) — execCommand keeps the copy working everywhere
const copyText = (text: string): void => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        return;
    }
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    document.body.removeChild(helper);
};

// Toast feedback: fixed text per event (deterministic, aria-live=polite)
let toastTimer = 0;
const showToast = (message: string): void => {
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(toastTimer);
    // Auto-hide after 1.6s — UI-only pacing, mirrors the sibling demos
    toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 1600);
};

// ── theme: mode (auto/light/dark) → resolved data-theme attribute ────────────
// CSS (styles.css) keys every color off html[data-theme="light"|"dark"]; the
// MODE is what the user picks and what persists. In auto the resolution is
// LIVE: the matchMedia listener re-applies while the OS theme flips.

type ThemeMode = 'auto' | 'light' | 'dark';
const THEME_STORAGE_KEY = 'visual-ui-theme';
const THEME_MODES: ThemeMode[] = ['auto', 'light', 'dark'];

const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');

const readStoredMode = (): ThemeMode => {
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        // Anything other than a known mode (or absent) falls back to auto
        return stored === 'light' || stored === 'dark' ? stored : 'auto';
    } catch (error) {
        return 'auto';
    }
};

let themeMode: ThemeMode = readStoredMode();

// Resolves the mode against the OS preference and writes the CONCRETE theme
// to <html data-theme> — the only DOM side effect; CSS does the rest.
const applyTheme = (): void => {
    const dark = themeMode === 'dark' || (themeMode === 'auto' && themeQuery.matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
};

// Auto mode is live: OS-level theme flips re-resolve without a reload.
themeQuery.addEventListener('change', () => {
    if (themeMode === 'auto') applyTheme();
});

const setThemeMode = (mode: ThemeMode): void => {
    themeMode = mode;
    applyTheme();
    try {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
        // Storage unavailable (privacy mode / file:// edge) — theme still
        // applies for the session, it just will not persist.
    }
};

applyTheme();

// ── icon color: one CSS token driving every currentColor icon ────────────────
// null = theme default (icons follow the theme ink); a hex overrides it.
// Presets stay theme-independent (brand-ish colors look right on both).

const ICON_STORAGE_KEY = 'visual-ui-color';

const COLOR_PRESETS: Array<{ name: string; hex: string | null }> = [
    { name: 'Theme default', hex: null },
    { name: 'Ink', hex: '#16181d' },
    { name: 'Rose', hex: '#e11d48' },
    { name: 'Amber', hex: '#d97706' },
    { name: 'Emerald', hex: '#059669' },
    { name: 'Blue', hex: '#3b5bfd' },
    { name: 'Violet', hex: '#7c3aed' },
];

const readStoredColor = (): string | null => {
    try {
        const stored = localStorage.getItem(ICON_STORAGE_KEY);
        // Only hex values are accepted back — anything else (corrupted /
        // hand-edited storage) falls back to the theme default
        return stored && /^#[0-9a-fA-F]{6}$/.test(stored) ? stored : null;
    } catch (error) {
        return null;
    }
};

let iconColor: string | null = readStoredColor();

// Writes the token onto the gallery mount (scoped, not :root — the toolbar
// preview swatches do not consume it) and clears it for the theme default.
const applyIconColor = (): void => {
    if (iconColor === null) {
        galleryMount.style.removeProperty('--icon-color');
    } else {
        galleryMount.style.setProperty('--icon-color', iconColor);
    }
};

const setIconColor = (hex: string | null): void => {
    iconColor = hex;
    applyIconColor();
    try {
        if (hex === null) localStorage.removeItem(ICON_STORAGE_KEY);
        else localStorage.setItem(ICON_STORAGE_KEY, hex);
    } catch (error) {
        // Storage unavailable — color still applies for the session.
    }
    renderGallery(); // swatch active states live in the toolbar re-render
    renderToolbar();
};

applyIconColor();

// ── toolbar (set filter + size + color + theme + count) ──────────────────────

// One flat segmented pill; `active` marks the selected value.
const makeSegment = (label: string, active: boolean, onClick: () => void): HTMLButtonElement => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `seg-button${active ? ' active' : ''}`;
    button.textContent = label;
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
    button.addEventListener('click', onClick);
    return button;
};

const renderToolbar = (): void => {
    toolbarMount.textContent = '';

    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';

    // ── set filter (All + every named subset) ──
    const setGroup = document.createElement('div');
    setGroup.className = 'group';
    const setLabel = document.createElement('span');
    setLabel.className = 'label';
    setLabel.textContent = 'Set';
    setGroup.appendChild(setLabel);
    const makeSetSegment = (label: string): void => {
        setGroup.appendChild(
            makeSegment(label, currentSubset === label, () => {
                currentSubset = label;
                renderGallery();
                renderToolbar();
            })
        );
    };
    makeSetSegment('All');
    arrayEach(SUBSET_NAMES, ([subset]) => makeSetSegment(subset));
    toolbar.appendChild(setGroup);

    // ── preview size ──
    const sizeGroup = document.createElement('div');
    sizeGroup.className = 'group';
    const sizeLabel = document.createElement('span');
    sizeLabel.className = 'label';
    sizeLabel.textContent = 'Preview size';
    sizeGroup.appendChild(sizeLabel);
    arrayEach(SIZES, (size) => {
        sizeGroup.appendChild(
            makeSegment(`${size}px`, size === currentSize, () => {
                currentSize = size;
                // Re-render the filtered grid so every SVG receives the same
                // size; membership remains driven by the builtins.ts catalog.
                renderGallery();
                renderToolbar();
            })
        );
    });
    toolbar.appendChild(sizeGroup);

    // ── color picker: reset chip + preset swatches + native wheel input ──
    const colorGroup = document.createElement('div');
    colorGroup.className = 'group';
    const colorLabel = document.createElement('span');
    colorLabel.className = 'label';
    colorLabel.textContent = 'Color';
    colorGroup.appendChild(colorLabel);

    arrayEach(COLOR_PRESETS, (preset) => {
        if (preset.hex === null) {
            // Reset chip: bordered circle with a slash — back to theme ink
            const reset = document.createElement('button');
            reset.type = 'button';
            reset.className = `swatch swatch-reset${iconColor === null ? ' active' : ''}`;
            reset.title = 'Theme default';
            reset.setAttribute('aria-label', 'Reset icon color to theme default');
            reset.addEventListener('click', () => setIconColor(null));
            colorGroup.appendChild(reset);
            return;
        }
        const swatch = document.createElement('button');
        swatch.type = 'button';
        swatch.className = `swatch${iconColor === preset.hex ? ' active' : ''}`;
        swatch.style.background = preset.hex;
        swatch.title = `${preset.name} (${preset.hex})`;
        swatch.setAttribute('aria-label', `Set icon color to ${preset.name}`);
        swatch.addEventListener('click', () => setIconColor(preset.hex));
        colorGroup.appendChild(swatch);
    });

    // Native color input = the free "color wheel": any hex the OS picker
    // exposes. `input` fires live (drag) — apply + repaint the gallery ONLY
    // (no toolbar rebuild, which would replace this very input mid-drag —
    // and no persistence per tick); `change` commits the final value with
    // the full setIconColor (persist + toolbar re-render for swatch rings).
    const wheel = document.createElement('input');
    wheel.type = 'color';
    wheel.className = 'color-input';
    // Seed the OS picker with the active color (or a neutral) — its own
    // value never drives rendering until the user picks
    wheel.value = iconColor ?? '#3b5bfd';
    wheel.title = 'Custom color';
    wheel.setAttribute('aria-label', 'Pick a custom icon color');
    wheel.addEventListener('input', () => {
        iconColor = wheel.value;
        applyIconColor();
        renderGallery();
    });
    wheel.addEventListener('change', () => setIconColor(wheel.value));
    colorGroup.appendChild(wheel);
    toolbar.appendChild(colorGroup);

    // ── theme: Auto / Light / Dark ──
    const themeGroup = document.createElement('div');
    themeGroup.className = 'group';
    const themeLabel = document.createElement('span');
    themeLabel.className = 'label';
    themeLabel.textContent = 'Theme';
    themeGroup.appendChild(themeLabel);
    arrayEach(THEME_MODES, (mode) => {
        themeGroup.appendChild(
            makeSegment(mode === 'auto' ? 'Auto' : mode === 'light' ? 'Light' : 'Dark', themeMode === mode, () => {
                setThemeMode(mode);
                renderToolbar(); // active pill moves
            })
        );
    });
    toolbar.appendChild(themeGroup);

    // Count reflects the FILTERED gallery, not the whole map
    const visible = builtins.filter(([name]) => currentSubset === 'All' || nameSubset[name] === currentSubset);
    const count = document.createElement('span');
    count.className = 'count';
    count.textContent = `${visible.length} icons`;
    toolbar.appendChild(count);

    toolbarMount.appendChild(toolbar);
};

// ── gallery grid ─────────────────────────────────────────────────────────────

const renderGallery = (): void => {
    galleryMount.textContent = '';

    arrayEach(builtins, ([name, factory]) => {
        // Subset filter: 'All' shows every built-in, otherwise membership
        // comes from the explicit name→subset table above
        if (currentSubset !== 'All' && nameSubset[name] !== currentSubset) return;

        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'card';
        // a11y: the card IS a button whose accessible name is the icon name
        card.setAttribute('aria-label', `Copy ${name} icon HTML`);

        // Icon well: the factory returns a full standalone <svg …> string —
        // injected verbatim (package-authored markup, same trust boundary as
        // the library itself). Color comes from --icon-color via currentColor.
        const well = document.createElement('span');
        well.className = 'well';
        well.innerHTML = factory({ size: currentSize });
        card.appendChild(well);

        const nameNode = document.createElement('span');
        nameNode.className = 'name';
        nameNode.textContent = name;
        card.appendChild(nameNode);

        // Click → copy the RAW HTML: the DEFAULT-size standalone markup
        // (size: default '1em' scales with the consumer's font, the most
        // reusable form for pasting into any HTML surface)
        card.addEventListener('click', () => {
            copyText(factory());
            showToast(`Copied ${name} HTML`);
        });

        galleryMount.appendChild(card);
    });
};

// ── tiny local iteration helper ──────────────────────────────────────────────
// forEach-shaped callback loop (index + value) without pulling
// @presource/core into the UI bundle — the showcase stays dependency-light
function arrayEach<T>(items: T[], callback: (value: T, index: number) => void): void {
    items.forEach(function (value, index) {
        callback(value, index);
    });
}

// ── boot ─────────────────────────────────────────────────────────────────────

renderToolbar();
renderGallery();
