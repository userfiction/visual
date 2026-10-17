/**
 * windsock — FLAGS icon: airport windsock on a pole.
 *
 * GEOMETRY: pole rect x 4..6 spanning y 1..23; horizontal cone attached
 * at the pole top drawn as THREE quad segments (the 2-unit gaps between
 * them are the negative-space stripes — no holes needed): overall cone
 * tapers from an 8-tall mouth at the pole (x 6, y 3..11) to a 2-tall tip
 * (x 21, y 6..8), both edges sloping 0.2 units per x. Segments:
 *   A x 6..10:  M6 3l4 .8v6.4L6 11z
 *   B x 12..15: M12 4.2l3 .6v4.4l-3 .6z
 *   C x 17..21: M17 5.2l4 .8v2l-4 .8z
 * Each segment's corners sit exactly on the shared cone edges, so the
 * three pieces read as one striped cone. Registered as 'windsock'.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_WINDSOCK = flatPath(
    'M4 1h2v22H4z' + // pole
        'M6 3l4 .8v6.4L6 11z' + // cone segment A (at the mouth)
        'M12 4.2l3 .6v4.4l-3 .6z' + // cone segment B (middle stripe)
        'M17 5.2l4 .8v2l-4 .8z' // cone segment C (to the tip)
);

// String layer: registers 'windsock' in the shared registry + bound factory
export const svgWindsock: SvgIconFactory = createSvgIcon('windsock', ICON_WINDSOCK);

// React layer: same geometry through the shared flat shell
export const WindsockIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'windsock', content: ICON_WINDSOCK, ...props });
