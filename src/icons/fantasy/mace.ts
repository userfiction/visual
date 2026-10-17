import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Radial flanges surround a hollow iron boss; separated grip bands remain
// readable at 24px. Registration matches fantasy/index.ts and ../builtins.ts.
export const ICON_MACE = '<path d="M10 1H14L15 4L18 3L21 7L19 10L20 13L16 15L14 13H10L8 15L4 13L5 10L3 7L6 3L9 4ZM12 5L8 8L9 11H15L16 8ZM11 6H13V10H11Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    flatPath('M10.5 14H13.5V17H10.5ZM10 18H14V20H10ZM9.5 21H14.5V23H9.5Z');
export const svgMace: SvgIconFactory = createSvgIcon('mace', ICON_MACE);
export const MaceIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'mace', content: ICON_MACE, ...props });
