/**
 * fox — ANIMALS icon: fox head with tall ears (inner-ear holes), wide brow,
 * pointed chin and cheek spikes, eyes and apex-down nose.
 *
 * GEOMETRY: ears (disjoint triangles + inner-ear holes) and head (wide
 * brow → cheek spikes → jaw, WITH the eye/nose holes in the same paint
 * operation) are separate evenodd elements — the ear bases overlap the
 * head ACROSS elements (union, no same-element XOR); the chin wedge is a
 * flatPath solid overlay completing the V jaw (see svg-icon.ts flatPath
 * + react.tsx IconBase for the shell pipeline).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Ears: tall triangles + inner-ear holes near the tips.
const FOX_EARS =
    'M6.4 7.4L4.8 1.4Q4.7 1 5.2 1.2L10 5.2z' +
    'M17.6 7.4L19.2 1.4Q19.3 1 18.8 1.2L14 5.2z' +
    'M6.1 3.3L6.5 5.6 7.7 4.4z' +
    'M17.9 3.3L17.5 5.6 16.3 4.4z';

// Head: wide brow, spiky cheeks, jaw sides + eye/nose holes (SAME paint
// operation — the holes ride the head's own evenodd element).
const FOX_HEAD =
    'M12 21.4' +
    'L7.6 16.4' +
    'Q4.4 14.6 3.2 13.6' +
    'L4.4 10.4' +
    'Q5 7.4 7.6 6.4' +
    'Q10 5.6 12 6.8' +
    'Q14 5.6 16.4 6.4' +
    'Q19 7.4 19.6 10.4' +
    'L20.8 13.6' +
    'Q16.4 14.6 16.4 16.4' +
    'z' +
    // eye holes (inside the head)
    'M7.9 11.4a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z' +
    'M14.2 11.4a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z' +
    // nose hole (apex-down, inside the head)
    'M11.1 14.6h1.8l-0.9 1.5z';

export const ICON_FOX =
    `<path d="${FOX_EARS}" ${EVENODD}/>` +
    `<path d="${FOX_HEAD}" ${EVENODD}/>` +
    flatPath(
        // chin wedge completing the V jaw
        'M12 21.4L7.6 16.4Q9.4 17.6 12 17.6Q14.6 17.6 16.4 16.4z'
    );

export const svgFox: SvgIconFactory = createSvgIcon('fox', ICON_FOX);
export const FoxIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'fox', content: ICON_FOX, ...props });
