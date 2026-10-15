/**
 * bookmark — generic content glyph: bookmark (🔖).
 *
 * GEOMETRY: solid ribbon with a notched tail (Material bookmark geometry).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_BOOKMARK = flatPath('M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2z');

export const svgBookmark: SvgIconFactory = createSvgIcon('bookmark', ICON_BOOKMARK);

export const BookmarkIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'bookmark', content: ICON_BOOKMARK, ...props });
