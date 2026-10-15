/**
 * svg-icon — the STRING layer machinery of @userfiction/visual: a named
 * registry for icon definitions plus renderers that turn a registered name
 * into standalone SVG markup (no React, no DOM — plain strings).
 *
 * FILE ARCHITECTURE (cross-reference: ../icons barrel):
 *   svg-icon.ts      — THIS FILE: registry + svgIcon/svgIconDataUri renderers
 *                      + createSvgIcon (register-and-bind factory helper)
 *                      + flatPath (shared flat-design markup helper)
 *   react.tsx        — React shell machinery (IconBase/VisualIcon/props)
 *   generic/*.ts     — ONE FILE PER GENERIC ICON (check.ts, close.ts, …):
 *                      each exports the ICON_<NAME> geometry, the svg<Name>
 *                      string factory and the <Name>Icon React component;
 *                      generic/index.ts is the sub-barrel
 *   fantasy/*.ts     — same per-icon pattern for the fantasy set (sword,
 *                      wand, …); fantasy/index.ts is the sub-barrel
 *   builtins.ts      — the svgIcons discovery map over ALL per-icon files
 *
 * REGISTRY: backed by `objectRegistry` from @presource/core
 * (packages/presource/core/src/object/registry.ts) — the same backing
 * @rightless/icons uses for svgRegistry. Behaviors relied on here:
 *   iconRegistry('name')              → the stored IconDefinition | undefined
 *   iconRegistry('name', definition)  → set one entry (returns the accessor)
 *   iconRegistry()                    → the raw map { name: IconDefinition }
 *
 * EDGE CASE (inherited from objectRegistry): calling iconRegistry(<non-
 * string>) returns the WHOLE registry map — consumers must guard non-string
 * names BEFORE lookup. svgIcon/VisualIcon both do this via isString first.
 *
 * WHY MODULE-LEVEL SINGLETON: icon definitions are static immutable strings;
 * one shared registry keeps every createSvgIcon call across the app
 * idempotent (re-registering the same name simply overwrites the entry —
 * last registration wins, including duplicate imports and hot reloads).
 *
 * PURE DATA: the registry stores plain strings only — no React nodes, no DOM
 * references — so the same definitions serialize to any target (innerHTML,
 * standalone .svg files, data URIs, email templates).
 */
import {
    isInvalid,
    isNumber,
    isObject,
    isString,
    objectEach,
    objectEnsures,
    objectRegistry,
    toString,
} from '@presource/core';

/** The value stored for every registered icon name. */
export type IconDefinition = {
    /** Inner SVG markup (everything between <svg> and </svg>), e.g. `<path d="..."/>`. */
    content: string;
    /** The SVG viewBox, e.g. '0 0 24 24'. Preserves the icon's coordinate system. */
    viewBox: string;
};

/** Shape of the raw registry map: icon name → definition. */
export type IconMap = { [name: string]: IconDefinition };

/**
 * Full accessor type for the icon registry, mirroring objectRegistry's
 * polymorphic overloads but typed against IconDefinition.
 */
export type IconRegistryAccessor = {
    (name: string, definition: IconDefinition): IconRegistryAccessor;
    (name: string): IconDefinition | undefined;
    (updates: Partial<IconMap>): IconRegistryAccessor;
    (): IconMap;
};

/**
 * The shared icon registry. Kept untyped at creation (objectRegistry is
 * `any`-valued) then annotated with the typed accessor surface above.
 */
export const iconRegistry = objectRegistry() as IconRegistryAccessor;

// Default coordinate system shared by svgIcon (lookup fallback), createSvgIcon
// (creation default) and react.tsx (IconBase default). 24×24 matches every
// built-in icon (see the generic/ and fantasy/ per-icon files).
export const DEFAULT_VIEW_BOX = '0 0 24 24';

/**
 * flatPath — shared FLAT-DESIGN markup helper for the per-icon definition
 * files (generic/*.ts, fantasy/*.ts).
 *
 * Wraps one path's `d` attribute with the per-element presentation attributes
 * every icon in this package carries (see the flat-design convention in each
 * icon file): SOLID FILL in currentColor with stroke disabled — no outlines,
 * no gradients, no baked-in color.
 *
 * Kept PER-ELEMENT (not on the <svg> shell) so every definition string is
 * self-contained and portable — the same markup renders standalone (svgIcon)
 * and inside the React shell (IconBase, whose shell-level fill="currentColor"
 * stroke="none" matches but never overrides the per-element attributes).
 *
 * Non-path elements (circles, rects — e.g. the sword pommel, scroll rolls)
 * are written as literal elements in the icon files with the same attribute
 * pair, so the convention stays uniform without a helper per element type.
 */
export const flatPath = (d: string): string => `<path d="${d}" fill="currentColor" stroke="none"/>`;

/**
 * Registers `definition` under `name` and returns a BOUND generator:
 * options → standalone SVG string for that one icon.
 *
 * This is the primary authoring API — used by icons.ts for every built-in
 * and available to consumers for CUSTOM icons (a fiction plugin registering
 * its own glyph at runtime):
 *
 *   const svgSpark = createSvgIcon('spark', '<path d="..."/>');
 *   svgSpark();                     // → '<svg …>…</svg>'
 *   svgSpark({ size: 32 });         // → 32px variant
 *
 * The returned factory re-reads the registry on every call, so
 * re-registering the same name is reflected everywhere and is idempotent —
 * the last registration wins. Registration happens ONCE per call here; the
 * factory itself is a pure read (tree-shaking safe — unused factories, and
 * their registrations, are dropped entirely under "sideEffects": false).
 *
 * @param name       - Registry key, e.g. 'check'
 * @param content    - Inner SVG markup, e.g. `<path d="M4 12 L20 12"/>`
 * @param viewBox    - Coordinate system (default '0 0 24 24')
 */
export type SvgIconFactory = (options?: SvgIconOptions) => string;

export const createSvgIcon = (
    name: string,
    content: string,
    viewBox: string = DEFAULT_VIEW_BOX
): SvgIconFactory => {
    // Register so <name> is also reachable via svgIcon/svgIconDataUri directly
    iconRegistry(name, { content, viewBox });

    // Bound factory: resolves the LATEST registry entry for the name on each
    // call (see re-registration note above)
    return (options?: SvgIconOptions) => svgIcon(name, options);
};

/** Options accepted by svgIcon / svgIconDataUri / createSvgIcon factories. */
export type SvgIconOptions = {
    /** Icon size: number → px, string → verbatim (default '1em'). Applied to width and height. */
    size?: string | number;
    /** SVG fill attribute (default 'currentColor'). */
    fill?: string;
    /** Shorthand for the class attribute. */
    className?: string;
    /** Arbitrary extra attributes merged in last (per-key order). */
    attributes?: { [key: string]: string };
};

// Fallbacks applied when the corresponding option is missing/invalid
const DEFAULT_SIZE = '1em';
const DEFAULT_FILL = 'currentColor';

// Local empty-string constant — @presource/core has no EMPTY_STRING export
// (packages/presource/core/src/constants/index.ts is empty; verified at
// runtime by @rightless/icons, see its svg-string.ts note)
const EMPTY_STRING = '';

/**
 * Escapes an attribute VALUE for safe embedding in a double-quoted attribute.
 * `&` must be escaped BEFORE `"` so the entities introduced here are not
 * themselves re-escaped (order is the correctness contract, not style).
 *
 * Global-regex replace instead of replaceAll: the shared root tsconfig lib
 * stops at es2015 (tsconfig.json line 14) and String.replaceAll needs es2021.
 */
const escapeAttributeValue = (value: string): string =>
    value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

/**
 * Normalizes the `size` option into a width/height attribute string.
 * Numbers are assumed to be pixels; strings pass through untouched;
 * missing/invalid values fall back to '1em' (scales with font size).
 */
const resolveSize = (size?: string | number): string => {
    if (isInvalid(size)) return DEFAULT_SIZE;
    if (isNumber(size)) return `${size}px`;
    if (isString(size)) return size;
    return DEFAULT_SIZE;
};

/**
 * Renders the registered icon `name` as a full standalone SVG string.
 *
 * OUTPUT CONTRACT (deterministic attribute order, critical for tests):
 *   <svg xmlns viewBox width height fill [class] [extra attributes…]>content</svg>
 *
 * - `xmlns` is always included so the output is a valid STANDALONE .svg file
 *   (writable to disk, fetchable as an image) and harmless when inlined.
 * - `fill` defaults to 'currentColor' so inline usage inherits text color;
 *   a standalone file with currentColor renders black, which is the expected
 *   default there.
 * - Unknown or non-string names return EMPTY_STRING (never throws) so bulk
 *   exports and template interpolation stay safe.
 * - Custom rendering (fill color, aria labels, …) goes through
 *   `options.attributes`, which always win because they are emitted last.
 */
export const svgIcon = (name: string, options?: SvgIconOptions): string => {
    // Guard BEFORE registry access: iconRegistry(non-string) would return the
    // entire registry map (see EDGE CASE in the registry comment above)
    if (!isString(name)) return EMPTY_STRING;

    const entry = iconRegistry(name);
    if (isInvalid(entry)) return EMPTY_STRING;

    // options may be undefined — objectEnsures coerces it to a plain object
    const { size, fill, className, attributes } = objectEnsures(options);

    // Attributes assembled in fixed order (see OUTPUT CONTRACT above)
    const parts: string[] = [
        'xmlns="http://www.w3.org/2000/svg"',
        `viewBox="${escapeAttributeValue(toString(entry.viewBox))}"`,
        `width="${resolveSize(size)}"`,
        `height="${resolveSize(size)}"`,
        `fill="${escapeAttributeValue(toString(fill ?? DEFAULT_FILL))}"`,
    ];

    // class shorthand sits right after the fixed attributes
    if (isString(className)) parts.push(`class="${escapeAttributeValue(className)}"`);

    // Extra attributes last → they override nothing structurally but signal
    // clear precedence for consumers scanning the markup.
    // isObject guard: attributes is undefined when no options were passed and
    // objectEach(undefined, …) throws "Cannot convert undefined or null to
    // object" (objectEach does a raw Object.keys on its first argument)
    if (isObject(attributes)) {
        objectEach(attributes, ({ key, value }) => {
            parts.push(`${key}="${escapeAttributeValue(toString(value))}"`);
        });
    }

    // Content is developer-authored SVG markup — interpolated verbatim (it IS
    // markup, not text; escaping it would break the icon)
    return `<svg ${parts.join(' ')}>${entry.content}</svg>`;
};

/**
 * Renders the registered icon as a `data:` URI — immediately usable in CSS
 * (`background-image: url(...)`) or as an <img> src without extra files.
 * encodeURIComponent escapes every character that is unsafe inside a URI.
 */
export const svgIconDataUri = (name: string, options?: SvgIconOptions): string =>
    `data:image/svg+xml,${encodeURIComponent(svgIcon(name, options))}`;
