import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Each berry owns its inset star calyx: the old stars were painted BEFORE
// opaque circles and disappeared. Evenodd now cuts them through the fruit.
// The bottom berry has radius 3.9 so it cannot overlap the right berry
// (distance 8.77 > 4.8 + 3.9); overlapping silhouettes would XOR a lens hole.
export const ICON_BLUEBERRY =
    `<path d="M12.6 8.2a5.5 5.5 0 1 1 -11 0 5.5 5.5 0 1 1 11 0zM7.1 4.7L6.3 6.2 4.6 6.4 5.8 7.7 5.6 9.4 7.1 8.6 8.6 9.4 8.4 7.7 9.6 6.4 7.9 6.2zM22.4 12a4.8 4.8 0 1 1 -9.6 0 4.8 4.8 0 1 1 9.6 0zM17.6 8.9L16.9 10.2 15.4 10.4 16.5 11.5 16.3 13 17.6 12.3 18.9 13 18.7 11.5 19.8 10.4 18.3 10.2zM15.1 18a3.9 3.9 0 1 1 -7.8 0 3.9 3.9 0 1 1 7.8 0zM11.2 15.5L10.6 16.6 9.3 16.8 10.2 17.8 10 19.1 11.2 18.5 12.4 19.1 12.2 17.8 13.1 16.8 11.8 16.6z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // A small leaf fills the upper-right gap without masking the calyx holes.
    flatPath('M12 5.2C12.1 2.5 14.7 1.2 17.2 1.7 16.5 4.2 14.5 5.6 12 5.2z');

// Keep the same string/React pair exported by fruits/index.ts.
export const svgBlueberry: SvgIconFactory = createSvgIcon('blueberry', ICON_BLUEBERRY);
export const BlueberryIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'blueberry', content: ICON_BLUEBERRY, ...props });
