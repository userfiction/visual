import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Short leaf blade has a cut-out fuller, swept guard and wrapped hilt;
// shares the currentColor/string/React contract with sword.ts.
export const ICON_DAGGER = '<path d="M12 1L16 7L14 13H10L8 7ZM12 4L11 8L12 11L13 8Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    flatPath('M6 12L10 14H14L18 12V15L14 16H10L6 15ZM10.5 17H13.5V18.5H10.5ZM10.5 19.5H13.5V21H10.5ZM10 22H14V23H10Z');
export const svgDagger: SvgIconFactory = createSvgIcon('dagger', ICON_DAGGER);
export const DaggerIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'dagger', content: ICON_DAGGER, ...props });
