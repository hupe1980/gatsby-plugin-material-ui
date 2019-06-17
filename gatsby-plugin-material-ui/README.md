# gatsby-plugin-material-ui

> A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin for
> [@material-ui/styles](https://github.com/mui-org/material-ui) with
> built-in server-side rendering support.

This is the plugin for Material-UI v4. The plugin for v3 can be found [here](https://github.com/hupe1980/gatsby-plugin-material-ui/tree/v1.2.5).

## Install

`npm install --save gatsby-plugin-material-ui @material-ui/styles`

## How to use

Feel free to use the plugin without any options.

If using Material-UI together with other styling providers (like styled-components), you should make sure Material-UI styles end up on top of `<head>` (so the other styling providers can overwrite it). This is accomplished by editing `gatsby-config.js` in **one** of the two following ways:

1. Add a `stylesProvider` property, and specify `injectFirst: true` (see below). This places Material-UI at the top of head

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        disableAutoprefixing: false,
        disableMinification: false,
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
  ],
};
```

2. Alternatively, specify a specific point in `<head>` where the styles will be injected. This is done by spcifying the `pathToStylesProvder` property **instead** of the `stylesProvider` property. It should point to a configuration file, as seen below. You will also find an example configuration file below.

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        disableAutoprefixing: false,
        disableMinification: false,
        pathToStylesProvider: 'src/utils/styles-provider-props',
      },
    },
  ],
};
```

## Example `styles-provider-props.js`

```js
import { jssPreset } from '@material-ui/styles';
import { create } from 'jss';

const jssOptions = {
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
};
const jss = create(jssOptions);

const stylesProviderProps = {
  // disableGeneration: false,
  // generateClassName: () => {},
  // injectFirst: false,
  jss,
};

export default stylesProviderProps;
```

## styles-provider-props.js Options

- This file accept all props that `StylesProvider` accepts. They are simply passed directly on to `StylesProvider` as specified
- To set a custom insertion point, create a new `jss` instance in this file, and assign it to the the `StylesProvider` `jss` prop (as shown above)
- You have to manually specify the insertion point in `head`, as a `html` comment or a `noscript` tag. [More information on how that is done in Material-UI](https://material-ui.com/customization/css-in-js/#css-injection-order)

## Autoprefixing and minification

By default, the plugin adds vendor-specific prefixes and minimizes the server-side CSS. The following options are available for deactivating:

| Option               | Default | Description                          |
| -------------------- | ------- | ------------------------------------ |
| disableAutoprefixing | false   | Opt-out Autoprefixing (autoprefixer) |
| disableMinification  | false   | Opt-out minification (clean-css)     |

## Examples

You can find an official integration example of this plugin [on Material-UI side](https://github.com/mui-org/material-ui/tree/master/examples/gatsby), then you can pick one of the [Page Layout Examples](https://material-ui.com/getting-started/page-layout-examples/).

If you want to save time with a more opinionated solution. You can start with [a premade theme](https://github.com/hupe1980/gatsby-theme-material-ui).
