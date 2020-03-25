const theme = {
	fonts: {
		body:
			'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
	},
	space: [0, 15, 30, 45, 60, 90, 120],
	lineHeights: [1, 1.25, 1.5],
	letterSpacing: [-0.1, 0, 0.1],
	fontSizes: [13, 16, 21, 26, 34, 48, 54, 63],
	fontWeights: {
		heading: "bold"
	},
	radii: [5, 8],
	shadows: [
		"0px 4px 4px rgba(0,0,0,.1)",
		"0px 8px 8px rgba(0,0,0,.15)",
		"0px 16px 16px rgba(0,0,0,.2)"
	],
	colors: {
		text: "#17171A",
		primary: "#7300CE",
		grays: [
			"black",
			"#17171A",
			"#45454D",
			"#737380",
			"#AAAAB2",
			"#C2C2CC",
			"#DADAE5",
			"#EDEDF2"
		],
		background: "white"
	},
	sizes: [200, 400, 600, 800, 1000, 1200],
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
	text: {
		caps: {
			textTransform: "uppercase",
			letterSpacing: ".2em"
		},
		body: {
			fontSize: [1]
		},
		display: {
			letterSpacing: "-.01em",
			fontWeight: "heading",
			fontSize: 7
		}
	},
	forms: {
		medium: {
			padding: 1
		}
	},
	styles: {
		root: {
			width: `100%`,
			fontFamily: "body",
			margin: "auto",
			color: "text",
			backgroundColor: "grays.7",
			li: {
				listStyleType: "none"
			}
		},
		h1: {
			fontSize: 4
		},
		h2: {
			fontSize: 3
		},
		h3: {
			fontSize: 2
		},
		h4: {
			fontSize: 1,
			margin: 0
		},
		h5: {
			fontSize: 0,
			margin: 0,
			padding: 0
		},
		p: {
			fontSize: 1,
			color: "grays.3",
			lineHeight: 2
		},
		li: {
			fontSize: 1,
			color: "grays.3",
			lineHeight: 2
		}
	},
	transitions: [0.5]
};

export default theme;
