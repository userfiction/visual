/**
 * rainbow — SKY icon: double rainbow arc over a cloud foot (uplift:
 * thicker bands + fuller three-dome foot).
 *
 * GEOMETRY: TWO concentric half-annulus bands arcing through the TOP over
 * center (12,18.4) — outer r 9.8→7.2, inner r 5→2.8 (each band its own
 * flatPath: outer sweep-1 arc over, inner sweep-0 back, like the previous
 * revision); a solid cloud foot (three dome circles + base bar y 18..21.4)
 * grounds the arcs.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_RAINBOW =
    // outer band (r 9.8 → 7.2)
    flatPath('M2.2 18.4a9.8 9.8 0 0 1 19.6 0L19.2 18.4a7.2 7.2 0 0 0 -14.4 0z') +
    // inner band (r 5 → 2.8)
    flatPath('M7 18.4a5 5 0 0 1 10 0L14.8 18.4a2.8 2.8 0 0 0 -5.6 0z') +
    // cloud foot: base bar + three dome circles (overlap unions, same fill)
    flatPath('M4.8 18h15.2v3.4H4.8z') +
    '<circle cx="8" cy="17.4" r="2.6" fill="currentColor" stroke="none"/>' +
    '<circle cx="12.6" cy="16.2" r="3" fill="currentColor" stroke="none"/>' +
    '<circle cx="17" cy="17.6" r="2.3" fill="currentColor" stroke="none"/>';

// String layer: registers 'rainbow' in the shared registry + bound factory
export const svgRainbow: SvgIconFactory = createSvgIcon('rainbow', ICON_RAINBOW);

// React layer: same geometry through the shared flat shell
export const RainbowIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'rainbow', content: ICON_RAINBOW, ...props });
