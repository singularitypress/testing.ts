module.exports = {
  verbose: true,
  preset: "jest-playwright-preset",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  modulePathIgnorePatterns: [
    "node_modules",
    "tests/aem",
  ],
};
