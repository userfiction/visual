/**
 * nordicFlag — FLAGS icon: Nordic-cross flag (monochrome).
 *
 * GEOMETRY: flag rect x 4..20 spanning y 5..19 drawn CLOCKWISE, with a
 * cross-shaped hole cut COUNTERCLOCKWISE (reversed vertex order): vertical
 * band x 9..11 spanning the full flag height, horizontal band y 11..13
 * spanning the full width. Nonzero fill subtracts the cross — the offset
 * cross position is what makes the silhouette read as a Nordic flag.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_NORDIC_FLAG = flatPath('M4 5h16v14H4zM9 11H4v2h5v6h2v-6h9v-2h-9V5h-2z');

// String layer: registers 'nordicFlag' in the shared registry + bound factory
export const svgNordicFlag: SvgIconFactory = createSvgIcon('nordicFlag', ICON_NORDIC_FLAG);

// React layer: same geometry through the shared flat shell
export const NordicFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'nordicFlag', content: ICON_NORDIC_FLAG, ...props });
