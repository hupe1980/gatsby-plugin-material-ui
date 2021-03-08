import postcss from "postcss";
import autoprefixer from "autoprefixer";
import { getBrowsersList } from "gatsby/utils/browserslist";

export default function(css, pathname) {
  const browsersList = getBrowsersList();

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
