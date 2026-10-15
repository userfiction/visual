// ============================================================================
// vite.config.ts — Vite config for @userfiction/visual (npm-publishable
// library build).
// ============================================================================
// - Library mode, ESM-only output `dist/userfiction-visual.mjs` — matches the
//   `exports.import` condition in package.json (consumed by external npm
//   users; workspace dev keeps resolving TS source via the `development`
//   condition, the same split as @userfiction/combat / inventory / reader).
// - BUNDLED (not external): @presource/core. It is a raw-TS package on npm
//   (main -> src/*.ts, no usable dist for plain Node — proven for the sibling
//   packages, see @userfiction/reader/vite.config.ts), so an external import
//   would fail in plain Node. Vite transpiles its TS during bundling, so the
//   published JS is self-contained. It REMAINS declared as a dependency for
//   provenance honesty + type resolution.
// - EXTERNAL: react (declared as peerDependencies ^18.2.0 — the tested React
//   18 line only, React 19 untested and not claimed — so the host app
//   provides ONE React copy; also in devDependencies for local tests). The
//   pattern /^react(-dom)?(\/|$)/ mirrors @userfiction/reader so a future
//   react-dom import stays external too.
// - TEST: this file also shadows the root vitest config when vitest runs with
//   this package as cwd (package.json "test": "vitest run"), so the root's
//   test settings (jsdom + globals) are mirrored here — same shadow pattern
//   as every other @userfiction package.
// ============================================================================
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    test: {
        // Mirrors root vitest.config.ts so `vitest run` from this package dir
        // behaves exactly like the sibling packages' suites
        environment: 'jsdom',
        globals: true,
        include: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
        passWithNoTests: true,
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'index.ts'),
            name: 'userfiction-visual',
            formats: ['es'],
            fileName: () => 'userfiction-visual.mjs',
        },
        rollupOptions: {
            // Only published-JS runtimes stay external; the raw-TS internal
            // dependency (@presource/core) is bundled (see header comment)
            external: [/^node:/, /^react(-dom)?(\/|$)/],
            output: {
                globals: {},
            },
        },
        sourcemap: true,
        emptyOutDir: true,
    },
});
