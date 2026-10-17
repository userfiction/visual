import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// An engraved foreground coin overlaps a stepped stack; separated tiers
// read as currency at 16px without relying on text or a font.
export const ICON_COINS = flatPath('M2 5Q2 2 8 2Q14 2 14 5Q14 8 8 8Q2 8 2 5ZM2 8Q6 11 12 9L10 12Q4 13 2 11ZM2 13Q5 15 9 14V17Q4 18 2 16ZM2 18Q5 20 9 19L11 22Q4 23 2 21Z') +
    '<path d="M23 16A6 6 0 1 1 11 16A6 6 0 1 1 23 16ZM17 12L14 16L17 20L20 16ZM17 14L18.5 16L17 18L15.5 16Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';
export const svgCoins: SvgIconFactory = createSvgIcon('coins', ICON_COINS);
export const CoinsIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'coins', content: ICON_COINS, ...props });
