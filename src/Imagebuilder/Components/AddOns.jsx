import { Box, Button, Grid, GridItem, Image, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const AddOns = ({
	addOnInfo,
	setAddOnInfo
}) => {

	const addons = [
		{ img: "https://i.ibb.co/MxjKGkhX/508cd3704d087474d422490c474d3dc5678475ce.png", title: "Wall Mount" },
		{ img: "https://i.ibb.co/C3kFRsW7/05e507054dd2fd21d78beb8c0a0c9a87fd532b12.png", title: "Table Stand" }
	]

	const addOnproducts = window.addonProducts || []  

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
					price: 799,
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

	const handleAddAddOn = (id, title, price) => {
		setAddedAddOns((prev) => new Set(prev).add(id));
		setAddOnInfo({id: id, status: true, title: title, price: Number(price)})
	};

	

	return (
		<>
			<Box p={"16px"}>
				<Text fontSize={"16px"} fontWeight={550} color={"#2B2B2B"}>Add ons</Text>
				<Grid gridTemplateColumns={'repeat(2, 1fr)'} gap={"10px"} my={"10px"}>
					{
							(addOnproducts && addOnproducts.length > 0 ? addOnproducts : staticAddOnproducts)?.map((product) => (
									<GridItem key={product?.id}>
										<VStack spacing={"6px"} alignItems={"start"}>
											<Image
												width={"100%"}
												height={"120px"}
												src={product?.image}
												alt="2d-cutout"
												borderRadius={"8px"}
											/>
											<Text>{product?.title}</Text>
											<Button
												disabled={addedAddOns.has(product.id)}
												bg={"#F46267"}
												color={"#ffffff"}
												borderRadius={"8px"}
												width={"100%"}
												display={"flex"}
												alignItems={"center"}
												onClick={() => handleAddAddOn(product?.id, product?.title, product?.price)}
											>
												{addedAddOns.has(product.id) ? "Added" : 
												<>
												<FiPlus size={20} />
												Add - ${product?.price}
												</>}
											</Button>
										</VStack>
									</GridItem>
								))
							}
				</Grid>
			</Box>
		</>
	);
};

export default AddOns;