export const components = {
	layout: {
		full: {
			maxWidth: 5,
			margin: `auto`
		},
		medium: {
			width: 2,
			padding: 2
		},
		small: {
			width: 1,
			padding: 1
		}
	},
	buttons: {
		primary: {
			cursor: "pointer",
			borderRadius: 0,
			fontWeight: "bold",
			color: "white",
			background: "primary",
			paddingTop: 1,
			paddingBottom: 1,
			paddingLeft: 2,
			paddingRight: 2,
			transition: props => `${props.transitions[0]}s`,
			"&:hover": {
				background: props => props.colors.grays[0],
				transition: props => `${props.transitions[0]}s`
			}
		},
		secondary: {
			cursor: "pointer",
			borderRadius: 0,
			fontWeight: "bold",
			color: "primary",
			border: props => `1px solid ${props.colors.primary}`,
			backgroundColor: "grays.7",
			paddingTop: 1,
			paddingBottom: 1,
			paddingLeft: 2,
			paddingRight: 2,
			transition: props => `${props.transitions[0]}s`,
			"&:hover": {
				background: props => props.colors.primary,
				color: "white",
				transition: props => `${props.transitions[0]}s`
			}
		},
		disabled: {
			cursor: "pointer",
			borderRadius: 0,
			fontWeight: "bold",
			color: "white",
			backgroundColor: "grays.4",
			padding: props => `${props.space[1]}px ${props.space[2]}px`
		}
	},
	forms: {
		medium: {
			padding: 1
		}
	}
};
