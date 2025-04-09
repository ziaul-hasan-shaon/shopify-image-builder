import { border, Box } from '@chakra-ui/react';
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
import toast from 'react-hot-toast';

const initialGradientList = [
	gradient1, gradient2, gradient3, gradient4, gradient5, gradient6, gradient7, gradient7, gradient8
]

const ImageBuilder = () => {

	const canvasRef = useRef(null);
	const [canvas, setCanvas] = useState(null);
	const [uploadedImages, setUploadedImages] = useState([]);
	const [selectedImage, setSelectedImage] = useState([]); // Track selected image
	const [loading, setLoading] = useState(false); // Loading state for image upload
	const [color, setColor] = useState("");
	const [gradientBg, setGradientBg] = useState(false);
	const [patterBg, setPatternBg] = useState(false)
	const [gradientList, setGradientList] = useState(initialGradientList);
	const [text, setText] = useState(""); // State for input text
	const [canvasText, setCanvasText] = useState(null)
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
	const [shareLoading, setShareLoading] = useState(false)
	const [price, setprice] = useState(0)
	const [tempRatio, setTempRatio] = useState(null)
	const [resize, setResize] = useState(0.1)
	const [bgImage, setBgImage] = useState(null)
	// const [imageInfo, setImageInfo] = useState({
	// 	selectedImage: selectedImage, // Track selected image
	// 	bgcolor: color,
	// 	gradientBg: gradientBg,
	// 	patternBg: patterBg,
	// 	canvasText: canvasText, // State for input text
	// 	textColor: textColor, // State for input text
	// 	fontSize: fontSize,
	// 	fontWeight: fontWeight,
	// 	fontFamily: fontFamily,
	// 	selectedBorder: selectedBorder,
	// 	canvasWidth: canvasWidth,
	// 	canvasHeight: canvasHeight,
	// 	isPngActive: isPngActive,
	// 	isJpgActive: isJpgActive,
	// 	note: note,
	// 	price: price,
	// });
	
	useEffect(() => {
		let newPrice = 0;
	
		if (canvas) {
			if(color != ""){
				newPrice += 3; // Base price for canvas
			}
			// Add price for selected images
			if (selectedImage?.length > 0) {
				newPrice += selectedImage.length * 4; // Add 2 for each selected image
			}
	
			// Only one of gradientBg or patterBg can be active
			if (gradientBg) {
				newPrice += 4;
			} else if (patterBg) {
				newPrice += 5;
			}
			if(canvasText){
				newPrice +=3
			}
			if(selectedBorder){
				newPrice +=4
			}
		}
	
		setprice(newPrice); // Update the price with the calculated value
	}, [canvas, color, selectedImage, gradientBg, patterBg, canvasText, selectedBorder]); // Dependencies based on canvas, selectedImage, gradientBg, and patterBg

	console.log('price', price)
	console.log('text', text)
	console.log('canvasText', canvasText)

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

			// ✅ Save original size/position only ONCE
			fabricImage.customProps = {
				originalLeft: fabricImage.left,
				originalTop: fabricImage.top,
				originalScale: scaleFactor,
			};
	
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

	const resizeCanvas = (newWidth, newHeight) => {
		if (!canvas) return;
	
		const currentWidth = canvas.getWidth();
		const currentHeight = canvas.getHeight();
	
		const scale = Math.min(newWidth / currentWidth, newHeight / currentHeight);
	
		canvas.getObjects().forEach((obj) => {
			const original = obj.customProps;
			if (original) {
				obj.left = original.originalLeft * scale;
				obj.top = original.originalTop * scale;
				obj.scaleX = original.originalScale * scale;
				obj.scaleY = original.originalScale * scale;
				obj.setCoords();
			}
		});
	
		canvas.setWidth(newWidth);
		canvas.setHeight(newHeight);
		canvas.renderAll();
	};

	useEffect(() => {
		if (!canvas) return; // wait for canvas to be ready
		console.log('Resizing canvas to:', canvasWidth, canvasHeight);
		resizeCanvas(canvasWidth, canvasHeight);
	}, [canvas, canvasWidth, canvasHeight]);
	

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
		console.log('textObject', textObject)

		canvas.add(textObject);
		canvas.setActiveObject(textObject);
		canvas.renderAll();
		setText(""); // Clear input field after adding text
		setCanvasText(textObject?.text)
	};

	const updateTextProperties = (property, value) => {
		const activeObject = canvas?.getActiveObject();
		if (activeObject && activeObject.set) {
			activeObject.set(property, value);
			canvas.renderAll();
		}
	};

	useEffect(() => {
		if (!canvas) return;
		const handleTextChanged = (e) => {
			const obj = e.target;
	
			if (
				obj instanceof fabric.IText &&
				obj.isEditing &&
				obj.text.trim() === ""
			) {
				// Wait for the backspace event to finish before removing
				setTimeout(() => {
					canvas.remove(obj);
					canvas.discardActiveObject();
					canvas.renderAll();
					setCanvasText("")
				}, 0);
			}
		};
	
		canvas.on("text:changed", handleTextChanged);
	
		return () => {
			canvas.off("text:changed", handleTextChanged);
		};
	}, [canvas]);
	

	useEffect(() => {
		const handleKeyDown = (e) => {
			const activeObject = canvas.getActiveObject();
	
			// Otherwise, delete the whole object on Delete or Backspace
			if (e.key === "Delete") {
				if (activeObject) {
					// saveState();
					canvas.remove(activeObject);
					canvas.discardActiveObject();
					canvas.renderAll();
					setCanvasText("")
				}
			}
		};
	
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [canvas]);
	
	

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
				const img = new fabric.Image(imgElement);

            // Calculate scale factors to fit the canvas while covering the entire area
            const scaleX = canvas.width / imgElement.width;
            const scaleY = canvas.height / imgElement.height;

            // To ensure the image covers the canvas, we pick the larger scale value (like object-fit: cover)
            const scale = Math.max(scaleX, scaleY);

            // Set the image with the proper scale and position to cover the canvas
            img.set({
                scaleX: scale,
                scaleY: scale,
                left: -((imgElement.width * scale - canvas.width) / 2), // Center the image
                top: -((imgElement.height * scale - canvas.height) / 2), // Center the image
                originX: 'left',
                originY: 'top'
            });

				console.log('canvasWidth', canvas.width)
				console.log('canvasHeight', canvas.height)

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

	useEffect(() => {
		if(canvas){
			addBackground(bgImage, "")
		}
	}, [canvas, bgImage, canvasWidth, canvasHeight])

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
			setText(activeObject.type === 'i-text' ? activeObject?.text : "")
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

	const handleScaleChange = (value) => {
		if (!canvas) return;
    setResize(value);

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.scaleX = value;
      activeObject.scaleY = value;
      activeObject.setCoords();
      canvas.renderAll();
    }
  };

	async function uploadCanvasImageToImgBB(imageBase64) {
    const formData = new FormData();
    formData.append('image', imageBase64.split(',')[1]); // Remove the base64 header part
		setShareLoading(true)

    // Optional: Replace 'your_api_key' with your ImgBB API key
    const apiKey = '599464de86515ed1f91ed7b853fe80be'; // Or leave it empty for anonymous use
    const apiUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            console.log('Image uploaded successfully:', data.data.url);
            return data.data.url; // Image URL for sharing
        } else {
            console.error('Image upload failed:', data);
            return null;
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}

async function shareImageOn(platform) {
    const base64 = canvas.toDataURL({ format: "png" });

    try {
        const imageUrl = await uploadCanvasImageToImgBB(base64);

        if (imageUrl) {
            const text = encodeURIComponent("Check this canvas out!");
            const link = encodeURIComponent(imageUrl);

            let shareURL = "";

            switch (platform) {
                case "whatsapp":
                    shareURL = `https://wa.me/?text=${text}%20${link}`;
                    break;
                case "facebook":
                    shareURL = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
                    break;
                case "x": // Twitter
                    shareURL = `https://twitter.com/intent/tweet?text=${text}&url=${link}`;
                    break;
                case "linkedin":
                    shareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`;
                    break;
                default:
                    console.error("Platform not supported");
                    return;
            }

            window.open(shareURL, "_blank");
						setShareLoading(false)
        } else {
            console.error('Failed to upload image to ImgBB');
        }
    } catch (error) {
        console.error('Error sharing image:', error);
    }
}

// console.log('shareLoading', shareLoading)

const handleAddToCart = () => {
	const imageInfo = {
		selectedImage: selectedImage, // Track selected image
		bgcolor: color,
		gradientBg: gradientBg,
		patternBg: patterBg,
		canvasText: canvasText, // State for input text
		textColor: textColor, // State for input text
		fontSize: fontSize,
		fontWeight: fontWeight,
		fontFamily: fontFamily,
		selectedBorder: selectedBorder,
		canvasWidth: canvasWidth,
		canvasHeight: canvasHeight,
		isPngActive: isPngActive,
		isJpgActive: isJpgActive,
		note: note,
		price: price,
	}

	console.log("successFully add to Cart")
	console.log("imageInfo", imageInfo)
	toast.success("Successfully added to cart")
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
					shareImageOn={shareImageOn}
					shareLoading={shareLoading}
					price={price}
					setprice={setprice}
					gradientBg= {gradientBg}
					setGradientBg={setGradientBg}
					patterBg={patterBg}
					setPatternBg={setPatternBg}
					handleAddToCart={handleAddToCart}
					tempRatio = {tempRatio}
					setTempRatio = {setTempRatio}
					resize = {resize}
					setResize = {setResize}
					handleScaleChange = {handleScaleChange}
					bgImage = {bgImage}
					setBgImage = {setBgImage}
				/>
			</Box>
		</>
	);
};

export default ImageBuilder;