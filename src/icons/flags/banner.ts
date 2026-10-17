/**
 * banner — FLAGS icon: hanging banner under a horizontal rail (uplifted
 * geometry).
 *
 * GEOMETRY: rail rect x 3..21 spanning y 1..3; banner body x 4..20
 * spanning y 4..20 with a swallowtail bottom — the closing edges cut a V
 * notch whose apex points UP into the banner at (12,15), leaving two
 * 5-unit bottom tails. Uplift vs the old 14×14 body under a y 2..4 rail:
 * the body now spans 16×16 with a deeper rail, so the hanging drape reads
 * at 16px. Registered as 'banner' (see ceremonial-banner.ts for the
 * vertical-hanging sibling).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_BANNER = flatPath('M3 1h18v2H3zM4 4h16v16l-8-5-8 5z');

// String layer: registers 'banner' in the shared registry + bound factory
export const svgBanner: SvgIconFactory = createSvgIcon('banner', ICON_BANNER);

// React layer: same geometry through the shared flat shell
export const BannerIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'banner', content: ICON_BANNER, ...props });
