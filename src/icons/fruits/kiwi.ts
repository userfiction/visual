import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// An oval cut surface, radial seeds and a slim separated skin replace the
// small circular doughnut. Keep a solid elongated core, not a central hole.
export const ICON_KIWI =
    `<path d="M21.5 12a9.5 10.5 0 1 1 -19 0 9.5 10.5 0 1 1 19 0zM20 12a8 9 0 1 0 -16 0 8 9 0 1 0 16 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // Seed slots point towards the core; evenodd makes all eight true holes.
    `<path d="M18.8 12a6.8 7.8 0 1 1 -13.6 0 6.8 7.8 0 1 1 13.6 0zM11.4 6v2h1.2V6zM11.4 16v2h1.2v-2zM6.7 11.4v1.2h2v-1.2zM15.3 11.4v1.2h2v-1.2zM8.2 7.7l-.8.8 1.4 1.4.8-.8zM15.8 7.7l-1.4 1.4.8.8 1.4-1.4zM8.8 14.1l-1.4 1.4.8.8 1.4-1.4zM15.2 14.1l-.8.8 1.4 1.4.8-.8z" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
    // flatPath follows the package's portable currentColor convention.
    flatPath('M11.7 9.8Q10.9 12 11.7 14.2H12.3Q13.1 12 12.3 9.8z');

// Reuse the same cutaway in both existing rendering APIs.
export const svgKiwi: SvgIconFactory = createSvgIcon('kiwi', ICON_KIWI);
export const KiwiIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'kiwi', content: ICON_KIWI, ...props });
