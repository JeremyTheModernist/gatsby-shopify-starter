// calculate cart Total:
// get the total value of all items in cart by retrieving all the added items and adding up price * quantity for each
export const getTotalPrice = added => {
	var cartTotal = added.reduce((accVal, curVal) => {
		var { price } = curVal.variants[0];
		var { quantity } = curVal;
		return (accVal += price * quantity);
	}, 0);
	return cartTotal;
};

export const getTotalItems = added => {
	// measure totals by grabbing them out of the store.
	// used to display total number `3 items in cart`
	var totalItems = 0;
	//  need to measure all items in the "added" property
	added.forEach(item => {
		totalItems += item.quantity;
	});
	return totalItems;
};

export const addCartItem = (productDetails, added, count) => {
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
	return added;
};

//  a function to remove items from the cart
export const removeCartItem = ({ added }, setStore, props) => {
	setStore(curStore => {
		//  look at the current store and remove the on that the user has selected.
		var updatedAdded = added.filter(item => {
			// need to return all items that DO NOT match the removed items title
			// I get access to title from the Cart.js component;
			return !item.title.includes(props.title);
		});
		// set the local storage:
		localStorage.setItem(`added`, JSON.stringify(updatedAdded));
		// now need to updated the store
		return {
			...curStore,
			added: updatedAdded
		};
	});
};

export const addLocalStorageToCart = setStore => {
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
};

//  a function that triggers the cart for a certain amount of time
export function triggerCart(setStore) {
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

export const addCheckoutItems = ({ ShopifyCheckout }, setStore) => {
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
			// pass client and added back to store
			...curStore,
			ShopifyCheckout
		};
	});
};

//  destructure these properties out of the App Store
export const createShopifyCheckout = ({ client, ShopifyCheckout }) => {
	client.checkout
		.create()
		.then(checkout => {
			console.log("checkout", checkout.lineItems);
			return checkout;
		})
		.then(checkout => {
			//  pull each item out of my Global State and insert it for all the Line Items for
			//  shopify's checkout experience
			// console.log("CHECKOUT LINE ITEMS", [...ShopifyCheckout.lineItems]);
			client.checkout
				.addLineItems(checkout.id, [...ShopifyCheckout.lineItems])
				.then(res => {
					console.log("adding a checkout", res);
					// open the checkout in a new tab:
					window.open(res.webUrl, "_blank");
				});
		})
		.catch(e => {
			console.log("a checkout error occured", e);
		});
};

export const resetCheckoutItems = setStore => {
	setStore(curStore => {
		//  return ShopifyCheckout to Empty
		var ShopifyCheckout = { lineItems: [] };
		return {
			// pass client and added back to store
			...curStore,
			ShopifyCheckout
		};
	});
};
