import React from 'react';
import { create } from 'jss';
import {
  createGenerateClassName,
  StylesProvider,
  ThemeProvider,
  jssPreset,
  install,
} from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// This installation step is temporary.
// Behind the scenes, the install() function switches the styling engine the core components use.
install();

const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});

export const onClientEntry = () => {
  // Add the JSS insertion point comment to the top of the head.
  const styleNode = window.document.createComment('jss-insertion-point');
  window.document.head.insertBefore(styleNode, window.document.head.firstChild);
};

export const onInitialClientRender = () => {
  // Remove the server-side injected CSS.
  const ssStyles = window.document.getElementById('server-side-jss');
  ssStyles && ssStyles.parentNode.removeChild(ssStyles);
};

const defaultOptions = {
  theme: {},
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'jss',
  seed: '',
};

export const wrapRootElement = ({ element }, options) => {
  const { dangerouslyUseGlobalCSS, productionPrefix, seed, theme } = {
    ...defaultOptions,
    ...options,
  };

  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS,
    productionPrefix,
    seed,
  });

  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <ThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline />
        {element}
      </ThemeProvider>
    </StylesProvider>
  );
};
