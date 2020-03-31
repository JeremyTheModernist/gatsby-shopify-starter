/** @jsx jsx */
import { jsx, Flex, Styled, Text } from "theme-ui";
import { Link } from "gatsby";
import Cart from "../Cart/index";

import { containerStyles } from "./styles";

const Navigation = () => {
	return (
		<Flex sx={containerStyles}>
			<Link sx={{ marginRight: "auto" }} to="/">
				<Text variant={"interactive.toPrimary"} as={"h4"}>
					Modernist Design Books
				</Text>
			</Link>
			<Cart />
		</Flex>
	);
};

export default Navigation;
