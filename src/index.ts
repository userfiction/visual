// ============================================================================
// @userfiction/visual — src-level public barrel
// ============================================================================
// Owner of the package's public export list (the same one-place pattern as
// @userfiction/combat's src/index.ts). The root index.ts forwards HERE, so
// the npm surface, the UI showcase and the tests resolve one identical
// surface.
//
// Layers (bottom-up):
//   icons/svg-icon.ts  — string layer machinery (iconRegistry, svgIcon,
//                        svgIconDataUri, createSvgIcon, flatPath)
//   icons/react.tsx    — React layer machinery (IconBase, VisualIcon)
//   icons/generic/     — GENERIC icon set, one .ts file per icon (geometry +
//                        svg factory + React component), sub-barreled
//   icons/fantasy/     — FANTASY icon set (sword, wand, …), same pattern
//   icons/builtins.ts  — svgIcons discovery map over every built-in
// ============================================================================

export * from './icons';
