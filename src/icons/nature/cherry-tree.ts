/**
 * cherryTree — NATURE icon: cherry tree (blossom crown + blossom dots +
 * trunk + ground).
 *
 * GEOMETRY: crown = one outline — wide ellipse (rx 7.6 ry 5.4 at
 * (12,9.4)) unioned with a bottom bulge (sweep-1 arcs r 4.6 at
 * (18.4/5.6,13)); THREE COUNTERCLOCKWISE blossom holes (circles r 1.3)
 * dot the crown (the pink blossom clusters); trunk = closed rect
 * x 10.9..13.1 spanning y 16.8..21.8; ground = rect x 6..18 spanning
 * y 21.4..22.6.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CHERRY_TREE = flatPath(
    // crown: ellipse + bottom bulge, one outline
    'M4.4 9.4a7.6 5.4 0 0 1 15.2 0 7.6 5.4 0 0 1 -3.2 4.2 4.6 4.6 0 0 1 -8.8 0 7.6 5.4 0 0 1 -3.2 -4.2z' +
        // trunk
        'M10.9 16.8h2.2v5h-2.2z' +
        // blossom holes, counterclockwise (inside the crown only)
        'M7.65 7.8a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0z' +
        'M13.75 7.8a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0z' +
        'M10.7 11.8a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0z' +
        // ground line
        'M6 21.4h12v1.2h-12z'
);

// String layer: registers 'cherryTree' in the shared registry + bound factory
export const svgCherryTree: SvgIconFactory = createSvgIcon('cherryTree', ICON_CHERRY_TREE);

// React layer: same geometry through the shared flat shell
export const CherryTreeIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cherryTree', content: ICON_CHERRY_TREE, ...props });
