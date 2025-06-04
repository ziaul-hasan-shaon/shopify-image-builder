import { Box, Text } from "@chakra-ui/react";
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Layer, Image as KonvaImage, Stage, Rect, Transformer } from "react-konva";
import useImage from "use-image";

const LoadableImage = forwardRef(({ imageData, onSelect, onDragEnd, onTransformEnd, onTransform }, ref) => {
  const [img, status] = useImage(imageData.url, 'anonymous');
  
  // Calculate crop area ensuring it stays within image bounds
  const getCrop = () => {
    if (!img || status !== 'loaded') return null;
    
    return {
      x: Math.max(0, Math.min(imageData.cropX, img.width - 1)),
      y: Math.max(0, Math.min(imageData.cropY, img.height - 1)),
      width: Math.max(1, Math.min(imageData.cropWidth, img.width - imageData.cropX)),
      height: Math.max(1, Math.min(imageData.cropHeight, img.height - imageData.cropY))
    };
  };

  if (status === 'failed') {
    console.error('Failed to load image:', imageData.url);
    return null;
  }

  if (status !== 'loaded') {
    // Show placeholder while loading
    return (
      <Rect
        x={imageData.x}
        y={imageData.y}
        width={imageData.width}
        height={imageData.height}
        fill="#ddd"
        opacity={0.5}
      />
    );
  }

  return (
    <KonvaImage
			image={img}
			x={imageData.x}
			y={imageData.y}
			width={imageData.width}
			height={imageData.height}
			crop={{
				x: imageData.cropX,
				y: imageData.cropY,
				width: imageData.cropWidth,
				height: imageData.cropHeight
			}}
			rotation={imageData.rotation}
			draggable
			onClick={onSelect}
			onTransform={onTransform}
			// onTransformEnd={onTransformEnd}
			ref={ref}
			id={imageData.id}
			name="image"
		/>

  );
});

const Canvas = ({
  canvasWidth,
  canvasHeight,
  device,
  sizeLabel,
  setSelectedImage,
  selectedImage
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectionRect, setSelectionRect] = useState({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  const isSelecting = useRef(false);
  const transformerRef = useRef();
  const imageRefs = useRef(new Map());

  useEffect(() => {
    const nodes = selectedIds.map(id => imageRefs.current.get(id)).filter(Boolean);
    if (transformerRef.current) {
      transformerRef.current.nodes(nodes);
      transformerRef.current.getLayer()?.batchDraw();
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

    // Simple selection calculation
    const selected = selectedImage.filter(img => {
      return (
        img.x + img.width > selBox.x &&
        img.x < selBox.x + selBox.width &&
        img.y + img.height > selBox.y &&
        img.y < selBox.y + selBox.height
      );
    });

    setSelectedIds(selected.map(img => img.id));
    setSelectionRect(prev => ({ ...prev, visible: false }));
  };

  const handleDragEnd = (e) => {
    const id = e.target.id();
    const { x, y } = e.target.position();
    setSelectedImage(prev => prev.map(img => (img.id === id ? { ...img, x, y } : img)));
  };

	const handleTransform = (e) => {
		const node = e.target;
		const id = node.id();
		const activeAnchor = transformerRef.current?.getActiveAnchor();
		if (!activeAnchor) return;
	
		const scaleX = node.scaleX();
		const scaleY = node.scaleY();
	
		// Reset scale
		node.scaleX(1);
		node.scaleY(1);
	
		const newWidth = Math.max(1, node.width() * scaleX);
		const newHeight = Math.max(1, node.height() * scaleY);
	
		setSelectedImage((prev) =>
			prev.map((img) => {
				if (img.id !== id) return img;
	
				// Update width & height
				let updated = {
					...img,
					width: newWidth,
					height: newHeight,
					x: node.x(),
					y: node.y()
				};
	
				// Maintain crop proportionally from center
				const aspectRatio = newWidth / newHeight;
				const imgAspect = img.originalWidth / img.originalHeight;
	
				let cropW =
					aspectRatio >= imgAspect
						? img.originalWidth
						: img.originalHeight * aspectRatio;
				let cropH =
					aspectRatio >= imgAspect
						? img.originalWidth / aspectRatio
						: img.originalHeight;
	
				const cropX = (img.originalWidth - cropW) / 2;
				const cropY = (img.originalHeight - cropH) / 2;
	
				return {
					...updated,
					cropX,
					cropY,
					cropWidth: cropW,
					cropHeight: cropH
				};
			})
		);
	};
	

  const handleTransformEnd = (e) => {
    const node = e.target;
    const id = node.id();
    
    setSelectedImage(prev => prev.map(img => {
      if (img.id !== id) return img;
      
      return {
        ...img,
        x: node.x(),
        y: node.y(),
        rotation: node.rotation()
      };
    }));
  };

  return (
    <Box>
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
                  onTransform={handleTransform}
                  ref={node => {
                    if (node) imageRefs.current.set(image.id, node);
                  }}
                />
              ))}

								<Transformer
									ref={transformerRef}
									rotateEnabled={true}
									resizeEnabled={true}
									boundBoxFunc={(oldBox, newBox) => {
										if (newBox.width < 10 || newBox.height < 10) {
											return oldBox;
										}
										return newBox;
									}}
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
  );
};

export default Canvas;