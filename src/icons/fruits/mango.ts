import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Asymmetric shoulders descend to a hooked beak. This longer kidney outline
// differs from peach.ts's symmetric cheeks and pear.ts's upright neck.
export const ICON_MANGO =
    `<path d="M12.8 5.8C17.7 4.4 21.4 8 20.6 12.8 19.9 17.8 14.8 22.3 8.9 22.1 6.7 22 4.7 21 3.2 19.3 6 18.7 5.6 15.5 5.9 12.7 6.3 8.7 8.7 6.1 12.8 5.8zM16.2 8.2C18.7 9.6 18.7 12.6 17 15.2L15.9 14.5C17.2 12.3 17.2 10.2 15.6 9.3z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    flatPath('M12 6.6L11.8 2.2 13.2 2.1 13.4 6.6zM10.8 4.9C7.4 5.5 4.5 3.9 2.9 1.6 6.4 1.2 9.5 2 10.8 4.9z');

// Preserve registry identity and rendering parity with ../builtins.ts.
export const svgMango: SvgIconFactory = createSvgIcon('mango', ICON_MANGO);
export const MangoIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'mango', content: ICON_MANGO, ...props });
