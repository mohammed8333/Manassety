import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Manassety/', // Required for GitHub Pages repository subpath deployment!
  server: {
    port: 3000,
    open: true
  }
});
