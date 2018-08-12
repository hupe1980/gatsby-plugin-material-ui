# @wapps/gatsby-plugin-material-ui

> A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin for
[Material UI](https://github.com/mui-org/material-ui) with
built-in server-side rendering support.

## Install

`npm install --save @wapps/gatsby-plugin-material-ui @material-ui/core`

## How to use

Edit `gatsby-config.js`

```javascript
module.exports = {
  plugins: [
    {
      resolve: `@wapps/gatsby-plugin-material-ui`,
      options: {
        // Add any options here
      },
    },
  ],
}
```

# Options

You can pass options to the plugin:
- theme (Object [optional]): Default to {}.
- dangerouslyUseGlobalCSS (Boolean [optional]): Defaults to false. Makes the Material-UI class names deterministic.
- productionPrefix (String [optional]): Defaults to 'jss'. The string used to prefix the class names in production.

For example:

```js
options: {
  theme: {
    primaryColor: '#9c27b0',
  },
  productionPrefix: 'c',
}
```
