// ============================================================================
// @userfiction/visual — Package barrel export (root index.ts)
// ============================================================================
// Source-only publish surface (AGENTS.md runner policy (c)): package.json
// main/module/types/exports point straight at ./src/index.ts, so npm consumers
// land on the src barrel directly — there is no dist build and no
// `exports.development` condition any more.
// This root barrel remains the relative-import alias: FORWARDS to the src-level
// public barrel (src/index.ts) — the one-place pattern used by
// @userfiction/combat and @userfiction/inventory — so the root alias, relative
// imports (the ui/ showcase imports through it) and every test resolve the
// identical surface without drift.
//
// The UI showcase app (ui/) is NOT part of this package's npm surface — it is
// excluded from package.json "files" and built/deployed separately by
// .github/workflows/deploy-visual-ui.yml.
// ============================================================================

export * from './src/index';
