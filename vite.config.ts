import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: 'localhost',
  },
  resolve: {
    // alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    alias: {
      src: '/src',
    },
  },
});
