/**
 * wavingFlag — FLAGS icon: waving flag on a pole.
 *
 * GEOMETRY: pole rect x 4..6 spanning y 2..22; flag band x 6..19 spanning
 * y 3..9 whose top edge is an up-down S wave (cubic c2.2-1.1 … then mirrored
 * s-curve) and whose bottom edge mirrors it — a constant-thickness ribbon
 * (~1 wave amplitude) so the flat fill still reads as fabric in motion.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_WAVING_FLAG = flatPath(
    'M4 2h2v20H4zM6 3c2.2-1.1 4.4-1.1 6.6 0s4.4 1.1 6.4 0v6c-2 1.1-4.2 1.1-6.4 0s-4.4-1.1-6.6 0z'
);

// String layer: registers 'wavingFlag' in the shared registry + bound factory
export const svgWavingFlag: SvgIconFactory = createSvgIcon('wavingFlag', ICON_WAVING_FLAG);

// React layer: same geometry through the shared flat shell
export const WavingFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'wavingFlag', content: ICON_WAVING_FLAG, ...props });
