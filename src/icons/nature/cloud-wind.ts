/**
 * cloud-wind — SKY icon: cloud blown by wind (cloud up top, three flowing
 * wind bars below).
 *
 * GEOMETRY: cloud = base bar (x 4.4..19.4, y 9..11.8) + three dome circles
 * (r 3 at (8,7), r 3.6 at (12.6,5.8), r 2.6 at (16,7.6)); wind = three
 * horizontal bars (thickness 1.7) with rounded right caps (r 0.85 arc),
 * staggered lengths/offsets to read as moving air.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CLOUD_WIND =
    // cloud: bar + three dome circles
    flatPath('M4.4 9h15v2.8H4.4z') +
    '<circle cx="8" cy="7" r="3" fill="currentColor" stroke="none"/>' +
    '<circle cx="12.6" cy="5.8" r="3.6" fill="currentColor" stroke="none"/>' +
    '<circle cx="16" cy="7.6" r="2.6" fill="currentColor" stroke="none"/>' +
    // wind bars: rounded right cap via r 0.85 sweep-1 arc
    flatPath('M3.4 13.8H16.4a.85.85 0 0 1 0 1.7H3.4z') +
    flatPath('M6.4 17H20a.85.85 0 0 1 0 1.7H6.4z') +
    flatPath('M3.4 20.2h10a.85.85 0 0 1 0 1.7h-10z');

// String layer: registers 'cloud-wind' in the shared registry + bound factory
export const svgCloudWind: SvgIconFactory = createSvgIcon('cloudWind', ICON_CLOUD_WIND);

// React layer: same geometry through the shared flat shell
export const CloudWindIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cloudWind', content: ICON_CLOUD_WIND, ...props });
