/**
 * roundedFlag — FLAGS icon: flag with a fully rounded fly edge.
 *
 * GEOMETRY: pole rect x 4..6 spanning y 1..23; flag x 6..20 spanning
 * y 3..13 — h10.5 to (16.5,3), then an rx/ry-3.5 arc (sweep 1) to
 * (20,6.5), v3 down the straight fly edge to (20,9.5), a second sweep-1
 * arc back to (16.5,13), H6 closes. The two quarter-arcs + straight
 * middle give the flag a capsule-ended fly — the only curved-corner
 * flag in the set, distinct from every polygon silhouette. Registered
 * as 'roundedFlag'.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_ROUNDED_FLAG = flatPath(
    'M4 1h2v22H4zM6 3h10.5a3.5 3.5 0 0 1 3.5 3.5v3a3.5 3.5 0 0 1-3.5 3.5H6z'
);

// String layer: registers 'roundedFlag' in the shared registry + bound factory
export const svgRoundedFlag: SvgIconFactory = createSvgIcon('roundedFlag', ICON_ROUNDED_FLAG);

// React layer: same geometry through the shared flat shell
export const RoundedFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'roundedFlag', content: ICON_ROUNDED_FLAG, ...props });
