/**
 * octopus — ANIMALS icon: octopus with the round mantle head, two eyes and
 * EIGHT arms (four visible shapes mirrored left/right: an outer arm curling
 * up-out, a mid arm hanging with an outward curl, an inner arm tucking in
 * and a short center stub).
 *
 * GEOMETRY: head = circle r 5.6 at (12,8.2) drawn CLOCKWISE (sweep-1);
 * eye holes r 1 cut COUNTERCLOCKWISE inside the head only; arms = eight
 * solid Q-curved wedges whose bases sit INSIDE the head's lower half (plain
 * union with the head) — right-side set written explicitly, left side
 * mirrored via x' = 24 - x, so the outer tips reach (2.6 / 21.4, 14.6..15)
 * and the mid arms curl at y ~17.6..18.2. Machinery cross-reference:
 * flatPath (../svg-icon.ts) + IconBase (../react.tsx), same contract as
 * animals/fish.ts.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_OCTOPUS = flatPath(
    // head circle (mantle), clockwise
    'M6.4 8.2a5.6 5.6 0 1 1 11.2 0a5.6 5.6 0 1 1 -11.2 0z' +
        // eye holes, counterclockwise (inside head only)
        'M8.6 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
        'M13.4 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
        // right arms (outer curl-up, mid hang, inner tuck, center stub)
        'M15.6 10.6Q20.2 10.6 21.4 14.6Q20.4 15.4 19.4 15Q18.6 12.6 15.2 12.4z' +
        'M15.8 12.2Q18.8 14 18.6 17.6Q17.6 18.2 16.8 17.6Q17 14.8 14.6 13.6z' +
        'M14.6 13.4Q15.6 15.4 14.8 17.6Q13.9 17.9 13.4 17.2Q14 15.4 12.8 14.2z' +
        'M13.6 14.2Q14 16 13.2 17.8Q12.4 18 12 17.4Q12.6 15.8 12 14.4z' +
        // left arms (mirrors: x' = 24 - x)
        'M8.4 10.6Q3.8 10.6 2.6 14.6Q3.6 15.4 4.6 15Q5.4 12.6 8.8 12.4z' +
        'M8.2 12.2Q5.2 14 5.4 17.6Q6.4 18.2 7.2 17.6Q7 14.8 9.4 13.6z' +
        'M9.4 13.4Q8.4 15.4 9.2 17.6Q10.1 17.9 10.6 17.2Q10 15.4 11.2 14.2z' +
        'M10.4 14.2Q10 16 10.8 17.8Q11.6 18 12 17.4Q11.4 15.8 12 14.4z'
);

// String layer: registers 'octopus' in the shared registry + bound factory
export const svgOctopus: SvgIconFactory = createSvgIcon('octopus', ICON_OCTOPUS);

// React layer: same geometry through the shared flat shell
export const OctopusIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'octopus', content: ICON_OCTOPUS, ...props });
