/**
 * flagOnHill — FLAGS icon: flag planted on a hilltop.
 *
 * GEOMETRY: hill mound M2 21Q12 12 22 21z (quadratic whose apex sits at
 * (12,16.5), base spanning x 2..22 on y 21); pole rect x 11.4..12.6
 * spanning y 4..17.5 — sunk 1 unit past the hill apex so it reads as
 * planted; flag rect x 12.6..21.6 spanning y 4..10.5 hung right of the
 * pole. All three subpaths wind positive, so the pole/hill overlap paints
 * solid (nonzero fill — flatPath carries no fill-rule; see crossed-flags
 * note). Registered as 'flagOnHill'.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_FLAG_ON_HILL = flatPath(
    'M2 21Q12 12 22 21z' + // hill mound
        'M11.4 4h1.2v13.5h-1.2z' + // pole, planted into the apex
        'M12.6 4h9v6.5h-9z' // flag flying right of the pole
);

// String layer: registers 'flagOnHill' in the shared registry + bound factory
export const svgFlagOnHill: SvgIconFactory = createSvgIcon('flagOnHill', ICON_FLAG_ON_HILL);

// React layer: same geometry through the shared flat shell
export const FlagOnHillIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'flagOnHill', content: ICON_FLAG_ON_HILL, ...props });
