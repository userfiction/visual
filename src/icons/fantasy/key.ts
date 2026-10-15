/**
 * key — FANTASY icon: skeleton key (horizontal, bow left).
 *
 * GEOMETRY: bow = ring (outer r 4 circle at (7,12)) with a round hole
 * (r 1.8). WINDING IS LOAD-BEARING: the outer ring is traversed
 * counterclockwise (sweep-0 arcs, negative shoelace) while the hole runs
 * clockwise (sweep-1 arcs, positive shoelace), so the nonzero rule cuts
 * the hole. Shaft (x 10..19, y 11..13) overlaps the bow's right edge;
 * two teeth hang below the shaft at x 13.5..15.5 (short) and x 17..19
 * (long, at the shaft end).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_KEY = flatPath(
    'M7 8A4 4 0 1 0 7 16A4 4 0 1 0 7 8ZM7 10.2A1.8 1.8 0 1 1 7 13.8A1.8 1.8 0 1 1 7 10.2ZM10 11H19V13H10ZM13.5 13H15.5V15.5H13.5ZM17 13H19V16H17Z'
);

export const svgKey: SvgIconFactory = createSvgIcon('key', ICON_KEY);

export const KeyIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'key', content: ICON_KEY, ...props });
