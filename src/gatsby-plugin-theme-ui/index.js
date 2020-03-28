import { type } from "./type";
import { components } from "./components";

const theme = {
	...type,
	...components,
	space: [0, 15, 30, 45, 60, 90, 120],
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
	transitions: [0.5]
};

export default theme;
