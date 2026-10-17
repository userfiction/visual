/**
 * crown — FANTASY icon: crown — redrawn (FANTASY-REDRAW).
 *
 * GEOMETRY: three-spike crown body (side tips (4,8)/(20,8), center peak
 * (12,5.5), valleys y 10.8) on the flush base bar (x 4..20, y 16..18.5)
 * unchanged. Two jewel layers join:
 *   - BAND JEWELS: three transparent r-0.8 circle holes punched through the
 *     base bar at (7.5/12/16.5, 17.25) — 0.45 margins to the bar's top and
 *     bottom edges keep the bar continuous around them (evenodd depth 2).
 *   - ORB FINIALS: three solid balls as a SEPARATE flatPath element — r 1.05
 *     at (4,7.3)/(20,7.3) and r 1.15 at (12,4.7) — each overlapping its
 *     spike tip (the tip point sits inside the ball: 0.7/0.8 < r), reading
 *     as the classic orb-and-point finials. They stay out of the main path
 *     because that overlap would XOR transparent under evenodd (paint-over
 *     union across elements instead — same precedent as the sword pommel
 *     ring in this redraw set).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Body + base bar with the three band-jewel holes (one evenodd element)…
export const ICON_CROWN =
    `<path d="M4 16V8L7.8 10.8L12 5.5L16.2 10.8L20 8V16ZM4 16H20V18.5H4ZM6.7 17.25a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0zM11.2 17.25a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0zM15.7 17.25a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // …then the three orb finials as their own paint-over flat path.
    flatPath(
        'M4 6.25a1.05 1.05 0 1 1 0 2.1a1.05 1.05 0 1 1 0-2.1zM12 3.55a1.15 1.15 0 1 1 0 2.3a1.15 1.15 0 1 1 0-2.3zM20 6.25a1.05 1.05 0 1 1 0 2.1a1.05 1.05 0 1 1 0-2.1z'
    );

export const svgCrown: SvgIconFactory = createSvgIcon('crown', ICON_CROWN);

export const CrownIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'crown', content: ICON_CROWN, ...props });
