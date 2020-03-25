/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button } from "theme-ui";
import styled from "@emotion/styled";
import React from "react";
import CheckoutButton from "./Buttons/CheckoutButton";
import CartItem from "./CartItem/index";
import { navigate } from "gatsby";

import StoreContext from "../../StoreContext/index";
import { getTotalItems, getTotalPrice } from "./HelperFns/index";

var { useState, useEffect, useContext, createRef } = React;

const CartContainer = styled.div`
	&.hideCart {
		visibility: hidden;
		opacity: 0;
		transition: 0.2s ease-in-out;
	}
	&.showCart {
		visibility: visible;
		opacity: 1;
		transition: 0.2s ease-in-out;
	}
`;

const Cart = () => {
	var [store, setStore] = useContext(StoreContext);
	var { added } = store;
	//  toggle the cart
	var [isVisible, setVisible] = useState(false);

	var totalItems = getTotalItems(added);
	console.log("TOTAL ITEMS", totalItems);
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

			<CartContainer
				// check to see if cart has been triggered by a click or adding a product.
				// show or hide the cart depending on the user action.
				className={
					isVisible || store.isCartVisible ? "showCart" : "hideCart"
				}
				sx={{
					width: `400px`,
					padding: 1,
					backgroundColor: "white",
					marginTop: 2,
					border: `1px solid rgba(0,0,0,.1)`,
					borderRadius: 1,
					boxShadow: 2,
					position: "absolute",
					right: 0
				}}
			>
				{/* pass "added" state to Cart Item */}
				<CartItem added={added} />
				<Flex
					sx={{
						alignItems: "center",
						marginTop: 2
					}}
				>
					<Button
						variant="primary"
						onClick={() => {
							navigate(`/cart`);
							toggleCart();
						}}
					>
						View Cart
					</Button>
					<CheckoutButton>
						<Button
							variant="secondary"
							sx={{
								backgroundColor: "white",
								marginLeft: 1,
								alignSelf: "flex-end"
							}}
						>
							Checkout
						</Button>
					</CheckoutButton>
					<Styled.li
						sx={{
							marginLeft: "auto",
							color: "grays.0",
							marginRight: 1
						}}
					>
						${totalPrice}
					</Styled.li>
				</Flex>
			</CartContainer>
		</Flex>
	);
};

export default Cart;
