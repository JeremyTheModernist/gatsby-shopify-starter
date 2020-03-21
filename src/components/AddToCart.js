/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button } from "theme-ui";
import React from "react";
import StoreContext from "../StoreContext/index";

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
			//  added is all of the items currently added in my cart.
			//  adding quantity to show how many of each item

			//  figure out if the item exists in your cart already and what index it is
			var itemIndex = added.findIndex(item => {
				return item.title.includes(productDetails.title);
			});
			//  if the cart does include the item then just increment its quantity by
			//  the count selected on the product
			if (itemIndex > -1) {
				added[itemIndex].quantity += count;
			}
			//  if it doesn't include the item, then push a whole new item to the cart
			//  this includes all of the products data
			else {
				added.push({ ...productDetails, quantity: count });
			}
			// set the local storage:
			localStorage.setItem(`added`, JSON.stringify(added));
			// return the newly updated cart
			return (store = {
				client,
				added,
				ShopifyCheckout
			});
		});
		triggerCart(store, setStore);
		console.log("state line items", ShopifyCheckout);
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

//  a function that triggers the cart for a certain amount of time
function triggerCart(store, setStore) {
	setStore(curStore => {
		return {
			...curStore,
			isCartVisible: true
		};
	});
	setTimeout(() => {
		setStore(curStore => {
			return {
				...curStore,
				isCartVisible: false
			};
		});
	}, 3000);
}
