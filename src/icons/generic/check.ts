/**
 * check — generic UI glyph: flat check mark (✓).
 *
 * GEOMETRY: thick check ribbon. Outer edge runs along x+y=28, inner edge
 * along x+y=25.2 → a constant 2px band (the flat-design weight); long arm
 * ends at (21,7), short arm at (4.8,12).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CHECK = flatPath('M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z');

// String layer: registers 'check' in the shared registry + bound factory
export const svgCheck: SvgIconFactory = createSvgIcon('check', ICON_CHECK);

// React layer: same geometry through the shared flat shell (createElement —
// the per-icon file stays a .ts file: one icon = one file, no JSX needed)
export const CheckIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'check', content: ICON_CHECK, ...props });
