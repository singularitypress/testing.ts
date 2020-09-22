module.exports = {
  verbose: true,
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/ssr/*.test.ts"],
  modulePathIgnorePatterns: [
    "node_modules",
  ],
};
