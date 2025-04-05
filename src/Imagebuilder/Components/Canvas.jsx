import { Box, Image } from "@chakra-ui/react";
import React from 'react';

const Canvas = ({
	canvasRef,
	selectedBorder,
	canvasWidth,
	canvasHeight,
	scale
}) => {
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
    						// transform: translate(-50%, -50%) !important;
								// margin: 0px 3px;
								inset: 0;  // Centers the canvas
          			margin: "auto";
					}
				`
				}
			</style>
			<Box>
				<Box display="flex" justifyContent="center" margin="10px auto" position="relative">
					<Box
						className="canvas-container"
						width={`${canvasWidth + 200}px`}
						height={`${canvasHeight + 200}px`}
						display="flex"
						alignItems="center"
						justifyContent="center"
						position="relative"
					>
						<Box>
							{selectedBorder ? (
								<Image
									src={selectedBorder}
									alt="Background"
									position="absolute"
									width="100%"
									height="100%"
									top="-1%"
									left={0}
									// zIndex={1}
								/>
							) : <></>
							}
						</Box>

						<canvas
							ref={canvasRef}
							style={{
								border: "1px dashed black",
								width: `${canvasWidth}px`, // Canvas width
								height: `${canvasHeight}px`, // Canvas height
								position: "absolute", // Positioned absolutely inside the parent container
								inset: 0,  // Centers the canvas
          			margin: "auto",
								// top: "52%", // Centers the canvas vertically
								// left: "60%", // Centers the canvas horizontally
								// transform: "translate(-50%, -50%)", // Adjusts the position so the canvas is perfectly centered
							}}
						></canvas>
					</Box>
				</Box>
				</Box>
		</>
	);
};

export default Canvas;