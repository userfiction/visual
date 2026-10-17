import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Hollow flame core, iron basket and tapered wooden handle make a dungeon
// torch readable independently of the generic nature/fire vocabulary.
export const ICON_TORCH = '<path d="M13 0Q14 5 18 7Q21 13 16 15H8Q3 12 7 7L9 4L10 8Q13 5 13 0ZM12 8Q7 12 12 14Q17 12 12 8Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    flatPath('M7 16H17V18H7ZM9 19H15L13 24H11Z');
export const svgTorch: SvgIconFactory = createSvgIcon('torch', ICON_TORCH);
export const TorchIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'torch', content: ICON_TORCH, ...props });
