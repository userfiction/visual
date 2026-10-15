/**
 * scroll — FANTASY icon: rolled parchment scroll.
 *
 * GEOMETRY: three stacked elements — pill-shaped top roll (rect 18×4,
 * rx 2, x 3..21), solid body (rect 14×14, x 5..19) and matching bottom
 * roll — the rolls protrude 2 units past the body on each side so the
 * silhouette reads as rolled parchment. rects keep the same per-element
 * flat attributes as every other definition (self-contained, portable).
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_SCROLL =
    `<rect x="3" y="3" width="18" height="4" rx="2" ${FLAT}/>` +
    `<rect x="5" y="5" width="14" height="14" ${FLAT}/>` +
    `<rect x="3" y="17" width="18" height="4" rx="2" ${FLAT}/>`;

export const svgScroll: SvgIconFactory = createSvgIcon('scroll', ICON_SCROLL);

export const ScrollIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'scroll', content: ICON_SCROLL, ...props });
