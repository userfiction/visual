/**
 * forkedFlag — FLAGS icon: flag whose fly splits into two pointed tails.
 *
 * GEOMETRY: pole rect x 4..6 spanning y 1..23; flag body x 6..16 spanning
 * y 3..13 whose fly edge forks — h10 to (16,3), then l5 3 out to the top
 * tail tip (21,6), l-5 2 back into the notch apex (16,8), l5 3 out to the
 * bottom tail tip (21,11), l-5 2 home to (16,13), H6 closes. Unlike
 * swallowtail-flag.ts (a notch cut INTO a rectangular fly), here the two
 * tails STICK OUT beyond the 10-unit body with a 5-deep inner gap, giving
 * a distinct fork silhouette. Registered as 'forkedFlag'.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_FORKED_FLAG = flatPath('M4 1h2v22H4zM6 3h10l5 3-5 2 5 3-5 2H6z');

// String layer: registers 'forkedFlag' in the shared registry + bound factory
export const svgForkedFlag: SvgIconFactory = createSvgIcon('forkedFlag', ICON_FORKED_FLAG);

// React layer: same geometry through the shared flat shell
export const ForkedFlagIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'forkedFlag', content: ICON_FORKED_FLAG, ...props });
