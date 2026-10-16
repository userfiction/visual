import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// A coconut HALF with a thick flesh rim and an open oval is more distinctive
// than the previous tiny circle with face-like eyes and a lightning crack.
export const ICON_COCONUT =
    `<path d="M22 9a10 5.5 0 1 1 -20 0 10 5.5 0 1 1 20 0zM19.6 8.7a7.6 3.4 0 1 0 -15.2 0 7.6 3.4 0 1 0 15.2 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // Separated husk follows the bowl; three broad notches suggest fibres.
    flatPath(
        'M2.3 12.5C4.5 15 7.8 16 12 16S19.5 15 21.7 12.5C21.2 16.1 19.6 19 17.1 20.4L17.8 17.5 16.5 17.2 15.5 21.1C14.6 21.5 13.7 21.7 12.7 21.8V18.8H11.3V21.8C10.3 21.7 9.4 21.5 8.5 21.1L7.5 17.2 6.2 17.5 6.9 20.4C4.4 19 2.8 16.1 2.3 12.5z'
    );

// Same content for portable SVG strings and the React shell.
export const svgCoconut: SvgIconFactory = createSvgIcon('coconut', ICON_COCONUT);
export const CoconutIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'coconut', content: ICON_COCONUT, ...props });
