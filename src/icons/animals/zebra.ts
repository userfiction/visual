/**
 * zebra — ANIMALS icon: zebra head and neck in profile facing left, with
 * two ears, an erect mane along the BACK of the neck and STRIPES cut as
 * thin negative line holes across the neck.
 *
 * GEOMETRY: head/neck = one clockwise path (muzzle tip (2.6,10.2), bridge
 * up to the crown, neck slanting down-right to the base (17.4,21)-
 * (12.6,21)); ears = two solid triangles seated INSIDE the crown edge
 * (base points verified under the Q-curve); mane = four solid triangles
 * whose bases sit inside the neck's right edge with tips pointing RIGHT;
 * STRIPES = three horizontal v-first (COUNTERCLOCKWISE) thin rect holes
 * spanning the neck interior, each right end kept clear of the neck edge;
 * eye hole r 0.9 and nostril hole r 0.5 cut COUNTERCLOCKWISE inside the
 * head/muzzle. Machinery: flatPath/createSvgIcon (../svg-icon.ts),
 * IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_ZEBRA = flatPath(
    // ears (solid triangles overlapping the crown)
    'M8.4 7L9.6 3 11.4 6.4z' +
        'M12 7.2L14.8 3.4 12.8 7.8z' +
        // head + neck, clockwise outline
        'M2.6 10.2Q2.8 8.8 4.6 8.2L8.8 6.6Q11.8 6 13.4 8Q14.8 10 15.2 12.8L17.4 21L12.6 21L12.2 16.4Q9 16 6.8 13.8Q4.2 13.4 3 11.6Q2.4 10.8 2.6 10.2z' +
        // erect mane (solid triangles off the neck's right edge)
        'M13.4 8.6L15.8 9.2 13.9 10.2z' +
        'M14.6 12.2L17 12.8 14.8 14z' +
        'M15.6 15.2L18 16 15.8 17.2z' +
        'M16.4 18.4L18.8 19.2 16.6 20.4z' +
        // eye hole, counterclockwise
        'M4.9 9a0.9 0.9 0 1 0 1.8 0a0.9 0.9 0 1 0 -1.8 0z' +
        // nostril hole, counterclockwise
        'M2.9 10.8a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z' +
        // stripe holes: thin v-first rects (counterclockwise winding)
        'M11.8 9.6v0.6h2.4v-0.6z' +
        'M12.4 12.4v0.6h2.4v-0.6z' +
        'M13 15.2v0.6h2.6v-0.6z' +
        'M13.6 18v0.6h2.3v-0.6z'
);

// String layer: registers 'zebra' in the shared registry + bound factory
export const svgZebra: SvgIconFactory = createSvgIcon('zebra', ICON_ZEBRA);

// React layer: same geometry through the shared flat shell
export const ZebraIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'zebra', content: ICON_ZEBRA, ...props });
