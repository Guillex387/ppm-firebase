import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },
});
