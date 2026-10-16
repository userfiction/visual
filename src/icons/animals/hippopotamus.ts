/**
 * hippopotamus — ANIMALS icon: hippo in profile facing left — huge boxy
 * muzzle protruding low at the left, high-shouldered barrel body with two
 * chunky leg stubs, a small round ear on the crown, eye and two nostrils.
 *
 * GEOMETRY: body/head/muzzle = one clockwise path — muzzle top edge runs
 * right at y≈11.2, the head crown rises between muzzle and back (y≈7.6),
 * the back sweeps right to the rump (21.6,12..16.6), the bottom returns
 * left with two leg stubs (x 11.6..14.2 and 17.8..20.4, reaching y 20.8)
 * and closes with the muzzle's rounded front (x≈2.3); nostrils = two CCW
 * circle holes on the muzzle's top-left; eye hole r 0.65 COUNTERCLOCKWISE
 * below the crown edge; ear = solid Q-arched bump seated INSIDE the crown
 * edge with its tip above it (plain union). Machinery: flatPath/
 * createSvgIcon (../svg-icon.ts), IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_HIPPOPOTAMUS = flatPath(
    // body + head + muzzle + leg stubs, clockwise outline
    'M2.4 11.6L8 11.2Q9.6 11 10.6 9.8Q11.8 8.2 13.6 7.8Q17 7 19.8 8.2Q21.6 9.2 21.6 12L21.6 16.6Q21.6 18.4 20.6 18.4L20.4 20.8L17.8 20.8L17.8 18.6L14.4 18.4L14.2 20.8L11.6 20.8L11.6 18.4Q8.6 17.8 6 17.4L4 17.2Q2.4 17 2.4 15.4Q2.2 13.6 2.4 11.6z' +
        // ear (solid arched bump on the crown)
        'M12.2 8.4Q12 6.2 13.8 6Q15.2 6 15 8.2z' +
        // eye hole, counterclockwise
        'M10.75 10a0.65 0.65 0 1 0 1.3 0a0.65 0.65 0 1 0 -1.3 0z' +
        // nostril holes, counterclockwise
        'M2.85 12.6a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z' +
        'M4.85 12.4a0.55 0.55 0 1 0 1.1 0a0.55 0.55 0 1 0 -1.1 0z'
);

// String layer: registers 'hippopotamus' in the shared registry + bound factory
export const svgHippopotamus: SvgIconFactory = createSvgIcon('hippopotamus', ICON_HIPPOPOTAMUS);

// React layer: same geometry through the shared flat shell
export const HippopotamusIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'hippopotamus', content: ICON_HIPPOPOTAMUS, ...props });
