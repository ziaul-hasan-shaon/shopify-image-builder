import { Box, Grid, GridItem, Image, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, useDisclosure, Heading, Divider, AbsoluteCenter, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import Uploader from '../Components/Uploader';
import Canvas from '../Components/Canvas';
import BackgroundPatternTabs from '../Components/BackgroundPatternTabs';
import TextEditor from '../Components/TextEditor';
import Border from '../Components/Border';
import Template from '../Components/Template';
import { FiEye, FiSave } from 'react-icons/fi';
import whatsapp from "../../assets/Images/Social media/whatsapp 1.png";
import faceBook from "../../assets/Images/Social media/facebook 1.png";
import dark from "../../assets/Images/Social media/x_dark 1.png";
import linkedin from "../../assets/Images/Social media/linkedin 1.png";
import Mockup from '../Components/Mockup';
import { GrRedo, GrUndo } from 'react-icons/gr';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import { FaRegCircle, FaRegEdit } from 'react-icons/fa';
import { ImImage } from 'react-icons/im';
import { GoArrowUpRight, GoChevronDown, GoChevronUp } from 'react-icons/go';

const DesktopLayout = (
	{
		canvasRef,
		loading,
		setLoading,
		uploadedImages,
		selectedImage,
		setUploadedImages,
		handleImageSelect,
		handleDeleteButtonClick,
		handleSelectedImageDelet,
		saveCanvasAsImage,
		flipSelectedImages,
		rotateSelectedImages,
		color,
		setColor,
		gradientList,
		setGradientList,
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
		addBackground,
		selectedBorder,
		setSelectedBorder,
		canvasWidth,
		canvasHeight,
		setCanvasWidth,
		setCanvasHeight,
		isJpgActive,
		isPngActive,
		setIsPngActive,
		setIsJpgActive,
		isExtra,
		setIsExtra,
		isStandard,
		setIsStandard,
		isHigh,
		setIsHigh,
		handlePreview,
		mockupImage,
		note,
		setNote,
		shareImageOn,
		shareLoading,
		price,
		setprice,
		gradientBg,
		setGradientBg,
		patterBg,
		setPatternBg,
		handleAddToCart,
		tempRatio,
		setTempRatio,
		resize,
		setResize,
		handleScaleChange,
		bgImage,
		setBgImage,
		addSVGBackgroundWithColorChange,
		svgColor,
		setSvgColor,
		bgRemoveLoading,
		setBgRemoveLoading,
		canvas,
		atcLoading,
		setAtcLoading,
		isUploadOpen,
		setIsUploadOpen,
		isBackgroundOpen,
		setIsBackgroundOpen,
		isTemplateOpen,
		setIsTemplateOpen,
		isTextOpen,
		setIsTextOpen,
		isBorderOpen,
		setIsBorderOpen,
		isOpenNote,
		setIsOpenNote,
		logo,
		device
	}
) => {

	const [scale, setScale] = useState(1); // Default zoom level
	const [isFullScreen, setIsFullScreen] = useState(false)

	const { isOpen, onOpen, onClose } = useDisclosure(); // Controls the popover state
	const {
			isOpen: isArtboardOpen,
			onOpen: onArtboardOpen,
			onClose: onArtboardClose
		} = useDisclosure()

	// to control preview modal state
	const {
		isOpen: isPreviewOpen,
		onOpen: onPreviewOpen,
		onClose: onPreviewClose
	} = useDisclosure()

	const handleIsTemplateOpen = () => {
		setIsTemplateOpen(true);
		setIsUploadOpen(false);
		setIsBackgroundOpen(false);
		setIsTextOpen(false)
		setIsBorderOpen(false)
	}
	const handleIsUploadOpen = () => {
		setIsTemplateOpen(false);
		setIsUploadOpen(true);
		setIsBackgroundOpen(false);
		setIsTextOpen(false)
		setIsBorderOpen(false)
	}
	const handleIsBackgroundOpen = () => {
		setIsTemplateOpen(false);
		setIsUploadOpen(false);
		setIsBackgroundOpen(true);
		setIsTextOpen(false)
		setIsBorderOpen(false)
	}
	const handleIsTextOpen = () => {
		setIsTemplateOpen(false);
		setIsUploadOpen(false);
		setIsBackgroundOpen(false);
		setIsTextOpen(true)
		setIsBorderOpen(false)
	}
	const handleIsBorderOpen = () => {
		setIsTemplateOpen(false);
		setIsUploadOpen(false);
		setIsBackgroundOpen(false);
		setIsTextOpen(false)
		setIsBorderOpen(true)
	}

	return (
		<>
			<Box>
				{!isFullScreen &&
				<Grid
				gridTemplateColumns={"repeat(13, 1fr)"}
				borderBottom={"1px solid #EEEEEE"}
			>
				<GridItem
					colSpan={1}
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
					borderRight={"1px solid #EEEEEE"}
					py={4}
				>
					<Box width={"50px"} height={"50px"}>
						<Image width={'100%'} height={'100%'} src={logo} alt='logo' />
					</Box>
				</GridItem>
				<GridItem
					colSpan={3}
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
					borderRight={"1px solid #EEEEEE"}
				>
					<Box width={"100%"} p={3}>
						<Popover isOpen={isArtboardOpen} onOpen={onArtboardOpen} onClose={onArtboardClose} placement="bottom-start">
							<PopoverTrigger>
								<Button display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"} height={"50px"} border={'1px solid #EBEBEB'} bg={"#F9F9F9"} cursor={"pointer"}>
									<Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={"20px"} >
										<ImImage color='#2B2B2B' size={30}/>
										<Text fontSize={"18px"} fontWeight={"normal"}> {tempRatio || "Default Ratio 2:1"} </Text>
									</Box>
										{isArtboardOpen ? <GoChevronUp size={24}/> : <GoChevronDown size={24}/>}
								</Button>
							</PopoverTrigger>
							<PopoverContent width={'450px'}>
								{/* <PopoverArrow /> */}
								{/* <PopoverCloseButton /> */}
								<PopoverBody>
									<Template 
										canvasWidth={canvasWidth}
										canvasHeight={canvasHeight}
										setCanvasWidth={setCanvasWidth}
										setCanvasHeight={setCanvasHeight}
										onClose={onArtboardClose}
										tempRatio={tempRatio}
										setTempRatio={setTempRatio}
									/>
								</PopoverBody>
							</PopoverContent>
						</Popover>
					</Box>
				</GridItem>
				<GridItem
					colSpan={9}
					display={"flex"}
					alignItems={"center"}
					justifyContent={"space-between"}
					px={"20px"}
				>
					<Box
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
						gap={"15px"}
						cursor={"pointer"}
						onClick={() => {
							handlePreview();
							onPreviewOpen()
						}}
					>
						<Text fontSize={"18px"}>Preview</Text>
						<Box
							style={{
								backgroundColor: "#ECF8FF" ,
								borderRadius: "6px", 
								width: "24px",
								height: "24px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
								}}
						>
							<GoArrowUpRight color='#00AEF9' size={20} />
						</Box>
					</Box>
					<Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="bottom-start">
						<PopoverTrigger>
							<Button
								display={"flex"}
								alignItems={"center"}
								justifyContent={"center"}
								gap={"10px"}
								color={"#F46267"}
								bg={"#FEEFF0"}
								border={"1px solid #FCCED0"}
							>
								<FiSave size={20} />
								Save | Share
							</Button>
						</PopoverTrigger>
						<PopoverContent width={'280px'}>
							<PopoverArrow />
							{/* <PopoverCloseButton /> */}
							<PopoverBody p={4}>
								<Box display={"flex"} flexDir={"column"} alignItems={"start"} justifyContent={"center"} gap={"10px"}>
									<Heading as='h4' size='md'>
										Export settings
									</Heading>
									<Text color={"#B1B1B1"}>
										Image format
									</Text>
									<Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"10px"} p={2} bg={"#EBEBEB"} borderRadius={"10px"} width={"100%"}>
										<Button
											fontSize={"16px"}
											fontWeight={"regular"}
											width={"50%"}
											bg={isPngActive ? "#ffffff" : "transparent"}
											onClick={() => {
												setIsJpgActive(false);
												setIsPngActive(true)
											}}
										>
											PNG
										</Button>
										<Button
											fontSize={"16px"}
											fontWeight={"regular"}
											width={"50%"}
											bg={isJpgActive ? "#ffffff" : "transparent"}
											onClick={() => {
												setIsJpgActive(true);
												setIsPngActive(false)
											}}
										>
											JPEG
										</Button>
									</Box>
									<Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"10px"} p={2} bg={"#EBEBEB"} borderRadius={"10px"} width={"100%"}>
										<Box
											display={"flex"}
											alignItems={"center"}
											justifyContent={"center"}
											flexDir={"column"}
											p={2}
											bg={isStandard ? "#ffffff" : "transparent"}
											onClick={() => {
												setIsExtra(false);
												setIsStandard(true);
												setIsHigh(false)
											}}
											borderRadius={"8px"}
											cursor={"pointer"}
											width={"70px"}
											height={"62px"}
										>
											<Text>1x</Text>
											<Text>Standard</Text>
										</Box>
										<Box
											display={"flex"}
											alignItems={"center"}
											justifyContent={"center"}
											flexDir={"column"}
											p={2}
											bg={isHigh ? "#ffffff" : "transparent"}
											onClick={() => {
												setIsExtra(false);
												setIsStandard(false);
												setIsHigh(true)
											}}
											borderRadius={"8px"}
											cursor={"pointer"}
											width={"70px"}
											height={"62px"}
										>
											<Text>2x</Text>
											<Text>High</Text>
										</Box>
										<Box
											display={"flex"}
											alignItems={"center"}
											justifyContent={"center"}
											flexDir={"column"}
											p={2}
											bg={isExtra ? "#ffffff" : "transparent"}
											onClick={() => {
												setIsExtra(true);
												setIsStandard(false);
												setIsHigh(false)
											}}
											borderRadius={"8px"}
											cursor={"pointer"}
											width={"70px"}
											height={"62px"}
										>
											<Text>3x</Text>
											<Text>Extra</Text>
										</Box>
									</Box>
									<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} gap={"20px"} width={"100%"} px={2} py={4} bg={"#EBEBEB"} borderRadius={"10px"}>
										<Text>Output Resulation</Text>
										<Text textAlign={"center"}>{isStandard ? canvasWidth * 2 + "x" + canvasHeight * 2 : isHigh ? canvasWidth * 3 + "x" + canvasHeight * 3 : isExtra ? canvasWidth * 4 + "x" + canvasHeight * 4 : ""}</Text>
									</Box>
									<Box width={"100%"}>
										<Button
											width={"100%"}
											bg={"#F46267"}
											borderRadius={"10px"}
											color={"#ffffff"}
											onClick={() => {
												saveCanvasAsImage(isPngActive ? "png" : "jpeg", isStandard ? 2 : isHigh ? 3 : 4);
												onClose()
											}}
										>
											Export
										</Button>
									</Box>
									<Box position='relative' padding='16px' width={"100%"}>
										<Divider />
										<AbsoluteCenter bg='white' px='10px' color={"#B1B1B1"}>
											or
										</AbsoluteCenter>
									</Box>
									<Box width={"100%"} p={2}>
										<Text>Share with</Text>
										<Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={"20px"} width={"100%"} my={2}>
											<Box>
												<Image 
												w={30} 
												src={whatsapp} 
												about='whatsapp'
												cursor="pointer"
												onClick={() => shareImageOn("whatsapp")} 
												/>
											</Box>
											<Box>
												<Image 
												w={30} 
												src={faceBook} 
												about='faceBook'
												cursor="pointer"
												onClick={() => shareImageOn("facebook")} 
												/>
											</Box>
											<Box>
												<Image 
												w={30} 
												src={dark} 
												about='dark'
												cursor="pointer"
												onClick={() => shareImageOn("x")} 
												/>
											</Box>
											<Box>
												<Image 
												w={30} 
												src={linkedin} 
												about='linkedin'
												cursor="pointer"
												onClick={() => shareImageOn("linkedin")} 
												/>
											</Box>
										</Box>
									</Box>
								</Box>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</GridItem>
			</Grid>}
			</Box>
			<Box>
				<Grid
					gridTemplateColumns={"repeat(13, 1fr)"}
					height={!isFullScreen ? "calc(100vh - 85px)" : "100vh"}
					position={"relative"}
					overflowY={"auto"}
					sx={{ scrollbarWidth: "none" }}
				>
					{!isFullScreen && 
					<GridItem
					colSpan={1}
					display={"flex"}
					flexDirection={"column"}
					alignItems={"center"}
					justifyContent={"start"}
					border={"1px solid #EEEEEE"}
					py={5}
				>
					<Box
						p={4}
						display={"flex"}
						flexDir={"column"}
						alignItems={"center"}
						justifyContent={"center"}
						gap={"10px"}
						onClick={handleIsTemplateOpen}
						cursor={"pointer"}
					>
						<svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M2.5 15C2.5 10.3886 2.5 8.08288 3.51728 6.44846C3.89363 5.84378 4.36114 5.31784 4.89864 4.89442C6.35145 3.75 8.40096 3.75 12.5 3.75H17.5C21.599 3.75 23.6485 3.75 25.1014 4.89442C25.6389 5.31784 26.1064 5.84378 26.4828 6.44846C27.5 8.08288 27.5 10.3886 27.5 15C27.5 19.6114 27.5 21.9171 26.4828 23.5515C26.1064 24.1562 25.6389 24.6821 25.1014 25.1056C23.6485 26.25 21.599 26.25 17.5 26.25H12.5C8.40096 26.25 6.35145 26.25 4.89864 25.1056C4.36114 24.6821 3.89363 24.1562 3.51728 23.5515C2.5 21.9171 2.5 19.6114 2.5 15Z" stroke={isTemplateOpen ? "#F46267" : "#374144"} stroke-width="2" />
							<path d="M11.875 3.75V26.25" stroke={isTemplateOpen ? "#F46267" : "#374144"} stroke-width="2" stroke-linejoin="round" />
							<path d="M6.25 8.75H7.5M6.25 12.5H7.5" stroke={isTemplateOpen ? "#F46267" : "#374144"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						<Text>Template</Text>
					</Box>
					<Box
						p={4}
						display={"flex"}
						flexDir={"column"}
						alignItems={"center"}
						justifyContent={"center"}
						gap={"10px"}
						onClick={handleIsUploadOpen}
						cursor={"pointer"}
					>
						<svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M21.25 9.375C21.8644 10.0071 23.4997 12.5 24.375 12.5M24.375 12.5C25.2503 12.5 26.8856 10.0071 27.5 9.375M24.375 12.5V2.5" stroke={isUploadOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M26.2499 16.25C26.2475 21.4337 26.184 24.0879 24.511 25.761C22.7719 27.5 19.9729 27.5 14.375 27.5C8.77707 27.5 5.97811 27.5 4.23905 25.761C2.5 24.0219 2.5 21.2229 2.5 15.625C2.5 10.0271 2.5 7.22811 4.23905 5.48905C5.97811 3.75 8.77707 3.75 14.375 3.75C14.5874 3.75 17.5 3.7501 17.5 3.7501" stroke={isUploadOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" />
							<path d="M2.5 17.6692C3.27377 17.5568 4.05605 17.5013 4.83964 17.5033C8.15456 17.4332 11.3883 18.4661 13.9639 20.4177C16.3525 22.2276 18.0309 24.7186 18.75 27.5" stroke={isUploadOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linejoin="round" />
							<path d="M26.25 21.1202C24.7807 20.3761 23.261 19.9984 21.7327 20.0001C19.4181 19.9909 17.1269 20.8416 15 22.4999" stroke={isUploadOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linejoin="round" />
						</svg>
						<Text>Upload</Text>
					</Box>
					<Box
						p={4}
						display={"flex"}
						flexDir={"column"}
						alignItems={"center"}
						justifyContent={"center"}
						gap={"10px"}
						onClick={handleIsBackgroundOpen}
						cursor={"pointer"}
					>
						<svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.31595 25.3775C7.06925 26.875 9.71284 26.875 15 26.875C20.2871 26.875 22.9307 26.875 24.684 25.3775C24.933 25.1649 25.1649 24.933 25.3775 24.684C26.875 22.9307 26.875 20.2871 26.875 15C26.875 9.71284 26.875 7.06925 25.3775 5.31595C25.1649 5.06697 24.933 4.8351 24.684 4.62246C22.9307 3.125 20.2871 3.125 15 3.125C9.71284 3.125 7.06925 3.125 5.31595 4.62246C5.06697 4.8351 4.8351 5.06697 4.62246 5.31595C3.125 7.06925 3.125 9.71284 3.125 15C3.125 20.2871 3.125 22.9307 4.62246 24.684C4.8351 24.933 5.06697 25.1649 5.31595 25.3775Z" stroke={isBackgroundOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M5 25L25 5" stroke={isBackgroundOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M3.37256 19.7526L19.7572 3.36792" stroke={isBackgroundOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M26.6322 10.2429L10.2476 26.6276" stroke={isBackgroundOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M16.875 26.875L26.875 16.875" stroke={isBackgroundOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M3.125 13.125L13.125 3.125" stroke={isBackgroundOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						<Text>Background</Text>
					</Box>
					<Box
						p={4}
						display={"flex"}
						flexDir={"column"}
						alignItems={"center"}
						justifyContent={"center"}
						gap={"10px"}
						onClick={handleIsTextOpen}
						cursor={"pointer"}
					>
						<svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18.75 26.2512H11.25" stroke={isTextOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M15 3.75V26.251M15 3.75C16.7343 3.75 18.9619 3.78818 20.7355 3.9706C21.4856 4.04774 21.8608 4.08631 22.1926 4.22237C22.8833 4.50535 23.4397 5.12577 23.6492 5.846C23.75 6.19226 23.75 6.58739 23.75 7.37768M15 3.75C13.2657 3.75 11.0381 3.78818 9.26451 3.9706C8.51438 4.04774 8.1393 4.08631 7.80733 4.22237C7.1168 4.50535 6.5602 5.12577 6.35071 5.846C6.25 6.19226 6.25 6.58739 6.25 7.37768" stroke={isTextOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" />
						</svg>
						<Text>Text</Text>
					</Box>
					<Box
						p={4}
						display={"flex"}
						flexDir={"column"}
						alignItems={"center"}
						justifyContent={"center"}
						gap={"10px"}
						onClick={handleIsBorderOpen}
						cursor={"pointer"}
					>
						<svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5 2.5V5M27.5 25H25M20.625 25H12.5C8.96446 25 7.1967 25 6.09835 23.9016C5 22.8032 5 21.0355 5 17.5V9.375" stroke={isBorderOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M25 27.5V15C25 10.286 25 7.92894 23.5355 6.46447C22.0711 5 19.714 5 15 5H2.5" stroke={isBorderOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						<Text>Border</Text>
					</Box>
				</GridItem>}
					{!isFullScreen && 
					<GridItem
					colSpan={3}
					borderRight={"1px solid #EEEEEE"}
				>
					{
						isTemplateOpen &&
						<Box height={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
							<Text fontSize={"18px"} fontWeight={"semibold"}>
								This feature will coming soon....
							</Text>
						</Box>
					}
					{
						isUploadOpen &&
						<Uploader
							loading={loading}
							setLoading={setLoading}
							uploadedImages={uploadedImages}
							selectedImage={selectedImage}
							setUploadedImages={setUploadedImages}
							handleImageSelect={handleImageSelect}
							handleDeleteButtonClick={handleDeleteButtonClick}
							handleSelectedImageDelet={handleSelectedImageDelet}
							flipSelectedImages={flipSelectedImages}
							rotateSelectedImages={rotateSelectedImages}
							resize = {resize}
							setResize = {setResize}
							handleScaleChange = {handleScaleChange}
							canvasHeight= {canvasHeight}
							canvasWidth = {canvasWidth}
							setCanvasHeight = {setCanvasHeight}
							setCanvasWidth = {setCanvasWidth}
							canvas={canvas}
							bgRemoveLoading={bgRemoveLoading}
							setBgRemoveLoading= {setBgRemoveLoading}
							device ={device}
						/>
					}
					{
						isBackgroundOpen &&
						<BackgroundPatternTabs
							color={color}
							setColor={setColor}
							gradientList={gradientList}
							setGradientList={setGradientList}
							addBackground={addBackground}
							gradientBg= {gradientBg}
							setGradientBg={setGradientBg}
							patterBg={patterBg}
							setPatternBg={setPatternBg}
							bgImage = {bgImage}
							setBgImage = {setBgImage}
							addSVGBackgroundWithColorChange = {addSVGBackgroundWithColorChange}
							svgColor={svgColor}
							setSvgColor={setSvgColor}
						/>
					}
					{
						isTextOpen &&
						<TextEditor
							text={text}
							setText={setText}
							textColor={textColor}
							setTextColor={setTextColor}
							fontSize={fontSize}
							setFontSize={setFontSize}
							fontWeight={fontWeight}
							setFontWeight={setFontWeight}
							fontFamily={fontFamily}
							setFontFamily={setFontFamily}
							rotateText={rotateText}
							fontSizeCollection={fontSizeCollection}
							fontWightCollection={fontWightCollection}
							fontOptions={fontOptions}
							addTextToCanvas={addTextToCanvas}
						/>
					}
					{
						isBorderOpen &&
						<Border
							selectedBorder={selectedBorder}
							setSelectedBorder={setSelectedBorder}
						/>
					}
				</GridItem>}
					<GridItem 
						colSpan={isFullScreen ? 13 : 9} 
						position="sticky" top="0" 
						h={canvasHeight >= 800 ? 
							(isFullScreen ? "150vh" : "calc(150vh - 85px)") : 
							(isFullScreen ? "100vh" : "calc(100vh - 85px)")
						} 
						zIndex={999} 
						bg="gray.100" 
						overflow={"auto"}
					>

						{/* Zoomable Content */}
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							// h="100%"
							// w="100%"
							transform={`scale(${scale})`}
							transformOrigin="start"
							transition="transform 0.2s ease-in-out"
							position={"relative"}
						>
							<Canvas canvasRef={canvasRef} selectedBorder={selectedBorder} canvasHeight={canvasHeight} canvasWidth={canvasWidth} scale={scale} device = {device}/>
						</Box>

						<Box
							px={4}
							bg={"#ffffff"}
							borderRadius={"20px"}
							position="absolute" 
							bottom="30px" 
							display={"flex"}
							alignItems={"center"}
							justifyContent={"space-between"}
							left="50%" 
							transform="translateX(-50%)" 
							zIndex="1000"
							width={"700px"}
						>
							<Box display={"flex"} alignItems={"center"} gap={"10px"}>
								<Box p={3} display={"flex"} alignItems={"center"} gap={"10px"} borderRight={"1px solid #D9D9D9"}>
									<GrUndo style={{cursor: "not-allowed", opacity: ".5"}} color='#333333' size={25}/>
									<GrRedo style={{cursor: "not-allowed", opacity: ".5"}} color='#333333' size={25}/>
								</Box>
								{!isFullScreen ? 
									<BsFullscreen 
									onClick={() => setIsFullScreen(true)} 
									color='#333333'
									cursor={"pointer"}
								/> :
								<BsFullscreenExit 
									onClick={() => setIsFullScreen(false)} 
									color='#333333'
									cursor={"pointer"}
								/>
								}
							</Box>
							{/* Slider Positioned Inside GridItem */}
							<Box w="320px" display={"flex"} alignItems={"center"} gap={"20px"} p={5} borderRight={"1px solid #E5E5E5"}>
								<Box 
									width={"65px"} 
									bg={"#F9F9F9"} 
									border={"1px solid #EBEBEB"} 
									borderRadius={"5px"}
									display={"flex"}
									alignItems={"center"}
									justifyContent={"start"}
									px={2}
								>
									{`${Math.round(scale * 100)}%`}
								</Box>
								<Slider
									aria-label="zoom-slider"
									defaultValue={1}
									min={0.5}
									max={2}
									step={0.1}
									value={scale}
									onChange={(val) => setScale(val)}
								>
									<SliderTrack>
										<SliderFilledTrack bg='tomato'/>
									</SliderTrack>
									<SliderThumb boxSize={5} bg={'transparent'} p={0}>
										<FaRegCircle size={"20px"} color='#FF6347' style={{background: "#ffffff", padding: "0px"}} />
									</SliderThumb>
								</Slider>
								<FaRegEdit 
									color='#333333' 
									size={30} 
									onClick={() => setIsOpenNote(!isOpenNote)}
									cursor={"pointer"}
								/>
								{isOpenNote && 
									<Box 
										width={"700px"}
										height={"150px"}
										p={3}
										borderRadius={"15px"}
										bg={"#ffffff"}
										pos={"absolute"}
										bottom={"80px"}
										left="50%" 
										transform="translateX(-50%)" 
										display={"flex"}
										flexDir={"column"}
										alignItems={"end"}
										gap={"10px"}
									>
										<Textarea
											value={note}
											onChange={(e) => setNote(e.target.value)}
											placeholder='Here is a sample placeholder'
											size='sm'
											borderRadius={"15px"}
										/>
										<Button 
											bg={"#2B2B2B"}
											color={"#ffffff"}
											onClick={() => setIsOpenNote(false)}
										>
											save
										</Button>
									</Box>
								}
							</Box>
							<Box
								display={"flex"}
								alignItems={"center"}
								justifyContent={"center"}
								gap={"20px"}
							>
								<Text>
									$ {price}
								</Text>
								<Button 
									bg={"#F46267"} 
									color={"white"}
									onClick={handleAddToCart}
								>
									{atcLoading ? <Spinner/> : "Add to Cart"}
								</Button>
							</Box>
						</Box>

					</GridItem>
				</Grid>
			</Box>
			<Modal isOpen={isPreviewOpen} onClose={onPreviewClose}>
				<ModalOverlay />
				<ModalContent
					maxW={"1200px"}
					height={"800px"}
				>
					<ModalHeader borderBottom={"1px solid #EBEBEB"}>Frame Preview</ModalHeader>
					<ModalCloseButton />
					<ModalBody p={0}>
						<Mockup mockupImage={mockupImage} device={device}/>
					</ModalBody>

					<ModalFooter borderTop={"1px solid #EBEBEB"}>
						{/* <Button bg='#F9F9F9' color={"#374144"} mr={3} >
							Cancel
						</Button> */}
						<Button 
							bg={"#F46267"} 
							color={"#ffffff"}
							onClick={onPreviewClose}
						>
							Done
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			{!atcLoading &&
				<>
				{(shareLoading || bgRemoveLoading) &&
						<Box 
							position={"absolute"}
							left={0}
							right={0}
							top={0}
							bottom={0}
							zIndex={999}
							display={"flex"}
							flexDir={"column"}
							alignItems={"center"}
							justifyContent={"center"}
							gap={"20px"}
							bg={"#000000"}
							opacity={".8"}
						>
							<Spinner 
								thickness='4px'
								speed='0.65s'
								emptyColor='gray.200'
								color='blue.500'
								size='xl' 
							/>
							<Text color={"red"}>
								Processing
							</Text>
						</Box>
					}
				</>
			}
		</>
	);
};

export default DesktopLayout;

// #F46267