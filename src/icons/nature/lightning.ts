/**
 * lightning — SKY icon: lightning bolt under a storm cloud cap (uplift:
 * fuller three-dome cap + wider bolt).
 *
 * GEOMETRY: cloud cap = base bar (x 6..18.8, y 7..9.8) + three dome
 * circles (r 2.6 at (8.6,7.2), r 3 at (12.6,5.6), r 2.4 at (16.4,7.4));
 * bolt = one solid zigzag polygon dropping from the cap (top edge
 * (14,9)→(17,9) tucked 0.8 into the bar, mid notches, sharp tip at
 * (9.4,21.8)), drawn as its own flatPath element after the cap.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_LIGHTNING =
    // storm cloud cap: bar + three dome circles
    flatPath('M6 7h12.8v2.8H6z') +
    '<circle cx="8.6" cy="7.2" r="2.6" fill="currentColor" stroke="none"/>' +
    '<circle cx="12.6" cy="5.6" r="3" fill="currentColor" stroke="none"/>' +
    '<circle cx="16.4" cy="7.4" r="2.4" fill="currentColor" stroke="none"/>' +
    // bolt: zigzag polygon (tip at 9.4,21.8)
    flatPath('M14 9L8.2 16.4 11.6 16.4 9.4 21.8 16.8 14.6 13.2 14.6 17 9z');

// String layer: registers 'lightning' in the shared registry + bound factory
export const svgLightning: SvgIconFactory = createSvgIcon('lightning', ICON_LIGHTNING);

// React layer: same geometry through the shared flat shell
export const LightningIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'lightning', content: ICON_LIGHTNING, ...props });
