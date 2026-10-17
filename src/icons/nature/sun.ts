/**
 * sun — SKY icon: radiant sun (uplift: bigger core + thicker rays).
 *
 * GEOMETRY: core = circle r 4.6 at (12,12) clockwise; rays = eight solid
 * wedges (subpaths OUTSIDE the core — a lone subpath paints its own fill,
 * same technique as the previous revision): tips r 10.2, bases r 6
 * (1.4 gap off the core edge), N/S/E/W + diagonals at 45° steps
 * (10.2·cos45 ≈ 7.21, 6·cos45 ≈ 4.24), wedge half-width ±0.9.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Ray tip/base coordinates: eight directions at 45° steps; tips r 10.2,
// bases r 6 (cos45·10.2 ≈ 7.21, cos45·6 ≈ 4.24)
const RAYS: Array<[number, number]> = [
    [12, 1.8], [19.21, 4.79], [22.2, 12], [19.21, 19.21],
    [12, 22.2], [4.79, 19.21], [1.8, 12], [4.79, 4.79],
];
const BASES: Array<[number, number]> = [
    [12, 6], [16.24, 7.76], [18, 12], [16.24, 16.24],
    [12, 18], [7.76, 16.24], [6, 12], [7.76, 7.76],
];

// Each ray = a thin wedge: tip point → two base corners straddling the
// axis (offset ±0.9 perpendicular — thicker than before for small sizes)
const rayWedge = (tip: [number, number], base: [number, number]): string => {
    const dx = base[0] - tip[0];
    const dy = base[1] - tip[1];
    const len = Math.hypot(dx, dy);
    // perpendicular unit (±0.9 offset)
    const px = (-dy / len) * 0.9;
    const py = (dx / len) * 0.9;
    const c1 = [base[0] + px, base[1] + py];
    const c2 = [base[0] - px, base[1] - py];
    return (
        `M${tip[0]} ${tip[1]}L${c1[0].toFixed(2)} ${c1[1].toFixed(2)}L${c2[0].toFixed(2)} ${c2[1].toFixed(2)}z`
    );
};

export const ICON_SUN = flatPath(
    // core disc, clockwise
    'M7.4 12a4.6 4.6 0 1 1 9.2 0a4.6 4.6 0 1 1 -9.2 0z' +
        // eight ray wedges
        RAYS.map((tip, i) => rayWedge(tip, BASES[i])).join('')
);

// String layer: registers 'sun' in the shared registry + bound factory
export const svgSun: SvgIconFactory = createSvgIcon('sun', ICON_SUN);

// React layer: same geometry through the shared flat shell
export const SunIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'sun', content: ICON_SUN, ...props });
