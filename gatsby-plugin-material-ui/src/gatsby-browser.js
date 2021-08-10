import React from "react";
import { CacheProvider } from "@emotion/react";

import emotionCacheProps from "material-ui-plugin-cache-endpoint";

import getEmotionCache from "./get-emotion-cache";

const cache = getEmotionCache(emotionCacheProps);

export const wrapRootElement = ({ element }) => {
  return <CacheProvider value={cache}>{element}</CacheProvider>;
};
