/**
 * moon-cloud — SKY icon: crescent moon tucked behind a cloud. Two
 * independent disjoint overlays stacked by placement (no boolean cuts) —
 * the weather set (cloud-drizzle etc.) owns rain variants.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_MOON_CLOUD = flatPath(
    // Upper-left crescent opens right, spanning x4..10 and y2..14.
    // Non-retracing contour: outer left semicircle plus inset quadratic
    // limb. The previous two nearly matching arcs cancelled the moon.
    'M10 2A6 6 0 1 0 10 14Q3 8 10 2z'
) +
    flatPath(
        // cloud (lower right): base line (4.4,18.6)→(19.6,18.6) then the
        // three-lobe top walking right→left — big right lobe r 3.8,
        // middle lobe r 3.1, left lobe r 2.9 closing at the base start
        // (standard flat cloud construction, cf. cloud.ts)
        'M4.4 18.6H19.6A3.8 3.8 0 0 0 15.9 14.9A3.1 3.1 0 0 0 11.4 13.9A2.9 2.9 0 0 0 4.4 18.6z'
    );

// String layer: registers 'moonCloud' + bound factory (svg-icon.ts)
export const svgMoonCloud: SvgIconFactory = createSvgIcon('moonCloud', ICON_MOON_CLOUD);

// React layer: same geometry through the shared flat shell (react.tsx)
export const MoonCloudIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'moonCloud', content: ICON_MOON_CLOUD, ...props });
