import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Separate finger plates and a hinged thumb lead into a flared cuff;
// the gaps communicate armor articulation without stroke-based outlines.
export const ICON_GAUNTLET = flatPath('M5 4L8 3V10H5ZM9 2H12V10H9ZM13 3H16V10H13ZM17 5H20V11H17ZM5 11H16V17L13 19H7L5 16ZM17 12L20 10L22 12L18 18L15 19V17ZM6 20H15L17 23H4Z');
export const svgGauntlet: SvgIconFactory = createSvgIcon('gauntlet', ICON_GAUNTLET);
export const GauntletIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'gauntlet', content: ICON_GAUNTLET, ...props });
