/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button } from "theme-ui";
import React from "react";
import StoreContext from "../StoreContext/index";
import { triggerCart, addItemToCart } from "./Cart/HelperFns";

var { useState, useContext } = React;

const AddToCart = props => {
	//  get access to all of the product details passed from product template
	var { productDetails } = props;
	//  start product count at 1
	var [count, setCount] = useState(1);

	//  retrieve the current store context;
	var [store, setStore] = useContext(StoreContext);
	var { client, ShopifyCheckout, added } = store;
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

	const addCartItem = () => {
		setStore(curStore => {
			added = addItemToCart(productDetails, added, count);
			// return the newly updated cart
			return (store = {
				client,
				added,
				ShopifyCheckout
			});
		});
		triggerCart(store, setStore);
	};

	return (
		<Flex>
			<Button variant="primary" onClick={addCartItem}>
				Add Product
			</Button>
			<Button
				variant="secondary"
				onClick={incCount}
				sx={{ marginLeft: "auto", marginRight: 0 }}
			>
				+
			</Button>
			<Styled.h3 sx={{ color: "primary", marginLeft: 2, marginRight: 2 }}>
				{count}
			</Styled.h3>
			<Button variant="secondary" onClick={decCount}>
				-
			</Button>
		</Flex>
	);
};

export default AddToCart;
