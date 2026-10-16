/**
 * snail — ANIMALS icon: snail with a ringed spiral shell, arched body,
 * head stalk and antennae.
 *
 * GEOMETRY: shell = target-suggesting spiral — solid circle r 5.4 at
 * (15,12.6) with a COUNTERCLOCKWISE hole ring r 3.7, a solid r 2.9 refill
 * and a COUNTERCLOCKWISE center hole r 1.35 (concentric rings); body =
 * arched path with the head stalk rising at the left (Q head bump), base
 * band y 16.6..19.6 drawn CLOCKWISE (the shell's bottom overlaps it);
 * antennae = two thin solid wedges from the head top with solid tip dots;
 * eye hole r 0.55 inside the head stalk.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_SNAIL =
    flatPath(
        // shell: solid r 5.4 → hole r 3.7 → solid r 2.9 → hole r 1.35
        'M9.6 12.6a5.4 5.4 0 1 1 10.8 0a5.4 5.4 0 1 1 -10.8 0z' +
            'M11.3 12.6a3.7 3.7 0 1 0 7.4 0a3.7 3.7 0 1 0 -7.4 0z' +
            'M12.1 12.6a2.9 2.9 0 1 1 5.8 0a2.9 2.9 0 1 1 -5.8 0z' +
            'M13.65 12.6a1.35 1.35 0 1 0 2.7 0a1.35 1.35 0 1 0 -2.7 0z' +
            // body: arched base + head stalk (Q bump), clockwise outline
            'M2.2 19.6L2.2 18.2Q2.2 16 5 15.9L6 15.9L6 10.8Q6 8.4 8 8.4Q10 8.4 10 10.8L10 16.6L18.6 16.6Q20.4 16.6 20.4 18.2L20.4 19.6z' +
            // antennae (thin solid wedges rising from the head top)
            'M6.6 8.8L5.1 4.6 5.9 4.3 7.3 8.7z' +
            'M8.7 8.8L9.7 4.2 10.5 4.4 9.5 8.8z' +
            // eye hole, counterclockwise (inside the head stalk)
            'M7.05 10.4a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z'
    ) +
    // antenna tip dots: solid circles
    `<circle cx="5.4" cy="4.3" r="0.8" ${FLAT}/>` +
    `<circle cx="10.3" cy="4.2" r="0.8" ${FLAT}/>`;

// String layer: registers 'snail' in the shared registry + bound factory
export const svgSnail: SvgIconFactory = createSvgIcon('snail', ICON_SNAIL);

// React layer: same geometry through the shared flat shell
export const SnailIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'snail', content: ICON_SNAIL, ...props });
