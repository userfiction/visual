/**
 * koala — ANIMALS icon: koala face — huge fluffy ears (big circles with
 * inner-ear holes) flanking a broad round head, two small eye holes and
 * the signature big central oval NOSE hole.
 *
 * GEOMETRY: head = circle r 6 at (12,13.6) CLOCKWISE; ears = two solid
 * circles r 3.5 at (5.5,8)/(18.5,8) overlapping the head edge, each with a
 * concentric inner-ear hole r 1.7; both rings share an evenodd path and
 * sit above the head's widest part so their openings stay clear; eye holes r 0.85 and
 * the big nose hole (ellipse r 2.2/3 at (12,14.8)) cut COUNTERCLOCKWISE
 * inside the head — the oversized central nose is the koala's defining
 * feature (contrasts with panda's paired patches). Machinery: flatPath/
 * createSvgIcon (../svg-icon.ts), IconBase (../react.tsx).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_KOALA =
    // Ear rings paint first; a larger head joins them without a Mickey-like
    // three-small-circles silhouette. Inner ear openings remain mostly clear.
    '<path d="M2 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 1 1 -7 0zM3.8 8a1.7 1.7 0 1 1 3.4 0a1.7 1.7 0 1 1 -3.4 0zM15 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 1 1 -7 0zM16.8 8a1.7 1.7 0 1 1 3.4 0a1.7 1.7 0 1 1 -3.4 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>' +
    flatPath(
        // Broad cheeks surround the large oval nose instead of forming a ring.
        'M6 13.6a6 6 0 1 1 12 0a6 6 0 1 1 -12 0z' +
            // Eye holes and the oversized nose cut through the same face path.
            'M7.75 12.2a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z' +
            'M14.55 12.2a0.85 0.85 0 1 0 1.7 0a0.85 0.85 0 1 0 -1.7 0z' +
            'M9.8 14.8a2.2 3 0 1 0 4.4 0a2.2 3 0 1 0 -4.4 0z'
    );

// String layer: registers 'koala' in the shared registry + bound factory
export const svgKoala: SvgIconFactory = createSvgIcon('koala', ICON_KOALA);

// React layer: same geometry through the shared flat shell
export const KoalaIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'koala', content: ICON_KOALA, ...props });
