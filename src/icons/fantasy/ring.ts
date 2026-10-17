import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Faceted gemstone sits above an open band; the cut-out facet remains
// visible with currentColor instead of relying on a secondary jewel color.
// Concentric circles center the band at (12,15), keeping its base at y=23
// inside the shared 24px viewBox (../svg-icon.ts DEFAULT_VIEW_BOX).
export const ICON_RING = '<path d="M8 1H16L19 5L12 10L5 5ZM8 4L12 7L10 4Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    '<path d="M20 15A8 8 0 1 1 4 15A8 8 0 1 1 20 15ZM17 15A5 5 0 1 1 7 15A5 5 0 1 1 17 15Z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';
export const svgRing: SvgIconFactory = createSvgIcon('ring', ICON_RING);
export const RingIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'ring', content: ICON_RING, ...props });
