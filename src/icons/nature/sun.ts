/**
 * sun — SKY icon: radiant sun (core disc + eight rays).
 *
 * GEOMETRY: core = circle r 4 at (12,12) drawn CLOCKWISE; rays = eight
 * thin solid wedges radiating from the core (drawn as their own
 * subpaths OUTSIDE the core disc, tips at r 9.6, bases at r 5.6 — N/S/E/W
 * rays plus the four diagonals, 45° steps; 9.6·cos45 ≈ 6.79, 5.6·cos45 ≈
 * 3.96); the ray subpaths sit outside the core so no winding tricks are
 * needed (a lone subpath paints its own fill).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Ray tip/base coordinates: eight directions at 45° steps; tips r 9.6,
// bases r 5.6 (cos45·9.6 ≈ 6.79, cos45·5.6 ≈ 3.96)
const RAYS: Array<[number, number]> = [
    [12, 2.4], [18.79, 5.21], [21.6, 12], [18.79, 18.79],
    [12, 21.6], [5.21, 18.79], [2.4, 12], [5.21, 5.21],
];
const BASES: Array<[number, number]> = [
    [12, 6.4], [15.96, 8.04], [17.6, 12], [15.96, 15.96],
    [12, 17.6], [8.04, 15.96], [6.4, 12], [8.04, 8.04],
];

// Each ray = a thin wedge: tip point → two base corners straddling the
// axis (offset ±0.7 perpendicular). Built per-ray from the direction.
const rayWedge = (tip: [number, number], base: [number, number]): string => {
    const dx = base[0] - tip[0];
    const dy = base[1] - tip[1];
    const len = Math.hypot(dx, dy);
    // perpendicular unit (±0.7 offset)
    const px = (-dy / len) * 0.7;
    const py = (dx / len) * 0.7;
    const c1 = [base[0] + px, base[1] + py];
    const c2 = [base[0] - px, base[1] - py];
    return (
        `M${tip[0]} ${tip[1]}L${c1[0].toFixed(2)} ${c1[1].toFixed(2)}L${c2[0].toFixed(2)} ${c2[1].toFixed(2)}z`
    );
};

export const ICON_SUN = flatPath(
    // core disc, clockwise
    'M8 12a4 4 0 1 1 8 0a4 4 0 1 1 -8 0z' +
        // eight ray wedges
        RAYS.map((tip, i) => rayWedge(tip, BASES[i])).join('')
);

// String layer: registers 'sun' in the shared registry + bound factory
export const svgSun: SvgIconFactory = createSvgIcon('sun', ICON_SUN);

// React layer: same geometry through the shared flat shell
export const SunIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'sun', content: ICON_SUN, ...props });
