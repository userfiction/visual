/**
 * victoryFlag — FLAGS icon: victory banner with a star punched through.
 *
 * GEOMETRY (one evenodd element — flatPath has no fill-rule, so the
 * literal path carries fill-rule="evenodd"; see fantasy/crown.ts for the
 * same precedent): pole rect x 4..6 y 1..23; swallowtail-bottom banner
 * x 6..21 y 3..15 whose closing edges cut a V notch with apex pointing
 * UP at (13.5,10.5); five-point star hole centered (13.5,8.2) — outer
 * radius 2.9, inner radius 1.2, points listed tip-first (top (13.5,5.3),
 * lower outer tips (15.2/11.8, 10.55) stay above the notch boundary
 * y = 10.5+abs(x−13.5)·0.6 ≈ 11.5 there, so the star never bleeds into the
 * notch). Registered as 'victoryFlag'.
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// d attribute: pole + swallowtail-bottom banner + ten-point star outline.
// Star listed tip-first; implicit L after M (multiple coordinate pairs).
const VICTORY_D =
    'M4 1h2v22H4z' +
    'M6 3h15v12l-7.5-4.5L6 15z' +
    'M13.5 5.3 14.21 7.23 16.26 7.3 14.64 8.57 15.2 10.55 13.5 9.4 11.8 10.55 12.36 8.57 10.74 7.3 12.79 7.23z';

// …wrapped in the evenodd path element (flatPath cannot carry fill-rule).
export const ICON_VICTORY_FLAG = `<path d="${VICTORY_D}" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;

// String layer: registers 'victoryFlag' in the shared registry + bound factory
export const svgVictoryFlag: SvgIconFactory = createSvgIcon('victoryFlag', ICON_VICTORY_FLAG);

// React layer: same geometry through the shared flat shell
export const VictoryFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'victoryFlag', content: ICON_VICTORY_FLAG, ...props });
