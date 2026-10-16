/**
 * cat — ANIMALS icon: cat face with integrated triangular ears, inner-ear
 * holes, round eyes, apex-down nose, ω mouth and solid whisker bars.
 *
 * ANATOMY: the head + ears are ONE silhouette (no seams at the ear roots —
 * a separate-triangle union would leave visual notches at 24px): wide
 * trapezoid head with bulged sides (cheek width 3.6..20.6 — near the full
 * 2..22 canvas), two triangular ears rising from the forehead, round eyes
 * (holes), apex-down triangle nose (hole) and an ω mouth (two semicircle
 * slots) under it; three whisker bars per side overlap the cheek edges.
 *
 * GEOMETRY vs svg-icon/IconBase (../svg-icon.ts, ../react.tsx): the silhouette
 * + holes ride ONE <path> element with explicit fill-rule="evenodd" — hole
 * subpaths inside it are transparent regardless of winding (robust under
 * nonzero on every renderer); the solid whiskers are a SECOND <path> element
 * (cross-element overlap = union). The string layer wraps each path with
 * flatPath's fill="currentColor" stroke="none" pair; IconBase injects the
 * same markup via dangerouslySetInnerHTML inside its 24×24 shell.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Head + ears silhouette (depth 1) with inner-ear / eye / nose / mouth holes
// (depth 2 = transparent) — evenodd makes the winding irrelevant.
const CAT_BODY =
    // silhouette: left ear tip → inner edges → right ear → sides → chin
    'M5 2.4' +
    'L8.6 8.2' + // left ear inner edge down to the forehead
    'Q12 7.2 15.4 8.2' + // forehead dip between the ears
    'L19 2.4' + // right ear inner edge up to the tip
    'Q21.1 3.6 20.6 9.4' + // right ear outer edge, bulging right
    'Q21 13 20.2 15.2' + // right cheek
    'Q19.4 20.6 12 20.6' + // rounded chin
    'Q4.6 20.6 3.8 15.2' + // left cheek
    'Q3 13 3.6 9.4' + // left side up
    'Q3.1 4.4 5 2.4' + // left ear outer edge, bulging left
    'z' +
    // inner-ear holes (small triangles hugging the ear tips)
    'M5.5 4.2L7.2 7.2 5.6 7.6z' +
    'M18.5 4.2L16.8 7.2 18.4 7.6z' +
    // eye holes (round)
    'M7.15 13.2a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z' +
    'M14.55 13.2a1.15 1.15 0 1 0 2.3 0a1.15 1.15 0 1 0 -2.3 0z' +
    // nose hole (apex down)
    'M11 15.4L13 15.4 12 16.9z' +
    // ω mouth hole: two semicircles bulging down from a straight top
    'M10.4 17.2A0.8 0.8 0 0 1 12 17.2A0.8 0.8 0 0 1 13.6 17.2z';

// Whiskers: three thin bars per side overlapping the cheek edges (solid).
const CAT_WHISKERS =
    'M1.4 12.4h3.2v0.6h-3.2z' +
    'M1.2 14.3h3.4v0.6h-3.4z' +
    'M1.6 16.2h3v0.6h-3z' +
    'M19.4 12.4h3.2v0.6h-3.2z' +
    'M19.4 14.3h3.4v0.6h-3.4z' +
    'M19.4 16.2h3v0.6h-3z';

export const ICON_CAT =
    `<path d="${CAT_BODY}" ${EVENODD}/>` + flatPath(CAT_WHISKERS);

// String layer: registers 'cat' in the shared registry + bound factory
export const svgCat: SvgIconFactory = createSvgIcon('cat', ICON_CAT);

// React layer: same geometry through the shared flat shell
export const CatIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'cat', content: ICON_CAT, ...props });
