/**
 * scroll — FANTASY icon: rolled parchment scroll — redrawn (FANTASY-REDRAW).
 *
 * GEOMETRY: the two pill rolls (rect 18×4, rx 2, x 3..21 at y 3 and y 17)
 * and the body (x 5..19, y 5..19) keep their silhouettes — the WRITING is
 * the new detail: four transparent line slots cut from the body by
 * fill-rule="evenodd" (height 1.1, pitch 2.8, left margin 2.6 at x 7.6) with
 * varied right ends so the lines read as text: y 7.6 (→16.4), y 10.4
 * (→14.2), y 13.2 (→16.4), y 16 (→12.4). Line 4 tucks 0.1 under the bottom
 * roll — the roll is a LATER element, so it paints over that sliver
 * (cross-element overlap unions; the body path itself only carries holes
 * that nest inside its own subpath). The body therefore switches from a
 * literal <rect> to an evenodd <path>; the rolls stay literal rects.
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_SCROLL =
    `<rect x="3" y="3" width="18" height="4" rx="2" ${FLAT}/>` +
    // Body with the four writing-line holes (evenodd, winding irrelevant).
    `<path d="M5 5H19V19H5ZM7.6 7.6H16.4V8.7H7.6ZM7.6 10.4H14.2V11.5H7.6ZM7.6 13.2H16.4V14.3H7.6ZM7.6 16H12.4V17.1H7.6Z" ${FLAT} fill-rule="evenodd"/>` +
    `<rect x="3" y="17" width="18" height="4" rx="2" ${FLAT}/>`;

export const svgScroll: SvgIconFactory = createSvgIcon('scroll', ICON_SCROLL);

export const ScrollIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'scroll', content: ICON_SCROLL, ...props });
