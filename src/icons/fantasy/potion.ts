/**
 * potion — FANTASY icon: Erlenmeyer potion flask — redrawn (FANTASY-REDRAW).
 *
 * GEOMETRY: one evenodd path now carries the whole glassware story.
 *   - OUTER GLASS (depth 1): lip bar (x 9..15, y 2..4) stepped into the neck
 *     (x 10..14, y 4..8.3), flaring symmetrically to the base line, closed
 *     by the r-2.2 sweep-1 corner arcs (same r as the first pass — the
 *     traversal direction was reversed to keep the clockwise family).
 *   - CAVITY (depth 2 → transparent): the glass interior inset ~1 unit
 *     (neck x 11..13 from y 4.9, flare lines to (17.9/6.1, 18.2), r-1.4
 *     corner arcs, bottom y 20.3) → the silhouette reads as hollow glass
 *     with 1-unit walls instead of a solid wedge.
 *   - LIQUID (depth 3 → filled): the cavity refilled from the surface line
 *     y 13.4 down (surface endpoints (8.5/15.5, 13.4) lie exactly on the
 *     cavity flare lines, so walls and liquid share edges — adjacency, not
 *     overlap, keeps evenodd honest).
 *   - BUBBLES (depth 4 → transparent): r 0.85 at (10.2,16.9) and r 0.65 at
 *     (13.6,18.4) punched through the liquid.
 * Around the path: CORK = literal rounded rect (x 10.6..13.4, y 0.6..2.4,
 * rx 0.7) seating 0.4 into the lip, and a FIZZ dot (r 0.75 at (12,10.9))
 * rising in the air cavity — both separate elements so they paint over the
 * transparent cavity (cross-element overlap unions; a same-path overlap
 * would XOR under evenodd — see fruits/fruits.test.ts disjointness notes).
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Glass (1) + cavity (2) + liquid (3) + bubbles (4) — evenodd depth
// arithmetic; cork rect + fizz dot as separate paint-over elements.
export const ICON_POTION =
    `<path d="M9 2H15V4H14V8.3L19.4 18.6A2.2 2.2 0 0 1 17.4 21.7H6.6A2.2 2.2 0 0 1 4.6 18.6L10 8.3V4H9ZM11 4.9H13V8.4L17.9 18.2A1.4 1.4 0 0 1 16.6 20.3H7.4A1.4 1.4 0 0 1 6.1 18.2L11 8.4ZM8.5 13.4H15.5L17.9 18.2A1.4 1.4 0 0 1 16.6 20.3H7.4A1.4 1.4 0 0 1 6.1 18.2ZM9.35 16.9a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0zM12.95 18.4a0.65 0.65 0 1 0 1.3 0a0.65 0.65 0 1 0 -1.3 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    '<rect x="10.6" y="0.6" width="2.8" height="1.8" rx="0.7" fill="currentColor" stroke="none"/>' +
    '<circle cx="12" cy="10.9" r="0.75" fill="currentColor" stroke="none"/>';

export const svgPotion: SvgIconFactory = createSvgIcon('potion', ICON_POTION);

export const PotionIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'potion', content: ICON_POTION, ...props });
