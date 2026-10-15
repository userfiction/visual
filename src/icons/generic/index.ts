// ============================================================================
// generic — barrel of the GENERIC icon set (one file per icon, this file is
// the sub-barrel; the fantasy set lives in ../fantasy).
// ============================================================================
// Explicit per-file re-exports (not a dynamic glob) so the tree-shaking
// contract stays readable: importing one name from here keeps exactly that
// icon's module (geometry + factory + React component), nothing else.
// ============================================================================

export * from './check';
export * from './close';
export * from './plus';
export * from './minus';
export * from './menu';
export * from './chevron-down';
export * from './chevron-up';
export * from './chevron-left';
export * from './chevron-right';
export * from './arrow-right';
export * from './play';
export * from './pause';
export * from './stop';
export * from './heart';
export * from './star';
export * from './book';
export * from './bookmark';
export * from './user';
export * from './home';
export * from './pin';
export * from './trash';
export * from './search';
export * from './download';
