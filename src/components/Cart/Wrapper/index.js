/** @jsx jsx */
import { jsx, Flex, Styled, Button, Container } from "theme-ui";
import { Link } from "gatsby";

import { getTotalPrice } from "../HelperFns/index";

import CheckoutButton from "../Buttons/CheckoutButton";
import LineItems from "../LineItems/index";

const Wrapper = props => {
	var { isCartVisible, isVisible, setVisible, added } = props;
	var totalPrice = getTotalPrice(added);
	return (
		<Container
			variant={"cartWrapper"}
			// check to see if cart has been triggered by a click or adding a product.
			// show or hide the cart depending on the user action.
			className={isVisible || isCartVisible ? "showCart" : "hideCart"}
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
		</Container>
	);
};

export default Wrapper;
