import { Box, Button, Grid, GridItem, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FiPlus } from 'react-icons/fi';

const AddOns = () => {

	const addons = [
		{ img: "https://i.ibb.co/MxjKGkhX/508cd3704d087474d422490c474d3dc5678475ce.png", title: "Wall Mount" },
		{ img: "https://i.ibb.co/C3kFRsW7/05e507054dd2fd21d78beb8c0a0c9a87fd532b12.png", title: "Table Stand" }
	]

	return (
		<>
			<Box p={"16px"}>
				<Text fontSize={"16px"} fontWeight={550} color={"#2B2B2B"}>Add ons</Text>
				<Grid gridTemplateColumns={'repeat(2, 1fr)'} gap={"10px"} my={"10px"}>
					{
						addons?.map((img2d, index) => (
							<GridItem key={index}>
								<VStack spacing={"6px"} alignItems={"start"}>
									<Image
										width={"100%"} 
										height={"120px"}
										src={img2d?.img}
										alt="2d-cutout"
										borderRadius={"8px"}
									/>
									<Text>
										{img2d?.title}
									</Text>
									<Button
										bg={"#F46267"}
										color={"#ffffff"}
										borderRadius={"8px"}
										width={"100%"}
										display={"flex"}
										alignItems={"center"}
									>
										<FiPlus size={20}/>
										Add - $10
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