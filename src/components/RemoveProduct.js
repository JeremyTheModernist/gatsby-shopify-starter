/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import React from "react";

import StoreContext from "../StoreContext/index";

var { useState, useContext } = React;

const RemoveProduct = props => {
	//  get access to all of my current items in my cart through the store.
	var [store, setStore] = useContext(StoreContext);

	//  a function to remove items from the cart
	const removeCartItem = () => {
		setStore(curStore => {
			//  look at the current store and remove the on that the user has selected.
			var updatedAdded = curStore.added.filter(item => {
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
	return (
		<Styled.h5
			onClick={removeCartItem}
			sx={{
				textTransform: "uppercase",
				color: "grays.4",
				cursor: "pointer",
				letterSpacing: props => `${props.letterSpacing[2]}em`,
				transition: props => `${props.transitions[0]}s`,
				"&:hover": {
					transition: props => `${props.transitions[0]}s`,
					color: "primary"
				}
			}}
		>
			Remove
		</Styled.h5>
	);
};

export default RemoveProduct;
