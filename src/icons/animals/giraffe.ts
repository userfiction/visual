/**
 * giraffe — ANIMALS icon: giraffe in profile facing left — small head high
 * on a long diagonal neck descending right into a patchy oval body, with
 * knobbed ossicones, protruding muzzle, ear, mane triangles, tail and four
 * thin legs.
 *
 * GEOMETRY: head = circle r 3 at (6.9,8.6) CLOCKWISE; ossicones = two thin
 * solid rects (h-first = clockwise) capped by knob circles, both ending
 * INSIDE the head circle (bottom edge y 6.6 vs head top y 5.6); muzzle =
 * solid ellipse r 1.9/1.5 at (4.6,10.4) unioned with the head; ear = solid
 * triangle on the head's left edge; neck = solid quad (6.4,9.4)→(13,17.6)
 * widening down-right, top edge fully inside the head; mane = three solid
 * triangles hanging off the neck's RIGHT edge (bases inside, tips out);
 * body = solid ellipse r 5.4/3.4 at (16,17.2) with three COUNTERCLOCKWISE
 * diamond patch holes (screen-CCW via reversed l-order, verified by
 * shoelace) and four solid leg rects tucked under its lower arc; eye hole
 * r 0.65 COUNTERCLOCKWISE above the muzzle. Machinery: flatPath/
 * createSvgIcon (../svg-icon.ts), IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_GIRAFFE = flatPath(
    // ossicones: thin rects + knob circles (solid)
    'M5 2.8h0.9v3.8h-0.9zM8 2.8h0.9v3.8h-0.9z' +
        'M4.65 2.8a0.8 0.8 0 1 1 1.6 0a0.8 0.8 0 1 1 -1.6 0z' +
        'M7.65 2.8a0.8 0.8 0 1 1 1.6 0a0.8 0.8 0 1 1 -1.6 0z' +
        // head circle, clockwise
        'M3.9 8.6a3 3 0 1 1 6 0a3 3 0 1 1 -6 0z' +
        // muzzle ellipse (protrudes left), clockwise
        'M2.7 10.4a1.9 1.5 0 1 1 3.8 0a1.9 1.5 0 1 1 -3.8 0z' +
        // ear triangle (solid chirality, tip up-left)
        'M4.6 7L4.2 8.4 2.6 6.4z' +
        // neck quad, clockwise (top edge inside the head)
        'M6.4 9.4L9.2 8.8L13 17.6L10.2 18.6z' +
        // mane triangles riding the neck's right edge
        'M9.2 9.8L11 10.4 9.6 11.6z' +
        'M10.4 12.4L12.4 13 10.8 14.4z' +
        'M11.6 15L13.6 15.6 12 17z' +
        // body ellipse, clockwise
        'M10.6 17.2a5.4 3.4 0 1 1 10.8 0a5.4 3.4 0 1 1 -10.8 0z' +
        // legs: four thin rects tucked under the body arc
        'M12.4 19.2h1.3v2.2h-1.3zM14.8 19.2h1.3v2.2h-1.3z' +
        'M17.4 19.2h1.3v2.2h-1.3zM19.8 19.2h1.3v2.2h-1.3z' +
        // tail (solid thin line at the rear)
        'M21 15.2h0.7v4.4h-0.7z' +
        // eye hole, counterclockwise
        'M5.55 8.6a0.65 0.65 0 1 0 1.3 0a0.65 0.65 0 1 0 -1.3 0z' +
        // coat patch holes: reversed-l diamonds, counterclockwise
        'M14.3 15.9l0.7-0.5-0.7-0.5-0.7 0.5z' +
        'M17.8 17.1l0.7-0.5-0.7-0.5-0.7 0.5z' +
        'M16 18.7l0.7-0.5-0.7-0.5-0.7 0.5z'
);

// String layer: registers 'giraffe' in the shared registry + bound factory
export const svgGiraffe: SvgIconFactory = createSvgIcon('giraffe', ICON_GIRAFFE);

// React layer: same geometry through the shared flat shell
export const GiraffeIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'giraffe', content: ICON_GIRAFFE, ...props });
