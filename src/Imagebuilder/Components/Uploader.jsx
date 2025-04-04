import axios from 'axios';
import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Image, Input, Text } from "@chakra-ui/react";
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { HiXMark } from 'react-icons/hi2';
import { RxRotateCounterClockwise } from 'react-icons/rx';
import { CgEditFlipH, CgEditFlipV } from 'react-icons/cg';

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
	rotateSelectedImages
}) => {

	const onDrop = async (acceptedFiles) => {
		setLoading(true); // Start loading indicator
		const newImages = acceptedFiles.map((file) => {
			return new Promise(async (resolve, reject) => {
				const formData = new FormData();
				formData.append("image", file);
				try {
					const response = await axios.post("http://localhost:5000/remove-bg", formData, {
						headers: { "Content-Type": "multipart/form-data" },
					});
					const base64Image = response.data.image;
					const image = {
						id: Date.now() + Math.random(),
						title: file.name,
						url: `data:image/png;base64,${base64Image}`,
					};
					resolve(image);
				} catch (error) {
					console.error("Error removing background:", error);
					reject(error);
				}
			});
		});

		try {
			const resolvedImages = await Promise.all(newImages);
			setUploadedImages((prevImages) => [...prevImages, ...resolvedImages]);
		} catch (error) {
			console.error("Error processing uploaded images:", error);
		} finally {
			setLoading(false); // Stop loading indicator
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
					border="2px dashed #ff7675"
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
						<Text>Uploading....</Text>
					) : (
						<Flex direction="column" align="center" justify="center">
							<FiUploadCloud size={40} color="#d63031" />
							<Text fontWeight="bold" my={2}>Upload image</Text>
							<Text fontSize="sm">Drag or click to browse (4 MB max)</Text>
						</Flex>
					)}
				</Box>
			</Box>
			{uploadedImages?.length > 0 &&
				<Box p={5}>
					<Heading fontSize={"16px"} textAlign="start">Uploaded Images</Heading>
					<Flex overflow="hidden" align="center" wrap="wrap" gap={3} p={2} my={3}>
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