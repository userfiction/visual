/**
 * raindrop — SKY icon: single large teardrop (pointed top, round belly).
 *
 * GEOMETRY: one path — tip at (12,2.6), straight runs to (16.9,13.4) /
 * (7.1,13.4), then ONE arc r 4.9 sweep-1 around the round belly
 * (center (12,13.4), bottom at (12,18.3)) back to the start; belly base
 * y 18.3 keeps the drop inside the 24 box with breathing room.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_RAINDROP = flatPath(
    // tip → right side → belly arc (r 4.9 around (12,13.4)) → left side → close
    'M12 2.6L16.9 13.4a4.9 4.9 0 1 1 -9.8 0z'
);

// String layer: registers 'raindrop' in the shared registry + bound factory
export const svgRaindrop: SvgIconFactory = createSvgIcon('raindrop', ICON_RAINDROP);

// React layer: same geometry through the shared flat shell
export const RaindropIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'raindrop', content: ICON_RAINDROP, ...props });
