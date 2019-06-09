import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import stylesProviderProps from './.cache/styles-provider-props';

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

// Pass through all StylesProvider props
export const wrapRootElement = ({ element }, pluginOptions) => {
  return pluginOptions.stylesProvider ? (
    <StylesProvider {...stylesProviderProps}>{element}</StylesProvider>
  ) : (
    element
  );
};
