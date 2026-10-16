/**
 * goat — ANIMALS icon: goat head-and-neck in profile facing left with a
 * backward-sweeping SCIMITAR HORN (curved solid band), a drooping ear, a
 * protruding muzzle and the signature BEARD triangle hanging under the
 * jaw.
 *
 * GEOMETRY: head = circle r 3.4 at (8.2,11.2) CLOCKWISE; horn = solid
 * curved band arcing from inside the crown up-right to the tip (15.6,3.6)
 * (base corners seated inside the head circle, plain union); ear = solid
 * triangle drooping left, base corners inside the head's left edge;
 * muzzle = solid ellipse r 2.1/1.5 at (5,12.6) protruding left; beard =
 * solid triangle whose base edge sits INSIDE the head's underside with
 * the tip hanging to (7,18.2); neck = solid quad widening down-right;
 * eye hole r 0.6 COUNTERCLOCKWISE. Machinery: flatPath/createSvgIcon
 * (../svg-icon.ts), IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Center the asymmetrical horn/profile in IconBase's 24px square.
export const ICON_GOAT = '<g transform="translate(2.75 0)">' + flatPath(
    // scimitar horn (solid curved band, tip up-right)
    'M9.2 8.4Q10.2 5.6 12.6 4.2Q14.2 3.4 15.6 3.6L15.4 5Q13.8 5 12.4 6.2Q11 7.4 10.2 9.4z' +
        // head circle, clockwise
        'M4.8 11.2a3.4 3.4 0 1 1 6.8 0a3.4 3.4 0 1 1 -6.8 0z' +
        // muzzle ellipse (protrudes left), clockwise
        'M2.9 12.6a2.1 1.5 0 1 1 4.2 0a2.1 1.5 0 1 1 -4.2 0z' +
        // drooping ear (solid triangle, tip left)
        'M5.6 9.8L5.2 11.6 3 10.2z' +
        // beard (solid triangle under the jaw)
        'M6.8 14L8.2 14.4 7 18.2z' +
        // neck quad, clockwise
        'M9.6 13.4L11 12.4L14.4 18.4L11.6 19.4z' +
        // eye hole, counterclockwise
        'M6.4 10.4a0.6 0.6 0 1 0 1.2 0a0.6 0.6 0 1 0 -1.2 0z'
) + '</g>';

// String layer: registers 'goat' in the shared registry + bound factory
export const svgGoat: SvgIconFactory = createSvgIcon('goat', ICON_GOAT);

// React layer: same geometry through the shared flat shell
export const GoatIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'goat', content: ICON_GOAT, ...props });
