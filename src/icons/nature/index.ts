// ============================================================================
// nature — barrel of the NATURE icon set (trees + plants; one file per
// icon, this file is the sub-barrel; the generic set lives in ../generic).
// ============================================================================
// Same contract as generic/index.ts: explicit per-file re-exports, one
// module per icon (geometry + svg factory + React component).
// ORDER: trees first (oak, pine, palm, birch, maple, fir, cypress,
// willow), then plants (bush, cactus, fern, flower) — builtins.ts appends
// in this order and tests pin the resulting key list.
// ============================================================================

export * from './oak';
export * from './pine';
export * from './palm';
export * from './birch';
export * from './maple';
export * from './fir';
export * from './cypress';
export * from './willow';
export * from './apple-tree';
export * from './cherry-tree';
export * from './redwood';
export * from './spruce';
export * from './bush';
export * from './cactus';
export * from './fern';
export * from './flower';
export * from './tulip';
export * from './sunflower';
// VISUAL-TESTS-11: the LANDSCAPE subset joins the nature barrel (mountain,
// hills, river) — appended AFTER the blooms so the existing key order and
// every pinned test list stays valid.
export * from './mountain';
export * from './hills';
export * from './river';
// VISUAL-TESTS-11: the SKY subset joins right after landscape (sun, moon,
// cloud, stars, sunrise, rainbow, lightning) — same append-only contract.
export * from './sun';
export * from './moon';
export * from './cloud';
export * from './stars';
export * from './sunrise';
export * from './rainbow';
export * from './lightning';
