import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// A broad oval with isolated diamond scales avoids the intersecting lattice
// holes that previously cancelled or overfilled under nonzero winding.
export const ICON_PINEAPPLE =
    `<path d="M12 8C16.6 8 19.2 10.7 19.2 15.3 19.2 19.8 16.7 22.5 12 22.5S4.8 19.8 4.8 15.3C4.8 10.7 7.4 8 12 8zM12 9.5l-1.2 1.3 1.2 1.3 1.2-1.3zM8.8 12.1l-1.2 1.3 1.2 1.3 1.2-1.3zM15.2 12.1L14 13.4l1.2 1.3 1.2-1.3zM12 14.7L10.8 16l1.2 1.3 1.2-1.3zM8.8 17.3l-1.2 1.3 1.2 1.3 1.2-1.3zM15.2 17.3L14 18.6l1.2 1.3 1.2-1.3zM12 19.5l-1 1 1 1 1-1z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // Five large pointed blades keep the crown recognizable at small sizes.
    flatPath(
        'M9.5 8.2C6.8 7.9 5.8 5.7 5.2 3.5L9.5 6.1 8.6 1.6 11.1 4.5 12 .6 12.9 4.5 15.4 1.6 14.5 6.1 18.8 3.5C18.2 5.7 17.2 7.9 14.5 8.2z'
    );

// Shared content keeps the standalone factory and React component equivalent.
export const svgPineapple: SvgIconFactory = createSvgIcon('pineapple', ICON_PINEAPPLE);
export const PineappleIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'pineapple', content: ICON_PINEAPPLE, ...props });
