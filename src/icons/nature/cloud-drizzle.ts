/**
 * cloud-drizzle — SKY icon: storm cloud shedding light drizzle.
 *
 * GEOMETRY: cloud = base bar (x 3.8..20.8, y 10.4..13.6) + three dome
 * circles (same silhouette as cloud-rain.ts); drizzle = five SHORT slanted
 * dash quads (slope 3.4 down / 1.2 left, width ≈1.35) in two staggered
 * rows (y 15.2 and 17.8) — shorter and lighter than cloud-rain's drops.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// one slanted drizzle dash: top-left corner (x,y), falls down-left
const dash = (x: number, y: number): string =>
    flatPath(`M${x} ${y}L${x - 1.2} ${y + 3.4} ${x + 0.1} ${y + 3.8} ${x + 1.3} ${y + 0.4}z`);

export const ICON_CLOUD_DRIZZLE =
    // cloud: bar + three dome circles
    flatPath('M3.8 10.4h17v3.2H3.8z') +
    '<circle cx="7.6" cy="7.8" r="3.5" fill="currentColor" stroke="none"/>' +
    '<circle cx="12.6" cy="5.9" r="4.5" fill="currentColor" stroke="none"/>' +
    '<circle cx="17.2" cy="8" r="3.3" fill="currentColor" stroke="none"/>' +
    // drizzle: three dashes + two offset dashes (staggered rows)
    dash(8.6, 15.2) +
    dash(12.6, 15.2) +
    dash(16.6, 15.2) +
    dash(10.6, 17.8) +
    dash(14.6, 17.8);

// String layer: registers 'cloud-drizzle' in the shared registry + bound factory
export const svgCloudDrizzle: SvgIconFactory = createSvgIcon('cloudDrizzle', ICON_CLOUD_DRIZZLE);

// React layer: same geometry through the shared flat shell
export const CloudDrizzleIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cloudDrizzle', content: ICON_CLOUD_DRIZZLE, ...props });
