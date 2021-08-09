module.exports = {
  plugins: [
    `gatsby-plugin-top-layout`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        pathToEmotionCacheProps: `src/emotion-cache-props`,
      },
    },
  ],
  siteMetadata: {
    title: `My page`,
  },
};
