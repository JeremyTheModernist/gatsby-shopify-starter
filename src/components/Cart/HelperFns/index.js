// calculate cart Total:
// get the total value of all items in cart by retrieving all the added items and adding up price * quantity for each
export const getTotalPrice = added => {
	var cartTotal = 0;
	if (added.length > 0) {
		cartTotal = added.reduce((totalPrice, product) => {
			var { chosenVariant } = product;
			var { price, quantity } = chosenVariant;
			return (totalPrice += price * quantity);
		}, 0);
	}
	return cartTotal;
};

// used to display total number `3 items in cart`
export const getTotalItems = added => {
	// measure totals by grabbing them out of the store.
	var totalItems = 0;
	//  need to measure all items in the "added" property
	if (added.length > 0) {
		added.forEach(item => {
			totalItems += item.chosenVariant.quantity;
		});
	}

	return totalItems;
};

//  added is all of the items currently added in my cart.
export const addCartItem = (product, variant, amount, added, setStore) => {
	//  product = all data around a product.
	//  variant = the specefic Shopify Item variant that was added
	//  amount is how many items we're added
	//  added = all added cart items

	//  figure out if the item exists in your cart already and what index it is
	var itemIndex = added.findIndex(item => {
		// find the item with a variant that includes the incoming variant.
		return item.chosenVariant.shopifyId.includes(variant.shopifyId);
	});
	//  if the cart does include the item then just increment its quantity by
	//  the amount selected on the product
	if (itemIndex > -1) {
		added[itemIndex].chosenVariant.quantity += amount;
	}
	//  if it doesn't include the item, then push a whole new item to the cart
	//  this includes all of the products data
	//  create a new property on added called chosenVariant, that represents the selected variant.
	else {
		added.push({
			...product,
			chosenVariant: { ...variant, quantity: amount }
		});
	}
	// set the local storage:
	localStorage.setItem(`added`, JSON.stringify(added));

	// updated global cart items
	setStore(curStore => {
		return {
			...curStore,
			added
		};
	});
};

//  a function to remove items from the cart
export const removeCartItem = ({ added }, setStore, props) => {
	if (added.length > 0) {
		setStore(curStore => {
			//  look at the current store and remove the on that the user has selected.
			var updatedAdded = added.filter(item => {
				// need to return all items that DO NOT match the removed item's shopify ID.
				// I get access to shopifyId from the LineItems component;
				return !item.chosenVariant.shopifyId.includes(props.shopifyId);
			});

			// set the local storage:
			localStorage.setItem(`added`, JSON.stringify(updatedAdded));
			// now need to updated the store
			return {
				...curStore,
				added: updatedAdded
			};
		});
	}
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
			// when using ShopifyBuy API, you only need the Shopify Variant ID,
			// and the variant quantity for each product
			var ShopifyItem = {
				variantId: item.chosenVariant.shopifyId,
				quantity: item.chosenVariant.quantity
			};
			ShopifyCheckout.lineItems.push(ShopifyItem);
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
	// browsers will block pop ups, if they are not directly triggered by users.
	// so we immediately open a new tab, and then populate it once async call is finished.
	var checkoutWindow = window.open("", "_blank");

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
					// window.open(res.webUrl, "_blank");
					checkoutWindow.location.href = res.webUrl;
					// can also use this https://www.npmjs.com/package/detect-browser to provide different behaviors
					// for different browsers, like open in same tab for safari to bypass pop-up blockers.
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
