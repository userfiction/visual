/**
 * chevron-right — generic UI glyph: chevron pointing right (›).
 *
 * GEOMETRY: mirror of chevron-left (apex (16,12), base x=9).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CHEVRON_RIGHT = flatPath('M16 12L9 19v-2.8l4.2-4.2L9 7.8V5z');

export const svgChevronRight: SvgIconFactory = createSvgIcon('chevronRight', ICON_CHEVRON_RIGHT);

export const ChevronRightIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'chevronRight', content: ICON_CHEVRON_RIGHT, ...props });
