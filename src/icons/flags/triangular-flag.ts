/**
 * triangularFlag — FLAGS icon: right-triangle flag on a pole.
 *
 * GEOMETRY: pole rect x 4..6 spanning y 1..23; flag triangle M6 3h15L6 13z
 * — horizontal top edge to (21,3), hypotenuse back down to (6,13), close
 * along the pole. The RIGHT ANGLE at the hoist (vs pennant.ts's symmetric
 * taper to a midline tip) is the distinguishing silhouette. Flat path, no
 * holes; registered as 'triangularFlag' via createSvgIcon (cross-ref:
 * ../svg-icon.ts registry contract).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_TRIANGULAR_FLAG = flatPath('M4 1h2v22H4zM6 3h15L6 13z');

// String layer: registers 'triangularFlag' in the shared registry + bound factory
export const svgTriangularFlag: SvgIconFactory = createSvgIcon(
    'triangularFlag',
    ICON_TRIANGULAR_FLAG
);

// React layer: same geometry through the shared flat shell
export const TriangularFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, {
        name: 'triangularFlag',
        content: ICON_TRIANGULAR_FLAG,
        ...props,
    });
