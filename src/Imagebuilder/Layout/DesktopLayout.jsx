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
import PageTabs from '../Components/PageTabs';
import { usePage } from '../hook/PageContext';
import AddOns from '../Components/AddOns';

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
		device,
		isAddonOpen,
		setIsAddonOpen
	}
) => {

	const [scale, setScale] = useState(1); // Default zoom level
	const [isFullScreen, setIsFullScreen] = useState(false)

	const {currentPage} = usePage()

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
	const handleIsAddOnsOpen = () => {
		setIsTemplateOpen(false);
		setIsUploadOpen(false);
		setIsBackgroundOpen(false);
		setIsTextOpen(false)
		setIsBorderOpen(false)
		setIsAddonOpen(true)
	}

	return (
		<>
			<Box>
				{!isFullScreen &&
				<Grid
				gridTemplateColumns={"repeat(16, 1fr)"}
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
					colSpan={4}
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
					borderRight={"1px solid #EEEEEE"}
				>
					<Box width={"100%"} p={3}>
						<Popover isOpen={isArtboardOpen} onOpen={onArtboardOpen} onClose={onArtboardClose} placement="bottom-start">
							<PopoverTrigger>
								<Button disabled={currentPage === "2d-cutout"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"} height={"50px"} border={'1px solid #EBEBEB'} bg={"#F9F9F9"} cursor={"pointer"}>
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
					colSpan={11}
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
					<Box
						display={"flex"}
						alignItems={"center"}
						gap={"16px"}
					>
					<Button
						color={"#F46267"}
						bg={"#FEEFF0"}
						border={"1px solid #FCCED0"}
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3 10.5V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H12.5M21 10.5V12.5" stroke="#F46267" stroke-width="1.25" stroke-linecap="round"/>
							<path d="M22 17.5H14M22 17.5C22 18.2002 20.0057 19.5085 19.5 20M22 17.5C22 16.7998 20.0057 15.4915 19.5 15" stroke="#F46267" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M17.7947 2.00254L6.14885 2.03002C4.41069 1.94542 3.96502 3.2116 3.96502 3.83056C3.96502 4.38414 3.88957 5.19117 2.82426 6.70798C1.75895 8.22478 1.839 8.67537 2.43973 9.72544C2.9383 10.5969 4.20643 10.9374 4.86764 10.9946C6.96785 11.0398 7.98968 9.32381 7.98968 8.1178C9.03154 11.1481 11.9946 11.1481 13.3148 10.8016C14.6376 10.4545 15.7707 9.2118 16.0381 8.1178C16.194 9.47735 16.6672 10.2707 18.0653 10.8158C19.5135 11.3805 20.7589 10.5174 21.3838 9.9642C22.0087 9.41096 22.4097 8.18278 21.2958 6.83288C20.5276 5.90195 20.2074 5.02494 20.1023 4.11599C20.0413 3.58931 19.9878 3.02336 19.5961 2.66323C19.0238 2.13691 18.2026 1.97722 17.7947 2.00254Z" stroke="#F46267" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</Button>
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
									<Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"10px"} p={2} bg={"#EBEBEB"} borderRadius={"10px"} width={"100%"} >
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
											<Text fontSize={"14px"}>Standard</Text>
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
											<Text fontSize={"14px"}>High</Text>
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
											<Text fontSize={"14px"}>Extra</Text>
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
					</Box>
				</GridItem>
			</Grid>}
			</Box>
			<Box>
				<Grid
					gridTemplateColumns={"repeat(16, 1fr)"}
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
						<svg width="32" height="32" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M2.5 15C2.5 10.3886 2.5 8.08288 3.51728 6.44846C3.89363 5.84378 4.36114 5.31784 4.89864 4.89442C6.35145 3.75 8.40096 3.75 12.5 3.75H17.5C21.599 3.75 23.6485 3.75 25.1014 4.89442C25.6389 5.31784 26.1064 5.84378 26.4828 6.44846C27.5 8.08288 27.5 10.3886 27.5 15C27.5 19.6114 27.5 21.9171 26.4828 23.5515C26.1064 24.1562 25.6389 24.6821 25.1014 25.1056C23.6485 26.25 21.599 26.25 17.5 26.25H12.5C8.40096 26.25 6.35145 26.25 4.89864 25.1056C4.36114 24.6821 3.89363 24.1562 3.51728 23.5515C2.5 21.9171 2.5 19.6114 2.5 15Z" stroke={isTemplateOpen ? "#F46267" : "#374144"} stroke-width="2" />
							<path d="M11.875 3.75V26.25" stroke={isTemplateOpen ? "#F46267" : "#374144"} stroke-width="2" stroke-linejoin="round" />
							<path d="M6.25 8.75H7.5M6.25 12.5H7.5" stroke={isTemplateOpen ? "#F46267" : "#374144"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						<Text fontSize={"14px"}>Template</Text>
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
						<svg width="32" height="32" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M21.25 9.375C21.8644 10.0071 23.4997 12.5 24.375 12.5M24.375 12.5C25.2503 12.5 26.8856 10.0071 27.5 9.375M24.375 12.5V2.5" stroke={isUploadOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M26.2499 16.25C26.2475 21.4337 26.184 24.0879 24.511 25.761C22.7719 27.5 19.9729 27.5 14.375 27.5C8.77707 27.5 5.97811 27.5 4.23905 25.761C2.5 24.0219 2.5 21.2229 2.5 15.625C2.5 10.0271 2.5 7.22811 4.23905 5.48905C5.97811 3.75 8.77707 3.75 14.375 3.75C14.5874 3.75 17.5 3.7501 17.5 3.7501" stroke={isUploadOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" />
							<path d="M2.5 17.6692C3.27377 17.5568 4.05605 17.5013 4.83964 17.5033C8.15456 17.4332 11.3883 18.4661 13.9639 20.4177C16.3525 22.2276 18.0309 24.7186 18.75 27.5" stroke={isUploadOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linejoin="round" />
							<path d="M26.25 21.1202C24.7807 20.3761 23.261 19.9984 21.7327 20.0001C19.4181 19.9909 17.1269 20.8416 15 22.4999" stroke={isUploadOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linejoin="round" />
						</svg>
						<Text fontSize={"14px"}>Upload</Text>
					</Box>
					{
						currentPage !== "2d-cutout" && 
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
						<svg width="32" height="32" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.31595 25.3775C7.06925 26.875 9.71284 26.875 15 26.875C20.2871 26.875 22.9307 26.875 24.684 25.3775C24.933 25.1649 25.1649 24.933 25.3775 24.684C26.875 22.9307 26.875 20.2871 26.875 15C26.875 9.71284 26.875 7.06925 25.3775 5.31595C25.1649 5.06697 24.933 4.8351 24.684 4.62246C22.9307 3.125 20.2871 3.125 15 3.125C9.71284 3.125 7.06925 3.125 5.31595 4.62246C5.06697 4.8351 4.8351 5.06697 4.62246 5.31595C3.125 7.06925 3.125 9.71284 3.125 15C3.125 20.2871 3.125 22.9307 4.62246 24.684C4.8351 24.933 5.06697 25.1649 5.31595 25.3775Z" stroke={isBackgroundOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M5 25L25 5" stroke={isBackgroundOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M3.37256 19.7526L19.7572 3.36792" stroke={isBackgroundOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M26.6322 10.2429L10.2476 26.6276" stroke={isBackgroundOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M16.875 26.875L26.875 16.875" stroke={isBackgroundOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M3.125 13.125L13.125 3.125" stroke={isBackgroundOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						<Text fontSize={"14px"}>Background</Text>
					</Box>
					}
					{
						currentPage !== "2d-cutout" && 
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
							<svg width="32" height="32" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M18.75 26.2512H11.25" stroke={isTextOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M15 3.75V26.251M15 3.75C16.7343 3.75 18.9619 3.78818 20.7355 3.9706C21.4856 4.04774 21.8608 4.08631 22.1926 4.22237C22.8833 4.50535 23.4397 5.12577 23.6492 5.846C23.75 6.19226 23.75 6.58739 23.75 7.37768M15 3.75C13.2657 3.75 11.0381 3.78818 9.26451 3.9706C8.51438 4.04774 8.1393 4.08631 7.80733 4.22237C7.1168 4.50535 6.5602 5.12577 6.35071 5.846C6.25 6.19226 6.25 6.58739 6.25 7.37768" stroke={isTextOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" />
							</svg>
							<Text fontSize={"14px"}>Text</Text>
						</Box>
					}
					{
						currentPage !== "2d-cutout" && 
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
							<svg width="32" height="32" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5 2.5V5M27.5 25H25M20.625 25H12.5C8.96446 25 7.1967 25 6.09835 23.9016C5 22.8032 5 21.0355 5 17.5V9.375" stroke={isBorderOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M25 27.5V15C25 10.286 25 7.92894 23.5355 6.46447C22.0711 5 19.714 5 15 5H2.5" stroke={isBorderOpen ? "#F46267" : "#374144"} stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
							<Text fontSize={"14px"}>Border</Text>
						</Box>
					}
					{
						currentPage === "2d-cutout" &&
							<Box
								p={4}
								display={"flex"}
								flexDir={"column"}
								alignItems={"center"}
								justifyContent={"center"}
								gap={"10px"}
								onClick={handleIsAddOnsOpen}
								cursor={"pointer"}
							>
								<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M3.125 7.5C3.125 5.57445 3.125 4.61167 3.55841 3.90441C3.80092 3.50866 4.13366 3.17592 4.52941 2.93341C5.23667 2.5 6.19945 2.5 8.125 2.5C10.0505 2.5 11.0133 2.5 11.7206 2.93341C12.1163 3.17592 12.4491 3.50866 12.6916 3.90441C13.125 4.61167 13.125 5.57445 13.125 7.5C13.125 9.42555 13.125 10.3883 12.6916 11.0956C12.4491 11.4913 12.1163 11.8241 11.7206 12.0666C11.0133 12.5 10.0505 12.5 8.125 12.5C6.19945 12.5 5.23667 12.5 4.52941 12.0666C4.13366 11.8241 3.80092 11.4913 3.55841 11.0956C3.125 10.3883 3.125 9.42555 3.125 7.5Z" stroke={isAddonOpen ? "#F46267" : "#374144"} stroke-width="1.5"/>
								<path d="M4.72708 18.4771C6.03565 17.1685 6.68994 16.5142 7.46513 16.3281C7.89888 16.224 8.35113 16.224 8.78488 16.3281C9.56007 16.5142 10.2144 17.1685 11.5229 18.4771C12.8315 19.7856 13.4858 20.4398 13.6719 21.2151C13.776 21.6488 13.776 22.1011 13.6719 22.5348C13.4858 23.3101 12.8315 23.9643 11.5229 25.2728C10.2144 26.5815 9.56007 27.2357 8.78489 27.4218C8.35113 27.526 7.89888 27.526 7.46513 27.4218C6.68994 27.2357 6.03565 26.5815 4.72708 25.2728C3.4185 23.9643 2.76422 23.3101 2.5781 22.5348C2.47397 22.1011 2.47397 21.6488 2.5781 21.2151C2.76422 20.4398 3.4185 19.7856 4.72708 18.4771Z" stroke={isAddonOpen ? "#F46267" : "#374144"} stroke-width="1.5"/>
								<path d="M17.5 22.5C17.5 20.5745 17.5 19.6116 17.9334 18.9044C18.1759 18.5086 18.5086 18.1759 18.9044 17.9334C19.6116 17.5 20.5745 17.5 22.5 17.5C24.4255 17.5 25.3884 17.5 26.0956 17.9334C26.4914 18.1759 26.8241 18.5086 27.0666 18.9044C27.5 19.6116 27.5 20.5745 27.5 22.5C27.5 24.4255 27.5 25.3884 27.0666 26.0956C26.8241 26.4914 26.4914 26.8241 26.0956 27.0666C25.3884 27.5 24.4255 27.5 22.5 27.5C20.5745 27.5 19.6116 27.5 18.9044 27.0666C18.5086 26.8241 18.1759 26.4914 17.9334 26.0956C17.5 25.3884 17.5 24.4255 17.5 22.5Z" stroke={isAddonOpen ? "#F46267" : "#374144"} stroke-width="1.5"/>
								<path d="M22.5 2.5V12.5M27.5 7.5H17.5" stroke={isAddonOpen ? "#F46267" : "#374144"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							<Text fontSize={"14px"}>AddOns</Text>
						</Box>
					}
				</GridItem>}
					{!isFullScreen && 
					<GridItem
					colSpan={4}
					borderRight={"1px solid #EEEEEE"}
				>
					{
						isTemplateOpen &&
						<>
						<Box height={"100%"} py={"10px"} display={"flex"} alignItems={"start"} justifyContent={"start"}>
							<PageTabs/>
							
						</Box>
						<Text fontSize={"18px"} fontWeight={"semibold"}>
							This feature will coming soon....
						</Text>
						</>
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
					{
						isAddonOpen && 
						<AddOns/>
					}
				</GridItem>}
					<GridItem 
						colSpan={isFullScreen ? 15 : 11} 
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
							<Canvas uploadedImages={uploadedImages} canvasRef={canvasRef} selectedBorder={selectedBorder} canvasHeight={canvasHeight} canvasWidth={canvasWidth} scale={scale} device = {device}/>
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