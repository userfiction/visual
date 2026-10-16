/**
 * bush — NATURE icon: bush (wide mound of overlapping bumps + berries +
 * ground).
 *
 * GEOMETRY: mound = one outline — center bump with cubic shoulders to
 * wider side bumps (the layered shrub silhouette); THREE COUNTERCLOCKWISE
 * berry holes (circles r 0.8) dot the mound; ground = rect
 * x 2.4..21.6 spanning y 17.6..19.2.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_BUSH = flatPath(
    'M4 17.6c-1.9-2.4-1.4-5.6 1.2-6.9.2-2.6 2.3-4.4 4.8-4.2A4.3 4.3 0 0 1 12 4.6c.9 0 1.6.7 2 1.9 2.5-.2 4.6 1.6 4.8 4.2 2.6 1.3 3.1 4.5 1.2 6.9z' +
        // berry holes, counterclockwise (inside the mound only)
        'M7.1 12.4a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0z' +
        'M11.2 9.4a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0z' +
        'M15.3 12.4a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0z' +
        // ground line
        'M2.4 17.6h19.2v1.6H2.4z'
);

// String layer: registers 'bush' in the shared registry + bound factory
export const svgBush: SvgIconFactory = createSvgIcon('bush', ICON_BUSH);

// React layer: same geometry through the shared flat shell
export const BushIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'bush', content: ICON_BUSH, ...props });
