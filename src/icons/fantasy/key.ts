/**
 * key — FANTASY icon: skeleton key (horizontal, bow left) — redrawn
 * (FANTASY-REDRAW).
 *
 * GEOMETRY: the round-ring bow becomes an ORNATE DIAMOND bow — solid
 * diamond (2,12)(12,12)(7,17)(2,12) wait: vertices (7,7)(12,12)(7,17)(2,12)
 * — with a round r-1.9 hole at (7,12) cut by fill-rule="evenodd" (leaving a
 * ≥1.1 band all around). Shaft runs y 11..13 from x 11 to 19.4 with a
 * raised COLLAR at the bow junction (x 11..12.2, y 10.2..13.8 — one subpath
 * with the shaft, so no same-element overlap). The bit is the ornate end:
 * a short tooth (x 14..15.6, y 13..15.4) plus a STEPPED bit plate
 * (x 17..19.6, y 13..17.2 with the x 17..18 notch below y 15.4 removed —
 * an L-shaped profile). Bow and shaft live in SEPARATE elements because
 * they overlap around the bow tip (x 11..12) — cross-element overlap
 * unions, a same-path overlap would XOR under evenodd (same precedent as
 * the sword pommel ring in this redraw set). Tooth and bit share only
 * edges with the shaft subpath, so they stay in the shaft's element.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Ornate diamond bow with its pierced hole (one evenodd element)…
export const ICON_KEY =
    `<path d="M7 7L12 12L7 17L2 12ZM5.1 12a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // …then collar+shaft, tooth and stepped bit in one plain flat path.
    flatPath('M11 10.2H12.2V11H19.4V13H12.2V13.8H11ZM14 13H15.6V15.4H14ZM17 13H19.6V17.2H18V15.4H17Z');

export const svgKey: SvgIconFactory = createSvgIcon('key', ICON_KEY);

export const KeyIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'key', content: ICON_KEY, ...props });
