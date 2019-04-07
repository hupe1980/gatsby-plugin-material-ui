# gatsby-plugin-material-ui

> A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin for
> [Material-UI](https://github.com/mui-org/material-ui) with
> built-in server-side rendering support.

## Install

`npm install --save gatsby-plugin-material-ui@next`

## How to use

Edit `gatsby-config.js`

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
      // If you want to use styled components you should add the plugin here.
      // 'gatsby-plugin-styled-components',
    },
  ],
};
```
