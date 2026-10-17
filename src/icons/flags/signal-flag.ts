/**
 * signalFlag — FLAGS icon: maritime signal flag (pointed fly, roundel
 * hole).
 *
 * GEOMETRY (one evenodd element — flatPath has no fill-rule, so the
 * literal path carries fill-rule="evenodd"): pole rect x 4..6 y 1..23;
 * flag body x 6..18 y 3..13 whose fly edge rises to a single point —
 * h12 to (18,3), l3 5 to the point (21,8), l-3 5 home to (18,13), H6
 * closes; centered roundel hole r 2.4 at (12,8) punched through the body
 * (a2.4 arc pair). Registered as 'signalFlag'.
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// d attribute: pole + pointed-fly body + the roundel hole.
const SIGNAL_D =
    'M4 1h2v22H4z' +
    'M6 3h12l3 5-3 5H6z' +
    'M14.4 8a2.4 2.4 0 1 1-4.8 0a2.4 2.4 0 1 1 4.8 0z';

// …wrapped in the evenodd path element (flatPath cannot carry fill-rule).
export const ICON_SIGNAL_FLAG = `<path d="${SIGNAL_D}" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;

// String layer: registers 'signalFlag' in the shared registry + bound factory
export const svgSignalFlag: SvgIconFactory = createSvgIcon('signalFlag', ICON_SIGNAL_FLAG);

// React layer: same geometry through the shared flat shell
export const SignalFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'signalFlag', content: ICON_SIGNAL_FLAG, ...props });
