// components/PageTabs.js
import { HStack, Button, Grid, GridItem, Image, Box, Text, VStack } from '@chakra-ui/react';
import { usePage } from '../hook/PageContext';

const tabs = [
	{ key: 'all', label: 'All' },
	{ key: '2d-cutout', label: '2D CutOut' },
	{ key: '3d-acrylic', label: '3D Acrylic' },
	{ key: '2d-acrylic', label: '2D Acrylic' },
];

const cutOut2d = [
	"https://i.ibb.co/fzSSWLqC/3c67dadc403c3478818c10ee03fef984e2fe63d3-2.jpg",
	"https://i.ibb.co/x8Cz6khN/3c67dadc403c3478818c10ee03fef984e2fe63d3-1.jpg",
	"https://i.ibb.co/skzkDGD/6675c3e125c616f7e772ef608c642accaf3ad43d.png",
	"https://i.ibb.co/9DJxzBX/47e09dc1a0593c63ef193afc10ded52704cb1cbc.png",
	"https://i.ibb.co/V0HfbjRq/9802a195b1b06de1024d1d0d489a93cd6c786a7a.png",
	"https://i.ibb.co/d08Y5wxf/3c67dadc403c3478818c10ee03fef984e2fe63d3.jpg"
]

const acrylic3d = [
	{img:"https://i.ibb.co/pjDcZv5B/Image-Container.png", src: "https://i.ibb.co/pvTbHnQP/all-pattern-19.png"},
	{img:"https://i.ibb.co/5WryGTCd/Image-Container-1.png", src: "https://i.ibb.co/wN0BpFW6/all-pattern-48.png"}
]

const acrylic2d = [
	{img:	"https://i.ibb.co/6cPSmVQw/38e77b7096ca839244e7960d14e0af1b462262b5.png", src: "https://i.ibb.co/1tYKsQd7/all-pattern-07-3x.png"},
	{img:	"https://i.ibb.co/tMXpZpZf/c2eeb2baddda222c2a3df13aca5f2057814735f4.png", src: "https://i.ibb.co/ZR55kPLZ/all-pattern-18.png"},
	{img:	"https://i.ibb.co/h1hWvy6h/81d9fb1d7eec130e878ae7e05dba1ccb0aeaf96f.png", src: "https://i.ibb.co/DHDsdfb0/all-pattern-17.png"},
	{img:	"https://i.ibb.co/h1hWvy6h/81d9fb1d7eec130e878ae7e05dba1ccb0aeaf96f.png", src: "https://i.ibb.co/DHDsdfb0/all-pattern-17.png"},
	{img:	"https://i.ibb.co/S7cnF37M/cacf942e6521d674cc545e5fe4cf461ecb415c9e.png", src: "https://i.ibb.co/rKw57q8M/all-pattern-01-3x.png"},
	{img:	"https://i.ibb.co/qYcSh5VD/95bff68332456ec005baeafde5eadac57db10d8d.png", src: "https://i.ibb.co/PsPPYc7V/all-pattern-25.png"}
]

const PageTabs = ({
	setPatternBg,
	setBgImage,
	setGradientBg
}) => {
	const { currentPage, setCurrentPage } = usePage();

	return (
		<>
			<VStack>
				<HStack spacing={4} width={"100%"} px={"16px"}>
					{tabs.map((tab) => (
						<Button
							key={tab.key}
							onClick={() => !tab.disabled && setCurrentPage(tab.key)}
							bg={currentPage === tab.key ? '#2B2B2B' : 'transparent'}
							color={currentPage === tab.key ? 'white' : '#2B2B2B'}
							_hover={tab.disabled ? {} : { bg: 'gray.100' }}
							borderRadius="8px"
							px={4}
							py={2}
							fontSize={"14px"}
							fontWeight={currentPage === tab.key ? 'bold' : 550}
							isDisabled={tab.disabled}
							opacity={tab.disabled ? 0.5 : 1}
							cursor={tab.disabled ? 'not-allowed' : 'pointer'}
						>
							{tab.label}
						</Button>
					))}
				</HStack>
				{/* This is for 2d-cutout */}
				<>
				{
					(currentPage === "all" || currentPage === "2d-cutout") &&
						<Box p={"16px"}>
							<Text fontSize={"16px"} fontWeight={550} color={"#2B2B2B"}>2D Cutout</Text>
							<Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={"10px"} my={"10px"}>
								{
									cutOut2d?.map((img2d, index) => (
										<GridItem key={index} >
											<Image
												src={img2d}
												alt="2d-cutout"
												borderRadius={"8px"}
												cursor={"not-allowed"}
											/>
										</GridItem>
									))
								}
							</Grid>
						</Box>
				}
				</>
				{/* This is for 3d-acrylic*/}
				<>
				{
					(currentPage === "all" || currentPage === "3d-acrylic") && 
					<Box p={"16px"} width={"100%"}>
						<Text fontSize={"16px"} fontWeight={550} color={"#2B2B2B"}>3D Acrylic</Text>
						<Grid gridTemplateColumns={'repeat(1, 1fr)'} gap={"10px"} my={"10px"}>
							{
								acrylic3d?.map((img2d, index) => (
									<GridItem key={index} >
										<Image
											width={"100%"}
											src={img2d?.img}
											alt="3d-acrylic"
											borderRadius={"8px"}
											onClick={() => {
												setGradientBg(false);
												setPatternBg(true);
												setBgImage(img2d?.src);
											}}
										/>
									</GridItem>
								))
							}
						</Grid>
					</Box>
				}
				</>
				{/* This is for 2d-acrylic*/}
				<>
				{
					(currentPage === "all" || currentPage === "2d-acrylic") &&
					<Box p={"16px"} width={"100%"}>
						<Text fontSize={"16px"} fontWeight={550} color={"#2B2B2B"}>2D Acrylic</Text>
						<Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={"10px"} my={"10px"}>
							{
								acrylic2d?.map((img2d, index) => (
									<GridItem key={index} >
										<Image
											width={"100%"}
											src={img2d?.img}
											alt="2d-acrylic"
											borderRadius={"8px"}
											onClick={() => {
												setGradientBg(false);
												setPatternBg(true);
												setBgImage(img2d?.src);
											}}
											cursor={"pointer"}
										/>
									</GridItem>
								))
							}
						</Grid>
					</Box>
				}
				</>
			</VStack>
		</>
	);
};

export default PageTabs;
