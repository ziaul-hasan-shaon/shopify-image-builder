import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';

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
		setAtcLoading
	}
) => {

	const logo = "https://i.ibb.co.com/GfpxDdYd/Logo.png"

	const [isUploadOpen, setIsUploadOpen] = useState(true)
	const [isTemplateOpen, setIsTemplateOpen] = useState(false)
	const [isBackgroundOpen, setIsBackgroundOpen] = useState(false)
	const [isTextOpen, setIsTextOpen] = useState(false)
	const [isBorderOpen, setIsBorderOpen] = useState(false)
	const [isOpenNote, setIsOpenNote] = useState(false)

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
					/>
				}
			</Box>
		</>
	);
};

export default Layout;

// #F46267