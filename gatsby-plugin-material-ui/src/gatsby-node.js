const fs = require(`fs`);
const path = require(`path`);
const os = require(`os`);

let didRunAlready = false;

exports.onPreInit = () => {
  if (didRunAlready) {
    throw new Error(
      `You can only have a single instance of gatsby-plugin-material-ui in your gatsby-config.js`,
    );
  }

  didRunAlready = true;
};

// Copy and past from https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-typography
exports.onPreBootstrap = ({ store, cache }, pluginOptions) => {
  const program = store.getState().program;

  let module;
  if (pluginOptions.pathToStylesProvider) {
    module = `module.exports = require("${
      path.isAbsolute(pluginOptions.pathToStylesProvider)
        ? pluginOptions.pathToStylesProvider
        : path.join(program.directory, pluginOptions.pathToStylesProvider)
    }")`;
    if (os.platform() === `win32`) {
      module = module.split(`\\`).join(`\\\\`);
    }
  } else {
    module = `module.exports = null`;
  }

  const dir = cache.directory;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(path.join(dir, `styles-provider-props.js`), module);
};

// Copy and past from https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-typography
exports.onCreateWebpackConfig = ({ actions, cache }) => {
  const cacheFile = path.join(cache.directory, `styles-provider-props.js`);
  const { setWebpackConfig } = actions;
  setWebpackConfig({
    resolve: {
      alias: {
        "material-ui-plugin-cache-endpoint": cacheFile,
      },
    },
  });
};
