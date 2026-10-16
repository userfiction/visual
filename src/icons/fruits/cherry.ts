import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Diverging curved stalks lead to separate, slightly dimpled cherries.
// Highlights belong INSIDE the berry paths, not behind opaque circles.
export const ICON_CHERRY =
    flatPath(
        'M6.7 13.9C7.2 8.6 10 4.2 13.8 2.1L14.6 3.2C11.1 5.8 8.9 9.3 8.2 14.1zM16.5 14.7C16.5 9.8 15.6 6.3 13.8 2.8L15 2.2C17.2 6.4 17.9 10.2 17.9 14.7zM15.3 3C16.9 0.9 19.5 1.1 21 2.2 19.4 4.2 17.3 4.8 15.3 3z'
    ) +
    `<path d="M7.6 13.4C4.2 11.5 1.8 14 2.2 17.1 2.6 20.1 4.8 22 7.4 21.5 10.2 22 12.2 19.7 12 16.8 11.8 14 9.9 12.1 7.6 13.4zM4.2 15.1Q3 16.5 3.8 18.1L4.9 17.7Q4.4 16.6 5.2 15.8zM17 14.5C14.4 12.7 12 14.9 12.2 17.8 12.5 20.7 14.6 22.5 17 22 19.8 22.5 22 20.2 21.8 17.5 21.6 14.7 19.3 12.9 17 14.5zM14.3 16Q13.3 17.3 14 18.7L15.1 18.3Q14.7 17.3 15.4 16.7z" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;

// Shared content preserves parity between the string and React layers.
export const svgCherry: SvgIconFactory = createSvgIcon('cherry', ICON_CHERRY);
export const CherryIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cherry', content: ICON_CHERRY, ...props });
