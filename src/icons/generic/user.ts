/**
 * user — generic people glyph: user silhouette (👤).
 *
 * GEOMETRY: solid head circle + shoulders arc (Material person geometry).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_USER = flatPath(
    'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
);

export const svgUser: SvgIconFactory = createSvgIcon('user', ICON_USER);

export const UserIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'user', content: ICON_USER, ...props });
