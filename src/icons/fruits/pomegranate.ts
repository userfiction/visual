import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Wide angular calyx and a rounded, slightly squared body identify the fruit.
// The exposed arils are larger teardrops rather than face-like round dots.
export const ICON_POMEGRANATE =
    `<path d="M12 6.9C7 5.7 3 9.3 3 14.2 3 19.5 6.4 22.4 12 22.4S21 19.5 21 14.2C21 9.3 17 5.7 12 6.9zM8 10.4Q5.9 11.9 8 13.1 10.1 11.9 8 10.4zM12 9.8Q9.9 11.3 12 12.5 14.1 11.3 12 9.8zM16 10.4Q13.9 11.9 16 13.1 18.1 11.9 16 10.4zM8 14.4Q5.9 15.9 8 17.1 10.1 15.9 8 14.4zM12 13.8Q9.9 15.3 12 16.5 14.1 15.3 12 13.8zM16 14.4Q13.9 15.9 16 17.1 18.1 15.9 16 14.4zM10 18Q8.1 19.4 10 20.5 11.9 19.4 10 18zM14 18Q12.1 19.4 14 20.5 15.9 19.4 14 18z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // Crown base overlaps the body, while its deep notches remain visible.
    flatPath('M9 7.7L7.7 2.8 10.6 4.5 12 1.4 13.4 4.5 16.3 2.8 15 7.7z');

// Registry identity and component API are intentionally unchanged.
export const svgPomegranate: SvgIconFactory = createSvgIcon('pomegranate', ICON_POMEGRANATE);
export const PomegranateIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'pomegranate', content: ICON_POMEGRANATE, ...props });
