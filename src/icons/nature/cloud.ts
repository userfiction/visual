/**
 * cloud — SKY icon: puffy cloud.
 *
 * GEOMETRY: one outline — a flat base bar (x 3.4..20.6 at y 16.4..19)
 * carrying THREE puffs (center dome r 3.9 at (12,10.5), left dome r 3.1
 * at (7.4,12.2), right dome r 3.3 at (16.4,12)) drawn as one clockwise
 * path (each puff is a sweep-1 arc riding the outline, the classic
 * cloud read).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CLOUD = flatPath(
    // cloud outline: base bar + three dome arcs, one clockwise path
    'M4.4 19a2 2 0 0 1-1-3.7 3.1 3.1 0 0 1 1.9-5 3.9 3.9 0 0 1 7.4-1.4 3.3 3.3 0 0 1 4.6 3.2 3 3 0 0 1 2.3 3.9A2 2 0 0 1 19.6 19z'
);

// String layer: registers 'cloud' in the shared registry + bound factory
export const svgCloud: SvgIconFactory = createSvgIcon('cloud', ICON_CLOUD);

// React layer: same geometry through the shared flat shell
export const CloudIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cloud', content: ICON_CLOUD, ...props });
