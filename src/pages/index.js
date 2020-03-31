/** @jsx jsx */
import { jsx, Flex, Container, Button, Text } from "theme-ui";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import { siteDescriptionStyles } from "../styles/index.styles";

const Index = props => {
	var {
		allShopifyProduct,
		site: { siteMetadata }
	} = props.data;

	return (
		<div>
			<div sx={{ marginLeft: 2, marginRight: 2 }}>
				<Text
					variant={"display"}
					sx={{ marginTop: 4, textAlign: "center" }}
					as="h1"
				>
					{siteMetadata.title}
				</Text>
				<Text variant="body" sx={siteDescriptionStyles} as="p">
					{siteMetadata.description}
				</Text>
			</div>

			<Flex sx={{ flexFlow: "row wrap" }}>
				{allShopifyProduct.edges.map(({ node }, i) => {
					return (
						<Container variant="medium" key={i}>
							<Img
								fluid={
									node.images[0].localFile.childImageSharp
										.fluid
								}
							></Img>
							<Text
								variant="title"
								sx={{ marginTop: 1, marginBottom: 1 }}
								as="h2"
							>
								{node.title}
							</Text>
							{/* use Gatsby Link component, to make it local begin with / */}
							<Link to={`/product/${node.handle}/`}>
								<Button variant="primary">View Product</Button>
							</Link>
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
