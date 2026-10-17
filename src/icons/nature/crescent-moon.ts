/**
 * crescentMoon — SKY icon: upright crescent moon (distinct from the tilted
 * cratered crescent in nature/moon.ts).
 *
 * GEOMETRY (flat currentColor, stroke none per element — ../svg-icon.ts
 * flatPath convention): one path — body = the major arc of the LEFT circle
 * (r 7.4 centered (12.6,12)) from the top horn tip (15,4.9) counterclockwise
 * down the left side to the bottom horn tip (15,19.1), then the inner cut =
 * the minor arc of the RIGHT circle (r 7.4 centered (17.4,12)) back up,
 * bowing left so the "C" opens right. Horn tips = circle-circle
 * intersections of the two offset circles (centers 4.8 apart); belly width
 * 4.8 at the midline.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CRESCENT_MOON = flatPath(
    // body: major arc of the LEFT circle (r 7.4 centered (12.6,12)) from
    // the top horn tip (15,4.9) counter-clockwise down the left side to
    // the bottom horn tip (15,19.1)…
    'M15 4.9A7.4 7.4 0 1 0 15 19.1' +
        // …then the inner cut: minor arc of the RIGHT circle (r 7.4
        // centered (17.4,12)) back up, bowing left so the "C" opens right.
        // Horn tips = circle-circle intersections of the two offset
        // circles (d 4.8 apart); belly width 4.8 at midline.
        'A7.4 7.4 0 0 1 15 4.9z'
);

// String layer: registers 'crescentMoon' + bound factory (svg-icon.ts)
export const svgCrescentMoon: SvgIconFactory = createSvgIcon('crescentMoon', ICON_CRESCENT_MOON);

// React layer: same geometry through the shared flat shell (react.tsx)
export const CrescentMoonIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'crescentMoon', content: ICON_CRESCENT_MOON, ...props });
