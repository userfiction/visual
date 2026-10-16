/**
 * peacock — ANIMALS icon: peacock with the signature FEATHER FAN (arc of
 * train feathers with eyespots), teardrop body, crest and legs.
 *
 * GEOMETRY: fan = one big sector path — apex at (12,15.6), radii lines to
 * (3.2,10) and (20.8,10), arc r 9.6 sweeping over the top (apex ~4.2) —
 * drawn with fill-rule="evenodd" (the VISUAL-TESTS-12 fruit convention:
 * holes are cut EXPLICITLY by evenodd rather than load-bearing winding);
 * inside it FIVE round eyespot holes and a clear circular space around
 * the head (otherwise the same-color fan hides the head/eyes); body = ellipse rx 2.5 ry 4 at
 * (12,16.2) drawn CLOCKWISE as a SEPARATE path element (a separate <path>
 * unions with the fan — inside one evenodd path an overlap would XOR
 * transparent, the blueberry disjointness lesson); head = circle r 1.5 at
 * (12,10.4) with eye holes r 0.45; crest = two thin solid stems + three
 * solid dot <circle> elements above the head; legs + feet below the body.
 * Machinery cross-reference: flatPath/createSvgIcon (../svg-icon.ts),
 * IconBase (../react.tsx) — the evenodd template mirrors
 * fruits/apple.ts's literal body path.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const FLAT = 'fill="currentColor" stroke="none"';

// Fan + eyespots + head clearance — disjoint holes stay strictly inside.
const FAN =
    '<path d="M12 15.6L3.2 10A9.6 9.6 0 0 1 20.8 10z' +
    'M5 9.4a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
    'M7.5 6.8a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
    'M11 5.8a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
    'M14.5 6.8a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
    'M17 9.4a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
    'M9.8 10.4a2.2 2.2 0 1 1 4.4 0a2.2 2.2 0 1 1 -4.4 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>';

export const ICON_PEACOCK =
    FAN +
    flatPath(
        // body teardrop ellipse, clockwise (separate path: unions with the fan)
        'M9.5 16.2a2.5 4 0 1 1 5 0a2.5 4 0 1 1 -5 0z' +
            // head circle, clockwise (clears the top eyespot hole)
            'M10.5 10.4a1.5 1.5 0 1 1 3 0a1.5 1.5 0 1 1 -3 0z' +
            // eye holes, counterclockwise (inside head only)
            'M10.95 10.2a0.45 0.45 0 1 0 0.9 0a0.45 0.45 0 1 0 -0.9 0z' +
            'M12.15 10.2a0.45 0.45 0 1 0 0.9 0a0.45 0.45 0 1 0 -0.9 0z' +
            // crest stems (thin solid wedges rising from the head top)
            'M11.4 9.4L10.8 7 11.5 6.8 12 9.2z' +
            'M12.6 9.4L13.2 7 12.5 6.8 12 9.2z' +
            // legs + feet (solid thin rects below the body)
            'M10.9 19.8h0.8v1.8h-0.8zM12.3 19.8h0.8v1.8h-0.8z' +
            'M10.4 21.6h1.7v0.6h-1.7zM12.1 21.6h1.7v0.6h-1.7z'
    ) +
    // crest dots: solid circles at the stem tips
    `<circle cx="10.55" cy="6.6" r="0.55" ${FLAT}/>` +
    `<circle cx="12" cy="6" r="0.55" ${FLAT}/>` +
    `<circle cx="13.45" cy="6.6" r="0.55" ${FLAT}/>`;

// String layer: registers 'peacock' in the shared registry + bound factory
export const svgPeacock: SvgIconFactory = createSvgIcon('peacock', ICON_PEACOCK);

// React layer: same geometry through the shared flat shell
export const PeacockIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'peacock', content: ICON_PEACOCK, ...props });
