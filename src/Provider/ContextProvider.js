import React from "react";
import StoreContext from "../StoreContext/index";

import Client from "shopify-buy";

import { useStaticQuery, graphql } from "gatsby";

var { useEffect, useState } = React;

console.log(
	"CLIENT INTIATING WITH ENV VARIABLES!",
	process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
	process.env.GATSBY_SHOP_NAME
);

const client = Client.buildClient({
	storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
	domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`
});

// set the original items
const initialeStoreState = {
	// your Shopify Client, used for async tasks like checking out
	client,
	//  your Checkout Items ( for shopify checkout experience, to use with addLineItem API)
	//  this will only include the variantID, and the quantity properties
	ShopifyCheckout: { lineItems: [] },
	//  all products that have been added to cart ( for use of displaying them in CART UI)
	//  I get these items, by adding them through the AddToCart Button ( which gets access to Product Data passed from the Product Template)
	added: [],
	//  globally trigger Cart State when someone adds an item
	isCartVisible: false
};

// Provide StoreContext with some values;
const ContextProvider = props => {
	// createState
	var [store, setStore] = useState(initialeStoreState);
	useEffect(() => {
		// get any items that we're added in a previous session
		var added = JSON.parse(localStorage.getItem("added"));
		// make sure added ( your cart ) has items. If it does, then ...
		// update added with that current store
		if (added !== null) {
			setStore(curStore => {
				return {
					...curStore,
					added
				};
			});
		}
	}, []);
	return (
		<StoreContext.Provider value={[store, setStore]}>
			{props.children}
		</StoreContext.Provider>
	);
};

export default ContextProvider;
