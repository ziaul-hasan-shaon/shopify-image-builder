import React, { useState } from "react";
import { Box, Grid, GridItem, Input, Button, Text } from "@chakra-ui/react";

const Template = ({
		canvasWidth,
		canvasHeight,
		setCanvasWidth,
		setCanvasHeight,
		onClose,
		tempRatio,
		setTempRatio,
		sizeLabel,
		setSizeLabel 
}) => {
	const [selectedRatio, setSelectedRatio] = useState(0);
	const [customW, setCustomW] = useState(sizeLabel?.w);
	const [customH, setCustomH] = useState(sizeLabel?.h)

	const ratios = [
			{ labelW: "6.3", labelH: "6.3", w: 500, h: 500, width: "75px", height: "42px", ratio: "1:1" },
			{ labelW: "8.3", labelH: "4.2", w: 600, h: 400, width: "75px", height: "48px", ratio: "2:1" },
			{ labelW: "6.3", labelH: "3.1", w: 600, h: 400, width: "75px", height: "54px", ratio: "2:1" },
			{ labelW: "10.4", labelH: "6.3", w: 600, h: 400, width: "79px", height: "56px", ratio: "5:3" },
			// { label: "12.5×6.3", w: 1200, h: 600, width: "79px", height: "72px", ratio: "2:1" },
			{ labelW: "3.1", labelH: "6.3", w: 400, h: 500, width: "79px", height: "88px", ratio: "1:2" },
			{ labelW: "4.2", labelH: "8.3", w: 400, h: 500, width: "79px", height: "96px", ratio: "1:2" },
			{ labelW: "6.3", labelH: "10.4", w: 400, h: 500, width: "63px", height: "96px", ratio: "3:5" },
			// { label: "6.3×12.5 inches", w: 600, h: 1200, width: "64px", height: "96px", ratio: "1:2" }
	];

	const handleSetSize = () => {
		setSizeLabel({w: customW, h: customH})
		if(customW > customH){
			setCanvasWidth(600)
			setCanvasHeight(400)
		}
		else if(customW < customH){
			setCanvasWidth(400)
			setCanvasHeight(500)
		}
		else{
			setCanvasWidth(500)
			setCanvasHeight(500)
		}
	}

	return (
		<Box w="100%" p={2} borderRadius="md" >
			{/* Input Section */}
			<Box display="flex" gap="2" mb="4" alignItems="center" justifyContent={"center"} p={2}>
				<Box px={2} display={"flex"} alignItems={"center"} justifyContent={"space-between"} borderRadius={"5px"} w="40%" bg={"#EBEBEB"}>
					<Text>W</Text>
					<Input
						size="sm"
						value={customW}
						w={"50%"}
						textAlign="right"
						onChange={(e) => setCustomW(e.target.value)}
						placeholder="W"
					/>
				</Box>
				<Text fontSize="sm">×</Text>
				<Box px={2} display={"flex"} alignItems={"center"} justifyContent={"space-between"} borderRadius={"5px"} w="40%" bg={"#EBEBEB"}>
					<Text>H</Text>
				<Input
					size="sm"
					borderRadius={"5px"}
					w="40%"
					bg={"#EBEBEB"}
					value={customH}
					onChange={(e) => setCustomH(e.target.value)}
					placeholder="H"
				/>
				</Box>
				<Button size="sm" bg={"#B1B1B1"} color={"white"} onClick={handleSetSize}>
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
							setSizeLabel({w: ratio.labelW, h:ratio.labelH})
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
						<Text fontSize="xs">{ratio.labelW} x {ratio.labelH} inches</Text>
					</GridItem>
				))}
			</Grid>
		</Box>
	);
};

export default Template;
