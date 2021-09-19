module.exports = {
  parser: `@babel/eslint-parser`,
  extends: [`eslint:recommended`, `plugin:react/recommended`],
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      configFile: `./gatsby-plugin-material-ui/.babelrc`,
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
