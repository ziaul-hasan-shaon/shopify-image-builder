import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import ColorPicker from "./ColorPicker";
import { FiPlus } from "react-icons/fi";
import GradientColorPicker from "./GradientColorPicker";
import abastruct1 from "../../assets/Images/Abastruct/1ff4f598c093f12c238f798a6dee26ca.jpeg"
import abastruct2 from "../../assets/Images/Abastruct/5a7f82b20e2e1ea58a87abb82533b673.jpeg"
import abastruct3 from "../../assets/Images/Abastruct/78926fcde6ef1f13cc381bf869ecf9fb.jpeg"
import abastruct4 from "../../assets/Images/Abastruct/913d1c1173f4c53fb1aa534e5aef69f8.jpeg"
import abastruct5 from "../../assets/Images/Abastruct/9aa37b2666e71247f91694767e5dc010.jpeg"
import abastruct6 from "../../assets/Images/Abastruct/c704c210f2a05145bc9149606a3719db.jpeg"
import butterfly1 from "../../assets/Images/Pattern/butterfly/15716683_5670573.jpg"
import butterfly2 from "../../assets/Images/Pattern/butterfly/74878263_9826716.jpg"
import butterfly3 from "../../assets/Images/Pattern/butterfly/Frame 427319183 (4).png"
import butterfly4 from "../../assets/Images/Pattern/butterfly/Frame 427319189 (3).png"
import butterfly5 from "../../assets/Images/Pattern/butterfly/Frame 427319190 (2).png"
import paws1 from "../../assets/Images/Pattern/paws/1123963_OPSEG70.jpg"
import paws2 from "../../assets/Images/Pattern/paws/81091509_SL-011023-55240-04.jpg"
import paws3 from "../../assets/Images/Pattern/paws/88417252_JEMA VIVI 022-02.jpg"
import flower1 from "../../assets/Images/Pattern/flower/1222862_145830-OU02ZB-282.jpg"
import flower2 from "../../assets/Images/Pattern/flower/74878235_9826756.jpg"
import flower3 from "../../assets/Images/Pattern/flower/4986022_2619336.jpg"
import cat1 from "../../assets/Images/Pattern/cats/Frame 427319183 (5).png"
import cat2 from "../../assets/Images/Pattern/cats/Frame 427319189 (4).png"


const BackgroundPatternTabs = ({ 
	color, 
	setColor, 
	gradientList, 
	setGradientList, 
	addBackground, 
	gradientBg,
	setGradientBg,
	patterBg,
	setPatternBg
}) => {

	const [isBackgroundActive, setIsBackgroundActive] = useState(true)
	const [isPatternActive, setIsPatternActive] = useState(false)

	const { isOpen, onOpen, onClose } = useDisclosure(); // Controls the popover state

	const abastruct = [abastruct1, abastruct2, abastruct3, abastruct4, abastruct5, abastruct6]

	const solidColorPalate = [
		"#FF7878", "#A23E3E", "#667FBA", "#BABFEE", "#D5DAFF", "#00CCFF", "#F61919", "#193DF6", "#19F664"
	]

	const butterflies = [ butterfly1, butterfly2, butterfly3, butterfly4, butterfly5]
	const paws = [paws1, paws2, paws3]
	const flowers = [flower1, flower2, flower3] 
	const cats = [cat1, cat2]

	return (
		<>
			<Box p={5}>
				<HStack>
					<Button
						onClick={() => {
							setIsBackgroundActive(true);
							setIsPatternActive(false)
						}}
						width={"100%"}
						bg={isBackgroundActive ? "#2B2B2B" : "#F9F9F9"}
						color={isBackgroundActive ? "#ffffff" : "#374144"}
					>
						Background
					</Button>
					<Button
						onClick={() => {
							setIsPatternActive(true);
							setIsBackgroundActive(false)
						}}
						width={"100%"}
						bg={isPatternActive ? "#2B2B2B" : "#F9F9F9"}
						color={isPatternActive ? "#ffffff" : "#374144"}
					>
						Pattern
					</Button>
				</HStack>
				{isBackgroundActive &&
					<Box py={4}>
						<Box>
							<Popover placement="bottom-start">
								<PopoverTrigger>
									<Button display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"} height={"50px"} border={'1px solid #EBEBEB'} bg={"none"} cursor={"pointer"}>
										<Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={"10px"} >
											<Box width={"30px"} height={"30px"} bg={color} borderRadius={"5px"}>

											</Box>
											<Text> {color}</Text>
										</Box>
										<Text>Reset</Text>
									</Button>
								</PopoverTrigger>
								<PopoverContent width={'max-content'}>
									<PopoverArrow />
									{/* <PopoverCloseButton /> */}
									<PopoverBody>
										<ColorPicker color={color} setColor={setColor} />
									</PopoverBody>
								</PopoverContent>
							</Popover>
						</Box>
						<Box my={4}>
							<Text>
								Solid Background
							</Text>
							<Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={2} mt={'10px'}>
								{
									solidColorPalate?.map((solidColor, index) => (
										<Box
											key={index}
											bg={solidColor}
											w={"40px"}
											h={"40px"}
											borderRadius={"5px"}
											onClick={() => setColor(solidColor)}
											cursor={"pointer"}
										/>
									))
								}
							</Box>
						</Box>
						<Box>
							<Text>
								Gradient Background
							</Text>
							<Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={2} mt={'10px'} flexWrap={"wrap"}>
								{gradientList.map((gradient, index) => (
									<img
										key={index}
										src={gradient}
										alt={`Gradient ${index}`}
										onClick={() => {
											addBackground(gradient, "");
											setGradientBg(true);
											setPatternBg(false)
										}}
										style={{
											width: "40px",
											height: "40px",
											borderRadius: "5px",
											marginBottom: "10px",
											cursor: "pointer"
										}}
									/>
								))}
							</Box>
							<Box my={4}>
								<Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="bottom-start">
									<PopoverTrigger>
										<Button
											display={"flex"}
											alignItems={"center"}
											justifyContent={"center"}
											gap={"10px"}
											width={"100%"}
										>
											<FiPlus />
											Generate Your Gradient Color
										</Button>
									</PopoverTrigger>
									<PopoverContent width={'max-content'}>
										<PopoverArrow />
										{/* <PopoverCloseButton /> */}
										<PopoverBody>
											<GradientColorPicker gradientList={gradientList} setGradientList={setGradientList} onClose={onClose} />
										</PopoverBody>
									</PopoverContent>
								</Popover>
							</Box>
						</Box>
						<Box>
							<Text>
								Abstract
							</Text>
							<Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={2} mt={'10px'} flexWrap={"wrap"}>
								{
									abastruct?.map((abImg, index) => (
										<Image
											key={index}
											src={abImg}
											alt="abastruct image"
											onClick={() => {
												addBackground(abImg, "");
												setGradientBg(true);
												setPatternBg(false)
											}}
											style={{
												width: "90px",
												height: "60px",
												borderRadius: "5px",
												marginBottom: "10px",
												cursor: "pointer"
											}}
										/>
									))
								}
							</Box>
						</Box>
					</Box>}
				{isPatternActive &&
					 <Box my={4}>
					 <Popover placement="bottom-start">
							 <PopoverTrigger>
									 <Button display="flex" alignItems="center" justifyContent="space-between" width="100%" height="50px" border='1px solid #EBEBEB' bg="none" cursor="pointer">
											 <Box display="flex" alignItems="center" justifyContent="start" gap="10px">
													 <Box width="30px" height="30px" bg={color} borderRadius="5px"></Box>
													 <Text>{color}</Text>
											 </Box>
											 <Text>Reset</Text>
									 </Button>
							 </PopoverTrigger>
							 <PopoverContent width={'max-content'}>
									 <PopoverArrow />
									 <PopoverBody>
											 <ColorPicker color={color} setColor={setColor} />
									 </PopoverBody>
							 </PopoverContent>
					 </Popover>

					 <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple my={4}>
							 {[{ title: "Butterfly", items: butterflies }, { title: "Paws", items: paws }, { title: "Flowers", items: flowers }, { title: "Cats", items: cats }].map((section, index) => (
									 <AccordionItem key={index}>
											 <h2>
													 <AccordionButton>
															 <Box flex="1" textAlign="left">
																	 {section.title}
															 </Box>
															 <AccordionIcon />
													 </AccordionButton>
											 </h2>
											 <AccordionPanel pb={4}>
													 <Box display="flex" alignItems="center" justifyContent="start" gap={2} mt="10px" flexWrap="wrap">
															 {section.items?.map((item, idx) => (
																	 <Image
																			 key={idx}
																			 src={item}
																			 alt={section.title}
																			 onClick={() => {
																				addBackground(item, "");
																				setGradientBg(false);
																				setPatternBg(true);
																			 }}
																			 style={{
																					 width: "90px",
																					 height: "60px",
																					 borderRadius: "5px",
																					 marginBottom: "10px",
																					 objectFit: "cover",
																					 border: "1px solid #E5E5E5",
																					 cursor: "pointer"
																			 }}
																	 />
															 ))}
													 </Box>
											 </AccordionPanel>
									 </AccordionItem>
							 ))}
					 </Accordion>
			 </Box>}
			</Box>
		</>
	);
};

export default BackgroundPatternTabs;