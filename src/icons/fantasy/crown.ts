/**
 * crown — FANTASY icon: crown.
 *
 * GEOMETRY: three-spike crown body (side tips at (4,8)/(20,8), center
 * peak (12,5.5), valleys at y 10.8) sitting on a flush base bar
 * (x 4..20, y 16..18.5). Body bottom edge and base top edge share y=16,
 * so the union reads as one piece.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CROWN = flatPath('M4 16V8L7.8 10.8L12 5.5L16.2 10.8L20 8V16ZM4 16H20V18.5H4Z');

export const svgCrown: SvgIconFactory = createSvgIcon('crown', ICON_CROWN);

export const CrownIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'crown', content: ICON_CROWN, ...props });
