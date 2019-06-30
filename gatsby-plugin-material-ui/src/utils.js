import postcss from "postcss";
import autoprefixer from "autoprefixer";

export function hasEntries(object) {
  if (!object) return false;

  return Object.entries(object).length > 0;
}

export function prefix(css, pathname) {
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
