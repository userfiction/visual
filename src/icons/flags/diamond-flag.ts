/**
 * diamondFlag — FLAGS icon: flag with a diamond cut as negative space.
 *
 * GEOMETRY: pole rect x 4..6 spanning y 1..23; flag body x 6..20 spanning
 * y 3..13 drawn CLOCKWISE, with a diamond hole cut COUNTERCLOCKWISE
 * (reversed vertex order — opposite shoelace sign) centered on the flag
 * midlines (13,8): M13 5l-3 3 3 3 3-3z gives points (13,5) (10,8)
 * (13,11) (16,8), a 6×6 rhombus. Explicit evenodd subtracts the diamond
 * independent of winding, as in cross-flag.ts (../svg-icon.ts shell).
 * Registered as 'diamondFlag'.
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_DIAMOND_FLAG =
    '<path d="M4 1h2v22H4zM6 3h14v10H6zM13 5l-3 3 3 3 3-3z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';

// String layer: registers 'diamondFlag' in the shared registry + bound factory
export const svgDiamondFlag: SvgIconFactory = createSvgIcon('diamondFlag', ICON_DIAMOND_FLAG);

// React layer: same geometry through the shared flat shell
export const DiamondFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'diamondFlag', content: ICON_DIAMOND_FLAG, ...props });
