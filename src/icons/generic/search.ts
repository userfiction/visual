/**
 * search — generic action glyph: magnifier (🔍).
 *
 * GEOMETRY: solid lens ring (outer sweep-0 lens vs inner sweep-1 circle = cut
 * hole) + diagonal handle (Material search geometry).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SEARCH = flatPath(
    'M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z'
);

export const svgSearch: SvgIconFactory = createSvgIcon('search', ICON_SEARCH);

export const SearchIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'search', content: ICON_SEARCH, ...props });
