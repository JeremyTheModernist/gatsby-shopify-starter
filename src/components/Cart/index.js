/** @jsx jsx */
import { jsx, Flex, Styled } from "theme-ui";
import React from "react";

import StoreContext from "../../StoreContext/index";
import { getTotalItems } from "./HelperFns/index";

import Wrapper from "./Wrapper/index";

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
				position: "relative",
				zIndex: 10
			}}
		>
			<Styled.li
				onClick={toggleCart}
				sx={{
					cursor: "pointer",
					transition: props => `${props.transitions[0]}s`,
					"&:hover": {
						color: "text",
						transition: props => `${props.transitions[0]}s`
					}
				}}
			>
				{totalItems} items in Cart
			</Styled.li>
			<Wrapper {...WrapperProps} />
		</Flex>
	);
};

export default Cart;
