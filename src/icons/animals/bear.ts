/**
 * bear — ANIMALS icon: round bear head with cupped ears (inner-ear holes),
 * small eyes and a broad light muzzle patch carrying a dark nose oval and
 * vertical mouth line.
 *
 * GEOMETRY: head + eye/muzzle holes + dark nose/mouth re-fills (nested
 * evenodd depth 1..3) in one element; ear circles + inner-ear holes are
 * a separate evenodd element overlapping the head's top edge (see
 * svg-icon.ts flatPath + react.tsx IconBase for the shell pipeline).
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Head (depth 1) + eyes/muzzle patch (depth 2) + nose/mouth (depth 3).
const BEAR_FACE =
    // head circle, clockwise
    'M4.4 13.2a7.6 7.6 0 1 1 15.2 0a7.6 7.6 0 1 1 -15.2 0z' +
    // eye holes
    'M8.1 11.6a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z' +
    'M14 11.6a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z' +
    // muzzle patch hole (light oval, low)
    'M8.7 16.9a3.3 2.5 0 1 0 6.6 0a3.3 2.5 0 1 0 -6.6 0z' +
    // nose oval hole (dark inside the muzzle)
    'M10.5 15.5a1.5 1.1 0 1 0 3 0a1.5 1.1 0 1 0 -3 0z' +
    // mouth line hole (dark)
    'M11.7 17.2v2h0.6v-2z';

export const ICON_BEAR =
    `<path d="${BEAR_FACE}" ${EVENODD}/>` +
    // Ear openings sit above the head overlap; outer ear and hole share
    // one paint operation, so no opaque circle remains behind the cutout.
    `<path d="M4.2 7a2.7 2.7 0 1 1 5.4 0a2.7 2.7 0 1 1 -5.4 0zM5.1 5.8a.8 .8 0 1 1 1.6 0a.8 .8 0 1 1 -1.6 0zM14.4 7a2.7 2.7 0 1 1 5.4 0a2.7 2.7 0 1 1 -5.4 0zM17.3 5.8a.8 .8 0 1 1 1.6 0a.8 .8 0 1 1 -1.6 0z" ${EVENODD}/>`;

export const svgBear: SvgIconFactory = createSvgIcon('bear', ICON_BEAR);
export const BearIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'bear', content: ICON_BEAR, ...props });
