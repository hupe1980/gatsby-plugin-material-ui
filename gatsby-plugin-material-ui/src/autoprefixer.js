import postcss from "postcss";
import autoprefixer from "autoprefixer";
import { parseConfig } from "browserslist";
import packageConfig from "!!raw-loader!/package.json";

export default function(css, pathname) {
  let browsersList;
  if (packageConfig && packageConfig.browserslist) {
    browsersList = packageConfig.browserslist;
  } else {
    const rcConfig = require("!!raw-loader!/.browserslistrc");
    browsersList = parseConfig(rcConfig).defaults;
  }

  const prefixer = postcss([
    autoprefixer({ overrideBrowserslist: browsersList }),
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
