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

	var [variant, setVariant] = useState(null);

	//  start product count at 1
	var [count, setCount] = useState(1);

	//  retrieve the current store context;
	var [store, setStore] = useContext(StoreContext);
	var { added } = store;
	console.log("YOUR VARIANTS", productDetails.variants);
	console.log("ADDED ITEMS", added);

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
			added = addCartItem(productDetails, added, count);
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
							// this function get's passed the event and the index of the item
							console.log("SELECT MENU VALUE", e.target.value);
							setVariant(e.target.value);
						}}
					>
						{productDetails.variants.map((variant, i) => {
							return (
								<option value={variant.shopifyId}>
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
