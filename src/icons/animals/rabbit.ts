/**
 * rabbit — ANIMALS icon: rabbit face with inner ears, whiskers, nose and
 * philtrum line.
 *
 * GEOMETRY: head = circle r 6 at (12,15) drawn CLOCKWISE; two upright ears
 * (rounded-bottom rect paths x 8..10.8 / 13.2..16, y 1.5..10.1) overlap the
 * head top, each with a thin inner-ear hole kept fully above the head
 * circle's top edge; eye holes r 1.1, apex-down nose hole and philtrum
 * line hole are COUNTERCLOCKWISE inside the head; whiskers = four thin
 * solid rects protruding sideways.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_RABBIT = flatPath(
    // upright ears (solid, rounded bottoms via sweep-1 arc)
    'M8 1.5h2.8v8.6a1.4 1.4 0 0 1 -2.8 0z' +
        // inner-ear holes (thin verticals, clear of the head circle)
        'M8.7 2.6v6.4h1.4v-6.4z' +
        'M13.2 1.5h2.8v8.6a1.4 1.4 0 0 1 -2.8 0z' +
        'M13.9 2.6v6.4h1.4v-6.4z' +
        // head circle, clockwise
        'M6 15a6 6 0 1 1 12 0a6 6 0 1 1 -12 0z' +
        // eye holes, counterclockwise
        'M8.3 14.2a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
        'M13.5 14.2a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
        // nose hole, counterclockwise
        'M10.9 16.6l1.1 1.6 1.1-1.6z' +
        // philtrum line hole (v-first rect)
        'M11.7 18.6v1h0.6v-1z' +
        // whiskers: solid thin rects, two per side
        'M4.2 14.4h3.8v0.7h-3.8zM4.2 16h3.8v0.7h-3.8z' +
        'M16 14.4h3.8v0.7h-3.8zM16 16h3.8v0.7h-3.8z'
);

// String layer: registers 'rabbit' in the shared registry + bound factory
export const svgRabbit: SvgIconFactory = createSvgIcon('rabbit', ICON_RABBIT);

// React layer: same geometry through the shared flat shell
export const RabbitIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'rabbit', content: ICON_RABBIT, ...props });
