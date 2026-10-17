import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Rounded lid, metal straps and keyhole identify a loot chest rather than
// a generic box; all inner recesses are real transparent cutouts.
export const ICON_CHEST = '<path d="M2 11V8Q2 3 7 3H17Q22 3 22 8V11ZM5 6V10H7V6ZM17 6V10H19V6ZM2 13H9V17H15V13H22V22H2ZM5 15V20H7V15ZM17 15V20H19V15Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M10 12H14V16H10ZM11.5 13V15H12.5V13Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';
export const svgChest: SvgIconFactory = createSvgIcon('chest', ICON_CHEST);
export const ChestIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'chest', content: ICON_CHEST, ...props });
