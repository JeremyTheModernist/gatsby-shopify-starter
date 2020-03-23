/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button } from "theme-ui";
import RemoveProduct from "../components/Cart/Buttons/RemoveProduct";
import Img from "gatsby-image";
import React from "react";
import Store from "../StoreContext/index";

var { useContext, useState, createRef } = React;

const Cart = () => {
	var [store, setStore] = useContext(Store);
	var { added } = store;

	const changeItemAmount = (e, i) => {
		// convert the selected value into a number
		var selectValue = parseInt(e.target.value, 10);
		//  select the right item to update
		var selectedItem = added[i];
		setStore(curStore => {
			// i represents the items index.
			// find that item within the Global Store Added array
			// change it's quantity to whatever is selected in the drop down fieled
			// e.g. e.target.value
			selectedItem.quantity = selectValue;
			// set the local storage:
			localStorage.setItem(`added`, JSON.stringify(added));
			// return the newly updated cart
			return (store = {
				...curStore,
				added
			});
		});
	};
	return added.map((item, i) => {
		return (
			<Flex
				sx={{
					paddingTop: 1,
					paddingBottom: 1,
					alignItems: "start",
					borderBottom: props => `1px solid ${props.colors.grays[6]}`
				}}
				key={i}
			>
				<li sx={{ width: "20%" }}>
					<Img
						fluid={item.images[0].localFile.childImageSharp.fluid}
					></Img>
				</li>
				<Flex
					sx={{
						flexFlow: "column nowrap",
						width: "50%"
					}}
				>
					<Styled.li sx={{ marginBottom: 1 }}>{item.title}</Styled.li>
					{/* need to pass a unique ID to remove, so it knows which item to remove
	                    from the Global State Added Property
	                    we will use title here
	                */}
					<RemoveProduct title={item.title} />
				</Flex>
				<select
					// make sure it's value equals the items quantity
					value={item.quantity}
					onChange={e => {
						// this function get's passed the event and the index of the item
						changeItemAmount(e, i);
					}}
				>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
				</select>
				<Styled.li sx={{ marginLeft: "auto" }}>
					{item.quantity} x {item.variants[0].price}
				</Styled.li>
			</Flex>
		);
	});
};

export default Cart;
