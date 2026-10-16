/**
 * dragon — ANIMALS icon: dragon head in profile facing right, with two
 * horns, neck spikes, nostril and eye.
 *
 * GEOMETRY: skull/jaw silhouette as one path — flat crown from (3.4,6.8),
 * snout curving to the upper-jaw tip (23,11.4..12.2), open-mouth notch back
 * to the lower jaw and neck; horns = two solid triangles rising from the
 * crown; neck spikes = two solid triangles on the back edge; eye hole r 1
 * and nostril hole r 0.55 cut COUNTERCLOCKWISE inside the skull/snout.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_DRAGON = flatPath(
    // horns (solid triangles overlapping the crown)
    'M5.6 6.8L3.6 2.6 8.8 5.4z' +
        'M9.6 6.2L9.2 2 13.2 4.8z' +
        // skull + open jaw, clockwise outline
        'M3.4 6.8L13 6.8Q16.6 6.8 18.6 9L21.8 9.8Q23 10.1 23 11.4L23 12.2Q23 13.4 21.8 13.4L19 13.2Q17.6 15.8 14.6 15.8L9 15.8L10.2 12.4L5.4 13.2L3.4 13.2z' +
        // neck spikes (solid triangles on the back edge)
        'M3.4 8.2L1.8 8.6 3.4 9.4z' +
        'M3.4 10.6L1.8 11 3.4 11.8z' +
        // eye hole, counterclockwise
        'M13.4 8.6a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
        // nostril hole, counterclockwise (inside the upper jaw band)
        'M20.05 10.4a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z'
);

// String layer: registers 'dragon' in the shared registry + bound factory
export const svgDragon: SvgIconFactory = createSvgIcon('dragon', ICON_DRAGON);

// React layer: same geometry through the shared flat shell
export const DragonIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'dragon', content: ICON_DRAGON, ...props });
