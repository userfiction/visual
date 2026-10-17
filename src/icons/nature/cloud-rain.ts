/**
 * cloud-rain — SKY icon: storm cloud shedding three raindrops.
 *
 * GEOMETRY: cloud = base bar (x 3.8..20.8, y 10.4..13.6) + three dome
 * circles (r 3.5 at (7.6,7.8), r 4.5 at (12.6,5.9), r 3.3 at (17.2,8));
 * drops = three teardrops (pointed top, round bottom r 1.1) at x 7.2/12/
 * 16.8, tips y 15.8, bellies y 15.8..20 — a 2.2 gap below the bar.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// one teardrop centered on x: tip (x,15.8) → right belly (x+1.1,18.9) →
// arc r 1.1 sweep-1 through the bottom back to the left belly → close
const drop = (x: number): string =>
    flatPath(`M${x} 15.8L${(x + 1.1).toFixed(1)} 18.9a1.1 1.1 0 1 1 -2.2 0z`);

export const ICON_CLOUD_RAIN =
    // cloud: bar + three dome circles
    flatPath('M3.8 10.4h17v3.2H3.8z') +
    '<circle cx="7.6" cy="7.8" r="3.5" fill="currentColor" stroke="none"/>' +
    '<circle cx="12.6" cy="5.9" r="4.5" fill="currentColor" stroke="none"/>' +
    '<circle cx="17.2" cy="8" r="3.3" fill="currentColor" stroke="none"/>' +
    // three raindrops
    drop(7.2) +
    drop(12) +
    drop(16.8);

// String layer: registers 'cloud-rain' in the shared registry + bound factory
export const svgCloudRain: SvgIconFactory = createSvgIcon('cloudRain', ICON_CLOUD_RAIN);

// React layer: same geometry through the shared flat shell
export const CloudRainIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cloudRain', content: ICON_CLOUD_RAIN, ...props });
