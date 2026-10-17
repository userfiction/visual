// ============================================================================
// flags — barrel of the FLAGS icon set (one file per icon, this file is
// the sub-barrel; the generic set lives in ../generic).
// ============================================================================
// Same contract as generic/index.ts: explicit per-file re-exports, one
// module per icon (geometry + svg factory + React component).
//
// ORDER: the original eight flags first (their relative order is pinned
// by builtins.ts's svgIcons map and its registry-order tests), then the
// FLAGS-PRODUCTION uplift batch appended in the task's given key order.
// New names must ALSO be appended to ../builtins.ts (import + map entry)
// and ../../../ui/main.ts's Flags subset for gallery discoverability.
// ============================================================================

// ── original eight ──────────────────────────────────────────────────────────
export * from './flag';
export * from './pennant';
export * from './banner';
export * from './waving-flag';
export * from './checkered-flag';
export * from './nordic-flag';
export * from './swallowtail-flag';
export * from './bunting';

// ── FLAGS-PRODUCTION uplift batch ───────────────────────────────────────────
export * from './triangular-flag';
export * from './double-pennant';
export * from './forked-flag';
export * from './rounded-flag';
export * from './tattered-flag';
export * from './crossed-flags';
export * from './flag-garland';
export * from './windsock';
export * from './flag-on-hill';
export * from './victory-flag';
export * from './striped-flag';
export * from './cross-flag';
export * from './saltire-flag';
export * from './diamond-flag';
export * from './signal-flag';
export * from './ceremonial-banner';
