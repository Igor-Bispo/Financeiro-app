import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.test.js', 'src/**/*.test.js'],
    exclude: ['node_modules/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'tests/**',
        '**/*.config.js',
        '**/*.config.mjs'
      ]
    }
  },
  resolve: {
    alias: {
      '@js': resolve(__dirname, 'src/js'),
      '@css': resolve(__dirname, 'src/css'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@app': resolve(__dirname, 'src/app'),
      '@core': resolve(__dirname, 'src/core'),
      '@data': resolve(__dirname, 'src/data'),
      '@features': resolve(__dirname, 'src/features'),
      '@ui': resolve(__dirname, 'src/ui')
    }
  }
});
