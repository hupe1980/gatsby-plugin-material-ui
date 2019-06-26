module.exports = {
  plugins: [
    `gatsby-plugin-top-layout`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        pathToStylesProvider: `src/styles-provider-props`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
  siteMetadata: {
    title: `My page`,
  },
};
