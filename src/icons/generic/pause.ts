/**
 * pause — generic media glyph: pause (❚❚).
 *
 * GEOMETRY: two solid 4px bars with a 2-unit gap (x 7..11 and 13..17).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_PAUSE = flatPath('M7 5h4v14H7zM13 5h4v14h-4z');

export const svgPause: SvgIconFactory = createSvgIcon('pause', ICON_PAUSE);

export const PauseIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'pause', content: ICON_PAUSE, ...props });
