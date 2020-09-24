module.exports = {
  verbose: true,
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/*/*.test.ts"],
  modulePathIgnorePatterns: [
    "node_modules",
  ],
};
