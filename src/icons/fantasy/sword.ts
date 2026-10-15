/**
 * sword — FANTASY icon: sword (blade tip up).
 *
 * GEOMETRY: solid blade tapering from the tip (12,1) to shoulders at
 * (9.5/14.5, 5), running down to the cross-guard; guard bar y 15..17.5
 * (x 6..18), grip x 11..13 down to y 21, pommel = separate circle element
 * (cx 12, cy 22, r 1.5) overlapping the grip's end. All subpaths wind the
 * same direction — no holes.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_SWORD = flatPath('M12 1L14.5 5V15H9.5V5ZM6 15H18V17.5H6ZM11 17.5H13V21H11Z') +
    '<circle cx="12" cy="22" r="1.5" fill="currentColor" stroke="none"/>';

export const svgSword: SvgIconFactory = createSvgIcon('sword', ICON_SWORD);

export const SwordIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'sword', content: ICON_SWORD, ...props });
