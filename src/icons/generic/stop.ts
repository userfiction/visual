/**
 * stop — generic media glyph: stop (■).
 *
 * GEOMETRY: solid 12×12 square (Material stop geometry).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_STOP = flatPath('M6 6h12v12H6z');

export const svgStop: SvgIconFactory = createSvgIcon('stop', ICON_STOP);

export const StopIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'stop', content: ICON_STOP, ...props });
