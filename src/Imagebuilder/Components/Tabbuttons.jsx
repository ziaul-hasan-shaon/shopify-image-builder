import React, { useState } from 'react';
import { usePage } from '../hook/PageContext';
import { Box, Button, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { RiLogoutCircleLine } from 'react-icons/ri';

const tabs = [
	{ key: 'all', label: 'All' },
	{ key: '2d-cutout', label: '2D CutOut' },
	{ key: '3d-acrylic', label: '3D Acrylic' },
	{ key: '2d-acrylic', label: '2D Acrylic' },
];

const Tabbuttons = ({device}) => {

	const { currentPage, setCurrentPage } = usePage();
	const [selectedTab, setSelectedTab] = useState(null)

	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleTabChange = (tabName) =>{
		onOpen()
		setSelectedTab(tabName)
	}

	return (
		<Box>
			<HStack spacing={4} width={"100%"} px={"16px"} alignItems={"center"} justifyContent={"space-between"}>
				{tabs.map((tab) => (
					<Button
						key={tab.key}
						onClick={() => (!tab.disabled && currentPage !=="all") ? handleTabChange(tab.key) : setCurrentPage(tab?.key)}
						bg={currentPage === tab.key ? '#2B2B2B' : 'transparent'}
						color={currentPage === tab.key ? 'white' : '#2B2B2B'}
						_hover={tab.disabled ? {} : { bg: currentPage === tab.key ? '#2B2B2B' : 'gray.100' }}
						borderRadius="8px"
						px={device === "Desktop" ? 4 : 2}
						py={device === "Desktop" ? 2 : 1}
						fontSize={"14px"}
						fontWeight={currentPage === tab.key ? 'bold' : 550}
						isDisabled={tab.disabled}
						opacity={tab.disabled ? 0.5 : 1}
						cursor={tab.disabled ? 'not-allowed' : 'pointer'}
					>
						{tab.label}
					</Button>
				))}
			</HStack>
			<Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					position={"absolute"}
					top={"10%"}
					left={device === "Desktop" ? "8%" : "5%"}
				>
					<ModalHeader fontSize={"16px"} color={"#374144"} fontWeight={550}>Unsaved Changes</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} gap={6}>
							<Box width={"100px"} height={"80px"}>
								<Image width={"100%"} src={"https://i.ibb.co/JRvBsCqP/72f4fd645f32c39d6c938de423c9947044a72f4c.png"} alt='warning' />
							</Box>
							<Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} gap={2} >
								<Text fontSize={"18px"} fontWeight={600} color={"#2B2B2B"}>Leave without saving your design?</Text>
								<Text fontSize={"12px"} textAlign={"center"} color={"#374144"}>
									Your customizations will be lost if you go back now. You haven’t added this design to your cart yet.
								</Text>
							</Box>
						</Box>
					</ModalBody>

					<ModalFooter display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
						<Button width={"50%"} bg={"#F46267"} color={"#ffffff"} mr={3} gap={"5px"} onClick={() => setCurrentPage(selectedTab)}>
							<RiLogoutCircleLine size={20} />
							Leave anyway
						</Button>
						<Button width={"50%"} color={"#374144"} bg={"#EBEBEB"} onClick={onClose}>
							Keep editing
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default Tabbuttons;