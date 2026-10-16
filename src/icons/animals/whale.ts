/**
 * whale — ANIMALS icon: horizontal whale facing left — blunt rounded snout,
 * domed back, WIDE two-lobed horizontal flukes with a deep notch (never a
 * vertical fish triangle), V-shaped spout over the blowhole, eye + smile.
 *
 * GEOMETRY: body (eye hole + smile slit) is one evenodd element; the flukes
 * and the spout column + two branches are flatPath solid overlays (cross-
 * element overlap = union — see svg-icon.ts flatPath + react.tsx IconBase).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Body: blunt snout → dome → tail joint + eye + smile slit.
const WHALE_BODY =
    'M2.4 13.2' +
    'Q2.4 10 5.4 8.8' + // snout up to the back
    'Q10 6.9 14.6 8.6' + // domed back
    'Q17 10.2 18.2 7.1L19.6 8.1Q19.7 13.2 17.6 15.6' + // raised tail stock
    'Q14.4 17.9 10 17.9' + // belly
    'Q5 17.9 2.9 15.2' + // belly to the snout bottom
    'Q2 14.3 2.4 13.2' + // snout front
    'z' +
    // eye hole
    'M4.5 12.4a0.8 0.8 0 1 0 1.6 0a0.8 0.8 0 1 0 -1.6 0z' +
    // smile slit (crescent along the jaw)
    'M4.3 15.7Q8.4 16.9 12.6 15.8L12.6 15Q8.4 16.1 4.3 14.9z';

export const ICON_WHALE =
    `<path d="${WHALE_BODY}" ${EVENODD}/>` +
    flatPath(
        // Raised horizontal flukes extend LEFT/RIGHT above the tail stock,
        // unlike a fish's vertical fork at the end of its body.
        'M18.8 8.8Q15 8.7 13.8 4.5Q16.4 4.4 18.8 6.7Q20.3 4.2 23 3.9Q22.6 7.8 18.8 8.8z' +
            // Small downward pectoral flipper reinforces the mammal profile.
            'M10 16.6Q12 18.5 15 19.1L13 16.8z' +
            // spout: column + two V branches over the blowhole
            'M6.55 8.4L6.55 4.4 7.45 4.4 7.45 8.4z' +
            'M6.7 4.7L4.7 2.5Q4.4 2.2 4.9 2.3L7.6 4.1z' +
            'M7.3 4.1L9.7 2.1Q10.1 2 9.9 2.5L8.3 4.7z'
    );

export const svgWhale: SvgIconFactory = createSvgIcon('whale', ICON_WHALE);
export const WhaleIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'whale', content: ICON_WHALE, ...props });
