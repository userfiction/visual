/**
 * sunset — SKY icon: sun sinking below the horizon (half-sun + horizon +
 * downward arrow — the arrow is what separates it from sunrise.ts).
 *
 * GEOMETRY: half-sun = solid half-disc r 5 at (12,17.4), flat side DOWN on
 * the horizon bar (x 2.4..21.6, y 17.4..19.8); above the sun a down arrow:
 * shaft bar x 11.2..12.8 y 4.4..8.4 + triangular head (9.2,8.4)→(14.8,8.4)
 * →tip (12,11.6), leaving a 0.8 gap to the sun top (12.4).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SUNSET = flatPath(
    // half-sun (flat chord on the horizon, arc through the top)
    'M7 17.4a5 5 0 0 1 10 0z' +
        // down arrow: shaft + triangular head pointing at the sun
        'M11.2 4.4h1.6v4h-1.6z' +
        'M9.2 8.4h5.6L12 11.6z' +
        // horizon bar
        'M2.4 17.4h19.2v2.4H2.4z'
);

// String layer: registers 'sunset' in the shared registry + bound factory
export const svgSunset: SvgIconFactory = createSvgIcon('sunset', ICON_SUNSET);

// React layer: same geometry through the shared flat shell
export const SunsetIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'sunset', content: ICON_SUNSET, ...props });
