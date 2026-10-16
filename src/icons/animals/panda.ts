/**
 * panda — ANIMALS icon: panda face — round head with two solid black ear
 * circles, two large oval EYE-PATCH holes carrying solid eye dots, and an
 * apex-down nose hole with a short mouth line.
 *
 * GEOMETRY: head = circle r 7 at (12,12.6) CLOCKWISE; ears = two solid
 * circles r 2.9 at (6.2,6.2)/(17.8,6.2) unioned over the head edge (panda
 * ears stay featureless, unlike bear.ts's inner-ear holes); eye patches =
 * two COUNTERCLOCKWISE hole ellipses r 1.9/2.4 at (9,11.6)/(15,11.6)
 * inside the head; INSIDE each patch an eye dot r 0.75 is re-filled SOLID
 * (clockwise — penguin re-fill trick, see penguin.ts); nose = apex-down
 * COUNTERCLOCKWISE triangle hole; mouth = v-first (COUNTERCLOCKWISE) thin
 * rect hole. Machinery: flatPath/createSvgIcon (../svg-icon.ts), IconBase
 * (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_PANDA = flatPath(
    // head circle, clockwise
    'M5 12.6a7 7 0 1 1 14 0a7 7 0 1 1 -14 0z' +
        // ears: solid circles, clockwise
        'M3.3 6.2a2.9 2.9 0 1 1 5.8 0a2.9 2.9 0 1 1 -5.8 0z' +
        'M14.9 6.2a2.9 2.9 0 1 1 5.8 0a2.9 2.9 0 1 1 -5.8 0z' +
        // eye-patch holes, counterclockwise
        'M7 11.6a1.9 2.4 0 1 0 3.8 0a1.9 2.4 0 1 0 -3.8 0z' +
        'M13.2 11.6a1.9 2.4 0 1 0 3.8 0a1.9 2.4 0 1 0 -3.8 0z' +
        // eye dots re-filled solid inside the patches
        'M8.25 11.4a0.75 0.75 0 1 1 1.5 0a0.75 0.75 0 1 1 -1.5 0z' +
        'M14.25 11.4a0.75 0.75 0 1 1 1.5 0a0.75 0.75 0 1 1 -1.5 0z' +
        // nose hole, counterclockwise (apex-down)
        'M10.9 13.9L12 15.5 13.1 13.9z' +
        // mouth line hole (v-first rect)
        'M11.7 16.4v1.2h0.6v-1.2z'
);

// String layer: registers 'panda' in the shared registry + bound factory
export const svgPanda: SvgIconFactory = createSvgIcon('panda', ICON_PANDA);

// React layer: same geometry through the shared flat shell
export const PandaIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'panda', content: ICON_PANDA, ...props });
