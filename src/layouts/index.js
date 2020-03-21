/** @jsx jsx */
import { jsx, Flex, Styled, Container, Button } from "theme-ui";
import React from "react";
import Navigation from "../components/Navigation";
import Context from "../Provider/ContextProvider";

const Index = props => {
	return (
		<Context>
			<div>
				<Navigation />
				<Container variant="full">{props.children}</Container>
			</div>
		</Context>
	);
};

export default Index;
