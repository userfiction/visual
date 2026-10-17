import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// D20 silhouette with inset triangular faces supplies a tabletop RPG glyph.
// Gaps between facets avoid tiny illegible numerals and stay theme-neutral.
export const ICON_DICE = '<path d="M12 1L22 7V18L12 24L2 18V7ZM12 4L8 10H16ZM5 8V16L8 12ZM19 8L16 12L19 16ZM10 12L12 18L14 12ZM5 18L10 21L8 14ZM19 18L16 14L14 21Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';
export const svgDice: SvgIconFactory = createSvgIcon('dice', ICON_DICE);
export const DiceIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'dice', content: ICON_DICE, ...props });
