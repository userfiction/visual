/**
 * flower — NATURE icon: flower (five-petal rosette + stem + two leaves).
 *
 * GEOMETRY: petals = five solid <circle> elements r 2.3 arranged on a ring
 * around (12,8.9) unioned with the center disc r 2.1; stem = rect
 * x 11.4..12.6 spanning y 12.2..21.2; TWO leaf lenses on the stem (one
 * right at y 16.4, one left at y 18.6 — opposite pairs read as foliage).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_FLOWER =
    flatPath(
        // stem + two leaves
        'M11.4 12.2h1.2v9h-1.2z' +
            'M12.6 16.4c2.4-1.4 4.6-1 5.6.4-2.2 1.6-4.4 1.2-5.6-.4z' +
            'M11.4 18.6c-2.4-1.4-4.6-1-5.6.4 2.2 1.6 4.4 1.2 5.6-.4z'
    ) +
    // petals: five solid circles on a ring + center disc
    `<circle cx="12" cy="5.6" r="2.3" ${FLAT}/>` +
    `<circle cx="15.4" cy="8" r="2.3" ${FLAT}/>` +
    `<circle cx="14.1" cy="12" r="2.3" ${FLAT}/>` +
    `<circle cx="9.9" cy="12" r="2.3" ${FLAT}/>` +
    `<circle cx="8.6" cy="8" r="2.3" ${FLAT}/>` +
    `<circle cx="12" cy="9" r="2.1" ${FLAT}/>`;

// String layer: registers 'flower' in the shared registry + bound factory
export const svgFlower: SvgIconFactory = createSvgIcon('flower', ICON_FLOWER);

// React layer: same geometry through the shared flat shell
export const FlowerIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'flower', content: ICON_FLOWER, ...props });
