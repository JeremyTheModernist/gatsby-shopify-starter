/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button, Select } from "theme-ui";
import RemoveProduct from "../components/Cart/Buttons/RemoveProduct";
import CheckoutButton from "../components/Cart/Buttons/CheckoutButton";
import Img from "gatsby-image";
import React from "react";
import Store from "../StoreContext/index";
import {
	getTotalItems,
	getTotalPrice
} from "../components/Cart/HelperFns/index";

var { useContext } = React;

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
			selectedItem.chosenVariant.quantity = selectValue;
			// set the local storage:
			localStorage.setItem(`added`, JSON.stringify(added));
			// return the newly updated cart
			return (store = {
				...curStore,
				added
			});
		});
	};
	return (
		<Container variant="cartWrapperLarge">
			{getListItems(added, changeItemAmount)}
			<Flex sx={{ marginTop: 2 }}>
				<Styled.li
					sx={{
						marginLeft: "auto",
						color: "text",
						fontWeight: "bold"
					}}
				>
					Total: ${getTotalPrice(added)} USD
				</Styled.li>
			</Flex>
			<Flex sx={{ marginTop: 2 }}>
				<div sx={{ marginLeft: "auto" }}>
					<CheckoutButton>
						<Button variant="primary">Checkout</Button>
					</CheckoutButton>
				</div>
			</Flex>
		</Container>
	);
};

export default Cart;

function getListItems(added, changeItemAmount) {
	if (added.length > 0) {
		return added.map((item, i) => {
			return (
				<Container variant={"cartItem"} key={i}>
					<li sx={{ width: "10%", marginRight: 2 }}>
						<Img
							fluid={
								item.images[0].localFile.childImageSharp.fluid
							}
						></Img>
					</li>
					<Flex
						sx={{
							flexFlow: "column nowrap",
							width: "50%"
						}}
					>
						<Styled.li>{item.title}</Styled.li>
						{renderVariantTitle(item)}
						{/* need to pass a unique ID to remove, so it knows which item to remove
                            from the Global State Added Property
                            we will use title here
                        */}
						<RemoveProduct
							shopifyId={item.chosenVariant.shopifyId}
						/>
					</Flex>
					<Select
						// make sure it's value equals the items quantity
						// value={item.quantity}
						// use defaultValue for theme-ui select:
						variant="medium"
						sx={{ width: "90px" }}
						defaultValue={item.chosenVariant.quantity}
						onChange={e => {
							// this function get's passed the event and the index of the item
							changeItemAmount(e, i);
						}}
					>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
						<option value={5}>5</option>
					</Select>
					<Styled.li sx={{ marginLeft: "auto" }}>
						{item.chosenVariant.quantity} x{" "}
						{item.chosenVariant.price}
					</Styled.li>
				</Container>
			);
		});
	} else return;
}

const renderVariantTitle = item => {
	return item.variants.length > 1 ? (
		<Styled.li
			sx={{
				fontSize: 0
			}}
		>
			{item.chosenVariant.title}
		</Styled.li>
	) : null;
};
