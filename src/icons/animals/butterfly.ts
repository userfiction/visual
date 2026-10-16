/**
 * butterfly — ANIMALS icon: butterfly with four rotated wing ellipses,
 * wing spots, segmented body and antennae.
 *
 * GEOMETRY: four solid <ellipse> wings (upper pair rx 3.7 ry 4.5, lower
 * pair rx 2.9 ry 3.3, each tilted ±24° via the transform attribute) around
 * the vertical body; COUNTERCLOCKWISE spot holes r 1.1 concentric inside
 * each wing; body = rounded rect x 11.25..12.75, y 7.4..19; head = solid
 * circle r 1.25 at (12,6.2); antennae = two thin solid wedges with solid
 * tip dots.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_BUTTERFLY =
    // wings: four solid rotated ellipses
    `<ellipse cx="7.4" cy="9.2" rx="3.7" ry="4.5" transform="rotate(-24 7.4 9.2)" ${FLAT}/>` +
    `<ellipse cx="16.6" cy="9.2" rx="3.7" ry="4.5" transform="rotate(24 16.6 9.2)" ${FLAT}/>` +
    `<ellipse cx="8.6" cy="15.8" rx="2.9" ry="3.3" transform="rotate(24 8.6 15.8)" ${FLAT}/>` +
    `<ellipse cx="15.4" cy="15.8" rx="2.9" ry="3.3" transform="rotate(-24 15.4 15.8)" ${FLAT}/>` +
    flatPath(
        // wing spot holes, counterclockwise (concentric in each wing)
        'M6.3 9.2a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
            'M15.5 9.2a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
            'M7.5 15.8a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
            'M14.3 15.8a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
            // antennae (thin solid wedges)
            'M11.3 5.6L9.9 2.6 10.7 2.3 12 5.5z' +
            'M12.7 5.5L14.1 2.5 14.9 2.8 13.3 5.6z'
    ) +
    // body: rounded rect + head circle
    `<rect x="11.25" y="7.4" width="1.5" height="11.6" rx="0.75" ${FLAT}/>` +
    `<circle cx="12" cy="6.2" r="1.25" ${FLAT}/>` +
    // antenna tip dots
    `<circle cx="10.3" cy="2.4" r="0.65" ${FLAT}/>` +
    `<circle cx="14.5" cy="2.6" r="0.65" ${FLAT}/>`;

// String layer: registers 'butterfly' in the shared registry + bound factory
export const svgButterfly: SvgIconFactory = createSvgIcon('butterfly', ICON_BUTTERFLY);

// React layer: same geometry through the shared flat shell
export const ButterflyIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'butterfly', content: ICON_BUTTERFLY, ...props });
