/**
 * lobster — ANIMALS icon: lobster seen from above with the carapace, two
 * long antennae, big open claws, walking legs, a segmented tail and the
 * fan tail.
 *
 * GEOMETRY: carapace = ellipse rx 3.6 ry 4.4 at (12,8.6) drawn CLOCKWISE
 * (sweep-1); eye holes r 0.9 cut COUNTERCLOCKWISE inside the carapace;
 * antennae = two thin curved ribbon whips arcing out from the head top to
 * (4.4/19.6, 3.4..4.4); claws = one solid path per side — an arm from the
 * carapace's side to the pincer hinge, then the open claw traced with two
 * pincer tips and a notch valley; walking legs = three thin bars per side;
 * tail = abdomen rect + three narrowing segment rects + two flaring fan
 * triangles (all solid, h-first winding). Machinery cross-reference:
 * flatPath (../svg-icon.ts) + IconBase (../react.tsx), same contract as
 * animals/snail.ts.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_LOBSTER = flatPath(
    // antennae (thin curved ribbon whips arcing outward)
    'M11 4.2Q7.6 2.6 4.4 3.4L4.6 4.4Q7.6 3.6 10.6 5z' +
        'M13 4.2Q16.4 2.6 19.6 3.4L19.4 4.4Q16.4 3.6 13.4 5z' +
        // left claw: arm + open pincer (notch valley between tips)
        'M8.6 9.6Q5 10 3.6 7.8Q4.6 7.4 5.2 6.8L3 4.6L5.8 5.2L5.4 2.8L7.6 4.8Q8.8 7 8.4 9.4z' +
        // right claw (mirror: x' = 24 - x)
        'M15.4 9.6Q19 10 20.4 7.8Q19.4 7.4 18.8 6.8L21 4.6L18.2 5.2L18.6 2.8L16.4 4.8Q15.2 7 15.6 9.4z' +
        // walking legs (three thin bars per side)
        'M8.6 10.6L6 11.6 6.3 12.4 9 11.4zM8.4 11.8L5.8 13 6.1 13.8 8.8 12.6zM8.6 13L6.4 14.6 6.9 15.3 9.2 13.8z' +
        'M15.4 10.6L18 11.6 17.7 12.4 15 11.4zM15.6 11.8L18.2 13 17.9 13.8 15.2 12.6zM15.4 13L17.6 14.6 17.1 15.3 14.8 13.8z' +
        // carapace ellipse, clockwise
        'M8.4 8.6a3.6 4.4 0 1 1 7.2 0a3.6 4.4 0 1 1 -7.2 0z' +
        // eye holes, counterclockwise (inside carapace only)
        'M9.7 5.6a0.9 0.9 0 1 0 1.8 0a0.9 0.9 0 1 0 -1.8 0z' +
        'M12.5 5.6a0.9 0.9 0 1 0 1.8 0a0.9 0.9 0 1 0 -1.8 0z' +
        // abdomen connector + tail segments (narrowing solid rects)
        'M10.4 13.4h3.2v3.4h-3.2z' +
        'M9.2 16.8h5.6v1.4h-5.6zM9.7 18.6h4.6v1.3h-4.6zM10.2 20.2h3.6v1.2h-3.6z' +
        // fan tail (two flaring triangles)
        'M10.4 21.8L8.6 18.6 11.4 19.4z' +
        'M13.6 21.8L15.4 18.6 12.6 19.4z'
);

// String layer: registers 'lobster' in the shared registry + bound factory
export const svgLobster: SvgIconFactory = createSvgIcon('lobster', ICON_LOBSTER);

// React layer: same geometry through the shared flat shell
export const LobsterIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'lobster', content: ICON_LOBSTER, ...props });
