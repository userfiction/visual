/**
 * axe — FANTASY icon: axe (single-bit blade on a vertical haft) — redrawn
 * (FANTASY-REDRAW).
 *
 * GEOMETRY: haft = 2px bar (x 11..13, y 4..21); blade = the same lens shape
 * attached to the haft's right side, sweeping from (13,3) out to the point
 * (21,7) and back to (13,11). The BEVEL is the new negative-space detail:
 * an inner lens hole (from (14,4.1) via Q(19,4.6)(19.8,7) back through
 * Q(19,9.4)(14,9.9)) inset ~1 unit from the blade silhouette on every side,
 * so the remaining solid reads as a ground cutting-edge band around a
 * recessed cheek. Pommel knob = literal circle (r 1.3 at (12,21.8))
 * overlapping the haft's foot.
 *
 * FILL RULE: the cheek lens is cut EXPLICITLY by fill-rule="evenodd" (it
 * nests inside the blade subpath only — depth 2 — and never touches the
 * haft, so no same-element XOR seam). Winding is not load-bearing
 * (cross-ref: fruits/*.ts redraw convention; svg-icon.ts flatPath unchanged).
 * The pommel circle stays a separate element because it overlaps the haft
 * (paint-over union; a same-path overlap would cancel under evenodd).
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Haft + blade silhouette and the inset cheek-lens bevel hole in ONE
// evenodd element, then the pommel knob as its own paint-over circle.
export const ICON_AXE =
    `<path d="M11 4H13V21H11ZM13 3Q20 3.5 21 7Q20 10.5 13 11ZM14 4.1Q19 4.6 19.8 7Q19 9.4 14 9.9Q15 7 14 4.1Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    '<circle cx="12" cy="21.8" r="1.3" fill="currentColor" stroke="none"/>';

export const svgAxe: SvgIconFactory = createSvgIcon('axe', ICON_AXE);

export const AxeIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'axe', content: ICON_AXE, ...props });
