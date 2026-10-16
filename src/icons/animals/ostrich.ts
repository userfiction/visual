/**
 * ostrich — ANIMALS icon: ostrich with the small head, long thin neck,
 * round body, wing line and long legs with big flat feet.
 *
 * GEOMETRY: body = ellipse rx 5.6 ry 3.2 at (9.6,12) drawn CLOCKWISE
 * (sweep-1 arcs); neck = a Q-curved ribbon band (two edge curves written as
 * separate Q commands for an even thickness) rising from the body's top
 * right to the head; head = small circle r 1.7 at (16.4,4.6) overlapping
 * the neck's top; beak = solid triangle pointing right; tail tuft = solid
 * triangle at the body's rear LEFT edge; wing line = curved slit hole and
 * eye hole r 0.5 cut COUNTERCLOCKWISE inside their own containing shape
 * only; two long thin legs with wide foot bars below the body. Machinery
 * cross-reference: flatPath (../svg-icon.ts) + IconBase (../react.tsx),
 * same contract as animals/duck.ts.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_OSTRICH = flatPath(
    // Tail is opposite the beak; raised body leaves room for long legs.
    'M5.2 10.7L2 8.4 3.1 12.8 5.4 13z' +
        // body ellipse, clockwise
        'M4 12a5.6 3.2 0 1 1 11.2 0a5.6 3.2 0 1 1 -11.2 0z' +
        // neck ribbon (thin band rising to the head)
        'M12.4 10.5Q15 9.6 15.2 5.6L16.4 5.6Q16.4 10.4 13.6 12z' +
        // head circle, clockwise (overlaps the neck's top)
        'M14.7 4.6a1.7 1.7 0 1 1 3.4 0a1.7 1.7 0 1 1 -3.4 0z' +
        // beak (solid triangle pointing right, overlaps the head)
        'M18 4L20.4 4.6 18 5.4z' +
        // eye hole, counterclockwise (inside head only)
        'M15.5 4.2a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z' +
        // Reverse-wound feather slit avoids a mechanical straight slot.
        'M6.3 11Q9.7 11.2 11.7 12.2Q9.7 13.3 6.6 13Q10 14.6 13.2 12.1Q10 10.4 6.3 11z' +
        // long legs + wide feet (solid thin rects below the body)
        'M7.4 14.7h0.9V22h-0.9zM11.3 14.7h0.9V22h-0.9z' +
        'M6.7 22h2.3v0.7h-2.3zM10.6 22h2.3v0.7h-2.3z'
);

// String layer: registers 'ostrich' in the shared registry + bound factory
export const svgOstrich: SvgIconFactory = createSvgIcon('ostrich', ICON_OSTRICH);

// React layer: same geometry through the shared flat shell
export const OstrichIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'ostrich', content: ICON_OSTRICH, ...props });
