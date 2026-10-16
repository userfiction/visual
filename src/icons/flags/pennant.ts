/**
 * pennant — FLAGS icon: triangular pennant on a pole.
 *
 * GEOMETRY: pole rect x 4..6 spanning y 2..22; pennant triangle from the
 * pole (6,3) tapering to the fly tip (19,6.5) back to (6,10) — the tip sits
 * at the flag's vertical midline so the triangle reads symmetric.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_PENNANT = flatPath('M4 2h2v20H4zM6 3l13 3.5L6 10z');

// String layer: registers 'pennant' in the shared registry + bound factory
export const svgPennant: SvgIconFactory = createSvgIcon('pennant', ICON_PENNANT);

// React layer: same geometry through the shared flat shell
export const PennantIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'pennant', content: ICON_PENNANT, ...props });
