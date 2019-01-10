import React from 'react';
import { JssProvider } from 'react-jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  createGenerateClassName,
  MuiThemeProvider,
  jssPreset,
} from '@material-ui/core/styles';
import { create } from 'jss';

const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});

// Add the JSS insertion point comment to the top of the head.
export const onClientEntry = () => {
  const styleNode = window.document.createComment('jss-insertion-point');
  window.document.head.insertBefore(styleNode, window.document.head.firstChild);
};

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

export const wrapRootElement = ({ element }, options) => {
  const { dangerouslyUseGlobalCSS, productionPrefix, theme } = {
    ...defaultOptions,
    ...options,
  };

  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS,
    productionPrefix,
  });

  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline />
        {element}
      </MuiThemeProvider>
    </JssProvider>
  );
};
