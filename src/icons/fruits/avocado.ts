import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// A rounded taper replaces the bottle neck. A skin border, clear flesh and
// large SOLID pit communicate a halved avocado, not a pear with a hole.
export const ICON_AVOCADO =
    `<path d="M12 1.5C15.6 1.5 15.6 6 17.8 8.8 20 11.6 21 13.2 21 16.1 21 20.2 17.1 22.5 12 22.5S3 20.2 3 16.1C3 13.2 4 11.6 6.2 8.8 8.4 6 8.4 1.5 12 1.5zM12 3.2C9.8 3.2 9.8 7 7.5 9.8 5.5 12.4 4.7 13.9 4.7 16.1 4.7 19.1 7.8 20.8 12 20.8S19.3 19.1 19.3 16.1C19.3 13.9 18.5 12.4 16.5 9.8 14.2 7 14.2 3.2 12 3.2z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // The pit stays disconnected from the skin so its round shape survives.
    flatPath('M16.1 15.7a4.1 4.3 0 1 1 -8.2 0 4.1 4.3 0 1 1 8.2 0z');

// Keep public APIs unchanged; IconBase consumes the same content string.
export const svgAvocado: SvgIconFactory = createSvgIcon('avocado', ICON_AVOCADO);
export const AvocadoIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'avocado', content: ICON_AVOCADO, ...props });
