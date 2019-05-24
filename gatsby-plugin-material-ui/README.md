# gatsby-plugin-material-ui

> A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin for
> [@material-ui/styles](https://github.com/mui-org/material-ui) with
> built-in server-side rendering support.

This is the plugin for Material-UI v4. The plugin for v3 can be found [here](https://github.com/hupe1980/gatsby-plugin-material-ui/tree/v1.2.5).

## Install

`npm install --save gatsby-plugin-material-ui @material-ui/styles`

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

## Autoprefixing and minification

By default, the plugin adds vendor-specific prefixes and minimizes the server-side CSS. The following options are available for deactivating:

| Option               | Default | Description                          |
| -------------------- | ------- | ------------------------------------ |
| disableAutoprefixing | false   | Opt-out Autoprefixing (autoprefixer) |
| disableMinification  | false   | Opt-out minification (clean-css)     |

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        // disableAutoprefixing: true,
        // disableMinification: true
      },
    },
  ],
};
```

## Examples

You can find an official integration example of this plugin [on Material-UI side](https://github.com/mui-org/material-ui/tree/master/examples/gatsby), then you can pick one of the [Page Layout Examples](https://material-ui.com/getting-started/page-layout-examples/).

If you want to save time with a more opinionated solution. You can start with [a premade theme](https://github.com/hupe1980/gatsby-theme-material-ui).