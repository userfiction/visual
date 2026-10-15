/**
 * trash — generic action glyph: trash can (🗑).
 *
 * GEOMETRY: solid can body + lid bar above it (Material delete geometry) —
 * both subpaths wind the same direction (no holes).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_TRASH = flatPath(
    'M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'
);

export const svgTrash: SvgIconFactory = createSvgIcon('trash', ICON_TRASH);

export const TrashIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'trash', content: ICON_TRASH, ...props });
