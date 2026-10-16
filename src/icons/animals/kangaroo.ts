/**
 * kangaroo — ANIMALS icon: kangaroo in profile facing left — small
 * pointed head with two tall ears, chest/neck band, round torso over a
 * big hind thigh, a small arm, a long ground-hugging tail and a big
 * forward-pointing foot.
 *
 * GEOMETRY: head = solid blob path (muzzle tip lower-left at (4.6,6.2))
 * CLOCKWISE; ears = two solid triangles seated INSIDE the crown edge with
 * tips up-right; neck = solid quad from the head's underside to the
 * chest; torso + hind thigh = two solid circles (r 3.8 at (13.4,14.8) /
 * r 3.2 at (13,17.4)) unioned with the neck; arm = small solid quad
 * protruding at the chest front (base inside the torso circle); tail =
 * solid tapering sweep along the ground to the right, its base tucked
 * inside the thigh circle; foot = solid bar with a rounded toe arc
 * pointing LEFT (sweep-1 half-circle bulge). Eye hole r 0.6 is
 * COUNTERCLOCKWISE inside the head. Machinery: flatPath/createSvgIcon
 * (../svg-icon.ts), IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_KANGAROO = flatPath(
    // ears (solid triangles on the crown)
    'M7.6 4.6L8.6 2 10 5.2z' +
        'M9.6 5.2L11.8 3 10.8 6.4z' +
        // head blob with pointed muzzle, clockwise
        'M4.6 6.2Q5.6 4.6 7.6 4.4Q9.6 4.2 10.6 5.4Q11.4 6.4 11 8L10.4 10Q9.4 11.4 8 11Q6.4 10.6 5.6 9.4Q4.6 8 4.6 6.2z' +
        // neck/chest quad (top edge inside the head)
        'M8.2 10.8L10.4 9.7L12.6 13.4L10 14.8z' +
        // torso circle, clockwise
        'M9.6 14.8a3.8 3.8 0 1 1 7.6 0a3.8 3.8 0 1 1 -7.6 0z' +
        // hind thigh circle, clockwise
        'M9.8 17.4a3.2 3.2 0 1 1 6.4 0a3.2 3.2 0 1 1 -6.4 0z' +
        // arm (small solid quad at the chest front)
        'M9.4 13.4L11 13 11.4 14.2 9.8 14.6z' +
        // tail (solid sweep along the ground)
        'M15.6 17.2Q19 17.6 20.8 19.4L20 20.6Q18.2 19.2 15.4 19z' +
        // foot (solid bar + rounded toe bulging left)
        'M7.6 19.4h5.6v2.4h-5.6a1.2 1.2 0 0 1 0 -2.4z' +
        // eye hole, counterclockwise
        'M7.2 6.6a0.6 0.6 0 1 0 1.2 0a0.6 0.6 0 1 0 -1.2 0z'
);

// String layer: registers 'kangaroo' in the shared registry + bound factory
export const svgKangaroo: SvgIconFactory = createSvgIcon('kangaroo', ICON_KANGAROO);

// React layer: same geometry through the shared flat shell
export const KangarooIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'kangaroo', content: ICON_KANGAROO, ...props });
