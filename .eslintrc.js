module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: ["standard"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "never",
        exports: "always-multiline",
        functions: "always-multiline",
      },
    ],
    "no-undef": 0,
    "no-unused-vars": 0,
  },
};
