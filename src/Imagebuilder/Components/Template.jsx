import React, { useState } from "react";
import { Box, Grid, GridItem, Input, Button, Text } from "@chakra-ui/react";

const Template = ({
		canvasWidth,
		canvasHeight,
		setCanvasWidth,
		setCanvasHeight
}) => {
	const [selectedRatio, setSelectedRatio] = useState(null);

	const ratios = [
		{ label: "600×600 pixels", w: 600, h: 600, width: "75px", height: "42px" },
		{ label: "800×400 pixels", w: 800, h: 400, width: "75px", height: "48px" },
		{ label: "600×300 pixels", w: 600, h: 300, width: "75px", height: "54px" },
		{ label: "1000×600 pixels", w: 1000, h: 600, width: "79px", height: "56px" },
		{ label: "1200×600 pixels", w: 1200, h: 600, width: "79px", height: "72px" },
		{ label: "300×600 pixels", w: 300, h: 600, width: "79px", height: "88px" },
		{ label: "400×800 pixels", w: 400, h: 800, width: "79px", height: "96px" },
		{ label: "600×1000 pixels", w: 600, h: 1000, width: "63px", height: "96px" },
		{ label: "600×1200 pixels", w: 600, h: 1200, width: "64px", height: "96px" },
	];

	return (
		<Box w="100%" p="4" borderRadius="md" >
			{/* Input Section */}
			<Box display="flex" gap="2" mb="4" alignItems="center" justifyContent={"center"} p={4}>
				<Box px={2} display={"flex"} alignItems={"center"} justifyContent={"space-between"} borderRadius={"5px"} w="40%" bg={"#EBEBEB"}>
					<Text>W</Text>
					<Input
						size="sm"
						value={canvasWidth}
						w={"50%"}
						textAlign="right"
						onChange={(e) => setCanvasWidth(e.target.value)}
						placeholder="W"
					/>
				</Box>
				<Text fontSize="sm">×</Text>
				<Input
					size="sm"
					borderRadius={"5px"}
					w="40%"
					bg={"#EBEBEB"}
					value={canvasHeight}
					onChange={(e) => setCanvasHeight(e.target.value)}
					placeholder="H"
				/>
				<Button size="sm" bg={"#B1B1B1"} color={"white"}>
					Set
				</Button>
			</Box>

			{/* Grid Layout */}
			<Grid templateColumns="repeat(3, 1fr)" gap={2}>
				{ratios.map((ratio, index) => (
					<GridItem
						key={index}
						py="4"
						borderRadius="md"
						bg={selectedRatio === index ? "#F8F8F8" : "white"}
						border={selectedRatio === index ? "1px solid #00070B" : ""}
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="space-between"
						cursor="pointer"
						onClick={() => {
							setSelectedRatio(index);
							setCanvasWidth(ratio?.w);
							setCanvasHeight(ratio?.h)
						}}
					>
						<Box
							w={ratio.width}
							h={ratio.height}
							border="1px solid #B1B1B1"
							borderRadius="md"
							bg={selectedRatio === index ? "#ffffff" : "#F8F8F8"}
							mb="1"
						/>
						<Text fontSize="xs">{ratio.label}</Text>
					</GridItem>
				))}
			</Grid>
		</Box>
	);
};

export default Template;
