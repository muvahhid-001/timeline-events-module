const tsPlugin = require("@typescript-eslint/eslint-plugin");

/** @type {import("eslint").ESLint.ConfigData[]} */
module.exports = [
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"],

    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        process: "readonly",
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
    },

    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      semi: ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true }],
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],

      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
