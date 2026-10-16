/**
 * shark — ANIMALS icon: shark facing left with the tall dorsal fin, notched
 * caudal (tail) fin, pectoral fin, gill slits, eye and mouth line.
 *
 * GEOMETRY: body = one path — pointed nose at (2.4,12.2), back rising over
 * the hump (9.4,9.4), tapering to the tail base (18.4,11.6), the tail's
 * notched double-lobe silhouette (upper lobe to (21.6,8.4), notch in at
 * (19.2,13), lower lobe to (21.2,16.6)) and the gently curved belly back to
 * the nose — drawn CLOCKWISE; dorsal fin = solid triangle overlapping the
 * hump's top edge; pectoral fin = solid triangle hanging below the belly;
 * eye hole r 0.7, three v-first gill-slit bar holes and the v-first
 * mouth-line hole cut COUNTERCLOCKWISE inside the body only. Machinery
 * cross-reference: flatPath (../svg-icon.ts) + IconBase (../react.tsx),
 * same contract as animals/whale.ts (dome body + solid fins + ccw holes).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SHARK = flatPath(
    // dorsal fin (solid triangle overlapping the hump's top edge)
    'M9.8 9.5L12.6 5.4 14.6 9.6z' +
        // body + notched tail, clockwise outline
        'M2.4 12.2Q4.6 9.8 9.4 9.4Q14 9.6 18.4 11.6L21.6 8.4Q21.4 12 19.2 13L21.2 16.6Q18.8 15.4 18.4 14.4Q14 15.2 8.6 15Q4.4 14.6 2.6 14.6Q2.2 13.4 2.4 12.2z' +
        // pectoral fin (solid triangle below the belly)
        'M8.6 14.7L11 18.6 12.8 14.9z' +
        // eye hole, counterclockwise (near the snout)
        'M4.7 11.4a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0z' +
        // gill slits (three v-first bar holes, counterclockwise)
        'M8.2 11.4v2.4h0.7v-2.4zM9.9 11.6v2.4h0.7v-2.4zM11.6 11.8v2.4h0.7v-2.4z' +
        // mouth line hole (v-first rect, counterclockwise)
        'M3 13.6v0.7h4.2v-0.7z'
);

// String layer: registers 'shark' in the shared registry + bound factory
export const svgShark: SvgIconFactory = createSvgIcon('shark', ICON_SHARK);

// React layer: same geometry through the shared flat shell
export const SharkIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'shark', content: ICON_SHARK, ...props });
