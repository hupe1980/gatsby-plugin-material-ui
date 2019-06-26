import React from "react";
import { ServerStyleSheets } from "@material-ui/styles";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import CleanCSS from "clean-css";
import stylesProviderProps from "./.cache/styles-provider-props";

// Keep track of sheets for each page
const globalLeak = new Map();
const prefixer = postcss([autoprefixer]);
const cleanCSS = new CleanCSS();

export const wrapRootElement = ({ element, pathname }, pluginOptions) => {
  const stylesProvider = stylesProviderProps || pluginOptions.stylesProvider;

  if (stylesProviderProps && pluginOptions.stylesProvider) {
    throw new Error(
      `You specified both pathToStylesProvider and stylesProvider in gatsby-config.js. Remove one of them.`,
    );
  }

  const sheets = new ServerStyleSheets(stylesProvider);
  globalLeak.set(pathname, sheets);

  return sheets.collect(element);
};

export const onRenderBody = (
  { setHeadComponents, pathname },
  pluginOptions,
) => {
  const sheets = globalLeak.get(pathname);

  if (!sheets) {
    return;
  }

  const {
    disableAutoprefixing = false,
    disableMinification = false,
  } = pluginOptions;

  let css = sheets.toString();

  css = disableAutoprefixing
    ? css
    : prefixer.process(css, { from: undefined }).css;
  css = disableMinification ? css : cleanCSS.minify(css).styles;

  setHeadComponents([
    <style
      id="jss-server-side"
      key="jss-server-side"
      dangerouslySetInnerHTML={{ __html: css }}
    />,
  ]);

  globalLeak.delete(pathname);
};
