/**
 * shooting-star — SKY icon: sparkle star head with layered tapered
 * motion-tail streaks falling to the lower left (comet.ts is the
 * round-head variant).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Four-point sparkle builder (stars.ts family)
const sparkle = (cx: number, cy: number, r: number, w: number): string =>
    `M${cx} ${cy - r}` +
    `L${cx + w} ${cy - w}L${cx + r} ${cy}L${cx + w} ${cy + w}` +
    `L${cx} ${cy + r}L${cx - w} ${cy + w}L${cx - r} ${cy}L${cx - w} ${cy - w}z`;

// Tapered streak: blunt start edge (half-thickness h) → point tip — the
// blunt left edge keeps it reading as a motion line, not a needle
const streak = (x1: number, y1: number, x2: number, y2: number, h: number): string =>
    `M${x1} ${y1 - h}L${x2} ${y2}L${x1} ${y1 + h}L${x1 - h} ${y1 + h}L${x1 - h} ${y1 - h}z`;

export const ICON_SHOOTING_STAR = flatPath(
    // sparkle head upper right (16.2,7.8) tips r 3.6
    sparkle(16.2, 7.8, 3.6, 0.7) +
        // main streak: blunt start (8.6,15.4) → tip (13.4,10.6), th 1.2
        streak(8.6, 15.4, 13.4, 10.6, 1.2) +
        // second streak below: start (9.8,18.6) → tip (13,15.4), th 0.9
        streak(9.8, 18.6, 13, 15.4, 0.9) +
        // third short streak: start (12.6,19.9) → tip (15,17.5), th 0.6
        streak(12.6, 19.9, 15, 17.5, 0.6)
);

// String layer: registers 'shootingStar' + bound factory (svg-icon.ts)
export const svgShootingStar: SvgIconFactory = createSvgIcon('shootingStar', ICON_SHOOTING_STAR);

// React layer: same geometry through the shared flat shell (react.tsx)
export const ShootingStarIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'shootingStar', content: ICON_SHOOTING_STAR, ...props });
