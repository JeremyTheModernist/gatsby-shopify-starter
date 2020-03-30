/** @jsx jsx */
import { jsx, Flex, Styled, Container } from "theme-ui";
import AddToCart from "../AddToCart";
import OutOfStock from "../Cart/Buttons/OutOfStock";
import Img from "gatsby-image";

const Product = props => {
	var { product } = props;
	return (
		<Flex>
			<Container variant="medium">
				<Img
					fluid={product.images[0].localFile.childImageSharp.fluid}
				></Img>
				<Styled.h2>{product.title}</Styled.h2>
				<Styled.p>{product.description}</Styled.p>
				<AddToCart
					//  pass down all of the data I retrieve for each product
					//  then I can use to add the right products to the cart when Add to Cart is clicked.
					product={product}
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
//         product={shopifyProduct}
//     />
// ) : (
//     <OutOfStock />
// )}
