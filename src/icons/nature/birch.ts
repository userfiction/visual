/**
 * birch — NATURE icon: birch tree (slender layered crown + trunk with
 * bark dash marks + ground).
 *
 * GEOMETRY: four stacked slim triangles (tips y 1.8→12.6, bases 6.8/8.8/
 * 10.4/12 wide) overlap; trunk rect x 10.9..13.1 spanning y 19..22.2 with
 * THREE COUNTERCLOCKWISE dash holes (the birch's white-bark marks, top
 * dash shorter); ground = rect x 6.6..17.4 spanning y 22.2..23.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_BIRCH = flatPath(
    'M12 1.8L15.4 6h-6.8zM12 4.6L16.4 10H7.6zM12 8.6L17.2 14.4H6.8zM12 12.6L18 19H6z' +
        'M10.9 19h2.2v3.2h-2.2z' +
        // bark dash holes (thin rects, v-first; top dash shorter)
        'M11.4 19.6v.7h1.7v-.7z' +
        'M10.9 20.8v.7h2.2v-.7z' +
        'M11.2 21.9v.7h1.6v-.7z' +
        // ground line
        'M6.6 22.2h10.8v.8h-10.8z'
);

// String layer: registers 'birch' in the shared registry + bound factory
export const svgBirch: SvgIconFactory = createSvgIcon('birch', ICON_BIRCH);

// React layer: same geometry through the shared flat shell
export const BirchIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'birch', content: ICON_BIRCH, ...props });
