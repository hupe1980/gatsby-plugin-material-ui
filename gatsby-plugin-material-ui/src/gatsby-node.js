import fs from 'fs';
import path from 'path';
import os from 'os';

// Write out the gatsby-mui-config module to .cache.
// Happens before webpack starts compiling page.
// .cache is available when gatsby-browser.js and gatsby-ssr.js runs.

export const onPreBootstrap = ({ store }, pluginOptions) => {
  const { program } = store.getState();

  const fixPath = module => {
    let newModule = module;
    if (os.platform() === `win32`) {
      newModule = module.split(`\\`).join(`\\\\`);
    }
    return newModule;
  };

  let module;

  // Not allowed to specify both pathToStylesProvider and StylesProvider props
  // in gatsby-config.js
  try {
    if (pluginOptions.pathToStylesProvider && pluginOptions.stylesProvider) {
      throw new Error(
        `You specified both pathToStylesProvider and stylesProvider in gatsby-config.js. Only one should be specified...`,
      );
    }

    if (pluginOptions.stylesProvider) {
      module = `const stylesProviderProps = ${JSON.stringify(
        pluginOptions.stylesProvider,
      )};

export default stylesProviderProps;
`;
    } else if (pluginOptions.pathToStylesProvider) {
      module = `import stylesProviderProps from "${
        path.isAbsolute(pluginOptions.pathToStylesProvider)
          ? pluginOptions.pathToStylesProvider
          : path.join(program.directory, pluginOptions.pathToStylesProvider)
      }";
export default stylesProviderProps;
`;

      module = fixPath(module);
    } else {
      module = `const stylesProviderProps = {
injectFirst: true,
};

export default stylesProviderProps;
`;
    }

    const dir = `${__dirname}/.cache`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(`${dir}/styles-provider-props.js`, module);
  } catch (e) {
    console.error(e.name + `: ` + e.message);
  }
};
