/**
 * paw — ANIMALS icon: paw print.
 *
 * GEOMETRY: palm = ellipse rx 6.2 ry 5.2 at (12,15) drawn CLOCKWISE; four
 * toe <circle> elements (r 2.4–2.7) positioned so each bottom edge overlaps
 * the palm's top boundary (verified against the palm ellipse) — no holes.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_PAW =
    flatPath(
        // palm ellipse, clockwise
        'M5.8 15a6.2 5.2 0 1 1 12.4 0a6.2 5.2 0 1 1 -12.4 0z'
    ) +
    // toes: outer pair lower/smaller, inner pair higher/bigger
    `<circle cx="6.4" cy="11.6" r="2.6" ${FLAT}/>` +
    `<circle cx="10.2" cy="9.4" r="2.7" ${FLAT}/>` +
    `<circle cx="13.8" cy="9.4" r="2.7" ${FLAT}/>` +
    `<circle cx="17.6" cy="11.6" r="2.6" ${FLAT}/>`;

// String layer: registers 'paw' in the shared registry + bound factory
export const svgPaw: SvgIconFactory = createSvgIcon('paw', ICON_PAW);

// React layer: same geometry through the shared flat shell
export const PawIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'paw', content: ICON_PAW, ...props });
