/**
 * saltireFlag — FLAGS icon: flag with a diagonal X (saltire) cross.
 *
 * GEOMETRY (TWO elements — the saltire is painted OVER a framed field,
 * the paint-over union precedent from fantasy/crown.ts, because bands
 * crossing an evenodd/nonzero hole would cancel to transparent):
 *   1. FRAME evenodd path: outer rect x 6..20 y 3..14 plus
 *      inner rect x 8..18 y 5..12 (M8 5v7h10V5z).
 *      Explicit hole semantics leave a 2-thick border
 *      ring, interior transparent.
 *   2. SALTIRE flatPath: two diagonal band quads, both wound POSITIVE so
 *      their center overlap paints solid (a same-path evenodd would XOR
 *      it): band A M6 3L20 12 20 14 6 5z (top-left → bottom-right) and
 *      band B M20 5L6 14 6 12 20 3z (top-right → bottom-left); each has
 *      2-thick vertical ends at the flag edges and both run parallel
 *      pairs (slope ±9/14), meeting solid at the flag center (13,8.5).
 * Registered as 'saltireFlag'.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SALTIRE_FLAG =
    // 1. framed field: explicit evenodd hole; ../svg-icon.ts flatPath does
    // not accept fill-rule. Keep the intersecting saltire bands separate.
    '<path d="M6 3h14v11H6zM8 5v7h10V5z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    // 2. saltire bands painted over the frame
    flatPath('M6 3L20 12 20 14 6 5zM20 5L6 14 6 12 20 3z');

// String layer: registers 'saltireFlag' in the shared registry + bound factory
export const svgSaltireFlag: SvgIconFactory = createSvgIcon('saltireFlag', ICON_SALTIRE_FLAG);

// React layer: same geometry through the shared flat shell
export const SaltireFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'saltireFlag', content: ICON_SALTIRE_FLAG, ...props });
