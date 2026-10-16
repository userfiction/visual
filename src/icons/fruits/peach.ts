import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// A cleft at the shoulders, full cheeks and pointed bottom define the peach.
// Evenodd ensures the long curved suture is visible instead of filling in.
export const ICON_PEACH =
    `<path d="M12 7.5C8 5.2 3.2 7.6 3 12.7 2.8 17.5 7.1 20.7 12 22.3 16.9 20.7 21.2 17.5 21 12.7 20.8 7.6 16 5.2 12 7.5zM12.8 8.8C16.1 11.1 16.5 16.4 12.5 20L11.7 19.1C15 15.8 14.8 11.7 12.1 9.8z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // One long lanceolate leaf is characteristic of stone-fruit foliage.
    flatPath('M11.4 7.8V3.7h1.3v4.1zM13.4 5.5C14.4 2.1 18.2 1.1 21.7 1.8 20.1 4.8 17 6.4 13.4 5.5z');

// Preserve both rendering entry points without changing their props.
export const svgPeach: SvgIconFactory = createSvgIcon('peach', ICON_PEACH);
export const PeachIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'peach', content: ICON_PEACH, ...props });
