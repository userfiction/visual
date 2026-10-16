/**
 * pig — ANIMALS icon: pig face — wide round head with floppy triangular
 * ears at the top corners, two eye holes and the signature big oval
 * SNOUT window carrying two solid nostril dots.
 *
 * GEOMETRY: head = wide blob (x 4.6..19.4, y 6.4..20.6, Q silhouette)
 * CLOCKWISE; ears = two broad folded lobes at the top corners, base
 * corners seated INSIDE the head's top edge (the right ear is the
 * mirrored subpath REVERSED to keep clockwise chirality); snout window =
 * COUNTERCLOCKWISE hole ellipse r 3.4/2.6 at (12,14.6) leaving a head
 * rim; nostril dots r 0.75 re-filled SOLID (clockwise) inside the window
 * (penguin re-fill trick, see penguin.ts); eye holes r 0.95 cut
 * COUNTERCLOCKWISE. Machinery: flatPath/createSvgIcon (../svg-icon.ts),
 * IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_PIG = flatPath(
    // head blob, clockwise
    'M4.6 12.2Q4.4 8.4 8 7.4Q12 6.4 16 7.4Q19.6 8.4 19.4 12.2Q19.2 16.6 16.4 18.6Q12 20.6 7.6 18.6Q4.8 16.6 4.6 12.2z' +
        // Broad outward/downward folds distinguish a pig from pointed cat
        // ears; mirrored contour order preserves the solid winding.
        'M6.5 9L2.8 7.3Q2 4.2 3 4.3Q7 4.2 9.4 7.2z' +
        'M14.6 7.2Q17 4.2 21 4.3Q22 4.2 21.2 7.3L17.5 9z' +
        // eye holes, counterclockwise
        'M7.45 11a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z' +
        'M14.65 11a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z' +
        // snout window hole, counterclockwise
        'M8.6 14.6a3.4 2.6 0 1 0 6.8 0a3.4 2.6 0 1 0 -6.8 0z' +
        // nostril dots re-filled solid inside the window
        'M9.55 14.6a0.75 0.75 0 1 1 1.5 0a0.75 0.75 0 1 1 -1.5 0z' +
        'M12.95 14.6a0.75 0.75 0 1 1 1.5 0a0.75 0.75 0 1 1 -1.5 0z'
);

// String layer: registers 'pig' in the shared registry + bound factory
export const svgPig: SvgIconFactory = createSvgIcon('pig', ICON_PIG);

// React layer: same geometry through the shared flat shell
export const PigIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'pig', content: ICON_PIG, ...props });
