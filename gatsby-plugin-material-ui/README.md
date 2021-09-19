# gatsby-plugin-material-ui

> A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin for [@material-ui](https://github.com/mui-org/material-ui) with built-in server-side rendering support.

This is the plugin for Material-UI v5 (emotion). The plugin for v4 can be found [here](https://github.com/hupe1980/gatsby-plugin-material-ui/tree/v3.0.1).

## Install
```sh
npm install gatsby-plugin-material-ui@next @emotion/react
```

## Theme vs. Plugin
- `gatsby-plugin-material-ui` solves FOUC, auto prefixing and minification.
- `gatsby-theme-material-ui` uses the plugin under the hood, adds web fonts, meta-viewport, CSS baseline and mui theme support and has material ui styled gatsby link components

## How to use

The default options should be enough to cover the most common use cases.

```js
// gatsby-config.js

module.exports = {
  plugins: [`gatsby-plugin-material-ui`],
};
```

## Advanced

You can use the `pathToEmotionCacheProps` option for low level customization of how styles get inserted by [emotion](https://emotion.sh/docs/@emotion/cache#createcache).

```js
// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        pathToEmotionCacheProps: `src/emotion-cache-props`,
      },
    },
  ],
};
```

```js
// src/emotion-cache-props.js
const emotionCacheProps = {
  key: `xyz`,
  nonce: `XXXYYYZZZ`
};

export default emotionCacheProps;
```

## Examples

You can find an official integration example of this plugin [on the Material-UI site](https://github.com/mui-org/material-ui/tree/master/examples/gatsby), then you can pick one of the [Page Layout Examples](https://material-ui.com/getting-started/page-layout-examples/).

If you want to save time with a more opinionated solution. You can start with [a premade theme](https://github.com/hupe1980/gatsby-theme-material-ui).
