/**
 * flagGarland — FLAGS icon: sagging rope strung with small rectangular
 * flags.
 *
 * GEOMETRY: rope band M2 5Q12 11 22 5v1.5Q12 12.5 2 6.5z — a 1.5-thick
 * swag whose top edge sags 12·t(1−t) units (dip to y 8 at center, y 6.5
 * at the ends' underside); three 3×6 rect flags hang from it, each top
 * sunk 0.5 into the rope's lower edge so no gap shows: outer flags
 * x 4.25..7.25 / 16.75..19.75 top y 7.8 (rope underside ≈8.32 at their
 * centers), center flag x 10.5..13.5 top y 9 (underside 9.5). Distinct
 * from bunting.ts: rectangular flags on a CURVED rope vs triangular
 * pendants on a straight one. Registered as 'flagGarland'.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_FLAG_GARLAND = flatPath(
    'M2 5Q12 11 22 5v1.5Q12 12.5 2 6.5z' + // sagging rope band
        'M4.25 7.8h3v6h-3zM10.5 9h3v6h-3zM16.75 7.8h3v6h-3z' // hanging flags
);

// String layer: registers 'flagGarland' in the shared registry + bound factory
export const svgFlagGarland: SvgIconFactory = createSvgIcon(
    'flagGarland',
    ICON_FLAG_GARLAND
);

// React layer: same geometry through the shared flat shell
export const FlagGarlandIcon = (props: IconProps) =>
    React.createElement(IconBase, {
        name: 'flagGarland',
        content: ICON_FLAG_GARLAND,
        ...props,
    });
