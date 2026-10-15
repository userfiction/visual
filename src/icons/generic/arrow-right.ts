/**
 * arrow-right — generic UI glyph: arrow pointing right (→).
 *
 * GEOMETRY: 2px shaft (y 11..13) + solid triangular head spanning
 * x 13.2..20.6 (Material arrow-forward proportions, adapted to the band).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_ARROW_RIGHT = flatPath('M4 11h9.2V5.6L20.6 12l-7.4 6.4V13H4z');

export const svgArrowRight: SvgIconFactory = createSvgIcon('arrowRight', ICON_ARROW_RIGHT);

export const ArrowRightIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'arrowRight', content: ICON_ARROW_RIGHT, ...props });
