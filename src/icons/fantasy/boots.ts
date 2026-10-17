import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Offset pair of adventuring boots; transparent buckle slots and a separate
// sole preserve material detail even in monochrome (see ui/main.ts sizing).
export const ICON_BOOTS = flatPath('M2 2H10V5H2ZM3 6H9V12L11 14V17H2V14H3ZM13 5H22V8H13ZM12 22H23V24H12Z') +
    '<path d="M14 9H21V16L23 18V21H12V18H14ZM16 11V13H19V11ZM16 15V17H19V15Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';
export const svgBoots: SvgIconFactory = createSvgIcon('boots', ICON_BOOTS);
export const BootsIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'boots', content: ICON_BOOTS, ...props });
