/**
 * chevron-down — generic UI glyph: chevron pointing down (⌄).
 *
 * GEOMETRY: 2px band — outer apex (12,16), inner apex (12,13.2), base
 * corners at x 5/19.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CHEVRON_DOWN = flatPath('M5 9h2.8L12 13.2 16.2 9H19l-7 7z');

export const svgChevronDown: SvgIconFactory = createSvgIcon('chevronDown', ICON_CHEVRON_DOWN);

export const ChevronDownIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'chevronDown', content: ICON_CHEVRON_DOWN, ...props });
