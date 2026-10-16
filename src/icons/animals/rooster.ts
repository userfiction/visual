/**
 * rooster — ANIMALS icon: rooster facing right with a tall serrated comb,
 * beak, wattle, long SICKLE tail feathers and long legs.
 *
 * GEOMETRY: body = circle r 5.2 at (9.8,14.6) drawn CLOCKWISE (sweep-1);
 * head = circle r 2.5 at (15,7.6) overlapping the body's top-right; comb =
 * three solid triangles (taller than the chicken's) riding the head's top
 * edge; beak = solid triangle pointing right; wattle = solid bump under the
 * beak; sickle tail = two long Q-curved wedges sweeping up-left from the
 * body's rear — the rooster's signature arcs; swept wing slit
 * and eye hole r 0.7 cut COUNTERCLOCKWISE inside their own
 * containing shape only; long legs + feet bars below the body. Machinery
 * cross-reference: flatPath (../svg-icon.ts) + IconBase (../react.tsx),
 * same contract as animals/bird.ts.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_ROOSTER = flatPath(
    // Sickle feathers attach to the rear (LEFT), not beside the right beak.
    'M6.8 12Q5.2 5.2 1.5 6Q2.2 3.1 4.4 4.2Q7.6 5.8 8.6 11.2z' +
        'M6 14Q3.4 8.2 1 10Q1.5 7.2 3.7 7.8Q6.2 8.6 7.8 13.2z' +
        // comb (three solid triangles riding the head's top edge)
        'M13 5.6L13.4 3.2 14.8 5.4z' +
        'M14.6 5L15.4 2.4 16.8 5z' +
        'M16.6 5L17.8 2.6 18.6 5.4z' +
        // body circle, clockwise
        'M4.6 14.6a5.2 5.2 0 1 1 10.4 0a5.2 5.2 0 1 1 -10.4 0z' +
        // head circle, clockwise (overlaps the body's top-right)
        'M12.5 7.6a2.5 2.5 0 1 1 5 0a2.5 2.5 0 1 1 -5 0z' +
        // beak (solid triangle pointing right, overlaps the head)
        'M17.4 7L20.6 8.2 17.4 9.4z' +
        // wattle (solid bump below the beak, overlaps the head's bottom)
        'M16.8 9.6Q18.4 9.8 18.2 11.6Q16.8 11.2 16.6 10.2z' +
        // eye hole, counterclockwise (inside head only)
        'M14.1 7a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z' +
        // Reverse-wound swept wing slit; unlike a round belly spot it reads
        // as overlapping flight feathers against the chicken's round breast.
        'M7 13Q9.4 13.1 11.3 14.2Q10.7 15.8 7.5 15.7Q10.7 16.8 12.6 14Q10 12.2 7 13z' +
        // long legs + feet (solid thin rects below the body)
        'M7.8 19.2h0.9v2.6h-0.9zM10.9 19.2h0.9v2.6h-0.9z' +
        'M7.3 21.8h1.9v0.6h-1.9zM10.4 21.8h1.9v0.6h-1.9z'
);

// String layer: registers 'rooster' in the shared registry + bound factory
export const svgRooster: SvgIconFactory = createSvgIcon('rooster', ICON_ROOSTER);

// React layer: same geometry through the shared flat shell
export const RoosterIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'rooster', content: ICON_ROOSTER, ...props });
