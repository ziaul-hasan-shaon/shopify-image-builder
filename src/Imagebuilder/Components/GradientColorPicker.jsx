import { Button } from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";

const GradientColorPicker = ({ gradientList, setGradientList, onClose, isOpen, device }) => {
	const [color1, setColor1] = useState("#ff0000");
	const [color2, setColor2] = useState("#0000ff");
	const canvasRef = useRef(null);

	const generateGradientImage = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		canvas.width = 200;
		canvas.height = 100;

		const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
		gradient.addColorStop(0, color1);
		gradient.addColorStop(1, color2);

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		return canvas.toDataURL();
	};

	useEffect(() => {
		if (isOpen) {
			generateGradientImage();
		}
	}, [isOpen]);

	const handleSaveGradient = () => {
		const imageUrl = generateGradientImage();
		if (imageUrl) {
			setGradientList([...gradientList, imageUrl]);
			onClose();
		}
	};

	if (!isOpen) return null;

	const sketchPickerWidth = device === "mobile" ? "120px" : "150px"

	return (
		<>
			<style>
				{
					`
					.sketch-picker span div{
						border-radius: 50% !important;

					}

					.gradient-color-picker .sketch-picker {
						width: ${sketchPickerWidth} !important;
					}
					`
				}
			</style>
			<div className="gradient-color-picker" style={{ }}>
				{/* <h3>Gradient Color Picker</h3> */}

				<div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
					<div>
						<p>Pick First Color</p>
						<SketchPicker color={color1} onChange={(color) => setColor1(color.hex)} />
					</div>
					<div>
						<p>Pick Second Color</p>
						<SketchPicker color={color2} onChange={(color) => setColor2(color.hex)} />
					</div>
				</div>

				<canvas ref={canvasRef} style={{ display: "none" }}></canvas>

				<div
					style={{
						width: "100%",
						height: "100px",
						background: `linear-gradient(90deg, ${color1}, ${color2})`,
						marginBottom: "20px",
					}}
				/>

				<Button onClick={handleSaveGradient} style={{ padding: "10px 20px", cursor: "pointer", width:"100%" }}>
					Save Gradient
				</Button>
			</div>
		</>
	);
};

export default GradientColorPicker;
