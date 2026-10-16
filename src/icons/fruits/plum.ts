import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Plums are oval drupes, not flattened onions. The long off-centre suture
// and shallow stem notch distinguish this from orange.ts and peach.ts.
export const ICON_PLUM =
    `<path d="M12 7.4C15.8 5.5 20 8.3 20 13.4 20 18.3 16.8 22.3 12 22.3S4 18.3 4 13.4C4 8.3 8.2 5.5 12 7.4zM10.7 8.7C8.2 11.5 8.4 17.6 11.2 20.4L12.1 19.5C9.8 16.8 9.7 12 11.7 9.4z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    flatPath(
        'M11.3 7.7C11 5.3 11.7 3.4 13 2L14.1 3C13 4.2 12.5 5.6 12.7 7.7zM14.2 5C14.6 2.6 17.6 1.7 20.2 2.4 18.7 4.7 16.6 5.6 14.2 5z'
    );

// Existing exports continue to share one content definition.
export const svgPlum: SvgIconFactory = createSvgIcon('plum', ICON_PLUM);
export const PlumIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'plum', content: ICON_PLUM, ...props });
