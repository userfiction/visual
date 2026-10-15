// ============================================================================
// @userfiction/visual — Package barrel export (root index.ts)
// ============================================================================
// Public npm entrypoint (package.json exports.development + vite lib.entry).
// FORWARDS to the src-level public barrel (src/index.ts) — the one-place
// pattern used by @userfiction/combat and @userfiction/inventory: the root
// entry, relative imports (the ui/ showcase imports through it) and every
// test resolve the identical surface without drift.
//
// The UI showcase app (ui/) is NOT part of this package's npm surface — it is
// excluded from package.json "files" and built/deployed separately by
// .github/workflows/deploy-visual-ui.yml.
// ============================================================================

export * from './src/index';
