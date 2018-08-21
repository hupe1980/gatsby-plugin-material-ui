import React from 'react';
import { JssProvider } from 'react-jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  createGenerateClassName,
  MuiThemeProvider,
} from '@material-ui/core/styles';

// Remove the server-side injected CSS.
export const onInitialClientRender = () => {
  const ssStyles = window.document.getElementById('server-side-jss');
  ssStyles && ssStyles.parentNode.removeChild(ssStyles);
};

const defaultOptions = {
  theme: {},
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'jss',
};

exports.wrapRootElement = ({ element }, options = defaultOptions) => () => {
  const { dangerouslyUseGlobalCSS, productionPrefix, theme } = options;

  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS,
    productionPrefix,
  });

  return (
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline />
        {element}
      </MuiThemeProvider>
    </JssProvider>
  );
};
