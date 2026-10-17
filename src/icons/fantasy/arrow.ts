import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Broadhead arrow, diagonal shaft and split fletching distinguish ammunition
// from the generic arrowRight navigation glyph in ../generic/.
export const ICON_ARROW = flatPath('M15 2H22V9L19 7L8 18L8 22H5V19H2V16H6L17 5ZM3 12L6 13L4 15L1 14ZM10 18L11 21L10 24L8 21Z');
export const svgArrow: SvgIconFactory = createSvgIcon('arrow', ICON_ARROW);
export const ArrowIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'arrow', content: ICON_ARROW, ...props });
