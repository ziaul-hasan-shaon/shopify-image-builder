import { Box, Divider, Image, Text } from "@chakra-ui/react";
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { usePage } from "../hook/PageContext";
import Cube3D from "./Cube/Cube3d";
import { Layer, Image as KonvaImage, Stage, Rect, Group, Transformer } from "react-konva";
import useImage from "use-image";
import { calculateSelection } from "../utils/konvaFunction";

const LoadableImage = forwardRef(({ imageData, onSelect, onDragEnd, onTransformEnd }, ref) => {
  const [img] = useImage(imageData.url);
	console.log('imageData', imageData)

  return (
    <KonvaImage
      image={img}
      x={imageData.x}
      y={imageData.y}
      width={imageData.width}
      height={imageData.height}
      rotation={imageData.rotation}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
      ref={ref}
      id={imageData.id}
      name="image"
    />
  );
});

const Canvas = ({
	canvasRef,
	selectedBorder,
	canvasWidth,
	canvasHeight,
	scale,
	device,
	uploadedImages,
	sizeLabel,
	setSelectedImage,
	selectedImage
}) => {
	// console.log('canvasWidth',canvasWidth)

	// const [images, setImages] = useState(initialImages);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectionRect, setSelectionRect] = useState({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

	console.log('selectedImage', selectedImage)
	
		const isSelecting = useRef(false);
		const transformerRef = useRef();
		const imageRefs = useRef(new Map());
	
		useEffect(() => {
			const nodes = selectedIds.map(id => imageRefs.current.get(id)).filter(Boolean);
			if (transformerRef.current) {
				transformerRef.current.nodes(nodes);
				transformerRef.current.getLayer().batchDraw();
			}
		}, [selectedIds]);
	
		const handleStageClick = (e) => {
			if (selectionRect.visible) return;
	
			if (e.target === e.target.getStage()) {
				setSelectedIds([]);
				return;
			}
	
			if (!e.target.hasName('image')) return;
	
			const clickedId = e.target.id();
			const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
			const isSelected = selectedIds.includes(clickedId);
	
			if (!metaPressed && !isSelected) {
				setSelectedIds([clickedId]);
			} else if (metaPressed && isSelected) {
				setSelectedIds(selectedIds.filter(id => id !== clickedId));
			} else if (metaPressed && !isSelected) {
				setSelectedIds([...selectedIds, clickedId]);
			}
		};
	
		const handleMouseDown = (e) => {
			if (e.target !== e.target.getStage()) return;
	
			isSelecting.current = true;
			const pos = e.target.getStage().getPointerPosition();
			setSelectionRect({
				visible: true,
				x1: pos.x,
				y1: pos.y,
				x2: pos.x,
				y2: pos.y,
			});
		};
	
		const handleMouseMove = (e) => {
			if (!isSelecting.current) return;
	
			const pos = e.target.getStage().getPointerPosition();
			setSelectionRect(prev => ({
				...prev,
				x2: pos.x,
				y2: pos.y,
			}));
		};
	
		const handleMouseUp = () => {
			if (!isSelecting.current) return;
	
			isSelecting.current = false;
	
			const selBox = {
				x: Math.min(selectionRect.x1, selectionRect.x2),
				y: Math.min(selectionRect.y1, selectionRect.y2),
				width: Math.abs(selectionRect.x2 - selectionRect.x1),
				height: Math.abs(selectionRect.y2 - selectionRect.y1),
			};
	
			const selected = calculateSelection(selectedImage, selBox);
			setSelectedIds(selected.map(img => img.id));
	
			setSelectionRect(prev => ({ ...prev, visible: false }));
		};
	
		const handleDragEnd = (e) => {
			const id = e.target.id();
			const { x, y } = e.target.position();
			setSelectedImage(prev => prev.map(img => (img.id === id ? { ...img, x, y } : img)));
		};
	
		const handleTransformEnd = (e) => {
			const node = e.target;
			const id = node.id();
	
			const scaleX = node.scaleX();
			const scaleY = node.scaleY();
	
			node.scaleX(1);
			node.scaleY(1);
	
			setSelectedImage(prev =>
				prev.map(img => {
					if (img.id === id) {
						return {
							...img,
							x: node.x(),
							y: node.y(),
							width: Math.max(5, node.width() * scaleX),
							height: Math.max(5, node.height() * scaleY),
							rotation: node.rotation(),
						};
					}
					return img;
				})
			);
		};

	return (
			<>
			{/* <style>
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
			</style> */}
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

							<Stage
								style={{border: "1px dashed black"}}
								width={canvasWidth}
								height={canvasHeight}
								onMouseDown={handleMouseDown}
								onMouseMove={handleMouseMove}
								onMouseUp={handleMouseUp}
								onClick={handleStageClick}
								>
									<Layer>
										{selectedImage?.map(image => (
											<LoadableImage
												key={image.id}
												imageData={image}
												onSelect={handleStageClick}
												onDragEnd={handleDragEnd}
												onTransformEnd={handleTransformEnd}
												ref={node => {
													if (node) imageRefs.current.set(image.id, node);
												}}
											/>
										))}

										<Transformer
											ref={transformerRef}
											boundBoxFunc={(oldBox, newBox) =>
												newBox.width < 5 || newBox.height < 5 ? oldBox : newBox
											}
										/>

										{selectionRect.visible && (
											<Rect
												x={Math.min(selectionRect.x1, selectionRect.x2)}
												y={Math.min(selectionRect.y1, selectionRect.y2)}
												width={Math.abs(selectionRect.x2 - selectionRect.x1)}
												height={Math.abs(selectionRect.y2 - selectionRect.y1)}
												fill="rgba(0,0,255,0.3)"
											/>
										)}
									</Layer>
								</Stage>
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