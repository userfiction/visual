/**
 * fish — ANIMALS icon: fish facing left with dorsal fin, side fin, bubbles.
 *
 * GEOMETRY: body ellipse rx 6.5 ry 4.5 at (10,12) drawn CLOCKWISE (sweep-1
 * arcs); solid dorsal triangle overlapping the body's top edge and tail
 * triangle flaring right; side-fin ellipse hole r (1.3, 0.9) and eye hole
 * r 1 cut COUNTERCLOCKWISE inside the body only; two solid bubble dots
 * above the tail.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_FISH =
    flatPath(
        // dorsal fin (solid triangle overlapping the body's top edge)
        'M9 8.4L11.6 4.6 14.2 8.4z' +
            // body ellipse, clockwise
            'M3.5 12a6.5 4.5 0 1 1 13 0a6.5 4.5 0 1 1 -13 0z' +
            // side fin hole, counterclockwise
            'M9.6 13.1a1.3 0.9 0 1 0 2.6 0a1.3 0.9 0 1 0 -2.6 0z' +
            // eye hole, counterclockwise
            'M6 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
            // tail (solid triangle, overlaps the body's right edge)
            'M16 12L21.5 8v8z'
    ) +
    // bubbles: solid dots above the tail
    `<circle cx="20.8" cy="6.6" r="0.7" ${FLAT}/>` +
    `<circle cx="22.2" cy="4.4" r="0.5" ${FLAT}/>`;

// String layer: registers 'fish' in the shared registry + bound factory
export const svgFish: SvgIconFactory = createSvgIcon('fish', ICON_FISH);

// React layer: same geometry through the shared flat shell
export const FishIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'fish', content: ICON_FISH, ...props });
