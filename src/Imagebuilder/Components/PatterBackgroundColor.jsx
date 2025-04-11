// import React, { useState } from "react";
import { useState } from "react";
import { SketchPicker } from "react-color";

const PatterBackgroundColor = ({ setColor, color, addSVGBackgroundWithColorChange, svgContent, setPatternBgColor,patternBgColor, onClose, isOpen }) => {

	const [showBtn, setShowBtn] = useState(false)

	console.log('svgContent', svgContent)

	if (!isOpen) return null;

	return (
		<div>
			<style>
				{
					`
					.sketch-picker span div{
						width: 20px !important;
						height: 20px !important;
						border-radius: 50% !important;

					}

					.pattern-picker .sketch-picker {
						width: 130px !important;
					}

					.svg-container svg{
						width: 100%;
						height: 150px;
					}
					`
				}
			</style>
			<div
				className="pattern-picker"
				style={{
					display: "flex",
					alignItems: "center",
					gap: "10px",

				}}
			>
				<div>
					<p>Pattern Color</p>
					<SketchPicker
						color={color}
						onChange={(updatedColor) => setColor(updatedColor.hex)}
					/>
				</div>
				<div>
					<p>Background Color</p>
					<SketchPicker
						color={patternBgColor}
						onChange={(updatedColor) => setPatternBgColor(updatedColor.hex)}
					/>
				</div>
			</div>
			<div
				onMouseEnter={() => setShowBtn(true)}
				style={{ margin: "10px 0", border: "1px solid #E5E5E5", borderRadius: "5px", position: "relative" }}
			>
				{!svgContent.includes('<parsererror') && (
				<>
					<div
						className="svg-container"
						dangerouslySetInnerHTML={{ __html: svgContent }}
					/>
					<div
					style={{
						position: "absolute",
						inset: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#000000",
						borderRadius: "5px",
						opacity: .4
					}}
				// onClick={() => addSVGBackgroundWithColorChange(svgContent)}
				/>
					{showBtn &&
						<button
							style={{
								backgroundColor: "#F46267",
								position: "absolute",
								color: "#ffffff",
								padding: "5px",
								width: "80%",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								borderRadius: "10px"
							}}
							onMouseOut={() => setShowBtn(false)}
							onClick={() => {
								addSVGBackgroundWithColorChange(svgContent);
								onClose()
							}}
						>
							Click To set background
						</button>
					}
				</>
				)}
			</div>

		</div>
	);
};

export default PatterBackgroundColor;
