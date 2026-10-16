/**
 * lion — ANIMALS icon: lion face with a scalloped mane (face-dominant).
 *
 * GEOMETRY: mane = eight solid <circle> scallops r 2.9 on a r 7.2 ring
 * around (12,12) unioned with the face circle r 6.6 — scallops overlap the
 * face (inner reach 7.2-2.9 = 4.3 < 6.6) so the silhouette is one solid
 * flower-shaped mane; eye holes r 1.05, the apex-down nose hole and the
 * short vertical mouth line hole are COUNTERCLOCKWISE inside the face.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

// Scallop centers: 8 points on the r 7.2 ring (45° steps; 7.2·cos45 ≈ 5.09)
const SCALLOPS: Array<[number, number]> = [
    [19.2, 12],
    [17.09, 17.09],
    [12, 19.2],
    [6.91, 17.09],
    [4.8, 12],
    [6.91, 6.91],
    [12, 4.8],
    [17.09, 6.91],
];

export const ICON_LION =
    SCALLOPS.map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="2.9" ${FLAT}/>`).join('') +
    flatPath(
        // face circle, clockwise
        'M5.4 12a6.6 6.6 0 1 1 13.2 0a6.6 6.6 0 1 1 -13.2 0z' +
            // eye holes, counterclockwise
            'M7.65 10.2a1.05 1.05 0 1 0 2.1 0a1.05 1.05 0 1 0 -2.1 0z' +
            'M14.25 10.2a1.05 1.05 0 1 0 2.1 0a1.05 1.05 0 1 0 -2.1 0z' +
            // nose hole, counterclockwise
            'M11 13.2l1 1.6 1-1.6z' +
            // mouth line hole (v-first rect)
            'M11.7 15.8v1.3h0.6v-1.3z'
    );

// String layer: registers 'lion' in the shared registry + bound factory
export const svgLion: SvgIconFactory = createSvgIcon('lion', ICON_LION);

// React layer: same geometry through the shared flat shell
export const LionIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'lion', content: ICON_LION, ...props });
