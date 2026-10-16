import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Separated flesh and rind make the slice legible in one color. Evenodd
// explicitly cuts the teardrop seeds; the old sweep directions filled them in.
export const ICON_WATERMELON =
    `<path d="M4 7H20C20 11.8 16.5 15.6 12 15.6S4 11.8 4 7zM7.3 8.4C6.4 9.2 6.7 10.5 7.5 10.5 8.4 10.4 8.4 9.3 7.3 8.4zM12 11C10.9 11.9 11 13.2 12 13.2S13.1 11.9 12 11zM16.7 8.4C15.6 9.3 15.6 10.4 16.5 10.5 17.3 10.5 17.6 9.2 16.7 8.4z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // The 1.4-unit clear band suggests white pith above the outer green rind.
    flatPath('M1.5 7H2.8C2.8 12.6 6.8 17 12 17S21.2 12.6 21.2 7H22.5C22.5 14.3 18 20.4 12 20.4S1.5 14.3 1.5 7z');

// Share the slice between standalone SVG strings and React.
export const svgWatermelon: SvgIconFactory = createSvgIcon('watermelon', ICON_WATERMELON);
export const WatermelonIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'watermelon', content: ICON_WATERMELON, ...props });
