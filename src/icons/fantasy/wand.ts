/**
 * wand — FANTASY icon: magic wand with sparkles.
 *
 * GEOMETRY: stick = 2px diagonal band from (3.6,19.2) up-right to the tip
 * near (13.5,10.7) (offset (1.4,1.4) perpendicular ≈ 2px band); a 4-point
 * sparkle sits just past the tip at (16.5,7.5) (arms 3 long, waist 0.8),
 * a smaller sparkle at (20,14) and a dot circle at (19.5,3.5) complete the
 * sparkle cluster around the tip.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_WAND =
    flatPath(
        'M3.6 19.2l9.2-9.2 1.4 1.4-9.2 9.2z' +
            'M16.5 4.5l0.8 2.2 2.2 0.8-2.2 0.8-0.8 2.2-0.8-2.2-2.2-0.8 2.2-0.8z' +
            'M20 12.5l0.5 1 1 0.5-1 0.5-0.5 1-0.5-1-1-0.5 1-0.5z'
    ) + '<circle cx="19.5" cy="3.5" r="1" fill="currentColor" stroke="none"/>';

export const svgWand: SvgIconFactory = createSvgIcon('wand', ICON_WAND);

export const WandIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'wand', content: ICON_WAND, ...props });
