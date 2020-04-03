/** @jsx jsx */
import { jsx, Text, Styled } from "theme-ui";
import RemoveProduct from "../Buttons/RemoveProduct";
import Img from "gatsby-image";

import {
	containerStyles,
	itemWrapperStyles,
	variantStyles,
	productPriceStyles
} from "./styles";

import { v4 as uuidv4 } from "uuid";

const LineItems = props => {
	var { added } = props;
	return added.map((item, i) => {
		return (
			<div sx={containerStyles} key={uuidv4()}>
				<li sx={{ width: "20%", marginRight: 1 }}>
					<Img
						fluid={item.images[0].localFile.childImageSharp.fluid}
					></Img>
				</li>
				<div sx={itemWrapperStyles}>
					<Text variant="body" as="li">
						{item.title}
					</Text>
					{renderVariantTitle(item)}
					{/* need to pass a unique ID to remove, so it knows which item to remove
                            from the Global State Added Property
                            we will use title here
                        */}
					<RemoveProduct shopifyId={item.chosenVariant.shopifyId} />
				</div>

				<Text variant="body" sx={productPriceStyles} as="li">
					{item.chosenVariant.quantity} x {item.chosenVariant.price}
				</Text>
			</div>
		);
	});
};

export default LineItems;

const renderVariantTitle = item => {
	return item.variants.length > 1 ? (
		<li sx={variantStyles}>{item.chosenVariant.title}</li>
	) : null;
};
