import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Layout from './Layout/Layout';
import * as fabric from "fabric"; // Fabric.js v6
import gradient1 from "../assets/Images/GradientImage/021 True Sunset.png"
import gradient2 from "../assets/Images/GradientImage/035 Itmeo Branding.png"
import gradient3 from "../assets/Images/GradientImage/beautiful-color-ui-gradients-backgrounds-relay.png"
import gradient4 from "../assets/Images/GradientImage/gradient1.png"
import gradient5 from "../assets/Images/GradientImage/gradients_app.png"
import gradient6 from "../assets/Images/GradientImage/three-color-linear-gradient.png"
import gradient7 from "../assets/Images/GradientImage/thumb-1920-1343513.png"
import gradient8 from "../assets/Images/GradientImage/002 Night Fade.png"

const initialGradientList = [
	gradient1, gradient2, gradient3, gradient4, gradient5, gradient6, gradient7, gradient7, gradient8
]

const ImageBuilder = () => {

	const canvasRef = useRef(null);
	const [canvas, setCanvas] = useState(null);
	const [uploadedImages, setUploadedImages] = useState([]);
	const [selectedImage, setSelectedImage] = useState([]); // Track selected image
	const [loading, setLoading] = useState(false); // Loading state for image upload
	const [color, setColor] = useState("#ff0000");
	const [gradientList, setGradientList] = useState(initialGradientList);
	const [text, setText] = useState(""); // State for input text
	const [textColor, setTextColor] = useState("#000000"); // State for input text
	const [prevAngle, setPrevAngle] = useState(0); // State to store previous angle
	const [fontSize, setFontSize] = useState(null);
	const [fontWeight, setFontWeight] = useState(null);
	const [fontFamily, setFontFamily] = useState(null);
	const [selectedBorder, setSelectedBorder] = useState("")
	const [canvasWidth, setCanvasWidth] = useState(800)
	const [canvasHeight, setCanvasHeight] = useState(400)
	const [isPngActive, setIsPngActive] = useState(true)
	const [isJpgActive, setIsJpgActive] = useState(false)
	const [isStandard, setIsStandard] = useState(true)
	const [isHigh, setIsHigh] = useState(false)
	const [isExtra, setIsExtra] = useState(false)
	const [mockupImage, setMockupImage] = useState(null);
	const [note, setNote] = useState("")

	console.log('selectedImage', selectedImage)
	console.log('uploadedImages', uploadedImages)

	const fontSizeCollection = [20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40];
	const fontWightCollection = [
		{value: 500, label: "Regular"}, 
		{value: 600, label: "Bold"}, 
	]

	const fontOptions = [
    "Arial, sans-serif",
    "Verdana, sans-serif",
    "Helvetica, sans-serif",
    "Georgia, serif",
    "Times New Roman, serif",
    "Courier New, monospace",
    "Lucida Console, monospace",
  ];

	// Initialize Fabric.js Canvas
	useEffect(() => {
		const newCanvas = new fabric.Canvas(canvasRef.current, {
			width: canvasWidth,
			height: canvasHeight,
		});

		newCanvas.setDimensions({ width: canvasWidth , height: canvasHeight });

		setCanvas(newCanvas);
		return () => {
			newCanvas.dispose(); // Cleanup
		};
	}, []);

	// Handle Selecting an Image from Uploaded List
	const handleImageSelect = (image) => {
		console.log('image', image);
		if (!canvas) return;
	
		const imgElement = new Image();
	
		imgElement.onload = () => {
			// Generate a unique ID
			let baseId = image.id || 'image';
			let uniqueId = baseId;
			let counter = 1;
	
			// Check if the ID already exists on the canvas
			while (canvas.getObjects().some(obj => obj.id === uniqueId)) {
				uniqueId = `${baseId}-${counter}`;
				counter++;
			}
	
			const fabricImage = new fabric.Image(imgElement, {
				left: 10,
				top: 10,
				cornerSize: 10,
				hasControls: true,
				lockScalingFlip: true,
				id: uniqueId,
				originalId: image.id,
			});
	
			const maxWidth = 200;
			const maxHeight = 200;
			const scaleFactor = Math.min(maxWidth / fabricImage.width, maxHeight / fabricImage.height);
			fabricImage.scale(scaleFactor);
	
			canvas.add(fabricImage);
			canvas.setActiveObject(fabricImage);
			canvas.renderAll();
	
			fabricImage.setCoords();
	
			setSelectedImage((prevSelected) => {
				return [...prevSelected, { ...image, id: uniqueId, originalId: image.id }];
			});
		};
	
		imgElement.src = image.url;
	
		imgElement.onerror = (err) => {
			console.error('Failed to load image:', err);
		};
	};
	

	const addTextToCanvas = () => {
		if (!canvasRef.current || !text.trim()) return;

		const textObject = new fabric.IText(text, {
			left: 50,
			top: 50,
			fontSize: 24,
			fill: "#000",
			fontFamily: "Arial",
			hasControls: true,
			editable: true,
		});

		canvas.add(textObject);
		canvas.setActiveObject(textObject);
		canvas.renderAll();
		setText(""); // Clear input field after adding text
	};

	const updateTextProperties = (property, value) => {
		const activeObject = canvas?.getActiveObject();
		if (activeObject && activeObject.set) {
			activeObject.set(property, value);
			canvas.renderAll();
		}
	};

	const deleteUploadedImage = (imageId) => {
		// Remove from uploaded images
		setUploadedImages((prevImages) => {
			const updatedUploadedImages = prevImages.filter((image) => image.id !== imageId);
	
			// Remove any matching images on the canvas (based on originalId match)
			canvas.getObjects().forEach((obj) => {
				if (obj.originalId === imageId) {
					canvas.remove(obj);
				}
			});
	
			return updatedUploadedImages;
		});
	
		// Remove any selected images with the same originalId
		setSelectedImage((prevSelectedImages) => {
			const updatedSelectedImages = prevSelectedImages.filter((image) => image.originalId !== imageId);
			return updatedSelectedImages;
		});
	};
	

	const handleDeleteButtonClick = (e, imageId) => {
		e.stopPropagation();  // This prevents the click event from triggering parent handlers
		deleteUploadedImage(imageId);  // Call your delete function
	};

	const handleSelectedImageDelet = (imageId) => {
		// Remove image from the selectedImage array
		setSelectedImage((prevImages) => {
			const updatedImages = prevImages.filter((image) => image.id !== imageId);

			// Find and remove the image from the canvas
			const imageToRemove = prevImages.find((image) => image.id === imageId);
			if (imageToRemove) {
				const canvasImage = canvas.getObjects().find((obj) => obj.id === imageToRemove.id);
				if (canvasImage) {
					console.log('canvas image', canvasImage)
					canvas.remove(canvasImage); // Remove from the canvas
				}
			}

			return updatedImages;
		});
	}

	// Function to set background image or color
	const addBackground = (imageUrl, color) => {
		console.log('color', color)
		if (!canvas) return;

		// Set background color
		if (color) {
			canvas.backgroundColor = color;
			canvas.set({
				backgroundImage: "",
			});
		}

		// If there is an image URL, set it as the background image
		if (imageUrl) {
			console.log('image', imageUrl)
			const imgElement = new Image();
			imgElement.onload = () => {
				const img = new fabric.Image(imgElement, {
					scaleX: canvas.width / imgElement.width,
					scaleY: canvas.height / imgElement.height,
				});

				// Set the image as the background
				canvas.backgroundColor = ""
				canvas.set({
					backgroundImage: img,
				});
				canvas.renderAll();
			};

			imgElement.src = imageUrl;

			// Error handling if image fails to load
			imgElement.onerror = (err) => {
				console.error('Failed to load background image:', err);
			};
		} else {
			canvas.renderAll(); // Refresh the canvas to apply the color
		}
	};
	// Call addBackground once canvas is initialized
	useEffect(() => {
		if (canvas) {
			console.log('Canvas initialized, adding background...');
			addBackground(
				"",
				color); // Setting only background color here
			// addBackgroundOnParent("https://media.istockphoto.com/id/182391849/photo/empty-gold-ornate-picture-frame-with-white-background.jpg?s=612x612&w=0&k=20&c=3uKrCpggF8Q6f3IuLBJD_zpto9XsYALCvvoIL8uOrAI=")
			// overlapImage()
		}
	}, [canvas, color]); // This ensures the effect runs after canvas is initialized

	// Rotate selected image
	const rotateSelectedImages = (angle) => {
		if (!canvas) return;
		const selectedObjects = canvas.getActiveObjects();
		if (selectedObjects.length === 0) {
			alert("Please select at least one image to rotate.");
			return;
		}
		selectedObjects.forEach((object) => {
			if (object instanceof fabric.Image) {
				object.rotate(object.angle + angle);
				object.setCoords();
			}
		});
		canvas.renderAll();
	};

	const flipSelectedImages = (direction) => {
		if (!canvas) return;
		const selectedObjects = canvas.getActiveObjects();
		if (selectedObjects.length === 0) {
			alert("Please select at least one image to flip.");
			return;
		}
		selectedObjects.forEach((object) => {
			if (object instanceof fabric.Image) {
				if (direction === 'horizontal') {
					object.set({ flipX: !object.flipX });
				} else if (direction === 'vertical') {
					object.set({ flipY: !object.flipY });
				}
				object.setCoords();
			}
		});
		canvas.renderAll();
	};

	const saveCanvasAsImage = (format = "png", multiplier = 2) => {
		if (!canvas) return;

	const mimeType = format === "jpg" || format === "jpeg" ? "image/jpeg" : "image/png";

	const dataURL = canvas.toDataURL({
		format: mimeType === "image/png" ? "png" : "jpeg",
		quality: 1,
		multiplier: multiplier, // Export at higher resolution
	});

	const link = document.createElement("a");
	link.href = dataURL;
	link.download = `canvas-export@${multiplier}x.${format}`;
	link.click();
	};	

	const getTextProperties = () => {
		// Get the active object on the canvas (the currently selected text object)
		const activeObject = canvas.getActiveObject();

		if (activeObject && activeObject.type === 'i-text') {
			// Extract text properties
			const textProperties = {
				color: activeObject.fill,            // Get the fill color
				fontSize: activeObject.fontSize,     // Get the font size
				fontWeight: activeObject.fontWeight, // Get the font weight
				fontFamily: activeObject.fontFamily  // Get the font family
			};

			console.log(textProperties); // You can return or use this object to display the properties elsewhere

			// Optionally, set the properties in your state or use them as needed
			setTextColor(textProperties.color);
			setFontSize(textProperties.fontSize);
			const matchedFont = fontWightCollection.find(font => font.value === Number(textProperties.fontWeight));
      setFontWeight(matchedFont ? matchedFont.label : 'Regular'); // Default to 'Regular' if not found
			setFontFamily(textProperties.fontFamily);
		}
	};

	useEffect(() => {
		updateTextProperties('fill', textColor);
	}, [textColor])

	useEffect(() => {
		updateTextProperties('fontSize', fontSize);
	}, [fontSize])

	useEffect(() => {
		updateTextProperties('fontFamily', fontFamily);
	}, [fontFamily])

	useEffect(() => {
		const fontValue = fontWeight === "Regular" ? 500 : 600
		updateTextProperties('fontWeight', fontValue);
	}, [fontWeight])

	useEffect(() => {
		if (canvas) {
			// Event listener for when the selection changes on the canvas
			const onObjectSelected = () => {
				getTextProperties(); // Call the function to get properties
			};

			// Add event listener for object selection change
			canvas.on('selection:created', onObjectSelected);
			canvas.on('selection:updated', onObjectSelected);

			// Cleanup listener on component unmount
			return () => {
				canvas.off('selection:created', onObjectSelected);
				canvas.off('selection:updated', onObjectSelected);
			};
		}
	}, [canvas]); // Runs when the canvas is initialized or updated

	// Function to rotate the selected text by adding previous and given angle
	const rotateText = (newAngle) => {
		const activeObject = canvas?.getActiveObject();
		if (activeObject && activeObject.type === 'i-text') {
			const currentAngle = activeObject.angle; // Get current angle
			const updatedAngle = currentAngle + newAngle; // Add new angle to current angle

			// Set the rotation point to the center of the text
			activeObject.set({
				angle: updatedAngle,
				originX: "center",
				originY: "center",
			});

			canvas.renderAll(); // Re-render the canvas to apply the change

			setPrevAngle(updatedAngle); // Store the updated angle as previous
		}
	};

	const handlePreview = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      setMockupImage(dataURL); // Set to state
    }
  }

	return (
		<>
			<Box>
				<Layout 
					canvasRef={canvasRef} 
					loading={loading} 
					setLoading ={setLoading}
					uploadedImages={uploadedImages}
					selectedImage = {selectedImage}
					setUploadedImages = {setUploadedImages}
					handleImageSelect = {handleImageSelect}
					handleDeleteButtonClick = {handleDeleteButtonClick}
					handleSelectedImageDelet = {handleSelectedImageDelet}
					saveCanvasAsImage = {saveCanvasAsImage}
					flipSelectedImages = {flipSelectedImages}
					rotateSelectedImages = {rotateSelectedImages}
					color = {color}
					setColor = {setColor}
					gradientList = {gradientList}
					setGradientList = {setGradientList}
					text={text}
					setText={setText}
					textColor={textColor}
					setTextColor={setTextColor}
					fontSize={fontSize}
					setFontSize ={setFontSize}
					fontWeight={fontWeight}
					setFontWeight={setFontWeight}
					fontFamily={fontFamily}
					setFontFamily={setFontFamily}
					rotateText = {rotateText}
					fontSizeCollection = {fontSizeCollection}
					fontOptions={fontOptions}
					fontWightCollection = {fontWightCollection}
					addTextToCanvas = {addTextToCanvas}
					addBackground = {addBackground}
					selectedBorder = {selectedBorder}
					setSelectedBorder = {setSelectedBorder}
					canvasWidth={canvasWidth}
					canvasHeight={canvasHeight}
					setCanvasWidth={setCanvasWidth}
					setCanvasHeight={setCanvasHeight}
					isPngActive={isPngActive}
					isJpgActive={isJpgActive}
					setIsPngActive={setIsPngActive}
					setIsJpgActive={setIsJpgActive}
					isExtra={isExtra}
					setIsExtra={setIsExtra}
					isStandard={isStandard}
					setIsStandard={setIsStandard}
					isHigh={isHigh}
					setIsHigh={setIsHigh}
					handlePreview={handlePreview}
					mockupImage={mockupImage}
					note = {note}
					setNote = {setNote}
				/>
			</Box>
		</>
	);
};

export default ImageBuilder;