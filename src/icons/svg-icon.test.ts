/**
 * svg-icon.test.ts — deterministic tests for the STRING layer machinery
 * (./svg-icon.ts): the iconRegistry accessor, the svgIcon renderer output
 * contract, svgIconDataUri, and createSvgIcon registration semantics.
 *
 * EXPECTED VALUES: every expected string is composed from the documented
 * OUTPUT CONTRACT in svg-icon.ts (fixed attribute emission order:
 * xmlns → viewBox → width → height → fill → [class] → [extra attributes…],
 * then the definition content verbatim inside the shell) and each composed
 * value was verified against the real runtime via a scratch probe under the
 * repo-root Temp/ directory. svgIcon is pure, so these are exact pins.
 *
 * CONTRACTS PINNED:
 *   1. Default render of a built-in (check) — exact full string, identical
 *      through the bound factory (svgCheck) and the registry path (svgIcon).
 *   2. Option plumbing: size (number → px suffix, string verbatim), fill
 *      override on the shell, className emitted right after the fixed
 *      attributes, extra attributes emitted last with &-then-" escaping.
 *   3. Safe failure: unknown names and non-string names → '' (never throw).
 *      The non-string guard exists because iconRegistry(<non-string>)
 *      returns the WHOLE registry map (objectRegistry edge case, see the
 *      registry test below) — svgIcon string-checks BEFORE lookup.
 *   4. svgIconDataUri = 'data:image/svg+xml,' + encodeURIComponent(default).
 *   5. createSvgIcon registers the name and binds a working factory;
 *      re-registering the same name REPLACES the entry (last registration
 *      wins) and even the OLD bound factory re-reads the live registry.
 *   6. iconRegistry accessor: get returns the stored definition, unknown
 *      names return undefined, non-string keys return the raw map.
 *   7. flatPath (the shared flat-design markup helper exported from
 *      svg-icon.ts): wraps a raw path `d` in exactly
 *      `<path d="…" fill="currentColor" stroke="none"/>`, and the check
 *      definition (one flatPath call in generic/check.ts) appears VERBATIM
 *      inside the rendered svgCheck() output.
 *
 * NOTE on test isolation: ./generic/check is imported for BOTH the built-in
 * 'check' registration side effect (createSvgIcon runs at module load) and
 * the ICON_CHECK geometry — the per-icon file replaces the deleted
 * definitions.ts/icons.ts pair. Vitest gives this file its own module
 * registry, so the 'temp-custom' registrations below never leak into the
 * sibling icons.test.ts / react.test.tsx suites.
 */
import { describe, expect, it } from 'vitest';
import { objectHasKey } from '@presource/core';
import {
    createSvgIcon,
    DEFAULT_VIEW_BOX,
    flatPath,
    iconRegistry,
    svgIcon,
    svgIconDataUri,
} from './svg-icon';
// The per-icon file is the single import source now: loading it performs the
// 'check' registration side effect AND exports the ICON_CHECK geometry +
// the svgCheck bound factory (see generic/check.ts header).
import { ICON_CHECK, svgCheck } from './generic/check';

// ── expected-string scaffolding (encodes the documented OUTPUT CONTRACT) ────
// Fixed opening attributes, in the renderer's exact emission order
// (svg-icon.ts parts array: xmlns, viewBox, width, height, fill).
const FIXED_ATTRS = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"';
// The check definition's inner markup (generic/check.ts: ICON_CHECK is ONE
// flatPath call — one flat path carrying the per-element presentation
// attributes). Pinned as a literal so any change to the geometry or the
// flatPath helper fails loudly here.
const CHECK_CONTENT =
    '<path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" fill="currentColor" stroke="none"/>';
// Full standalone shell — svgIcon assembles exactly `<svg ${parts.join(' ')}>${content}</svg>`.
const shell = (attributes: string, content: string): string => `<svg ${attributes}>${content}</svg>`;

const CHECK_DEFAULT = shell(`${FIXED_ATTRS} width="1em" height="1em" fill="currentColor"`, CHECK_CONTENT);
const CHECK_SIZE_32PX = shell(`${FIXED_ATTRS} width="32px" height="32px" fill="currentColor"`, CHECK_CONTENT);
const CHECK_SIZE_2EM = shell(`${FIXED_ATTRS} width="2em" height="2em" fill="currentColor"`, CHECK_CONTENT);
const CHECK_FILL_RED = shell(`${FIXED_ATTRS} width="1em" height="1em" fill="red"`, CHECK_CONTENT);
// class sits immediately after the fixed attributes, before extras
const CHECK_CLASS_FOO = shell(`${FIXED_ATTRS} width="1em" height="1em" fill="currentColor" class="foo"`, CHECK_CONTENT);
// data-x emitted LAST (attributes win by clear precedence); value escaped
// with & first, then " — the escaping ORDER is the correctness contract.
const CHECK_DATA_X = shell(
    `${FIXED_ATTRS} width="1em" height="1em" fill="currentColor" data-x="a&amp;b&quot;c"`,
    CHECK_CONTENT
);
// svgIconDataUri('check') = prefix + encodeURIComponent(CHECK_DEFAULT)
// (captured verbatim from the runtime probe).
const CHECK_DATA_URI =
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%221em%22%20height%3D%221em%22%20fill%3D%22currentColor%22%3E%3Cpath%20d%3D%22M9%2016.2%204.8%2012l-1.4%201.4L9%2019%2021%207l-1.4-1.4z%22%20fill%3D%22currentColor%22%20stroke%3D%22none%22%2F%3E%3C%2Fsvg%3E';

describe('svgIcon output contract', () => {
    it('renders a built-in with the exact default shell, identically via factory and registry lookup', () => {
        expect(svgCheck()).toBe(CHECK_DEFAULT);
        expect(svgIcon('check')).toBe(CHECK_DEFAULT);
    });

    it('uses the shared 24×24 default viewBox constant', () => {
        expect(DEFAULT_VIEW_BOX).toBe('0 0 24 24');
    });

    it('resolves size: number → px suffix, string → verbatim (width AND height)', () => {
        expect(svgCheck({ size: 32 })).toBe(CHECK_SIZE_32PX);
        expect(svgCheck({ size: '2em' })).toBe(CHECK_SIZE_2EM);
    });

    it('lets the fill option override the shell default (content keeps its own fills)', () => {
        expect(svgCheck({ fill: 'red' })).toBe(CHECK_FILL_RED);
    });

    it('emits className as class right after the fixed attributes', () => {
        expect(svgCheck({ className: 'foo' })).toBe(CHECK_CLASS_FOO);
    });

    it('emits extra attributes last, escaping & first then " (order contract)', () => {
        expect(svgCheck({ attributes: { 'data-x': 'a&b"c' } })).toBe(CHECK_DATA_X);
    });

    it('returns the empty string for unknown names (never throws)', () => {
        expect(svgIcon('does-not-exist')).toBe('');
    });

    it('returns the empty string for non-string names (isString guard BEFORE registry access)', () => {
        // iconRegistry(<non-string>) would return the whole map — svgIcon
        // guards first, so the cast undefined degrades to '' instead.
        expect(svgIcon(undefined as unknown as string)).toBe('');
    });

    it('encodes the default render as a data: URI (encodeURIComponent of the SVG string)', () => {
        expect(svgIconDataUri('check')).toBe(CHECK_DATA_URI);
    });
});

describe('flatPath helper', () => {
    it('wraps a raw path d in exactly the flat-design element markup', () => {
        // Exact pin: verbatim d interpolation, fixed fill/stroke pair, no
        // extra whitespace or elements (svg-icon.ts flatPath definition).
        expect(flatPath('M1 2')).toBe('<path d="M1 2" fill="currentColor" stroke="none"/>');
    });

    it('produces the check definition verbatim — ICON_CHECK IS one flatPath call', () => {
        // generic/check.ts builds ICON_CHECK via a single flatPath(…);
        // assert equality against a fresh flatPath call over the raw d AND
        // the pinned CHECK_CONTENT literal, so the per-icon geometry and
        // the helper stay locked together.
        expect(ICON_CHECK).toBe(flatPath('M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z'));
        expect(ICON_CHECK).toBe(CHECK_CONTENT);
    });

    it('flatPath output appears VERBATIM inside the svgCheck() render', () => {
        // Compose the FULL expected default shell from a flatPath call:
        // equality proves the flatPath output is the entire inner content
        // of the render — verbatim, nothing added, escaped or trimmed.
        expect(svgCheck()).toBe(
            shell(
                `${FIXED_ATTRS} width="1em" height="1em" fill="currentColor"`,
                flatPath('M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z')
            )
        );
    });
});

describe('createSvgIcon registration lifecycle', () => {
    it('registers the name, binds a working factory, and last registration wins', () => {
        // Register a custom icon — the name becomes resolvable via svgIcon
        // immediately, and the returned bound factory renders it too.
        const svgTempCustom = createSvgIcon('temp-custom', '<circle cx="12" cy="12" r="4"/>');
        const TEMP_CIRCLE = shell(
            `${FIXED_ATTRS} width="1em" height="1em" fill="currentColor"`,
            '<circle cx="12" cy="12" r="4"/>'
        );
        expect(svgIcon('temp-custom')).toBe(TEMP_CIRCLE);
        expect(svgTempCustom()).toBe(TEMP_CIRCLE);
        // Options flow through the bound factory like any built-in.
        expect(svgTempCustom({ size: 8 })).toBe(
            shell(`${FIXED_ATTRS} width="8px" height="8px" fill="currentColor"`, '<circle cx="12" cy="12" r="4"/>')
        );

        // Re-registering the SAME name REPLACES the entry (idempotent
        // singleton registry — last registration wins, e.g. hot reloads).
        createSvgIcon('temp-custom', '<rect x="4" y="4" width="16" height="16"/>');
        const TEMP_RECT = shell(
            `${FIXED_ATTRS} width="1em" height="1em" fill="currentColor"`,
            '<rect x="4" y="4" width="16" height="16"/>'
        );
        expect(svgIcon('temp-custom')).toBe(TEMP_RECT);
        // The OLD factory is a pure re-read of the LIVE registry, so it
        // reflects the replacement too (svg-icon.ts re-registration note).
        expect(svgTempCustom()).toBe(TEMP_RECT);
    });
});

describe('iconRegistry accessor', () => {
    it('returns the stored definition for a registered name', () => {
        expect(iconRegistry('check')).toEqual({ content: ICON_CHECK, viewBox: '0 0 24 24' });
    });

    it('returns undefined for an unregistered name', () => {
        expect(iconRegistry('nope')).toBe(undefined);
    });

    it('returns the WHOLE registry map for a non-string key (objectRegistry edge case)', () => {
        // objectRegistry's typeSwitch falls through non-string keys to its
        // default case, which returns the raw registry object — the SAME
        // reference as the no-arg call. Consumers must string-guard before
        // lookup (svgIcon and VisualIcon both do).
        const raw = iconRegistry(undefined as unknown as string);
        expect(raw).toBe(iconRegistry());
        // And the raw map really is the registry: it holds the registered
        // 'check' definition as an own key.
        expect(objectHasKey(raw as { [key: string]: unknown }, 'check')).toBe(true);
    });
});
