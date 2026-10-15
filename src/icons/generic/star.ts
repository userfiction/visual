/**
 * star — generic expression glyph: star (★) — ratings/favorites staple.
 *
 * GEOMETRY: classic five-point star (Material star geometry, Apache-2.0).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_STAR = flatPath(
    'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
);

export const svgStar: SvgIconFactory = createSvgIcon('star', ICON_STAR);

export const StarIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'star', content: ICON_STAR, ...props });
