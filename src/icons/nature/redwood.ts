/**
 * redwood — NATURE icon: redwood/sequoia (very tall shaggy conifer with
 * buttressed trunk).
 *
 * GEOMETRY: crown = FOUR stacked triangles (tips y 0.6→14, bases 5.6/7.6/
 * 9.6/11.6 wide — narrower and taller than fir) plus shaggy edge notches
 * on the bottom tier (zigzag cuts); trunk = flared buttress rect
 * x 10.6..13.4 spanning y 20.4..22.8 (wider at the base); ground = rect
 * x 6.8..17.2 spanning y 22.8..23.6.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_REDWOOD = flatPath(
    'M12 0.6L14.8 5h-5.6zM12 3.4L15.8 9h-7.6zM12 7.4L16.8 14h-9.6zM12 11.4L17.8 18.8H6.2z' +
        // shaggy bottom-tier edge (zigzag cuts into the base, holes)
        'M7.6 18.8l1.6 1.4 1.4-1.4 1.4 1.4 1.6-1.4 1.4 1.4 1.4-1.4 1.6 1.4 1.4-1.4z' +
        // buttressed trunk (wider at the base)
        'M10.6 20.4h2.8v1.6l0.9 0.8h-4.6l0.9-0.8z' +
        // ground line
        'M6.8 22.8h10.4v.8h-10.4z'
);

// String layer: registers 'redwood' in the shared registry + bound factory
export const svgRedwood: SvgIconFactory = createSvgIcon('redwood', ICON_REDWOOD);

// React layer: same geometry through the shared flat shell
export const RedwoodIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'redwood', content: ICON_REDWOOD, ...props });
