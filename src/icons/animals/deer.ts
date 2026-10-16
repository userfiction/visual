/**
 * deer — ANIMALS icon: deer head-and-neck in profile facing left with
 * BRANCHING ANTLERS (two beams, each with forked tines), a protruding
 * muzzle, a left-pointing ear, eye and slanting neck.
 *
 * GEOMETRY: head = circle r 3.8 at (7.8,11.4) CLOCKWISE; antlers = two
 * solid multi-point polygons (main beam: three tine tips at (5.8,2.6),
 * (8.6,2.4), (11,3.6); rear beam: tips at (12.4,3.6), (13.8,5.2)) whose
 * base edges tuck INSIDE the head circle's top (plain union); muzzle =
 * solid ellipse r 2/1.4 at (4.4,12) protruding left; ear = solid triangle
 * seated inside the head's left edge; neck = solid quad widening down-
 * right; eye hole r 0.7 COUNTERCLOCKWISE inside the head. Machinery:
 * flatPath/createSvgIcon (../svg-icon.ts), IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Center the antler/profile silhouette in the shared square without changing
// its anatomy; the original x2.4..14.4 drawing otherwise leans far left.
export const ICON_DEER = '<g transform="translate(3.6 0)">' + flatPath(
    // antlers: forked beams (solid, tips up)
    'M7 8.4L5.8 2.6 6.8 2.4 8.2 5.2 8.6 2.4 9.6 2.6 9.2 5.6 11 3.6 11.6 4.4 9 8.2z' +
        'M9.8 8.4L12.4 3.6 13.2 4 11.8 6.8 13.8 5.2 14.2 6 11.8 7.6z' +
        // head circle, clockwise
        'M4 11.4a3.8 3.8 0 1 1 7.6 0a3.8 3.8 0 1 1 -7.6 0z' +
        // muzzle ellipse (protrudes left), clockwise
        'M2.4 12a2 1.4 0 1 1 4 0a2 1.4 0 1 1 -4 0z' +
        // ear (solid triangle, tip up-left)
        'M5.2 9.2L4.6 10.8 2.6 8.4z' +
        // neck quad, clockwise
        'M9.2 14.4L10.6 13.6L14.4 19.4L11.6 20.6z' +
        // eye hole, counterclockwise
        'M6.1 10.8a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z'
) + '</g>';

// String layer: registers 'deer' in the shared registry + bound factory
export const svgDeer: SvgIconFactory = createSvgIcon('deer', ICON_DEER);

// React layer: same geometry through the shared flat shell
export const DeerIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'deer', content: ICON_DEER, ...props });
