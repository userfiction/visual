import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Deep eye sockets, nasal cavity and separated teeth suit necromancy/loot
// use cases; evenodd holes preserve the package's currentColor convention.
export const ICON_SKULL = '<path d="M12 1Q2 1 2 10V15L6 18V22H9V19H10V23H14V19H15V22H18V18L22 15V10Q22 1 12 1ZM5 9V13L9 14L10 10ZM14 10L15 14L19 13V9ZM12 14L10 17H14Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';
export const svgSkull: SvgIconFactory = createSvgIcon('skull', ICON_SKULL);
export const SkullIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'skull', content: ICON_SKULL, ...props });
