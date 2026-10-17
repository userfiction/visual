/**
 * fog — SKY icon: cloud dissolving into fog banks.
 *
 * GEOMETRY: cloud = base bar (x 4.4..19.4, y 8.6..11.4) + three dome
 * circles (r 3 at (8,6.6), r 3.6 at (12.6,5.4), r 2.6 at (16,7.2) — same
 * cap family as cloud-wind.ts); fog = three horizontal bars (thickness
 * 1.7, squared ends) fading below, staggered widths/offsets.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_FOG =
    // cloud: bar + three dome circles
    flatPath('M4.4 8.6h15v2.8H4.4z') +
    '<circle cx="8" cy="6.6" r="3" fill="currentColor" stroke="none"/>' +
    '<circle cx="12.6" cy="5.4" r="3.6" fill="currentColor" stroke="none"/>' +
    '<circle cx="16" cy="7.2" r="2.6" fill="currentColor" stroke="none"/>' +
    // fog bars: staggered widths, squared ends
    flatPath('M3 13.4h17.4v1.7H3z') +
    flatPath('M5.6 17.4h12.2v1.7H5.6z') +
    flatPath('M3.8 21.4h9.4v1.7H3.8z');

// String layer: registers 'fog' in the shared registry + bound factory
export const svgFog: SvgIconFactory = createSvgIcon('fog', ICON_FOG);

// React layer: same geometry through the shared flat shell
export const FogIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'fog', content: ICON_FOG, ...props });
