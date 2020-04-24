import React from "react";
import { ServerStyleSheets } from "@material-ui/styles";
import CleanCSS from "clean-css";

import stylesProviderProps from "material-ui-plugin-cache-endpoint";

import { hasEntries } from "./utils";
import autoprefixer from "./autoprefixer";

// Keep track of sheets for each page
const globalLeak = new Map();
const cleanCSS = new CleanCSS();

export const wrapRootElement = ({ element, pathname }, pluginOptions) => {
  if (hasEntries(stylesProviderProps) && pluginOptions.stylesProvider) {
    throw new Error(
      `You specified both pathToStylesProvider and stylesProvider in gatsby-config.js. Remove one of them.`,
    );
  }

  const stylesProvider = hasEntries(stylesProviderProps)
    ? stylesProviderProps
    : pluginOptions.stylesProvider;

  const sheets = new ServerStyleSheets(stylesProvider);
  globalLeak.set(pathname, sheets);

  return sheets.collect(element);
};

export const onRenderBody = (
  { setHeadComponents, pathname },
  { disableAutoprefixing = false, disableMinification = false },
) => {
  const sheets = globalLeak.get(pathname);

  if (!sheets) {
    return;
  }

  let css = sheets.toString();

  css = disableAutoprefixing ? css : autoprefixer(css, pathname);
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
