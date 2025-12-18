import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // describe, it, expect sin imports
    environment: 'node', // backend
    include: ['**/*.test.ts'],
  },
});
