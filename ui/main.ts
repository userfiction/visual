// ============================================================================
// ui/main.ts — bootstrap for the @userfiction/visual icon gallery
// ============================================================================
// Vanilla DOM app (no React, no backend, no fetch): enumerates every built-in
// icon through the package's OWN string layer and renders one card per icon —
// rendered SVG, registry name, click-to-copy of the standalone SVG markup.
//
// IMPORT CONTRACT: the UI deep-imports '../src/icons/icons' (NOT the package
// barrel). The barrel also re-exports react.tsx, which imports 'react' — the
// vanilla showcase must not drag React into its bundle. Importing the
// svgIcons map both registers every built-in into the shared registry
// (see icons.ts REGISTRY VISIBILITY) and guarantees nothing is dropped by
// tree-shaking: every factory is referenced from this module.
// ============================================================================

// svgIcons: name → bound factory (registers + renders); SvgIconFactory type
// import vanishes at build time (type-only, zero runtime cost).
// IMPORT PATH: the discovery map lives in '../src/icons/builtins' — it
// registers every built-in (generic + fantasy) as a side effect of importing
// the generic/fantasy sub-barrels.
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

// Selected preview size for the grid — one of the toolbar's fixed choices
const SIZES = [16, 24, 32, 48];
let currentSize = 32;

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

// ── toolbar (size segmented control + count) ────────────────────────────────

const renderToolbar = (): void => {
    toolbarMount.textContent = '';

    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';

    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = 'Preview size';
    toolbar.appendChild(label);

    arrayEach(SIZES, (size) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `size-button${size === currentSize ? ' active' : ''}`;
        button.textContent = `${size}px`;
        button.setAttribute('aria-pressed', size === currentSize ? 'true' : 'false');
        button.addEventListener('click', () => {
            currentSize = size;
            // Full re-render on size change — the grid is cheap (23 cards)
            renderGallery();
            renderToolbar();
        });
        toolbar.appendChild(button);
    });

    const count = document.createElement('span');
    count.className = 'count';
    count.textContent = `${builtins.length} icons`;
    toolbar.appendChild(count);

    toolbarMount.appendChild(toolbar);
};

// ── gallery grid ─────────────────────────────────────────────────────────────

const renderGallery = (): void => {
    galleryMount.textContent = '';

    arrayEach(builtins, ([name, factory]) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'card';
        // a11y: the card IS a button whose accessible name is the icon name
        card.setAttribute('aria-label', `Copy ${name} icon SVG`);

        // Icon well: the factory returns a full standalone <svg …> string —
        // injected verbatim (package-authored markup, same trust boundary as
        // the library itself)
        const well = document.createElement('span');
        well.className = 'well';
        well.innerHTML = factory({ size: currentSize });
        card.appendChild(well);

        const nameNode = document.createElement('span');
        nameNode.className = 'name';
        nameNode.textContent = name;
        card.appendChild(nameNode);

        // Click → copy the DEFAULT-size standalone markup (size: default
        // '1em' scales with the consumer's font, the most reusable form)
        card.addEventListener('click', () => {
            copyText(factory());
            showToast(`Copied ${name} SVG`);
        });

        galleryMount.appendChild(card);
    });
};

// ── tiny local iteration helper ──────────────────────────────────────────────
// forEach-shaped callback loop (index + value) without pulling
// @presource/core into the UI bundle — the showcase stays dependency-light
const arrayEach = <T,>(items: T[], callback: (value: T, index: number) => void): void => {
    items.forEach((value, index) => callback(value, index));
};

// ── boot ─────────────────────────────────────────────────────────────────────

renderToolbar();
renderGallery();
