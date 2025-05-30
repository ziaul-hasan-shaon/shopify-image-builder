import React, { useState } from "react";
import { Box, Grid, GridItem, Input, Button, Text, ButtonGroup } from "@chakra-ui/react";

const Template = ({
		canvasWidth,
		canvasHeight,
		setCanvasWidth,
		setCanvasHeight,
		onClose,
		tempRatio,
		setTempRatio,
		sizeLabel,
		setSizeLabel,
		device
}) => {
	const [selectedRatio, setSelectedRatio] = useState(0);
	const [customW, setCustomW] = useState(sizeLabel?.w?.split(" ").shift());
	const [customH, setCustomH] = useState(sizeLabel?.h?.split(" ").shift())
	const [unit, setUnit] = useState("inches")

	const ratios = [
			{ labelW: `${unit === "mm" ? "160.02" : "6.3"} ${unit}`, labelH: `${unit === "mm" ? "160.02" : "6.3"} ${unit}`, w: 500, h: 500, width: "60px", height: "60px", ratio: "1:1" },
			{ labelW: `${unit === "mm" ? "210.82" : "8.3"} ${unit}`, labelH: `${unit === "mm" ? "106.68" : "4.2"} ${unit}`, w: 600, h: 400, width: "75px", height: "48px", ratio: "2:1" },
			{ labelW: `${unit === "mm" ? "160.02" : "6.3"} ${unit}`, labelH: `${unit === "mm" ? "78.74" : "3.1"} ${unit}`, w: 600, h: 400, width: "75px", height: "54px", ratio: "2:1" },
			{ labelW: `${unit === "mm" ? "256.54" : "10.4"} ${unit}`, labelH: `${unit === "mm" ? "160.02" : "6.3"} ${unit}`, w: 600, h: 400, width: "79px", height: "56px", ratio: "5:3" },
			// { label: "12.5×6.3", w: 1200, h: 600, width: "79px", height: "72px", ratio: "2:1" },
			{ labelW: `${unit === "mm" ? "78.74" : "3.1"} ${unit}`, labelH: `${unit === "mm" ? "160.02" : "6.3"} ${unit}`, w: 400, h: 500, width: "79px", height: "88px", ratio: "1:2" },
			{ labelW: `${unit === "mm" ? "106.68" : "4.2"} ${unit}`, labelH: `${unit === "mm" ? "210.82" : "8.3"} ${unit}`, w: 400, h: 500, width: "79px", height: "96px", ratio: "1:2" },
			{ labelW: `${unit === "mm" ? "160.02" : "6.3"} ${unit}`, labelH: `${unit === "mm" ? "256.54" : "10.4"} ${unit}`, w: 400, h: 500, width: "63px", height: "96px", ratio: "3:5" },
			// { label: "6.3×12.5 inches", w: 600, h: 1200, width: "64px", height: "96px", ratio: "1:2" }
	];

	const handleSetSize = () => {
		setSizeLabel({w: customW + " " + unit, h: customH + " " + unit})
		if(Number(customW) > Number(customH)){
			setCanvasWidth(600)
			setCanvasHeight(400)
		}
		else if(Number(customW) < Number(customH)){
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
			<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} p={2}>
				<Text fontSize={"16px"} fontWeight={550}>
					Custom sizes
				</Text>
				<ButtonGroup isAttached size={'sm'}>
					<Button bg={unit === "mm" ? "#2B2B2B" : "#F8F8F8"} color={unit === "mm" ? "#ffffff" : ""} onClick={() => setUnit("mm")}>
						mm
					</Button>
					<Button bg={unit === "inches" ? "#2B2B2B" : "#F8F8F8"} color={unit === "inches" ? "#ffffff" : ""} onClick={() => setUnit("inches")}>
						inches
					</Button>
				</ButtonGroup>
			</Box>
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
						placeholder="inches"
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
					placeholder="inches"
				/>
				</Box>
				<Button size="sm" bg={"#2B2B2B"} color={"white"} onClick={handleSetSize}>
					Set
				</Button>
			</Box>

			{/* Grid Layout */}
			<Grid templateColumns="repeat(3, 1fr)" gap={2}>
				{ratios.map((ratio, index) => (
					<GridItem
						key={index}
						py= {device === "Desktop" ? 4 : 2} 
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
						<Text textAlign={"center"} fontSize="xs">{ratio.labelW} x {ratio.labelH}</Text>
					</GridItem>
				))}
			</Grid>
		</Box>
	);
};

export default Template;
