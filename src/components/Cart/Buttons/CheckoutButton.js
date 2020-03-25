/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button } from "theme-ui";
import React from "react";
import StoreContext from "../../../StoreContext/index";
import { createShopifyCheckout } from "../HelperFns";

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
				console.log("SHOPIFY CHECKOUT ITEMS", ShopifyCheckout);
			});
			return {
				client,
				added,
				ShopifyCheckout
			};
		});
	};
	const removeShopifyItems = () => {
		setStore(curStore => {
			//  return ShopifyCheckout to Empty
			var ShopifyCheckout = { lineItems: [] };
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
		//  use my helper function
		createShopifyCheckout(client, ShopifyCheckout);
		// clear shopify items from app storage
		removeShopifyItems();
	};
	//  I render props children, b/c I may want to make the logic of checkout available without dictating
	//  the UI that surrounds it.
	//  this allows me to use custom buttons
	return <div onClick={createNewCheckout}>{props.children}</div>;
};

export default CheckoutButton;
