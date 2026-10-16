/**
 * frog — ANIMALS icon: protruding eye bumps on TOP of the head (frog eyes
 * are periscope bumps, not face dots), body widening downward, long smile
 * slit, tiny nostrils and webbed three-toed feet (no more squared face).
 *
 * GEOMETRY: eye bumps (dark circle → light iris hole → dark pupil, strictly
 * nested), body (smile + nostril holes) and webbed feet are three evenodd
 * elements (cross-element overlap = union — see svg-icon.ts flatPath +
 * react.tsx IconBase for the shell pipeline).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Eye bumps: dark circle → light iris → dark pupil (nested depth 1..3).
const FROG_EYES =
    'M4.65 5.9a2.55 2.55 0 1 1 5.1 0a2.55 2.55 0 1 1 -5.1 0z' +
    'M6.05 5.9a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z' +
    'M7.2 5.9a0.55 0.55 0 1 1 1.1 0a0.55 0.55 0 1 1 -1.1 0z' +
    'M14.25 5.9a2.55 2.55 0 1 1 5.1 0a2.55 2.55 0 1 1 -5.1 0z' +
    'M15.65 5.9a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z' +
    'M16.8 5.9a0.55 0.55 0 1 1 1.1 0a0.55 0.55 0 1 1 -1.1 0z';

// Webbed feet: rounded pads with two toe slits each.
const FROG_FEET =
    'M5.6 19.4h4.4v1.5a2.2 2.2 0 0 1 -4.4 0z' +
    'M7.4 21.2v-1h0.45v1z' +
    'M8.35 21.2v-1h0.45v1z' +
    'M14 19.4h4.4v1.5a2.2 2.2 0 0 1 -4.4 0z' +
    'M15.8 21.2v-1h0.45v1z' +
    'M16.75 21.2v-1h0.45v1z';

// Body: wide top between the eye bumps, widening to the base + holes.
const FROG_BODY =
    'M4 9.8Q4.4 8.3 6.4 8.3L17.6 8.3Q19.6 8.3 20 9.8L20.7 16.2Q21 20.2 17 20.2L7 20.2Q3 20.2 3.3 16.2z' +
    // long smile slit (crescent curving down)
    'M5.6 13.4Q12 15.6 18.4 13.4L18.4 12.6Q12 14.8 5.6 12.6z' +
    // nostrils
    'M9.7 10.4a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z' +
    'M13.3 10.4a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z';

export const ICON_FROG =
    `<path d="${FROG_EYES}" ${EVENODD}/>` +
    `<path d="${FROG_BODY}" ${EVENODD}/>` +
    `<path d="${FROG_FEET}" ${EVENODD}/>`;

export const svgFrog: SvgIconFactory = createSvgIcon('frog', ICON_FROG);
export const FrogIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'frog', content: ICON_FROG, ...props });
