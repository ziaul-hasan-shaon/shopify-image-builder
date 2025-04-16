import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import { FiPlus } from "react-icons/fi";
import GradientColorPicker from "./GradientColorPicker";
import { renderToStaticMarkup } from 'react-dom/server';
// import butterfly1 from "../../assets/Images/Pattern/butterfly/15716683_5670573.jpg"
// import butterfly2 from "../../assets/Images/Pattern/butterfly/74878263_9826716.jpg"
// import butterfly3 from "../../assets/Images/Pattern/butterfly/Frame 427319183 (4).png"
// import butterfly4 from "../../assets/Images/Pattern/butterfly/Frame 427319189 (3).png"
// import butterfly5 from "../../assets/Images/Pattern/butterfly/Frame 427319190 (2).png"
// import paws1 from "../../assets/Images/Pattern/paws/1123963_OPSEG70.jpg"
// import paws2 from "../../assets/Images/Pattern/paws/81091509_SL-011023-55240-04.jpg"
// import paws3 from "../../assets/Images/Pattern/paws/88417252_JEMA VIVI 022-02.jpg"
// import flower1 from "../../assets/Images/Pattern/flower/1222862_145830-OU02ZB-282.jpg"
// import flower2 from "../../assets/Images/Pattern/flower/74878235_9826756.jpg"
// import flower3 from "../../assets/Images/Pattern/flower/4986022_2619336.jpg"
// import cat1 from "../../assets/Images/Pattern/cats/Frame 427319183 (5).png"
// import cat2 from "../../assets/Images/Pattern/cats/Frame 427319189 (4).png"
import  Cat1  from "../../assets/Images/Pattern/cats/Cat.svg?react";
import  Cat2  from "../../assets/Images/Pattern/cats/Cat1.svg?react";
import  Cat3  from "../../assets/Images/Pattern/cats/Cat (1).svg?react";
import  Dog from "../../assets/Images/Pattern/cats/Dog.svg?react";
import PatterBackgroundColor from "./PatterBackgroundColor";


const BackgroundPatternTabs = ({ 
	color, 
	setColor, 
	gradientList, 
	setGradientList, 
	addBackground, 
	gradientBg,
	setGradientBg,
	patterBg,
	setPatternBg,
	bgImage,
	setBgImage, 
	addSVGBackgroundWithColorChange,
	svgColor,
	setSvgColor,
	device
}) => {

	const [isBackgroundActive, setIsBackgroundActive] = useState(true)
	const [isPatternActive, setIsPatternActive] = useState(false)
	const [svgContent, setSvgContent] = useState('');
	const [patternBgColor, setPatternBgColor] = useState("#ffffff")
	const [patten, setPattern] = useState("")

	// console.log('svgContent', svgContent)

	const { isOpen, onOpen, onClose } = useDisclosure(); // Controls the popover state
	const {
		isOpen: isPtternBgOpen,
		onOpen: onPattenBgOpen,
		onClose: onPatternBgClose
	} = useDisclosure()

	const abastruct1 = "https://i.ibb.co.com/j9cG5Q4F/9aa37b2666e71247f91694767e5dc010.jpg"
	const abastruct2 = "https://i.ibb.co.com/pBLjDXtL/5a7f82b20e2e1ea58a87abb82533b673.jpg"
	const abastruct3 = "https://i.ibb.co.com/Xxvv2Kj7/78926fcde6ef1f13cc381bf869ecf9fb.jpg"
	const abastruct4 = "https://i.ibb.co.com/PsQt1tsX/c704c210f2a05145bc9149606a3719db.jpg"
	const abastruct5 = "https://i.ibb.co.com/NdbjLkky/913d1c1173f4c53fb1aa534e5aef69f8.jpg"
	const abastruct6 = "https://i.ibb.co.com/NnxqRCJ3/1ff4f598c093f12c238f798a6dee26ca.jpg"

	const abastruct = [abastruct1, abastruct2, abastruct3, abastruct4, abastruct5, abastruct6]

	const solidColorPalate = [
		"#FF7878", "#A23E3E", "#667FBA", "#BABFEE", "#D5DAFF", "#00CCFF", "#F61919", "#193DF6", "#19F664"
	]

	const convertSvg = async(svg) => {
		const response = await fetch(svg);
		const svgText = await response.text();
		const parser = new DOMParser();
		const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

		return  svgDoc.documentElement.outerHTML
	}

	const [cats, setCats] = useState([]); // State to hold the SVGs

  useEffect(() => {
    const components = [Cat1, Cat2, Cat3, Dog];
    setCats(components.map((Component) => <Component />));
  }, []);

	// console.log('cats', cats)

	// console.log('bgImg', bgImage)
	// console.log('patterBg', patterBg)

	const fetchAndColor = () => {
		if(bgImage){
			const parser = new DOMParser();
			const svgDoc = parser.parseFromString(bgImage, 'image/svg+xml');
	
		const paths = svgDoc.querySelectorAll('path, circle, rect, polygon, ellipse');
	
		paths.forEach(el => {
			el.setAttribute('stroke', svgColor);       // Change stroke color
			el.setAttribute('fill', patternBgColor);   // Change fill color
		});
	
		setSvgContent(svgDoc.documentElement.outerHTML);
		}
	};
	

	useEffect(() => {
    if(patterBg){
			fetchAndColor();
		}
  }, [bgImage, svgColor, patternBgColor]);


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
											<Box width={"30px"} height={"30px"} bg={color} borderRadius={"5px"} border={"1px solid #EBEBEB"}>

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
											setBgImage(gradient)
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
											<GradientColorPicker gradientList={gradientList} setGradientList={setGradientList} onClose={onClose} isOpen={isOpen} device={device}/>
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
												setBgImage(abImg)
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
					 <Popover isOpen={isPtternBgOpen} onOpen={onPattenBgOpen} onClose={onPatternBgClose} placement="bottom-start">
							 <PopoverTrigger>
									 <Button display="flex" alignItems="center" justifyContent="space-between" width="100%" height="50px" border='1px solid #EBEBEB' bg="none" cursor="pointer">
											 <Box display="flex" alignItems="center" justifyContent="start" gap="10px">
													 <Box width="30px" height="30px" bg={svgColor} borderRadius="5px" border={"1px solid #EBEBEB"}/>
													 <Text>{svgColor}</Text>
											 </Box>
											 <Text>Reset</Text>
									 </Button>
							 </PopoverTrigger>
							 <PopoverContent width={'max-content'}>
									 <PopoverArrow />
									 <PopoverBody>
											 <PatterBackgroundColor color={svgColor} setColor={setSvgColor} svgContent={svgContent} addSVGBackgroundWithColorChange={addSVGBackgroundWithColorChange} setPatternBgColor={setPatternBgColor} patternBgColor={patternBgColor} onClose = {onPatternBgClose} isOpen={isPtternBgOpen}/>
									 </PopoverBody>
							 </PopoverContent>
					 </Popover>

					 <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple my={4}>
							 {[{ title: "Cats", items: cats }].map((section, index) => (
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
											 <style>
													{`
														.convert-svg svg {
															width: 85px;
															height: 60px;
															object-fit: cover;
														}
													`}
												</style>

												<Box display="flex" alignItems="center" justifyContent="start" gap={2} mt="10px" flexWrap="wrap">
													{cats.map((CatElement, idx) => {
														const Component = [Cat1, Cat2, Cat3, Dog][idx];
														const svgString = renderToStaticMarkup(<Component />);

														return (
															<Box
																key={idx}
																onClick={() => {
																	addSVGBackgroundWithColorChange(svgString);
																	setGradientBg(false);
																	setPatternBg(true);
																	setBgImage(svgString);
																	setPattern(svgString);
																}}
																className="convert-svg"
																style={{
																	width: '90px',
																	height: '60px',
																	borderRadius: '5px',
																	marginBottom: '10px',
																	objectFit: 'cover',
																	border: patten === svgString ? '2px solid #2B2B2B' : '1px solid #E5E5E5',
																	cursor: 'pointer',
																}}
															>
																{CatElement}
															</Box>
														);
													})}
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