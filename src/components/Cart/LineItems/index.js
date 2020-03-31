/** @jsx jsx */
import { jsx, Text, Styled } from "theme-ui";
import RemoveProduct from "../Buttons/RemoveProduct";
import Img from "gatsby-image";

import {
	containerStyles,
	itemWrapperStyles,
	titleStyles,
	variantStyles
} from "./styles";

const LineItems = props => {
	var { added } = props;
	if (added.length > 0) {
		return added.map((item, i) => {
			return (
				<div sx={containerStyles} key={i}>
					<li sx={{ width: "20%" }}>
						<Img
							fluid={
								item.images[0].localFile.childImageSharp.fluid
							}
						></Img>
					</li>
					<div sx={itemWrapperStyles}>
						<li sx={titleStyles}>{item.title}</li>
						{renderVariantTitle(item)}
						{/* need to pass a unique ID to remove, so it knows which item to remove
                            from the Global State Added Property
                            we will use title here
                        */}
						<RemoveProduct
							shopifyId={item.chosenVariant.shopifyId}
						/>
					</div>

					<Styled.li sx={{ marginLeft: "auto" }}>
						{item.chosenVariant.quantity} x{" "}
						{item.chosenVariant.price}
					</Styled.li>
				</div>
			);
		});
	} else {
		return null;
	}
};

export default LineItems;

const renderVariantTitle = item => {
	return item.variants.length > 1 ? (
		<li sx={variantStyles}>{item.chosenVariant.title}</li>
	) : null;
};
