/**
 * swan — ANIMALS icon: swan with the graceful S-curved neck, bill, wing
 * patch, tail tip and water ripples.
 *
 * GEOMETRY: the pointed tail sits LEFT, opposite the head. A continuous
 * swan breast rises into a long S-neck; swept feather cutout replaces the
 * generic round belly hole. Evenodd cuts both eye and wing in their own
 * silhouette; separate water ripples keep the swimming pose grounded.
 * Machinery: ../svg-icon.ts flatPath/createSvgIcon; ../react.tsx IconBase.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SWAN =
    // Unified contour prevents a disjoint neck and gives the breast volume.
    '<path d="M2 11L5.8 13Q10 10 13.5 13Q17.5 12.8 16 9Q13.2 4 16 2.6Q19 1.4 20 4L22 4.8 19.6 5.5Q17.3 4 17 5.5Q16.7 6.5 18 8.5Q21 13 17.6 17.2Q15.8 19.6 9 19.6Q3.3 19.2 2 15.5L3.8 15zM17.5 3.7a.45 .45 0 1 1 .9 0a.45 .45 0 1 1 -.9 0zM5.6 14.8Q10 11.9 14.7 15Q10.9 18.4 6 16.2Q10.4 17 12.9 15.2Q9.7 13.8 5.6 14.8z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    // Two separated ripple bars remain legible without resembling extra legs.
    flatPath('M3 21h15v.9H3zM6 22.6h9v.7H6z');

// String layer: registers 'swan' in the shared registry + bound factory
export const svgSwan: SvgIconFactory = createSvgIcon('swan', ICON_SWAN);

// React layer: same geometry through the shared flat shell
export const SwanIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'swan', content: ICON_SWAN, ...props });
