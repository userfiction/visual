import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Great helm with a central nasal bar, eye slits and breathing holes;
// evenodd apertures inherit the background rather than a fixed paint color.
export const ICON_HELMET = flatPath('M11 1H13V4H11Z') +
    '<path d="M12 4Q4 4 4 11V20L10 23V15H14V23L20 20V11Q20 4 12 4ZM6 10V12L10 13V11ZM14 11V13L18 12V10ZM6 16H8V17H6ZM6 19H8V20H6ZM16 16H18V17H16ZM16 19H18V20H16Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';
export const svgHelmet: SvgIconFactory = createSvgIcon('helmet', ICON_HELMET);
export const HelmetIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'helmet', content: ICON_HELMET, ...props });
