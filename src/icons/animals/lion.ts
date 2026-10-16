/**
 * lion — ANIMALS icon: jagged irregular 12-spike mane ring around a LIGHT
 * face disc (dark eyes / nose / philtrum / ω mouth inside it) with dark ears
 * poking into the mane — the face-on-face contrast kills the "flower" read.
 *
 * GEOMETRY: mane = 12-point star (outer r 9.3–10.1, inner r 7.2–7.8, per-
 * spike ±4° jitter — uneven like fur) with the r 6.4 face disc as an evenodd
 * hole; face features are nested depth-3 holes. Ears ride the face's top
 * edge in a SEPARATE evenodd element (cross-element overlap = union; see
 * svg-icon.ts flatPath + react.tsx IconBase for the shell pipeline).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Mane star (depth 1) + face disc hole (depth 2) + dark features (depth 3).
const LION_BODY =
    'M1.9 12.2L4.66 10.23L4.29 7L7.28 6.77L6.5 3.73L9.59 4.78L12.33 2.81L14.16 5.12L16.38 3.21L16.99 6.46L20.29 7.98L19.04 10.7L22.09 11.85L19.6 13.95L19.79 17.46L16.99 17.94L17.45 20.59L14.22 19.05L11.68 21.49L9.84 19.28L7.57 21.28L7.01 17.94L3.62 16.47L4.37 13.82z' +
    // face disc (light)
    'M5.6 12.2a6.4 6.4 0 1 0 12.8 0a6.4 6.4 0 1 0 -12.8 0z' +
    // eyes
    'M8.25 10.9a1.05 1.05 0 1 0 2.1 0a1.05 1.05 0 1 0 -2.1 0z' +
    'M13.65 10.9a1.05 1.05 0 1 0 2.1 0a1.05 1.05 0 1 0 -2.1 0z' +
    // nose (apex down) + philtrum bar
    'M10.9 13.7h2.2l-1.1 1.7z' +
    'M11.7 15.6v1.2h0.6v-1.2z' +
    // ω mouth (two bulges down)
    'M10.35 17.4A0.65 0.65 0 0 1 11.65 17.4A0.65 0.65 0 0 1 12.95 17.4A0.65 0.65 0 0 1 14.25 17.4z';

// Ears: dark bumps on the face's top edge + light inner-ear holes.
const LION_EARS =
    'M5.8 7.1a1.5 1.5 0 1 1 3 0a1.5 1.5 0 1 1 -3 0z' +
    'M6.55 7.1a0.75 0.75 0 1 0 1.5 0a0.75 0.75 0 1 0 -1.5 0z' +
    'M15.2 7.1a1.5 1.5 0 1 1 3 0a1.5 1.5 0 1 1 -3 0z' +
    'M15.95 7.1a0.75 0.75 0 1 0 1.5 0a0.75 0.75 0 1 0 -1.5 0z';

export const ICON_LION =
    `<path d="${LION_BODY}" ${EVENODD}/>` + `<path d="${LION_EARS}" ${EVENODD}/>`;

export const svgLion: SvgIconFactory = createSvgIcon('lion', ICON_LION);
export const LionIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'lion', content: ICON_LION, ...props });
