/**
 * wand — FANTASY icon: magic wand with sparkles — redrawn (FANTASY-REDRAW).
 *
 * GEOMETRY: stick = the same 2px diagonal band from (3.6,19.2) up-right to
 * the tip near (13.5,10.7). The sparkle cluster around the tip is upgraded:
 * the MAIN 4-point sparkle at (16.8,7.2) now has arm 4.2 and CONCAVE sides
 * (quadratic controls pulled to ±0.8 around the center, so the edges bow
 * inward — the classic magic-sparkle read instead of a flat diamond), and a
 * second concave sparkle (arm 2.2 at (20.2,14.4)) joins it. Two literal
 * dots complete the cluster: (13.3,2.9) r 0.9 up-left of the main sparkle
 * and (21.6,9.6) r 0.7 in the gap between the two sparkles — all four
 * elements are mutually disjoint (verified margins ≥ 1.1) so no evenodd is
 * needed anywhere in this icon.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Stick + both concave sparkles in one flat path (disjoint subpaths), then
// the two sparkle dots as literal circles.
export const ICON_WAND =
    flatPath(
        'M3.6 19.2l9.2-9.2 1.4 1.4-9.2 9.2z' +
            'M16.8 3Q17.6 6.4 21 7.2Q17.6 8 16.8 11.4Q16 8 12.6 7.2Q16 6.4 16.8 3z' +
            'M20.2 12.2Q20.7 13.9 22.4 14.4Q20.7 14.9 20.2 16.6Q19.7 14.9 18 14.4Q19.7 13.9 20.2 12.2z'
    ) +
    '<circle cx="13.3" cy="2.9" r="0.9" fill="currentColor" stroke="none"/>' +
    '<circle cx="21.6" cy="9.6" r="0.7" fill="currentColor" stroke="none"/>';

export const svgWand: SvgIconFactory = createSvgIcon('wand', ICON_WAND);

export const WandIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'wand', content: ICON_WAND, ...props });
