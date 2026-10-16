/**
 * penguin — ANIMALS icon: penguin with a belly window, face, beak,
 * flippers and feet.
 *
 * GEOMETRY: body = ellipse rx 6.6 ry 8.4 at (12,13.2) drawn CLOCKWISE;
 * belly = COUNTERCLOCKWISE hole ellipse rx 4.1 ry 5.9 at (12,14.2) leaving
 * a dark rim; eyes r 0.85 are COUNTERCLOCKWISE holes kept in the dark band
 * ABOVE the belly hole's top edge; the beak is a solid triangle drawn
 * INSIDE the belly hole (re-fills it); flippers = two solid lens bumps
 * outside the body's sides; feet = two rounded-bottom bumps under the
 * body's bottom edge.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_PENGUIN = flatPath(
    // body ellipse, clockwise
    'M5.4 13.2a6.6 8.4 0 1 1 13.2 0a6.6 8.4 0 1 1 -13.2 0z' +
        // belly hole, counterclockwise
        'M7.9 14.2a4.1 5.9 0 1 0 8.2 0a4.1 5.9 0 1 0 -8.2 0z' +
        // eye holes, counterclockwise (dark band above the belly)
        'M8.65 8.2a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z' +
        'M13.65 8.2a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z' +
        // beak (solid triangle re-filling part of the belly hole)
        'M11.05 10h1.9l-0.95 1.8z' +
        // feet (rounded-bottom bumps under the body)
        'M8.5 20.9h2.4v0.4a1.2 1.2 0 0 1 -2.4 0z' +
        'M13.1 20.9h2.4v0.4a1.2 1.2 0 0 1 -2.4 0z' +
        // flippers (solid lens bumps outside the sides)
        'M5.8 11.2L6.2 17.4Q4.6 16.6 4.4 14.4Q4.2 12 5.8 11.2z' +
        'M18.2 17.4L17.8 11.2Q19.4 12 19.6 14.4Q19.8 16.6 18.2 17.4z'
);

// String layer: registers 'penguin' in the shared registry + bound factory
export const svgPenguin: SvgIconFactory = createSvgIcon('penguin', ICON_PENGUIN);

// React layer: same geometry through the shared flat shell
export const PenguinIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'penguin', content: ICON_PENGUIN, ...props });
