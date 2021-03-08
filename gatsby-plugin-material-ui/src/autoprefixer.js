import postcss from "postcss";
import autoprefixer from "autoprefixer";
import { parseConfig } from "browserslist";
import rcConfig from "!!raw-loader!/.browserslistrc";
import packageConfig from "!!raw-loader!/package.json";

export default function(css, pathname) {
  let browsersList;
  if (rcConfig) {
    browsersList = parseConfig(config);
  } else {
    browsersList = parseConfig(packageConfig);
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
