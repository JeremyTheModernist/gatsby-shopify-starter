/** @jsx jsx */
import { jsx, Select } from "theme-ui";

const renderVariants = (product, setVariant) => {
	return (
		// if the product has more than the Shopify default of one variant, then render a select field.
		product.variants.length > 1 && (
			<div sx={{ marginBottom: 2 }}>
				<Select
					// make sure it's value equals the items quantity
					// value={item.quantity}
					// use defaultValue for theme-ui select:
					variant="medium"
					defaultValue={product.variants[0].title}
					onChange={e => {
						// this function get's passed the event
						// e.target.value represents the selected variant shopify ID.
						// use the Shopify ID to find the correct variant
						var shopifyId = e.target.value;
						var selectedVariant = product.variants.find(variant => {
							return variant.shopifyId === shopifyId;
						});
						// pass that variant to your state
						setVariant(selectedVariant);
					}}
				>
					{product.variants.map((variant, i) => {
						return (
							//  pass the variants unique shopify ID
							<option value={variant.shopifyId} key={i}>
								{variant.title}
							</option>
						);
					})}
				</Select>
			</div>
		)
	);
};

export default renderVariants;
