/**
 * penguin — ANIMALS icon: penguin with a light belly window, emperor face
 * patch carrying dark eyes and beak, flippers and feet.
 *
 * GEOMETRY: one evenodd element — body ellipse (depth 1) → belly + face
 * patch holes (depth 2, light) → eyes/beak re-fills (depth 3, dark); the
 * dark rim left around the face patch reads as the species cap (see
 * svg-icon.ts flatPath + react.tsx IconBase for the shell pipeline).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

const PENGUIN_BODY =
    // body ellipse, clockwise
    'M5.4 13.2a6.6 8.4 0 1 1 13.2 0a6.6 8.4 0 1 1 -13.2 0z' +
    // belly window hole (light)
    'M7.9 14.2a4.1 5.9 0 1 0 8.2 0a4.1 5.9 0 1 0 -8.2 0z' +
    // face patch hole (light band across the face)
    'M7.6 8.6Q7.6 6.4 10 6.2Q12 6 12 7.4Q12 6 14 6.2Q16.4 6.4 16.4 8.6Q16.4 10.8 12 11.6Q7.6 10.8 7.6 8.6z' +
    // eyes re-filled dark (depth 3 inside the patch)
    'M9.15 8.1a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z' +
    'M13.15 8.1a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z' +
    // beak re-filled dark (depth 3)
    'M11.2 9.4h1.6l-0.8 1.5z' +
    // feet (rounded-bottom bumps under the body)
    'M8.5 20.9h2.4v0.4a1.2 1.2 0 0 1 -2.4 0z' +
    'M13.1 20.9h2.4v0.4a1.2 1.2 0 0 1 -2.4 0z' +
    // flippers (solid lens bumps outside the sides)
    'M5.8 11.2L6.2 17.4Q4.6 16.6 4.4 14.4Q4.2 12 5.8 11.2z' +
    'M18.2 17.4L17.8 11.2Q19.4 12 19.6 14.4Q19.8 16.6 18.2 17.4z';

export const ICON_PENGUIN = `<path d="${PENGUIN_BODY}" ${EVENODD}/>`;

export const svgPenguin: SvgIconFactory = createSvgIcon('penguin', ICON_PENGUIN);
export const PenguinIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'penguin', content: ICON_PENGUIN, ...props });
