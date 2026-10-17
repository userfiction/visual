/**
 * sun-cloud — SKY icon: sun peeking from behind a cloud (upper-left sun,
 * lower-right cloud front).
 *
 * GEOMETRY: sun = core circle r 3.6 at (8.6,7.6) + four rays (tips r 6.2,
 * bases r 4.6, half-width ±0.7): N bar, W bar, NW/NE wedges; the E ray is
 * omitted — it reads as tucked behind the cloud. Cloud front = base bar
 * (x 6.4..21, y 14..17.8) + three dome circles, the left dome (9.6,13.2)
 * r 3 overlapping the sun core's bottom (11.2) so the sun sits BEHIND it.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SUN_CLOUD =
    // sun core
    '<circle cx="8.6" cy="7.6" r="3.6" fill="currentColor" stroke="none"/>' +
    // rays: N bar, W bar, NW wedge, NE wedge (E side hidden by cloud)
    flatPath('M7.9 1.4h1.4V3h-1.4z') +
    flatPath('M2.4 6.9H4v1.4H2.4z') +
    flatPath('M4.21 3.21L5.84 3.86 4.86 4.84z') +
    flatPath('M12.99 3.21L11.36 3.86 12.34 4.84z') +
    // cloud front: bar + domes (painted after the sun → sun reads behind)
    flatPath('M6.4 14h14.6v3.8H6.4z') +
    '<circle cx="9.6" cy="13.2" r="3" fill="currentColor" stroke="none"/>' +
    '<circle cx="14.4" cy="11.6" r="3.9" fill="currentColor" stroke="none"/>' +
    '<circle cx="18.2" cy="13.4" r="2.7" fill="currentColor" stroke="none"/>';

// String layer: registers 'sun-cloud' in the shared registry + bound factory
export const svgSunCloud: SvgIconFactory = createSvgIcon('sunCloud', ICON_SUN_CLOUD);

// React layer: same geometry through the shared flat shell
export const SunCloudIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'sunCloud', content: ICON_SUN_CLOUD, ...props });
