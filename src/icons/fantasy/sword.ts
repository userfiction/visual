/**
 * sword — FANTASY icon: sword (blade tip up) — redrawn (FANTASY-REDRAW).
 *
 * GEOMETRY: blade tip (12,1) tapering to the shoulders (9.5/14.5, 5), then
 * straight down to the guard at y 15. The FULLER (the blade groove) is cut
 * out as a transparent 1.1-wide slot (x 11.45..12.55, y 6..13.9) so the
 * blade reads as a ground weapon rather than a solid spike. Guard bar
 * x 6..18, y 15..17.5; grip x 11..13, y 17.5..21 with TWO full-width wrap
 * notches (y 18.4..19 and y 19.8..20.4) splitting it into three bound
 * segments. Pommel = separate ring element (outer r 1.5 at (12,22.1), hole
 * r 0.65) whose top overlaps the grip end.
 *
 * ELEMENT SPLIT (load-bearing): the pommel ring is NOT a subpath of the
 * main path — ring and grip overlap (y 20.6..21), and overlapping filled
 * subpaths inside ONE evenodd element XOR transparent (see the disjointness
 * notes in fruits/fruits.test.ts / blueberry). As a separate element the
 * overlap paints over = union; same precedent as the butterfly wings and
 * the apple stem (fruits/apple.ts). Inside the main path every hole
 * (fuller, both notches) nests inside exactly ONE filled subpath, so
 * evenodd depth stays even for holes / odd for metal.
 *
 * FILL RULE: all holes are cut EXPLICITLY by fill-rule="evenodd" — winding
 * is not load-bearing (cross-ref: the redraw convention in fruits/*.ts,
 * animals/*.ts and svg-icon.ts flatPath, which stays unchanged).
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Main silhouette (blade/guard/grip) + the negative-space fuller and the
// two grip-wrap notches in ONE evenodd element.
export const ICON_SWORD =
    `<path d="M12 1L14.5 5V15H9.5V5ZM11.45 6H12.55V13.9H11.45ZM6 15H18V17.5H6ZM11 17.5H13V21H11ZM11 18.4H13V19H11ZM11 19.8H13V20.4H11Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // Pommel ring in its OWN element (outer r 1.5 + r 0.65 hole, evenodd) so
    // its 0.4 overlap with the grip unions instead of XOR-cancelling.
    `<path d="M12 20.6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 1 1 0-3zM12 21.45a0.65 0.65 0 1 0 0 1.3a0.65 0.65 0 1 0 0-1.3z" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;

export const svgSword: SvgIconFactory = createSvgIcon('sword', ICON_SWORD);

export const SwordIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'sword', content: ICON_SWORD, ...props });
