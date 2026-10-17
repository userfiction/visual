/**
 * tornado — SKY icon: funnel cloud (wide cap, whipping spiral tail).
 *
 * GEOMETRY: six stacked horizontal bars (thickness ≈1.7) narrowing
 * downward — widths 17.6/15.2/12.4/9.6/7/4.6 centered on x 12, each end
 * pulled slightly left/right alternately for a twisted read; the lowest
 * sliver tilts right (the whipping tail tip).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_TORNADO = flatPath(
    // cap bar
    'M2.4 3.4h17.2v1.8H2.4z' +
        // narrowing bars (centered, alternate end offsets → twist)
        'M4.8 6.2H20l-1 1.8H5.4z' +
        'M6.4 9h12.4l-1.2 1.8H7.8z' +
        'M8.2 11.8h8.6l-1.4 1.8H9.4z' +
        'M9.8 14.6h4.4l-1.6 1.8h-2.6z' +
        // tilted tail tip
        'M10.4 17.4h2.6l1.6 2.4h-2.6z'
);

// String layer: registers 'tornado' in the shared registry + bound factory
export const svgTornado: SvgIconFactory = createSvgIcon('tornado', ICON_TORNADO);

// React layer: same geometry through the shared flat shell
export const TornadoIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'tornado', content: ICON_TORNADO, ...props });
