/**
 * gem — FANTASY icon: faceted gem / diamond — redrawn (FANTASY-REDRAW).
 *
 * GEOMETRY: brilliant silhouette unchanged (table edge (6,5)..(18,5),
 * girdle points (3,10)/(21,10), culet (12,21)); the FACETS are the new
 * negative-space cuts, all in ONE evenodd element:
 *   - GIRDLE SLOT (band y 9.6..10.4): splits crown from pavilion. Its
 *     polygon is CONFINED to the silhouette intersection (review fix: a
 *     plain x 3..21 rect pokes past the outline where the parent has
 *     evenodd depth 0, and depth 0→1 FILLS — new artifacts outside the
 *     gem, not cancellations). Confined corners: top edge x 3.24..20.76
 *     (crown edge lines (6,5)→(3,10): x = 3 + (10−y)·0.6 → 3.24 at y 9.6),
 *     the girdle points (3,10)/(21,10), bottom edge x 3.32727..20.67273
 *     (pavilion edge lines (3,10)→(12,21): x = 3 + (y−10)·9/11 → 3.32727
 *     at y 10.4) — the slot boundary rides the silhouette lines exactly,
 *     so the cut opens at the girdle tips with zero poke.
 *   - CROWN SLOTS: thin bands (0.8 wide) from the table corners down to
 *     the girdle — left (6,5)→(9..9.8, 9.6), right (17.2..18, 5)→
 *     (14.2..15, 9.6) — opening exactly at the silhouette top edge,
 *     leaving three crown facets (left kite, center table region, right
 *     kite). Fully inside the silhouette (their flanks run inside the
 *     crown edge lines).
 *   - PAVILION WEDGES: two 0.8-wide triangles from the girdle converging
 *     to the culet — (9..9.8, 10.4)→(12,21) and (14.2..15, 10.4)→(12,21)
 *     — meeting only AT the culet point (no area overlap), leaving the
 *     classic three-facet pavilion read. Fully inside the pavilion.
 * Winding is not load-bearing: every cut nests inside the silhouette
 * subpath (depth 2), and slots that meet along edges never overlap in
 * area (cross-ref: fruits/*.ts redraw convention; svg-icon.ts flatPath
 * unchanged).
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Silhouette (1) + girdle slot (confined to the silhouette intersection) +
// two crown slots + two pavilion wedges as evenodd holes (2).
export const ICON_GEM =
    `<path d="M12 21L3 10L6 5H18L21 10ZM3.24 9.6H20.76L21 10L20.67273 10.4H3.32727L3 10ZM6 5L9 9.6H9.8L6.8 5ZM17.2 5H18L15 9.6H14.2ZM9 10.4H9.8L12 21ZM14.2 10.4H15L12 21Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;

export const svgGem: SvgIconFactory = createSvgIcon('gem', ICON_GEM);

export const GemIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'gem', content: ICON_GEM, ...props });
