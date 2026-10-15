/**
 * chevron-left — generic UI glyph: chevron pointing left (‹).
 *
 * GEOMETRY: rotated mirror of chevron-down (apex (8,12), base x=15).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CHEVRON_LEFT = flatPath('M8 12l7-7v2.8L10.8 12l4.2 4.2V19z');

export const svgChevronLeft: SvgIconFactory = createSvgIcon('chevronLeft', ICON_CHEVRON_LEFT);

export const ChevronLeftIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'chevronLeft', content: ICON_CHEVRON_LEFT, ...props });
