import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Broad shoulders taper to a rounded point: unlike the previous round berry,
// the silhouette reads as strawberry even before its seven seed cutouts.
export const ICON_STRAWBERRY =
    `<path d="M4.4 8.2C6.1 6.8 8.8 7 12 7.7 15.2 7 17.9 6.8 19.6 8.2 22.9 11.2 17.3 20.3 12 22.5 6.7 20.3 1.1 11.2 4.4 8.2zM6.3 10.3l.4 1.9 1-.3-.4-1.9zM11.4 10.2v2h1.2v-2zM17.7 10.3l-1-.3-.4 1.9 1 .3zM8.1 14.1l.5 1.8 1.1-.3-.5-1.8zM14.8 13.8l-.5 1.8 1.1.3.5-1.8zM11.4 17.4v1.8h1.2v-1.8zM11.4 14v1.8h1.2V14z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // Calyx blades are separated from the fruit by their concave silhouette.
    flatPath('M11.4 4.8V1.5h1.3v3.3L17 3.5 15.5 6 19 6.9 14.4 8 12 6.4 9.6 8 5 6.9 8.5 6 7 3.5z');

// Both layers consume this exact geometry via the existing icon registry.
export const svgStrawberry: SvgIconFactory = createSvgIcon('strawberry', ICON_STRAWBERRY);
export const StrawberryIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'strawberry', content: ICON_STRAWBERRY, ...props });
