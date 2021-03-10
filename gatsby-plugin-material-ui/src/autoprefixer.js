import postcss from "postcss";
import autoprefixer from "autoprefixer";
import package from "./package.json";

export default function(css, pathname) {
  const browserslist = package.browserslist
    ? package.browserslist
    : [`>0.25%`, `not dead`];

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
