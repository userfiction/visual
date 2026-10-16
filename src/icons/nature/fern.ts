/**
 * fern — NATURE icon: fern (central stem + four pairs of upward leaflets
 * + fiddlehead curl).
 *
 * GEOMETRY: stem = rect x 11.4..12.6 spanning y 7..21.4; fiddlehead = the
 * curled young tip riding the stem top — a constant-thickness SPIRAL BAND
 * centered ON the stem (cx 12, cy 5.9): the outline starts on the stem's
 * left edge (11.4,5.9), sweeps the outer edge counterclockwise (radius
 * 2.4 → 1.5 over ~306°), caps across the tip and walks the inner edge
 * (1.2 → 0.45) back to the stem — the mouth between the spiral tip and
 * the stem's left edge reads as the unfurling opening; leaflets = four
 * pairs of thin triangles rising diagonally from the stem.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Fiddlehead spiral band literals (computed once at authoring time from
// Temp/visual/fern-debug10.ts — polyline spiral, no SVG arc ambiguity)
const FIDDLEHEAD =
    'M11.4 5.9L12.00 3.50L11.58 3.57L11.18 3.71L10.82 3.91L10.51 4.17L10.25 4.48L10.05 4.83L9.92 5.20L9.86 5.58L9.87 5.97L9.95 6.34L10.08 6.68L10.28 6.99L10.52 7.26L10.80 7.48L11.11 7.64L11.45 7.74L11.78 7.78L12.12 7.76L12.44 7.68L12.73 7.54L12.99 7.36L13.22 7.14L13.39 6.89L13.52 6.62L13.59 6.33L13.61 6.04L13.58 5.75L13.50 5.48L13.38 5.23L13.21 5.02L12.36 5.64L12.43 5.69L12.48 5.77L12.52 5.85L12.55 5.95L12.56 6.05L12.54 6.16L12.51 6.26L12.45 6.36L12.38 6.46L12.28 6.54L12.17 6.60L12.05 6.65L11.91 6.67L11.77 6.67L11.63 6.64L11.49 6.58L11.36 6.49L11.24 6.38L11.14 6.25L11.07 6.10L11.03 5.93L11.01 5.75L11.03 5.57L11.08 5.39L11.16 5.22L11.28 5.07L11.43 4.93L11.60 4.82L11.79 4.74L12.00 4.70L11.4 5.9z';

export const ICON_FERN = flatPath(
    // fiddlehead spiral band (its own subpath, overlapping the stem top)
    FIDDLEHEAD +
        // stem
        'M11.4 7h1.2v14.4h-1.2z' +
        // leaflets: four pairs of thin triangles rising from the stem
        'M11.4 9.4L6.6 12.5l4.8-.6z' +
        'M12.6 9.4l4.8 3.1-4.8-.6z' +
        'M11.4 13L5.8 17l5.6-.8z' +
        'M12.6 13l5.6 4-5.6-.8z' +
        'M11.4 16.6L6 20.6l5.4-1z' +
        'M12.6 16.6l5.4 4-5.4-1z' +
        'M11.4 19.8l-3.4 2.9 3.4-1.2z' +
        'M12.6 19.8l3.4 2.9-3.4-1.2z'
);

// String layer: registers 'fern' in the shared registry + bound factory
export const svgFern: SvgIconFactory = createSvgIcon('fern', ICON_FERN);

// React layer: same geometry through the shared flat shell
export const FernIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'fern', content: ICON_FERN, ...props });
