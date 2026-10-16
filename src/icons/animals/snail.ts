/**
 * snail — ANIMALS icon: snail with a ringed spiral shell (target rings),
 * arched body with head stalk, antennae with tip dots and an eye.
 *
 * GEOMETRY: shell rings (solid → hole → refill → hole), body/head stalk,
 * antennae and eye use separate shell/body evenodd elements (nested rings
 * alternate fill/transparent by depth); tip dots are solid circles (see svg-icon.ts
 * flatPath + react.tsx IconBase for the shell pipeline).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';
const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

const SNAIL_SHELL =
    // shell: solid r 5.4 → hole r 3.65 → refill r 2.85 → hole r 1.35
    'M9.8 12.4a5.3 5.3 0 1 1 10.6 0a5.3 5.3 0 1 1 -10.6 0z' +
    'M11.45 12.4a3.65 3.65 0 1 0 7.3 0a3.65 3.65 0 1 0 -7.3 0z' +
    'M12.25 12.4a2.85 2.85 0 1 1 5.7 0a2.85 2.85 0 1 1 -5.7 0z' +
    'M13.75 12.4a1.35 1.35 0 1 0 2.7 0a1.35 1.35 0 1 0 -2.7 0z';

// Shell and foot overlap across paint operations, not inside an evenodd
// path, so the shell base stays solid where it meets the foot.
const SNAIL_BODY =
    // body: arched base + head stalk
    'M2.2 19.6L2.2 18.2Q2.2 16 5 15.9L6 15.9L6 10.8Q6 8.4 8 8.4Q10 8.4 10 10.8L10 16.6L18.6 16.6Q20.4 16.6 20.4 18.2L20.4 19.6z' +
    // antennae (thin solid wedges rising from the head top)
    'M6.6 8.8L5.1 4.6 5.9 4.3 7.3 8.7z' +
    'M8.7 8.8L9.7 4.2 10.5 4.4 9.5 8.8z' +
    // eye hole (inside the head stalk)
    'M7.05 10.4a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z';

export const ICON_SNAIL =
    `<path d="${SNAIL_SHELL}" ${EVENODD}/>` +
    `<path d="${SNAIL_BODY}" ${EVENODD}/>` +
    // antenna tip dots: solid circles
    `<circle cx="5.4" cy="4.3" r="0.8" ${FLAT}/>` +
    `<circle cx="10.3" cy="4.2" r="0.8" ${FLAT}/>`;

export const svgSnail: SvgIconFactory = createSvgIcon('snail', ICON_SNAIL);
export const SnailIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'snail', content: ICON_SNAIL, ...props });
