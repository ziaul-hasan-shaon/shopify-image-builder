import { Box, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import empty from "../../assets/Images/Border/Unframed.png"
import border1 from "../../assets/Images/Border/border-151768_1920.png"
// import border2 from "../../assets/Images/Border/empty-photo-frame-on-isolate-on-transparent-background-realistic-design-element-free-png (1).png"
import border3 from "../../assets/Images/Border/frame-2487087_1280.png"
import border4 from "../../assets/Images/Border/frame-4236931_1280.png"
import border5 from "../../assets/Images/Border/frame-5507782_1920.png"
import border6 from "../../assets/Images/Border/frame-7558618_1920.png"
import border7 from "../../assets/Images/Border/paisley-decorated-square-frame-4auzo2kaca3tsl7b.png"
import border8 from "../../assets/Images/Border/frame-7872263_1920.png"

const Border = ({
	selectedBorder,
	setSelectedBorder
}) => {

	const borders = [
		border1, border3, border4, border5, border6, border7, border8
	]

	return (
		<>
			<Box p={5}>
				<Box my={4}>
					<Text mb={3} fontWeight={"semibold"}>Select Border</Text>
					<Box>
						<Image
							src={empty}
							alt='Border'
							width={"84px"}
							height={"78px"}
							onClick={() => setSelectedBorder("")}
						/>
						<Text mt={'5px'}>
							Unframed
						</Text>
					</Box>
				</Box>
				<Box>
					<Text>Frame</Text>
					<Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={2} mt={'10px'} flexWrap={"wrap"}>
						{borders?.map((border, index) => (
							<Box
								display={"flex"}
								alignItems={"center"}
								justifyContent={"center"}
								flexDir={"column"}
								key={index}
								border={selectedBorder == border ? "1px solid #2B2B2B" : "1px solid #E5E5E5"}
								bg={"#F9F9F9"}
								borderRadius={"5px"}
								p={2}
							>
								<Image
									src={border}
									alt="abastruct image"
									onClick={() => setSelectedBorder(border)}
									style={{
										width: "90px",
										height: "60px",
										borderRadius: "5px",
										marginBottom: "10px",
										cursor: "pointer"
									}}
								/>
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Border;