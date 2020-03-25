// calculate cart Total:
//  get the total value of all items in cart by retrieving all the added items and adding up price * quantity for each
export function getTotalPrice(added) {
	var cartTotal = added.reduce((accVal, curVal) => {
		var { price } = curVal.variants[0];
		var { quantity } = curVal;
		return (accVal += price * quantity);
	}, 0);
	return cartTotal;
}

export function getTotalItems(added) {
	// measure totals by grabbing them out of the store.
	// used to display total number `3 items in cart`
	var totalItems = 0;
	//  need to measure all items in the "added" property
	added.forEach(item => {
		totalItems += item.quantity;
	});
	return totalItems;
}

//  a function that triggers the cart for a certain amount of time
export function triggerCart(store, setStore) {
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

export function addItemToCart(productDetails, added, count) {
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
}

export function createShopifyCheckout(client, ShopifyCheckout) {
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
					window.open(res.webUrl);
				});
		})
		.catch(e => {
			console.log("a checkout error occured", e);
		});
	// clear the local storage when a user decides to checkout
	// this doesn't go into affect until after the user refreshes the window.
	localStorage.clear();
}
