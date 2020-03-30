export const containerStyles = {
	padding: 2,
	alignItems: "baseline",
	backgroundColor: "white",
	boxShadow: 0
};

export const sitenameStyles = {
	transition: props => `${props.transitions[0]}s`,
	"&:hover": {
		color: "primary",
		transition: props => `${props.transitions[0]}s`
	}
};
