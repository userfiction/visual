/**
 * bat — ANIMALS icon: hanging-style bat with spread scalloped wings, round
 * head, pointed ears and a small body.
 *
 * GEOMETRY: head = circle r 2.4 at (12,7.2) drawn CLOCKWISE (sweep-1); ears
 * = two solid triangles overlapping the head's top edge; body = ellipse
 * rx 2 ry 3.4 at (12,13) overlapping the head's bottom; eye holes r 0.7 cut
 * COUNTERCLOCKWISE inside the head only; wings = two mirrored solid paths —
 * the leading edge rises from the body out to the wingtip (2.4 / 21.6, 6.8)
 * and the trailing edge carries TWO Q-curved scallop dips (control points
 * pulled INSIDE the chord so the membrane edge reads concave) back to the
 * body, overlapping it as a plain union. Shared machinery cross-reference:
 * flatPath (../svg-icon.ts) supplies the per-element
 * fill="currentColor" stroke="none" pair; IconBase (../react.tsx) is the
 * shell every per-icon component renders through (same contract as
 * animals/cat.ts).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_BAT = flatPath(
    // ears (solid triangles overlapping the head's top edge)
    'M9.8 5.8L8.6 2.2 11.8 4.6z' +
        'M14.2 5.8L15.4 2.2 12.2 4.6z' +
        // head circle, clockwise
        'M9.6 7.2a2.4 2.4 0 1 1 4.8 0a2.4 2.4 0 1 1 -4.8 0z' +
        // eye holes, counterclockwise (inside head only)
        'M10.2 6.6a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z' +
        'M12.4 6.6a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z' +
        // body ellipse, clockwise (overlaps the head's bottom)
        'M10 13a2 3.4 0 1 1 4 0a2 3.4 0 1 1 -4 0z' +
        // right wing: leading edge to the tip + two concave trailing scallops
        'M13.7 10Q18.4 6.2 21.6 6.8Q19.2 9.2 18.6 12Q16.6 13.2 15.8 16.2L13.7 14.6z' +
        // left wing (mirror: x' = 24 - x)
        'M10.3 10Q5.6 6.2 2.4 6.8Q4.8 9.2 5.4 12Q7.4 13.2 8.2 16.2L10.3 14.6z'
);

// String layer: registers 'bat' in the shared registry + bound factory
export const svgBat: SvgIconFactory = createSvgIcon('bat', ICON_BAT);

// React layer: same geometry through the shared flat shell
export const BatIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'bat', content: ICON_BAT, ...props });
