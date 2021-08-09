import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { renderToString } from "react-dom/server";

import emotionCacheProps from "material-ui-plugin-cache-endpoint";

import getEmotionCache from "./get-emotion-cache";

export const replaceRenderer = ({
  bodyComponent,
  setHeadComponents,
  replaceBodyHTMLString,
}) => {
  const cache = getEmotionCache(emotionCacheProps);
  const { extractCriticalToChunks } = createEmotionServer(cache);

  const emotionStyles = extractCriticalToChunks(
    renderToString(
      <CacheProvider value={cache}>{bodyComponent}</CacheProvider>,
    ),
  );

  setHeadComponents(
    emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(` `)}`}
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    )),
  );

  // render the result from `extractCritical`
  replaceBodyHTMLString(emotionStyles.html);
};
