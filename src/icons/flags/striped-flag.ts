/**
 * stripedFlag — FLAGS icon: flag with horizontal stripes cut as
 * negative space.
 *
 * GEOMETRY (one evenodd element — flatPath has no fill-rule, so the
 * literal path carries fill-rule="evenodd"): pole rect x 4..6 y 1..23;
 * flag body x 6..20 y 3..13 with TWO full-width stripe holes (2 tall at
 * y 5..7 and y 9..11) — the holes reach both flag edges, so nonzero-
 * unsafe topology is avoided by evenodd and the body resolves into
 * three 2-tall filled stripes. Registered as 'stripedFlag'.
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// d attribute: pole + flag body + the two full-width stripe holes.
const STRIPED_D = 'M4 1h2v22H4zM6 3h14v10H6zM6 5h14v2H6zM6 9h14v2H6z';

// …wrapped in the evenodd path element (flatPath cannot carry fill-rule).
export const ICON_STRIPED_FLAG = `<path d="${STRIPED_D}" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;

// String layer: registers 'stripedFlag' in the shared registry + bound factory
export const svgStripedFlag: SvgIconFactory = createSvgIcon('stripedFlag', ICON_STRIPED_FLAG);

// React layer: same geometry through the shared flat shell
export const StripedFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'stripedFlag', content: ICON_STRIPED_FLAG, ...props });
