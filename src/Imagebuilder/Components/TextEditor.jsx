import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import { Box, Button, Flex, Input, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Select, Text, VStack } from '@chakra-ui/react';
import { FiRotateCcw, FiRotateCw } from 'react-icons/fi';

const TextEditor = ({
	text,
	setText,
	textColor,
	setTextColor,
	fontSize,
	setFontSize,
	fontWeight,
	setFontWeight,
	fontFamily,
	setFontFamily,
	rotateText,
	fontSizeCollection,
	fontWightCollection,
	fontOptions,
	addTextToCanvas
}) => {

	const [angle, setAngle] = useState(90)

	return (
		<>
			<VStack align="start" spacing={4} width="100%" p={5}>
				<Box width="100%">
					<Text fontSize="lg" fontWeight="bold" mb={2}>Add text</Text>
					<Text>Enter text</Text>
					<Input
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Enter your text"
						width="100%"
						padding={2}
						marginY={2}
						borderRadius="4px"
						border="1px solid #ccc"
					/>
					<Button width="100%" bg="#FF5A5F" color="white" onClick={addTextToCanvas}>
						Add to design
					</Button>
				</Box>

				<Box width="100%">
					<Text fontSize="lg" fontWeight="bold" my={4}>Text Settings</Text>
					<Flex justify="space-between" width="100%">
						<Box width="45%">
							<Text mb={2} fontWeight={"semibold"}>Text Color</Text>
							<Popover placement="bottom-start">
								<PopoverTrigger>
									<Button display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"} height={"50px"} border={'1px solid #EBEBEB'} bg={"none"} cursor={"pointer"}>
										<Box width={"30px"} height={"30px"} bg={textColor} borderRadius={"5px"}>

										</Box>
										<Text> {textColor}</Text>
									</Button>
								</PopoverTrigger>
								<PopoverContent width={'max-content'}>
									<PopoverArrow />
									{/* <PopoverCloseButton /> */}
									<PopoverBody>
										<ColorPicker color={textColor} setColor={setTextColor} />
									</PopoverBody>
								</PopoverContent>
							</Popover>
						</Box>
						<Box width="45%">
							<Text mb={2} fontWeight={"semibold"}>Font Size</Text>
							<Select h={"50px"} onChange={(e) => setFontSize(e.target.value)}>
								<option value={fontSize}>{fontSize ?? "Select One"}</option>
								{fontSizeCollection?.map((font, index) => (
									<option key={index} value={font}>{font}</option>
								))}
							</Select>
						</Box>
					</Flex>

					<Box mt={4} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
						<Box width={"45%"}>
							<Text mb={2} fontWeight={"semibold"}>Font Weight</Text>
							<Select h={"50px"} onChange={(e) => {
								const selectedFont = fontWightCollection.find(font => font.value === e.target.value);
								setFontWeight(selectedFont?.label || '');
							}}>
								{fontWightCollection.map((font, index) => (
									<option key={index} value={font.value}>{font.label}</option>
								))}
							</Select>
						</Box>
						<Box width={"45%"}>
							<Text mb={2} fontWeight={"semibold"}>Font Family</Text>
							<Select
								h={"50px"}
								placeholder="Select Font Family"
								onChange={(e) => setFontFamily(e.target.value)}
							>
								<option value={fontFamily}>{fontFamily ?? "Select One"}</option>
								{fontOptions.map((font, index) => (
									<option key={index} value={font} style={{ fontFamily: font }}>
										{font}
									</option>
								))}
							</Select>
						</Box>
					</Box>

					<Flex mt={4} gap={2} alignItems={"center"}>
						<Box>
							<Button bg="none" onClick={() => rotateText(angle)}>
								<FiRotateCcw size={30} />
							</Button>
							<Button bg="none" onClick={() => rotateText(-angle)}>
								<FiRotateCw size={30} />
							</Button>
						</Box>
						<Input
							value={angle}
							onChange={(e) => setAngle(e.target.value)}
							// placeholder="Enter your text"
							width="20%"
							padding={2}
							marginY={2}
							borderRadius="4px"
							border="1px solid #ccc"
						/>
					</Flex>
				</Box>
			</VStack>
		</>
	);
};

export default TextEditor;