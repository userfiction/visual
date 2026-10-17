import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Open necklace joins a diamond pendant with a central rune. The necklace
// is geometry rather than a stroke so the flat icon contract stays intact.
export const ICON_AMULET = flatPath('M5 1H7L9 8H15L17 1H19L17 9L14 11H10L7 9Z') +
    '<path d="M12 10L20 16L12 24L4 16ZM12 13L8 16L12 20L16 16ZM12 15L14 16L12 18L10 16Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';
export const svgAmulet: SvgIconFactory = createSvgIcon('amulet', ICON_AMULET);
export const AmuletIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'amulet', content: ICON_AMULET, ...props });
