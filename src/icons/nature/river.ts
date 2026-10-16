/**
 * river — LANDSCAPE icon: a winding river between grass banks.
 *
 * GEOMETRY: banks = two solid ground masses (top-left and bottom-right
 * wedges, y bands to the frame edges); river = the winding S-band left
 * between them, drawn as the NEGATIVE space via a REVERSE-WOUND S-curve
 * band hole punched through a full-width ground rect (the S band runs
 * from the top-left opening to the bottom-right opening, three bends).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_RIVER = flatPath(
    // ground block spanning the full frame (clockwise)
    'M1.4 3.4h21.2v17.2H1.4z' +
        // river S-band hole (reverse-wound): opens at the top-left edge,
        // snakes down with three bends, exits at the bottom-right edge —
        // left bank edge walks down first, right bank edge walks back up
        'M1.4 8.2L4.6 8.6C8 9 9.4 11 8.6 13.2 7.8 15.4 9 17 12.4 17.4L15.6 17.8 19.4 18.2 22.6 18.6 22.6 15.8 19.6 15.4C16.4 15 15 13.2 15.8 11 16.6 8.8 15.2 7.2 11.8 6.8L8.2 6.4 4.6 6 1.4 5.4z'
);

// String layer: registers 'river' in the shared registry + bound factory
export const svgRiver: SvgIconFactory = createSvgIcon('river', ICON_RIVER);

// React layer: same geometry through the shared flat shell
export const RiverIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'river', content: ICON_RIVER, ...props });
