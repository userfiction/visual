import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// A thick crescent, not a narrow arc: the concave edge and raised tip make
// the banana readable at 24px. The enclosed ridge is a transparent cutout.
export const ICON_BANANA =
    `<path d="M4.3 5.3C4.2 11.7 10.7 17.3 18.1 15.1L20.9 12.9C21.4 17.3 17.5 21.6 12.6 21.6 6.1 21.6 1.9 15.3 2.6 8.2zM5.2 12.1C7.3 17.3 12.3 19.7 17.2 17.7L16.8 16.7C12.4 18.1 8.2 16.2 6.2 11.7z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // Stem and blossom tip overlap the body without detached square artifacts.
    flatPath('M2.6 8.3L2.1 3.1 4.2 2.7 4.7 5.7zM18.1 15.2L20 10.8 21.5 11.4 20.9 14.3z');

// Keep string and React exports aligned with the registry in ../builtins.ts.
export const svgBanana: SvgIconFactory = createSvgIcon('banana', ICON_BANANA);
export const BananaIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'banana', content: ICON_BANANA, ...props });
