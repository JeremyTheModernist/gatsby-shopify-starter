export const containerStyles = {
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

export const titleStyles = {
	color: "text",
	fontSize: 1,
	lineHeight: 2
};

export const itemWrapperStyles = {
	display: "flex",
	flexFlow: "column nowrap",
	width: "50%"
};
