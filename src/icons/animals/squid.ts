/**
 * squid — ANIMALS icon: squid with the long conical MANTLE, side fins, a
 * head band with two ringed eyes, four hanging arms and two long tentacles
 * with paddle tips.
 *
 * GEOMETRY: mantle = one teardrop path — tip at (12,2.6) widening to the
 * rounded base at y 12.4; fins = two solid flaps overlapping the mantle's
 * lower sides; head band = a Q-curved band under the mantle base; arms =
 * four solid tapering wedges fanning down (tips y 19.2..20.2); tentacles =
 * two thin solid wedges reaching y 20.4 with solid paddle-dot <circle>
 * elements; eyes = evenodd rings below the head band, with their holes
 * inside the same path (later paths cannot erase earlier paint).
 * Machinery cross-reference: flatPath
 * (../svg-icon.ts) + IconBase (../react.tsx), same contract as
 * animals/snail.ts.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

export const ICON_SQUID =
    flatPath(
        // fins (solid flaps overlapping the mantle's lower sides)
        'M9.6 10.4Q7.6 9.4 6.4 11.4Q8 12.6 9.7 12z' +
            'M14.4 10.4Q16.4 9.4 17.6 11.4Q16 12.6 14.3 12z' +
            // mantle (conical teardrop, tip up), clockwise outline
            'M12 2.6Q14 4.4 14.6 10.2L14.6 11.4Q13.6 12.4 12 12.4Q10.4 12.4 9.4 11.4L9.4 10.2Q10 4.4 12 2.6z' +
            // head band under the mantle base
            'M9.4 12.2Q12 13.4 14.6 12.2L14.6 13Q12 13.8 9.4 13z' +
            // arms (four tapering wedges fanning down)
            'M10 14.6Q7.6 16 6.8 19.2Q7.6 19.6 8.2 19.2Q9 16.4 10.8 15z' +
            'M10.6 14.8Q10 17.4 10.4 20.2Q11.2 20.4 11.6 19.8Q11.6 17 11.8 15.2z' +
            'M13.2 14.8Q13.6 17.4 14.8 19.8Q14 20.4 13.4 20Q12.4 17.4 12.4 15.2z' +
            'M13.4 14.6Q16 16 17 19.2Q16.2 19.6 15.6 19.2Q14.8 16.4 13.4 15z' +
            // long tentacles (two thin wedges reaching y 20.2)
            'M10.9 14.7Q10.4 17.6 10.9 20.2L12.1 20.2Q12.4 17.6 12.1 15z' +
            'M12.7 14.8Q13.4 17.6 13.1 20.2L14.3 20.2Q14.5 17.6 13.9 14.9z'
    ) +
    // tentacle paddle dots
    `<circle cx="11.5" cy="21" r="0.9" ${FLAT}/>` +
    `<circle cx="13.7" cy="21" r="0.9" ${FLAT}/>` +
    // Ring centers stay below the band and above the arms, so the same-path
    // holes remain genuinely transparent instead of exposing an opaque base.
    '<path d="M9.1 14.3a1.2 1.2 0 1 1 2.4 0a1.2 1.2 0 1 1 -2.4 0zM9.8 14.3a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0zM12.5 14.3a1.2 1.2 0 1 1 2.4 0a1.2 1.2 0 1 1 -2.4 0zM13.2 14.3a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';

// String layer: registers 'squid' in the shared registry + bound factory
export const svgSquid: SvgIconFactory = createSvgIcon('squid', ICON_SQUID);

// React layer: same geometry through the shared flat shell
export const SquidIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'squid', content: ICON_SQUID, ...props });
