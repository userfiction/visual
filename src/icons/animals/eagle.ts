/**
 * eagle — ANIMALS icon: eagle head and neck in profile facing right, with
 * the signature HOOKED beak, brow ridge, eye and nostril.
 *
 * GEOMETRY: head/neck = one path — flat crown from (4.6,5.8), forehead
 * rising to the beak base (13.2,6.6), upper beak bulging right (cere bump)
 * then HOOKING down to the tip (19.8,13.2), lower beak edge running back
 * up-left to the jaw corner (16.2,12.4), throat curving down to the neck
 * base (13.4,21)-(7.4,21) and the back of the neck rising to the crown —
 * drawn CLOCKWISE; eye hole has a sharp slanted brow edge rather than a
 * round surprised expression; eye and the beak nostril hole r 0.45
 * (inside the upper-beak band only) cut
 * COUNTERCLOCKWISE. Machinery cross-reference: flatPath/IconBase per
 * animals/cat.ts; profile pattern follows animals/horse.ts (one head/neck
 * silhouette + solid overlays + ccw holes).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_EAGLE = flatPath(
    // Head, hooked beak and neck share one contour; no overlapping brow
    // triangle can accidentally refill the eye cutout.
    'M4.6 5.8Q5.6 5 8.4 5.4L13.2 6.6Q16.6 6.8 18.6 8.6Q20.2 9.6 19.8 10.6Q21.4 11.4 20 13.2L19.6 13.4L17.4 12.2L16.2 12.4Q13 13.2 12 14.8L13.4 21L7.4 21L6.4 13.4Q4.4 12 4.2 9.4Q4 6.6 4.6 5.8z' +
        // Reverse-wound wedge: brow slants down toward the beak.
        'M9.4 8.3Q10.2 10.7 12.2 9.2L12.4 8.8z' +
        // nostril hole, counterclockwise (inside the upper-beak band)
        'M17.75 9.6a0.45 0.45 0 1 0 0.9 0a0.45 0.45 0 1 0 -0.9 0z'
);

// String layer: registers 'eagle' in the shared registry + bound factory
export const svgEagle: SvgIconFactory = createSvgIcon('eagle', ICON_EAGLE);

// React layer: same geometry through the shared flat shell
export const EagleIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'eagle', content: ICON_EAGLE, ...props });
