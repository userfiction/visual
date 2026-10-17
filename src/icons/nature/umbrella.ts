/**
 * umbrella — SKY icon: open umbrella (scalloped canopy + shaft + J-hook).
 *
 * GEOMETRY: canopy = ONE outline — top half-disc r 9.8 centered (12,13.4)
 * (arc sweep-1 through the TOP, tips at y 3.6), bottom edge traced back as
 * THREE downward scallop semicircles (r 3.27, chord 6.53 — sweep-1 bulges
 * down, giving the classic wavy edge with point joins); shaft = bar
 * x 11.3..12.7 from y 4.2 (tucked into the canopy) to y 19.4; handle =
 * J-hook annular band (outer r 3.3, inner r 1.6 around (9.4,19.4)),
 * left tip cut square (1.7 tall) opening up-left.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_UMBRELLA =
    // canopy: top dome + three bottom scallops, single clockwise outline
    flatPath(
        'M2.2 13.4a9.8 9.8 0 0 1 19.6 0a3.27 3.27 0 0 1 -6.53 0' +
            'a3.27 3.27 0 0 1 -6.53 0a3.27 3.27 0 0 1 -6.53 0z'
    ) +
    // shaft + J-hook handle (outer r 3.3, inner r 1.6, square left tip)
    flatPath(
        'M11.3 4.2h1.4v15.2h-1.4z ' +
            'M12.7 19.4a3.3 3.3 0 0 1 -6.6 0V17.7h1.7v1.7a1.6 1.6 0 0 0 3.2 0z'
    );

// String layer: registers 'umbrella' in the shared registry + bound factory
export const svgUmbrella: SvgIconFactory = createSvgIcon('umbrella', ICON_UMBRELLA);

// React layer: same geometry through the shared flat shell
export const UmbrellaIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'umbrella', content: ICON_UMBRELLA, ...props });
