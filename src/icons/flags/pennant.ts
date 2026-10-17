/**
 * pennant — FLAGS icon: triangular pennant on a pole (uplifted geometry).
 *
 * GEOMETRY: pole rect x 4..6 spanning y 1..23; pennant triangle from the
 * pole top (6,2) tapering to the fly tip (22,7) back to (6,12) — the tip
 * sits on the flag's vertical midline (y 7) so the triangle reads symmetric.
 * Uplift vs the old 13×5 sliver (tip (19,6.5)): 16-long × 10-tall triangle,
 * tip reaching x 22 for max span. Registered as 'pennant'.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_PENNANT = flatPath('M4 1h2v22H4zM6 2l16 5-16 5z');

// String layer: registers 'pennant' in the shared registry + bound factory
export const svgPennant: SvgIconFactory = createSvgIcon('pennant', ICON_PENNANT);

// React layer: same geometry through the shared flat shell
export const PennantIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'pennant', content: ICON_PENNANT, ...props });
