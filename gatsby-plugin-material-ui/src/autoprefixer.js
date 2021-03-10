import postcss from "postcss";
import autoprefixer from "autoprefixer";
import { loadCachedConfig } from "babel-preset-gatsby";

export default function(css, pathname) {
  const { browserslist } = loadCachedConfig();

  const prefixer = postcss([
    autoprefixer({ overrideBrowserslist: browserslist }),
  ]);

  try {
    return prefixer.process(css, { from: null }).css;
  } catch (error) {
    if (error.name === `CssSyntaxError`) {
      throw new Error(`Pathname: ${pathname} ${error.toString()}`);
    }
    throw error;
  }
}
