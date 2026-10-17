/**
 * wavingFlag — FLAGS icon: waving flag on a pole (uplifted geometry).
 *
 * GEOMETRY: pole rect x 4..6 spanning y 1..23; constant-thickness ribbon
 * x 6..21 whose top edge is an S wave — cubic c2.5-1.5 5-1.5 7.5 0 crests
 * UP to y≈1.9 by x 13.5, then the mirrored s-curve dips DOWN to y≈4.1 by
 * x 21 — and the right edge v8 drops 8 units so the bottom edge (traversed
 * right-to-left with mirrored cubics) rides exactly 8 below the top edge
 * at every x (checked: thickness 8 at x 6/9.75/17/21). Uplift vs the old
 * 6-unit band: an 8-unit ribbon fills more of the grid so the wave reads
 * at 16px. Registered as 'wavingFlag'.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_WAVING_FLAG = flatPath(
    'M4 1h2v22H4zM6 3c2.5-1.5 5-1.5 7.5 0s5 1.5 7.5 0v8c-2.5 1.5-5 1.5-7.5 0s-5-1.5-7.5 0z'
);

// String layer: registers 'wavingFlag' in the shared registry + bound factory
export const svgWavingFlag: SvgIconFactory = createSvgIcon('wavingFlag', ICON_WAVING_FLAG);

// React layer: same geometry through the shared flat shell
export const WavingFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'wavingFlag', content: ICON_WAVING_FLAG, ...props });
