/**
 * butterfly — ANIMALS icon: butterfly with four rotated wing ellipses, wing
 * spot holes, segmented body, head and antennae with tip dots.
 *
 * GEOMETRY: each rotated wing and its spot share an evenodd path; separate
 * painted paths cannot erase opaque ellipses. Body/head/antenna dots use
 * literal rect/circle elements (see
 * svg-icon.ts flatPath + react.tsx IconBase for the shell pipeline).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_BUTTERFLY =
    // Separate wing paint operations union at their roots, while each
    // concentric spot cuts only its own wing, independent of winding.
    `<path d="M3.5 9.2a3.9 4.7 0 1 1 7.8 0a3.9 4.7 0 1 1 -7.8 0zM6.3 9.2a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z" transform="rotate(-24 7.4 9.2)" ${FLAT} fill-rule="evenodd"/>` +
    `<path d="M12.7 9.2a3.9 4.7 0 1 1 7.8 0a3.9 4.7 0 1 1 -7.8 0zM15.5 9.2a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z" transform="rotate(24 16.6 9.2)" ${FLAT} fill-rule="evenodd"/>` +
    `<path d="M5.7 15.8a2.9 3.3 0 1 1 5.8 0a2.9 3.3 0 1 1 -5.8 0zM7.5 15.8a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z" transform="rotate(24 8.6 15.8)" ${FLAT} fill-rule="evenodd"/>` +
    `<path d="M12.5 15.8a2.9 3.3 0 1 1 5.8 0a2.9 3.3 0 1 1 -5.8 0zM14.3 15.8a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0z" transform="rotate(-24 15.4 15.8)" ${FLAT} fill-rule="evenodd"/>` +
    flatPath(
        // Antennae remain solid and cannot cover the wing centers.
        'M11.3 5.6L9.9 2.6 10.7 2.3 12 5.5z' +
            'M12.7 5.5L14.1 2.5 14.9 2.8 13.3 5.6z'
    ) +
    // body: rounded rect + head circle
    `<rect x="11.25" y="7.4" width="1.5" height="11.6" rx="0.75" ${FLAT}/>` +
    `<circle cx="12" cy="6.2" r="1.25" ${FLAT}/>` +
    // antenna tip dots
    `<circle cx="10.3" cy="2.4" r="0.65" ${FLAT}/>` +
    `<circle cx="14.5" cy="2.6" r="0.65" ${FLAT}/>`;

export const svgButterfly: SvgIconFactory = createSvgIcon('butterfly', ICON_BUTTERFLY);
export const ButterflyIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'butterfly', content: ICON_BUTTERFLY, ...props });
