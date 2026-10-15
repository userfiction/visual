/**
 * pin — generic places glyph: map pin (📍).
 *
 * GEOMETRY: solid teardrop with a round hole — the dot subpath winds
 * OPPOSITE to the outer sweep-0 arcs, so the nonzero rule cuts it (the
 * hole command deliberately uses sweep-1 arcs, the outer body sweep-0).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_PIN = flatPath(
    'M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z'
);

export const svgPin: SvgIconFactory = createSvgIcon('pin', ICON_PIN);

export const PinIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'pin', content: ICON_PIN, ...props });
