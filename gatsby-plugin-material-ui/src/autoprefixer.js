import postcss from "postcss";
import autoprefixer from "autoprefixer";
import { browserslist } from "gatsby";

export default function(css, pathname) {
  const supportedBrowsers = browserslist();

  const prefixer = postcss([
    autoprefixer({ overrideBrowserslist: supportedBrowsers }),
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
