/**
 * cypress — NATURE icon: cypress tree (tall narrow teardrop + trunk +
 * ground + inner texture line).
 *
 * GEOMETRY: body = one path — pointed tip at (12,1.4), cubic curves
 * swelling to rx 4.6 at mid-height, tapering back to a narrow rounded
 * base at y 21.4; a thin COUNTERCLOCKWISE arc line hole rides the body's
 * right side (the cypress's inner shading line); trunk = rect
 * x 10.9..13.1 spanning y 21.8..22.8; ground = rect x 7.6..16.4 spanning
 * y 22.8..23.6.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CYPRESS = flatPath(
    'M12 1.4c3 2.6 4.6 6.4 4.6 10.2 0 4.4-1.9 7.6-4.6 9.8-2.7-2.2-4.6-5.4-4.6-9.8C7.4 7.8 9 4 12 1.4z' +
        // inner shading line hole (thin arc band, v-first)
        'M14.9 6.2c.7 1.7 1.1 3.6 1.1 5.4 0 2.4-.6 4.6-1.6 6.5l-.8-.5c.9-1.7 1.4-3.7 1.4-6 0-1.7-.4-3.4-1-5z' +
        // trunk + ground
        'M10.9 21.8h2.2v1h-2.2z' +
        'M7.6 22.8h8.8v.8h-8.8z'
);

// String layer: registers 'cypress' in the shared registry + bound factory
export const svgCypress: SvgIconFactory = createSvgIcon('cypress', ICON_CYPRESS);

// React layer: same geometry through the shared flat shell
export const CypressIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cypress', content: ICON_CYPRESS, ...props });
