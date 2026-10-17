/**
 * bunting — FLAGS icon: string of triangular bunting pendants (uplifted
 * geometry).
 *
 * GEOMETRY: rope rect x 2..22 spanning y 5..6.5; three pendant triangles
 * hung from it — each 4.5-wide base on the rope underside (y 6.5), apex
 * 7 deep centered under its own base (at (6.25/12/17.75, 13.5)); evenly
 * spaced across the rope (bases at x 4, 9.75, 15.5 with 1.25 gaps and 2
 * margins). Uplift vs the old six-unit pendants on a y 4..5 rope: taller
 * pendants (7 deep vs 6) on a thicker rope read at 16px. Registered as
 * 'bunting' (see flag-garland.ts for the rect-flag sibling).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_BUNTING = flatPath(
    'M2 5h20v1.5H2zM4 6.5h4.5l-2.25 7zM9.75 6.5h4.5L12 13.5zM15.5 6.5h4.5l-2.25 7z'
);

// String layer: registers 'bunting' in the shared registry + bound factory
export const svgBunting: SvgIconFactory = createSvgIcon('bunting', ICON_BUNTING);

// React layer: same geometry through the shared flat shell
export const BuntingIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'bunting', content: ICON_BUNTING, ...props });
