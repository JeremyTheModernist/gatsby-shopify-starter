/** @jsx jsx */
import { jsx, Flex, Container } from "theme-ui";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Context from "../Provider/ContextProvider";

const Index = props => {
	return (
		<Context>
			<Flex
				sx={{
					minHeight: `100vh`,
					flexFlow: "column"
				}}
			>
				<Navigation />
				<Container variant="full">{props.children}</Container>
				<Footer />
			</Flex>
		</Context>
	);
};

export default Index;
