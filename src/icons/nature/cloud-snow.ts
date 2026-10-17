/**
 * cloud-snow — SKY icon: storm cloud shedding snow.
 *
 * GEOMETRY: cloud = base bar (x 3.8..20.8, y 10.4..13.6) + three dome
 * circles (same silhouette as cloud-rain.ts); snow = three PLUS-shaped
 * flakes (two crossed 3.4-long bars, half-width 0.7) at (7.6,17.4),
 * (12,16.6), (16.4,17.4) — the middle one rides higher for a scatter feel.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// one plus-flake centered on (cx,cy): vertical bar + horizontal bar
const flake = (cx: number, cy: number): string =>
    flatPath(`M${cx - 0.7} ${cy - 1.7}h1.4v3.4h-1.4z M${cx - 1.7} ${cy - 0.7}h3.4v1.4h-3.4z`);

export const ICON_CLOUD_SNOW =
    // cloud: bar + three dome circles
    flatPath('M3.8 10.4h17v3.2H3.8z') +
    '<circle cx="7.6" cy="7.8" r="3.5" fill="currentColor" stroke="none"/>' +
    '<circle cx="12.6" cy="5.9" r="4.5" fill="currentColor" stroke="none"/>' +
    '<circle cx="17.2" cy="8" r="3.3" fill="currentColor" stroke="none"/>' +
    // three snowflakes
    flake(7.6, 17.4) +
    flake(12, 16.6) +
    flake(16.4, 17.4);

// String layer: registers 'cloud-snow' in the shared registry + bound factory
export const svgCloudSnow: SvgIconFactory = createSvgIcon('cloudSnow', ICON_CLOUD_SNOW);

// React layer: same geometry through the shared flat shell
export const CloudSnowIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cloudSnow', content: ICON_CLOUD_SNOW, ...props });
