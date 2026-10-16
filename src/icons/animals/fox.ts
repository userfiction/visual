/**
 * fox — ANIMALS icon: fox head with tall ears, inner-ear detail, narrow
 * chin and nose.
 *
 * GEOMETRY: head = diamond-ish path (cheek corners (4.2,10.6)/(19.8,10.6),
 * chin at (12,21.6), Q-rounded brow corners) drawn CLOCKWISE; tall solid
 * ear triangles rise from the brows, each with a COUNTERCLOCKWISE
 * inner-ear hole near the tip — kept fully ABOVE the head's brow curve so
 * the holes cut only the ears; eye holes r 0.9 and the apex-down nose hole
 * cut COUNTERCLOCKWISE inside the head.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_FOX = flatPath(
    // ears (solid tall triangles; the right ear's vertex order is reversed
    // to keep the same solid chirality after mirroring)
    'M4.2 2.6L9.4 6.4 5.2 8.6z' +
        // inner-ear holes near the tips (reversed winding, above the brow)
        'M5.4 3.9L5.7 5.9 6.9 4.9z' +
        'M19.8 2.6L18.8 8.6 14.6 6.4z' +
        'M18.6 3.9L17.1 4.9 18.3 5.9z' +
        // head (chin → left cheek → brows → right cheek → close), clockwise
        'M12 21.6L4.2 10.6Q3.6 7.4 6.2 5.8Q9 4.2 12 5.8Q15 4.2 17.8 5.8Q20.4 7.4 19.8 10.6z' +
        // eye holes, counterclockwise
        'M8.3 11.2a0.9 0.9 0 1 0 1.8 0a0.9 0.9 0 1 0 -1.8 0z' +
        'M13.9 11.2a0.9 0.9 0 1 0 1.8 0a0.9 0.9 0 1 0 -1.8 0z' +
        // nose hole, counterclockwise (apex-down)
        'M11.1 13.6l0.9 1.5 0.9-1.5z'
);

// String layer: registers 'fox' in the shared registry + bound factory
export const svgFox: SvgIconFactory = createSvgIcon('fox', ICON_FOX);

// React layer: same geometry through the shared flat shell
export const FoxIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'fox', content: ICON_FOX, ...props });
