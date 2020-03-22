/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button } from "theme-ui";
import { graphql, navigate } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import StoreContext from "../StoreContext/index";

var { useContext } = React;

const Index = props => {
	var {
		allShopifyProduct,
		site: { siteMetadata }
	} = props.data;
	console.log(allShopifyProduct);
	var [store, setStore] = useContext(StoreContext);
	console.log("my context!", store);
	return (
		<div>
			<Styled.h1 sx={{ textAlign: "center" }}>
				{siteMetadata.title}
			</Styled.h1>
			<Styled.p sx={{ textAlign: "center" }}>
				{siteMetadata.description}
			</Styled.p>
			<Flex sx={{ flexFlow: "row wrap" }}>
				{allShopifyProduct.edges.map(({ node }, i) => {
					console.log(
						"image",
						node.images[0].localFile.childImageSharp.fluid
					);
					return (
						<Container variant="medium" key={i}>
							<Img
								fluid={
									node.images[0].localFile.childImageSharp
										.fluid
								}
							></Img>
							<Styled.h2>{node.title}</Styled.h2>
							<Button
								variant="primary"
								onClick={() =>
									navigate(`product/${node.handle}/`)
								}
							>
								View Product
							</Button>
							{/* <Styled.p>{node.description}</Styled.p> */}
						</Container>
					);
				})}
			</Flex>
		</div>
	);
};

export default Index;

export const query = graphql`
	query MyQuery {
		site {
			siteMetadata {
				title
				description
			}
		}
		allShopifyProduct {
			edges {
				node {
					images {
						localFile {
							childImageSharp {
								fluid {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
					title
					description
					handle
					priceRange {
						maxVariantPrice {
							amount
						}
					}
				}
			}
		}
	}
`;
