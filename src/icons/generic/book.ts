/**
 * book — generic content glyph: closed book (📖) with a bookmark notch.
 *
 * GEOMETRY: solid book body with a notch cut into the spine; the notch
 * subpath winds OPPOSITE to the outer body (verified shoelace signs) so the
 * default nonzero fill rule cuts the hole.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_BOOK = flatPath(
    'M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6 4h5v8l-2.5-1.5L6 12V4z'
);

export const svgBook: SvgIconFactory = createSvgIcon('book', ICON_BOOK);

export const BookIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'book', content: ICON_BOOK, ...props });
