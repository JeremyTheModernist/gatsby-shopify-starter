/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button } from "theme-ui";
import { css, keyframes } from "@emotion/core";
import React from "react";
import CheckoutButton from "./Buttons/CheckoutButton";
import CartItem from "./CartItem/index";

import StoreContext from "../../StoreContext/index";
import { getTotalItems, getTotalPrice } from "./HelperFns/index";

import { fadeInAnimation, fadeOutAnimation } from "../../styles/animations";

var { useState, useEffect, useContext, createRef } = React;

const Cart = () => {
	var [store, setStore] = useContext(StoreContext);
	var { added } = store;
	//  toggle the cart
	var [isVisible, setVisible] = useState(false);

	var totalItems = getTotalItems(added);
	var totalPrice = getTotalPrice(added);
	var cartRef = createRef();

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
	var toggleCart = () => {
		setVisible(!isVisible);
	};
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

			{(isVisible || store.isCartVisible) && (
				<Container
					variant="small"
					css={css`
						${isVisible || store.isCartVisible
							? fadeInAnimation
							: fadeOutAnimation}
					`}
					sx={{
						backgroundColor: "white",
						marginTop: 2,
						border: `1px solid rgba(0,0,0,.1)`,
						borderRadius: 1,
						boxShadow: 1,
						position: "absolute",
						right: 0
					}}
				>
					<>
						<CartItem added={added} />
						<Flex
							sx={{
								alignItems: "center",
								marginTop: 2
							}}
						>
							<Button variant="primary">View Cart</Button>
							<CheckoutButton />
							<Styled.li
								sx={{
									marginLeft: "auto",
									color: "grays.0"
								}}
							>
								${totalPrice}
							</Styled.li>
						</Flex>
					</>
				</Container>
			)}
		</Flex>
	);
};

export default Cart;
