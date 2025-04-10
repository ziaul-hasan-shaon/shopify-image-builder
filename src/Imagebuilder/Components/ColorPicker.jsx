// import React, { useState } from "react";
import { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ setColor, color, addSVGBackgroundWithColorChange, svgContent, isPattern }) => {

	const [showBtn, setShowBtn] = useState(false)

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

					.color-picker .sketch-picker {
						width: 300px !important;
					}

					.svg-container svg{
						width: 100%;
						height: 150px;
					}
					`
				}
			</style>
			<div className="color-picker">
				<SketchPicker
					color={color}
					onChange={(updatedColor) => setColor(updatedColor.hex)}
				/>
			</div>
			{
				isPattern ? 
					<div
						onMouseEnter={() => setShowBtn(true)}
					 	style={{margin: "10px 0", border: "1px solid #E5E5E5", borderRadius: "5px", position: "relative"}}
					 >
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
							onClick={() => addSVGBackgroundWithColorChange(svgContent)}
						>
							Click To set background
						</button>
					}
					</div>
					:
					<div
						style={{
							background: color,
							width: "100%",
							height: "50px",
							marginTop: "10px",
							// border: "1px solid #000" ,
							borderRadius: "10px"
						}}
					/>
			}
		</div>
	);
};

export default ColorPicker;
