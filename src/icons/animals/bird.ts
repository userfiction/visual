/**
 * bird — ANIMALS icon: songbird profile facing right — head with two plume
 * crest, short thick beak, teardrop body with a folded-wing slot, two-feather
 * tail fan, legs with feet.
 *
 * ANATOMY: head = circle r 3.3 at (15.6,8.4) overlapping the body's top-right;
 * body = ellipse rx 5.9 ry 4.5 at (10.4,14.4); the folded wing is a leaf-
 * shaped slot along the flank; the crest is two thin curved plumes rising
 * from the crown (distinct from duck's flat bill silhouette); the beak is a
 * short thick wedge; the tail is two tapered feathers pointing up-left;
 * two legs with small feet bars below the body.
 *
 * GEOMETRY vs svg-icon/IconBase (../svg-icon.ts, ../react.tsx): head (with
 * eye hole) and body (with wing slot) are separate evenodd <path> elements;
 * crest / beak / tail / legs are flatPath solid overlays — cross-element
 * overlap = union (see cat.ts header for the full pipeline description).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Head (depth 1) + eye hole (depth 2).
const BIRD_HEAD =
    // head circle, clockwise
    'M12.3 8.4a3.3 3.3 0 1 1 6.6 0a3.3 3.3 0 1 1 -6.6 0z' +
    // eye hole (near the beak side)
    'M15.45 7.9a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z';

// Body (depth 1) + folded-wing leaf slot (depth 2).
const BIRD_BODY =
    // body ellipse, clockwise
    'M4.5 14.4a5.9 4.5 0 1 1 11.8 0a5.9 4.5 0 1 1 -11.8 0z' +
    // folded-wing hole (leaf shape along the flank)
    'M7.6 14.4Q9.6 12.6 12.6 13Q13.9 13.2 13.2 14.6Q12.4 16 10.4 16Q8.2 16 7.6 14.4z';

export const ICON_BIRD =
    `<path d="${BIRD_HEAD}" ${EVENODD}/>` +
    `<path d="${BIRD_BODY}" ${EVENODD}/>` +
    flatPath(
        // crest: two upright curved plumes on the crown
        'M13.8 6Q13.2 3.2 14.6 1.8Q14.9 1.6 15 2L15.4 5.4z' +
            'M15.8 5.2Q16 2.6 17.6 1.6Q18 1.5 17.9 2L17.6 6z' +
            // beak: short thick wedge pointing right
            'M18.6 7.4L21.9 9.2 18.5 10.6z' +
            // tail: two tapered feathers pointing up-left
            'M5.8 13.4L2.4 9Q1.8 8.2 2.8 8.4L7 11.2z' +
            'M5.8 15L2.2 12.6Q1.6 12.2 2.4 11.8L6.8 13.6z' +
            // legs + feet
            'M9.6 18.5h0.9v2.3h-0.9z' +
            'M12.3 18.5h0.9v2.3h-0.9z' +
            'M9.1 20.8h2v0.6h-2z' +
            'M11.9 20.8h2v0.6h-2z'
    );

// String layer: registers 'bird' in the shared registry + bound factory
export const svgBird: SvgIconFactory = createSvgIcon('bird', ICON_BIRD);

// React layer: same geometry through the shared flat shell
export const BirdIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'bird', content: ICON_BIRD, ...props });
