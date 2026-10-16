/**
 * bird — ANIMALS icon: round bird facing right, with crest, wing, tail and
 * legs.
 *
 * GEOMETRY: body ellipse rx 6.5 ry 5.5 at (11,14.5) drawn CLOCKWISE (sweep-1
 * arcs); head circle r 3.2 at (15.5,8); solid crest triangle on the head's
 * top edge; right-pointing beak and left-pointing tail triangles; wing hole
 * (ellipse rx 2.6 ry 1.9 at (10.5,14)) and eye hole r 0.9 cut
 * COUNTERCLOCKWISE inside their own containing shape only; two thin solid
 * legs with small feet bars below the body.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_BIRD = flatPath(
    // tail (solid triangle pointing left, overlaps the body)
    'M5.5 13L1 9.5l1.5 7z' +
        // crest (solid triangle on the head's top edge)
        'M14.2 5.4L14.6 2.6 16.4 4.4z' +
        // body ellipse, clockwise
        'M4.5 14.5a6.5 5.5 0 1 1 13 0a6.5 5.5 0 1 1 -13 0z' +
        // wing hole, counterclockwise (inside body only)
        'M7.9 14a2.6 1.9 0 1 0 5.2 0a2.6 1.9 0 1 0 -5.2 0z' +
        // head circle, clockwise (overlaps the body's top-right)
        'M12.3 8a3.2 3.2 0 1 1 6.4 0a3.2 3.2 0 1 1 -6.4 0z' +
        // eye hole, counterclockwise (inside head only)
        'M15.3 7.2a0.9 0.9 0 1 0 1.8 0a0.9 0.9 0 1 0 -1.8 0z' +
        // beak (solid triangle pointing right, overlaps the head)
        'M18.5 7.2L22 8.8l-3.5 1.6z' +
        // legs + feet (solid thin rects below the body)
        'M9.7 19.4h0.9v2.8h-0.9zM12.4 19.4h0.9v2.8h-0.9z' +
        'M9.25 22.2h1.8v0.6h-1.8zM11.95 22.2h1.8v0.6h-1.8z'
);

// String layer: registers 'bird' in the shared registry + bound factory
export const svgBird: SvgIconFactory = createSvgIcon('bird', ICON_BIRD);

// React layer: same geometry through the shared flat shell
export const BirdIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'bird', content: ICON_BIRD, ...props });
