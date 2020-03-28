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
		},
		cartItem: {
			display: "flex",
			flexFlow: "row wrap",
			paddingTop: 1,
			paddingBottom: 1,
			alignItems: "center",
			borderBottom: props => `1px solid ${props.colors.grays[6]}`
		},
		cartWrapper: {
			width: `400px`,
			padding: 1,
			backgroundColor: "white",
			marginTop: 2,
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
		}
	},
	buttons: {
		primary: {
			cursor: "pointer",
			borderRadius: 0,
			fontWeight: "bold",
			color: "white",
			background: "primary",
			padding: props => `${props.space[1]}px ${props.space[2]}px`,
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
			padding: props => `${props.space[1]}px ${props.space[2]}px`,
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
