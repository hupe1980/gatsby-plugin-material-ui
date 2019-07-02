import postcss from "postcss";
import autoprefixer from "autoprefixer";

export default function(css, pathname) {
  const prefixer = postcss([autoprefixer]);

  try {
    return prefixer.process(css, { from: undefined }).css;
  } catch (error) {
    if (error.name === `CssSyntaxError`) {
      throw new Error(`Pathname: ${pathname} ${error.toString()}`);
    }
    throw error;
  }
}
