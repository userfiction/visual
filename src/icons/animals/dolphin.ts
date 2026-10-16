/**
 * dolphin — ANIMALS icon: dolphin facing left with the distinct beak-like
 * ROSTRUM, back-swept dorsal fin, tail flukes, flipper, eye and smile.
 *
 * GEOMETRY: body = one path — rostrum tip at (2.4,14.6), the beak's upper
 * edge rising through the crease notch (4.6,12.6), the melon bulging over
 * the arched back to the tail (20.8,12.4), the belly curving back and the
 * lower jaw closing at the tip — drawn CLOCKWISE; dorsal fin = solid
 * Q-curved wedge swept BACK over the back's top edge (base riding the back,
 * tip at (16.8,3.6)); flukes = solid notched double triangle overlapping
 * the tail end; flipper = solid triangle under the belly; eye hole r 0.6,
 * the smile-line rect hole and body drawn with ccw holes cut COUNTERCLOCKWISE
 * inside the body only. Machinery cross-reference: flatPath
 * (../svg-icon.ts) + IconBase (../react.tsx), same contract as
 * animals/whale.ts.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_DOLPHIN = flatPath(
    // dorsal fin (solid back-swept wedge overlapping the back)
    'M13.4 7.6Q14.6 4.6 16.8 3.6Q17 6.4 15.8 8.4z' +
        // body + rostrum, clockwise outline
        'M2.4 14.6Q2.8 13.4 4.2 12.8L4.6 12.6Q5 11.6 6.2 10.8Q10.6 8.8 14.6 7.2Q18.6 8.6 20.8 12.4L20.8 12.6Q18.2 13.2 15.4 12.8Q11 12.8 7 13.8Q4.8 14.4 4 15.2Q3 15.2 2.4 14.6z' +
        // flukes (solid notched double triangle, overlaps the tail end)
        'M20.6 12L22.6 9.4 21.8 12.6 22.8 15.6 20.4 13.2z' +
        // flipper (solid triangle under the belly)
        'M10.6 12.6L12.6 15.8 13.4 12.9z' +
        // eye hole, counterclockwise (at the beak crease)
        'M4.6 12.2a0.6 0.6 0 1 0 1.2 0a0.6 0.6 0 1 0 -1.2 0z' +
        // smile line hole (v-first rect, counterclockwise)
        'M3.1 13.9v0.6h2.6v-0.6z'
);

// String layer: registers 'dolphin' in the shared registry + bound factory
export const svgDolphin: SvgIconFactory = createSvgIcon('dolphin', ICON_DOLPHIN);

// React layer: same geometry through the shared flat shell
export const DolphinIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'dolphin', content: ICON_DOLPHIN, ...props });
