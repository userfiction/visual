import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Broad shoulders, a stem dimple and two bottom lobes distinguish this apple
// from orange.ts. Explicit evenodd keeps the highlight transparent on any theme.
export const ICON_APPLE =
    `<path d="M12 7.4C9.5 5.3 5.8 6.1 4.1 8.8 1.9 12.5 4.2 19.2 7.2 21.4 9.2 22.9 10.5 21.2 12 21.2S14.8 22.9 16.8 21.4C19.8 19.2 22.1 12.5 19.9 8.8 18.2 6.1 14.5 5.3 12 7.4zM6.3 10C5 11.7 5.1 14 5.8 15.4L7 14.9C6.5 13.4 6.6 11.9 7.4 10.8z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // Short curved stalk seats inside the dimple; the leaf stays clear of it.
    flatPath(
        'M11.3 7.8C11.1 5.4 11.5 3.5 12.8 1.8L14 2.7C12.9 4.2 12.6 5.8 12.8 7.8zM14 5.2C14.1 2.6 17.1 1.5 20 2.3 18.9 4.9 16.8 6.2 14 5.2z'
    );

// Both public renderers share the same self-contained geometry (../svg-icon.ts).
export const svgApple: SvgIconFactory = createSvgIcon('apple', ICON_APPLE);
export const AppleIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'apple', content: ICON_APPLE, ...props });
