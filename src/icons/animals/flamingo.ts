/**
 * flamingo — ANIMALS icon: flamingo with the S-curved neck, down-curved
 * bill, wing patch and the signature legs — one straight, one BENT.
 *
 * GEOMETRY: body = ellipse rx 4.8 ry 3.6 at (9.6,10.4) drawn CLOCKWISE
 * (sweep-1 arcs); tail = small solid triangle up-left; neck = a 1.2-thick
 * Q-curved ribbon rising from the body's front edge to the head (its two
 * edge curves are written as separate Q commands so the band keeps an even
 * thickness); head = circle r 1.8 at (17.6,4.2) overlapping the neck's top;
 * bill = solid path hooking DOWN from the head's right (the flamingo's
 * bent filter bill); wing ellipse hole rx 2.2 ry 1.6 and eye hole r 0.5
 * cut COUNTERCLOCKWISE inside their own containing shape only; standing
 * leg = thin rect with a webbed foot bar; bent leg = one zigzag polygon —
 * thigh down-forward to the knee (14.2,16), shank folding back up to the
 * raised foot tip (17,14.7). Machinery cross-reference: flatPath
 * (../svg-icon.ts) + IconBase (../react.tsx), same contract as
 * animals/duck.ts.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_FLAMINGO = flatPath(
    // tail (solid triangle up-left of the body)
    'M5.2 8.6L2.6 6.8 6.4 7.8z' +
        // body ellipse, clockwise
        'M4.8 10.4a4.8 3.6 0 1 1 9.6 0a4.8 3.6 0 1 1 -9.6 0z' +
        // neck ribbon (S-curve band rising to the head)
        'M12.6 8.8Q16 7.8 16.4 3.8L17.6 3.9Q17.4 8.6 13.8 10.2z' +
        // head circle, clockwise (overlaps the neck's top)
        'M15.8 4.2a1.8 1.8 0 1 1 3.6 0a1.8 1.8 0 1 1 -3.6 0z' +
        // down-curved bill (solid, overlaps the head's right)
        'M18.8 3.4Q21.2 3.6 21.2 5.2Q21 6.8 19.4 7Q19.6 5.6 18.6 4.8z' +
        // eye hole, counterclockwise (inside head only)
        'M16.7 3.8a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z' +
        // wing hole, counterclockwise (inside body only)
        'M6.8 10.2a2.2 1.6 0 1 0 4.4 0a2.2 1.6 0 1 0 -4.4 0z' +
        // standing leg + webbed foot (thin rect + foot bar)
        'M8 13.4h1v7.4h-1zM7.4 20.8h3v0.8h-3z' +
        // bent leg: thigh down to the knee, shank folding back up
        'M11.2 12.8L12.7 13.6 14.2 16 15.9 13.9 17 14.7 15.1 17.3 13.6 17.1z'
);

// String layer: registers 'flamingo' in the shared registry + bound factory
export const svgFlamingo: SvgIconFactory = createSvgIcon('flamingo', ICON_FLAMINGO);

// React layer: same geometry through the shared flat shell
export const FlamingoIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'flamingo', content: ICON_FLAMINGO, ...props });
