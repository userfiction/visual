/**
 * snowflake — SKY icon: six-armed flake (vertical bar + four diagonal
 * wedges + four branch ticks).
 *
 * GEOMETRY: vertical spoke bar (11.3..12.7 × 1.8..22.2); four diagonal
 * wedges (same ray math as sun.ts — tips r 10.2, bases r 4.2,
 * half-width ±0.7: 10.2·cos45 ≈ 7.21, 4.2·cos45 ≈ 2.97); four branch
 * ticks (1.8 long, width 1.2, ±45°) off the bar at y 7.4 / 16.6.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SNOWFLAKE = flatPath(
    // vertical spoke bar
    'M11.3 1.8h1.4v20.4h-1.4z' +
        // diagonal spokes: NE, SE, SW, NW wedges
        'M19.21 4.79L15.46 9.52 14.48 8.54z' +
        'M19.21 19.21L15.46 14.48 14.48 15.46z' +
        'M4.79 19.21L9.52 15.46 8.54 14.48z' +
        'M4.79 4.79L9.52 8.54 8.54 9.52z' +
        // upper branch ticks (45° up-left / up-right off the bar)
        'M11.72 6.98L10.45 5.71 9.61 6.55 10.88 7.82z' +
        'M12.28 6.98L13.55 5.71 14.39 6.55 13.12 7.82z' +
        // lower branch ticks (45° down-left / down-right off the bar)
        'M11.72 17.02L10.45 18.29 9.61 17.45 10.88 16.18z' +
        'M12.28 17.02L13.55 18.29 14.39 17.45 13.12 16.18z'
);

// String layer: registers 'snowflake' in the shared registry + bound factory
export const svgSnowflake: SvgIconFactory = createSvgIcon('snowflake', ICON_SNOWFLAKE);

// React layer: same geometry through the shared flat shell
export const SnowflakeIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'snowflake', content: ICON_SNOWFLAKE, ...props });
