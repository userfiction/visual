import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// A gently bent neck flares into heavy rounded hips, rather than a flask's
// straight neck. The highlight follows the left hip and stays inside the skin.
export const ICON_PEAR =
    `<path d="M12 5.2C14.8 5.2 14.5 8.7 15.8 11 17 13.1 19.8 14.6 19.6 17.7 19.4 21 16.4 22.4 12 22.4 7.8 22.4 4.4 20.9 4.4 17.6 4.4 14.7 7 12.8 8.2 10.4 9.4 8.1 9.2 5.2 12 5.2zM7.2 14.4C5.8 16.5 6.2 18.5 7.6 19.6L8.4 18.6C7.4 17.7 7.4 16.4 8.3 15.1z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    flatPath(
        'M11.2 6C10.9 4.2 11.6 2.2 12.9 1L14 2C13 3.1 12.4 4.4 12.7 6zM14.2 4.3C15.3 1.9 17.7 1.8 19.7 2.9 18.3 4.9 16.1 5.4 14.2 4.3z'
    );

// Preserve the existing named exports and default 24px coordinate system.
export const svgPear: SvgIconFactory = createSvgIcon('pear', ICON_PEAR);
export const PearIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'pear', content: ICON_PEAR, ...props });
