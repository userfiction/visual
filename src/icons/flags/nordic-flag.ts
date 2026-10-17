/**
 * nordicFlag — FLAGS icon: Nordic-cross flag (monochrome, uplifted
 * geometry).
 *
 * GEOMETRY: flag rect x 3..21 spanning y 4..20 drawn CLOCKWISE, with a
 * cross-shaped hole cut COUNTERCLOCKWISE (reversed vertex order): vertical
 * band x 9..11.5 spanning the full flag height, horizontal band
 * y 10.75..13.25 spanning the full width. Explicit evenodd subtracts the
 * cross — the LEFT-offset vertical band (cross arms meet at (10.25,12))
 * is what makes the silhouette read as a Nordic flag rather than a plain
 * centered cross (see cross-flag.ts for the centered sibling). Uplift vs
 * the old 16×14 flag with 2-unit bands: an 18×16 flag with 2.5-unit bands
 * — the thicker arms stay visible at 16px. Registered as 'nordicFlag'.
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Explicit hole semantics match cross-flag.ts; flatPath in ../svg-icon.ts
// only emits the flat presentation pair and cannot specify fill-rule.
export const ICON_NORDIC_FLAG = '<path d="' + (
    'M3 4h18v16H3z' +
        // cross hole: left, down the left edge of the horizontal band,
        // then around the cross — starts LEFTWARD (opposite winding to body)
        'M9 10.75H3v2.5h6v6.75h2.5v-6.75h9.5v-2.5h-9.5V4h-2.5z'
) + '" fill="currentColor" stroke="none" fill-rule="evenodd"/>';

// String layer: registers 'nordicFlag' in the shared registry + bound factory
export const svgNordicFlag: SvgIconFactory = createSvgIcon('nordicFlag', ICON_NORDIC_FLAG);

// React layer: same geometry through the shared flat shell
export const NordicFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'nordicFlag', content: ICON_NORDIC_FLAG, ...props });
