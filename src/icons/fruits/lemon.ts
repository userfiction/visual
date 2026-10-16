import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// One continuous pointed oval avoids the old ellipse's round, detached nubs.
// The diagonal highlight follows the rind without relying on a background color.
export const ICON_LEMON =
    `<path d="M3.8 14.1C3.6 10.3 8.2 6.2 12.8 6.2 15.6 6.1 17.1 7.3 18.6 7.1L20.3 6.9 20.1 9C20 10.1 21 11.1 20.4 13.6 19.5 17.8 15.1 21.1 10.7 21 7.8 21 6.2 19.6 5.2 19.7L3.3 19.9 3.5 18C3.7 16.9 3.4 15.8 3.8 14.1zM6 13.1C7.1 10.3 9.6 8.7 12.5 8.5L12.6 9.8C10.1 10 8.3 11.4 7.2 13.6z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    flatPath('M16.7 4.9C17.4 2.2 20 1.3 22.1 1.8 21.7 4.1 19.4 5.6 16.7 4.9z');

// Existing factory and component APIs remain unchanged.
export const svgLemon: SvgIconFactory = createSvgIcon('lemon', ICON_LEMON);
export const LemonIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'lemon', content: ICON_LEMON, ...props });
