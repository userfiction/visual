/**
 * rainbow — SKY icon: a double rainbow arc over a cloud foot.
 *
 * GEOMETRY: TWO concentric half-annulus bands (outer r 9.6 → 7.2, inner
 * r 6 → 4.2) arcing through the TOP over the center (12,17.6) — each
 * band is its own flatPath (outer sweep-0 arc, inner sweep-1 back); a
 * solid cloud foot (two small domes + base bar) sits at the bottom
 * grounding the arcs.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_RAINBOW =
    // outer band (r 9.6 → 7.2)
    flatPath('M2.4 17.6a9.6 9.6 0 0 1 19.2 0L19.2 17.6a7.2 7.2 0 0 0 -14.4 0z') +
    // inner band (r 6 → 4.2)
    flatPath('M6 17.6a6 6 0 0 1 12 0L16.2 17.6a4.2 4.2 0 0 0 -8.4 0z') +
    // cloud foot: two domes + base bar
    flatPath(
        'M6.6 20a2 2 0 0 1 .3-3.4 2.4 2.4 0 0 1 4.5-.9 2.2 2.2 0 0 1 4 1A2 2 0 0 1 16.6 20z' +
            'M5.4 19.4h12.4v1.6H5.4z'
    );

// String layer: registers 'rainbow' in the shared registry + bound factory
export const svgRainbow: SvgIconFactory = createSvgIcon('rainbow', ICON_RAINBOW);

// React layer: same geometry through the shared flat shell
export const RainbowIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'rainbow', content: ICON_RAINBOW, ...props });
