/**
 * paw — ANIMALS icon: true paw-print anatomy — palm pad + four slanted
 * teardrop digital pads as SEPARATE pads with real negative-space gaps (a
 * print's pads never merge into one blob).
 *
 * GEOMETRY: the bilobed palm bean is one evenodd element; the four toe pads
 * are solid rotated <ellipse> elements — the gaps between pads stay
 * transparent because cross-element stacking is a plain union (see
 * svg-icon.ts flatPath + react.tsx IconBase for the shell pipeline).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

// Palm pad: broad bean with two heel lobes.
const PAW_PALM =
    'M12 12.8' +
    'Q16.6 12.8 17.1 16.2' + // right shoulder
    'Q17.6 18.9 16.1 20.5' + // right heel lobe
    'Q14.4 22 12 21.9' + // bottom
    'Q9.6 22 7.9 20.5' + // left heel lobe
    'Q6.4 18.9 6.9 16.2' + // left shoulder
    'Q7.4 12.8 12 12.8' +
    'z';

export const ICON_PAW =
    flatPath(PAW_PALM) +
    // digital pads: rotated teardrop ellipses (solid — gaps stay negative)
    `<ellipse cx="9.9" cy="7.7" rx="2" ry="2.55" transform="rotate(-8 9.9 7.7)" ${FLAT}/>` +
    `<ellipse cx="14.1" cy="7.7" rx="2" ry="2.55" transform="rotate(8 14.1 7.7)" ${FLAT}/>` +
    `<ellipse cx="5" cy="10.9" rx="1.9" ry="2.4" transform="rotate(-24 5 10.9)" ${FLAT}/>` +
    `<ellipse cx="19" cy="10.9" rx="1.9" ry="2.4" transform="rotate(24 19 10.9)" ${FLAT}/>`;

export const svgPaw: SvgIconFactory = createSvgIcon('paw', ICON_PAW);
export const PawIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'paw', content: ICON_PAW, ...props });
