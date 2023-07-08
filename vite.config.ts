import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import solidPlugin from 'vite-plugin-solid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [solidPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@utils': resolve(__dirname, './src/utils'),
      '@types': resolve(__dirname, './src/types'),
      '@consts': resolve(__dirname, './src/consts'),
      '@layouts': resolve(__dirname, './src/layouts'),
      '@contexts': resolve(__dirname, './src/contexts'),
      '@services': resolve(__dirname, './src/services'),
      '@components': resolve(__dirname, './src/components'),
    }
  },
  server: {
    host: true,
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
