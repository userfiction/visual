/**
 * doublePennant — FLAGS icon: two stacked pennants on one pole.
 *
 * GEOMETRY: pole rect x 4..6 spanning y 1..23; two identical tapering
 * triangles on the hoist — top M6 2l14 3.5L6 9z (tip (20,5.5)) and bottom
 * M6 11l14 3.5L6 18z (tip (20,14.5)) — separated by a 2-unit gap
 * (y 9..11) so the two flags stay distinct at 16px. Same-direction tips
 * (both pointing right) echo a yacht club / rank pair. Registered as
 * 'doublePennant'.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_DOUBLE_PENNANT = flatPath(
    'M4 1h2v22H4zM6 2l14 3.5L6 9zM6 11l14 3.5L6 18z'
);

// String layer: registers 'doublePennant' in the shared registry + bound factory
export const svgDoublePennant: SvgIconFactory = createSvgIcon(
    'doublePennant',
    ICON_DOUBLE_PENNANT
);

// React layer: same geometry through the shared flat shell
export const DoublePennantIcon = (props: IconProps) =>
    React.createElement(IconBase, {
        name: 'doublePennant',
        content: ICON_DOUBLE_PENNANT,
        ...props,
    });
