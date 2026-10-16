/**
 * hills — LANDSCAPE icon: rolling hills (two overlapping mounds + sun).
 *
 * GEOMETRY: two hill mounds as one outline — the left mound (apex
 * (6.4,10.2), rounded cubic shoulders down to the ground y 21.4) and the
 * right mound (apex (17,7.8), taller) overlap mid-frame so the silhouette
 * reads as rolling terrain; the outline is drawn CLOCKWISE and closes
 * along the ground line; sun = a solid <circle> r 2.1 at (5,4.6) in the
 * sky above the left mound.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_HILLS =
    flatPath(
        // hills: left mound rising, dipping into the right mound's slope,
        // over its apex and down to the ground; base closes along y 21.4
        'M1.4 21.4C3.4 15.8 4.6 12 6.4 10.2 8.6 8 10.6 9.4 11.4 12 12.6 9 14.8 7.8 17 7.8 19.6 7.8 21.4 10.4 22.6 14.4L22.6 21.4z' +
            // ground line under the mounds
            'M1.4 21.4h21.2v1H1.4z'
    ) +
    // sun in the sky above the left mound
    `<circle cx="5" cy="4.6" r="2.1" ${FLAT}/>`;

// String layer: registers 'hills' in the shared registry + bound factory
export const svgHills: SvgIconFactory = createSvgIcon('hills', ICON_HILLS);

// React layer: same geometry through the shared flat shell
export const HillsIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'hills', content: ICON_HILLS, ...props });
