import { Box, Button, Grid, GridItem, Image, Select, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

const AddOns = ({
	addOnInfo,
	setAddOnInfo
}) => {

	// const [buttonText, setButtonText] = useState("Add")

	const addons = [
		{ img: "https://i.ibb.co/MxjKGkhX/508cd3704d087474d422490c474d3dc5678475ce.png", title: "Wall Mount" },
		{ img: "https://i.ibb.co/C3kFRsW7/05e507054dd2fd21d78beb8c0a0c9a87fd532b12.png", title: "Table Stand" }
	]

	const addOnproducts = window.addonProducts || []  
	const [selectedVariants, setSelectedVariants] = useState({});

	const staticAddOnproducts = [
		{
			id: "7385592594528",
			title: "Adhesive Acrylic Easel Back",
			handle: "adhesive-acrylic-easel-back",
			image:
				"https://i.ibb.co/MxjKGkhX/508cd3704d087474d422490c474d3dc5678475ce.png",
			price: "7.99",
			variants: [
				{
					id: 41849072287840,
					title: "variant 1",
					option1: "Default Title",
					option2: null,
					option3: null,
					sku: "A10",
					requires_shipping: true,
					taxable: true,
					featured_image: null,
					available: true,
					name: "Adhesive Acrylic Easel Back",
					public_title: null,
					options: ["Default Title"],
					price: 799,
					weight: 0,
					compare_at_price: null,
					inventory_management: "shopify",
					barcode: "",
					requires_selling_plan: false,
					selling_plan_allocations: []
				},
				{
					id: 41849072287841,
					title: "Default Title",
					option1: "Default Title",
					option2: null,
					option3: null,
					sku: "A10",
					requires_shipping: true,
					taxable: true,
					featured_image: null,
					available: true,
					name: "Adhesive Acrylic Easel Back",
					public_title: null,
					options: ["Default Title"],
					price: 899,
					weight: 0,
					compare_at_price: null,
					inventory_management: "shopify",
					barcode: "",
					requires_selling_plan: false,
					selling_plan_allocations: []
				}
			]
		},
		{
			id: "7385592889440",
			title: "Pre-Drill Holes",
			handle: "pre-drill-holes",
			image:
				"https://i.ibb.co/C3kFRsW7/05e507054dd2fd21d78beb8c0a0c9a87fd532b12.png",
			price: "5.99",
			variants: [
				{
					id: 41849075171424,
					title: "Default Title",
					option1: "Default Title",
					option2: null,
					option3: null,
					sku: "A11",
					requires_shipping: true,
					taxable: true,
					featured_image: null,
					available: true,
					name: "Pre-Drill Holes",
					public_title: null,
					options: ["Default Title"],
					price: 599,
					weight: 0,
					compare_at_price: null,
					inventory_management: "shopify",
					barcode: "",
					requires_selling_plan: false,
					selling_plan_allocations: []
				}
			]
		}
	];

	const [addedAddOns, setAddedAddOns] = useState(new Set());

	const handleVariantChange = (productId, variantId) => {
		const product = (addOnproducts.length > 0 ? addOnproducts : staticAddOnproducts).find(p => p.id === productId);
		const selectedVariant = product?.variants.find(v => v.id.toString() === variantId.toString());
	
		if (selectedVariant) {
			setSelectedVariants(prev => ({
				...prev,
				[productId]: selectedVariant
			}));
		}
	};

	const handleAddAddOn = (product) => {
		const selectedVariant =
			selectedVariants[product.id] ||
			product.variants?.find((v) => v != null); // fallback to first non-null
	
		if (!selectedVariant) return; // avoid adding invalid data
	
		const productWithSelectedVariant = {
			...product,
			variants: [selectedVariant], // store selected only
		};
	
		setAddedAddOns((prev) => new Set(prev).add(product.id));
	
		// Prevent duplicates if re-adding same product
		setAddOnInfo((prev) => {
			const filtered = prev.filter((item) => item.id !== product.id);
			return [...filtered, productWithSelectedVariant];
		});
	};

	const handleRemoveAddOn = (id) => {
		setAddedAddOns((prev) => {
			const updated = new Set(prev);
			updated.delete(id);
			return updated;
		});
	
		setAddOnInfo((prev) => prev.filter((item) => item.id !== id));
	};

	// console.log('addOnInfo', addOnInfo)
	// console.log('selectedVariants', selectedVariants)

	return (
		<>
			<Box p={8}>
				<Text fontSize={"18px"} fontWeight={600} color={"#00070B"}>Add ons</Text>
				<Grid gridTemplateColumns={'repeat(1, 1fr)'} gap={"10px"} my={"10px"}>
				{
					(addOnproducts && addOnproducts.length > 0 ? addOnproducts : staticAddOnproducts)?.map((product) => {
						const variant = selectedVariants[product.id] || product.variants[0]; // fallback
						// console.log('variant', variant)
						const price = variant ? (variant.price / 100).toFixed(2) : "0.00";

						return ( // ✅ add this
							<GridItem key={product?.id}>
								<VStack spacing={"10px"} alignItems={"start"}>
									<Image
										width={"100%"}
										height={"200px"}
										src={product?.image}
										alt="2d-cutout"
										objectFit={"cover"}
										borderRadius={"8px"}
									/>
									<Text fontSize={"16px"} fontWeight={550} color={"#00070B"}>{product?.title}</Text>
									{
										product?.variants?.length > 1 && (
											<Select
												disabled={addedAddOns.has(product?.id)}
												onChange={(e) => handleVariantChange(product.id, e.target.value)}
												value={(selectedVariants[product.id]?.id || product.variants[0].id).toString()}
											>
												{product.variants.map((variant) => (
													<option key={variant.id} value={variant.id}>
														{variant.title}
													</option>
												))}
											</Select>
										)
									}
									{
										addedAddOns.has(product?.id) ? 
											<Button
												bg={"#F46267"}
												_hover={{bg: "#DC585D"}}
												color={"#ffffff"}
												borderRadius={"8px"}
												width={"100%"}
												display={"flex"}
												alignItems={"center"}
												onClick={() => handleRemoveAddOn(product?.id)}
											>
												<FiMinus size={20} />
												Remove
											</Button>
										: 
											<Button
												bg={"#F46267"}
												_hover={{bg: "#DC585D"}}
												color={"#ffffff"}
												borderRadius={"8px"}
												width={"100%"}
												display={"flex"}
												alignItems={"center"}
												onClick={() => handleAddAddOn(product)}
											>
												<FiPlus size={20} />
												Add - ${price}
											</Button>
									}
								</VStack>
							</GridItem>
						); // ✅ and close return block
					})
				}
				</Grid>
			</Box>
		</>
	);
};

export default AddOns;