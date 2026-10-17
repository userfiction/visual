import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Pierced spearhead and socket bands reserve most of the silhouette for
// the long haft, keeping this distinct from sword.ts and dagger.ts.
export const ICON_SPEAR = '<path d="M12 0L16 7L13 11H11L8 7ZM12 3L11 7L12 8L13 7Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    flatPath('M10 12H14V14H10ZM11 15H13V22H11ZM10.5 23H13.5V24H10.5Z');
export const svgSpear: SvgIconFactory = createSvgIcon('spear', ICON_SPEAR);
export const SpearIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'spear', content: ICON_SPEAR, ...props });
