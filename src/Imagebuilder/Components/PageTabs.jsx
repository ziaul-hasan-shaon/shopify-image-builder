// components/PageTabs.js
import { HStack, Button, Grid, GridItem, Image, Box, Text, VStack } from '@chakra-ui/react';
import { usePage } from '../hook/PageContext';

const cutOut2d = [
	"https://i.ibb.co/fzSSWLqC/3c67dadc403c3478818c10ee03fef984e2fe63d3-2.jpg",
	"https://i.ibb.co/x8Cz6khN/3c67dadc403c3478818c10ee03fef984e2fe63d3-1.jpg",
	"https://i.ibb.co/skzkDGD/6675c3e125c616f7e772ef608c642accaf3ad43d.png",
	"https://i.ibb.co/9DJxzBX/47e09dc1a0593c63ef193afc10ded52704cb1cbc.png",
	"https://i.ibb.co/V0HfbjRq/9802a195b1b06de1024d1d0d489a93cd6c786a7a.png",
	"https://i.ibb.co/d08Y5wxf/3c67dadc403c3478818c10ee03fef984e2fe63d3.jpg"
]

const acrylic3d = [
	{img: "https://i.ibb.co/mrMmq6Fn/9f70819bc8232c4e3f5c80053daaa18bd6df360e-1.jpg", src: "https://i.ibb.co/jvsJmP8g/all-pattern-13-3x.png"},
	{img: "https://i.ibb.co/LDmHX0nx/82d4b18ac541e5aef36a577789867b0ca8306c3c.jpg", src: "https://i.ibb.co/XxDNYLFw/all-pattern-27.png"},
	{img: "https://i.ibb.co/Txw8bjMq/f473c673c1498c839b571cb6813f8de8a8122edf.jpg", src: "https://i.ibb.co/pvTbHnQP/all-pattern-19.png"},
	{img: "https://i.ibb.co/s9CJBh0m/f0069f9852dccc20801361304ac2894af4babb17.jpg", src: "https://i.ibb.co/j9jK9bpJ/all-pattern-36.png"},
	{img: "https://i.ibb.co/mCg1R524/45b2bbe6b18412b3f4450d814ce16cc53507471c.jpg", src: "https://i.ibb.co/7tXHpNgd/all-pattern-09-3x.png"},
	{img: "https://i.ibb.co/mrMmq6Fn/9f70819bc8232c4e3f5c80053daaa18bd6df360e-1.jpg", src: "https://i.ibb.co/jvsJmP8g/all-pattern-13-3x.png"},
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
						<Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={"10px"} my={"10px"}>
							{
								acrylic3d?.map((img2d, index) => (
									<GridItem key={index} >
										<Image
											width={"100%"}
											src={img2d?.img}
											alt="3d-acrylic"
											borderRadius={"8px"}
											cursor={"pointer"}
											onClick={() => {
												setGradientBg(false);
												setPatternBg(true);
												setBgImage(img2d?.src);
												setCurrentPage("3d-acrylic")
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
											cursor={"pointer"}
											onClick={() => {
												setGradientBg(false);
												setPatternBg(true);
												setBgImage(img2d?.src);
												setCurrentPage("2d-acrylic")
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
