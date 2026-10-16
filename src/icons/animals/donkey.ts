/**
 * donkey — ANIMALS icon: donkey face — long narrow head with VERY LONG
 * upright ears (each with a thin inner-ear hole), a mane tuft between
 * them, two eye holes and the muzzle band window at the bottom carrying
 * two solid nostril dots.
 *
 * GEOMETRY: head = long rounded dome (x 6.8..17.2, y 5.7..20.1) CLOCKWISE;
 * ears = two solid tall Q-blades rising to y 2.2, base corners seated
 * INSIDE the head's top corners (the right ear is the mirrored subpath
 * REVERSED to keep clockwise chirality); inner-ear holes = thin v-first
 * (COUNTERCLOCKWISE) rects kept ABOVE the head's top edge; mane tuft =
 * solid Q-arched bump seated inside the head's top edge between the ears;
 * muzzle window = COUNTERCLOCKWISE hole ellipse r 3.2/2.2 at (12,16.8);
 * nostril dots r 0.6 re-filled SOLID (clockwise) inside the window
 * (penguin re-fill trick, see penguin.ts); eye holes r 0.85 cut
 * COUNTERCLOCKWISE. Machinery: flatPath/createSvgIcon (../svg-icon.ts),
 * IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_DONKEY = flatPath(
    // head dome, clockwise
    'M7 10.4Q6.8 7.2 9.4 6.4Q12 5.7 14.6 6.4Q17.2 7.2 17 10.4L16.8 15.4Q16.6 18.8 14 19.6Q12 20.1 10 19.6Q7.4 18.8 7.2 15.4z' +
        // long ears (solid Q-blades; right one reversed to keep CW)
        'M7.4 7.6Q6.6 2.8 8.4 2.2Q9.6 2.2 9.3 6.4L9.2 8.2z' +
        'M14.8 8.2L14.7 6.4Q14.4 2.2 15.6 2.2Q17.4 2.8 16.6 7.6z' +
        // inner-ear holes (v-first rects above the head edge)
        'M7.8 4v2.2h0.7v-2.2z' +
        'M15.5 4v2.2h0.7v-2.2z' +
        // mane tuft (solid bump between the ears)
        'M10.4 6.6Q10.6 4.6 12 4.6Q13.4 4.6 13.6 6.6z' +
        // eye holes, counterclockwise
        'M8.95 10.6a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z' +
        'M13.35 10.6a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z' +
        // muzzle window hole, counterclockwise
        'M8.8 16.8a3.2 2.2 0 1 0 6.4 0a3.2 2.2 0 1 0 -6.4 0z' +
        // nostril dots re-filled solid inside the window
        'M10 16.6a0.6 0.6 0 1 1 1.2 0a0.6 0.6 0 1 1 -1.2 0z' +
        'M12.8 16.6a0.6 0.6 0 1 1 1.2 0a0.6 0.6 0 1 1 -1.2 0z'
);

// String layer: registers 'donkey' in the shared registry + bound factory
export const svgDonkey: SvgIconFactory = createSvgIcon('donkey', ICON_DONKEY);

// React layer: same geometry through the shared flat shell
export const DonkeyIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'donkey', content: ICON_DONKEY, ...props });
