import React from 'react';
import { SheetsRegistry } from 'jss';
import {
  createGenerateClassName,
  StylesProvider,
  ThemeProvider,
  install,
} from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// This installation step is temporary.
// Behind the scenes, the install() function switches the styling engine the core components use.
install();

const defaultOptions = {
  theme: {},
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'jss',
  seed: '',
};

const sheetsRegistryMap = new Map();

export const wrapRootElement = ({ element, pathname }, options) => {
  const { dangerouslyUseGlobalCSS, productionPrefix, seed, theme } = {
    ...defaultOptions,
    ...options,
  };

  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS,
    productionPrefix,
    seed,
  });

  const sheetsRegistry = new SheetsRegistry();
  sheetsRegistryMap.set(pathname, sheetsRegistry);

  return (
    <StylesProvider
      sheetsRegistry={sheetsRegistry}
      sheetsManager={new Map()}
      generateClassName={generateClassName}
    >
      <ThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline />
        {element}
      </ThemeProvider>
    </StylesProvider>
  );
};

export const onRenderBody = ({ setHeadComponents, pathname }) => {
  const sheetsRegistry = sheetsRegistryMap.get(pathname);

  if (sheetsRegistry) {
    setHeadComponents([
      <style
        type="text/css"
        id="server-side-jss"
        key="server-side-jss"
        dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() }}
      />,
    ]);

    sheetsRegistryMap.delete(pathname);
  }
};
