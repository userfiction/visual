/**
 * parrot — ANIMALS icon: parrot facing left with the big HOOKED bill, round
 * head, wing patch, long tail feathers and feet.
 *
 * GEOMETRY: one upright head/back/belly contour avoids the disconnected
 * circular head/body look; long tapered tail feathers descend to y22.
 * The massive hooked bill is separate from the face, so its inner notch
 * stays open. Eye and swept wing are same-path evenodd cutouts; the wing
 * is a curved feather slit rather than a generic circular belly patch.
 * Machinery: ../svg-icon.ts flatPath/createSvgIcon; ../react.tsx IconBase.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_PARROT =
    // Body/tail union and negative-space feather follow a perched macaw.
    '<path d="M8 4Q9 1.8 12 2Q16 2.3 16 6.5L17.4 13.5Q18 16 16 17.4L19.5 22L15.3 20L13 17.8Q8 18 7.5 13.5L8 8zM10.3 5.2a.85 .85 0 1 1 1.7 0a.85 .85 0 1 1 -1.7 0zM11 8Q16 9.2 15.8 14.8Q12 14.5 10.7 11L12.2 11.5Q13.3 13 14.5 13.3Q14.2 10.5 11 9.1z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    // Bill tip hooks below the upper mandible; feet grip a short perch.
    flatPath('M7.7 4.2Q3 4.3 3.7 8.7Q4.3 10.5 6 10.8L5.7 8L8.2 7.7zM9.5 17h1.2v2.3h1V17h1.2v3.4H8v-1.1h1.5zM5 20.7h10v1H5z');

// String layer: registers 'parrot' in the shared registry + bound factory
export const svgParrot: SvgIconFactory = createSvgIcon('parrot', ICON_PARROT);

// React layer: same geometry through the shared flat shell
export const ParrotIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'parrot', content: ICON_PARROT, ...props });
