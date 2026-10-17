/**
 * cloud-lightning — SKY icon: storm cloud with a bolt dropping out.
 *
 * GEOMETRY: cloud = base bar (x 3.8..20.8, y 10.4..13.6) + three dome
 * circles (same silhouette as cloud-rain.ts); bolt = one solid zigzag
 * polygon dropping from INSIDE the bar (top edge (13.8,12.4)→(16.6,12.4),
 * mid notches, sharp tip at (10,22.4)) — its own flatPath element painted
 * after the cloud (same bolt family as lightning.ts).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CLOUD_LIGHTNING =
    // cloud: bar + three dome circles
    flatPath('M3.8 10.4h17v3.2H3.8z') +
    '<circle cx="7.6" cy="7.8" r="3.5" fill="currentColor" stroke="none"/>' +
    '<circle cx="12.6" cy="5.9" r="4.5" fill="currentColor" stroke="none"/>' +
    '<circle cx="17.2" cy="8" r="3.3" fill="currentColor" stroke="none"/>' +
    // bolt: zigzag polygon (tip at 10,22.4)
    flatPath('M13.8 12.4L9 17.2 12 17.2 10 22.4 15.6 16.8 12.6 16.8 16.6 12.4z');

// String layer: registers 'cloud-lightning' in the shared registry + bound factory
export const svgCloudLightning: SvgIconFactory = createSvgIcon('cloudLightning', ICON_CLOUD_LIGHTNING);

// React layer: same geometry through the shared flat shell
export const CloudLightningIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cloudLightning', content: ICON_CLOUD_LIGHTNING, ...props });
