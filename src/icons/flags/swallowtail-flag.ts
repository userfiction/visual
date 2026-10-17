/**
 * swallowtailFlag — FLAGS icon: swallowtail flag on a pole (uplifted
 * geometry).
 *
 * GEOMETRY: pole rect x 4..6 spanning y 1..23; flag x 6..21 spanning
 * y 3..13 whose fly edge dips into a triangular notch — h15 to (21,3),
 * l-4 5 to the notch apex (17,8), l4 5 back out to (21,13), H6 closes.
 * Uplift vs the old 14×8 flag with a 4-deep notch: 15×10 body, 4-deep
 * notch (apex (17,8)) keeps the two tails legible at 16px. Registered as
 * 'swallowtailFlag'.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SWALLOWTAIL_FLAG = flatPath('M4 1h2v22H4zM6 3h15l-4 5 4 5H6z');

// String layer: registers 'swallowtailFlag' in the shared registry + bound factory
export const svgSwallowtailFlag: SvgIconFactory = createSvgIcon(
    'swallowtailFlag',
    ICON_SWALLOWTAIL_FLAG
);

// React layer: same geometry through the shared flat shell
export const SwallowtailFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, {
        name: 'swallowtailFlag',
        content: ICON_SWALLOWTAIL_FLAG,
        ...props,
    });
