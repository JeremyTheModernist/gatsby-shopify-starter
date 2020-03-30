/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button } from "theme-ui";
import { graphql } from "gatsby";
import Product from "../../components/Product";

export const query = graphql`
	query($handle: String!) {
		shopifyProduct(handle: { eq: $handle }) {
			handle
			title
			variants {
				title
				shopifyId
				availableForSale
				price
				id
			}
			description
			images {
				localFile {
					childImageSharp {
						fluid {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`;

const ProductPage = props => {
	var { shopifyProduct } = props.data;
	return <Product product={shopifyProduct} />;
};

export default ProductPage;
