export const type = {
	fonts: {
		body:
			'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
	},
	lineHeights: [1, 1.25, 1.5],
	letterSpacing: [-0.1, 0, 0.1],
	fontSizes: [13, 16, 21, 26, 34, 48, 54, 63],
	fontWeights: {
		heading: "bold",
		normal: "normal"
	},
	text: {
		display: {
			letterSpacing: "-.01em",
			fontWeight: "heading",
			fontSize: [5, 6, 7]
		},
		title: {
			fontSize: 3,
			lineHeight: 1,
			fontWeight: "heading"
		},
		body: {
			fontSize: [1],
			lineHeight: 2,
			fontWeight: "normal"
		},
		caps: {
			textTransform: "uppercase",
			letterSpacing: ".2em"
		},
		caption: {
			fontSize: 0,
			color: "grays.3",
			lineHeight: 2
		},
		interactive: {
			toBlack: {
				cursor: "pointer",
				transition: props => `${props.transitions[0]}s`,
				"&:hover": {
					color: "text",
					transition: props => `${props.transitions[0]}s`
				}
			},
			toPrimary: {
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
			},
			a: {
				color: "inherit",
				textDecoration: "none"
			}
		}
	}
};
