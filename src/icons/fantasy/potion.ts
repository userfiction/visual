/**
 * potion — FANTASY icon: Erlenmeyer potion flask.
 *
 * GEOMETRY: rim bar (x 9..15, y 2..4) sits flush on the neck (x 10..14,
 * y 4..8.3); the body flares out symmetrically from the neck to the base
 * line y 18.6, closed by two outward-bulging sweep-0 corner arcs (r 2.2,
 * verified to round the bottom corners away from the interior). All
 * subpaths fill — liquid and glass are one solid silhouette (flat).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_POTION =
    flatPath('M9 2H15V4H9ZM10 4V8.3L4.6 18.6A2.2 2.2 0 0 0 6.6 21.7H17.4A2.2 2.2 0 0 0 19.4 18.6L14 8.3V4Z');

export const svgPotion: SvgIconFactory = createSvgIcon('potion', ICON_POTION);

export const PotionIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'potion', content: ICON_POTION, ...props });
