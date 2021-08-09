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

exports.pluginOptionsSchema = ({ Joi }) => {
    return Joi.object({
        pathToEmotionCacheProps: Joi.string()
            .default(``)
            .description(
                `The path to the emotion cache props (See https://emotion.sh/docs/@emotion/cache#createcache).`
            ),
    })
}

// Copy and past from https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-typography
exports.onPreBootstrap = ({ store, cache }, pluginOptions) => {
    const program = store.getState().program;

    let module;
    if (pluginOptions.pathToEmotionCacheProps) {
        module = `module.exports = require("${path.isAbsolute(pluginOptions.pathToEmotionCacheProps)
            ? pluginOptions.pathToEmotionCacheProps
            : path.join(program.directory, pluginOptions.pathToEmotionCacheProps)
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

    fs.writeFileSync(path.join(dir, `emotion-cache-props.js`), module);
};

// Copy and past from https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-typography
exports.onCreateWebpackConfig = ({ actions, cache }) => {
    const cacheFile = path.join(cache.directory, `emotion-cache-props.js`);
    const { setWebpackConfig } = actions;
    setWebpackConfig({
        resolve: {
            alias: {
                "material-ui-plugin-cache-endpoint": cacheFile,
            },
        },
    });
};