/**
 * tulip — NATURE icon: tulip (cup bloom + stem + two leaves).
 *
 * GEOMETRY: bloom = cup outline — rim with three points at the top
 * (zigzag across x 6.6..17.4), sides curving down to a rounded base at
 * y 13.4; TWO COUNTERCLOCKWISE petal-seam line holes inside the cup;
 * stem = rect x 11.4..12.6 spanning y 13.4..21.2; leaves = two wide
 * lenses hugging the stem (one per side, bases at the ground).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_TULIP = flatPath(
    // cup bloom: rim points + curved sides to a rounded base
    'M6.6 3.4L8.6 5.4 10.3 3.4 12 5.4 13.7 3.4 15.4 5.4 17.4 3.4V9.4a5.4 4 0 0 1 -10.8 0z' +
        // petal seam line holes (thin verticals inside the cup, v-first)
        'M10.35 6.4v6h.7v-6z' +
        'M12.95 6.4v6h.7v-6z' +
        // stem
        'M11.4 13.4h1.2v7.8h-1.2z' +
        // leaves (wide lenses hugging the stem)
        'M11.3 17.6C8.6 15.4 6.2 15.6 4.6 17.4c2.6 2.6 5.4 2.2 6.7.2z' +
        'M12.7 17.6c2.7-2.2 5.1-2 6.7-.2-2.6 2.6-5.4 2.2-6.7.2z' +
        // ground line
        'M4.4 21.2h15.2v1h-15.2z'
);

// String layer: registers 'tulip' in the shared registry + bound factory
export const svgTulip: SvgIconFactory = createSvgIcon('tulip', ICON_TULIP);

// React layer: same geometry through the shared flat shell
export const TulipIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'tulip', content: ICON_TULIP, ...props });
