/**
 * bunting — FLAGS icon: string of triangular bunting flags.
 *
 * GEOMETRY: rope rect x 2..22 spanning y 4..5; three pendant triangles hung
 * from it — each h5 base on the rope line, l-2.5 6 to the apex centered
 * under its own base — evenly spaced across the rope (bases at x 4, 10, 16).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_BUNTING = flatPath('M2 4h20v1H2zM4 5h5l-2.5 6zM10 5h5l-2.5 6zM16 5h5l-2.5 6z');

// String layer: registers 'bunting' in the shared registry + bound factory
export const svgBunting: SvgIconFactory = createSvgIcon('bunting', ICON_BUNTING);

// React layer: same geometry through the shared flat shell
export const BuntingIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'bunting', content: ICON_BUNTING, ...props });
