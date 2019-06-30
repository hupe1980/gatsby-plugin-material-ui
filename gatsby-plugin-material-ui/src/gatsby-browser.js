import React from "react";
import { StylesProvider } from "@material-ui/styles";

import { hasEntries } from "./utils";

import stylesProviderProps from "./.cache/styles-provider-props";

export const onInitialClientRender = () => {
  if (process.env.BUILD_STAGE === `develop`) {
    return;
  }

  // Remove the server-side injected CSS.
  const jssStyles = document.querySelector(`#jss-server-side`);
  if (jssStyles) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
};

export const wrapRootElement = ({ element }, pluginOptions) => {
  if (hasEntries(stylesProviderProps) && pluginOptions.stylesProvider) {
    throw new Error(
      `You specified both pathToStylesProvider and stylesProvider in gatsby-config.js. Remove one of them.`,
    );
  }

  const stylesProvider = hasEntries(stylesProviderProps)
    ? stylesProviderProps
    : pluginOptions.stylesProvider;

  if (!stylesProvider) {
    return element;
  }

  return <StylesProvider {...stylesProvider}>{element}</StylesProvider>;
};
