import React from 'react';
import { createSvgIcon, flatPath } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import { IconBase } from '../react';
import type { IconProps } from '../react';

// Crystal seated between curved prongs, with separated ferrules on the shaft.
// Unlike wand.ts this reads as a full-length mage's staff.
export const ICON_STAFF = flatPath('M12 1L15 5L12 9L9 5ZM6 4H8Q7 9 11 10H13Q17 9 16 4H18Q20 11 13 12V17H11V12Q4 11 6 4ZM10 18H14V20H10ZM11 21H13V23H11Z');
export const svgStaff: SvgIconFactory = createSvgIcon('staff', ICON_STAFF);
export const StaffIcon = (props: IconProps) =>
    React.createElement(IconBase, { name: 'staff', content: ICON_STAFF, ...props });
