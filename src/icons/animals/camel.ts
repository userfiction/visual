/**
 * camel — ANIMALS icon: dromedary in profile facing left — small head
 * with muzzle and ear at the top-left, a thin neck curving down-right, a
 * single HUMP peaking at (14.2,5.8), rump, two thin legs reaching down
 * and a short tail.
 *
 * GEOMETRY: one hero silhouette path, CLOCKWISE — muzzle tip (4.2,4.8),
 * head crown (7.2,3.4), neck back edge descending into the hump saddle
 * (11.4,10.2), hump rising to its peak and descending to the rump
 * (19.8,13.6), hind leg framed down to y 21.2, belly returning left,
 * front leg framed down, chest and the neck's front edge closing up to
 * the muzzle underside — the leg/belly structure leaves ground gaps as
 * negative space; ear = solid triangle seated INSIDE the crown edge;
 * tail = solid thin line off the rump; eye hole r 0.5 COUNTERCLOCKWISE.
 * Machinery: flatPath/createSvgIcon (../svg-icon.ts), IconBase
 * (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CAMEL = flatPath(
    // dromedary silhouette: head up-left, single hump, thin legs, clockwise
    // Deep saddle between neck and hump prevents a generic sloping back.
    'M4.2 4.8Q5.2 3.2 7.2 3.4Q8.8 3.6 9.8 5.6Q10.4 7 11.4 10.2Q12.4 5.2 14.2 5.8Q16.4 6.2 18 10Q19.6 12 19.8 13.6L19.6 15L19.2 21.2L18.2 21.2L18.4 15Q16 15.2 13.6 15L11.5 15L11.3 21.2L10.4 21.2L10.6 14Q9.6 12.8 9 11Q8.4 9.2 7.2 7.6Q6 6 4.2 4.8z' +
        // ear (solid triangle on the crown)
        'M7 3.8L8.2 2.6 8.8 4.2z' +
        // tail (solid thin line off the rump)
        'M19.8 13.8h0.6v4h-0.6z' +
        // eye hole, counterclockwise
        'M5.7 5a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z'
);

// String layer: registers 'camel' in the shared registry + bound factory
export const svgCamel: SvgIconFactory = createSvgIcon('camel', ICON_CAMEL);

// React layer: same geometry through the shared flat shell
export const CamelIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'camel', content: ICON_CAMEL, ...props });
