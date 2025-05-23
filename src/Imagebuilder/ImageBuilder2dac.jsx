import { border, Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Layout from './Layout/Layout';
import * as fabric from "fabric"; // Fabric.js v6
import toast from 'react-hot-toast';
import axios from 'axios';

const gradient1 = "https://i.ibb.co.com/hrX85sy/thumb-1920-1343513.png"
const gradient2 = "https://i.ibb.co.com/Q7SWMjF5/gradient1.png"
const gradient3 = "https://i.ibb.co.com/HDRtNSjn/three-color-linear-gradient.png"
const gradient4 = "https://i.ibb.co.com/4n7HdRMD/gradients-app.png"
const gradient5 = "https://i.ibb.co.com/8nX3T7YQ/beautiful-color-ui-gradients-backgrounds-relay.png"
const gradient6 = "https://i.ibb.co.com/DDsDDtN2/035-Itmeo-Branding.png"
const gradient7 = "https://i.ibb.co.com/Mks2SCrJ/021-True-Sunset.png"
const gradient8 = "https://i.ibb.co.com/PZ9Tv6pv/002-Night-Fade.png"

const initialGradientList = [
	gradient1, gradient2, gradient3, gradient4, gradient5, gradient6, gradient7, gradient7, gradient8
]

const ImageBuilder2dac = () => {

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
	const [canvasWidth, setCanvasWidth] = useState(500)
	const [canvasHeight, setCanvasHeight] = useState(500)
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
	const [svgColor, setSvgColor] = useState("#ffffff")
	const [bgRemoveLoading, setBgRemoveLoading] = useState(false)
	const [atcLoading, setAtcLoading] = useState(false)
	const [cropRect, setCropRect] = useState(null);
	const [activeFabricImage, setActiveFabricImage] = useState(null);
	const [applyImageCrop, setApplyImageCrop] = useState(false);
	const [isImageLocked, setIsImageLocked] = useState(false);
	const [originalImageMap, setOriginalImageMap] = useState(new Map());
	const [sizeLabel, setSizeLabel] = useState({w: 6.3, h: 6.3})
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

	// console.log('price', price)
	// console.log('text', text)
	// console.log('canvasText', canvasText)

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

	// console.log('canvas', canvasRef)
	// Initialize Fabric.js Canvas
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (canvasRef.current) {
				const newCanvas = new fabric.Canvas(canvasRef.current, {
					width: canvasWidth,
					height: canvasHeight,
				});
				newCanvas.setDimensions({ width: canvasWidth, height: canvasHeight });
				setCanvas(newCanvas);
			}
		}, 0); // Wait 1 tick
	
		return () => clearTimeout(timeout);
	}, []);

	// console.log('can', canvas)
	// Handle Selecting an Image from Uploaded List
	const handleImageSelect = (image) => {
		// console.log('canvas', canvas)
		if (!canvas) return;
		// console.log('image', image);
	
		const imgElement = new Image();
		// console.log("imageElement", imgElement)
	
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
				left: 50,
				top: 50,
				cornerSize: 10,
				hasControls: true,
				lockScalingFlip: true,
				id: uniqueId,
				originalId: image.id,
			});
			// console.log('fabric', fabricImage)

			// 🚫 Hide rotation control (mtr)
			fabricImage.setControlsVisibility({
				mtr: false, // hide rotation control
			});
	
			const maxWidth = 400;
			const maxHeight = 400;
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
			setActiveFabricImage(fabricImage); // 👈 Save for crop logic
	
			fabricImage.setCoords();
	
			setSelectedImage((prevSelected) => {
				return [...prevSelected, { ...image, id: uniqueId, originalId: image.id }];
			});
		};
		// console.log('imgElement', image.url)
		imgElement.src = image.url;
	
		imgElement.onerror = (err) => {
			console.error('Failed to load image:', err);
		};
	};
	
	const toggleImageLock = () => {
		const activeObject = canvas.getActiveObject();
		if (!activeObject || activeObject.type !== 'image') return;
	
		const shouldLock = !isImageLocked;
	
		activeObject.set({
			lockMovementX: shouldLock,
			lockMovementY: shouldLock,
			lockScalingX: shouldLock,
			lockScalingY: shouldLock,
			lockRotation: shouldLock,
			hasControls: !shouldLock,
			hasBorders: !shouldLock,
		});
	
		canvas.renderAll();
		setIsImageLocked(shouldLock);
		if(isImageLocked){
			if(activeObject?.type === "image"){
				toast.success("Image is unlocked")
			}else{
				toast.success("Text is unlocked")
			}
		}
		else{
			if(activeObject?.type === "image"){
				toast.success("Image is locked")
			}else{
				toast.success("Text is locked")
			}
		}
	};

	const showCropBox = () => {
		if (!canvas || !activeFabricImage) return;
	
		if (cropRect) {
			canvas.remove(cropRect);
		}
	
		const rect = new fabric.Rect({
			left: activeFabricImage.left + 20,
			top: activeFabricImage.top + 20,
			width: 100,
			height: 100,
			fill: 'rgba(0,0,0,0.3)',
			stroke: 'red',
			strokeWidth: 1,
			hasBorders: true,
			hasControls: true,
			objectCaching: false,
		});
	
		setCropRect(rect);
		canvas.add(rect);
		canvas.setActiveObject(rect);
		canvas.renderAll();
		setApplyImageCrop(true)
	};
	
	const applyCrop = () => {
		if (!canvas || !cropRect || !activeFabricImage) {
			console.warn("Missing canvas, cropRect, or activeFabricImage");
			return;
		}

		const imageId = activeFabricImage?.id;

		setOriginalImageMap(prev => {
			const newMap = new Map(prev);
			if (!newMap.has(imageId)) {
				newMap.set(imageId, activeFabricImage);
			}
			return newMap;
		});
	
		const imageEl = activeFabricImage.getElement?.() || activeFabricImage._element;
	
		if (!imageEl) {
			console.error("Image element not found");
			return;
		}
	
		// Calculate relative crop area
		const cropLeft = cropRect.left - activeFabricImage.left;
		const cropTop = cropRect.top - activeFabricImage.top;
		const cropWidth = cropRect.width * cropRect.scaleX;
		const cropHeight = cropRect.height * cropRect.scaleY;
	
		const scaleX = activeFabricImage.scaleX || 1;
		const scaleY = activeFabricImage.scaleY || 1;
	
		const sx = cropLeft / scaleX;
		const sy = cropTop / scaleY;
		const sw = cropWidth / scaleX;
		const sh = cropHeight / scaleY;
	
		console.log("Crop Coordinates:", { sx, sy, sw, sh });
	
		// Make sure crop area is valid
		if (sw <= 0 || sh <= 0) {
			console.error("Invalid crop size");
			return;
		}
	
		// Create temporary canvas
		const tempCanvas = document.createElement("canvas");
		tempCanvas.width = sw;
		tempCanvas.height = sh;
		const ctx = tempCanvas.getContext("2d");
	
		ctx.drawImage(imageEl, sx, sy, sw, sh, 0, 0, sw, sh);
		const croppedDataUrl = tempCanvas.toDataURL("image/png");
	
		// Debug check
		const imgPreview = new Image();
		imgPreview.src = croppedDataUrl;
		// document.body.appendChild(imgPreview); // <- Remove this after test
	
		// Final step: load cropped image manually
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			const fabricCropped = new fabric.Image(img, {
				left: cropRect.left,
				top: cropRect.top,
				selectable: true,
			});

			// ✨ Normalize scaling
			fabricCropped.set({
				scaleX: activeFabricImage.scaleX,
				scaleY: activeFabricImage.scaleY,
				id: activeFabricImage.id,
				originalId: activeFabricImage.originalId
			});
	
			canvas.remove(activeFabricImage);
			canvas.remove(cropRect);
			canvas.add(fabricCropped);
			canvas.setActiveObject(fabricCropped);
			canvas.renderAll();
	
			setActiveFabricImage(fabricCropped);
			setCropRect(null);
			setApplyImageCrop(false);
		};
		img.onerror = () => {
			console.error("Failed to load cropped image");
		};
		img.src = croppedDataUrl;
		toast.success("Image croped successfully")
	};

	// console.log('activeId', activeFabricImage?.id)
	// console.log('activeOriginalId', activeFabricImage?.originalId)

	const undoCrop = () => {
		if (!canvas || !activeFabricImage) return;
	
		const imageId = activeFabricImage?.id;
		const originalImage = originalImageMap.get(imageId);
	
		if (!originalImage) {
			console.warn("Original image not found for undo");
			return;
		}
	
		// Optional: Sync position/scale
		originalImage.set({
			left: activeFabricImage.left,
			top: activeFabricImage.top,
			scaleX: activeFabricImage.scaleX,
			scaleY: activeFabricImage.scaleY,
		});
	
		canvas.remove(activeFabricImage);
		canvas.add(originalImage);
		canvas.setActiveObject(originalImage);
		canvas.renderAll();
	
		setActiveFabricImage(originalImage);
		setApplyImageCrop(false);
		toast.success("Undo crop successfully")
	};	

	// Add this in a useEffect or componentDidMount (if using class)
	useEffect(() => {
		const handleKeyDown = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
				e.preventDefault(); // Prevent default undo behavior
				undoCrop();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		// Clean up
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [canvas, activeFabricImage]);

	
	useEffect(() => {
		if (!canvas) return;
	
		// Called when no object is selected anymore
		const handleSelectionCleared = () => {
			setActiveFabricImage(null);
		};
	
		// Attach listener
		canvas.on('selection:cleared', handleSelectionCleared);
	
		// Optional: Listen for active object changes
		canvas.on('selection:created', (e) => {
			if (e.selected && e.selected[0]?.type === 'image') {
				setActiveFabricImage(e.selected[0]);
			}
		});
	
		canvas.on('selection:updated', (e) => {
			if (e.selected && e.selected[0]?.type === 'image') {
				setActiveFabricImage(e.selected[0]);
			}
		});
	
		// Clean up on unmount or canvas change
		return () => {
			canvas.off('selection:cleared', handleSelectionCleared);
			canvas.off('selection:created');
			canvas.off('selection:updated');
		};
	}, [canvas]);
	

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

	const getBackground = () => {
    if (!canvas) return;

    // Get the current background color
    const backgroundColor = canvas.backgroundColor;
    console.log('Background Color:', backgroundColor);

    // Get the current background image (if any)
    const backgroundImage = canvas.backgroundImage;
    if (backgroundImage) {
        console.log('Background Image:', backgroundImage);
    } else {
        console.log('No background image set.');
    }
	};
	
	useEffect(()=> {
		getBackground()
	}, [bgImage])

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
		// console.log('textObject', textObject)

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
					setText("")
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
			console.log('active', activeObject)
	
			if (e.key === "Delete") {
				if (activeObject) {
					// Check if it's an image
					if (activeObject.type === "image") {
						const imageId = activeObject.id; // Adjust based on how you set it
						
						// Update selectedImage state
						setSelectedImage((prevSelectedImages) => {
							return prevSelectedImages.filter(
								(image) => image.id !== imageId
							);
						});
					}
	
					// Remove from canvas
					canvas.remove(activeObject);
					canvas.discardActiveObject();
					canvas.renderAll();

					if(activeObject?.type === "image"){
						toast.success("Image deleted successfully")
					}
					else if(activeObject?.type === "i-text"){
						toast.success("Text deleted successfully")
					}
	
					// Reset any text-specific states
					setCanvasText("");
					setText("");
				}
			}
		};
	
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [canvas]);	
	
	useEffect(() => {
		// Function to handle keydown events
		const handleKeyDown = (e) => {
			if (!canvas) return;
			
			const activeObject = canvas.getActiveObject();
			if (!activeObject) return;
	
			// Amount to move in pixels
			const moveAmount = e.shiftKey ? 10 : 1; // Move 10px with shift, 1px without
	
			switch (e.key) {
				case 'ArrowLeft':
					e.preventDefault(); // Prevent page scrolling
					activeObject.left -= moveAmount;
					break;
				case 'ArrowRight':
					e.preventDefault();
					activeObject.left += moveAmount;
					break;
				case 'ArrowUp':
					e.preventDefault();
					activeObject.top -= moveAmount;
					break;
				case 'ArrowDown':
					e.preventDefault();
					activeObject.top += moveAmount;
					break;
			}
	
			activeObject.setCoords(); // Update object coordinates
			canvas.renderAll(); // Re-render the canvas
		};
	
		// Add event listener when component mounts
		window.addEventListener('keydown', handleKeyDown);
	
		// Remove event listener when component unmounts
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [canvas]); // Only re-run if canvas changes

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
		// console.log('id', imageId)
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
					// console.log('canvas image', canvasImage)
					canvas.remove(canvasImage); // Remove from the canvas
				}
			}

			return updatedImages;
		});
	}

	// Function to set background image or color
	const addBackground = (imageUrl, color) => {
		// console.log('color', color)
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
			const imgElement = new Image();
			imgElement.crossOrigin = 'anonymous'; // 👈 necessary for CORS-safe image loading
			imgElement.onload = () => {
				const img = new fabric.Image(imgElement);
		
				const scaleX = canvas.width / imgElement.width;
				const scaleY = canvas.height / imgElement.height;
				const scale = Math.max(scaleX, scaleY);
		
				img.set({
					scaleX: scale,
					scaleY: scale,
					left: -((imgElement.width * scale - canvas.width) / 2),
					top: -((imgElement.height * scale - canvas.height) / 2),
					originX: 'left',
					originY: 'top'
				});
		
				canvas.backgroundColor = "";
				canvas.set({ backgroundImage: img });
				canvas.renderAll();
			};
		
			imgElement.onerror = (err) => {
				console.error('Failed to load background image:', err);
			};
		
			imgElement.src = imageUrl;
		}
		 else {
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
	}, [canvas, color, uploadedImages?.length > 0]); // This ensures the effect runs after canvas is initialized

	useEffect(() => {
		if(canvas){
			addBackground(bgImage, "")
		}
	}, [canvas, bgImage, canvasWidth, canvasHeight])

	const addSVGBackgroundWithColorChange = (svgContent) => {
		// Convert SVG string to Blob URL
		const svgToImageUrl = (svgContent) => {
			const blob = new Blob([svgContent], { type: 'image/svg+xml' });
			return URL.createObjectURL(blob);
		};

		const imageUrl = svgToImageUrl(svgContent); // svgContent is your modified SVG string
		setBgImage(imageUrl)
		addBackground(imageUrl, null); // or provide a background color if needed
	};

	// Rotate selected image
	const rotateSelectedImages = (delta) => {
		const deltaAngle = Number(delta); // 🔐 Make sure it's a number
		
		if (!canvas) return;
	
		const selectedObjects = canvas.getActiveObjects();
		if (selectedObjects.length === 0) {
			toast.error("Please select at least one image to rotate.");
			return;
		}
	
		selectedObjects.forEach((object) => {
			if (object instanceof fabric.Image) {
				const prevAngle = object.angle || 0;
				const newAngle = (prevAngle + deltaAngle) % 360;
	
				const center = object.getCenterPoint();
				object.set({
					originX: 'center',
					originY: 'center',
				});
				object.setPositionByOrigin(center, 'center', 'center');
	
				object.rotate(newAngle);
				object.setCoords();
	
				console.log("Previous:", prevAngle, "➤ New:", newAngle);
				console.log({
					current: object.angle,
					delta: deltaAngle,
					newAngle: (object.angle + deltaAngle) % 360
				});
			}
		});
	
		canvas.discardActiveObject();
		if (selectedObjects.length > 1) {
			const group = new fabric.ActiveSelection(selectedObjects, { canvas });
			canvas.setActiveObject(group);
		} else {
			canvas.setActiveObject(selectedObjects[0]);
		}
	
		canvas.requestRenderAll();
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

	const handleBringForoward = () => {
		const activeObject = canvas.getActiveObject();
		// console.log("Active Object:", activeObject);
		// console.log("Available Methods:", Object.keys(activeObject));
		if (activeObject) {
			canvas.bringObjectToFront(activeObject); // Bring to front
			canvas.requestRenderAll();
			toast.success("Object brought to forward")
		}
	}

	const handleSendBackward = () => {
		const activeObject = canvas.getActiveObject();
		if (activeObject) {
			canvas.sendObjectToBack(activeObject);
			canvas.requestRenderAll();
			toast.success("Object send to backward")
		}
	}

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

			// console.log(textProperties); // You can return or use this object to display the properties elsewhere

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
	const rotateText = (deltaAngle) => {
		if (!canvas) return;
	
		const activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'i-text') {
			const currentAngle = activeObject.angle || 0;
			const updatedAngle = (currentAngle + Number(deltaAngle)) % 360;
	
			// Keep rotation origin at center to avoid jumping
			const center = activeObject.getCenterPoint();
			activeObject.set({
				originX: 'center',
				originY: 'center',
			});
			activeObject.setPositionByOrigin(center, 'center', 'center');
	
			activeObject.rotate(updatedAngle);
			activeObject.setCoords();
	
			canvas.requestRenderAll();
	
			setPrevAngle(updatedAngle); // If you want to store this angle somewhere
		}
	};	

	const handlePreview = () => {
		console.log('previewe')
		const canvasEl = canvasRef.current;
		if (!canvasEl) return;
	
		const ctx = canvasEl.getContext('2d');
	
		// Create a new offscreen canvas
		const offscreenCanvas = document.createElement('canvas');
		offscreenCanvas.width = canvasEl.width;
		offscreenCanvas.height = canvasEl.height;
		const offCtx = offscreenCanvas.getContext('2d');
	
		// Copy original image
		offCtx.drawImage(canvasEl, 0, 0);

		// #A79269';
	
		// Apply shadow to outline the shape
		ctx.save();
		ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
		ctx.shadowColor = "#F8F8F860"
		ctx.shadowBlur = 5;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;

		// Draw image multiple times around original position
		for (let dx = -2; dx <= 2; dx++) {
			for (let dy = -2; dy <= 2; dy++) {
				if (dx !== 0 || dy !== 0) {
					ctx.drawImage(offscreenCanvas, dx, dy);
				}
			}
		}
	
		ctx.drawImage(offscreenCanvas, 0, 0);
		ctx.restore();
	
		// Now add background under it
		ctx.save();
		ctx.globalCompositeOperation = 'destination-over';
		ctx.fillStyle = '#0E0E0E80'; // semi-transparent background
		ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
		ctx.restore();
	
		const dataURL = canvasEl.toDataURL('image/png', 1);
		setMockupImage(dataURL);
	
		// Optional: Restore canvas to original
		const imageData = offCtx.getImageData(0, 0, canvasEl.width, canvasEl.height);
		ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
		ctx.putImageData(imageData, 0, 0);
	};	
	

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

	async function uploadCanvasImageToLamda(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile); 

    const lambdaUrl = 'https://kc6ofkdyoru4q5nxbds2ctcp5e0ohamn.lambda-url.us-east-1.on.aws/';

    try {
        const response = await fetch(lambdaUrl, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Image uploaded successfully:', data.url || data);
            return data.url || data; // Adjust based on the response structure
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
		setShareLoading(true)
		const dataURL = canvas.toDataURL('image/png', 1); // no need to pass an object
		const file = dataURLtoFile(dataURL, 'canvas-image.png');

    try {
        const imageUrl = await uploadCanvasImageToLamda(file);

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

function dataURLtoFile(dataUrl, filename) {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

const handleAddToCart = async () => {
	setAtcLoading(true);

	const imageInfo = {
		print_type: "2d-cutout",
		bgcolor: color,
		gradientBg: gradientBg,
		patternBg: patterBg,
		canvasText: canvasText,
		textColor: textColor,
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
	};

	const canvas = canvasRef.current;
	let file;

	if (canvas) {
		const dataURL = canvas.toDataURL('image/png', 1); // no need to pass an object
		file = dataURLtoFile(dataURL, 'canvas-image.png');
	}


	try {
		const imgUrl = await uploadCanvasImageToLamda(file); // 🛠️ Await this!
		console.log('url', imgUrl?.file_url);

		if (imgUrl) {
			const payload = {
				id: 50374829605158,
				quantity: 1,
				properties: {
					_image_info: imageInfo,
					_preview_url: imgUrl?.file_url,
				},
			};

			await axios.post('/cart/add.js', payload);
			toast.success('Successfully added to cart');
			location.href = '/cart';
		}
	} catch (err) {
		toast.error('Something went wrong');
		console.error('error', err);
	} finally {
		setAtcLoading(false);
	}

	// console.log('imageInfo', imageInfo);
};

	return (
		<>
			<Box position={"relative"}>
				<Layout 
					canvasRef={canvasRef} 
					canvas={canvas}
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
					addSVGBackgroundWithColorChange = {addSVGBackgroundWithColorChange}
					svgColor={svgColor}
					setSvgColor={setSvgColor}
					bgRemoveLoading={bgRemoveLoading}
					setBgRemoveLoading= {setBgRemoveLoading}
					atcLoading={atcLoading}
					setAtcLoading={setAtcLoading}
					activeFabricImage = {activeFabricImage}
					applyCrop = {applyCrop}
					applyImageCrop = {applyImageCrop}
					showCropBox = {showCropBox}
					toggleImageLock= {toggleImageLock}
					isImageLocked = {isImageLocked}
					sizeLabel = {sizeLabel}
					setSizeLabel = {setSizeLabel}
					handleBringForoward = {handleBringForoward}
					handleSendBackward = {handleSendBackward}
				/>
			</Box>
		</>
	);
};

export default ImageBuilder2dac;