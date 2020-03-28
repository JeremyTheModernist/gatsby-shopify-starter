/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button, Text } from "theme-ui";
import { graphql, navigate, Link } from "gatsby";
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
			<div sx={{ marginLeft: 2, marginRight: 2 }}>
				<Text
					variant={"display"}
					sx={{ marginTop: 4, textAlign: "center" }}
				>
					{siteMetadata.title}
				</Text>
				<Styled.p sx={{ textAlign: "center", marginBottom: 3 }}>
					{siteMetadata.description}
				</Styled.p>
			</div>

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
							<Link to={`product/${node.handle}/`}>
								<Button
									variant="primary"
									// onClick={() =>
									// 	navigate(`product/${node.handle}/`)
									// }
								>
									View Product
								</Button>
							</Link>

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
