/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import React from "react";

import { removeCartItem } from "../HelperFns/index";
import StoreContext from "../../../StoreContext/index";

var { useContext } = React;

const RemoveProduct = props => {
	//  get access to all of my current items in my cart through the store.
	var [store, setStore] = useContext(StoreContext);

	return (
		<Styled.h5
			onClick={() => removeCartItem(store, setStore, props)}
			sx={{
				textTransform: "uppercase",
				color: "grays.4",
				cursor: "pointer",
				width: "15%",
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
