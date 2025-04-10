import { Box, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const Mockup = ({ mockupImage }) => {

	const mockup1 = "https://i.ibb.co.com/hFR1dsMN/mockup1.jpg"
	const mockup2 = "https://i.ibb.co.com/vvcGV2gF/mockup2.jpg"
	const mockup3 = "https://i.ibb.co.com/7xmNLy5h/mockup3.jpg"
	const mockup4 = "https://i.ibb.co.com/xtjQsDGj/mockup4.jpg"
	const mockup5 = "https://i.ibb.co.com/9kJmHD2C/mockup5.jpg"
	const mockup6 = "https://i.ibb.co.com/Hff1BC17/mockup6.jpg"
	const mockup7 = "https://i.ibb.co.com/Xrxcg0PM/mockup7.jpg"
	const mockup8 = "https://i.ibb.co.com/x8JF7DNn/mockup8.jpg"
	const mockup9 = "https://i.ibb.co.com/9mC9VrNH/mockup9.jpg"

	const mockupCollection = [mockup1, mockup2, mockup3, mockup4, mockup5, mockup6, mockup7, mockup8, mockup9]
	const [showMockup, setShowMockup] = useState(null)

	// console.log('showMockup', showMockup)

	const clipPathValue =
  showMockup === mockup3
    ? 'polygon(1% 5%, 100% 0%, 98% 100%, 0% 100%)'
    :
		showMockup === mockup8 ? 'polygon(0% 0%, 100% 0%, 100% 100%, 1% 100%)'
		:
		showMockup === mockup9 ? 'polygon(0% 0%, 98% 0%, 97% 98%, 0% 100%)'
		: 'none';

	return (
		<>
			<style>
				{
					`
						.mockupImage{
							clip-path: ${clipPathValue};
						}
					`
				}
			</style>
			<Box>
				<Grid gridTemplateColumns={"repeat(10, 1fr)"}>
					<GridItem colSpan={3} px={4} borderRight={"1px solid #EBEBEB"}>
						<Text my={3} fontSize={"18px"} fontWeight={"semibold"}>Select a mockup</Text>
						<Grid
							gridTemplateColumns={"repeat(2, 1fr)"}
							gap={"10px"}
							height={"610px"}
							overflowY={"auto"}
							justifyItems={"center"}
							sx={{
								scrollbarWidth: "none"
							}}
						>
							{mockupCollection?.map((mockup, index) => (
								<GridItem 
									key={index} 
									cursor={"pointer"} 
									onClick={() => setShowMockup(mockup)}
								>
									<Image 
										borderRadius={"10px"} 
										width={"150px"} 
										height={"170px"} 
										border={showMockup === mockup ? "2px solid #F46267" : ""}
										src={mockup} 
										alt={`${mockup} + 1`} 
										objectFit={"cover"} 
									/>
								</GridItem>
							))}
						</Grid>
					</GridItem>
					<GridItem colSpan={7} display={"flex"} alignItems={"center"} justifyContent={"center"}>
						{showMockup ?
							<Box 
								width={"500px"} 
								height={"500px"}
								position={"relative"}
							>
								<Image 
									width={"100%"} 
									height={"100%"} 
									objectFit={"cover"} 
									src={showMockup} 
									alt='mockup' 
								/>
								<Image
									className='mockupImage'
									src={mockupImage}
									position={"absolute"}
									objectFit={"cover"}
									width={
										showMockup === mockup1 ? "113px" :
										showMockup === mockup2 ? "205px" :
										showMockup === mockup3 ? "114px" :
										showMockup === mockup4 ? "200px" :
										showMockup === mockup5 ? "125px" : 
										showMockup === mockup6 ? "174px" : 
										showMockup === mockup7 ? "188px" :
										showMockup === mockup9 ? "360px" :
										showMockup === mockup8 ? "365px" :
										// showMockup === mockup10 ? "255px" : "100px"
										"0px"
										}
									height={
										showMockup === mockup1 ? "210px" :
										showMockup === mockup2 ? "250px" :
										showMockup === mockup3 ? "135px" :
										showMockup === mockup4 ? "230px" :
										showMockup === mockup5 ? "160px" : 
										showMockup === mockup6 ? "233px" :
										showMockup === mockup7 ? "255px" :
										showMockup === mockup9 ? "246px" :
										showMockup === mockup8 ? "250px" :
										// showMockup === mockup10 ? "185px" : "100px"
										"0px"
									}
									top={
										showMockup === mockup1 ? "2%" :
										showMockup === mockup2 ? "10%" :
										showMockup === mockup3 ? "23%" :
										showMockup === mockup4 ? "0%" : 
										showMockup === mockup5 ? "10%" :
										showMockup === mockup6 ? "10%" :
										showMockup === mockup7 ? "10%" :
										showMockup === mockup9 ? "43%" :
										showMockup === mockup8 ? "24%" :
										// showMockup === mockup10 ? "39%" : "0px"
										"0px"
									}
									right={
										showMockup === mockup1 ? "52%" :
										showMockup === mockup2 ? "27%" :
										showMockup === mockup3 ? "18%" :
										showMockup === mockup4 ? "28%" :
										showMockup === mockup5 ? "40%" :
										showMockup === mockup6 ? "32%" :
										showMockup === mockup7 ? "32%" :
										showMockup === mockup9 ? "17%" :
										showMockup === mockup8 ? "11%" :
										// showMockup === mockup10 ? "24%" : "0px"
										"0px"
									}
								/>
								{showMockup === mockup1 && 
								<Image
									src={mockupImage}
									position={"absolute"}
									objectFit={"cover"}
									width={"113px"}
									height={"210px"}
									top={"2%"}
									right={"25%"}
								/>}
							</Box> :
							<Box width={"500px"} height={"500px"}>
								<Image width={"100%"} height={"100%"} objectFit={"cover"} src={mockupImage} alt='mockup' />
							</Box>
						}
					</GridItem>
				</Grid>
			</Box>
		</>
	);
};

export default Mockup;