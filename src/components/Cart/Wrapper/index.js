/** @jsx jsx */
import { jsx, Flex, Styled, Button } from "theme-ui";
import styled from "@emotion/styled";
import { Link } from "gatsby";

import { getTotalPrice } from "../HelperFns/index";

import CheckoutButton from "../Buttons/CheckoutButton";
import LineItems from "../LineItems/index";

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

const Wrapper = props => {
	var { isCartVisible, isVisible, setVisible, added } = props;
	var totalPrice = getTotalPrice(added);
	return (
		<CartContainer
			// check to see if cart has been triggered by a click or adding a product.
			// show or hide the cart depending on the user action.
			className={isVisible || isCartVisible ? "showCart" : "hideCart"}
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
			<LineItems added={added} />
			<Flex
				sx={{
					alignItems: "center",
					marginTop: 2
				}}
			>
				<Link to="/cart">
					<Button
						variant="primary"
						onClick={() => {
							setVisible(false);
						}}
					>
						View Cart
					</Button>
				</Link>

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
	);
};

export default Wrapper;
