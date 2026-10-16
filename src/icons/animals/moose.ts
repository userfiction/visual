/**
 * moose — ANIMALS icon: moose head-and-neck in profile facing left with a
 * broad PALMATE antler (dome with three finger-slot notches and a brow
 * tine), long protruding muzzle, dewlap (the "bell") under the jaw and a
 * slanting neck.
 *
 * GEOMETRY: antler palm = solid dome path (x 3.4..12, y 2.6..8) CLOCKWISE
 * whose bottom edge dips INTO the head circle's top (plain union); finger
 * slots = three v-first (COUNTERCLOCKWISE) thin rects cut through the
 * palm's bottom edge (the palmate "fingers"); brow tine = solid triangle
 * poking left off the palm's lower-left; head = circle r 3 at (9.6,10.4)
 * CLOCKWISE; muzzle = solid ellipse r 2.6/1.7 at (5.6,10.8) protruding
 * left; dewlap = solid quad hanging from inside the head's underside; neck
 * = solid quad widening down-right; eye hole r 0.65 COUNTERCLOCKWISE.
 * Machinery: flatPath/createSvgIcon (../svg-icon.ts), IconBase
 * (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Keep the palmate antler and muzzle visually centered in the 24px shell.
export const ICON_MOOSE = '<g transform="translate(3 0)">' + flatPath(
    // palmate antler: solid dome, clockwise
    'M4 7.8Q3.4 5.8 4.6 4.2Q6 2.6 8.4 2.6Q10.8 2.6 11.4 4.6Q12 6.6 10.6 8z' +
        // finger slots: v-first rects cutting the palm's bottom edge
        'M5.6 5.8v2h0.6v-2z' +
        'M7.4 5v2.8h0.6v-2.8z' +
        'M9.2 5.4v2.4h0.6v-2.4z' +
        // brow tine (solid triangle off the palm's lower-left)
        'M4.6 7.2L3.2 7.8 2.6 5.8z' +
        // head circle, clockwise
        'M6.6 10.4a3 3 0 1 1 6 0a3 3 0 1 1 -6 0z' +
        // muzzle ellipse (protrudes left), clockwise
        'M3 10.8a2.6 1.7 0 1 1 5.2 0a2.6 1.7 0 1 1 -5.2 0z' +
        // dewlap (solid flap under the jaw)
        'M9.8 13L12.2 12.8 12.6 15.4 10.2 16.6z' +
        // neck quad, clockwise
        'M11 12.6L12 12L15.4 18L12.6 19z' +
        // eye hole, counterclockwise
        'M8.35 9.8a0.65 0.65 0 1 0 1.3 0a0.65 0.65 0 1 0 -1.3 0z'
) + '</g>';

// String layer: registers 'moose' in the shared registry + bound factory
export const svgMoose: SvgIconFactory = createSvgIcon('moose', ICON_MOOSE);

// React layer: same geometry through the shared flat shell
export const MooseIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'moose', content: ICON_MOOSE, ...props });
