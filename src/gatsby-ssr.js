import React from 'react';
import { JssProvider, SheetsRegistry } from 'react-jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createGenerateClassName,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';

const defaultOptions = {
  theme: {},
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'jss',
};

const sheetsRegistryMap = new Map();

export const wrapRootElement = ({ element, pathname }, options) => {
  const { dangerouslyUseGlobalCSS, productionPrefix, theme } = {
    ...defaultOptions,
    ...options,
  };

  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS,
    productionPrefix,
  });

  const sheetsRegistry = new SheetsRegistry();
  sheetsRegistryMap.set(pathname, sheetsRegistry);

  return (
    <JssProvider
      registry={sheetsRegistry}
      generateClassName={generateClassName}
    >
      <MuiThemeProvider theme={createMuiTheme(theme)} sheetsManager={new Map()}>
        <CssBaseline />
        {element}
      </MuiThemeProvider>
    </JssProvider>
  );
};

export const onRenderBody = ({ setHeadComponents, pathname }) => {
  const sheetsRegistry = sheetsRegistryMap.get(pathname);

  if (sheetsRegistry) {
    setHeadComponents([
      <style
        id="server-side-jss"
        key="server-side-jss"
        dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() }}
      />,
    ]);

    sheetsRegistryMap.delete(pathname);
  }
};
