/** @jsx jsx */
import { jsx, Flex, Styled, Button } from "theme-ui";
import { Link } from "gatsby";

import { getTotalPrice } from "../HelperFns/index";

import CheckoutButton from "../Buttons/CheckoutButton";
import LineItems from "../LineItems/index";

import {
	containerStyles,
	buttonWrapperStyles,
	checkoutButtonStyles,
	priceStyles
} from "./styles";

const Wrapper = props => {
	var { isCartVisible, isVisible, setVisible, added } = props;
	var totalPrice = getTotalPrice(added);
	return (
		<div
			sx={containerStyles}
			// check to see if cart has been triggered by a click or adding a product.
			// show or hide the cart depending on the user action.
			className={isVisible || isCartVisible ? "showCart" : "hideCart"}
		>
			{/* pass "added" state to Cart Item */}
			{added.length > 0 ? <LineItems added={added} /> : null}
			<div sx={buttonWrapperStyles}>
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
					<Button variant="secondary" sx={checkoutButtonStyles}>
						Checkout
					</Button>
				</CheckoutButton>
				<p sx={priceStyles}>${totalPrice}</p>
			</div>
		</div>
	);
};

export default Wrapper;
