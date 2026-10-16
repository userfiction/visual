/**
 * maple — NATURE icon: maple leaf (five fat rounded lobes + stem).
 *
 * GEOMETRY: leaf = one outline — five rounded lobes separated by deep
 * notches: center lobe points UP (12,2.4), side lobes splay at ±60°/±120°,
 * each lobe a fat cubic V (no pin tips — the old zigzag star read as an
 * explosion); stem = thin rect from the leaf's bottom notch down to
 * y 20.4 (veins dropped: at icon size the three line holes clogged the
 * leaf's solid read).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_MAPLE = flatPath(
    // leaf outline: five rounded lobes separated by deep notches — the
    // center lobe points UP (12,2.4), the side lobes splay at 60°/120°,
    // each lobe is a fat V (cubic curves) whose notch bottoms sit deep
    // (y 6.4/8.8/8.8/6.4); the silhouette reads as maple without pin-prick
    // tips (the old zigzag star read as an explosion)
    'M12 2.4C13.6 3.2 14.6 5 14.4 6.6 15.6 5.6 17.6 5.6 18.8 6.8 18.4 8.6 17 9.8 15.4 10 17.2 10.8 18.2 12.4 17.8 14.2 16 14.4 14.4 13.6 13.6 12.4 13.4 14 12.4 15.2 12 15.4 11.6 15.2 10.6 14 10.4 12.4 9.6 13.6 8 14.4 6.2 14.2 5.8 12.4 6.8 10.8 8.6 10 7 9.8 5.6 8.6 5.2 6.8 6.4 5.6 8.4 5.6 9.6 6.6 9.4 5 10.4 3.2 12 2.4z' +
        // stem (thin rect from the leaf's bottom notch down)
        'M11.6 15.4h0.8l0.2 5h-1.2z'
);

// String layer: registers 'maple' in the shared registry + bound factory
export const svgMaple: SvgIconFactory = createSvgIcon('maple', ICON_MAPLE);

// React layer: same geometry through the shared flat shell
export const MapleIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'maple', content: ICON_MAPLE, ...props });
