require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
	plugins: [
		{
			resolve: `gatsby-source-shopify`,
			options: {
				shopName: process.env.GATSBY_SHOP_NAME,
				accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN
			}
		},
		`gatsby-plugin-layout`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-theme-ui`,
		`gatsby-plugin-emotion`
	]
};
