# gatsby-plugin-material-ui

> A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin for [@material-ui/styles](https://github.com/mui-org/material-ui) with built-in server-side rendering support.

This is the plugin for Material-UI v4.
The plugin for v3 can be found [here](https://github.com/hupe1980/gatsby-plugin-material-ui/tree/v1.2.5).

## Install
If you're already using `@material-ui/core`:
```sh
npm install gatsby-plugin-material-ui
```

If you'd only like to use [Material-UI's Styling Solution](https://material-ui.com/styles/basics/#material-ui-styles) (without `@material-ui/core`):
 
```sh
npm install gatsby-plugin-material-ui @material-ui/styles
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

## Usage with styled-components or else

If using Material-UI together with other styling providers (like styled-components), you should make sure Material-UI styles end up on top of `<head>` (so the other styling providers can overwrite it).

You can leverage the `injectFirst: true` prop the [`StylesProvider`](https://material-ui.com/styles/api/#stylesprovider) component:

```js
// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
  ],
};
```

## Autoprefixing and minification

By default, the plugin adds vendor-specific prefixes and minimizes the server-side CSS.
The following options are available for deactivating:

| Option               | Default | Description                          |
| -------------------- | ------- | ------------------------------------ |
| disableAutoprefixing | false   | Opt-out autoprefixing (autoprefixer) |
| disableMinification  | false   | Opt-out minification (clean-css)     |

```js
// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        disableAutoprefixing: false,
        disableMinification: false,
      },
    },
  ],
};
```

## Advanced

You can use the `pathToStylesProvider` option instead of the `stylesProvider` one to provide rich object props to the [`StylesProvider`](https://material-ui.com/styles/api/#stylesprovider) component.

```js
// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        pathToStylesProvider: `src/styles-provider-props`,
      },
    },
  ],
};
```

```js
// src/styles-provider-props.js

import { jssPreset } from "@material-ui/styles";
import { create } from "jss";

const stylesProviderProps = {
  jss: create({ ...jssPreset(), insertionPoint: `mui-inject-first` }),
};

export default stylesProviderProps;
```

## Examples

You can find an official integration example of this plugin [on the Material-UI site](https://github.com/mui-org/material-ui/tree/master/examples/gatsby), then you can pick one of the [Page Layout Examples](https://material-ui.com/getting-started/page-layout-examples/).

If you want to save time with a more opinionated solution. You can start with [a premade theme](https://github.com/hupe1980/gatsby-theme-material-ui).
