/**
 * shield — FANTASY icon: heater shield — redrawn (FANTASY-REDRAW).
 *
 * GEOMETRY: outer heater silhouette unchanged (flat top corners at
 * (20,5)/(4,5) via the 3-unit diagonal shoulders from the apex (12,2),
 * straight sides to y 11, mirrored cubics down to the bottom point (12,22)).
 * Two new negative-space details inside it:
 *   - INSET BORDER: the same silhouette shrunk by ~1.6 units (apex (12,3.7),
 *     shoulders to (18.4/5.6, 6.1), sides at x 18.4/5.6, bottom point
 *     (12,20.4)) cut as a hole → the remaining solid is a uniform border
 *     band around an empty field.
 *   - EMBLEM: a bold chevron (∧) band inside the field — apex (12,7.8),
 *     arms down to end caps (17,12.4..15)/(7,12.4..15), inner notch
 *     (12,10.6). It sits strictly inside the inset hole, so under evenodd
 *     its depth is 3 → filled: border (1) → field hole (2) → emblem (3).
 * All three shapes share ONE evenodd element; the emblem never touches the
 * inset hole boundary (min margin 0.5 at the arm bottoms, verified against
 * the inset cubic at x 7/17), so no depth ambiguity.
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Outer silhouette (1) + inset border hole (2) + chevron emblem refill (3)
// — depth arithmetic under fill-rule="evenodd" does the whole job.
export const ICON_SHIELD =
    `<path d="M12 2L20 5V11C20 16.25 16.6 19.6 12 22C7.4 19.6 4 16.25 4 11V5ZM12 3.7L18.4 6.1V11C18.4 15.4 15.5 18.3 12 20.4C8.5 18.3 5.6 15.4 5.6 11V6.1ZM12 7.8L17 12.4V15L12 10.6L7 15V12.4Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;

export const svgShield: SvgIconFactory = createSvgIcon('shield', ICON_SHIELD);

export const ShieldIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'shield', content: ICON_SHIELD, ...props });
