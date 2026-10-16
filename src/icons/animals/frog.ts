/**
 * frog — ANIMALS icon: frog with eye bumps, wide mouth, nostrils and feet.
 *
 * GEOMETRY: body = wide rounded-rect path (Q corners) x 3.2..20.8,
 * y 8.2..19.6 drawn CLOCKWISE; eye bumps = two solid <circle> elements
 * r 2.5 at (7.6,6.6)/(16.4,6.6) overlapping the body's top edge, each with
 * a COUNTERCLOCKWISE eye hole r 1.05 kept fully above the body top; two
 * nostril holes r 0.5 and the wide mouth line hole cut COUNTERCLOCKWISE
 * inside the body; feet = two rounded-bottom bumps under the bottom edge.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_FROG =
    flatPath(
        // body (wide rounded rect), clockwise outline
        'M3.2 12.2Q3.2 8.2 7.2 8.2L16.8 8.2Q20.8 8.2 20.8 12.2L20.8 16.4Q20.8 19.6 17.4 19.6L6.6 19.6Q3.2 19.6 3.2 16.4z' +
            // eye holes, counterclockwise (inside the bumps only)
            'M6.55 6.2a1.05 1.05 0 1 0 2.1 0a1.05 1.05 0 1 0 -2.1 0z' +
            'M15.35 6.2a1.05 1.05 0 1 0 2.1 0a1.05 1.05 0 1 0 -2.1 0z' +
            // nostril holes, counterclockwise
            'M10.15 11a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z' +
            'M12.75 11a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z' +
            // wide mouth line hole (v-first rect)
            'M6.8 14.3v0.9h10.4v-0.9z' +
            // feet (rounded-bottom bumps under the body)
            'M6.3 19.4h2.6v0.5a1.3 1.3 0 0 1 -2.6 0z' +
            'M15.1 19.4h2.6v0.5a1.3 1.3 0 0 1 -2.6 0z'
    ) +
    // eye bumps: solid circles overlapping the body's top edge
    `<circle cx="7.6" cy="6.6" r="2.5" ${FLAT}/>` +
    `<circle cx="16.4" cy="6.6" r="2.5" ${FLAT}/>`;

// String layer: registers 'frog' in the shared registry + bound factory
export const svgFrog: SvgIconFactory = createSvgIcon('frog', ICON_FROG);

// React layer: same geometry through the shared flat shell
export const FrogIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'frog', content: ICON_FROG, ...props });
