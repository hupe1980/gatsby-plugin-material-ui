module.exports = {
  parser: `@babel/eslint-parser`,
  extends: [`eslint:recommended`, `plugin:react/recommended`, `prettier`],
  plugins: [`prettier`],
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      configFile: `./.babelrc`,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: `detect`,
    },
  },
  rules: {
    "prettier/prettier": `error`,
    quotes: [`error`, `backtick`],
  },
  overrides: [
    {
      files: [`**/cypress/integration/**/*`, `**/cypress/support/**/*`],
      globals: {
        cy: false,
        Cypress: false,
      },
    },
  ],
};
