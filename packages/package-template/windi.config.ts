import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  preflight: {
    blocklist: 'svg',
  },
});
