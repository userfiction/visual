/**
 * moon-stars — SKY icon: crescent moon with two twinkling stars — the
 * clear-night composite (moon.ts / stars.ts are the singles).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Four-point sparkle builder (tip → shoulder → tip walk, waist w) — same
// geometry family as stars.ts and generic/wand.ts
const sparkle = (cx: number, cy: number, r: number, w: number): string =>
    `M${cx} ${cy - r}` +
    `L${cx + w} ${cy - w}L${cx + r} ${cy}L${cx + w} ${cy + w}` +
    `L${cx} ${cy + r}L${cx - w} ${cy + w}L${cx - r} ${cy}L${cx - w} ${cy - w}z`;

export const ICON_MOON_STARS = flatPath(
    // Upright crescent spans x4..10/y2..14, visibly left of the disjoint
    // twinkles. One contour avoids the previous retracing-arc cancellation.
    'M10 2A6 6 0 1 0 10 14Q3 8 10 2z' +
        // twinkle 1 lower right (17.2,15.4) r 2.6 — clear of the horn
        sparkle(17.2, 15.4, 2.6, 0.55) +
        // twinkle 2 below the horn (13.6,19.6) r 1.8
        sparkle(13.6, 19.6, 1.8, 0.45)
);

// String layer: registers 'moonStars' + bound factory (svg-icon.ts)
export const svgMoonStars: SvgIconFactory = createSvgIcon('moonStars', ICON_MOON_STARS);

// React layer: same geometry through the shared flat shell (react.tsx)
export const MoonStarsIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'moonStars', content: ICON_MOON_STARS, ...props });
