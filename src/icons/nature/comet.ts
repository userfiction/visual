/**
 * comet — SKY icon: circular nucleus head with a layered tapered tail
 * falling to the lower left (shooting-star.ts is the sparkle-head
 * variant). Head = literal <circle>; tail = tapered streaks.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Tapered streak helper (shooting-star.ts family)
const streak = (x1: number, y1: number, x2: number, y2: number, h: number): string =>
    `M${x1} ${y1 - h}L${x2} ${y2}L${x1} ${y1 + h}L${x1 - h} ${y1 + h}L${x1 - h} ${y1 - h}z`;

export const ICON_COMET =
    // nucleus head: literal circle per svg-icon.ts non-path convention
    `<circle cx="16.6" cy="7.4" r="3.4" fill="currentColor" stroke="none"/>` +
    flatPath(
        // main tail: start (11.9,13.1) th 2.2 → tip (3.6,21.4)
        streak(11.9, 13.1, 3.6, 21.4, 2.2) +
            // upper strand: start (13.9,9.7) th 1.0 → tip (8.4,15.2)
            streak(13.9, 9.7, 8.4, 15.2, 1.0) +
            // lower strand: start (9.9,15.7) th 0.8 → tip (6.2,19.4)
            streak(9.9, 15.7, 6.2, 19.4, 0.8)
    );

// String layer: registers 'comet' + bound factory (svg-icon.ts)
export const svgComet: SvgIconFactory = createSvgIcon('comet', ICON_COMET);

// React layer: same geometry through the shared flat shell (react.tsx)
export const CometIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'comet', content: ICON_COMET, ...props });
