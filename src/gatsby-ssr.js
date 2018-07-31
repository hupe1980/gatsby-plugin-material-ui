import React from 'react';
import { renderToString } from 'react-dom/server';
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

exports.replaceRenderer = (
  { bodyComponent, replaceBodyHTMLString, setHeadComponents },
  options = defaultOptions,
) => {
  const { dangerouslyUseGlobalCSS, productionPrefix, theme } = options;

  const sheetsRegistry = new SheetsRegistry();

  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS,
    productionPrefix,
  });

  const bodyHTML = renderToString(
    <JssProvider
      registry={sheetsRegistry}
      generateClassName={generateClassName}
    >
      <MuiThemeProvider theme={createMuiTheme(theme)} sheetsManager={new Map()}>
        <CssBaseline />
        {bodyComponent}
      </MuiThemeProvider>
    </JssProvider>,
  );

  replaceBodyHTMLString(bodyHTML);

  const css = sheetsRegistry.toString();

  setHeadComponents([
    <style
      type="text/css"
      id="server-side-jss"
      key="server-side-jss"
      dangerouslySetInnerHTML={{ __html: css }}
    />,
  ]);
};
