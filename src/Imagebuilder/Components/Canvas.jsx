import { Box, Divider, Image, Text } from "@chakra-ui/react";
import React from 'react';
import { usePage } from "../hook/PageContext";
import Cube3D from "./Cube/Cube3d";

const Canvas = ({
	canvasRef,
	selectedBorder,
	canvasWidth,
	canvasHeight,
	scale,
	device,
	uploadedImages,
	sizeLabel
}) => {
	// console.log('canvasWidth',canvasWidth)
	return (
			<>
			<style>
				{
					`
					.upper-canvas{
						    position: absolute;
    						// top: 52% !important;
    						// left: 60% !important;
								width: ${canvasWidth}px !important;
								height: ${canvasHeight}px !important;
								border: ${uploadedImages?.length === 0 ? '1px dashed black' : 'none'} !important;
    						// transform: translate(-50%, -50%) !important;
								// margin: 0px 3px;
								inset: 0;  // Centers the canvas
          			margin: "auto";
					}
					.lower-canvas{
						    position: absolute;
    						// top: 52% !important;
    						// left: 60% !important;
								width: ${canvasWidth}px !important;
								height: ${canvasHeight}px !important;
    						// transform: translate(-50%, -50%) !important;
								// margin: 0px 3px;
								inset: 0;  // Centers the canvas
          			margin: "auto";
					}
				`
				}
			</style>
			<Box >
				<Box 
					display="flex" 
					justifyContent="center" 
					margin="10px auto" 
					position="relative"
					width={`${canvasWidth + (device === "Desktop" ? 200 : 50)}px`}
					height={`${canvasHeight + (device === "Desktop" ? 200 : 50)}px`}
				>
					<Box
						className="canvas-container"
						width={"100%"}
						height={"100%"}
						display="flex"
						alignItems="center"
						justifyContent="center"
						position="relative"
					>
						{/* <Box>
							{selectedBorder ? (
								<Image
									src={selectedBorder}
									alt="Background"
									position="absolute"
									width="50%"
									height="50%"
									top={"-1%"}
									left={0}
									// zIndex={1}
								/>
							) : <></>
							}
						</Box> */}

						<canvas
							ref={canvasRef}
							style={{
								border: (uploadedImages?.length === 0 || device === "Mobile") ? "1px dashed black" : "",
								// border: "1px dashed black",
								width: `${canvasWidth}px`, // Canvas width
								height: `${canvasHeight}px`, // Canvas height
								position: "absolute", // Positioned absolutely inside the parent container
								inset: 0,  // Centers the canvas
          			margin: "auto",
								zIndex: 2,
								backgroundImage:selectedBorder && `url(${selectedBorder})`,
								backgroundSize: `${canvasWidth}px ${canvasHeight}px`,
								backgroundRepeat: "no-repeat",
								boxShadow: uploadedImages?.length > 0 ? '0 2px 5px rgba(0, 0, 0, 0.2)' : "",
								// top: "52%", // Centers the canvas vertically
								// left: "60%", // Centers the canvas horizontally
								// transform: "translate(-50%, -50%)", // Adjusts the position so the canvas is perfectly centered
							}}
						></canvas>
					</Box>
					<Box mt={10} width={device === "Desktop" ? "10px" : "2px"} height={`${device === "Desktop" ? canvasHeight + 100 : canvasHeight + 10}px`} border={device === "Desktop" ? "5px solid #2B2B2B" : "2px solid #2B2B2B"} display={"flex"} justifyContent={device === "Desktop" ? "flex-end" : "flex-start"} alignItems={"center"} position={"absolute"} right={0}>
						<Text style={{writingMode: "vertical-rl", textOrientation: "sideways", padding: device === "Desktop" ? "10px" : "5px"}}>height {sizeLabel?.h} inch</Text>
					</Box>
					<Box mt={8} height={device === "Desktop" ? "10px" : "2px"} width={`${device === "Desktop" ? canvasWidth + 100 : canvasWidth + 10}px`} border={device === "Desktop" ? "5px solid #2B2B2B" : "2px solid #2B2B2B"} display={"flex"} justifyContent={"center"} alignItems={device === "Desktop" ? "flex-end" : "flex-start"} position={"absolute"} bottom={0}>
						<Text style={{writingMode: "horizontal-tb", textOrientation: "sideways", padding: device === "Desktop" ? "10px" : "5px"}}>width {sizeLabel?.w} inch</Text>
					</Box>
				</Box>
				</Box>
		</>
	);
};

export default Canvas;