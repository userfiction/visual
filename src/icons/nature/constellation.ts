/**
 * constellation — SKY icon: linked stars — sparkle glyphs joined by thin
 * filled connector strips forming a figure (stars.ts is the loose
 * scatter). Independent overlays: strips first, sparkles stacked on top
 * so line ends never poke past glyph tips.
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

// Link strip: thin filled bar centered on segment, half-thickness h, cut
// perpendicular at both ends via the unit normal — a solid line, no stroke
const link = (x1: number, y1: number, x2: number, y2: number, h: number): string => {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = (-dy / len) * h, ny = (dx / len) * h;
    return (
        `M${x1 + nx} ${y1 + ny}L${x2 + nx} ${y2 + ny}` +
        `L${x2 - nx} ${y2 - ny}L${x1 - nx} ${y1 - ny}z`
    );
};

export const ICON_CONSTELLATION = flatPath(
    // chain (5.4,5.8)→(11.4,9.4)→(8.2,17)→(17.8,19.2) + spur (11.4,9.4)→(18.6,6.6)
    link(5.4, 5.8, 11.4, 9.4, 0.45) +
        link(11.4, 9.4, 8.2, 17, 0.45) +
        link(8.2, 17, 17.8, 19.2, 0.45) +
        link(11.4, 9.4, 18.6, 6.6, 0.45) +
        // star anchors over the link ends (disjoint sparkles):
        // A r 2.8, B r 3.2, C r 2.4, D r 2.6, E r 2.2
        sparkle(5.4, 5.8, 2.8, 0.6) +
        sparkle(11.4, 9.4, 3.2, 0.7) +
        sparkle(8.2, 17, 2.4, 0.55) +
        sparkle(17.8, 19.2, 2.6, 0.6) +
        sparkle(18.6, 6.6, 2.2, 0.5)
);

// String layer: registers 'constellation' + bound factory (svg-icon.ts)
export const svgConstellation: SvgIconFactory = createSvgIcon('constellation', ICON_CONSTELLATION);

// React layer: same geometry through the shared flat shell (react.tsx)
export const ConstellationIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'constellation', content: ICON_CONSTELLATION, ...props });
