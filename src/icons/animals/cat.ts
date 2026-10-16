/**
 * cat — ANIMALS icon: cat face with inner ears, whiskers and a mouth line.
 *
 * GEOMETRY: head = circle r 6.5 at (12,14) drawn CLOCKWISE (sweep-1); ears
 * = two solid triangles overlapping the head's top edge, each carrying a
 * COUNTERCLOCKWISE inner-ear hole (fully above the head circle, so the
 * holes cut only the ears); eyes r 1.1 and the apex-down nose are
 * COUNTERCLOCKWISE holes inside the head; the mouth is a thin rect hole
 * (v-first winding) below the nose; whiskers = four thin SOLID rects
 * protruding sideways (their overlap with the head is a plain union).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CAT = flatPath(
    // ears (solid triangles) + inner-ear holes (reversed winding)
    'M6.5 2.5L11 5.5 8 9z' +
        'M7.4 4.2L7.9 7 9.1 5.4z' +
        'M17.5 2.5L13 5.5l3 3.5z' +
        'M16.6 4.2L14.9 5.4 16.1 7z' +
        // head circle, clockwise
        'M5.5 14a6.5 6.5 0 1 1 13 0a6.5 6.5 0 1 1 -13 0z' +
        // eye holes, counterclockwise (sweep-0)
        'M8.2 12.6a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
        'M13.6 12.6a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
        // nose hole, counterclockwise
        'M11 15l1 1.6L13 15z' +
        // mouth line hole (v-first rect = hole winding)
        'M11.3 17.6v0.9h1.4v-0.9z' +
        // whiskers: solid thin rects, two per side
        'M2.6 12.9h4v0.8h-4zM2.6 15.7h4v0.8h-4z' +
        'M17.4 12.9h4v0.8h-4zM17.4 15.7h4v0.8h-4z'
);

// String layer: registers 'cat' in the shared registry + bound factory
export const svgCat: SvgIconFactory = createSvgIcon('cat', ICON_CAT);

// React layer: same geometry through the shared flat shell
export const CatIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cat', content: ICON_CAT, ...props });
