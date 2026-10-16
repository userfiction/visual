// ============================================================================
// animals — barrel of the ANIMALS icon set (one file per icon, this file is
// the sub-barrel; the generic set lives in ../generic).
// ============================================================================
// Same contract as generic/index.ts: explicit per-file re-exports, one
// module per icon (geometry + svg factory + React component).
// ORDER: the original ten, horse … duck, then the expanded wildlife set —
// ../builtins.ts preserves this order and tests pin the resulting key list.
// ============================================================================

export * from './cat';
export * from './dog';
export * from './bird';
export * from './fish';
export * from './rabbit';
export * from './bear';
export * from './dragon';
export * from './snake';
export * from './turtle';
export * from './paw';
export * from './horse';
export * from './lion';
export * from './owl';
export * from './fox';
export * from './whale';
export * from './frog';
export * from './snail';
export * from './penguin';
export * from './butterfly';
export * from './duck';

// Expanded wildlife: each module keeps the same standalone SVG/React API;
// ../builtins.ts and ../../../ui/main.ts expose these names to discovery.
export * from './elephant';
export * from './giraffe';
export * from './zebra';
export * from './rhinoceros';
export * from './hippopotamus';
export * from './monkey';
export * from './gorilla';
export * from './panda';
export * from './koala';
export * from './kangaroo';
export * from './deer';
export * from './moose';
export * from './wolf';
export * from './tiger';
export * from './cow';
export * from './pig';
export * from './sheep';
export * from './goat';
export * from './camel';
export * from './donkey';
export * from './bat';
export * from './eagle';
export * from './parrot';
export * from './flamingo';
export * from './swan';
export * from './chicken';
export * from './rooster';
export * from './peacock';
export * from './ostrich';
export * from './shark';
export * from './dolphin';
export * from './octopus';
export * from './squid';
export * from './jellyfish';
export * from './crab';
export * from './lobster';
export * from './seahorse';
export * from './crocodile';
export * from './lizard';
export * from './chameleon';
