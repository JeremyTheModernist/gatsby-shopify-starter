export const type = {
	fonts: {
		body:
			'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
	},
	lineHeights: [1, 1.25, 1.5],
	letterSpacing: [-0.1, 0, 0.1],
	fontSizes: [13, 16, 21, 26, 34, 48, 54, 63],
	fontWeights: {
		heading: "bold"
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
			fontSize: [5, 6, 7]
		},
		interactive: {
			toBlack: {
				fontSize: 1,
				color: "grays.3",
				lineHeight: 2,
				cursor: "pointer",
				transition: props => `${props.transitions[0]}s`,
				"&:hover": {
					color: "text",
					transition: props => `${props.transitions[0]}s`
				}
			},
			toPrimary: {
				fontSize: 0,
				fontWeight: "bold",
				textTransform: "uppercase",
				letterSpacing: props => `${props.letterSpacing[2]}rem`,
				color: "grays.4",
				lineHeight: 2,
				cursor: "pointer",
				transition: props => `${props.transitions[0]}s`,
				"&:hover": {
					color: "primary",
					transition: props => `${props.transitions[0]}s`
				}
			}
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
	}
};
