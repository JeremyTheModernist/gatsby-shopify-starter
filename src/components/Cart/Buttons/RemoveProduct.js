/** @jsx jsx */
import { jsx, Styled, Text } from "theme-ui";
import React from "react";

import { removeCartItem } from "../HelperFns/index";
import StoreContext from "../../../StoreContext/index";

import { removeButtonStyles } from "./styles";

var { useContext } = React;

const RemoveProduct = props => {
	//  get access to all of my current items in my cart through the store.
	var [store, setStore] = useContext(StoreContext);
	return (
		<Text
			onClick={() => removeCartItem(store, setStore, props)}
			variant={"interactive.toPrimary"}
			as={"h6"}
			sx={removeButtonStyles}
		>
			Remove
		</Text>
	);
};

export default RemoveProduct;
