/**
 * download — generic action glyph: download (⭳).
 *
 * GEOMETRY: solid down arrow (shaft + head in one outline) above a base bar.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_DOWNLOAD = flatPath('M11 4h2v8h3l-4 4-4-4h3zM5 18h14v2H5z');

export const svgDownload: SvgIconFactory = createSvgIcon('download', ICON_DOWNLOAD);

export const DownloadIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'download', content: ICON_DOWNLOAD, ...props });
