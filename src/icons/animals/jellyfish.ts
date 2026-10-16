/**
 * jellyfish — ANIMALS icon: jellyfish with the domed bell, a scalloped
 * skirt edge, a curved inner bell highlight and four wavy hanging tentacles.
 *
 * GEOMETRY: bell = one path — dome arc (rx 7.4 ry 6.6 over (4.6..19.4,
 * 13.2)) swept CLOCKWISE over the top, closed along the bottom by SIX
 * concave Q-scallops (control points pulled UP so the skirt edge dips in
 * cusps at y 13.2); inner bell highlight = curved crescent hole cut
 * COUNTERCLOCKWISE inside the bell; tentacles = four solid wavy ribbons —
 * each traces an S-curve down (outer edge), caps at the tip (y 21.2..21.5)
 * and returns along a second S-curve — their bases sit INSIDE the bell's
 * skirt band (plain union). Machinery cross-reference: flatPath
 * (../svg-icon.ts) + IconBase (../react.tsx), same contract as
 * animals/whale.ts.
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

export const ICON_JELLYFISH = flatPath(
    // bell: dome arc + six-scallop skirt, clockwise outline
    'M4.6 13.2A7.4 6.6 0 0 1 19.4 13.2Q18.2 12 17 13.2Q15.8 12 14.6 13.2Q13.4 12 12.2 13.2Q11 12 9.8 13.2Q8.6 12 7.4 13.2Q6.2 12 4.6 13.2z' +
        // Reverse-wound curved highlight follows the bell rather than
        // appearing as an unrelated horizontal slot in a helmet.
        'M7.1 11.2Q12 6.8 16.9 11.2Q12 4.9 7.1 11.2z' +
        // tentacles (four wavy ribbons, bases unioned into the skirt)
        'M5.7 12.8Q4.6 15.4 5.8 17.4Q6.6 19 5.8 21.2Q4.9 21.5 4.7 20.8Q5.5 19 4.9 17.4Q4.1 15.4 4.9 12.8z' +
        'M9.8 12.8Q10.9 15.6 9.7 17.6Q8.9 19.2 9.9 21.4Q10.8 21.1 11 20.4Q10.2 18.6 10.9 17Q11.7 15.2 10.8 12.8z' +
        'M13.2 12.8Q12.1 15.6 13.3 17.6Q14.1 19.2 13.1 21.4Q14 21.1 14.2 20.4Q13.4 18.6 14.1 17Q14.9 15.2 14 12.8z' +
        'M18.1 12.8Q19 15.4 17.8 17.4Q17 19 17.8 21.2Q18.7 21.5 18.9 20.8Q18.1 19 18.7 17.4Q19.5 15.4 18.7 12.8z'
);

// String layer: registers 'jellyfish' in the shared registry + bound factory
export const svgJellyfish: SvgIconFactory = createSvgIcon('jellyfish', ICON_JELLYFISH);

// React layer: same geometry through the shared flat shell
export const JellyfishIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'jellyfish', content: ICON_JELLYFISH, ...props });
