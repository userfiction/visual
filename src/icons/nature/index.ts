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
// ============================================================================
// SKY-PRODUCTION: the WEATHER + CELESTIAL wave appends 23 more sky modules
// after 'lightning' (same append-only contract — builtins.ts and
// ui/main.ts already list these exact keys in this order; total map 207).
// Weather first (sunset … umbrella), then the celestial/night-sky block
// (crescentMoon … aurora). Every module follows the one-file-per-icon
// pattern above (ICON_* geometry + svg factory + React component).
// ============================================================================
export * from './sunset';
export * from './sun-cloud';
export * from './moon-cloud';
export * from './cloud-rain';
export * from './cloud-drizzle';
export * from './cloud-snow';
export * from './cloud-lightning';
export * from './cloud-wind';
export * from './fog';
export * from './wind';
export * from './tornado';
export * from './snowflake';
export * from './raindrop';
export * from './umbrella';
export * from './crescent-moon';
export * from './full-moon';
export * from './half-moon';
export * from './moon-stars';
export * from './shooting-star';
export * from './constellation';
export * from './comet';
export * from './eclipse';
export * from './aurora';
