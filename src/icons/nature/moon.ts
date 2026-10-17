/**
 * moon — SKY icon: tilted crescent moon with carved craters.
 *
 * GEOMETRY (crossref svg-icon.ts flatPath; react.tsx IconBase): ONE closed
 * crescent path — outer arc r 7.9 centered (11.4,12.6), major side (sweep 1,
 * large 1) walking the lower-left body between the horn tips (18.47,16.13)
 * and (9.41,4.95); then the inner edge back along a r 7.5 cut circle centered
 * (15.2,9.4) (sweep 0) so the crescent waxes toward the upper right (tilted
 * "C" read, classic night-sky moon).
 * Two crater holes ride on fill-rule="evenodd": both sit strictly inside the
 * thick body — inside the r 7.9 outer disk with ≥1.2 margin AND outside the
 * r 7.5 cut disk, so evenodd winding count there is 2 → hole.
 *
 * UPLIFT over the old two-arc crescent: exact horn-tip lens math (no
 * poke-out artifacts), ~40° tilt, crater detail at 16-48px.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// evenodd variant of svg-icon.ts flatPath (svg-icon.ts:101) — same solid
// fill/stroke-none pair plus fill-rule so crater subpaths carve holes
// explicitly regardless of arc winding
const flatPathEvenOdd = (d: string): string =>
    `<path d="${d}" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;

export const ICON_MOON = flatPathEvenOdd(
    // crescent body: outer major arc down the lower-left between horn tips,
    // then inner cut arc back — clockwise outer keeps default nonzero fill
    'M18.47 16.13A7.9 7.9 0 1 1 9.41 4.95A7.5 7.5 0 0 0 18.47 16.13z' +
        // large crater hole in the thickest part (8.6,15) r 1.3
        'M7.3 15a1.3 1.3 0 1 1 2.6 0a1.3 1.3 0 1 1 -2.6 0z' +
        // small companion crater lower on the limb (10.6,17.8) r 0.9
        'M9.7 17.8a0.9 0.9 0 1 1 1.8 0a0.9 0.9 0 1 1 -1.8 0z'
);

// String layer: registers 'moon' in the shared registry + bound factory
// (svg-icon.ts createSvgIcon — re-registration is idempotent, last wins)
export const svgMoon: SvgIconFactory = createSvgIcon('moon', ICON_MOON);

// React layer: same geometry through the shared flat shell (react.tsx)
export const MoonIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'moon', content: ICON_MOON, ...props });
