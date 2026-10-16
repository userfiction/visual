/**
 * checkeredFlag — FLAGS icon: racing checkered flag on a pole.
 *
 * GEOMETRY: pole rect x 3..5 spanning y 2..22; flag rect x 5..19 spanning
 * y 3..11 drawn CLOCKWISE (positive winding), with 14 checker holes of 2×2
 * cut COUNTERCLOCKWISE (`v2h2v-2z` — opposite shoelace sign) at every
 * (col+row) odd cell of the 7×4 checker grid. Nonzero fill makes the holes
 * vanish, leaving the alternating checker pattern; hole winding is
 * load-bearing (same-direction subpaths would fill solid).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CHECKERED_FLAG = flatPath(
    'M3 2h2v20H3z' +
        'M5 3h14v8H5z' +
        // checker holes, row-major: (col+row) odd cells of grid x5+2c y3+2r
        'M7 3v2h2V3zM11 3v2h2V3zM15 3v2h2V3z' +
        'M5 5v2h2V5zM9 5v2h2V5zM13 5v2h2V5zM17 5v2h2V5z' +
        'M7 7v2h2V7zM11 7v2h2V7zM15 7v2h2V7z' +
        'M5 9v2h2V9zM9 9v2h2V9zM13 9v2h2V9zM17 9v2h2V9z'
);

// String layer: registers 'checkeredFlag' in the shared registry + bound factory
export const svgCheckeredFlag: SvgIconFactory = createSvgIcon('checkeredFlag', ICON_CHECKERED_FLAG);

// React layer: same geometry through the shared flat shell
export const CheckeredFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'checkeredFlag', content: ICON_CHECKERED_FLAG, ...props });
