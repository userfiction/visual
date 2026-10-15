/**
 * minus — generic UI glyph: minus (−).
 *
 * GEOMETRY: one 2px bar centered at y=12.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_MINUS = flatPath('M5 11h14v2H5z');

export const svgMinus: SvgIconFactory = createSvgIcon('minus', ICON_MINUS);

export const MinusIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'minus', content: ICON_MINUS, ...props });
