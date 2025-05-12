import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Use global test functions like `describe` and `it`
    environment: 'node', // Use Node.js as the test environment
    include: ['src/__tests__/**/*.test.ts'], // Match test files
    coverage: {
      reporter: ['text', 'json', 'html'], // Generate coverage reports
      reportsDirectory: './coverage', // Output coverage reports to this directory
    },
  },
});