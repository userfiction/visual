/**
 * dog — ANIMALS icon: round dog head with drooping ear lobes hugging the
 * skull, muzzle patch with dark nose/mouth re-fills, round eyes.
 *
 * ANATOMY: head = circle r 5.8 at (12,12.8); the drooping ears are a SECOND
 * evenodd element whose lobes start INSIDE the head outline (roots overlap
 * the circle → one glued mass, no seam); each lobe carries a thin inner-ear
 * slot kept clear of the head circle; the muzzle is a light ellipse hole
 * with the apex-down nose + philtrum bar re-filling it dark at evenodd
 * depth 3 (dark features inside a light muzzle patch — reads as the breed
 * mask at 24px).
 *
 * GEOMETRY vs svg-icon/IconBase (../svg-icon.ts, ../react.tsx): head+face
 * element and ears element are separate <path fill-rule="evenodd"> elements
 * (cross-element overlap = union); flatPath/IconBase supply the flat shell
 * attributes (see the cat.ts header for the full pipeline description).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Head (depth 1) + eye holes + light muzzle patch (depth 2, transparent)
// with the dark nose + mouth bar re-filling it (depth 3 → filled again).
const DOG_FACE =
    // head circle, clockwise
    'M6.2 12.8a5.8 5.8 0 1 1 11.6 0a5.8 5.8 0 1 1 -11.6 0z' +
    // eye holes
    'M7.8 10.8a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
    'M14 10.8a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0z' +
    // muzzle patch hole (light area)
    'M9.3 16a2.7 2.1 0 1 0 5.4 0a2.7 2.1 0 1 0 -5.4 0z' +
    // nose hole (depth 3 → solid dark inside the patch)
    'M10.9 14.9L13.1 14.9 12 16.4z' +
    // mouth line hole (depth 3 → solid dark)
    'M11.7 16.7v1.1h0.6v-1.1z';

// Drooping ears: lobes rooted INSIDE the head outline (union across
// elements), inner-ear slots clear of the head circle.
const DOG_EARS =
    // left ear: root tucked inside the head, lobe drooping outside it
    'M10.6 8.2' +
    'Q8.4 6.8 6 7.6' + // root top → outer edge toward the skull
    'Q3.6 8.6 2.8 11.4' + // outer edge bulging left
    'Q2.2 14.4 4 16.6' + // outer edge down to the lobe bottom
    'Q5.6 18.2 7.4 17.2' + // rounded bottom cap
    'Q8.8 16.2 9.2 13.4' + // inner edge rising
    'Q9.6 10.6 10.6 8.2' + // inner edge back to the root
    'z' +
    // inner-ear slot (kept clear of the head circle)
    'M4.2 10.2v5h1.4v-5z' +
    // right ear (mirror)
    'M13.4 8.2' +
    'Q15.6 6.8 18 7.6' +
    'Q20.4 8.6 21.2 11.4' +
    'Q21.8 14.4 20 16.6' +
    'Q18.4 18.2 16.6 17.2' +
    'Q15.2 16.2 14.8 13.4' +
    'Q14.4 10.6 13.4 8.2' +
    'z' +
    'M18.4 10.2v5h1.4v-5z';

export const ICON_DOG =
    `<path d="${DOG_FACE}" ${EVENODD}/>` + `<path d="${DOG_EARS}" ${EVENODD}/>`;

// String layer: registers 'dog' in the shared registry + bound factory
export const svgDog: SvgIconFactory = createSvgIcon('dog', ICON_DOG);

// React layer: same geometry through the shared flat shell
export const DogIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'dog', content: ICON_DOG, ...props });
