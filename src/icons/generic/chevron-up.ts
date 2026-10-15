/**
 * chevron-up — generic UI glyph: chevron pointing up (⌃).
 *
 * GEOMETRY: mirror of chevron-down (apex (12,8), base y=15).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CHEVRON_UP = flatPath('M12 8l7 7h-2.8L12 10.8 7.8 15H5z');

export const svgChevronUp: SvgIconFactory = createSvgIcon('chevronUp', ICON_CHEVRON_UP);

export const ChevronUpIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'chevronUp', content: ICON_CHEVRON_UP, ...props });
