/**
 * flag — FLAGS icon: rectangular flag on a pole (uplifted geometry).
 *
 * GEOMETRY: pole rect x 4..6 spanning y 1..23 (full-height pole), attached
 * flag rect x 6..21 spanning y 3..14 — two rect subpaths in one flat path,
 * no holes. Uplift vs the old 7-unit-tall flag (x 6..19, y 3..10): the flag
 * now spans 15×11 units so the silhouette reads at 16px instead of a
 * speck. Registered as 'flag' via createSvgIcon (cross-ref: ../svg-icon.ts
 * registry + flatPath convention).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_FLAG = flatPath('M4 1h2v22H4zM6 3h15v11H6z');

// String layer: registers 'flag' in the shared registry + bound factory
export const svgFlag: SvgIconFactory = createSvgIcon('flag', ICON_FLAG);

// React layer: same geometry through the shared flat shell
export const FlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'flag', content: ICON_FLAG, ...props });
