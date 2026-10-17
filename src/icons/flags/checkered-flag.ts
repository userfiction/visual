/**
 * checkeredFlag — FLAGS icon: racing checkered flag on a pole (uplifted
 * geometry).
 *
 * GEOMETRY: pole rect x 3..5 spanning y 1..23; flag rect x 5..21 spanning
 * y 3..11 drawn CLOCKWISE (positive winding), with 16 checker holes of 2×2
 * cut COUNTERCLOCKWISE (`v2h2v-2z` — opposite shoelace sign) at every
 * (col+row) odd cell of the 8×4 checker grid (cols x 5+2c, rows y 3+2r).
 * Explicit evenodd cuts leave the alternating checker pattern independent
 * of subpath winding (same convention as cross-flag.ts; ../svg-icon.ts
 * flatPath intentionally has no fill-rule). Uplift: a 16-wide flag and
 * 8-col grid — bigger cells still resolve at 16px. Registered as
 * 'checkeredFlag'.
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CHECKERED_FLAG = '<path d="' + (
    'M3 1h2v22H3z' +
        'M5 3h16v8H5z' +
        // checker holes, row-major: (col+row) odd cells of grid x5+2c y3+2r
        'M7 3v2h2V3zM11 3v2h2V3zM15 3v2h2V3zM19 3v2h2V3z' +
        'M5 5v2h2V5zM9 5v2h2V5zM13 5v2h2V5zM17 5v2h2V5z' +
        'M7 7v2h2V7zM11 7v2h2V7zM15 7v2h2V7zM19 7v2h2V7z' +
        'M5 9v2h2V9zM9 9v2h2V9zM13 9v2h2V9zM17 9v2h2V9z'
) + '" fill="currentColor" stroke="none" fill-rule="evenodd"/>';

// String layer: registers 'checkeredFlag' in the shared registry + bound factory
export const svgCheckeredFlag: SvgIconFactory = createSvgIcon(
    'checkeredFlag',
    ICON_CHECKERED_FLAG
);

// React layer: same geometry through the shared flat shell
export const CheckeredFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, {
        name: 'checkeredFlag',
        content: ICON_CHECKERED_FLAG,
        ...props,
    });
