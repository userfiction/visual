/**
 * elephant — ANIMALS icon: elephant in profile facing left — trunk curling
 * down from the head, big round ear over the head/body junction, dome body
 * and two leg-separation gaps.
 *
 * GEOMETRY: head = circle r 5.4 at (8.2,9.8) CLOCKWISE; trunk = solid band
 * from the head's upper-left edge sweeping down to a tip at (6.2,21.4) —
 * both ends of the band terminate INSIDE the head circle so trunk∪head is
 * gap-free (plain union, see cat.ts whisker note in ../svg-icon.ts);
 * body = rounded dome x 12.2..21.8 overlapping the head's right edge; ear =
 * solid circle r 4 at (12,8.4) bridging head and body; eye hole r 0.9 is
 * COUNTERCLOCKWISE inside the head, kept ≥ 0.1 clear of the ear circle;
 * leg gaps = two v-first (COUNTERCLOCKWISE) thin rects cutting the body's
 * bottom into three legs. Machinery: flatPath/createSvgIcon (../svg-icon.ts),
 * IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_ELEPHANT = flatPath(
    // head circle, clockwise
    'M2.8 9.8a5.4 5.4 0 1 1 10.8 0a5.4 5.4 0 1 1 -10.8 0z' +
        // trunk: solid band (clockwise: inner edge UP first, outer edge DOWN
        // second — reversed from the first draft, whose CCW winding cancelled
        // the head fill in their overlap region under nonzero winding)
        'M6.8 7.2Q5.5 8.6 5.1 11Q4.7 13.6 5.4 16Q6.2 18.4 7.8 20.2L6.2 21.4Q4.6 20.6 3.6 18.8Q2.2 16 2 12Q1.8 8 4.4 6z' +
        // body: dome + rounded bottom corners, clockwise
        'M12.6 6.8Q17.6 5 20.6 8.4Q21.8 10.4 21.8 13.8L21.8 17.2Q21.8 20.8 18.6 20.8L15.4 20.8Q12.6 20.8 12.2 17.6Q11.9 12 12.6 6.8z' +
        // ear: solid circle bridging head and body
        'M8 8.4a4 4 0 1 1 8 0a4 4 0 1 1 -8 0z' +
        // eye hole, counterclockwise
        'M6.1 8.4a0.9 0.9 0 1 0 1.8 0a0.9 0.9 0 1 0 -1.8 0z' +
        // leg gaps: v-first rects (counterclockwise hole winding)
        'M15.2 17.4v3.4h0.5v-3.4z' +
        'M18.6 17.4v3.4h0.5v-3.4z'
);

// String layer: registers 'elephant' in the shared registry + bound factory
export const svgElephant: SvgIconFactory = createSvgIcon('elephant', ICON_ELEPHANT);

// React layer: same geometry through the shared flat shell
export const ElephantIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'elephant', content: ICON_ELEPHANT, ...props });
