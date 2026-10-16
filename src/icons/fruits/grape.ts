import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// A broad-shouldered, tapering bunch replaces the old diamond. Small gaps
// preserve individual grapes; every berry stays inside the 24px viewBox.
export const ICON_GRAPE =
    flatPath(
        'M11.4 7V2h1.4v5zM13.4 4.7C14.2 1.5 17.9 1.3 20.1 2.8L17.9 3.7 18.6 5.2 16.4 5 15.7 6.5zM10.2 4.9C7.8 2.7 5.1 3.4 5.2 5.4 5.3 6.8 6.5 7.2 7.6 6.7L7.2 5.7C6.6 6 6.2 5.8 6.2 5.3 6.2 4.4 8 4.2 9.5 5.8z'
    ) +
    // Rows 3-2-1 establish the hanging cluster rather than a flower shape.
    '<g fill="currentColor" stroke="none"><circle cx="6.5" cy="9.2" r="2.6"/><circle cx="12" cy="8.8" r="2.6"/><circle cx="17.5" cy="9.2" r="2.6"/><circle cx="9.2" cy="14.1" r="2.6"/><circle cx="14.8" cy="14.1" r="2.6"/><circle cx="12" cy="19.1" r="2.6"/></g>';

// Public exports retain existing registry names and component props.
export const svgGrape: SvgIconFactory = createSvgIcon('grape', ICON_GRAPE);
export const GrapeIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'grape', content: ICON_GRAPE, ...props });
