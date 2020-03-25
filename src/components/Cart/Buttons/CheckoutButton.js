/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button } from "theme-ui";
import React from "react";
import StoreContext from "../../../StoreContext/index";
import {
	addCheckoutItems,
	createShopifyCheckout,
	resetCheckoutItems
} from "../HelperFns";

var { useContext } = React;

const CheckoutButton = props => {
	//  get access to the Variant ID from GraphQL
	console.log("VARIANTE ID", props.variantId);

	//  retrieve client from context;
	var [store, setStore] = useContext(StoreContext);

	const createNewCheckout = () => {
		// updated the Checkout Items right before a user clicks checkout
		// Do all of the Cart Manipulation without Shopify API,
		// Only need Shopify API when a user checks out.
		addCheckoutItems(store, setStore);
		//  use my helper function
		createShopifyCheckout(store);
		// clear shopify items from app storage
		resetCheckoutItems(setStore);
		// clear the local storage when a user decides to checkout
		// this doesn't go into affect until after the user refreshes the window.
		localStorage.clear();
	};
	//  I render props children, b/c I may want to make the logic of checkout available without dictating
	//  the UI that surrounds it.
	//  this allows me to use custom buttons
	return <div onClick={createNewCheckout}>{props.children}</div>;
};

export default CheckoutButton;
