/**
 * rabbit — ANIMALS icon: rabbit face with two LONG rounded ears (inner-ear
 * slots), round head, eyes, apex-down nose, philtrum + ω mouth, whiskers.
 *
 * ANATOMY: the ears are long rounded bands (width 4, y 1.4..12) whose bases
 * run INSIDE the head circle (top edge y 9.5) so they read as attached; each
 * band carries a tall inner-ear slot; the head is a circle r 5.9 at
 * (12,15.4); round eyes, apex-down nose, philtrum bar and a small ω mouth
 * below it; thin whisker bars protrude at the cheeks.
 *
 * GEOMETRY vs svg-icon/IconBase (../svg-icon.ts, ../react.tsx): separate
 * evenodd paths carry ears and face, with holes in their containing shape;
 * ear/head overlaps union across elements; whiskers are a flatPath solid
 * overlay element (see cat.ts header for the full pipeline description).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Ears (depth 1, bases inside the head circle) + head circle (depth 1) +
// inner-ear slots / eyes / nose / philtrum / ω mouth holes (depth 2).
const RABBIT_EARS =
    // left ear (long rounded band, straight sides, base INSIDE the head
    // circle — head top edge is y 9.5, so the band runs to y 12)
    'M5.8 3.2Q5.8 1.4 7.8 1.4Q9.8 1.4 9.8 3.2L9.8 12L5.8 12z' +
    // left inner-ear slot
    'M6.9 3v6.6h1.8V3z' +
    // right ear (mirror)
    'M14.2 3.2Q14.2 1.4 16.2 1.4Q18.2 1.4 18.2 3.2L18.2 12L14.2 12z' +
    'M15.3 3v6.6h1.8V3z';

// Separate face paint unions with the ear roots instead of evenodd XOR
// punching transparent seams where head and ears overlap.
const RABBIT_BODY =
    // head circle, clockwise
    'M6.1 15.4a5.9 5.9 0 1 1 11.8 0a5.9 5.9 0 1 1 -11.8 0z' +
    // eye holes
    'M7.9 14.6a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z' +
    'M13.8 14.6a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z' +
    // nose hole
    'M11.1 16.6h1.8l-0.9 1.4z' +
    // philtrum hole
    'M11.7 18.4v0.9h0.6v-0.9z' +
    // ω mouth (small)
    'M10.55 19.9A0.55 0.55 0 0 1 11.65 19.9A0.55 0.55 0 0 1 12.75 19.9z';

// Whiskers: thin bars per side (solid).
const RABBIT_WHISKERS =
    'M3.2 14.4h2.8v0.55h-2.8z' +
    'M3.2 16.1h2.8v0.55h-2.8z' +
    'M18 14.4h2.8v0.55h-2.8z' +
    'M18 16.1h2.8v0.55h-2.8z';

export const ICON_RABBIT =
    `<path d="${RABBIT_EARS}" ${EVENODD}/>` +
    `<path d="${RABBIT_BODY}" ${EVENODD}/>` + flatPath(RABBIT_WHISKERS);

// String layer: registers 'rabbit' in the shared registry + bound factory
export const svgRabbit: SvgIconFactory = createSvgIcon('rabbit', ICON_RABBIT);

// React layer: same geometry through the shared flat shell
export const RabbitIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'rabbit', content: ICON_RABBIT, ...props });
