import { defineConfig } from 'vite';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './src/components')
    }
  },
  plugins: [
    vue({
      reactivityTransform: true
    }),
    vueI18n(),
    eslintPlugin()
  ]
});
