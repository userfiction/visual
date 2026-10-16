/**
 * whale — ANIMALS icon: whale facing left with tail flukes, eye, belly
 * groove and a three-bar water spout.
 *
 * GEOMETRY: body = dome arc (rx 7.6 ry 4.9 over (2.4..17.6, 12.4)) with
 * rounded bottom corners (r 3.2/3) and a flat-ish bottom at y 17.2,
 * drawn CLOCKWISE (sweep-1 throughout); tail flukes = solid double-spike
 * path overlapping the body's right edge; eye hole r 0.8 and the belly
 * groove line hole cut COUNTERCLOCKWISE inside the body; spout = three
 * thin solid bars rising from the dome (their lower ends dip into the
 * body — plain union).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_WHALE = flatPath(
    // body: dome + rounded bottom corners, clockwise
    'M2.4 12.4a7.6 4.9 0 0 1 15.2 0v1.8a3.2 3 0 0 1 -3.2 3L5.6 17.2a3.2 3 0 0 1 -3.2 -3z' +
        // tail flukes (solid, notched right edge)
        'M17.2 9.8L21.8 6.4Q22.8 12.2 21.8 18L17.2 14.6z' +
        // eye hole, counterclockwise
        'M5.3 11.2a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0z' +
        // belly groove line hole (v-first rect)
        'M4.2 15.3v0.7h10.2v-0.7z' +
        // water spout: three thin solid bars above the dome
        'M4.9 4.6h0.9v4.2h-0.9zM6.7 2.6h0.9v5.8h-0.9zM8.5 4.4h0.9v3.6h-0.9z'
);

// String layer: registers 'whale' in the shared registry + bound factory
export const svgWhale: SvgIconFactory = createSvgIcon('whale', ICON_WHALE);

// React layer: same geometry through the shared flat shell
export const WhaleIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'whale', content: ICON_WHALE, ...props });
