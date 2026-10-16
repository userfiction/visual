/**
 * horse — ANIMALS icon: horse head and neck in profile facing left, with
 * two ears, a jagged mane along the BACK of the neck, eye and nostril.
 *
 * GEOMETRY: head/neck = one path — muzzle tip at (2.4,9.6), nose bridge
 * rising to the crown, back of the head, then the neck slants down-right
 * to the base (16.6,21)-(11.8,21); ears = two solid triangles on the
 * crown; mane = three solid triangles whose bases ride the neck's back
 * edge (15.2,10.4)→(16.4,19) with tips pointing RIGHT; eye hole r 0.95 and
 * nostril hole r 0.5 cut COUNTERCLOCKWISE inside the head/muzzle.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_HORSE = flatPath(
    // ears (solid triangles overlapping the crown)
    'M9.2 5.6L9.8 2 12.4 4.4z' +
        'M12.4 5L14.4 2.4 15.4 5.6z' +
        // head + neck, clockwise outline
        'M2.4 9.6Q3 7.4 5.4 6.8L9.6 5.6Q12.6 5.2 14 7.6Q15.2 9.6 15.6 12.4L16.6 21L11.8 21L11.4 16.2Q8.2 15.8 6 13.6Q3.4 13.2 2.6 11.4Q2.2 10.4 2.4 9.6z' +
        // mane (solid triangles riding the neck's back edge)
        'M15.2 10.4L18.2 11 15.4 12.6z' +
        'M15.8 13.4L19 14.2 16 15.8z' +
        'M16.2 16.6L19.2 17.6 16.4 19z' +
        // eye hole, counterclockwise
        'M5.65 8.6a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z' +
        // nostril hole, counterclockwise
        'M3 10a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z'
);

// String layer: registers 'horse' in the shared registry + bound factory
export const svgHorse: SvgIconFactory = createSvgIcon('horse', ICON_HORSE);

// React layer: same geometry through the shared flat shell
export const HorseIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'horse', content: ICON_HORSE, ...props });
