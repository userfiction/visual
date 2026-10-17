/**
 * wind — SKY icon: three flowing wind bars, the top one curling back.
 *
 * GEOMETRY: top bar (thickness 1.7, y 5.8..7.5) runs right into a 180°
 * U-hook that folds back left as a tail (y 9.2..10.9 to x 6.4): outer
 * semicircle r 2.55 (center (13.4,8.35)) sweep-1 through east, inner
 * semicircle r 0.85 back up — clean annular loop, thickness preserved.
 * Middle bar (y 11.2..12.9) full width, bottom bar (y 16.6..18.3)
 * shorter — both squared left, r 0.85 rounded right caps.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_WIND =
    // top bar + U-hook: top edge → outer arc (through east) → tail bottom →
    // tail end → tail top → inner arc (through west) → bar bottom → close
    flatPath(
        'M2.4 5.8H13.4A2.55 2.55 0 0 1 13.4 10.9H6.4V9.2H13.4A0.85 0.85 0 0 1 13.4 7.5H2.4z'
    ) +
    // middle bar, rounded right cap (1.1 gap below the hook tail)
    flatPath('M2.4 12H19.2a.85.85 0 0 1 0 1.7H2.4z') +
    // bottom bar, shorter, rounded right cap
    flatPath('M2.4 16.4h12.6a.85.85 0 0 1 0 1.7H2.4z');

// String layer: registers 'wind' in the shared registry + bound factory
export const svgWind: SvgIconFactory = createSvgIcon('wind', ICON_WIND);

// React layer: same geometry through the shared flat shell
export const WindIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'wind', content: ICON_WIND, ...props });
