/**
 * ceremonialBanner — FLAGS icon: vertical hanging banner with finials
 * and a diamond emblem.
 *
 * GEOMETRY (TWO elements — the finial balls overlap the crossbar's end
 * tips, so they must be a separate paint-over flatPath: inside one
 * evenodd element that overlap would XOR transparent, the crown-orb
 * precedent from fantasy/crown.ts):
 *   1. BODY evenodd path: crossbar rect x 4..20 spanning y 2..3.5;
 *      banner cloth x 6..18 spanning y 3.5..14.5 whose bottom comes to a
 *      downward point (l-6 4 from (18,14.5) to apex (12,18.5), l-6-4
 *      home); diamond emblem hole centered (12,9.5) — points (12,7)
 *      (14.5,9.5) (12,12) (9.5,9.5).
 *   2. FINIALS flatPath: r-1.2 balls at (3.5,2.75) and (20.5,2.75)
 *      riding the crossbar ends.
 * Registered as 'ceremonialBanner'.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// 1. crossbar + pointed-bottom cloth with the diamond emblem hole…
export const ICON_CEREMONIAL_BANNER =
    `<path d="M4 2h16v1.5H4zM6 3.5h12v11l-6 4-6-4zM12 7l2.5 2.5L12 12l-2.5-2.5z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // …then the two finial balls as their own paint-over flat path.
    flatPath(
        'M2.3 2.75a1.2 1.2 0 1 1 2.4 0a1.2 1.2 0 1 1-2.4 0zM19.3 2.75a1.2 1.2 0 1 1 2.4 0a1.2 1.2 0 1 1-2.4 0z'
    );

// String layer: registers 'ceremonialBanner' in the shared registry + bound factory
export const svgCeremonialBanner: SvgIconFactory = createSvgIcon(
    'ceremonialBanner',
    ICON_CEREMONIAL_BANNER
);

// React layer: same geometry through the shared flat shell
export const CeremonialBannerIcon = (props: IconProps) =>
    React.createElement(IconBase, {
        name: 'ceremonialBanner',
        content: ICON_CEREMONIAL_BANNER,
        ...props,
    });
