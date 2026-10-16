/**
 * dragon — ANIMALS icon: FULL body facing right — horned head with open jaw
 * and fang, BAT WING with scalloped trailing edge, serpentine chest, curled
 * spade tail and feet (the old head-only version read as a vague dog).
 *
 * GEOMETRY: head (with eye/nostril holes) is one evenodd element; horns,
 * fang, body, curled tail and feet are flatPath solid overlays; the wing is
 * a second evenodd element whose base overlaps the body (cross-element
 * overlap = union — see svg-icon.ts flatPath + react.tsx IconBase).
 */
import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

const EVENODD = 'fill="currentColor" stroke="none" fill-rule="evenodd"';

// Head: crown → snout → open jaw wedge → throat → neck back + holes.
const DRAGON_HEAD =
    'M9 4.6' +
    'Q10 3.8 11.6 4' + // crown
    'Q15 4.4 18 6.6' + // snout top
    'Q20.8 8.4 21.8 9.4' + // upper-jaw tip
    'L21.7 10.9' + // tip front edge
    'Q19.4 11.5 17 11' + // upper jaw underside back to the corner
    'L17.2 11.8' + // mouth corner step
    'L20.4 13.4' + // lower jaw top edge to the tip
    'L20 14.8' + // lower jaw tip
    'Q17 14.2 14.6 15.2' + // lower jaw underside
    'Q12.6 16 11 16' + // throat
    'L8.6 16.6' + // neck bottom
    'L7.4 8' + // neck back edge up to the crown
    'z' +
    // eye hole
    'M11.7 7a1 1 0 1 0 2 0a1 1 0 1 0 -2 0z' +
    // nostril hole
    'M19.5 8.5a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0z';

// Wing projects LEFT of the head/body instead of hiding inside their opaque
// silhouette. A narrow membrane slot separates the wing root from the chest.
const DRAGON_WING =
    'M10.5 16L2 5.6Q2.7 10 1.5 13Q4.1 11.8 5.2 15.2Q7 13.7 8.3 18z' +
    'M8.7 14.7L3.5 8.8 8 15.3z';

export const ICON_DRAGON =
    `<path d="${DRAGON_HEAD}" ${EVENODD}/>` +
    flatPath(
        // horns: two curved spikes from the crown
        'M10.2 5Q7 2.4 6.2 1.2Q6 0.8 6.6 1Q9.4 2.6 11.8 4.4z' +
            'M12.4 4.6Q11.6 2 12.4 0.9Q12.7 0.6 12.9 1.1L14.4 4.2z' +
            // fang hanging into the open mouth
            'M17.6 11.2L18.4 12.8 16.7 12.2z' +
            // serpentine body: chest → belly → hip (overlaps the neck)
            'M9.2 14.2Q7.4 16 7.8 18.4Q8.2 20.8 10.8 21L16.2 21Q17.6 19.4 17.2 17Q16.8 14.6 14.8 13.6Q11.8 12.6 9.2 14.2z' +
            // curled tail: thick taper with a spade curl
            'M15.4 17.2Q19.6 17.6 21 20Q21.4 20.8 20.4 20.9Q18.6 21.2 17.2 20.2Q15.8 19.2 15.2 18.2z' +
            // feet: two small claws under the belly
            'M9.2 20.6h1.6v1.3h-1.6zM13.4 20.8h1.6v1.1h-1.6z'
    ) +
    `<path d="${DRAGON_WING}" ${EVENODD}/>`;

export const svgDragon: SvgIconFactory = createSvgIcon('dragon', ICON_DRAGON);
export const DragonIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'dragon', content: ICON_DRAGON, ...props });
