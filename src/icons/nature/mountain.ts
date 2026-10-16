/**
 * mountain — LANDSCAPE icon: mountain with a snow cap.
 *
 * GEOMETRY: body = one outline — a wide triangle (base y 21.4 spanning
 * x 1.4..22.6, apex y 4.4 at (10.2,4.4) with the right shoulder stepping
 * down to (14.6,10.6) before the main right slope) drawn CLOCKWISE; the
 * summit plateau + the right shoulder give the ridge its two-step
 * silhouette; snow band = a REVERSE-WOUND zigzag hole cut across the
 * middle (three glacier humps dipping at the shoulders — the hole's
 * vertices walk BACKWARD so nonzero fill cuts it; verified against
 * Temp/visual/mtn-probe8.png).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_MOUNTAIN = flatPath(
    // body: clockwise — up the left slope, over the summit, down the
    // stepped right slope (shoulder at 14.6,10.6), along the base
    'M1.4 21.4L10.2 4.4 12 8 14.6 10.6 16 12.4 22.6 21.4z' +
        // snowline hole (reverse-wound zigzag: three glacier humps
        // dipping at the shoulders — mtn-probe8.png RIGHT panel: the
        // REVERSED walk (start at the last vertex, walk backwards) is
        // the winding that cuts; the band spans y 10.8..16)
        'M17 16L17 11 15.2 15.4 13.2 10.8 11 15.4 9 10.8 6.2 16z'
);

// String layer: registers 'mountain' in the shared registry + bound factory
export const svgMountain: SvgIconFactory = createSvgIcon('mountain', ICON_MOUNTAIN);

// React layer: same geometry through the shared flat shell
export const MountainIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'mountain', content: ICON_MOUNTAIN, ...props });
