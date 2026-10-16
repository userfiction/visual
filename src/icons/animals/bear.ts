/**
 * bear — ANIMALS icon: bear face with inner-ear detail and mouth line.
 *
 * GEOMETRY: head = circle r 7 at (12,13.5) drawn CLOCKWISE; ears = two
 * solid <circle> elements r 2.6 at (6.8,7.2)/(17.2,7.2) overlapping the
 * head edge, each with a concentric COUNTERCLOCKWISE inner-ear hole r 0.95
 * (kept clear of the head circle: center distance 8.17 > 7 + 0.95 + 0.22
 * margin); eye holes r 1.1 and round nose hole r 1.3 cut COUNTERCLOCKWISE
 * inside the head; short vertical mouth line hole below the nose.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_BEAR =
    flatPath(
        // head circle, clockwise
        'M5 13.5a7 7 0 1 1 14 0a7 7 0 1 1 -14 0z' +
            // eye holes, counterclockwise
            'M7.9 12.3a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
            'M13.9 12.3a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
            // round nose hole, counterclockwise
            'M10.7 16.8a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0z' +
            // mouth line hole (v-first rect)
            'M11.8 18.6v1.6h0.4v-1.6z'
    ) +
    // ears: solid circles + concentric inner-ear holes (sweep-0)
    `<circle cx="6.8" cy="7.2" r="2.6" ${FLAT}/>` +
    `<circle cx="17.2" cy="7.2" r="2.6" ${FLAT}/>` +
    flatPath(
        'M5.85 7.2a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z' +
            'M16.25 7.2a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z'
    );

// String layer: registers 'bear' in the shared registry + bound factory
export const svgBear: SvgIconFactory = createSvgIcon('bear', ICON_BEAR);

// React layer: same geometry through the shared flat shell
export const BearIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'bear', content: ICON_BEAR, ...props });
