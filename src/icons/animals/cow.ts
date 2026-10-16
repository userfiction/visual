/**
 * cow — ANIMALS icon: cow face — tall domed head with sideways ears and
 * up-curled horns, two eye holes and the signature big MUZZLE window at
 * the bottom carrying two solid nostril dots.
 *
 * GEOMETRY: head = rounded-rect dome (x 6.6..17.4, y 5.8..20.2, Q corners)
 * CLOCKWISE; ears = two solid side ellipses r 2.2/1.4 at (4.6,9.6)/
 * (19.4,9.6) unioned over the head edges; horns = two solid Q-arcs
 * curling up-out from inside the head's top corners (the right horn is
 * the mirrored subpath REVERSED to restore clockwise chirality); muzzle
 * window = COUNTERCLOCKWISE hole ellipse r 4.2/3 at (12,16.6) leaving a
 * head rim; nostril dots r 0.7 re-filled SOLID (clockwise) inside the
 * window (penguin re-fill trick, see penguin.ts); eye holes r 0.9 cut
 * COUNTERCLOCKWISE. Machinery: flatPath/createSvgIcon (../svg-icon.ts),
 * IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_COW = flatPath(
    // head dome, clockwise
    'M6.6 9.4Q6.6 6.6 9.2 6.2Q12 5.8 14.8 6.2Q17.4 6.6 17.4 9.4L17.4 16.4Q17.4 19.4 14.6 19.8Q12 20.2 9.4 19.8Q6.6 19.4 6.6 16.4z' +
        // ears: solid side ellipses, clockwise
        'M2.4 9.6a2.2 1.4 0 1 1 4.4 0a2.2 1.4 0 1 1 -4.4 0z' +
        'M17.2 9.6a2.2 1.4 0 1 1 4.4 0a2.2 1.4 0 1 1 -4.4 0z' +
        // horns: solid Q-arches (right one reversed to keep CW winding)
        'M7.2 6.6Q6.4 4.6 7.6 3.6Q8.6 3 9 4.2Q9.2 5.6 8.6 6.8z' +
        'M15.4 6.8Q14.8 5.6 15 4.2Q15.4 3 16.4 3.6Q17.6 4.6 16.8 6.6z' +
        // eye holes, counterclockwise
        'M8.5 10.6a0.9 0.9 0 1 0 1.8 0a0.9 0.9 0 1 0 -1.8 0z' +
        'M13.7 10.6a0.9 0.9 0 1 0 1.8 0a0.9 0.9 0 1 0 -1.8 0z' +
        // muzzle window hole, counterclockwise
        'M7.8 16.6a4.2 3 0 1 0 8.4 0a4.2 3 0 1 0 -8.4 0z' +
        // nostril dots re-filled solid inside the window
        'M9.5 16.4a0.7 0.7 0 1 1 1.4 0a0.7 0.7 0 1 1 -1.4 0z' +
        'M13.1 16.4a0.7 0.7 0 1 1 1.4 0a0.7 0.7 0 1 1 -1.4 0z'
);

// String layer: registers 'cow' in the shared registry + bound factory
export const svgCow: SvgIconFactory = createSvgIcon('cow', ICON_COW);

// React layer: same geometry through the shared flat shell
export const CowIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cow', content: ICON_COW, ...props });
