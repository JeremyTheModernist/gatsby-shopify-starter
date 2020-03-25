/** @jsx jsx */
import { jsx, Styled, Button } from "theme-ui";

const OutOfStock = props => {
	return (
		<Button disabled variant={"disabled"}>
			Out of Stock
		</Button>
	);
};

export default OutOfStock;
