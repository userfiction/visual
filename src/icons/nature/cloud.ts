/**
 * cloud — SKY icon: puffy cloud (uplift: bolder three-dome + base bar).
 *
 * GEOMETRY: union of separate elements (per the overlapping-shapes
 * convention — see svg-icon.ts flatPath note): two side dome circles
 * (r 4.2 at (7,13.2), r 3.6 at (17.6,13.6)), a taller center dome
 * (r 5.2 at (12.6,10.4)) and a solid base bar (x 3.4..20.6, y 15.4..19.6;
 * top edge 15.4 tucks under every dome bottom ≥15.6 so no notch shows).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// base bar first, then domes painted over it (same fill → overlap unions)
export const ICON_CLOUD =
    flatPath('M3.4 15.4h17.2v4.2H3.4z') +
    '<circle cx="7" cy="13.2" r="4.2" fill="currentColor" stroke="none"/>' +
    '<circle cx="12.6" cy="10.4" r="5.2" fill="currentColor" stroke="none"/>' +
    '<circle cx="17.6" cy="13.6" r="3.6" fill="currentColor" stroke="none"/>';

// String layer: registers 'cloud' in the shared registry + bound factory
export const svgCloud: SvgIconFactory = createSvgIcon('cloud', ICON_CLOUD);

// React layer: same geometry through the shared flat shell
export const CloudIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cloud', content: ICON_CLOUD, ...props });
