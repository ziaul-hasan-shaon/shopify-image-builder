import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';
import { usePage } from '../hook/PageContext';

const Layout = (
	{
		canvasRef,
		loading,
		setLoading,
		uploadedImages,
		selectedImage,
		setUploadedImages,
		handleImageSelect,
		handleDeleteButtonClick,
		handleSelectedImageDelet,
		saveCanvasAsImage,
		flipSelectedImages,
		rotateSelectedImages,
		color,
		setColor,
		gradientList,
		setGradientList,
		text,
		setText,
		textColor,
		setTextColor,
		fontSize,
		setFontSize,
		fontWeight,
		setFontWeight,
		fontFamily,
		setFontFamily,
		rotateText,
		fontSizeCollection,
		fontWightCollection,
		fontOptions,
		addTextToCanvas,
		addBackground,
		selectedBorder,
		setSelectedBorder,
		canvasWidth,
		canvasHeight,
		setCanvasWidth,
		setCanvasHeight,
		isJpgActive,
		isPngActive,
		setIsPngActive,
		setIsJpgActive,
		isExtra,
		setIsExtra,
		isStandard,
		setIsStandard,
		isHigh,
		setIsHigh,
		handlePreview,
		mockupImage,
		note,
		setNote,
		shareImageOn,
		shareLoading,
		price,
		setprice,
		gradientBg,
		setGradientBg,
		patterBg,
		setPatternBg,
		handleAddToCart,
		tempRatio,
		setTempRatio,
		resize,
		setResize,
		handleScaleChange,
		bgImage,
		setBgImage,
		addSVGBackgroundWithColorChange,
		svgColor,
		setSvgColor,
		bgRemoveLoading,
		setBgRemoveLoading,
		canvas,
		atcLoading,
		setAtcLoading,
		activeFabricImage,
		applyCrop ,
		applyImageCrop,
		showCropBox,
		toggleImageLock,
		isImageLocked,
	}
) => {

	const logo = "https://i.ibb.co.com/GfpxDdYd/Logo.png"

	const {currentPage} = usePage()
	// console.log('currentPage', currentPage)

	const [isUploadOpen, setIsUploadOpen] = useState(currentPage === '2d-cutout' ? true : false)
	const [isTemplateOpen, setIsTemplateOpen] = useState(currentPage !== '2d-cutout' ? true : false)
	const [isBackgroundOpen, setIsBackgroundOpen] = useState(false)
	const [isTextOpen, setIsTextOpen] = useState(false)
	const [isBorderOpen, setIsBorderOpen] = useState(false)
	const [isOpenNote, setIsOpenNote] = useState(false)
	const [isAddonOpen, setIsAddonOpen] = useState(false)

	//to detect media
	const [device, setDevice] = useState("");

  const detectDevice = () => {
    if (window.screen.width <= 767) {
      setDevice("Mobile");
    } else if (window.screen.width <= 1023) {
      setDevice("Tablet");
    } else {
      setDevice("Desktop");
    }
  };

  useEffect(() => {
    detectDevice(); // On mount
    window.addEventListener("resize", detectDevice); // On resize

    return () => {
      window.removeEventListener("resize", detectDevice);
    };
  }, []);

	console.log('device', device)

	return (
		<>
			<Box>
				{
					device === "Desktop" ? 
					<DesktopLayout
						device = {device}
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
						isBackgroundOpen={isBackgroundOpen}
						setIsBackgroundOpen={setIsBackgroundOpen}
						isBorderOpen = {isBorderOpen}
						setIsBorderOpen = {setIsBorderOpen}
						isUploadOpen = {isUploadOpen}
						setIsUploadOpen = {setIsUploadOpen}
						isTemplateOpen = {isTemplateOpen}
						setIsTemplateOpen = {setIsTemplateOpen}
						isTextOpen = {isTextOpen}
						setIsTextOpen = {setIsTextOpen}
						isOpenNote = {isOpenNote}
						setIsOpenNote = {setIsOpenNote}
						logo={logo}
						isAddonOpen = {isAddonOpen}
						setIsAddonOpen = {setIsAddonOpen}
						activeFabricImage = {activeFabricImage}
						applyCrop = {applyCrop}
						applyImageCrop = {applyImageCrop}
						showCropBox = {showCropBox}
						toggleImageLock= {toggleImageLock}
						isImageLocked = {isImageLocked}
					/>
					: 
					<MobileLayout 
						device = {device}
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
						isBackgroundOpen={isBackgroundOpen}
						setIsBackgroundOpen={setIsBackgroundOpen}
						isBorderOpen = {isBorderOpen}
						setIsBorderOpen = {setIsBorderOpen}
						isUploadOpen = {isUploadOpen}
						setIsUploadOpen = {setIsUploadOpen}
						isTemplateOpen = {isTemplateOpen}
						setIsTemplateOpen = {setIsTemplateOpen}
						isTextOpen = {isTextOpen}
						setIsTextOpen = {setIsTextOpen}
						isOpenNote = {isOpenNote}
						setIsOpenNote = {setIsOpenNote}
						logo={logo}
						isAddonOpen = {isAddonOpen}
						setIsAddonOpen = {setIsAddonOpen}
						activeFabricImage = {activeFabricImage}
						applyCrop = {applyCrop}
						applyImageCrop = {applyImageCrop}
						showCropBox = {showCropBox}
						toggleImageLock= {toggleImageLock}
						isImageLocked = {isImageLocked}
					/>
				}
			</Box>
		</>
	);
};

export default Layout;

// #F46267