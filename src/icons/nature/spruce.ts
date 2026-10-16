/**
 * spruce — NATURE icon: spruce tree (upturned branch tips, five slim
 * tiers).
 *
 * GEOMETRY: five slim triangle tiers (tips y 1→17, bases 4.4/6/7.6/9.2/
 * 10.8 wide) overlap; each tier's bottom edge carries a slight upturn —
 * drawn as thin COUNTERCLOCKWISE notch holes under the tier tips (the
 * spruce's upturned branch look); trunk = rect x 11.2..12.8 spanning
 * y 20.6..21.8; ground = rect x 7.6..16.4 spanning y 21.8..22.6.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SPRUCE = flatPath(
    'M12 1L14.2 4.4h-4.4zM12 3.6L15 8h-6zM12 6.6L15.8 11.6h-7.6zM12 10L16.6 15.2h-9.2zM12 13.6L17.4 19.4H6.6z' +
        // upturned-branch notch holes (thin wedges under the tier tips)
        'M9.8 5.4l2.2-1 2.2 1-2.2.4z' +
        'M9 9.6l3-1.4 3 1.4-3 .5z' +
        'M8.6 13.6l3.4-1.6 3.4 1.6-3.4.6z' +
        // trunk + ground
        'M11.2 20.6h1.6v1.2h-1.6z' +
        'M7.6 21.8h8.8v.8h-8.8z'
);

// String layer: registers 'spruce' in the shared registry + bound factory
export const svgSpruce: SvgIconFactory = createSvgIcon('spruce', ICON_SPRUCE);

// React layer: same geometry through the shared flat shell
export const SpruceIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'spruce', content: ICON_SPRUCE, ...props });
