/**
 * close — generic UI glyph: close / clear (✕).
 *
 * GEOMETRY: single-outline X (adapted Material close) — a 2px-band diagonal
 * cross drawn as ONE subpath, so there are no winding concerns.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CLOSE = flatPath(
    'M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z'
);

export const svgClose: SvgIconFactory = createSvgIcon('close', ICON_CLOSE);

export const CloseIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'close', content: ICON_CLOSE, ...props });
