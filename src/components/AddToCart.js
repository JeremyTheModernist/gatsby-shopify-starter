/** @jsx jsx */
import { jsx, Flex, Styled, Select, Button } from "theme-ui";
import React from "react";
import StoreContext from "../StoreContext/index";
import { triggerCart, addCartItem } from "./Cart/HelperFns";

var { useState, useContext, useRef } = React;

const AddToCart = props => {
	//  get access to all of the product details passed from product template
	var { productDetails } = props;
	console.log("PROD DETAILS", productDetails);

	//  by default just use the first variant that shopify supplies. only update if a user selects a different one.
	var [variant, setVariant] = useState(productDetails.variants[0]);

	//  start product count at 1
	var [count, setCount] = useState(1);

	//  retrieve the current store context;
	var [store, setStore] = useContext(StoreContext);
	var { added } = store;

	// a function to increment cart items.
	const incCount = () => {
		setCount(curState => {
			return (curState += 1);
		});
	};
	// a function to increment cart items.
	const decCount = () => {
		setCount(curState => {
			return (curState -= 1);
		});
	};

	const addItemToCart = () => {
		setStore(curStore => {
			added = addCartItem(productDetails, added, variant, count);
			// return the newly updated cart
			return (store = {
				...curStore,
				added
			});
		});
		triggerCart(setStore);
	};

	return (
		<Flex sx={{ display: "column", flexFlow: "column wrap" }}>
			{productDetails.variants.length > 1 && (
				<div sx={{ marginBottom: 2 }}>
					<Select
						// make sure it's value equals the items quantity
						// value={item.quantity}
						// use defaultValue for theme-ui select:
						variant="medium"
						defaultValue={productDetails.variants[0].title}
						onChange={e => {
							// this function get's passed the event
							// e.target.value represents the selected variant shopify ID.
							// use the Shopify ID to find the correct variant
							var selectedVariant = productDetails.variants.find(
								variant => {
									return variant.shopifyId === e.target.value;
								}
							);
							// pass that variant to your state
							setVariant(selectedVariant);
						}}
					>
						{productDetails.variants.map((variant, i) => {
							return (
								//  pass the variants unique shopify ID
								<option value={variant.shopifyId} key={i}>
									{variant.title}
								</option>
							);
						})}
					</Select>
				</div>
			)}
			<Flex>
				<Button
					variant="primary"
					onClick={addItemToCart}
					sx={{ marginRight: 1 }}
				>
					Add Product
				</Button>
				<Button
					variant="secondary"
					onClick={decCount}
					sx={{ marginLeft: "auto", marginRight: 0 }}
				>
					-
				</Button>
				<Styled.h3
					sx={{
						color: "primary",
						marginLeft: [1, 2, 2],
						marginRight: [1, 2, 2]
					}}
				>
					{count}
				</Styled.h3>
				<Button variant="secondary" onClick={incCount}>
					+
				</Button>
			</Flex>
		</Flex>
	);
};

export default AddToCart;
