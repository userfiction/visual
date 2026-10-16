/**
 * swallowtailFlag — FLAGS icon: swallowtail flag on a pole.
 *
 * GEOMETRY: pole rect x 4..6 spanning y 2..22; flag x 6..20 spanning
 * y 3..11 whose fly edge dips into a triangular notch — h14 to (20,3),
 * l-4 4 to the notch apex (16,7), l4 4 back out to (20,11), H6 closes.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SWALLOWTAIL_FLAG = flatPath('M4 2h2v20H4zM6 3h14l-4 4 4 4H6z');

// String layer: registers 'swallowtailFlag' in the shared registry + bound factory
export const svgSwallowtailFlag: SvgIconFactory = createSvgIcon('swallowtailFlag', ICON_SWALLOWTAIL_FLAG);

// React layer: same geometry through the shared flat shell
export const SwallowtailFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'swallowtailFlag', content: ICON_SWALLOWTAIL_FLAG, ...props });
