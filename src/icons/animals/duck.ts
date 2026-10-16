/**
 * duck — ANIMALS icon: duck with a raised head, bill, tail, wing patch and
 * water ripples.
 *
 * GEOMETRY: body = circle r 6.2 at (9.8,15) drawn CLOCKWISE; head circle
 * r 3.5 at (14.2,7.4) overlapping the body's top-right; solid bill triangle
 * and up-left tail triangle; eye hole r 0.85 COUNTERCLOCKWISE inside the
 * head; wing ellipse hole rx 2.3 ry 1.7 COUNTERCLOCKWISE inside the body;
 * two thin solid water bars under the body.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_DUCK = flatPath(
    // tail (solid triangle, up-left of the body)
    'M5.2 12L2.4 9.4 6.2 10z' +
        // body circle, clockwise
        'M3.6 15a6.2 6.2 0 1 1 12.4 0a6.2 6.2 0 1 1 -12.4 0z' +
        // head circle, clockwise (overlaps the body's top-right)
        'M10.7 7.4a3.5 3.5 0 1 1 7 0a3.5 3.5 0 1 1 -7 0z' +
        // bill (solid triangle pointing right, overlaps the head)
        'M17.5 6.2L21.9 7.5 17.5 8.8z' +
        // eye hole, counterclockwise (inside head only)
        'M13.75 6.6a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z' +
        // wing hole, counterclockwise (inside body only)
        'M6.5 14.6a2.3 1.7 0 1 0 4.6 0a2.3 1.7 0 1 0 -4.6 0z' +
        // water ripples (solid thin bars under the body)
        'M2.6 21.4h13.6v0.9h-13.6z' +
        'M5.4 22.9h9v0.7h-9z'
);

// String layer: registers 'duck' in the shared registry + bound factory
export const svgDuck: SvgIconFactory = createSvgIcon('duck', ICON_DUCK);

// React layer: same geometry through the shared flat shell
export const DuckIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'duck', content: ICON_DUCK, ...props });
