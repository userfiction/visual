/**
 * sunrise — SKY icon: sunrise over the horizon (half sun + horizon line +
 * three shine rays).
 *
 * GEOMETRY: horizon = solid ground bar x 3.4..20.6 spanning y 18.6..20.2;
 * half-sun = a solid half-disc (r 4.6 at (12,18.6), flat side DOWN on
 * the horizon — drawn as its own subpath, arcs sweep-0 through the TOP);
 * rays = three thin solid wedges above the sun (left diagonal, vertical,
 * right diagonal; tips r 8.9, bases r 6.1 — same wedge geometry as the
 * full sun's).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SUNRISE = flatPath(
    // half-sun (flat chord on the horizon, arc through the top)
    'M7.4 18.6a4.6 4.6 0 0 1 9.2 0z' +
        // rays: left diagonal, vertical, right diagonal (thin wedges)
        'M5.2 12.4L6.1 11.7 8.3 14.5 7.4 15.2z' +
        'M11.3 9h1.4v4.6h-1.4z' +
        'M18.8 12.4L16.6 15.2 15.7 14.5 17.9 11.7z' +
        // horizon bar
        'M3.4 18.6h17.2v1.6H3.4z'
);

// String layer: registers 'sunrise' in the shared registry + bound factory
export const svgSunrise: SvgIconFactory = createSvgIcon('sunrise', ICON_SUNRISE);

// React layer: same geometry through the shared flat shell
export const SunriseIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'sunrise', content: ICON_SUNRISE, ...props });
