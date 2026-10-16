/**
 * chameleon — ANIMALS icon: chameleon facing left with the CASQUE helmet
 * head, turret eye ring, curled tongue-line mouth, one gripping leg and the
 * signature COILED tail (outer C-ribbon + connecting wedge + inner
 * C-ribbon ≈ 1.5 turns).
 *
 * GEOMETRY: head/body = one path — snout tip (2.6,8.8), the casque peak
 * (~7.2,3.7), the arched back to the belly rear (14.6,15.6), the tail
 * underside flowing left to (12,16.6) with the tip at (10.8,16.2), and the
 * belly/jaw edge closing at the snout — drawn CLOCKWISE; eye = turret ring
 * hole r 1.3 cut COUNTERCLOCKWISE inside the head with a solid pupil
 * <circle> re-centered in it (the animals/owl.ts ring pattern); mouth line
 * = thin v-first rect hole; leg = solid zigzag polygon unioned into the
 * chest with a toe bar; tail spiral centered (14.6,16): outer C-ribbon
 * r 2.9..4 (opening bottom-left, its θ=180 end unioned into the body's tail
 * tip), a curved wedge connecting the outer ribbon's θ=90 end to the inner
 * ribbon, and the inner C-ribbon r 0.7..1.6 (opening top-right, tip
 * tucking against the belly) + center dot <circle>. Machinery
 * cross-reference: flatPath (../svg-icon.ts) + IconBase (../react.tsx),
 * same contract as animals/chameleon-sibling seahorse.ts.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_CHAMELEON =
    flatPath(
        // head + casque + arched body + tail tip, clockwise outline
        'M2.6 8.8Q4.2 6.4 5.6 5.6Q6.6 3.6 8 3.8Q9.4 4.2 10.2 6Q13.6 6.8 15 10.2Q16.2 13.2 14.6 15.6Q13.6 16.6 12 16.6L10.8 16.2L11 15Q11.6 13.8 10.6 12.4Q9.6 11 8.6 10.6Q7.4 10.2 6.4 10.4Q4.4 10.6 3 10.2L2.6 9.4z' +
            // eye turret ring hole, counterclockwise (inside the head)
            'M4.3 8a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0z' +
            // mouth line hole (v-first rect, counterclockwise)
            'M2.9 9.2v0.6h2.6v-0.6z' +
            // front leg (zigzag polygon, top unioned into the chest)
            'M8.4 10.8L9.6 11.2L9 13.4L10.2 14.8L9.3 15.5L8 13.9L8.6 12.6z' +
            'M8.5 15.1h2.2v0.6h-2.2z' +
            // tail spiral: outer C-ribbon (opening bottom-left)
            'M10.6 16A4 4 0 1 1 14.6 20L14.6 18.9A2.9 2.9 0 1 0 11.7 16z' +
            // connecting wedge (outer ribbon's θ=90 end → inner ribbon's θ=0 end)
            'M14.6 20Q17.4 19 16.2 16L15.3 16Q16.2 18.6 14.6 18.9z' +
            // tail spiral: inner C-ribbon (opening top-right)
            'M16.2 16A1.6 1.6 0 1 1 14.6 14.4L14.6 15.3A0.7 0.7 0 1 0 15.3 16z'
    ) +
    // pupil dot re-centered in the eye ring + spiral center dot
    `<circle cx="5.6" cy="8" r="0.55" ${FLAT}/>` +
    `<circle cx="14.6" cy="16" r="0.55" ${FLAT}/>`;

// String layer: registers 'chameleon' in the shared registry + bound factory
export const svgChameleon: SvgIconFactory = createSvgIcon('chameleon', ICON_CHAMELEON);

// React layer: same geometry through the shared flat shell
export const ChameleonIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'chameleon', content: ICON_CHAMELEON, ...props });
