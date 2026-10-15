/**
 * react.test.tsx — deterministic tests for the React layer: the IconBase
 * flat shell defaults (react.tsx machinery), size plumbing,
 * spread-props-after-defaults precedence, the registry-driven VisualIcon,
 * and per-component spot checks over the ONE-FILE-PER-ICON architecture.
 *
 * IMPORT SOURCES (post-restructure): per-icon components live in their own
 * files — CheckIcon in ./generic/check, CloseIcon in ./generic/close,
 * BookIcon in ./generic/book, DownloadIcon in ./generic/download,
 * SwordIcon in ./fantasy/sword, GemIcon in ./fantasy/gem — each built with
 * React.createElement(IconBase, …) so the per-icon files stay .ts. The old
 * ./icons barrel and ./definitions module are DELETED; ./react.tsx now
 * exports only the machinery (IconBase/VisualIcon + IconProps types).
 *
 * IMPORT ORDER: ./builtins is imported FIRST among icon modules — loading
 * the svgIcons map performs the registration side effects for ALL 33
 * built-ins (builtins.ts pulls the generic/ + fantasy/ sub-barrels; react.tsx
 * does no registration of its own), which is what VisualIcon resolves
 * against at render time. LOAD-BEARING: svgIcons must actually be USED
 * below — esbuild elides unused imports in TS files, which would skip the
 * ./builtins module evaluation entirely and leave the registry empty.
 *
 * EXPECTED VALUES: attributes are asserted as exact strings; innerHTML
 * expectations are the hardcoded POST-SERIALIZATION forms of the per-icon
 * geometry constants — jsdom normalizes self-closing SVG elements when
 * serializing innerHTML (`<path …/>` reads back as `<path …></path>`,
 * attribute order preserved verbatim), verified against this exact jsdom
 * via a scratch probe under the repo-root Temp/ directory
 * (Temp/visual/probe3.ts, run with `npx vite-node Temp/visual/probe3.ts`
 * from the workspace root — jsdom imported explicitly there because plain
 * Node has no DOM). The `serialized()` probe below derives the same
 * normalized value from the geometry constant itself through the SAME DOM
 * machinery the components render through, so the React pipeline is pinned
 * to the per-icon files (single source of truth) AND to the literal string.
 *
 * QUERY STYLE: the svgs are aria-hidden by design (decorative-by-default),
 * so role-based queries would fail — the container.querySelector /
 * screen.getByTestId pattern below is the deliberate a11y-context choice.
 */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { svgIcon } from './svg-icon';
// FIRST: the built-in factory map import registers every name in the shared
// registry (builtins.ts side effects via the generic/ + fantasy/ sub-barrels)
// for VisualIcon lookups. LOAD-BEARING — see header note.
import { svgIcons } from './builtins';
// Per-icon files: each import performs that name's registration side effect
// AND exports the geometry constant + the React component.
import { ICON_CHECK, CheckIcon } from './generic/check';
import { ICON_CLOSE, CloseIcon } from './generic/close';
import { ICON_BOOK, BookIcon } from './generic/book';
import { ICON_DOWNLOAD, DownloadIcon } from './generic/download';
import { ICON_SWORD, SwordIcon } from './fantasy/sword';
import { ICON_GEM, GemIcon } from './fantasy/gem';
// LAST: the machinery module itself (IconBase/VisualIcon/IconProps). The
// per-icon files above already import it — the layering stays acyclic
// (machinery ← icons, see the react.tsx header).
import { VisualIcon } from './react';

// Offscreen probe: serializes a raw definition string through the SAME DOM
// machinery (innerHTML setter → parser → getter) the components render
// through, so expected and actual markup are compared post-normalization.
const probe = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const serialized = (markup: string): string => {
    probe.innerHTML = markup;
    return probe.innerHTML;
};

// Hardcoded post-serialization innerHTML pins (jsdom: `…/>` → `…></path>`
// and `…/>` → `…></circle>`, attribute order preserved) — probe-captured
// exact values from Temp/visual/probe3.ts, serializer-independent.
const CHECK_SERIALIZED =
    '<path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" fill="currentColor" stroke="none"></path>';
const BOOK_SERIALIZED =
    '<path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" fill="currentColor" stroke="none"></path>';
const CLOSE_SERIALIZED =
    '<path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" fill="currentColor" stroke="none"></path>';
const DOWNLOAD_SERIALIZED =
    '<path d="M11 4h2v8h3l-4 4-4-4h3zM5 18h14v2H5z" fill="currentColor" stroke="none"></path>';
// Sword = flat path element + literal non-path pommel <circle> (fantasy/sword.ts);
// BOTH elements appear in the serialized innerHTML, in definition order.
const SWORD_SERIALIZED =
    '<path d="M12 1L14.5 5V15H9.5V5ZM6 15H18V17.5H6ZM11 17.5H13V21H11Z" fill="currentColor" stroke="none"></path><circle cx="12" cy="22" r="1.5" fill="currentColor" stroke="none"></circle>';
const GEM_SERIALIZED =
    '<path d="M12 21L3 10L6 5H18L21 10Z" fill="currentColor" stroke="none"></path>';

describe('CheckIcon (per-icon file, IconBase shell defaults)', () => {
    it('renders the shared flat-design shell with decorative-by-default a11y', () => {
        const { container } = render(<CheckIcon />);
        const svg = container.querySelector('svg[data-icon="check"]');
        expect(svg).not.toBeNull();
        const el = svg as SVGSVGElement;
        // Default box: 16px square on the shared 24×24 grid
        expect(el.getAttribute('width')).toBe('16');
        expect(el.getAttribute('height')).toBe('16');
        expect(el.getAttribute('viewBox')).toBe('0 0 24 24');
        // Flat shell matches the per-element definition attributes
        expect(el.getAttribute('fill')).toBe('currentColor');
        expect(el.getAttribute('stroke')).toBe('none');
        // Decorative-by-default accessibility (controls own the names)
        expect(el.getAttribute('aria-hidden')).toBe('true');
        expect(el.getAttribute('focusable')).toBe('false');
        // Geometry: exactly the ICON_CHECK definition from generic/check.ts
        // (hardcoded literal pin)
        expect(el.innerHTML).toBe(CHECK_SERIALIZED);
        // …and the per-icon constant normalizes to the same exact string
        expect(el.innerHTML).toBe(serialized(ICON_CHECK));
    });

    it('sizes number props as px (width AND height stay locked together)', () => {
        const { container } = render(<CheckIcon size={24} />);
        const el = container.querySelector('svg[data-icon="check"]') as SVGSVGElement;
        expect(el.getAttribute('width')).toBe('24');
        expect(el.getAttribute('height')).toBe('24');
    });

    it('sizes string props verbatim (text-relative sizing)', () => {
        const { container } = render(<CheckIcon size="1em" />);
        const el = container.querySelector('svg[data-icon="check"]') as SVGSVGElement;
        expect(el.getAttribute('width')).toBe('1em');
        expect(el.getAttribute('height')).toBe('1em');
    });
});

describe('CloseIcon (spread props land AFTER the shell defaults)', () => {
    it('forwards className and data hooks onto the svg element', () => {
        render(<CloseIcon className="xyz" data-testid="x" />);
        const el = screen.getByTestId('x');
        expect(el.getAttribute('class')).toBe('xyz');
        expect(el.getAttribute('data-icon')).toBe('close');
        // Geometry flows from the per-icon file exactly like the shell props
        expect(el.innerHTML).toBe(CLOSE_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_CLOSE));
    });

    it('lets a consumer override the decorative a11y defaults', () => {
        const { container } = render(<CloseIcon aria-hidden="false" aria-label="Close" />);
        const el = container.querySelector('svg[data-icon="close"]') as SVGSVGElement;
        // Spread props win over the defaults (applied after them in IconBase)
        expect(el.getAttribute('aria-hidden')).toBe('false');
        expect(el.getAttribute('aria-label')).toBe('Close');
    });
});

describe('VisualIcon (registry-driven render-any)', () => {
    it('renders a registered name through the shared registry', () => {
        // svgIcons was imported (and used) — 'check' is registered by now
        const { container } = render(<VisualIcon name="check" />);
        const el = container.querySelector('svg[data-icon="check"]') as SVGSVGElement;
        expect(el.innerHTML).toBe(CHECK_SERIALIZED);
        // Cross-layer pin: the registry entry VisualIcon reads produces the
        // exact same string markup as the builtins.ts factory for that name.
        // svgIcons stores createSvgIcon's BOUND factory, so ONE call renders
        // (probe-verified: typeof svgIcons.check() === 'string').
        expect(svgIcon('check')).toBe(svgIcons.check());
    });

    it('renders nothing for an unregistered name (no empty svg shell)', () => {
        const { container } = render(<VisualIcon name="never-registered-x" />);
        expect(container.innerHTML).toBe('');
    });

    it('renders nothing for a non-string name (isString guard before registry access)', () => {
        // iconRegistry(<non-string>) would return the whole map — VisualIcon
        // string-checks first and returns null instead of a broken render.
        const { container } = render(<VisualIcon name={undefined as unknown as string} />);
        expect(container.innerHTML).toBe('');
    });
});

describe('per-component spot checks (one file per icon)', () => {
    it('BookIcon renders the book definition on its machine hook', () => {
        const { container } = render(<BookIcon />);
        const el = container.querySelector('svg[data-icon="book"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        expect(el.innerHTML).toBe(BOOK_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_BOOK));
    });

    it('DownloadIcon renders with its machine hook', () => {
        const { container } = render(<DownloadIcon />);
        const el = container.querySelector('svg[data-icon="download"]') as SVGSVGElement;
        expect(el.getAttribute('data-icon')).toBe('download');
        expect(el.innerHTML).toBe(DOWNLOAD_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_DOWNLOAD));
    });

    it('SwordIcon renders the sword definition including the pommel circle element', () => {
        const { container } = render(<SwordIcon />);
        const el = container.querySelector('svg[data-icon="sword"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        // The fantasy geometry is TWO elements (flatPath blade/guard/grip path
        // + literal pommel <circle>) — both must survive the React shell
        // (dangerouslySetInnerHTML) and the jsdom serialization intact, in
        // definition order: path first, circle second.
        expect(el.innerHTML).toBe(SWORD_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_SWORD));
    });

    it('GemIcon renders the gem definition on its machine hook', () => {
        const { container } = render(<GemIcon />);
        const el = container.querySelector('svg[data-icon="gem"]') as SVGSVGElement;
        expect(el).not.toBeNull();
        expect(el.innerHTML).toBe(GEM_SERIALIZED);
        expect(el.innerHTML).toBe(serialized(ICON_GEM));
    });
});

describe('React layer ↔ string layer integration (fantasy icon)', () => {
    it('VisualIcon name="sword" renders exactly the serialized string-layer geometry', () => {
        // One name resolves in BOTH layers: the React render-any path pulls
        // the same fantasy/sword.ts definition the string layer (svgSword →
        // svgIcon) renders — agreement is the cross-layer contract.
        const { container } = render(<VisualIcon name="sword" />);
        const el = container.querySelector('svg[data-icon="sword"]') as SVGSVGElement;
        expect(el.innerHTML).toBe(serialized(ICON_SWORD));
        expect(el.innerHTML).toBe(SWORD_SERIALIZED);
    });
});
