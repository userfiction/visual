/**
 * spellbook — FANTASY icon: spellbook (closed tome with a magic rune) —
 * redrawn (FANTASY-REDRAW).
 *
 * GEOMETRY: solid rounded tome (x 5..19, y 3..21, corner r 2) unchanged.
 *   - SPINE: a full-height transparent slot (x 7.1..7.9, y 3..21) cut
 *     through the cover splits the left 2.1-unit band off as the bound
 *     spine — the slot opens exactly at the top/bottom edges (both straight
 *     there, the r-2 corner arcs live outside x 7.1..7.9), so the tome reads
 *     as spine + cover board with a 0.8 gutter.
 *   - RUNE: the old straight-edged diamond star becomes a concave 4-point
 *     sparkle (arm 3.2 at (13.5,12), quadratic controls ±0.6 from the
 *     center — same construction as the redrawn wand sparkles), plus two
 *     small dot holes (r 0.7 at (17.1,8.6), r 0.6 at (10.2,16.4)) as the
 *     lesser magic motes.
 * WINDING NOTE: the first pass relied on opposite winding under nonzero;
 * the redraw cuts ALL holes explicitly with fill-rule="evenodd" (cross-ref:
 * the redraw convention in fruits/*.ts, animals/*.ts). Every hole nests
 * inside the tome subpath only — depth 2 — and the rune/dots stay ≥ 1.1
 * clear of the spine slot and of each other, so no same-element XOR seams.
 */
import React from 'react';
import { createSvgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Tome (1) + spine slot / rune / two mote dots as evenodd holes (2).
export const ICON_SPELLBOOK =
    `<path d="M7 3H17A2 2 0 0 1 19 5V19A2 2 0 0 1 17 21H7A2 2 0 0 1 5 19V5A2 2 0 0 1 7 3ZM7.1 3H7.9V21H7.1ZM13.5 8.8Q14.1 11.4 16.7 12Q14.1 12.6 13.5 15.2Q12.9 12.6 10.3 12Q12.9 11.4 13.5 8.8ZM16.4 8.6a0.7 0.7 0 1 0 1.4 0a0.7 0.7 0 1 0 -1.4 0zM9.6 16.4a0.6 0.6 0 1 0 1.2 0a0.6 0.6 0 1 0 -1.2 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>`;

export const svgSpellbook: SvgIconFactory = createSvgIcon('spellbook', ICON_SPELLBOOK);

export const SpellbookIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'spellbook', content: ICON_SPELLBOOK, ...props });
