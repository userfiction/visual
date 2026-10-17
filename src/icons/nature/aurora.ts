/**
 * aurora — SKY icon: northern lights — three flowing sky ribbons
 * sweeping up across the frame (wind.ts is the short gust strokes).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_AURORA = flatPath(
    // ribbon 1 (lowest, left): lower edge sweeps up (2.6,18.2) →
    // (9.8,9.8) → (20,8.2); upper edge returns with ~2 offset; ends taper
    // to ~0.4 so the band reads as a flowing light curtain
    'M2.6 18.2C5.4 15.4 7.4 12.2 9.8 9.8C13 6.6 16.4 8 20 8.2' +
        'L20 10.2C16 9.6 13.4 8.8 11.4 10.6C9.2 12.6 6 16.2 3.8 19z' +
        // ribbon 2 (middle, longer): (4.4,21.2) → (13.2,13.4) →
        // (21.4,13.8), offset ~2.2
        'M4.4 21.2C7.8 18.6 10.6 15.6 13.2 13.4C15.8 11.2 18.8 13 21.4 13.8' +
            'L21.4 16C18.6 15 16.4 13.6 14.6 15.2C12 17.4 8.4 20.4 5.6 21.9z' +
        // ribbon 3 (highest, short curtain): (2.2,12.4) → (8.6,5.2),
        // offset 2.0
        'M2.2 12.4C4.6 11 6.8 8.4 8.6 5.2L10.8 5.2C9.4 8.6 6.6 11.8 4 13.4z'
);

// String layer: registers 'aurora' + bound factory (svg-icon.ts)
export const svgAurora: SvgIconFactory = createSvgIcon('aurora', ICON_AURORA);

// React layer: same geometry through the shared flat shell (react.tsx)
export const AuroraIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'aurora', content: ICON_AURORA, ...props });
