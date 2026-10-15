/**
 * play — generic media glyph: play (▶).
 *
 * GEOMETRY: solid triangle (Material play_arrow geometry) — tip right,
 * flat left edge at x=8.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_PLAY = flatPath('M8 5v14l11-7z');

export const svgPlay: SvgIconFactory = createSvgIcon('play', ICON_PLAY);

export const PlayIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'play', content: ICON_PLAY, ...props });
