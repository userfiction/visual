// ============================================================================
// ui/vite.config.ts — standalone Vite config for the @userfiction/visual UI
// showcase (the icon gallery).
// ============================================================================
// - `root: __dirname` keeps the UI fully isolated from the library config
//   (the package's own vite.config.ts is untouched). The __dirname usage
//   mirrors @userfiction/combat and @userfiction/inventory demo configs
//   (verified working against Vite 8 + "type": "module").
// - Port policy: default 8320 (combat's demo uses 8300 and inventory's 8310,
//   so all three can run at once in the workspace), strictPort (fail fast
//   instead of silently shifting). Override via env VISUAL_UI_PORT=8500 or
//   Vite CLI `-- --port 8500` — the CLI wins because Vite CLI args override
//   config.
// - Build lands in ui/dist (permitted package path, gitignored), sourcemapped,
//   mirroring the library build's sourcemap/emptyOutDir choices.
// - The UI is NOT part of the npm package: excluded from package.json
//   "files" and tsconfig.build.json; it is built and published to GitHub
//   Pages by .github/workflows/deploy-visual-ui.yml.
// - No backend, no fetch, no storage: this is a pure static app.
// ----------------------------------------------------------------------------
import { defineConfig } from 'vite';

// Strict env parsing: a present-but-malformed VISUAL_UI_PORT fails loudly
// (strictPort philosophy applied to the override itself); empty string =
// unset.
const rawPort = process.env.VISUAL_UI_PORT;
if (rawPort) {
    if (!/^\d+$/.test(rawPort)) {
        throw new Error(`VISUAL_UI_PORT must be a plain integer port, got: '${rawPort}'`);
    }
}
const port = rawPort ? Number(rawPort) : 8320;

export default defineConfig({
    root: __dirname,
    server: {
        port,
        strictPort: true, // occupied port must fail loudly
    },
    preview: {
        // ui:preview uses the same env/default
        port,
        strictPort: true,
    },
    build: {
        outDir: 'dist', // -> ui/dist
        emptyOutDir: true,
        sourcemap: true,
    },
});
