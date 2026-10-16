/**
 * fir — NATURE icon: fir tree (narrow four-tier conifer + trunk + ground).
 *
 * GEOMETRY: four slim triangle tiers (tips y 1.4→14.4, bases 6/8.8/11.2/
 * 13.6 wide) overlap; each tier carries a thin COUNTERCLOCKWISE snow-line
 * hole along its bottom edge (the fir's snow-laden look); trunk = rect
 * x 11..13 spanning y 21.4..22.6; ground = rect x 7..17 spanning
 * y 22.6..23.4.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_FIR = flatPath(
    'M12 1.4L15 6.4h-6zM12 5L16.4 11H7.6zM12 9.6L17.6 16.4H6.4zM12 14.4L18.8 21.4H5.2z' +
        // snow lines (thin rects along the tier bottoms, v-first)
        'M8.4 5.6v.7h5.2v-.7z' +
        'M9 10.2v.7h6v-.7z' +
        'M7.8 15.6v.7h8.4v-.7z' +
        'M6.6 20.6v.7h10.8v-.7z' +
        // trunk + ground
        'M11 21.4h2v1.2h-2z' +
        'M7 22.6h10v.8h-10z'
);

// String layer: registers 'fir' in the shared registry + bound factory
export const svgFir: SvgIconFactory = createSvgIcon('fir', ICON_FIR);

// React layer: same geometry through the shared flat shell
export const FirIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'fir', content: ICON_FIR, ...props });
