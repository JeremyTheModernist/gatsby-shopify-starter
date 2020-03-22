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

// add and remove classNames:
