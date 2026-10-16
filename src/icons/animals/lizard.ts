/**
 * lizard — ANIMALS icon: lizard in profile facing left with the wedge head,
 * back spikes, splayed bent legs with toes and the tail curling down-right.
 *
 * GEOMETRY: head/body/tail = one path — snout tip (2.4,10.6), the crown
 * rising over the back arch to the hip (18.4,12.6), the tail's outer edge
 * curving down-right to the curl (20.8,16.8)→(18,19.4), the inner curl edge
 * returning and the belly closing at the jaw — drawn CLOCKWISE; back
 * spikes = three solid triangles riding the back's top edge; eye hole
 * r 0.7 and the mouth-line rect hole cut COUNTERCLOCKWISE inside the head;
 * legs = two solid zigzag polygons (thigh → knee → foot) whose tops sit
 * INSIDE the body (plain union) with toe bars at the feet. Machinery
 * cross-reference: flatPath (../svg-icon.ts) + IconBase (../react.tsx),
 * same contract as animals/dragon.ts.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_LIZARD = flatPath(
    // back spikes (solid triangles on the back's top edge)
    'M8.2 9.1L8 7.8 9.2 8.9z' +
        'M11 9.1L11 7.9 12.2 9z' +
        'M13.6 9.6L14 8.4 14.9 9.6z' +
        // head + body + curling tail, clockwise outline
        'M2.4 10.6Q3 9.4 4.6 9.2Q6 8.8 7 9.6Q10 8.6 13 9.6Q16.6 10.6 18.4 12.6Q21.4 14 20.8 16.8Q20.4 19 18 19.4Q17 19 17.4 17.6Q17.8 16.2 16.6 15.2Q15 13.6 12 13Q8 12.4 5.4 12.6Q3.4 12.8 2.6 12L2.4 11.4z' +
        // front leg (zigzag polygon, top unioned into the body)
        'M6.6 12L7.9 12.3L6.9 15L8.3 16.6L7.4 17.4L5.8 15.6L6.4 14.2z' +
        'M6.9 17.1h2v0.6h-2z' +
        // back leg (zigzag polygon + toe bar)
        'M14.4 13.2L15.7 13.6L15 15.7L16.4 17.3L15.5 18.1L13.9 16.3L14.4 15z' +
        'M14.9 17.8h2v0.6h-2z' +
        // eye hole, counterclockwise (inside the head)
        'M3.9 10.2a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z' +
        // mouth line hole (v-first rect, counterclockwise)
        'M2.7 11v0.5h1.6v-0.5z'
);

// String layer: registers 'lizard' in the shared registry + bound factory
export const svgLizard: SvgIconFactory = createSvgIcon('lizard', ICON_LIZARD);

// React layer: same geometry through the shared flat shell
export const LizardIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'lizard', content: ICON_LIZARD, ...props });
