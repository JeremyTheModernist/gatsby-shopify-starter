/** @jsx jsx */
import { jsx, Flex, Styled } from "theme-ui";
import { Link } from "gatsby";
import Cart from "../Cart/index";

import { containerStyles, sitenameStyles } from "./styles";

import StoreContext from "../../StoreContext/index.js";

const Navigation = () => {
	return (
		<Flex sx={containerStyles}>
			<Link
				sx={{
					color: "inherit",
					textDecoration: "none",
					marginRight: "auto"
				}}
				to="/"
			>
				<Styled.h4 sx={sitenameStyles}>
					Modernist Design Books
				</Styled.h4>
			</Link>
			<Cart />
		</Flex>
	);
};

export default Navigation;
