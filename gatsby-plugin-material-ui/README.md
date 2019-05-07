# gatsby-plugin-material-ui

> A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin for
> [@material-ui/styles](https://github.com/mui-org/material-ui) with
> built-in server-side rendering support.

This is the plugin for Material-UI v4. The plugin for v3 can be found [here](https://github.com/hupe1980/gatsby-plugin-material-ui/tree/master).

## Install

`npm install --save gatsby-plugin-material-ui@next @material-ui/styles@next`

## How to use

Edit `gatsby-config.js`

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      // If you want to use styled components, in conjunction to Material-UI, you should:
      // - Change the injection order by adding a gatsby-mui-config.js and specifying the path in pluginConfigModule (e.g. src/utils/gatsby-mui-config.js)
      // - Add the plugin
      options: {
        disableAutoprefixing: false,
        disableMinification: false,
        // stylesProvider: { // <StylesProvider /> props
        //   injectFirst: true,
        // },
        pathToStylesProvider: 'src/utils/styles-provider-props',
      },
    },
  ],
};
```

## gatsby-config.js Options

- Either specify `StylesProvider` props directly here in the `stylesProvider` property, or in a file pointed too by `pathToStylesProvider`. Do not specify both, it will throw an error
- disableAutoprefixing/disableMinification: (Boolean) See below
- We provide the option to specify the `StylesProvider` props in a separate fle (`pathToStylesProvider`) in order to support adding a custom insertion point. Se below for instructions

Example `styles-provider-props.js`:

```javascript
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
  // serverGenerateClassName: () => {},
  // sheetsCache: {},
  // sheetsManager: {},
  // sheetsRegistry: {},
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

You can find an official integration example of this plugin [on Material-UI side](https://github.com/mui-org/material-ui/tree/next/examples/gatsby-next), then you can pick one of the [Page Layout Examples](https://next.material-ui.com/getting-started/page-layout-examples/).

If you want to save time with a more opinionated solution. You can start with [a premade theme](https://github.com/hupe1980/gatsby-theme-material-ui).