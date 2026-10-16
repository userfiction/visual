/**
 * horse — ANIMALS icon: head + neck profile facing left with an ELONGATED
 * straight muzzle, two ears, a jagged three-spike mane on the neck's back
 * edge, eye, nostril and mouth line.
 *
 * GEOMETRY: head/neck (eye + nostril + mouth holes, evenodd) in one
 * element; ears and mane are flatPath solid overlays (see svg-icon.ts
 * flatPath + react.tsx IconBase for the shell pipeline).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Head + neck profile (long straight nose bridge) + holes.
const HORSE_BODY =
    'M2 10.4' +
    'Q2.2 9.4 3.4 9.2' + // muzzle tip rounding
    'L7.6 4.6' + // long nose bridge up to the forehead
    'Q8.6 3.8 10 4.4' + // forehead
    'L12.6 5.8' + // crown
    'Q14.4 6.8 15 9.4' + // back of the head
    'Q15.8 12.6 16.6 16.4' + // neck back slanting down-right
    'L17.6 21' + // to the base
    'L10.8 21' + // neck base
    'Q10.6 16.8 9.6 14.6' + // throat up-left
    'Q6.4 14 4.4 12.4' + // jaw
    'Q2.4 12 2 10.4' + // chin back to the muzzle tip
    'z' +
    // eye hole
    'M6.2 8.4a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z' +
    // nostril hole
    'M2.9 10.4a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z' +
    // mouth line hole (thin bar under the muzzle)
    'M2.6 11.6h2.4v0.5h-2.4z';

export const ICON_HORSE =
    `<path d="${HORSE_BODY}" ${EVENODD}/>` +
    flatPath(
        // ears (solid, at the crown)
        'M8.2 4.6L8.6 1.2Q8.7 0.8 9.1 1.1L11.4 3.6z' +
            'M11.6 4L13.6 1.6Q13.9 1.3 14 1.7L14.4 5z' +
            // mane: jagged triangles riding the neck's back edge
            'M14.8 8.6L18 9.2 15.2 11z' +
            'M15.4 12L18.8 12.8 15.8 14.6z' +
            'M16 15.6L19.4 16.6 16.4 18.2z'
    );

export const svgHorse: SvgIconFactory = createSvgIcon('horse', ICON_HORSE);
export const HorseIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'horse', content: ICON_HORSE, ...props });
