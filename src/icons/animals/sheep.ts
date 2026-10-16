// Sheep: a full woolly body, bare hanging face, lateral ears and four short
// hooves avoid the flower-like radial face silhouette. The fleece outline
// is one scalloped contour, so overlapping wool circles cannot hide details.
// Shared layers: ../svg-icon.ts createSvgIcon; ../react.tsx IconBase.
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SHEEP =
    // Face clearance is cut with the fleece, not painted in a theme color.
    '<path d="M4 8Q2 5 5 4.8Q5.5 2 8.3 3.2Q10.2 1.2 12.4 3Q15 1.9 16.3 4.2Q19 3.6 19.8 6.2Q22 7.4 20.4 9.7Q22 12 20 13.5Q20.2 16.3 17.3 16.5Q16 18.6 13.5 17.2Q11.4 19 9.3 17.4Q6.5 18.4 5.5 16Q2.5 16 3.3 13.5Q1 11.7 3.2 9.8zM13.8 7.7Q17 6.8 19 8.8L18 14.8Q16.6 17 14.4 14.5z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    // Separate bare face and ears sit in the fleece clearance; same-path eye.
    '<path d="M14.5 8.6Q16.2 7.9 18.1 9L17.3 14.2Q16.2 15.8 15.2 14.2zM16.2 10.4a.55 .55 0 1 1 1.1 0a.55 .55 0 1 1 -1.1 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    // Short hooves and sideward ears distinguish the sheep from a wool cloud.
    flatPath('M14.8 8.8L12.2 8 13.1 10.4 15 10zM18 9L21.8 8.3 20.6 10.5 18 10.6zM5.5 15h1.6v6H5.5zM8 16h1.5v5H8zM13 16h1.5v5H13zM16.4 15.7H18V21h-1.6z');

// String layer: registers 'sheep' in the shared registry + bound factory
export const svgSheep: SvgIconFactory = createSvgIcon('sheep', ICON_SHEEP);

// React layer: same geometry through the shared flat shell
export const SheepIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'sheep', content: ICON_SHEEP, ...props });
