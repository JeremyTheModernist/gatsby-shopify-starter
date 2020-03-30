/** @jsx jsx */
import { jsx, Spinner } from "theme-ui";
import React from "react";
import StoreContext from "../../../StoreContext/index";
import {
	addCheckoutItems,
	createShopifyCheckout,
	resetCheckoutItems
} from "../HelperFns";

var { useContext, useState } = React;

const CheckoutButton = props => {
	//  retrieve client from context;
	var [store, setStore] = useContext(StoreContext);
	//  create the state for your spinner
	var [state, setState] = useState(false);

	const createNewCheckout = () => {
		//  change to spinner
		toggleSpinner();
		console.log("spinner state", state);
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
	const toggleSpinner = () => {
		//  change to spinner
		setState(true);
		setTimeout(() => {
			setState(false);
		}, 5000);
	};
	//  I render props children, b/c I may want to make the logic of checkout available without dictating
	//  the UI that surrounds it.
	//  this allows me to use custom buttons
	return (
		<div onClick={createNewCheckout}>
			{state ? <Spinner sx={{ marginLeft: 2 }} /> : props.children}
		</div>
	);
};

export default CheckoutButton;
