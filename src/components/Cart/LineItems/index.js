/** @jsx jsx */
import { jsx, Flex, Styled } from "theme-ui";
import RemoveProduct from "../Buttons/RemoveProduct";
import Img from "gatsby-image";

const LineItems = props => {
	var { added } = props;
	return added.map((item, i) => {
		return (
			<Flex
				sx={{
					paddingTop: 1,
					paddingBottom: 1,
					alignItems: "start",
					borderBottom: props => `1px solid ${props.colors.grays[6]}`
				}}
				key={i}
			>
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
					<RemoveProduct title={item.title} />
				</Flex>

				<Styled.li sx={{ marginLeft: "auto" }}>
					{item.quantity} x {item.variants[0].price}
				</Styled.li>
			</Flex>
		);
	});
};

export default LineItems;
