/**
 * oak — NATURE icon: oak tree (broad blobby crown + trunk + ground line).
 *
 * GEOMETRY: crown = one outline — big center ellipse (rx 6.6 ry 5.6 at
 * (12,7.8)) unioned with a lower side bulge (sweep-1 arcs, r 4.7 at
 * (17.6/6.4,10.7) and r 5.1 flanks at (17.9/6.1,14.2)) — the blobby
 * silhouette reads as oak foliage; two COUNTERCLOCKWISE leaf-cluster
 * holes (circles r 1.15) sit in the crown's lower half; trunk = closed
 * rect x 10.9..13.1 spanning y 16.7..21.8 (overlaps the crown bottom);
 * ground = rect x 6..18 spanning y 21.4..22.6.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_OAK = flatPath(
    'M12 2.2a6.6 5.6 0 0 1 5.6 3.1 4.7 4.7 0 0 1 2.3 8.5 5.1 5.1 0 0 1-5.9 2.9h-.9l.7 5.1h-3.6l.7-5.1h-.9a5.1 5.1 0 0 1-5.9-2.9 4.7 4.7 0 0 1 2.3-8.5A6.6 5.6 0 0 1 12 2.2z' +
        // trunk: rect x 10.9..13.1, y 16.7..21.8 (closed subpath)
        'M10.9 16.7h2.2v5.1h-2.2z' +
        // leaf-cluster holes, counterclockwise (inside the crown only)
        'M7.85 9.8a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z' +
        'M14.15 12.2a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z' +
        // ground line
        'M6 21.4h12v1.2h-12z'
);

// String layer: registers 'oak' in the shared registry + bound factory
export const svgOak: SvgIconFactory = createSvgIcon('oak', ICON_OAK);

// React layer: same geometry through the shared flat shell
export const OakIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'oak', content: ICON_OAK, ...props });
