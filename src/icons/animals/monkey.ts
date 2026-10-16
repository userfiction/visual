/**
 * monkey — ANIMALS icon: monkey face with round side ears and a big
 * light "face window" whose interior carries solid eyes, nostrils and a
 * smile bar (the penguin beak re-fill trick, see penguin.ts).
 *
 * GEOMETRY: head = circle r 6.6 at (12,12.4) CLOCKWISE; ears = two solid
 * circles r 2.4 at (4.4,10.4)/(19.6,10.4) overlapping the head edge, each
 * with a concentric COUNTERCLOCKWISE inner-ear hole r 0.95 kept clear of
 * the head circle (center distance 7.86 > 6.6 + 0.95 + margin); face
 * window = COUNTERCLOCKWISE hole ellipse r 3.9/4.6 at (12,13.6) leaving a
 * dark rim; INSIDE the window the features are re-filled as SOLID
 * (clockwise) shapes: eye dots r 0.85, nostril dots r 0.45 and a thin
 * smile rect (h-first). Machinery: flatPath/createSvgIcon
 * (../svg-icon.ts), IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_MONKEY = flatPath(
    // head circle, clockwise
    'M5.4 12.4a6.6 6.6 0 1 1 13.2 0a6.6 6.6 0 1 1 -13.2 0z' +
        // ears: solid circles + concentric inner-ear holes (sweep-0)
        'M2 10.4a2.4 2.4 0 1 1 4.8 0a2.4 2.4 0 1 1 -4.8 0z' +
        'M3.45 10.4a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z' +
        'M17.2 10.4a2.4 2.4 0 1 1 4.8 0a2.4 2.4 0 1 1 -4.8 0z' +
        'M18.65 10.4a0.95 0.95 0 1 0 1.9 0a0.95 0.95 0 1 0 -1.9 0z' +
        // face window hole, counterclockwise
        'M8.1 13.6a3.9 4.6 0 1 0 7.8 0a3.9 4.6 0 1 0 -7.8 0z' +
        // eyes re-filled solid (clockwise) inside the window
        'M9.35 11.8a0.85 0.85 0 1 1 1.7 0a0.85 0.85 0 1 1 -1.7 0z' +
        'M12.95 11.8a0.85 0.85 0 1 1 1.7 0a0.85 0.85 0 1 1 -1.7 0z' +
        // nostril dots re-filled solid
        'M10.45 14.6a0.45 0.45 0 1 1 0.9 0a0.45 0.45 0 1 1 -0.9 0z' +
        'M12.65 14.6a0.45 0.45 0 1 1 0.9 0a0.45 0.45 0 1 1 -0.9 0z' +
        // smile bar re-filled solid (h-first rect)
        'M10.6 16.4h2.8v0.5h-2.8z'
);

// String layer: registers 'monkey' in the shared registry + bound factory
export const svgMonkey: SvgIconFactory = createSvgIcon('monkey', ICON_MONKEY);

// React layer: same geometry through the shared flat shell
export const MonkeyIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'monkey', content: ICON_MONKEY, ...props });
