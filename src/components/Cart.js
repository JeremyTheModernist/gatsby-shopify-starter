/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button } from "theme-ui";
import { css, keyframes } from "@emotion/core";
import React from "react";
import RemoveProduct from "../components/RemoveProduct";
import Img from "gatsby-image";
import CheckoutButton from "./CheckoutButton";

import StoreContext from "../StoreContext/index";

import { fadeInAnimation, fadeOutAnimation } from "../styles/animations";

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
	console.log("CART STORE", added);
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
						{added.map((item, i) => {
							return (
								<Flex
									sx={{
										paddingTop: 1,
										paddingBottom: 1,
										alignItems: "start",
										borderBottom: props =>
											`1px solid ${props.colors.grays[6]}`
									}}
									key={i}
								>
									<li sx={{ width: "20%" }}>
										<Img
											fluid={
												item.images[0].localFile
													.childImageSharp.fluid
											}
										></Img>
									</li>
									<Flex
										sx={{
											flexFlow: "column nowrap",
											width: "50%"
										}}
									>
										<Styled.li sx={{ marginBottom: 1 }}>
											{item.title}
										</Styled.li>
										{/* need to pass a unique ID to remove, so it knows which item to remove
                                        from the Global State Added Property
                                        we will use title here
                                    */}
										<RemoveProduct title={item.title} />
									</Flex>

									<Styled.li sx={{ marginLeft: "auto" }}>
										{item.quantity} x{" "}
										{item.variants[0].price}
									</Styled.li>
								</Flex>
							);
						})}
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

// calculate cart Total:
//  get the total value of all items in cart by retrieving all the added items and adding up price * quantity for each
function getTotalPrice(added) {
	var cartTotal = added.reduce((accVal, curVal) => {
		var { price } = curVal.variants[0];
		var { quantity } = curVal;
		return (accVal += price * quantity);
	}, 0);
	return cartTotal;
}

function getTotalItems(added) {
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
