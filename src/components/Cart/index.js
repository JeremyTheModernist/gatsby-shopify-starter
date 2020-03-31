/** @jsx jsx */
import { jsx, Flex, Styled, Text } from "theme-ui";
import React from "react";

import StoreContext from "../../StoreContext/index";
import { getTotalItems } from "./HelperFns/index";

import Wrapper from "./Wrapper/index";

import { cartTextStyles } from "./styles";

var { useState, useEffect, useContext, createRef } = React;

const Cart = () => {
	var [store, setStore] = useContext(StoreContext);
	var { added, isCartVisible } = store;
	//  toggle the cart
	var [isVisible, setVisible] = useState(false);

	var totalItems = getTotalItems(added);
	var cartRef = createRef();

	var toggleCart = () => {
		setVisible(!isVisible);
	};

	var WrapperProps = {
		isCartVisible,
		isVisible,
		setVisible,
		added
	};

	// have cart disappear if someone clicks on the window.
	function handleClickOutside(event) {
		// make sure the click is not on the cartRef;
		if (cartRef.current && !cartRef.current.contains(event.target)) {
			setVisible(false);
		}
	}
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});

	return (
		<Flex
			ref={cartRef}
			sx={{
				zIndex: 10
			}}
		>
			<Text
				sx={cartTextStyles}
				variant={"interactive.toBlack"}
				as={"p"}
				onClick={toggleCart}
			>
				{totalItems} items in Cart
			</Text>
			<Wrapper {...WrapperProps} />
		</Flex>
	);
};

export default Cart;
