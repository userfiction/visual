// ============================================================================
// @userfiction/visual — icons barrel (the single import point for the icons
// folder — "barreling input": every consumer imports through THIS file)
// ============================================================================
// Layers (bottom-up):
//   svg-icon.ts     — string layer machinery (iconRegistry, svgIcon,
//                     svgIconDataUri, createSvgIcon, flatPath)
//   react.tsx       — React layer machinery (IconBase, VisualIcon, props)
//   generic/        — GENERIC icon set, ONE .ts FILE PER ICON (check.ts,
//                     close.ts, … ×23): each exports the ICON_<NAME>
//                     geometry, the svg<Name> string factory and the
//                     <Name>Icon React component; index.ts is the sub-barrel
//   fantasy/        — FANTASY icon set, same per-icon pattern (sword, wand,
//                     shield, potion, scroll, spellbook, crown, gem, key,
//                     axe ×10)
//   builtins.ts     — the svgIcons discovery map over ALL per-icon modules
//                     (importing it registers every built-in)
//
// TREE-SHAKING: plain `export *` re-exports keep the per-name tree-shakable
// contract — a bundler keeps only the named exports a consumer imports
// (package.json "sideEffects": false). Importing the barrel namespace as a
// whole (`import * as visual`) keeps everything, including every registry
// registration.
// ============================================================================

export * from './svg-icon';
export * from './react';
export * from './generic';
export * from './fantasy';
export * from './builtins';
