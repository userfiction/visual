/**
 * eclipse — SKY icon: hollow solar corona and eight flares. Unlike sun.ts,
 * the center is transparent, so both light and dark themes show the void.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// circle-as-path helper (full-moon.ts family)
const circlePath = (cx: number, cy: number, r: number): string =>
    `M${cx - r} ${cy}a${r} ${r} 0 1 1 ${2 * r} 0a${r} ${r} 0 1 1 ${-2 * r} 0z`;

// Corona flare spike: triangle tip at radius `tip` on angle `deg`,
// base at radius `base` spanning ±`spread` degrees — base chord sits
// inside the annulus inner edge (6.8 < 7.4) so spikes weld to the ring
const spike = (deg: number, tip: number, base: number, spread: number): string => {
    const a = ((deg - spread) * Math.PI) / 180, b = ((deg + spread) * Math.PI) / 180;
    const t = (deg * Math.PI) / 180;
    return (
        `M${(12 + tip * Math.cos(t)).toFixed(2)} ${(12 + tip * Math.sin(t)).toFixed(2)}` +
        `L${(12 + base * Math.cos(a)).toFixed(2)} ${(12 + base * Math.sin(a)).toFixed(2)}` +
        `L${(12 + base * Math.cos(b)).toFixed(2)} ${(12 + base * Math.sin(b)).toFixed(2)}z`
    );
};

export const ICON_ECLIPSE =
    // corona ring: outer r 9 subpath + REVERSED inner r 7.4 subpath —
    // evenodd winding count 2 inside the disk → hole, leaving the band
    '<path d="' + (
        circlePath(12, 12, 9) +
            'M4.6 12a7.4 7.4 0 1 0 14.8 0a7.4 7.4 0 1 0 -14.8 0z'
    ) + '" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    // eight flares at 45° steps: tips r 10.9, bases r 6.8, ±14° spread
    flatPath(
        spike(0, 10.9, 6.8, 14) + spike(45, 10.9, 6.8, 14) +
            spike(90, 10.9, 6.8, 14) + spike(135, 10.9, 6.8, 14) +
            spike(180, 10.9, 6.8, 14) + spike(225, 10.9, 6.8, 14) +
            spike(270, 10.9, 6.8, 14) + spike(315, 10.9, 6.8, 14)
    );
// No opaque disk: ring and spikes union only at their rims; the center
// remains unpainted rather than using a baked-in background color.

// String layer: registers 'eclipse' + bound factory (svg-icon.ts)
export const svgEclipse: SvgIconFactory = createSvgIcon('eclipse', ICON_ECLIPSE);

// React layer: same geometry through the shared flat shell (react.tsx)
export const EclipseIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'eclipse', content: ICON_ECLIPSE, ...props });
