import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import solidPlugin from 'vite-plugin-solid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    solidPlugin(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@consts': resolve(__dirname, './src/consts'),
      '@layouts': resolve(__dirname, './src/layouts'),
      '@services': resolve(__dirname, './src/services'),
      '@utils': resolve(__dirname, './src/utils'),
    }
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
