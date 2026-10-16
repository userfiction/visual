/**
 * sunflower — NATURE icon: sunflower (ray petals + seed-pattern disc +
 * stem + leaves).
 *
 * GEOMETRY: TWELVE ray petals = thin solid wedges radiating from the disc
 * (drawn as one zigzag ring outline around a center circle r 3.6 at
 * (12,7)); seed pattern = a COUNTERCLOCKWISE inner-dot hole ring (five
 * holes r 0.7 at radius 1.9) + center dot hole inside the disc; stem =
 * rect x 11.4..12.6 spanning y 10.8..21.2 with a leaf lens on each side.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Petal-ring centers: 12 points on the r 5.6 ring around (12,7) — cos/sin
// at 30° steps (5.6·cos30 ≈ 4.85, 5.6·cos60 = 2.8)
const RAYS: Array<[number, number]> = [
    [17.6, 7], [16.85, 9.8], [14.8, 11.85], [12, 12.6], [9.2, 11.85], [7.15, 9.8],
    [6.4, 7], [7.15, 4.2], [9.2, 2.15], [12, 1.4], [14.8, 2.15], [16.85, 4.2],
];

export const ICON_SUNFLOWER = flatPath(
    // ray-petal ring: wedges as triangles pointing inward
    RAYS.map(([cx, cy]) => `M12 7L${cx} ${cy}L${cx + (12 - cx) * 0.62} ${cy + (7 - cy) * 0.62}z`).join('') +
        // disc (over the wedge bases)
        'M8.4 7a3.6 3.6 0 1 1 7.2 0a3.6 3.6 0 1 1 -7.2 0z' +
        // seed-dot holes, counterclockwise (5 on the r 1.9 ring + center)
        'M9.95 7a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z' +
        'M11.35 9.1a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z' +
        'M13.65 7a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z' +
        'M11.35 4.9a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z' +
        'M11.3 7a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z' +
        // stem + leaves
        'M11.4 10.8h1.2v10.4h-1.2z' +
        'M12.6 15.4c2.4-1.4 4.6-1 5.6.4-2.2 1.6-4.4 1.2-5.6-.4z' +
        'M11.4 18.2c-2.4-1.4-4.6-1-5.6.4 2.2 1.6 4.4 1.2 5.6-.4z' +
        // ground line
        'M4.4 21.2h15.2v1h-15.2z'
);

// String layer: registers 'sunflower' in the shared registry + bound factory
export const svgSunflower: SvgIconFactory = createSvgIcon('sunflower', ICON_SUNFLOWER);

// React layer: same geometry through the shared flat shell
export const SunflowerIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'sunflower', content: ICON_SUNFLOWER, ...props });
