/**
 * tatteredFlag — FLAGS icon: flag with a torn, jagged fly edge.
 *
 * GEOMETRY: pole rect x 4..6 spanning y 1..23; flag x 6..21 spanning
 * y 3..13 whose fly edge zigzags with IRREGULAR depths — h15 to (21,3),
 * then l-4 3 → (17,6), l3 2 → (20,8), l-4 3 → (16,11), l3 2 → (19,13),
 * H6 closes. The uneven tooth pattern (3/2/3/2 descents with alternating
 * 4-left/3-right runs) reads as ripped fabric, distinct from
 * swallowtail-flag.ts (one clean notch) and forked-flag.ts (two straight
 * tails). Registered as 'tatteredFlag'.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_TATTERED_FLAG = flatPath('M4 1h2v22H4zM6 3h15l-4 3 3 2-4 3 3 2H6z');

// String layer: registers 'tatteredFlag' in the shared registry + bound factory
export const svgTatteredFlag: SvgIconFactory = createSvgIcon(
    'tatteredFlag',
    ICON_TATTERED_FLAG
);

// React layer: same geometry through the shared flat shell
export const TatteredFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, {
        name: 'tatteredFlag',
        content: ICON_TATTERED_FLAG,
        ...props,
    });
