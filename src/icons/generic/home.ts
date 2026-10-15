/**
 * home — generic places glyph: house (⌂).
 *
 * GEOMETRY: solid house with a door notch (Material home geometry) — the
 * notch subpath winds opposite to the outer body, cutting the door under
 * the default nonzero fill rule.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_HOME = flatPath('M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z');

export const svgHome: SvgIconFactory = createSvgIcon('home', ICON_HOME);

export const HomeIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'home', content: ICON_HOME, ...props });
