/**
 * flag — FLAGS icon: rectangular flag on a pole.
 *
 * GEOMETRY: pole rect x 4..6 spanning y 2..22, attached flag rect x 6..19
 * spanning y 3..10 — two rect subpaths in one flat path, no holes.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_FLAG = flatPath('M4 2h2v20H4zM6 3h13v7H6z');

// String layer: registers 'flag' in the shared registry + bound factory
export const svgFlag: SvgIconFactory = createSvgIcon('flag', ICON_FLAG);

// React layer: same geometry through the shared flat shell
export const FlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'flag', content: ICON_FLAG, ...props });
