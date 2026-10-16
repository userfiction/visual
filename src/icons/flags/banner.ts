/**
 * banner — FLAGS icon: hanging banner under a horizontal rail.
 *
 * GEOMETRY: rail rect x 4..20 spanning y 2..4; banner body x 5..19 spanning
 * y 5..19 with a swallowtail bottom — the closing edges cut a V notch whose
 * apex points UP into the banner at (12,15).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_BANNER = flatPath('M4 2h16v2H4zM5 5h14v14l-7-4-7 4z');

// String layer: registers 'banner' in the shared registry + bound factory
export const svgBanner: SvgIconFactory = createSvgIcon('banner', ICON_BANNER);

// React layer: same geometry through the shared flat shell
export const BannerIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'banner', content: ICON_BANNER, ...props });
