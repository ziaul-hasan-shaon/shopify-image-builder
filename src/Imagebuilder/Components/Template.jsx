import React, { useState } from "react";
import { Box, Grid, GridItem, Input, Button, Text } from "@chakra-ui/react";

const Template = ({
		canvasWidth,
		canvasHeight,
		setCanvasWidth,
		setCanvasHeight,
		onClose,
		tempRatio,
		setTempRatio
}) => {
	const [selectedRatio, setSelectedRatio] = useState(1);

	const ratios = [
			{ label: "6.3×6.3 inches", w: 600, h: 600, width: "75px", height: "42px", ratio: "1:1" },
			{ label: "8.3×4.2 inches", w: 800, h: 400, width: "75px", height: "48px", ratio: "2:1" },
			{ label: "6.3×3.1 inches", w: 600, h: 300, width: "75px", height: "54px", ratio: "2:1" },
			{ label: "10.4×6.3 inches", w: 1000, h: 600, width: "79px", height: "56px", ratio: "5:3" },
			// { label: "12.5×6.3 inches", w: 1200, h: 600, width: "79px", height: "72px", ratio: "2:1" },
			{ label: "3.1×6.3 inches", w: 300, h: 600, width: "79px", height: "88px", ratio: "1:2" },
			{ label: "4.2×8.3 inches", w: 400, h: 800, width: "79px", height: "96px", ratio: "1:2" },
			{ label: "6.3×10.4 inches", w: 600, h: 1000, width: "63px", height: "96px", ratio: "3:5" },
			// { label: "6.3×12.5 inches", w: 600, h: 1200, width: "64px", height: "96px", ratio: "1:2" }
	];

	return (
		<Box w="100%" p={2} borderRadius="md" >
			{/* Input Section */}
			<Box display="flex" gap="2" mb="4" alignItems="center" justifyContent={"center"} p={2}>
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
							setTempRatio(ratio?.ratio)
							onClose()
						}}
					>
						<Box
							w={ratio.width}
							h={ratio.height}
							border="1px solid #B1B1B1"
							borderRadius="md"
							bg={selectedRatio === index ? "#ffffff" : "#F8F8F8"}
							mb="1"
							display={"flex"}
							alignItems={"center"}
							justifyContent={"center"}
						>
							<Text fontSize={"12px"} fontWeight={"light"} color={"#B1B1B1"}>{ratio.ratio}</Text>
						</Box>
						<Text fontSize="xs">{ratio.label}</Text>
					</GridItem>
				))}
			</Grid>
		</Box>
	);
};

export default Template;
