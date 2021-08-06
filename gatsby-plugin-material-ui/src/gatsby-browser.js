import React from "react";
import { CacheProvider } from "@emotion/react";
import getEmotionCache from "./get-emotion-cache";

const cache = getEmotionCache();

export const wrapRootElement = ({ element }) => {
  return <CacheProvider value={cache}>{element}</CacheProvider>;
};
