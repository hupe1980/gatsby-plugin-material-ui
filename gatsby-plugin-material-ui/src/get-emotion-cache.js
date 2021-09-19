import createCache from "@emotion/cache";

export default function getEmotionCache(props) {
  return createCache(props ?? { key: `css` });
}
