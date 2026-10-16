/**
 * crocodile — ANIMALS icon: crocodile in profile facing left with the long
 * snout, eye bump, back/tail scutes, a tooth-zigzag mouth line and stubby
 * legs.
 *
 * GEOMETRY: a long flattened jaw occupies the left third, eye mound rises
 * behind it, and a tapered tail extends beyond the low armored back.
 * Bent, splayed legs replace upright mammal-like posts. A single zigzag
 * mouth cutout avoids overlapping tooth holes refilling each other.
 * Machinery: ../svg-icon.ts flatPath/createSvgIcon; ../react.tsx IconBase.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CROCODILE =
    // Jaw, back and tail share one contour; holes remain theme-transparent.
    '<path d="M1.5 10.6L6.1 10.3Q6 8.3 8 8.4L9.2 9.3Q12 8.4 15.2 10Q19 11.8 22.5 11L21.3 13Q18.7 14.7 15.2 14.1L8 14Q4 14 1.6 12.9zM6.7 9.8a.65 .65 0 1 1 1.3 0a.65 .65 0 1 1 -1.3 0zM2.3 11.2h.8v.6h-.8zM2 12L3 12.2 3.5 11.8 4 12.4 4.8 12 5.4 12.5 6.2 12.1 7 12.7 7.8 12.4V13L2 12.8z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    // Low triangular scutes and bent legs reinforce the reptile silhouette.
    flatPath('M9 9.4L9.7 7.7 11 9.2zM12 9.5L13 8 14.2 10zM15.5 10.5L16.7 9.2 17.6 11.2zM18.5 11.5L19.6 10.5 20.5 11.6zM8 13L6 15.7 8.2 17H5.1L4.5 15.6 6.3 12.8zM14.8 13.4L17 15.5 15.5 17H18.3L19 15.4 16 12.7z');

// String layer: registers 'crocodile' in the shared registry + bound factory
export const svgCrocodile: SvgIconFactory = createSvgIcon('crocodile', ICON_CROCODILE);

// React layer: same geometry through the shared flat shell
export const CrocodileIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'crocodile', content: ICON_CROCODILE, ...props });
