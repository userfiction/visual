/**
 * turtle — ANIMALS icon: domed shell with plate spots and rim band, four
 * legs, tail and a head with eye (side profile facing right).
 *
 * GEOMETRY: shell dome (spot holes + rim-line hole, evenodd) in one
 * element; legs/tail are solid overlays and head/eye share an evenodd path (see svg-icon.ts
 * flatPath + react.tsx IconBase for the shell pipeline).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Shell dome (flat chord at y 15.4) + plate spots + rim band hole.
const TURTLE_SHELL =
    'M2.8 15.4a8.7 7.4 0 0 1 17.4 0z' +
    // plate spots
    'M5.4 13a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
    'M9.4 11.6a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
    'M13.4 13a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
    // rim band hole (separates dome plates from the body)
    'M4.2 13.9v0.75h15.2v-0.75z';

export const ICON_TURTLE =
    `<path d="${TURTLE_SHELL}" ${EVENODD}/>` +
    flatPath(
        // legs (rounded bottoms via sweep-1 arc)
        'M5.2 15.4h2.6v3.1a1.3 1.3 0 0 1 -2.6 0z' +
            'M14.2 15.4h2.6v3.1a1.3 1.3 0 0 1 -2.6 0z' +
            // tail (solid wedge at the shell's left base)
            'M3.4 15.4L1.4 16.6 3.4 17.4z'
    ) +
    // Head and eye share one paint operation; a later hole-only path
    // cannot subtract from an earlier opaque circle.
    `<path d="M18.7 13.6a2.3 2.3 0 1 1 4.6 0a2.3 2.3 0 1 1 -4.6 0zM21.3 13.3a.5 .5 0 1 1 1 0a.5 .5 0 1 1 -1 0z" ${EVENODD}/>`;

export const svgTurtle: SvgIconFactory = createSvgIcon('turtle', ICON_TURTLE);
export const TurtleIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'turtle', content: ICON_TURTLE, ...props });
