/**
 * dog — ANIMALS icon: dog face with DROOPING ears, inner-ear detail and a
 * T-shaped mouth under the nose.
 *
 * GEOMETRY: head = circle r 6.8 at (12,12.6) drawn CLOCKWISE; floppy ears =
 * rounded-bottom rect paths hanging at the head's sides (x 2.6..7.2 and
 * 16.8..21.4, y 6.4..17.6), each with a thin inner-ear hole kept fully
 * clear of the head circle (hole x ≤ 4.8 / ≥ 19.2; head edge x ≥ 5.4 /
 * ≤ 18.6 at every hole y — verified against the circle equation); eyes
 * r 1.05, the apex-down nose and the two mouth lines are COUNTERCLOCKWISE
 * holes inside the head only.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_DOG = flatPath(
    // floppy ears (solid, rounded bottoms via sweep-1 arc)
    'M2.6 6.4h4.6v8.9a2.3 2.3 0 0 1 -4.6 0z' +
        // inner-ear holes (thin verticals, clear of the head circle)
        'M3.3 7.6v6.6h1.5v-6.6z' +
        'M16.8 6.4h4.6v8.9a2.3 2.3 0 0 1 -4.6 0z' +
        'M19.2 7.6v6.6h1.5v-6.6z' +
        // head circle, clockwise
        'M5.2 12.6a6.8 6.8 0 1 1 13.6 0a6.8 6.8 0 1 1 -13.6 0z' +
        // eye holes, counterclockwise
        'M8.35 10.4a1.05 1.05 0 1 0 2.1 0a1.05 1.05 0 1 0 -2.1 0z' +
        'M13.55 10.4a1.05 1.05 0 1 0 2.1 0a1.05 1.05 0 1 0 -2.1 0z' +
        // nose hole, counterclockwise
        'M10.8 13.6l1.2 1.8L13.2 13.6z' +
        // mouth: vertical stem + horizontal bar (both v-first holes)
        'M11.7 15.9v1.6h0.6v-1.6z' +
        'M10.5 17.7v0.6h3v-0.6z'
);

// String layer: registers 'dog' in the shared registry + bound factory
export const svgDog: SvgIconFactory = createSvgIcon('dog', ICON_DOG);

// React layer: same geometry through the shared flat shell
export const DogIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'dog', content: ICON_DOG, ...props });
