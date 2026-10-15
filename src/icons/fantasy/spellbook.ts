/**
 * spellbook — FANTASY icon: spellbook (closed tome with a magic star).
 *
 * GEOMETRY: solid rounded tome (x 5..19, y 3..21) with a 4-point sparkle
 * cut out of the cover. WINDING IS LOAD-BEARING: the outer tome path is
 * traversed clockwise (positive shoelace) while the star subpath runs
 * counterclockwise (negative shoelace), so the default nonzero fill rule
 * cuts the hole — do not reverse either subpath (differentiates the
 * spellbook from the plain generic 'book' notch).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SPELLBOOK = flatPath(
    'M7 3H17A2 2 0 0 1 19 5V19A2 2 0 0 1 17 21H7A2 2 0 0 1 5 19V5A2 2 0 0 1 7 3ZM12 14.8L14.8 12L12 9.2L9.2 12Z'
);

export const svgSpellbook: SvgIconFactory = createSvgIcon('spellbook', ICON_SPELLBOOK);

export const SpellbookIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'spellbook', content: ICON_SPELLBOOK, ...props });
