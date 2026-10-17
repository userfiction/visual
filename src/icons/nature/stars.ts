import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Four-point sparkles use broad concave shoulders rather than zero-width
// retraced diagonal rays. Disjoint glyphs stay legible at16px; ../svg-icon.ts
// supplies the same currentColor flat presentation to string/React callers.
export const ICON_STARS = flatPath('M14 1l1.7 5.3L21 8l-5.3 1.7L14 15l-1.7-5.3L7 8l5.3-1.7zM5 12l1.1 3.9L10 17l-3.9 1.1L5 22l-1.1-3.9L0 17l3.9-1.1zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z');
// Preserve the public triple and registry key used in builtins.ts.
export const svgStars: SvgIconFactory = createSvgIcon('stars', ICON_STARS);
export const StarsIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'stars', content: ICON_STARS, ...props });
