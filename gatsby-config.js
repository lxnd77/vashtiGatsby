module.exports = {
  siteMetadata: {
    title: `Vashti Kalvi`,
    description: `A website to store Vashti Kalvi's portfolio and blog.`,
    author: `Rishabh Bhargava`,
  },
  plugins: [
    
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-image`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
        resolve: 'gatsby-source-prismic-graphql',
        options: {
            repositoryName: 'vashti', // (REQUIRED, replace with your own)
            linkResolver: () => post => `/${post.uid}`,
        }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `vashti-kalvi-website`,
        short_name: `vashti-kalvi`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
        cache_busting_mode: `none`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-tawk`,
    //   options: {
    //     tawkId: "5f5457e34704467e89ec7fe0",
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
          trackingId: "UA-177768005-1",
          head: true,
      },
    },
    
    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
    
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
