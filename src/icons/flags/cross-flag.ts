/**
 * crossFlag — FLAGS icon: flag with a CENTERED cross cut as negative
 * space.
 *
 * GEOMETRY (one evenodd element — flatPath has no fill-rule, so the
 * literal path carries fill-rule="evenodd"): pole rect x 4..6 y 1..23;
 * flag body x 6..20 y 3..13 with a cross-shaped hole — vertical band
 * x 11.75..14.25 (2.5 wide) and horizontal band y 6.75..9.25 (2.5 tall),
 * both spanning the full flag so the hole's edges coincide with the flag
 * boundary and the body resolves into four corner blocks. The cross is
 * centered on the flag's midlines ((13,8)) — the offset-cross sibling is
 * nordic-flag.ts. Registered as 'crossFlag'.
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// d attribute: pole + flag body + the centered cross-shaped hole.
const CROSS_D = 'M4 1h2v22H4zM6 3h14v10H6zM11.75 3h2.5v3.75H20v2.5h-5.75V13h-2.5V9.25H6V6.75h5.75z';

// …wrapped in the evenodd path element (flatPath cannot carry fill-rule).
export const ICON_CROSS_FLAG = `<path d="${CROSS_D}" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;

// String layer: registers 'crossFlag' in the shared registry + bound factory
export const svgCrossFlag: SvgIconFactory = createSvgIcon('crossFlag', ICON_CROSS_FLAG);

// React layer: same geometry through the shared flat shell
export const CrossFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'crossFlag', content: ICON_CROSS_FLAG, ...props });
