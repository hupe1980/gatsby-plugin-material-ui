import React from 'react';
import { ServerStyleSheets } from '@material-ui/styles';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import CleanCSS from 'clean-css';

// Keep track of sheets for each page
const globalLeak = new Map();

const prefixer = postcss([autoprefixer]);
const cleanCSS = new CleanCSS();

const defaultOptions = {
  disableAutoprefixing: false,
  disableMinification: false,
};

export const wrapRootElement = ({ element, pathname }, pluginOptions) => {
  const sheets = new ServerStyleSheets(pluginOptions.stylesProvider);
  globalLeak.set(pathname, sheets);

  return sheets.collect(element);
};

export const onRenderBody = (
  { setHeadComponents, pathname },
  pluginOptions,
) => {
  const sheets = globalLeak.get(pathname);

  if (sheets) {
    const { disableAutoprefixing, disableMinification } = {
      ...defaultOptions,
      ...pluginOptions,
    };

    let css = sheets.toString();

    css = disableAutoprefixing ? css : prefixer.process(css).css;
    css = disableMinification ? css : cleanCSS.minify(css).styles;

    setHeadComponents([
      <style
        type="text/css"
        id="server-side-jss"
        key="server-side-jss"
        dangerouslySetInnerHTML={{ __html: css }}
      />,
    ]);

    globalLeak.delete(pathname);
  }
};
