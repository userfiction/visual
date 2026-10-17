/**
 * crossedFlags — FLAGS icon: two flags on poles crossed like an X.
 *
 * GEOMETRY (all four subpaths wound POSITIVE so nonzero fill unions the
 * overlaps — opposite windings would punch a transparent hole where the
 * poles cross, since flatPath carries no fill-rule):
 *   - pole A (bottom-left → top-right): quad M5.3 20.5L17.3 2.5 18.7 3.5
 *     6.7 21.5z — approximately 1.72-wide band along the (6,21)→(18,3)
 *     centerline (endpoint offsets ±(0.7,0.5)).
 *   - pole B (bottom-right → top-left): SAME quad mirrored, vertex order
 *     reversed (M17.3 21.5L5.3 3.5 6.7 2.5 18.7 20.5z) purely to flip its
 *     shoelace sign positive.
 *   - flag A: rotated-rect pennant alongside pole A's top — hoist edge
 *     M16.5 5.2L18 2.95 runs parallel to pole A's centerline, 0.05 above
 *     it (dir (2,-3) units, still overlapping the pole),
 *     ending just past the pole tip (18,3); body extends
 *     perpendicular-right (offset (+4.17,+2.78)) to (22.17,5.73) /
 *     (20.67,7.98): the flag overlaps its pole, no floating gap.
 *   - flag B: mirror of flag A (M3.33 7.98L1.83 5.73 6 2.95 7.5 5.2z),
 *     order reversed to stay positive-winding.
 * Registered as 'crossedFlags'.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_CROSSED_FLAGS = flatPath(
    'M5.3 20.5L17.3 2.5 18.7 3.5 6.7 21.5z' + // pole A (positive winding)
        'M17.3 21.5L5.3 3.5 6.7 2.5 18.7 20.5z' + // pole B — mirrored, order reversed
        'M16.5 5.2L18 2.95 22.17 5.73 20.67 7.98z' + // flag A riding pole A's top
        'M3.33 7.98L1.83 5.73 6 2.95 7.5 5.2z' // flag B riding pole B's top
);

// String layer: registers 'crossedFlags' in the shared registry + bound factory
export const svgCrossedFlags: SvgIconFactory = createSvgIcon(
    'crossedFlags',
    ICON_CROSSED_FLAGS
);

// React layer: same geometry through the shared flat shell
export const CrossedFlagsIcon = (props: IconProps) =>
    React.createElement(IconBase, {
        name: 'crossedFlags',
        content: ICON_CROSSED_FLAGS,
        ...props,
    });
