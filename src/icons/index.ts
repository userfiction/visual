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
//   fantasy/        — FANTASY/RPG icon set, same per-icon pattern: weapons,
//                     armor, alchemy, magic and loot ×30; complete ordered
//                     catalog in fantasy/index.ts and builtins.ts
//   flags/          — FLAGS subset, same pattern (flag, pennant, banner,
//                     wavingFlag, checkeredFlag, nordicFlag,
//                     swallowtailFlag, bunting + 16 silhouettes/heraldry ×24;
//                     complete ordered catalog in flags/index.ts)
//   animals/        — ANIMALS subset, same pattern (cat, dog, bird, fish,
//                     rabbit, bear, dragon, snake, turtle, paw + horse,
//                     lion, owl, fox, whale, frog, snail, penguin,
//                     butterfly, duck + 40 land, bird, marine and reptile
//                     species ×60; full list in animals/index.ts)
//   fruits/         — FRUITS subset, same pattern (apple, banana, cherry,
//                     grape, orange, lemon, watermelon, pear, strawberry,
//                     peach + pineapple, kiwi, mango, avocado, blueberry,
//                     coconut, pomegranate, plum, melon ×19)
//   nature/         — NATURE subset (trees + plants), same pattern (oak,
//                     pine, palm, birch, maple, fir, cypress, willow,
//                     appleTree, cherryTree, redwood, spruce, bush,
//                     cactus, fern, flower, tulip, sunflower ×18), landscape
//                     ×3 and sky/weather/celestial ×30; nature/index.ts
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
export * from './flags';
export * from './animals';
export * from './fruits';
export * from './nature';
export * from './builtins';
