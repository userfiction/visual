/**
 * snake — ANIMALS icon: thick S-ribbon body with three spots, ovoid blunt-
 * snouted head, round eye and a two-bar forked tongue.
 *
 * GEOMETRY: ribbon (+spot holes) and head (+eye hole) are two evenodd elements —
 * the head overlaps the ribbon's right end ACROSS elements (union, no same-
 * element XOR); tongue is a flatPath solid overlay (see svg-icon.ts
 * flatPath + react.tsx IconBase for the shell pipeline).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Body ribbon: one smooth S from tail (left) to neck (right).
const SNAKE_RIBBON =
    'M1.6 10.8' +
    'C4.4 7.2 7.6 7.2 10.2 10.4' + // top edge: rise then dip
    'C12.8 13.6 16 13.6 18.8 10.8' + // continue the S
    'L18.8 14.4' + // right end cap down
    'C16 17.2 12.8 17.2 10.2 14' + // bottom edge back
    'C7.6 10.8 4.4 10.8 1.6 14.4' + // mirrored S
    'z';

// Head: ovoid with blunt snout (overlaps the ribbon across elements).
const SNAKE_HEAD =
    'M16.8 9.9' +
    'Q21 9 22.2 11' +
    'Q22.6 12 21.9 13.2' +
    'Q20.3 15.3 16.8 14.4' +
    'z' +
    // eye hole (inside the head only)
    'M19.4 11.3a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z';

// Spots riding the ribbon band.
const SNAKE_SPOTS =
    'M3.8 12.2a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z' +
    'M8.2 10.7a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z' +
    'M13.6 14.9a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z';

export const ICON_SNAKE =
    // Spots cut the ribbon in its own paint operation, never as opaque
    // circles painted over an already filled ribbon.
    `<path d="${SNAKE_RIBBON + SNAKE_SPOTS}" ${EVENODD}/>` +
    `<path d="${SNAKE_HEAD}" ${EVENODD}/>` +
    flatPath(
        // forked tongue: two thin bars ahead of the snout
        'M22.2 11.8L23.5 10.6 23.7 10.9 22.5 12.1z' +
            'M22.3 12.2L23.7 13.3 23.5 13.6 22.2 12.5z'
    );

export const svgSnake: SvgIconFactory = createSvgIcon('snake', ICON_SNAKE);
export const SnakeIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'snake', content: ICON_SNAKE, ...props });
