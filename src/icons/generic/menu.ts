/**
 * menu — generic UI glyph: hamburger menu (☰).
 *
 * GEOMETRY: three 2px bars centered at y = 7/12/17 (3px gaps between them).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_MENU = flatPath('M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z');

export const svgMenu: SvgIconFactory = createSvgIcon('menu', ICON_MENU);

export const MenuIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'menu', content: ICON_MENU, ...props });
