/**
 * rhinoceros — ANIMALS icon: rhino in profile facing right — massive
 * low-slung body with two leg stubs, snout carrying TWO nose horns (big
 * front, small rear), a small ear, eye, and vertical skin-fold lines.
 *
 * GEOMETRY: body = one clockwise path — back arcs from (2.6,10.6) over the
 * shoulders to the snout (21.2,13.4), jaw and chest return left along the
 * belly with two leg stubs reaching y 20.8 (x 3.8..6.4 and 10.6..13.2);
 * horns = two solid triangles whose base corners sit INSIDE the snout/head
 * outline with tips poking up-right/up (plain union); ear = solid triangle
 * on the head's top edge; eye hole r 0.8 is COUNTERCLOCKWISE inside the
 * head; skin folds = two v-first (COUNTERCLOCKWISE) thin vertical rect
 * holes on the shoulder — rhino's signature armor plating. Machinery:
 * flatPath/createSvgIcon (../svg-icon.ts), IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_RHINOCEROS = flatPath(
    // body + snout + leg stubs, clockwise outline
    'M2.6 10.6Q3.2 7.6 6.4 7Q10.6 6.2 14 7.8Q16.6 9 18.2 10.8Q20.8 11.6 21.2 13.4Q21.4 15 19.8 15.8L17.8 16.6Q17 18 15 18.2L13.4 18.4L13.2 20.8L10.6 20.8L10.8 18.6L6.6 18.8L6.4 20.8L3.8 20.8L3.8 18.4Q2.4 17 2.4 14Q2.4 12 2.6 10.6z' +
        // front horn (big) + rear horn (small), solid, tips up
        'M18.2 11.6L20.2 6.6 20.6 12.6z' +
        'M16.4 10.4L17.6 7.4 18 10.8z' +
        // ear (solid triangle on the head's top edge)
        'M14 8.6L15.4 5.6 15.8 9.2z' +
        // eye hole, counterclockwise
        'M16.4 12a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0z' +
        // skin-fold holes: thin v-first vertical rects
        'M9.8 9.4v6h0.5v-6z' +
        'M12.6 8.6v5h0.5v-5z'
);

// String layer: registers 'rhinoceros' in the shared registry + bound factory
export const svgRhinoceros: SvgIconFactory = createSvgIcon('rhinoceros', ICON_RHINOCEROS);

// React layer: same geometry through the shared flat shell
export const RhinocerosIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'rhinoceros', content: ICON_RHINOCEROS, ...props });
