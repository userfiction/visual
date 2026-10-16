/**
 * duck — ANIMALS icon: duck with a raised round head, flat rounded bill,
 * up-left tail wedge, wing slot and water ripples (distinct from bird's
 * perched songbird silhouette).
 *
 * GEOMETRY: tail, body (+wing slot) and head (+eye hole) are separate
 * evenodd elements (cross-element overlap = union); bill and ripples are
 * flatPath solid overlays (see svg-icon.ts flatPath + react.tsx IconBase).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Tail: up-left wedge (overlaps the body across elements).
const DUCK_TAIL = 'M4.6 11.6L1.8 8.8Q1.2 8.2 2.2 8.3L6.8 10.4z';

// Body circle + wing slot (teardrop).
const DUCK_BODY =
    'M3.4 14.8a6 6 0 1 1 12 0a6 6 0 1 1 -12 0z' +
    'M6.2 14.4Q8.4 12.4 11.4 13Q12.7 13.3 12 14.7Q11.2 16.1 9.2 16Q7 15.9 6.2 14.4z';

// Head circle + eye hole.
const DUCK_HEAD =
    'M10.6 7.2a3.4 3.4 0 1 1 6.8 0a3.4 3.4 0 1 1 -6.8 0z' +
    'M13.35 6.4a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z';

export const ICON_DUCK =
    `<path d="${DUCK_TAIL}" ${EVENODD}/>` +
    `<path d="${DUCK_BODY}" ${EVENODD}/>` +
    `<path d="${DUCK_HEAD}" ${EVENODD}/>` +
    flatPath(
        // bill: rounded flat wedge pointing right
        'M17 5.8Q21.8 5.5 22 7Q21.8 8.5 17 8.2z' +
            // water ripples: two thin bars under the body
            'M2.6 21.2h13.6v0.9h-13.6zM5.4 22.7h9v0.7h-9z'
    );

export const svgDuck: SvgIconFactory = createSvgIcon('duck', ICON_DUCK);
export const DuckIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'duck', content: ICON_DUCK, ...props });
