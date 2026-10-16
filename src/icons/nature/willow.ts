/**
 * willow — NATURE icon: willow tree (umbrella dome + hanging curtain
 * tubes + trunk + ground).
 *
 * GEOMETRY: canopy = flat dome (rx 8.8 ry 4.4 at (12,5.6)); curtain =
 * five rounded-bottom tubes hanging from the dome's belly (tops hidden
 * under the dome — drawn FIRST); trunk = rect x 10.9..13.1 spanning
 * y 15..21.8; ground = rect x 6.4..17.6 spanning y 21.8..22.8.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_WILLOW = flatPath(
    // curtain tubes (drawn first — tops hide under the dome)
    'M4.6 8h1.9v4.6a0.95 0.95 0 0 1 -1.9 0z' +
        'M8.2 8.6h1.9v5.2a0.95 0.95 0 0 1 -1.9 0z' +
        'M11.05 9.4h1.9v5.4a0.95 0.95 0 0 1 -1.9 0z' +
        'M13.9 8.6h1.9v5.2a0.95 0.95 0 0 1 -1.9 0z' +
        'M17.5 8h1.9v4.6a0.95 0.95 0 0 1 -1.9 0z' +
        // umbrella dome (covers the tube tops)
        'M12 1.2a8.8 4.4 0 0 1 8.8 4.4c0 2.4-4 4.3-8.8 4.3S3.2 8 3.2 5.6A8.8 4.4 0 0 1 12 1.2z' +
        // trunk + ground
        'M10.9 15h2.2v6.8h-2.2z' +
        'M6.4 21.8h11.2v1h-11.2z'
);

// String layer: registers 'willow' in the shared registry + bound factory
export const svgWillow: SvgIconFactory = createSvgIcon('willow', ICON_WILLOW);

// React layer: same geometry through the shared flat shell
export const WillowIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'willow', content: ICON_WILLOW, ...props });
