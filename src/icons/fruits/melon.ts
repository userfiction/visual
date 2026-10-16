import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Broad curved ribs describe a whole muskmelon. Disjoint cutouts avoid the
// crossing net bands that previously collapsed into a nearly plain circle.
export const ICON_MELON =
    `<path d="M21.5 13a9.5 9.5 0 1 1 -19 0 9.5 9.5 0 1 1 19 0zM10.3 5.5C6.7 9.3 6.7 16.8 10.3 20.5L11.2 19.7C8.3 16.1 8.3 9.9 11.2 6.3zM13.7 5.5L12.8 6.3C15.7 9.9 15.7 16.1 12.8 19.7L13.7 20.5C17.3 16.8 17.3 9.3 13.7 5.5zM5.7 8.1C3.7 10.9 3.7 15.1 5.7 17.9L6.7 17.2C5.2 14.6 5.2 11.4 6.7 8.8zM18.3 8.1L17.3 8.8C18.8 11.4 18.8 14.6 17.3 17.2L18.3 17.9C20.3 15.1 20.3 10.9 18.3 8.1z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // A short curved stalk, not a long cherry stem, meets the top of the rind.
    flatPath('M11.3 4.2C11 2.4 11.9 1 13.8 1L14 2.3C12.8 2.3 12.5 3 12.7 4.2z');

// Both public renderers reuse the same theme-independent geometry.
export const svgMelon: SvgIconFactory = createSvgIcon('melon', ICON_MELON);
export const MelonIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'melon', content: ICON_MELON, ...props });
