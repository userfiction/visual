/**
 * turtle — ANIMALS icon: turtle with shell rim line, spots, head eye and
 * tail.
 *
 * GEOMETRY: shell = upper half-ellipse (rx 8.5 ry 7 centered (11.5,15),
 * sweep-1 arc over the top) with three COUNTERCLOCKWISE spot holes r 1.1
 * and a thin rim line hole (y 13.7..14.5, x 5..18) separating the shell
 * plates from the body; legs = two rounded-bottom rect paths under the
 * shell's flat chord; head = solid <circle> r 2.2 at (21.2,13) with a
 * COUNTERCLOCKWISE eye hole r 0.5; tail = solid triangle at the shell's
 * left base.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_TURTLE =
    flatPath(
        // shell dome (flat chord at y 15), clockwise-over-the-top
        'M3 15a8.5 7 0 0 1 17 0z' +
            // shell spot holes, counterclockwise
            'M6.35 12.5a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
            'M9.85 11.3a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
            'M13.35 12.5a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
            // rim line hole (v-first rect, inside the dome above the chord)
            'M5 13.7v0.8h13v-0.8z' +
            // legs (rounded bottoms via sweep-1 arc)
            'M5.5 15h2.6v3.3a1.3 1.3 0 0 1 -2.6 0z' +
            'M14.4 15h2.6v3.3a1.3 1.3 0 0 1 -2.6 0z' +
            // tail (solid triangle at the shell's left base)
            'M3.5 15.2L1.5 16.4 3.5 17.2z'
    ) +
    // head: solid circle overlapping the shell's right edge
    `<circle cx="21.2" cy="13" r="2.2" ${FLAT}/>` +
    // head eye hole, counterclockwise
    flatPath('M21.35 12.7a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z');

// String layer: registers 'turtle' in the shared registry + bound factory
export const svgTurtle: SvgIconFactory = createSvgIcon('turtle', ICON_TURTLE);

// React layer: same geometry through the shared flat shell
export const TurtleIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'turtle', content: ICON_TURTLE, ...props });
