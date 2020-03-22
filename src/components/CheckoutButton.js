/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button } from "theme-ui";
import React from "react";
import StoreContext from "../StoreContext/index";

var { useState, useContext } = React;

const CheckoutButton = props => {
	//  get access to the Variant ID from GraphQL
	console.log("VARIANTE ID", props.variantId);
	var [count, setCount] = useState(0);

	//  retrieve client from context;
	var [store, setStore] = useContext(StoreContext);
	var { client, added, ShopifyCheckout } = store;

	const addItemsToShopify = () => {
		setStore(curStore => {
			// add all the cartItems to Shopify Checkout
			curStore.added.forEach(item => {
				console.log(item.variants[0].shopifyId);
				var ShopifyItem = {
					variantId: item.variants[0].shopifyId,
					quantity: item.quantity
				};
				ShopifyCheckout.lineItems.push(ShopifyItem);
			});
			return {
				client,
				added,
				ShopifyCheckout
			};
		});
	};

	const createNewCheckout = () => {
		// updated the Checkout Items right before a user clicks checkout
		// Do all of the Cart Manipulation without Shopify API,
		// Only need Shopify API when a user checks out.
		addItemsToShopify();
		console.log(
			"checkout button + state",
			client,
			"client checkout create",
			client.checkout.create()
		);
		client.checkout
			.create()
			.then(checkout => {
				console.log("checkout", checkout.lineItems);
				return checkout;
			})
			.then(checkout => {
				//  pull each item out of my Global State and insert it for all the Line Items for
				//  shopify's checkout experience
				console.log("CHECKOUT LINE ITEMS", [
					...ShopifyCheckout.lineItems
				]);
				client.checkout
					.addLineItems(checkout.id, [...ShopifyCheckout.lineItems])
					.then(res => {
						console.log("adding a checkout", res);
						window.open(res.webUrl);
					});
			})
			.catch(e => {
				console.log("a checkout error occured", e);
			});
		// clear the local storage when a user decides to checkout
		// this doesn't go into affect until after the user refreshes the window.
		localStorage.clear();
	};
	return (
		<>
			<Button
				variant="secondary"
				onClick={createNewCheckout}
				sx={{
					backgroundColor: "white",
					alignSelf: "flex-end"
				}}
			>
				Checkout
			</Button>
		</>
	);
};

export default CheckoutButton;
