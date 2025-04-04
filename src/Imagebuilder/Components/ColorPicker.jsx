// import React, { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ setColor, color }) => {

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
					`
				}
			</style>
			<div className="color-picker">
				<SketchPicker
					color={color}
					onChange={(updatedColor) => setColor(updatedColor.hex)}
				/>
			</div>
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
		</div>
	);
};

export default ColorPicker;
