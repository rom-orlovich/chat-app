module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },

  root: true,
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js"],
      parser: "@typescript-eslint/parser",
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["./client"],
        extensions: [".js", ".ts", ".d.ts", ".tsx"],
      },
    },
  },
  extends: ["airbnb-base", "prettier", "plugin:tailwindcss/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier", "tailwindcss", "only-warn"],
  rules: {
    "prettier/prettier": ["warn"],
    "lines-between-class-members": [
      "warn",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "no-plusplus": ["off"],
    "no-unused-expressions": ["warn", { allowShortCircuit: true }],

    "import/prefer-default-export": ["off"],
    "import/extensions": ["off"],
    "import/no-unresolved": ["off"],
    "spaced-comment": ["warn", "always"],
    quotes: ["warn", "double", { allowTemplateLiterals: true }],
    "no-unused-vars": "warn",
    "import/no-extraneous-dependencies": [
      "warn",
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["warn"],
    " no-console": "off",

    "no-restricted-syntax": [
      "off",
      "FunctionExpression",
      "WithStatement",
      "BinaryExpression[operator='in']",
    ],
    "no-console": ["off"],
    "consistent-return": ["off"],
    "@typescript-eslint/no-implied-eval": "off",
    "@typescript-eslint/no-throw-literal": "off",
    "@typescript-eslint/return-await": "off",
    "@typescript-eslint/dot-notation": "off",
  },
};
