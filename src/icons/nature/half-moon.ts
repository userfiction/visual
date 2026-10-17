/**
 * half-moon — SKY icon: first-quarter half disk, flat vertical right
 * edge, with crater holes (distinct from the crescents and full-moon).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// evenodd variant of svg-icon.ts flatPath (svg-icon.ts:101) for crater holes
const flatPathEvenOdd = (d: string): string =>
    `<path d="${d}" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;

// circle-as-path helper (full-moon.ts family) reused for crater holes
const circlePath = (cx: number, cy: number, r: number): string =>
    `M${cx - r} ${cy}a${r} ${r} 0 1 1 ${2 * r} 0a${r} ${r} 0 1 1 ${-2 * r} 0z`;

export const ICON_HALF_MOON = flatPathEvenOdd(
    // lit half: left rim arc r 8 from top (12,4) counter-clockwise
    // (large 1, sweep 0, through (4,12)) to bottom (12,20), closed by the
    // straight vertical chord (flat terminator edge)
    'M12 4A8 8 0 0 0 12 20L12 4z' +
        // three disjoint crater holes inside the lit half (≥1.4 from rim
        // and chord)
        circlePath(8.6, 9.4, 1.5) +
        circlePath(9.8, 14.8, 1.1) +
        circlePath(7, 12.6, 0.7)
);

// String layer: registers 'halfMoon' + bound factory (svg-icon.ts)
export const svgHalfMoon: SvgIconFactory = createSvgIcon('halfMoon', ICON_HALF_MOON);

// React layer: same geometry through the shared flat shell (react.tsx)
export const HalfMoonIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'halfMoon', content: ICON_HALF_MOON, ...props });
