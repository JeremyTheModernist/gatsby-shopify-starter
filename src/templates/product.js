/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button } from "theme-ui";
import { graphql } from "gatsby";
import AddToCart from "../components/AddToCart";
import OutOfStock from "../components/Cart/Buttons/OutOfStock";
import Img from "gatsby-image";

export const query = graphql`
	query($handle: String!) {
		shopifyProduct(handle: { eq: $handle }) {
			handle
			title
			variants {
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

const Product = props => {
	console.log("product props", props);
	var { shopifyProduct } = props.data;
	return (
		<Flex>
			<Container variant="medium">
				<Img
					fluid={
						shopifyProduct.images[0].localFile.childImageSharp.fluid
					}
				></Img>
				<Styled.h2>{shopifyProduct.title}</Styled.h2>
				<Styled.p>{shopifyProduct.description}</Styled.p>
				<Styled.h3>{shopifyProduct.variants[0].price} USD</Styled.h3>
				<AddToCart
					//  must use the variant id to specify to Shopify which "variant" a customer is buying
					//  pass down all of the data I retrieve for each product
					//  then I can use throughout all of my components
					productDetails={shopifyProduct}
				/>
			</Container>
		</Flex>
	);
};

export default Product;

// switch between in stock / out of stock
// {shopifyProduct.variants[0].availableForSale ? (
//     <AddToCart
//         //  must use the variant id to specify to Shopify which "variant" a customer is buying
//         //  pass down all of the data I retrieve for each product
//         //  then I can use throughout all of my components
//         productDetails={shopifyProduct}
//     />
// ) : (
//     <OutOfStock />
// )}
