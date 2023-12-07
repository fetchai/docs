/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^nextra/icons$": "<rootDir>/__mocks__/nextra/icons.js",
    "^nextra/hooks$": "<rootDir>/__mocks__/nextra/hooks.js",
    "^escape-string-regexp$": "<rootDir>/__mocks__/escape-string-regexp.js",
    "^components/(.*)$": "<rootDir>/components/$1",
    "app-router-context-provider-mock":
      "<rootDir>/app-router-context-provider-mock.tsx",
    "^theme/fetch-ai-docs/components$":
      "<rootDir>/theme/fetch-ai-docs/components/index.ts",
  },
  moduleDirectories: ["node_modules", "<rootDir>/", "src"],
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  type: "module",
};

module.exports = createJestConfig(customJestConfig);
