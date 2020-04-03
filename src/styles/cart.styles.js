export const cartWrapperStyles = {
	flexFlow: "column wrap",
	backgroundColor: "white",
	padding: 2,
	marginTop: 2,
	borderRadius: 1,
	boxShadow: 1
};

export const totalPriceStyles = {
	marginLeft: "auto",
	color: "text",
	fontWeight: "bold"
};

export const cartItem = {
	display: "flex",
	flexFlow: "row wrap",
	paddingTop: 1,
	paddingBottom: 1,
	alignItems: "center",
	borderBottom: props => `1px solid ${props.colors.grays[6]}`
};

export const variantStyles = {
	fontSize: 0,
	color: "grays.3",
	lineHeight: 2
};

export const productPriceStyles = {
	color: "grays.3",
	marginLeft: "auto"
};

export const continueShoppingStyles = { marginBottom: 2, color: "grays.4" };
