import { ServerStyleSheets } from '@material-ui/styles';

// Keep track of sheets for each page
const globalLeak = new Map();

export const wrapRootElement = ({ element, pathname }, pluginOptions) => {
  const sheets = new ServerStyleSheets(pluginOptions.stylesProvider);
  globalLeak.set(pathname, sheets);

  return sheets.collect(element);
};

export const onRenderBody = ({ setHeadComponents, pathname }) => {
  const sheets = globalLeak.get(pathname);
  if (sheets) {
    setHeadComponents([sheets.getStyleElement()]);
    globalLeak.delete(pathname);
  }
};
