import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative asset URLs so the production build works on GitHub Pages
  // project sites (/BMT-01/) as well as a custom domain.
  base: '/BMT-01/',
  plugins: [react(), tailwindcss()],
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
