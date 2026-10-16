/**
 * owl — ANIMALS icon: owl with ear tufts, ringed eyes, beak, belly chevrons
 * and feet.
 *
 * GEOMETRY: body = rounded-rect path (Q corners) x 5.2..18.8, y 5.6..21;
 * ear tufts = two solid triangles overlapping the body's top corners; eye
 * rings = two COUNTERCLOCKWISE hole circles r 2.3 with separate solid
 * pupil <circle> dots r 1 re-centering inside each ring; apex-down beak
 * hole and three belly chevron holes cut COUNTERCLOCKWISE inside the body;
 * feet = two rounded-bottom bumps under the body's bottom edge.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_OWL =
    flatPath(
        // ear tufts (solid triangles overlapping the body's top corners)
        'M6.2 7.6L4.8 3 9.4 5.8z' +
            'M17.8 7.6L19.2 3 14.6 5.8z' +
            // body (rounded rect via Q corners), clockwise outline
            'M12 5.6Q18.8 5.6 18.8 12.6L18.8 18.4Q18.8 21 16.2 21L7.8 21Q5.2 21 5.2 18.4L5.2 12.6Q5.2 5.6 12 5.6z' +
            // eye ring holes, counterclockwise
            'M6.8 11a2.3 2.3 0 1 0 4.6 0a2.3 2.3 0 1 0 -4.6 0z' +
            'M12.6 11a2.3 2.3 0 1 0 4.6 0a2.3 2.3 0 1 0 -4.6 0z' +
            // beak hole, counterclockwise (apex-down)
            'M11.15 13.6l0.85 2.4 0.85-2.4z' +
            // belly chevron holes, counterclockwise (apex-down)
            'M8.15 16.6l0.85 1.4 0.85-1.4z' +
            'M11.15 16.6l0.85 1.4 0.85-1.4z' +
            'M14.15 16.6l0.85 1.4 0.85-1.4z' +
            // feet (rounded-bottom bumps under the body)
            'M8.5 20.9h1.9v0.5a0.95 0.95 0 0 1 -1.9 0z' +
            'M13.6 20.9h1.9v0.5a0.95 0.95 0 0 1 -1.9 0z'
    ) +
    // pupils: solid dots re-centering inside the eye-ring holes
    `<circle cx="9.1" cy="11" r="1" ${FLAT}/>` +
    `<circle cx="14.9" cy="11" r="1" ${FLAT}/>`;

// String layer: registers 'owl' in the shared registry + bound factory
export const svgOwl: SvgIconFactory = createSvgIcon('owl', ICON_OWL);

// React layer: same geometry through the shared flat shell
export const OwlIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'owl', content: ICON_OWL, ...props });
