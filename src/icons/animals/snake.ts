/**
 * snake — ANIMALS icon: thick S-shaped snake with spots, forked tongue and
 * eye.
 *
 * GEOMETRY: body = union of TWO identical S ribbons (2.6 thick) offset
 * vertically by 0.6 — the union is a pinch-free 3.2-thick S (a single
 * thicker ribbon would self-intersect where its mirrored bottom edge rises
 * past the top edge); three round spot holes r 0.55 ride the union's local
 * center line; head = solid circle r 2.5 at (19.6,13.8) overlapping the
 * ribbon's right end with a COUNTERCLOCKWISE eye hole r 0.8; forked
 * tongue = two thin solid bars ahead of the snout (within the 24 grid).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// One S ribbon (2.6 thick): top edge right (rising then dipping), end cap
// down, mirrored bottom edge back
const RIBBON_A = 'M2 12.2c2.6-2.6 5.4-2.6 8 0s5.4 2.6 8 0v2.6c-2.6 2.6-5.4 2.6-8 0s-5.4-2.6-8 0z';
// Same ribbon shifted 0.6 down — the union reads as one thick S
const RIBBON_B = 'M2 12.8c2.6-2.6 5.4-2.6 8 0s5.4 2.6 8 0v2.6c-2.6 2.6-5.4 2.6-8 0s-5.4-2.6-8 0z';

export const ICON_SNAKE = flatPath(
    RIBBON_A +
        RIBBON_B +
        // spot holes, counterclockwise (on the union's local center line)
        'M4.05 12.5a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z' +
        'M8.95 13.7a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z' +
        'M13.95 15a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z' +
        // head circle, clockwise (overlaps the ribbon's right end)
        'M17.1 13.8a2.5 2.5 0 1 1 5 0a2.5 2.5 0 1 1 -5 0z' +
        // eye hole, counterclockwise
        'M19.7 13a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0z' +
        // forked tongue (solid thin bars ahead of the snout)
        'M22.2 13.2h1.5v0.5h-1.5zM22.2 14h1.5v0.5h-1.5z'
);

// String layer: registers 'snake' in the shared registry + bound factory
export const svgSnake: SvgIconFactory = createSvgIcon('snake', ICON_SNAKE);

// React layer: same geometry through the shared flat shell
export const SnakeIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'snake', content: ICON_SNAKE, ...props });
