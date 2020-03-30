export const containerStyles = {
	width: ["100%", 1, 1],
	padding: 1,
	backgroundColor: "white",
	marginTop: 2,
	marginRight: [null, null, 2],
	border: `1px solid rgba(0,0,0,.1)`,
	borderRadius: 1,
	boxShadow: 2,
	position: "absolute",
	right: 0,
	"&.hideCart": {
		visibility: "hidden",
		opacity: 0,
		transition: "0.2s ease-in-out"
	},
	"&.showCart": {
		visibility: "visible",
		opacity: 1,
		transition: "0.2s ease-in-out"
	}
};

export const buttonWrapperStyles = {
	display: "flex",
	flexFlow: "row wrap",
	alignItems: "center",
	marginTop: 2
};

export const checkoutButtonStyles = {
	backgroundColor: "white",
	marginLeft: 1,
	alignSelf: "flex-end"
};

export const priceStyles = {
	marginLeft: "auto",
	color: "grays.0",
	fontSize: 1
};
