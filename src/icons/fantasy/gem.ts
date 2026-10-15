/**
 * gem — FANTASY icon: faceted gem / diamond.
 *
 * GEOMETRY: solid brilliant silhouette — table edge (6,5)..(18,5), girdle
 * points at (3,10)/(21,10), culet at (12,21). Flat solid fill (no facet
 * cuts — reads as a cut stone at 16px without inner noise).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_GEM = flatPath('M12 21L3 10L6 5H18L21 10Z');

export const svgGem: SvgIconFactory = createSvgIcon('gem', ICON_GEM);

export const GemIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'gem', content: ICON_GEM, ...props });
