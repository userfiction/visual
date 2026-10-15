/**
 * shield — FANTASY icon: heater shield.
 *
 * GEOMETRY: solid heater silhouette — flat top corners at (20,5)/(4,5)
 * via the 3-unit diagonal shoulders from the apex (12,2), straight sides
 * to y=11, then mirrored cubic curves down to the bottom point (12,22).
 * Solid fill (no charges — flat minimalism; a consumer can overlay).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SHIELD = flatPath('M12 2L20 5V11C20 16.25 16.6 19.6 12 22C7.4 19.6 4 16.25 4 11V5Z');

export const svgShield: SvgIconFactory = createSvgIcon('shield', ICON_SHIELD);

export const ShieldIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'shield', content: ICON_SHIELD, ...props });
