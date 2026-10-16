/**
 * lightning — SKY icon: a lightning bolt with a small cloud cap.
 *
 * GEOMETRY: bolt = one solid zigzag polygon (classic double-kink
 * bolt: from the top edge down-left to a mid notch, then to the sharp
 * bottom tip at (10.4,21.8), back up the other side) drawn CLOCKWISE;
 * cloud cap = a small two-dome cloud bar sitting on the bolt's top (the
 * storm cloud the bolt drops from), drawn FIRST so the bolt overlaps it.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_LIGHTNING = flatPath(
    // storm cloud cap (two domes + base, solid)
    'M8.2 8.2a2 2 0 0 1 .3-3.4 2.4 2.4 0 0 1 4.5-.9 2.2 2.2 0 0 1 4 1A2 2 0 0 1 18.2 8.2z' +
        'M7 8.2h12v1.4H7z' +
        // bolt: zigzag polygon (tip at 10.4,21.8)
        'M13.6 9.6L8.8 15.4 12.2 15.4 10.4 21.8 16.4 13.8 13 13.8 16.8 9.6z'
);

// String layer: registers 'lightning' in the shared registry + bound factory
export const svgLightning: SvgIconFactory = createSvgIcon('lightning', ICON_LIGHTNING);

// React layer: same geometry through the shared flat shell
export const LightningIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'lightning', content: ICON_LIGHTNING, ...props });
