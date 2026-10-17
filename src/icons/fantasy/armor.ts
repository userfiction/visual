import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Pauldrons flank a breastplate with a heraldic diamond and articulated
// waist; no background-colored details, matching shield.ts portability.
export const ICON_ARMOR = '<path d="M7 3L10 5H14L17 3L19 8L17 12V18H7V12L5 8ZM12 7L9 10L12 14L15 10ZM11 15H13V17H11Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    flatPath('M2 4H5L4 9H1ZM19 4H22L23 9H20ZM7 19H17L19 23H13V21H11V23H5Z');
export const svgArmor: SvgIconFactory = createSvgIcon('armor', ICON_ARMOR);
export const ArmorIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'armor', content: ICON_ARMOR, ...props });
