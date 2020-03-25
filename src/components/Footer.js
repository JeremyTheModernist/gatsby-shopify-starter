/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button, Text } from "theme-ui";
import React from "react";
import { Link, graphql, navigate } from "gatsby";

const Footer = () => {
	return (
		<Flex
			sx={{
				backgroundColor: "grays.6",
				paddingTop: 3,
				paddingBottom: 6,
				paddingLeft: 3,
				paddingRight: 3,
				marginTop: 5,
				alignContent: "flex-start"
			}}
		>
			<Text variant="body" sx={{ color: "text" }}>
				Modernist Design Books
			</Text>
			<Text variant="body" sx={{ marginLeft: "auto", color: "text" }}>
				Established in 2020
			</Text>
		</Flex>
	);
};

export default Footer;
