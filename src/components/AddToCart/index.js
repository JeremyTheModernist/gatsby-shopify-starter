/** @jsx jsx */
import { jsx, Flex, Styled, Button } from "theme-ui";
import React from "react";
import StoreContext from "../../StoreContext/index";
import renderVariants from "./variants";
import { triggerCart, addCartItem } from "../Cart/HelperFns";

import { amountStyles, containerStyles } from "./styles";

var { useState, useContext } = React;

const AddToCart = props => {
	//  get access to all of the product details passed from product template
	var { product } = props;

	//  by default just use the first variant that shopify supplies. only update if a user selects a different one.
	var [variant, setVariant] = useState(product.variants[0]);

	//  start product amount at 1
	var [amount, setAmount] = useState(1);

	//  retrieve the current store context;
	var [store, setStore] = useContext(StoreContext);
	var { added } = store;

	// a function to increment cart items.
	const incAmount = () => {
		setAmount(curState => {
			return (curState += 1);
		});
	};

	// a function to increment cart items.
	const decAmount = () => {
		setAmount(curState => {
			return (curState -= 1);
		});
	};

	const handleAddToCart = () => {
		addCartItem(product, variant, amount, added, setStore);
		triggerCart(setStore);
	};

	return (
		<div sx={containerStyles}>
			<Styled.h3 sx={{ marginTop: 1 }}>{variant.price} USD</Styled.h3>
			{renderVariants(product, setVariant)}
			<Flex>
				<Button
					variant="primary"
					onClick={handleAddToCart}
					sx={{ marginRight: 1 }}
				>
					Add Product
				</Button>
				<Flex sx={{ marginLeft: "auto" }}>
					<Button
						variant={"secondary"}
						onClick={decAmount}
						disabled={amount <= 1}
						sx={{ marginRight: 0, textAlign: "center" }}
					>
						-
					</Button>
					<Styled.h3 sx={amountStyles}>{amount}</Styled.h3>
					<Button variant="secondary" onClick={incAmount}>
						+
					</Button>
				</Flex>
			</Flex>
		</div>
	);
};

export default AddToCart;
