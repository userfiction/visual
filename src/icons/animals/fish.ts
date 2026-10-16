/**
 * fish — ANIMALS icon: fish facing left with a pointed nose, curved dorsal
 * fin, two-lobe forked tail, gill crescent, pectoral fin and bubbles.
 *
 * ANATOMY: body = almond (pointed nose at (2.2,12.6), full belly, tail joint
 * at x 16.4); the gill is a crescent slot behind the eye; the dorsal fin is
 * a curved flag riding the back; the tail is two lobes with a pinch notch
 * between them (forked — a plain triangle would read as whale/dolphin);
 * a small pectoral fin sits mid-body; three bubbles rise to the upper left.
 *
 * GEOMETRY vs svg-icon/IconBase (../svg-icon.ts, ../react.tsx): body element
 * carries eye + gill holes via fill-rule="evenodd"; dorsal / tail / pectoral
 * fins and bubbles are flatPath solid overlays (union across elements — see
 * cat.ts header for the full pipeline description).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Body (depth 1) + eye hole + gill crescent slot (depth 2).
const FISH_BODY =
    // body: pointed nose left, full belly, tail joint right
    'M2.2 12.6' +
    'Q4.4 9 8.4 8.6' + // nose → up the back
    'Q13 8.2 16.4 10.6' + // back toward the tail joint
    'L16.4 15' + // tail joint
    'Q13 17.4 8.4 17' + // belly
    'Q4.4 16.6 2.2 12.6' + // belly → pointed nose
    'z' +
    // eye hole
    'M4.4 11.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
    // gill crescent slot
    'M9 9.9A3.3 3.3 0 0 0 9 15.3A2.7 3.3 0 0 1 9 9.9z';

export const ICON_FISH =
    `<path d="${FISH_BODY}" ${EVENODD}/>` +
    flatPath(
        // dorsal fin (curved flag overlapping the back)
        'M10 8.9Q10.6 4.6 14.4 5.6Q15.5 6 15.9 9.4z' +
            // tail: two lobes with a pinch notch between them
            'M15.8 10.6L20.6 7Q21.7 6.4 21.4 7.6L20.1 11.5Q19.9 12.6 20.1 13.7L21.4 17.6Q21.7 18.8 20.6 18.2L15.8 15z' +
            // pectoral fin
            'M9.8 12.9L12.7 12.1 12.5 14.7z'
    ) +
    // bubbles: solid dots rising to the upper left
    `<circle cx="3.4" cy="8.4" r="0.55" fill="currentColor" stroke="none"/>` +
    `<circle cx="4.9" cy="6.7" r="0.42" fill="currentColor" stroke="none"/>` +
    `<circle cx="6.7" cy="5.4" r="0.32" fill="currentColor" stroke="none"/>`;

// String layer: registers 'fish' in the shared registry + bound factory
export const svgFish: SvgIconFactory = createSvgIcon('fish', ICON_FISH);

// React layer: same geometry through the shared flat shell
export const FishIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'fish', content: ICON_FISH, ...props });
