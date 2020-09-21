module.exports = {
  verbose: true,
  preset: "jest-playwright-preset",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/ssr/*.test.ts"],
  modulePathIgnorePatterns: [
    "node_modules",
  ],
};
