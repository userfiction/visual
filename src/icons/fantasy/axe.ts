/**
 * axe — FANTASY icon: axe (single-bit blade on a vertical haft).
 *
 * GEOMETRY: haft = 2px bar (x 11..13, y 4..21); blade = lens shape attached
 * to the haft's right side, sweeping from (13,3) out to the point (21,7)
 * and back to (13,11) — the two quadratics bulge outward so the cutting
 * edge reads as the rightmost point. Same winding family, no holes.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_AXE = flatPath('M11 4H13V21H11ZM13 3Q20 3.5 21 7Q20 10.5 13 11Z');

export const svgAxe: SvgIconFactory = createSvgIcon('axe', ICON_AXE);

export const AxeIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'axe', content: ICON_AXE, ...props });
