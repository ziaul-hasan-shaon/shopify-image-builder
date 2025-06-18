import React, { useEffect, useState } from 'react';
import ColorPicker from './ColorPicker';
import { Box, Button, Flex, Input, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack } from '@chakra-ui/react';
import { FiRotateCcw, FiRotateCw } from 'react-icons/fi';
import { HiOutlineDuplicate } from 'react-icons/hi';
import { RiBringForward, RiDeleteBin6Line, RiSendBackward } from 'react-icons/ri';
import { LuImageUp } from 'react-icons/lu';
import { PiDotsThreeBold } from 'react-icons/pi';
import { CiLock, CiUnlock } from 'react-icons/ci';
import { FaRegCircle } from 'react-icons/fa';

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
	addTextToCanvas,
	handleBringForoward,
	handleSendBackward,
	activeText,
	setActiveText,
	toggleImageLock,
	isImageLocked,
	handleDuplicateText,
	handleDeleteText,
	device,
	setTextRotation,
	textAngle, 
	setTextAngle
}) => {

	useEffect(()=> {
		if(textAngle !== null){
			setTextRotation(textAngle)
		}
	}, [textAngle])

	// console.log('activeText', activeText)

	return (
		<>
			<VStack align="start" spacing={4} width="100%" p={5}>
				<Box width="100%">
					<Text fontSize="lg" fontWeight="bold" mb={2}>Add text</Text>
					<Text>Enter text</Text>
					<Input
						value={text}
						onChange={(e) => setText(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								addTextToCanvas(); // ⬅️ Called directly, no useEffect needed
							}
						}}
						placeholder="Enter your text"
						width="100%"
						padding={2}
						marginY={2}
						borderRadius="4px"
						border="1px solid #ccc"
					/>
					<Button width="100%" bg="#FF5A5F" _hover={{bg: "#DC585D"}} color="white" onClick={addTextToCanvas}>
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

					<Flex mt={4} gap={2} alignItems={"center"} width={"100%"}>
						<Box width={"40%"}>
							<Button bg="none" onClick={() => {
								rotateText(90)
								setTextAngle(textAngle + 90)
								}}>
								<FiRotateCcw size={30} />
							</Button>
							<Button bg="none" onClick={() => {
								rotateText(-90)
								setTextAngle(textAngle - 90)
								}}>
								<FiRotateCw size={30} />
							</Button>
						</Box>
						<Box display={"flex"} alignItems={"center"} gap={3} width={"60%"}>
						<Slider
							className='textAngle-slider'
							min={0}
							max={360}
							step={1}
							value={textAngle}
							onChange={setTextAngle} // ✅ Fixed: this is now correct
							width="100px"
							isDisabled={!activeText}
							sx={{
								cursor: !activeText ? 'not-allowed' : 'pointer',
							}}
						>
							<SliderTrack>
								<SliderFilledTrack bg="tomato" />
							</SliderTrack>
							<SliderThumb
							 boxSize={5} 
							 bg="transparent" 
							 p={0}
							 sx={{
								'&:focus': { boxShadow: 'none !important' },
								'&:focus-visible': { boxShadow: 'none !important' },
								'&:hover': { boxShadow: 'none' }, // optional
							}}
							 >
								<FaRegCircle
									size={"20px"}
									color="#FF6347"
									style={{ background: "#ffffff", padding: "0px" }}
								/>
							</SliderThumb>
						</Slider>

						<Input
							isDisabled={!activeText}
							value={textAngle}
							onChange={(e) => setTextAngle(Number(e.target.value))} // ✅ Ensure numeric value
							width="25%"
							padding={2}
							marginY={2}
							type='number'
							borderRadius="4px"
							border="1px solid #ccc"
						/>
					</Box>
					</Flex>
					{
						activeText && 
						<Box 
							className='floating-option'
							position={"absolute"} 
							top={device === "Desktop" ? "7%" : "12%"} 
							left={device === "Desktop" ? "215%" : "25%"} 
							zIndex={9999} 
							bg={"#F8F8F8"} 
							borderRadius={"25px"}
							p={3}
							display={"flex"}
							alignItems={"center"}
							justifyContent={"space-between"}
							width={device === "Desktop" ? "280px" : "200px"}
							boxShadow={"md"}
						>
							
							<button
								onClick={handleDuplicateText}
							>
								<HiOutlineDuplicate size={device === "Desktop" ? 24 : 20}/>
							</button>
							<button
								onClick={handleDeleteText}
							>
								<RiDeleteBin6Line size={device === "Desktop" ? 24 : 20}/>
							</button>
							<button
								onClick={toggleImageLock}
							>
								{
									isImageLocked ? <CiUnlock size = {device === "Desktop" ? 24 : 20}/> : <CiLock size = {device === "Desktop" ? 24 : 20}/>
								}
							</button>
							<button onClick={handleBringForoward}>
								<RiBringForward size={device === "Desktop" ? 24 : 20}/>
							</button>
							<button onClick={handleSendBackward}>
								<RiSendBackward size={device === "Desktop" ? 24 : 20}/>
							</button>
						</Box>
					}
				</Box>
			</VStack>
		</>
	);
};

export default TextEditor;