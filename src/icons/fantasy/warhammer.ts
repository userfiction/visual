import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Squared striking face, inset metalwork and opposing spike differentiate
// this weapon from mace.ts; grip gaps suggest leather wrapping.
export const ICON_WARHAMMER = '<path d="M2 3H14V11H2ZM4 5V9H5V5ZM8 5V9H12V5Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    flatPath('M15 5H18L23 9H15ZM9 12H12V16H9ZM8.5 17H12.5V19H8.5ZM8.5 20H12.5V22H8.5ZM8 23H13V24H8Z');
export const svgWarhammer: SvgIconFactory = createSvgIcon('warhammer', ICON_WARHAMMER);
export const WarhammerIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'warhammer', content: ICON_WARHAMMER, ...props });
