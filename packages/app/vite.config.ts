import { defineConfig } from 'vite';
// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
// import { defineConfig } from 'vitest/dist/config';

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    sveltekit(),
    // This plugin gives vite the ability to resolve imports using TypeScript's path mapping.
    // https://www.npmjs.com/package/vite-tsconfig-paths
  ],
});
