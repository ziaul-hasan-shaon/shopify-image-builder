import { Box, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const Border = ({
	selectedBorder,
	setSelectedBorder
}) => {

	const empty = "https://i.ibb.co.com/8Dww7125/Unframed.png"
	const border1 = "https://i.ibb.co/YBYxK6Sb/borders-01-1.png"
	const border3 = "https://i.ibb.co/hJjkrZSf/borders-02-1.png"
	const border4 = "https://i.ibb.co/MxBQRBMG/borders-03-1.png"
	const border5 = "https://i.ibb.co/BK3jYCBs/borders-04-1.png"
	const border6 = "https://i.ibb.co/vybn2VH/borders-05-1.png"
	const border7 = "https://i.ibb.co/ynktShMx/borders-06-1.png"
	const border8 = "https://i.ibb.co/v4MCFMPV/borders-07-1.png"
	const border9 = "https://i.ibb.co/hFrGvYNZ/borders-08-1.png"
	const border10 = "https://i.ibb.co/vCqtb3YX/borders-09-1.png"

	const borders = [
		border1, border3, border4, border5, border6, border7, border8, border9, border10
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
								pointerEvents={"none"}
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
										width: "80px",
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