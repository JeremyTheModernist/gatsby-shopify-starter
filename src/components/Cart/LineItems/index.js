/** @jsx jsx */
import { jsx, Container, Flex, Styled } from "theme-ui";
import RemoveProduct from "../Buttons/RemoveProduct";
import Img from "gatsby-image";

const LineItems = props => {
	var { added } = props;
	return added.map((item, i) => {
		return (
			<Container variant={"cartItem"} key={i}>
				<li sx={{ width: "20%" }}>
					<Img
						fluid={item.images[0].localFile.childImageSharp.fluid}
					></Img>
				</li>
				<Flex
					sx={{
						flexFlow: "column nowrap",
						width: "50%"
					}}
				>
					<Styled.li sx={{ marginBottom: 1 }}>{item.title}</Styled.li>
					{/* need to pass a unique ID to remove, so it knows which item to remove
                        from the Global State Added Property
                        we will use title here
                    */}
					<RemoveProduct title={item.chosenVariant.title} />
				</Flex>

				<Styled.li sx={{ marginLeft: "auto" }}>
					{item.chosenVariant.quantity} x {item.chosenVariant.price}
				</Styled.li>
			</Container>
		);
	});
};

export default LineItems;
