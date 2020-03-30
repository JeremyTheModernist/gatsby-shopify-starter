/** @jsx jsx */
import { jsx, Flex, Text } from "theme-ui";
import React from "react";
import { Link, graphql, navigate } from "gatsby";
import { containerStyles } from "./styles";

const Footer = () => {
	return (
		<Flex sx={containerStyles}>
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
