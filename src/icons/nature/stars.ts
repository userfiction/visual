/**
 * stars — SKY icon: a scatter of three night-sky stars (sparkle cross +
 * two four-point twinkles).
 *
 * GEOMETRY: three solid sparkle glyphs as subpaths of ONE flatPath — the
 * large four-point sparkle (center (14.6,7.2), tips r 4.6) and two small
 * twinkles (centers (6.4,15.8) r 2.6 and (16.8,17.4) r 2.2); each sparkle
 * is a four-point star (diamond waist 0.6) walked tip-tip clockwise, the
 * same geometry family as generic/wand's sparkle.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Four-point sparkle builder: tips at N/E/S/W of (cx,cy) at radius r,
// waist 0.6 (the pinched center that gives the twinkle its sparkle read)
const sparkle = (cx: number, cy: number, r: number, w: number): string => {
    const pts: Array<[number, number]> = [
        [cx, cy - r], [cx + w, cy - w], [cx + r, cy], [cx + w, cy + w],
        [cx, cy + r], [cx - w, cy + w], [cx - r, cy], [cx - w, cy - w],
    ];
    return `M${cx} ${cy - r}L` + pts.slice(1).map(([x, y]) => `${x} ${y}`).join('L') + 'z';
};

export const ICON_STARS = flatPath(
    // large sparkle + two smaller twinkles
    sparkle(14.6, 7.2, 4.6, 0.9) +
        sparkle(6.4, 15.8, 2.6, 0.55) +
        sparkle(16.8, 17.4, 2.2, 0.5)
);

// String layer: registers 'stars' in the shared registry + bound factory
export const svgStars: SvgIconFactory = createSvgIcon('stars', ICON_STARS);

// React layer: same geometry through the shared flat shell
export const StarsIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'stars', content: ICON_STARS, ...props });
