/**
 * owl — ANIMALS icon: owl with sharp ear tufts, big ringed eyes (dark
 * pupils re-centered in the light rings), apex-down beak, belly chevrons
 * and feet.
 *
 * GEOMETRY: tufts/body/rings/beak/chevrons/feet ride one evenodd element
 * (holes at depth 2); the pupils are separate solid circles re-filling the
 * ring holes' centers (see svg-icon.ts flatPath + react.tsx IconBase).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';
const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

const OWL_BODY =
    // ear tufts (solid triangles overlapping the body's top corners)
    'M6.6 8L4.6 2.6Q4.5 2.2 5 2.4L10 5.2z' +
    'M17.4 8L19.4 2.6Q19.5 2.2 19 2.4L14 5.2z' +
    // body (egg: narrower top, wider base)
    'M12 4.8Q18.6 4.8 18.6 12L18.6 18Q18.6 20.8 15.8 20.8L8.2 20.8Q5.4 20.8 5.4 18L5.4 12Q5.4 4.8 12 4.8z' +
    // eye ring holes
    'M6.9 10.9a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0 -4.8 0z' +
    'M12.3 10.9a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0 -4.8 0z' +
    // beak hole (apex-down)
    'M11.15 13.9l0.85 2.2 0.85-2.2z' +
    // belly chevron holes
    'M8.15 17l0.85 1.3 0.85-1.3z' +
    'M11.15 17l0.85 1.3 0.85-1.3z' +
    'M14.15 17l0.85 1.3 0.85-1.3z' +
    // feet bumps
    'M8.5 20.7h1.9v0.4a0.95 0.95 0 0 1 -1.9 0z' +
    'M13.6 20.7h1.9v0.4a0.95 0.95 0 0 1 -1.9 0z';

export const ICON_OWL =
    `<path d="${OWL_BODY}" ${EVENODD}/>` +
    // pupils: solid dots re-centering inside the eye-ring holes
    `<circle cx="9.3" cy="10.9" r="1.05" ${FLAT}/>` +
    `<circle cx="14.7" cy="10.9" r="1.05" ${FLAT}/>`;

export const svgOwl: SvgIconFactory = createSvgIcon('owl', ICON_OWL);
export const OwlIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'owl', content: ICON_OWL, ...props });
