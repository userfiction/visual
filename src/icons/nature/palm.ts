/**
 * palm — NATURE icon: palm tree (curved trunk, five fronds, coconuts,
 * ground).
 *
 * GEOMETRY: trunk = curved tapering band with TWO COUNTERCLOCKWISE ring
 * line holes crossing it (the palm's trunk rings); fronds = five fat
 * blades radiating from the crown point, each with a thin COUNTERCLOCKWISE
 * midrib line hole (the blade's spine); coconuts = two solid <circle>
 * dots under the crown; ground = rect x 3.6..20.4 spanning y 21.8..22.8.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_PALM =
    flatPath(
        // trunk (curved band, base wider than top)
        'M9.3 21.8c.4-5.6 1.6-9.5 3.3-11.9l1.9 1.2c-1.5 2.2-2.7 5.9-3.2 10.7z' +
            // trunk ring line holes (thin curves crossing the band, v-first)
            'M10.05 16.2c1.4-.9 2.8-1.1 4.2-.5l-.3.8c-1.2-.5-2.4-.4-3.6.5z' +
            'M9.9 19c1.3-.7 2.6-.9 3.9-.4l-.3.8c-1.1-.4-2.2-.3-3.3.4z' +
            // fronds (five blades from the crown point 13.6,9.6) + midrib holes
            'M13.6 9.6C10.8 7.6 7.4 6.9 3.8 7.8l.4 1.6c3.2-.7 6 .1 8.3 1.9z' +
            'M6.4 7.8v1h4.4v-1z' +
            'M13.6 9.6c.1-4 2-6.9 5.5-8.3l.6 1.4c-3 1.2-4.6 3.5-4.7 6.7z' +
            'M14.4 3.6l-.8.5 3.3 5.3.8-.5z' +
            'M13.6 9.6c2.4-1.9 5.3-2.2 8.2-.8l-.7 1.4c-2.4-1.1-4.7-.9-6.8.5z' +
            'M15.3 9.4l-.7.7 3.6 3.4.7-.7z' +
            'M13.6 9.6C12 5.9 9.5 3.9 6.1 3.2l-.3 1.5c2.9.6 5 2.4 6.5 5.3z' +
            'M7.6 4l-.7.7 5.6 5.5.7-.7z' +
            'M13.6 9.6c-.2-2.5-1.6-4.2-4-5.1l.6-1.4c2.7 1.1 4.3 3.1 4.6 6z' +
            'M11.4 5.4l-.8.4 2 4.2.8-.4z' +
            // ground line
            'M3.6 21.8h16.8v1h-16.8z'
    ) +
    // coconuts: two solid dots under the crown
    `<circle cx="12.2" cy="11.6" r="1" ${FLAT}/>` +
    `<circle cx="14.6" cy="11.8" r="1" ${FLAT}/>`;

// String layer: registers 'palm' in the shared registry + bound factory
export const svgPalm: SvgIconFactory = createSvgIcon('palm', ICON_PALM);

// React layer: same geometry through the shared flat shell
export const PalmIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'palm', content: ICON_PALM, ...props });
