/**
 * moon — SKY icon: crescent moon.
 *
 * GEOMETRY: one path — outer arc = a circle r 7.6 at (12,12) drawn
 * CLOCKWISE; inner cut = a REVERSE-WOUND offset circle arc (r 7 centered
 * (15.4,10.6)) swinging back so the crescent opens to the upper right —
 * the classic night-sky moon.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_MOON = flatPath(
    // outer circle, clockwise
    'M4.4 12a7.6 7.6 0 1 1 15.2 0a7.6 7.6 0 1 1 -15.2 0z' +
        // inner cut, counterclockwise (offset circle carving the crescent)
        'M8.4 6.4a7 7 0 1 0 8.8 10.8A7.6 7.6 0 0 1 8.4 6.4z'
);

// String layer: registers 'moon' in the shared registry + bound factory
export const svgMoon: SvgIconFactory = createSvgIcon('moon', ICON_MOON);

// React layer: same geometry through the shared flat shell
export const MoonIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'moon', content: ICON_MOON, ...props });
