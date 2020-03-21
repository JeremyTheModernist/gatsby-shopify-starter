import React from "react";
import { navigate } from "gatsby";

const Success = () => {
	return (
		<div>
			Successfully placed your order!
			<button onClick={() => navigate("/")}></button>
		</div>
	);
};

export default Success;
