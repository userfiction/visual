// ============================================================================
// vite.config.ts — Vite config for @userfiction/visual.
// ============================================================================
// SOURCE-ONLY LIBRARY (repo policy: AGENTS.md "Runtime / runner policy" (c)):
// this package publishes TypeScript from source — package.json main/module/
// types/exports all point at ./src/index.ts, so there is NO library build here
// and no dist/ output. Consumers are Vite-based and compile/roll up the TS from
// node_modules themselves, which also removes the old reason for BUNDLING the
// raw-TS dependency (@presource/core) into a published .mjs: a Vite consumer
// transpiles it from its own src/index.ts like it transpiles this package. It
// REMAINS a declared dependency (provenance honesty + type resolution); react
// stays host-provided via peerDependencies ^18.2.0 (the tested React 18 line
// only) so the app carries ONE React copy.
// The UI showcase (ui/) is a DEPLOYABLE app surface, NOT a library build: it
// keeps its own Vite config + dist output via "ui:dev" / "ui:build" /
// "ui:preview" -> ui/vite.config.ts (standalone; it does not extend this file)
// and is excluded from the published "files" list.
// - TEST: this file is the vitest config when vitest runs with this package as
//   cwd (package.json "test": "vitest run"), so the root's test settings
//   (jsdom + globals) are mirrored here — same shadow pattern as every other
//   @userfiction package.
// ============================================================================
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // Mirrors root vitest.config.ts so `vitest run` from this package dir
        // behaves exactly like the sibling packages' suites
        environment: 'jsdom',
        globals: true,
        include: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
        passWithNoTests: true,
    },
});
