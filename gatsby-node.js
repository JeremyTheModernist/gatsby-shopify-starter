const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
	var { createPage } = actions;

	const result = await graphql(`
		query {
			allShopifyProduct {
				edges {
					node {
						handle
					}
				}
			}
		}
	`);

	result.data.allShopifyProduct.edges.forEach(({ node }) => {
		createPage({
			path: `/product/${node.handle}`,
			component: path.resolve(
				__dirname,
				`./src/templates/ProductPage/index.js`
			),
			context: {
				handle: node.handle
			}
		});
	});
};
