/**
 * wolf — ANIMALS icon: HOWLING wolf in profile — muzzle raised up-left,
 * one ear on the crown, back sweeping down-right into a bushy tail that
 * reaches the ground, front leg down-left and an empty gap between leg
 * and tail (the howling pose's negative space).
 *
 * GEOMETRY: raised muzzle, upright pointed ear and shaggy chest define the
 * howling pose. A seated haunch and broad curling tail distinguish it from
 * a straight-legged dog; the hip slit and eye are same-path evenodd holes.
 * Machinery: ../svg-icon.ts createSvgIcon; ../react.tsx IconBase.
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Unified body/tail contour avoids accidental cancellation where overlapping
// fur triangles meet the neck; mouth notch stays open at the muzzle edge.
export const ICON_WOLF = '<path d="M4.5 2.5L8.1 4.2 10.2 2 10.8 6Q12.3 7.3 12.8 9.8L14.2 11.5 13 11.4Q16.8 13.5 17.7 17Q19 20 22 19Q22.4 22.5 16.4 22L12.8 21.8 11 20.2V22H6.5V21L8.2 20.4 8.5 15.2 6.8 12.5 8 12.7 6.7 10.2 7.7 10.3 7.5 7.2 5 5.4 5.6 4.8zM8.7 6.3a.6 .6 0 1 1 1.2 0a.6 .6 0 1 1 -1.2 0zM13 15Q16 15.4 15.2 19L14 19Q14.8 16.6 13 16.1z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';

// String layer: registers 'wolf' in the shared registry + bound factory
export const svgWolf: SvgIconFactory = createSvgIcon('wolf', ICON_WOLF);

// React layer: same geometry through the shared flat shell
export const WolfIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'wolf', content: ICON_WOLF, ...props });
