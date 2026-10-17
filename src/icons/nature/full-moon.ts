/**
 * full-moon — SKY icon: full moon disk with carved crater holes
 * (evenodd), distinct from the crescents (moon.ts, crescent-moon.ts).
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// evenodd variant of svg-icon.ts flatPath (svg-icon.ts:101): crater
// subpaths carve explicit holes regardless of winding
const flatPathEvenOdd = (d: string): string =>
    `<path d="${d}" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;

// circle-as-path helper: two 180° clockwise arcs from (cx-r,cy)
const circlePath = (cx: number, cy: number, r: number): string =>
    `M${cx - r} ${cy}a${r} ${r} 0 1 1 ${2 * r} 0a${r} ${r} 0 1 1 ${-2 * r} 0z`;

export const ICON_FULL_MOON =
    // Disk and craters share one fill operation: an opaque circle underlay
    // would fill every intended hole (../svg-icon.ts flat-shell contract).
    flatPathEvenOdd(
        circlePath(12, 12, 8.2) + circlePath(9.2, 10, 1.9) +
            circlePath(14.6, 14.8, 1.5) +
            circlePath(15.4, 8.2, 1.0) +
            circlePath(8.4, 15.8, 0.9)
    );

// String layer: registers 'fullMoon' + bound factory (svg-icon.ts)
export const svgFullMoon: SvgIconFactory = createSvgIcon('fullMoon', ICON_FULL_MOON);

// React layer: same geometry through the shared flat shell (react.tsx)
export const FullMoonIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'fullMoon', content: ICON_FULL_MOON, ...props });
