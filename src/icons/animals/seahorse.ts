/**
 * seahorse — ANIMALS icon: seahorse facing left with the tube snout, coronet
 * spikes, ridged dorsal fin, belly plates and the signature CURLED tail
 * (two interlocking C-ribbons + a connecting wedge forming a ~1.5-turn
 * spiral).
 *
 * GEOMETRY: snout = solid tube rect (3.4..6.8, 4.6..6.2); head = circle
 * r 2.2 at (8.4,5.8) drawn CLOCKWISE overlapping the snout's right end;
 * coronet = two solid triangles riding the head's top edge; eye hole r 0.7
 * cut COUNTERCLOCKWISE inside the head; neck/body = one Q-curved ribbon
 * (outer edge down the back, return edge up the front) from the head down
 * to y 18.4; dorsal fin = two solid triangles riding the ribbon's outer
 * (right) edge; belly plates = two thin v-first bar holes cut
 * COUNTERCLOCKWISE inside the ribbon; tail spiral centered (14.6,17.8):
 * outer C-ribbon r 1.9..3 (opening bottom-left, its θ=180 end unioned into
 * the body's tail end), inner C-ribbon r 1..2.1 (opening top-right) and a
 * center dot <circle>; the two ribbons OVERLAP in the ring r 1.9..2.1 so
 * they union into one spiral. Machinery cross-reference: flatPath
 * (../svg-icon.ts) + IconBase (../react.tsx), same contract as
 * animals/snail.ts.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_SEAHORSE =
    flatPath(
        // coronet (two solid triangles on the head's top edge)
        'M7 3.8L7.6 2.2 8.2 3.6z' +
            'M8.4 3.6L9 2.2 9.6 3.8z' +
            // snout tube (solid rect protruding left)
            'M3.4 4.6h3.4v1.6h-3.4z' +
            // head circle, clockwise (overlaps the snout's right end)
            'M6.2 5.8a2.2 2.2 0 1 1 4.4 0a2.2 2.2 0 1 1 -4.4 0z' +
            // eye hole, counterclockwise (inside head only)
            'M7.3 5.4a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z' +
            // neck/body ribbon (outer back edge + inner front edge)
            'M10 7.8Q13 9 13.4 12Q13.8 14.6 12.4 16.2L13 18.2L11.2 18.4Q11.6 16.6 11.2 14.6Q10.8 12 9.8 10.2Q9.2 9 8 8.4z' +
            // dorsal fin (two solid triangles on the ribbon's outer edge)
            'M13.1 10.8L15.6 10 13.7 11.8z' +
            'M13.4 13L15.9 12.4 13.8 14z' +
            // belly plate holes (v-first rects, counterclockwise)
            'M11.3 12.8v0.6h1.6v-0.6zM11.7 14.9v0.6h1.5v-0.6z' +
            // tail spiral: outer C-ribbon (opening bottom-left)
            'M11.6 17.8A3 3 0 1 1 14.6 20.8L14.6 19.7A1.9 1.9 0 1 0 12.7 17.8z' +
            // tail spiral: inner C-ribbon (opening top-right, overlaps the outer)
            'M16.7 17.8A2.1 2.1 0 1 1 14.6 15.7L14.6 16.8A1 1 0 1 0 15.6 17.8z'
    ) +
    // spiral center dot
    `<circle cx="14.6" cy="17.8" r="0.6" ${FLAT}/>`;

// String layer: registers 'seahorse' in the shared registry + bound factory
export const svgSeahorse: SvgIconFactory = createSvgIcon('seahorse', ICON_SEAHORSE);

// React layer: same geometry through the shared flat shell
export const SeahorseIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'seahorse', content: ICON_SEAHORSE, ...props });
