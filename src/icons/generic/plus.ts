/**
 * plus — generic UI glyph: plus (＋).
 *
 * GEOMETRY: cross of two 2px bars, extent 5..19 on both axes.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_PLUS = flatPath('M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z');

export const svgPlus: SvgIconFactory = createSvgIcon('plus', ICON_PLUS);

export const PlusIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'plus', content: ICON_PLUS, ...props });
