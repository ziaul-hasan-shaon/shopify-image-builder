import { Box, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import mockup1 from '../../assets/Images/Mockup/mockup1.jpeg'
import mockup2 from '../../assets/Images/Mockup/mockup2.jpeg'
import mockup3 from '../../assets/Images/Mockup/mockup3.jpeg'
import mockup4 from '../../assets/Images/Mockup/mockup4.jpeg'
import mockup5 from '../../assets/Images/Mockup/mockup5.jpeg'
import mockup6 from '../../assets/Images/Mockup/mockup6.jpeg'
import mockup7 from '../../assets/Images/Mockup/mockup7.jpeg'
import mockup8 from '../../assets/Images/Mockup/mockup8.jpg'
import mockup9 from '../../assets/Images/Mockup/mockup9.jpg'
import mockup10 from '../../assets/Images/Mockup/mockup10.jpg'

const Mockup = () => {

	const mockupCollection = [mockup1, mockup2, mockup3, mockup4, mockup5, mockup6, mockup7, mockup8, mockup9, mockup10]
	const [showMockup, setShowMockup] = useState(null)

	return (
		<>
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
								<GridItem key={index} cursor={"pointer"} onClick={() => setShowMockup(mockup)}>
									<Image borderRadius={"10px"} width={"150px"} height={"170px"} src={mockup} alt={`${mockup} + 1`} objectFit={"cover"} />
								</GridItem>
							))}
						</Grid>
					</GridItem>
					<GridItem colSpan={7} display={"flex"} alignItems={"center"} justifyContent={"center"}>
						{showMockup &&
							<Box width={"500px"} height={"500px"}>
								<Image width={"100%"} height={"100%"} objectFit={"cover"} src={showMockup} alt='mockup' />
							</Box>}
					</GridItem>
				</Grid>
			</Box>
		</>
	);
};

export default Mockup;