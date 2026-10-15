/**
 * react — React shell machinery for @userfiction/visual: IconBase (the
 * shared flat-design shell) and VisualIcon (registry-driven render-any).
 *
 * PER-ICON COMPONENTS live in the per-icon files (generic/*.ts, fantasy/*.ts)
 * — one file per icon exports the geometry (ICON_<NAME>), the string factory
 * (svg<Name>) AND its React component (<Name>Icon, built with
 * React.createElement so the per-icon file stays a .ts file). Those files
 * import THIS module's IconBase; there is no reverse import, so the layering
 * stays acyclic (machinery ← icons).
 *
 * TREE-SHAKING: importing a single icon component (e.g. `CheckIcon` from the
 * barrel) pulls exactly that icon's file — its geometry, factory and
 * registration — plus this machinery module, nothing else (package.json
 * "sideEffects": false completes the contract).
 *
 * NAMING: components are PascalCase + "Icon" suffix (CheckIcon); VisualIcon
 * resolves names through the shared registry ('check') — the same key
 * svgIcon and the builtins.ts svgIcons map use, so one name resolves in both
 * layers. Registry visibility trade-off: a built-in name is only resolvable
 * via VisualIcon once its per-icon module has been loaded — importing the
 * barrel or the svgIcons map registers every built-in.
 */
import React from 'react';
import { isInvalid, isString } from '@presource/core';
import { iconRegistry, DEFAULT_VIEW_BOX } from './svg-icon';

/**
 * Props accepted by every icon component: `size` is the edge of the square
 * box (width + height stay locked — icons draw on a square grid); number →
 * px, string → verbatim CSS ('1em' scales with font size). Everything else
 * forwards onto the <svg> element AFTER the defaults (className for
 * styledComponent composition, data hooks, a11y overrides, event handlers…).
 */
export type IconProps = Omit<React.SVGProps<SVGSVGElement>, 'children'> & {
    size?: number | string;
};

// IconBase props add the machine name (data-icon hook), the raw inner SVG
// markup, and an optional non-default coordinate system.
export type IconBaseProps = IconProps & {
    name: string;
    content: string;
    viewBox?: string;
};

// Default box edge — 16px square, matching the @rightless/icons shell this
// mirrors (inline-with-text usage). Pass size="1em" for text-relative sizing.
const DEFAULT_SIZE = 16;

/**
 * IconBase — the shared flat-design shell every built-in icon component
 * renders through.
 *
 * DESIGN CONTRACT (the flat counterpart of the @rightless/icons stroke
 * family shell):
 *   - every icon draws on the same 24×24 grid (DEFAULT_VIEW_BOX) with
 *     SOLID-FILL geometry — fill="currentColor" + stroke="none" at the shell
 *     level matches the per-element attributes carried by every definition
 *     (generic/*.ts, fantasy/*.ts), so any two icons sit side by side and
 *     read as one family
 *   - color is NEVER baked in: currentColor inherits the text color of the
 *     surrounding control
 *   - decorative-by-default accessibility: aria-hidden + focusable=false —
 *     controls carry their own labels; a consumer promoting an icon to
 *     meaningful content overrides via spread props (applied AFTER defaults)
 *   - data-icon carries the machine name — the stable test/integration hook
 *     (svg[data-icon="check"])
 *
 * MARKUP PIPELINE: geometry arrives as the raw inner-SVG definition string
 * (the per-icon files' ICON_<NAME> constants — single source of truth shared
 * with the string layer) and is injected via dangerouslySetInnerHTML. Content
 * is developer-authored markup inside the package — it IS markup, not text;
 * escaping it would break the icon. A consumer cannot override it (it is
 * applied after the props spread) — identity geometry is not a prop.
 *
 * TREE-SHAKING: this module has no side effects; per-icon components in the
 * per-icon files pull only the geometry they render.
 */
export const IconBase = ({
    name,
    content,
    viewBox = DEFAULT_VIEW_BOX,
    size = DEFAULT_SIZE,
    ...svgProps
}: IconBaseProps) => (
    <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="currentColor"
        stroke="none"
        aria-hidden="true"
        focusable="false"
        data-icon={name}
        {...svgProps}
        // Applied AFTER the props spread — the icon's geometry cannot be
        // swapped through props (see MARKUP PIPELINE note)
        dangerouslySetInnerHTML={{ __html: content }}
    />
);

/**
 * VisualIcon — renders ANY registered icon by name (the React counterpart
 * of svgIcon). Reads the LIVE registry per render, so icons registered at
 * runtime via createSvgIcon render without a dedicated component.
 *
 * Guard order matters: iconRegistry(non-string) would return the ENTIRE
 * registry map (see EDGE CASE in svg-icon.ts), so the name is string-checked
 * before lookup; unknown names render nothing instead of an empty <svg>
 * shell (never throws).
 */
export type VisualIconProps = IconProps & { name: string };

export const VisualIcon = ({ name, ...svgProps }: VisualIconProps) => {
    if (!isString(name)) return null;
    const entry = iconRegistry(name);
    if (isInvalid(entry)) return null;
    return <IconBase name={name} content={entry.content} viewBox={entry.viewBox} {...svgProps} />;
};
