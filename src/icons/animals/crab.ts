/**
 * crab — ANIMALS icon: crab with the wide body, stalked eyes, two open
 * pincer claws and three bent legs per side.
 *
 * GEOMETRY: body = ellipse rx 6.8 ry 4 at (12,14) drawn CLOCKWISE (sweep-1
 * arcs); eye stalks = two thin solid rects rising from the body's top edge
 * capped by eye rings with pupil holes in the SAME evenodd path (separate
 * painted paths cannot subtract from earlier opaque circles); claws = one solid path per
 * side — an arm ribbon from the body's upper side out to the pincer hinge,
 * then the open claw traced as two pincer tips with a notch valley between
 * them; legs = three thin solid bent bars per side angling down-out; mouth
 * line = thin v-first rect hole cut COUNTERCLOCKWISE inside the body only.
 * Machinery cross-reference: flatPath (../svg-icon.ts) + IconBase
 * (../react.tsx), same contract as animals/turtle.ts.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CRAB =
    flatPath(
        // eye stalks (thin solid rects rising from the body's top edge)
        'M9.3 8.6h0.7v2h-0.7zM14 8.6h0.7v2h-0.7z' +
            // body ellipse, clockwise
            'M5.2 14a6.8 4 0 1 1 13.6 0a6.8 4 0 1 1 -13.6 0z' +
            // left claw: arm ribbon + open pincer (notch valley between tips)
            'M7 12.4Q4.4 12.2 3.4 10.2L4.6 9.4L2.4 6.8L4.6 7L4.4 5.2L6.2 6.8Q6.8 8.8 7.2 10.6z' +
            // right claw (mirror: x' = 24 - x)
            'M17 12.4Q19.6 12.2 20.6 10.2L19.4 9.4L21.6 6.8L19.4 7L19.6 5.2L17.8 6.8Q17.2 8.8 16.8 10.6z' +
            // legs: three bent bars per side
            'M5.6 15.4L3.2 17 3.6 17.7 6 16.1zM6.2 16.8L4.4 18.8 5 19.4 6.8 17.5zM7.2 17.6L6.2 20 7 20.3 8 18z' +
            'M18.4 15.4L20.8 17 20.4 17.7 18 16.1zM17.8 16.8L19.6 18.8 19 19.4 17.2 17.5zM16.8 17.6L17.8 20 17 20.3 16 18z' +
            // mouth line hole (v-first rect, counterclockwise)
            'M10.2 14.6v0.7h3.6v-0.7z'
    ) +
    // Eye outlines and their holes must share one fill operation; evenodd
    // leaves the small centers transparent on both light and dark themes.
    '<path d="M8.65 7.6a1 1 0 1 1 2 0a1 1 0 1 1 -2 0zM9.2 7.6a0.45 0.45 0 1 0 0.9 0a0.45 0.45 0 1 0 -0.9 0zM13.35 7.6a1 1 0 1 1 2 0a1 1 0 1 1 -2 0zM13.9 7.6a0.45 0.45 0 1 0 0.9 0a0.45 0.45 0 1 0 -0.9 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';

// String layer: registers 'crab' in the shared registry + bound factory
export const svgCrab: SvgIconFactory = createSvgIcon('crab', ICON_CRAB);

// React layer: same geometry through the shared flat shell
export const CrabIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'crab', content: ICON_CRAB, ...props });
