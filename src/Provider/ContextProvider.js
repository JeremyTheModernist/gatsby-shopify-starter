import React from "react";
import StoreContext from "../StoreContext/index";
import { addLocalStorageToCart } from "../components/Cart/HelperFns/index";

import Client from "shopify-buy";

var { useEffect, useState } = React;

console.log(
	"CLIENT INTIATING WITH ENV VARIABLES!",
	process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
	process.env.GATSBY_SHOP_NAME
);

const client = Client.buildClient({
	// must precede env names with GATSBY to make them available in client
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
		addLocalStorageToCart(setStore);
	}, []);
	return (
		<StoreContext.Provider value={[store, setStore]}>
			{props.children}
		</StoreContext.Provider>
	);
};

export default ContextProvider;
