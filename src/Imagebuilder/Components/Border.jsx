import { Box, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const Border = ({
	selectedBorder,
	setSelectedBorder
}) => {

	const empty = "https://i.ibb.co.com/8Dww7125/Unframed.png"
	const border1 = "https://i.ibb.co.com/y1pGV09/border-151768-1920.png"
	const border3 = "https://i.ibb.co.com/6Rxx6jyX/frame-2487087-1280.png"
	const border4 = "https://i.ibb.co.com/0VyGJ4ZT/frame-4236931-1280.png"
	const border5 = "https://i.ibb.co.com/Dgpv9Hb3/frame-5507782-1920.png"
	const border6 = "https://i.ibb.co.com/dJ5RGxqm/frame-7558618-1920.png"
	const border7 = "https://i.ibb.co.com/0y92m3hS/frame-7872263-1920.png"
	const border8 = "https://i.ibb.co.com/vCkx8GMc/paisley-decorated-square-frame-4auzo2kaca3tsl7b.png"

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