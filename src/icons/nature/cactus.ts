/**
 * cactus — NATURE icon: saguaro cactus (two arms + ribs + flowers + ground).
 *
 * GEOMETRY: main column = rounded-top rect x 10.3..13.7 spanning
 * y 1.7..19.6; arms = mirrored paths with rounded elbows + base feet;
 * ribs = two thin COUNTERCLOCKWISE vertical line holes on the column;
 * TWO five-petal flower dots (tiny solid <circle> elements) crown the
 * column and the right arm; ground = rect x 4.4..19.6 spanning
 * y 19.6..21.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_CACTUS =
    flatPath(
        // main column (rounded top)
        'M10.3 3.4a1.7 1.7 0 0 1 3.4 0v16.2h-3.4z' +
            // left arm (rounded elbow up) + foot
            'M4.4 10.2a1.6 1.6 0 0 1 3.2 0v4.2a2 2 0 0 0 2 2v1.8a3.8 3.8 0 0 1-3.8-3.8z' +
            'M5.6 16.6h1.8v3h-1.8z' +
            // right arm + foot
            'M16.4 7.4a1.6 1.6 0 0 1 3.2 0v6.4a3.8 3.8 0 0 1-3.8 3.8v-1.8a2 2 0 0 0 2-2z' +
            'M16.6 16.6h1.8v3h-1.8z' +
            // rib line holes (thin verticals, v-first)
            'M11.2 5.4v14.2h.4v-14.2z' +
            'M12.6 5.4v14.2h.4v-14.2z' +
            // ground
            'M4.4 19.6h15.2v1.4H4.4z'
    ) +
    // flowers: tiny solid dots crowning the column and the right arm
    `<circle cx="12" cy="1.9" r="0.9" ${FLAT}/>` +
    `<circle cx="18" cy="5.7" r="0.9" ${FLAT}/>`;

// String layer: registers 'cactus' in the shared registry + bound factory
export const svgCactus: SvgIconFactory = createSvgIcon('cactus', ICON_CACTUS);

// React layer: same geometry through the shared flat shell
export const CactusIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cactus', content: ICON_CACTUS, ...props });
