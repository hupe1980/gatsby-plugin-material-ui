# gatsby-plugin-material-ui

> A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin for
> [@material-ui/styles](https://github.com/mui-org/material-ui) with
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
      // If you want to use styled components, in conjunction to Material-UI, you should: 
      // - Change the injection order
      // - Add the plugin
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
      // 'gatsby-plugin-styled-components',
    },
  ],
};
```

## Examples

You can find an official integration example of this plugin [on Material-UI side](https://github.com/mui-org/material-ui/tree/next/examples/gatsby-next), then you can pick one of the [Page Layout Examples](https://next.material-ui.com/getting-started/page-layout-examples/).

If you want to save time with a more opinionated solution. You can start with [a premade theme](https://github.com/hupe1980/gatsby-theme-material-ui).

