/**
 * pine — NATURE icon: pine tree (three stacked triangles + trunk + ground).
 *
 * GEOMETRY: three triangle tiers (tips at y 1.6/6.2/11.2, bases widening
 * 9.2/11.6/14.4 wide) overlap so no slivers show between tiers; trunk =
 * rect x 10.7..13.3 spanning y 18.8..22.2; ground = rect x 6.4..17.6
 * spanning y 22.2..23 (v-first hole below the base edge — the ground is
 * part of the trunk path so it unions cleanly).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_PINE = flatPath(
    'M12 1.6L16.6 8.2H7.4zM12 6.2L17.8 13.2H6.2zM12 11.2L19.2 18.8H4.8z' +
        'M10.7 18.8h2.6v3.4h-2.6z' +
        'M6.4 22.2v0.8h11.2v-0.8z'
);

// String layer: registers 'pine' in the shared registry + bound factory
export const svgPine: SvgIconFactory = createSvgIcon('pine', ICON_PINE);

// React layer: same geometry through the shared flat shell
export const PineIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'pine', content: ICON_PINE, ...props });
