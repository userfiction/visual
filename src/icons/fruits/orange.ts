import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// A round orange with a broad leaf, curved highlight and clustered peel pores;
// the round silhouette intentionally contrasts with apple.ts's lobed body.
export const ICON_ORANGE =
    `<path d="M20.6 13.9a8.6 8.6 0 1 1 -17.2 0 8.6 8.6 0 1 1 17.2 0zM7.7 7.9C5.8 9 4.9 11 5.2 13.1L6.5 13C6.3 11.3 7 10 8.4 9.1zM14.4 18a.65.65 0 1 0 1.3 0 .65.65 0 1 0 -1.3 0zM17 15.4a.65.65 0 1 0 1.3 0 .65.65 0 1 0 -1.3 0zM17.1 18.6a.65.65 0 1 0 1.3 0 .65.65 0 1 0 -1.3 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    flatPath('M11.4 6.2L11 2.3 12.5 2.1 12.9 6.2zM13.6 4.4C14.6 1.5 18.2 1 21 2.2 19.3 4.7 16.3 5.8 13.6 4.4z');

// Use identical geometry through both renderers (../react.tsx: IconBase).
export const svgOrange: SvgIconFactory = createSvgIcon('orange', ICON_ORANGE);
export const OrangeIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'orange', content: ICON_ORANGE, ...props });
