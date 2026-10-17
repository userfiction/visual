import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Narrow glass tube distinguishes the vial from the round potion flask;
// transparent headroom and a liquid meniscus work on either gallery theme.
export const ICON_VIAL = flatPath('M9 1H15V4H9ZM8 5H16V7H8Z') +
    '<path d="M9 8H15V20Q15 23 12 23Q9 23 9 20ZM10.5 9.5V14Q12 13 13.5 14V9.5Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';
export const svgVial: SvgIconFactory = createSvgIcon('vial', ICON_VIAL);
export const VialIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'vial', content: ICON_VIAL, ...props });
