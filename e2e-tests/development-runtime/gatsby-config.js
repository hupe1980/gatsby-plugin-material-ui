module.exports = {
  plugins: [
    `gatsby-plugin-top-layout`,
    {
      resolve: `gatsby-plugin-material-ui`,
      // If you want to use styled components you should change the injection order.
      options: {
        pathToStylesProvider: `src/utils/styles-provider-props`,
      },
    },
    // If you want to use styled components you should add the plugin here.
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
  ],
  siteMetadata: {
    title: `My page`,
  },
};
