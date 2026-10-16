/**
 * chicken — ANIMALS icon: plump chicken facing right with a three-spike
 * comb, beak, wattle, wing patch and tail feathers.
 *
 * GEOMETRY: broad low breast and raised tail connect to the small head in
 * one contour. Rounded comb lobes distinguish a hen from a spiky dragon;
 * a tapered wing slit replaces the generic circular belly opening.
 * Machinery: ../svg-icon.ts flatPath/createSvgIcon; ../react.tsx IconBase.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CHICKEN =
    // Eye and wing are cut inside the continuous body, not painted over it.
    '<path d="M2 7L6.2 10.5Q10 8.2 12.7 10Q12.5 6.4 14 5.7Q13 3 14.5 3.3Q15.2 1.8 16.3 3Q18 2.4 18 4Q19 4.1 18.6 5.5Q20 6.3 19.5 8.5L22 9.3 19.2 10.2Q21 12.5 18.4 12.3Q18 18.7 12 19Q5.2 19.4 3.6 14L1.8 11.5 4.8 12zM16.2 7.1a.7 .7 0 1 1 1.4 0a.7 .7 0 1 1 -1.4 0zM6.6 12.5Q11.3 10.7 15 13.1Q12.2 17.5 7.1 15.5Q11.9 16.2 13.4 13.7Q9.6 12 6.6 12.5z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    // Thin legs retain space below the plump breast and above the toes.
    flatPath('M8.5 18h1.1v3h1v1H7.5v-1h1zM12.7 18h1.1v3h1v1h-3.1v-1h1z');

// String layer: registers 'chicken' in the shared registry + bound factory
export const svgChicken: SvgIconFactory = createSvgIcon('chicken', ICON_CHICKEN);

// React layer: same geometry through the shared flat shell
export const ChickenIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'chicken', content: ICON_CHICKEN, ...props });
