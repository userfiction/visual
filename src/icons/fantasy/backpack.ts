import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Bedroll, flap buckle and outer pocket form an adventurer's pack;
// hollow slots retain detail on the light and dark gallery backgrounds.
export const ICON_BACKPACK = flatPath('M6 1H18Q21 1 21 4Q21 7 18 7H6Q3 7 3 4Q3 1 6 1ZM1 12H3V21H1ZM21 12H23V21H21Z') +
    '<path d="M5 8H19V23H5ZM7 10V13H10V11H14V13H17V10ZM8 16V21H16V16ZM10 17H14V19H10Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';
export const svgBackpack: SvgIconFactory = createSvgIcon('backpack', ICON_BACKPACK);
export const BackpackIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'backpack', content: ICON_BACKPACK, ...props });
