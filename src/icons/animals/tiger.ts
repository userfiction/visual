/**
 * tiger — ANIMALS icon: tiger face — round head with small ears, spiked
 * cheek fur sticking out both sides, STRIPES cut as thin negative line
 * holes (forehead verticals + horizontal cheek bars), eyes, nose and
 * T-mouth.
 *
 * GEOMETRY: head = circle r 6.8 at (12,12.8) CLOCKWISE; ears = two solid
 * circles r 2.2 at (6.4,6.6)/(17.6,6.6) unioned over the head edge; cheek
 * fur = one solid triangle per side, base corners seated INSIDE the head
 * circle with tips poking out to x 2.8/21.2; STRIPES = v-first
 * (COUNTERCLOCKWISE) thin rect holes — two short verticals on the
 * forehead, one horizontal bar per cheek row (right/left mirrored);
 * eyes r 0.95, apex-down nose and the mouth stem+bar cut COUNTERCLOCKWISE
 * inside the head. Machinery: flatPath/createSvgIcon (../svg-icon.ts),
 * IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_TIGER = flatPath(
    // head circle, clockwise
    'M5.2 12.8a6.8 6.8 0 1 1 13.6 0a6.8 6.8 0 1 1 -13.6 0z' +
        // ears: solid circles, clockwise
        'M4.2 6.6a2.2 2.2 0 1 1 4.4 0a2.2 2.2 0 1 1 -4.4 0z' +
        'M15.4 6.6a2.2 2.2 0 1 1 4.4 0a2.2 2.2 0 1 1 -4.4 0z' +
        // cheek fur spikes (solid triangles off both sides)
        'M5.6 11.8L5.4 13.8 2.8 12.6z' +
        'M18.4 11.8L21.2 12.6 18.6 13.8z' +
        // forehead stripe holes (v-first rects)
        'M10.9 7.4v1.8h0.5v-1.8z' +
        'M12.6 7.4v1.8h0.5v-1.8z' +
        // cheek stripe holes (v-first rects)
        'M6 12.4v0.5h2v-0.5z' +
        'M16 12.4v0.5h2v-0.5z' +
        'M6.6 15.4v0.5h2.2v-0.5z' +
        'M15.2 15.4v0.5h2.2v-0.5z' +
        // eye holes, counterclockwise
        'M8.25 11a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z' +
        'M13.85 11a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z' +
        // nose hole, counterclockwise (apex-down)
        'M10.8 13.2L12 15 13.2 13.2z' +
        // mouth: stem + bar (v-first holes)
        'M11.7 15.6v1.4h0.6v-1.4z' +
        'M10.6 17.2v0.5h2.8v-0.5z'
);

// String layer: registers 'tiger' in the shared registry + bound factory
export const svgTiger: SvgIconFactory = createSvgIcon('tiger', ICON_TIGER);

// React layer: same geometry through the shared flat shell
export const TigerIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'tiger', content: ICON_TIGER, ...props });
