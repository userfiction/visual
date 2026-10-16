/**
 * gorilla — ANIMALS icon: gorilla face — squarish heavy head with a
 * sagittal crest on top, a big dark face window carrying a solid brow bar,
 * solid eye dots and a boxed solid muzzle with two nostril holes.
 *
 * GEOMETRY: head = rounded-rect dome (x 5..19, y 5..20.8, Q corners)
 * CLOCKWISE; crest = solid Q-arched hump seated INSIDE the head's top
 * edge, tip rising to y 3.2; face window = COUNTERCLOCKWISE hole ellipse
 * r 4.9/5 at (12,13.4) leaving a head rim; INSIDE the window features are
 * re-filled SOLID (clockwise): brow bar rect, eye dots r 0.8 and a rounded
 * boxed muzzle (h/v/a path) spanning y 15.2..18; nostrils = two
 * COUNTERCLOCKWISE circle holes punched INSIDE the solid muzzle (penguin
 * re-fill trick, see penguin.ts). Machinery: flatPath/createSvgIcon
 * (../svg-icon.ts), IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_GORILLA = flatPath(
    // head: rounded-rect dome, clockwise
    'M5 9.4Q5 5.4 9 5Q12 4.4 15 5Q19 5.4 19 9.4L19 16.4Q19 19.8 15.4 20.4Q12 20.9 8.6 20.4Q5 19.8 5 16.4z' +
        // sagittal crest (solid hump on the crown)
        'M9.4 5.2Q9.8 3.2 12 3.2Q14.2 3.2 14.6 5.2z' +
        // face window hole, counterclockwise
        'M7.1 13.4a4.9 5 0 1 0 9.8 0a4.9 5 0 1 0 -9.8 0z' +
        // brow bar re-filled solid
        'M8.6 10.4h6.8v1.1h-6.8z' +
        // eye dots re-filled solid
        'M9.4 13.2a0.8 0.8 0 1 1 1.6 0a0.8 0.8 0 1 1 -1.6 0z' +
        'M13 13.2a0.8 0.8 0 1 1 1.6 0a0.8 0.8 0 1 1 -1.6 0z' +
        // boxed muzzle re-filled solid (rounded bottom corners)
        'M9.6 15.2h4.8v1.8a1 1 0 0 1 -1 1h-2.8a1 1 0 0 1 -1 -1z' +
        // nostril holes punched inside the muzzle, counterclockwise
        'M10.7 16.4a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z' +
        'M12.3 16.4a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z'
);

// String layer: registers 'gorilla' in the shared registry + bound factory
export const svgGorilla: SvgIconFactory = createSvgIcon('gorilla', ICON_GORILLA);

// React layer: same geometry through the shared flat shell
export const GorillaIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'gorilla', content: ICON_GORILLA, ...props });
