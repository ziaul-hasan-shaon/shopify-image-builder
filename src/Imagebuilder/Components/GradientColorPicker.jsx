import { Button } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { SketchPicker } from "react-color";

const GradientColorPicker = ({ gradientList, setGradientList, onClose }) => {
	const [color1, setColor1] = useState("#ff0000");
	const [color2, setColor2] = useState("#0000ff");
	const canvasRef = useRef(null);

	const generateGradientImage = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		// Set the canvas size
		canvas.width = 200;
		canvas.height = 100;

		// Create gradient
		const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
		gradient.addColorStop(0, color1);
		gradient.addColorStop(1, color2);

		// Fill canvas with gradient
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Convert canvas to image (data URL)
		return canvas.toDataURL();
	};

	const handleSaveGradient = () => {
		const imageUrl = generateGradientImage();
		setGradientList([...gradientList, imageUrl]);
		onClose()
	};

	return (
		<>
			<style>
				{
					`
					.sketch-picker span div{
						border-radius: 50% !important;

					}
					`
				}
			</style>
			<div className="gradient-color-picker" style={{  }}>
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
