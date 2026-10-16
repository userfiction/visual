/**
 * appleTree — NATURE icon: apple tree (round crown + apples + trunk +
 * ground).
 *
 * GEOMETRY: crown = one outline — wide ellipse (rx 7.4 ry 5.6 at
 * (12,9.6)) unioned with a bottom bulge (sweep-1 arcs r 4.6 at
 * (18.2/5.8,13.2)); THREE COUNTERCLOCKWISE apple holes (circles r 1.15)
 * dot the crown (left, top-right, bottom-center); trunk = closed rect
 * x 10.9..13.1 spanning y 17..21.8; ground = rect x 6..18 spanning
 * y 21.4..22.6.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_APPLE_TREE = flatPath(
    // crown: ellipse + bottom bulge, one outline
    'M4.6 9.6a7.4 5.6 0 0 1 14.8 0 7.4 5.6 0 0 1 -3 4.2 4.6 4.6 0 0 1 -8.8 0 7.4 5.6 0 0 1 -3 -4.2z' +
        // trunk
        'M10.9 17h2.2v4.8h-2.2z' +
        // apple holes, counterclockwise (inside the crown only)
        'M7.75 8.4a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z' +
        'M13.95 8.4a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z' +
        'M10.85 12.4a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z' +
        // ground line
        'M6 21.4h12v1.2h-12z'
);

// String layer: registers 'appleTree' in the shared registry + bound factory
export const svgAppleTree: SvgIconFactory = createSvgIcon('appleTree', ICON_APPLE_TREE);

// React layer: same geometry through the shared flat shell
export const AppleTreeIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'appleTree', content: ICON_APPLE_TREE, ...props });
