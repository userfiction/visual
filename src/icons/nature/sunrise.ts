/**
 * sunrise — SKY icon: sunrise over the horizon (uplift: bigger sun,
 * thicker horizon bar, chunkier rays).
 *
 * GEOMETRY: half-sun = solid half-disc r 5.4 at (12,19), flat side DOWN on
 * the horizon (arc sweep-1 through the TOP); horizon bar x 2.4..21.6,
 * y 19..21.2; three ray wedges above (N vertical bar + NW/NE diagonals,
 * tips r 9.8, bases r 6.4 off center (12,19) — 9.8·cos45 ≈ 6.93,
 * 6.4·cos45 ≈ 4.53, half-width ±0.8).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SUNRISE = flatPath(
    // half-sun (flat chord on the horizon, arc through the top)
    'M6.6 19a5.4 5.4 0 0 1 10.8 0z' +
        // rays: left diagonal wedge, vertical bar, right diagonal wedge
        'M5.1 12.1L8.04 13.9 6.9 15.04z' +
        'M11.2 9.2h1.6v3.4h-1.6z' +
        'M18.9 12.1L15.96 13.9 17.1 15.04z' +
        // horizon bar
        'M2.4 19h19.2v2.2H2.4z'
);

// String layer: registers 'sunrise' in the shared registry + bound factory
export const svgSunrise: SvgIconFactory = createSvgIcon('sunrise', ICON_SUNRISE);

// React layer: same geometry through the shared flat shell
export const SunriseIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'sunrise', content: ICON_SUNRISE, ...props });
