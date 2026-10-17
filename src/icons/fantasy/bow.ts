import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Recurved limbs and a taut string frame a nocked arrow; the open center
// prevents the bow becoming a solid crescent at small gallery sizes.
export const ICON_BOW = flatPath('M6 1Q21 5 18 12Q21 19 6 23L8 20Q17 17 15 13V11Q17 7 8 4ZM6 3H7V21H6ZM3 11H18V10L23 12L18 14V13H3L1 15V13L2 12L1 11V9Z');
export const svgBow: SvgIconFactory = createSvgIcon('bow', ICON_BOW);
export const BowIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'bow', content: ICON_BOW, ...props });
