import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Image, Input, Radio, RadioGroup, ring, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Spinner, Stack, Text } from "@chakra-ui/react";
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { HiXMark } from 'react-icons/hi2';
import { RxRotateCounterClockwise } from 'react-icons/rx';
import { CgEditFlipH, CgEditFlipV } from 'react-icons/cg';
import toast from 'react-hot-toast';
import { FaRegCircle } from 'react-icons/fa';

const Uploader = ({
	loading,
	setLoading,
	uploadedImages,
	setUploadedImages,
	selectedImage,
	handleImageSelect,
	handleDeleteButtonClick,
	handleSelectedImageDelet,
	flipSelectedImages,
	rotateSelectedImages,
	resize,
	setResize,
	handleScaleChange,
	canvasWidth,
	canvasHeight,
	setCanvasWidth,
	setCanvasHeight,
	canvas,
	setBgRemoveLoading, 
	device
}) => {

	const [landOrPort, setLandOrPort] =useState(canvasWidth > canvasHeight ? "landscape" : "portrait")

	useEffect(() => {
		setLandOrPort(canvasWidth > canvasHeight ? "landscape" : "portrait")
	}, [canvasWidth, canvasHeight])

	const fileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};
	
	const onDrop = async (acceptedFiles) => {
		setLoading(true);
		let image;
	
		const initialImages = await Promise.all(
			acceptedFiles.map(async (file) => {
				const base64 = await fileToBase64(file);
				const originalId = Date.now() + Math.random();
	
				 image = {
					id: `${originalId}-initial`,         // unique id for canvas
					originalId,                          
					title: file.name,
					url: base64, // for fabric
					previewUrl: URL.createObjectURL(file), // for preview display
					base64,
					file,
				};
	
				// Show immediately on canvas
				setTimeout(() => {
					if (canvas) {
						handleImageSelect(image);
					} else {
						console.warn("Canvas not ready yet");
					}
				}, 500);
	
				return image;
			})
		);
	
		// Display in UI
		setUploadedImages((prevImages) => [...prevImages, ...initialImages]);
		// console.log('id', image)
	
		// After short delay, remove background
		const delayedBackgroundRemoval = initialImages.map((img) => {
			return new Promise((resolve, reject) => {
				setTimeout(async () => {
					const formData = new FormData();
					formData.append("image", img.file);
	
					try {
						const response = await axios.post("http://localhost:5000/remove-bg", formData, {
							headers: { "Content-Type": "multipart/form-data" },
						});
	
						const base64Image = `data:image/png;base64,${response.data.image}`;
	
						const updatedImage = {
							...img,
							id: `${img.originalId}-bgremoved`,
							url: base64Image,
							base64: base64Image,
						};

						// console.log('update', updatedImage)
	
						// Update canvas
						setTimeout(() => {
							if (canvas) {
								handleImageSelect(updatedImage);
								handleSelectedImageDelet(image?.id)
							} else {
								console.warn("Canvas not ready yet");
							}
						}, 500);
	
						resolve(updatedImage);
					} catch (error) {
						console.error("Error removing background:", error);
						toast.error("An error occurred while removing background");
						reject(error);
					}
				}, 300); // 300ms delay
			});
		});
	
		try {
			setBgRemoveLoading(true)
			const updatedImages = await Promise.all(delayedBackgroundRemoval);
	
			setUploadedImages((prev) => {
				// Replace image by originalId
				const filtered = prev.filter(
					(img) => !updatedImages.find((u) => u.originalId === img.originalId)
				);
				return [...filtered, ...updatedImages];
			});
		} finally {
			setLoading(false);
			setBgRemoveLoading(false)
		}
	
	};

	const handleChange = (value) => {
    setLandOrPort(value);

    if (value === "landscape") {
        // In landscape mode, set the canvas width and height accordingly
        setCanvasWidth(Math.max(canvasWidth, canvasHeight)); // Assign the larger value to width
        setCanvasHeight(Math.min(canvasWidth, canvasHeight)); // Assign the smaller value to height
    } else {
        // In portrait mode, set the canvas width and height accordingly
        setCanvasWidth(Math.min(canvasWidth, canvasHeight)); // Assign the smaller value to width
        setCanvasHeight(Math.max(canvasWidth, canvasHeight)); // Assign the larger value to height
    }
	};

	// Dropzone setup
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: "image/*",
		multiple: true,
		maxSize: 4 * 1024 * 1024, // 4MB max file size
	});

	return (
		<Box w="100%" >
			<Box p={5}>
				<Heading fontSize={"16px"} textAlign="start">Upload Image</Heading>
				<Box
					{...getRootProps()}
					border={device === "Desktop" ? "2px dashed #ff7675" : ""}
					borderRadius="8px"
					p={7}
					textAlign="center"
					bg="#fff5f5"
					color="#2B2B2B"
					cursor="pointer"
					my={3}
				>
					<Input {...getInputProps()} hidden />
					{loading ? (
						<Spinner 
							thickness='4px'
							speed='0.65s'
							emptyColor='gray.200'
							color='red.500'
							size='xl' 
						/>
					) : (
						<>
						{
							device === "Desktop" ? 
							<Flex direction="column" align="center" justify="center">
								<FiUploadCloud size={40} color="#d63031" />
								<Text fontWeight="bold" my={2}>Upload image</Text>
								<Text fontSize="sm">Drag or click to browse (4 MB max)</Text>
							</Flex> : 
							<Flex align="center" justify="space-between">
								<Flex align="center" justify="start" gap={"15px"}>
									<FiUploadCloud size={40} color="#d63031" />
									<Box textAlign={"start"}>
										<Text fontWeight="bold" my={2}>Upload image</Text>
										<Text fontSize="sm">Drag or click to browse</Text>
									</Box>
								</Flex>
								<Button bg={"#d63031"} color={"white"}>Upload</Button>
							</Flex>
						}
						</>
					)}
				</Box>
			</Box>
			{uploadedImages?.length > 0 &&
				<Box p={5}>
					<Heading fontSize={"16px"} textAlign="start">Uploaded Images</Heading>
					<Flex overflow="hidden" align="center" wrap="wrap" gap={3} p={2} my={2}>
						{uploadedImages?.map((image) => (
							<Box key={image.id} border="1px solid #ccc" borderRadius="5px" p={2} position="relative" cursor="pointer" onClick={() => handleImageSelect(image)}>
								<Image src={image.url} alt={image.title} boxSize="60px" objectFit="cover" />
								<Button onClick={(e) => handleDeleteButtonClick(e, image.id)} size={"xs"} bg={'#F46267'} color={"#ffffff"} position="absolute" top="-10px" right="-10px" borderRadius="full" padding={"1px"}>
									<HiXMark />
								</Button>
							</Box>
						))}
					</Flex>
				</Box>
			}
			{selectedImage?.length > 0 && (
				<Box px={5}>
					<Heading fontSize={"16px"} textAlign="start">Selected Images</Heading>
					{selectedImage?.map((image) => (
						<Flex key={image.id} border="1px solid #E5E5E5" p={2} borderRadius="10px" align="center" justify="space-between" my={2} bg="#F9F9F9">
							<Box border="1px solid #ccc" borderRadius="5px" p={0}>
								<Image src={image.url} alt={image.title} boxSize="50px" objectFit="cover" />
							</Box>
							<Button onClick={() => handleSelectedImageDelet(image.id)} bg="none">
								<HiXMark size={24} color="#00070B" />
							</Button>
						</Flex>
					))}
				</Box>
			)}
			{
				device === "Desktop" &&
				<Box px={5}>
					<RadioGroup onChange={handleChange} value={landOrPort}>
						<Stack direction='row'>
							<Radio value='landscape'>Landscape</Radio>
							<Radio value='portrait'>Portrait</Radio>
						</Stack>
					</RadioGroup>
				</Box>
			}
			 <Box mt={5} px={5} display={"flex"} alignItems={"center"} justifyContent={"start"} gap={"20px"}>
        <Text >Resize Image</Text>
        <Slider
          min={0.01}
          max={.5}
          step={.01}
          value={resize}
          onChange={handleScaleChange}
          width="200px"
        >
          <SliderTrack>
            <SliderFilledTrack bg='tomato'/>
          </SliderTrack>
          <SliderThumb boxSize={5} bg={'transparent'} p={0}>
						<FaRegCircle size={"20px"} color='#FF6347' style={{background: "#ffffff", padding: "0px"}} />
					</SliderThumb>
        </Slider>
      </Box>
			<Flex align="center" justify="start" gap={3} mt={3} borderY={"1px solid #E5E5E5"} p={5}>
				<Box>
					<Heading fontSize={"16px"}>Rotate</Heading>
					<Button onClick={() => rotateSelectedImages(-90)} mt={2} p={2} bg={"none"} borderRadius="5px" _hover={{ opacity: 0.8 }}>
						<RxRotateCounterClockwise size={30} />
					</Button>
					<Button onClick={() => rotateSelectedImages(90)} mt={2} p={2} bg={"none"} transform="scaleX(-1)" borderRadius="5px" _hover={{ opacity: 0.8 }}>
						<RxRotateCounterClockwise size={30} />
					</Button>
				</Box>
			</Flex>
			<Flex align="center" justify="start" gap={3} borderBottom={"1px solid #E5E5E5"} p={5}>
				<Box>
					<Heading fontSize={"16px"}>Flip</Heading>
					<Button onClick={() => flipSelectedImages('horizontal')} mt={2} p={2} bg="none" borderRadius="5px" _hover={{ opacity: 0.8 }}>
						<CgEditFlipH size={30} />
					</Button>
					<Button onClick={() => flipSelectedImages('vertical')} mt={2} p={2} bg="none" borderRadius="5px" _hover={{ opacity: 0.8 }}>
						<CgEditFlipV size={30} />
					</Button>
				</Box>
			</Flex>
		</Box>
	);
};

export default Uploader;

{/* <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M9.66676 22H14.3334M3.01509 16.5C2.99793 16.0004 2.99705 15.5001 2.99855 15M20.9849 16.5C21.0021 16.0004 21.003 15.5001 21.0015 15M3.53709 19.2547C4.02122 20.213 4.80249 20.9914 5.76305 21.4718M18.1797 21.5C19.1665 21.0221 19.9692 20.232 20.4629 19.2547" stroke="#2B2B2B" stroke-width="1.5" stroke-linecap="round"/>
					<path d="M5.50502 12C3.64422 12 3.00695 11.4596 3.00695 9.5C3.00695 6.96832 2.75702 4.04633 5.25521 2.60289C6.29863 2 7.69947 2 10.5012 2H13.4988C16.3005 2 17.7014 2 18.7448 2.60289C21.243 4.04633 20.9931 6.96832 20.9931 9.5C20.9931 11.3622 20.453 12 18.495 12H5.50502Z" stroke="#2B2B2B" stroke-width="1.5"/>
				</svg>


<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14.3332 2H9.66659M20.9849 7.5C21.0021 7.99962 21.0029 8.49991 21.0014 9M3.01508 7.5C2.99793 7.99962 2.99705 8.49991 2.99855 9M20.4629 4.74532C19.9788 3.78698 19.1975 3.00864 18.2369 2.52818M5.82029 2.5C4.83354 2.9779 4.0308 3.76801 3.53709 4.74532" stroke="#2B2B2B" stroke-width="1.5" stroke-linecap="round"/>
					<path d="M18.495 12C20.453 12 20.993 12.6377 20.993 14.5C20.993 17.0317 21.2429 19.9536 18.7448 21.3971C17.7013 22 16.3005 22 13.4988 22H10.5011C7.69947 22 6.29863 22 5.25521 21.3971C2.75702 19.9536 3.00695 17.0316 3.00695 14.5C3.00695 12.5404 3.64422 12 5.50502 12H18.495Z" stroke="#2B2B2B" stroke-width="1.5"/>
					</svg> */}