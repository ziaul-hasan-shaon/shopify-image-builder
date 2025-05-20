import React, { useRef, useState } from 'react';
// import cubeIMg from "../assets/Images/canvas-export@2x (11).png"
import "./Cube3D.css"

const Cube3D = ({img3d, bgImage}) => {
  const cubeRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;

    setRotation(prev => ({
      x: prev.x + deltaY,
      y: prev.y + deltaX
    }));

    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
			className="scene"
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
		>
			<div
				className="cube"
				ref={cubeRef}
				style={{
					transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
				}}
			>
				{/* Cube Faces */}
				<div className="face front" style={{ backgroundImage: `url(${bgImage})` }}/>
				<div className="face back" style={{ backgroundImage: `url(${bgImage})` }}/>
				<div className="face right" style={{ backgroundImage: `url(${bgImage})` }}/>
				<div className="face left" style={{ backgroundImage: `url(${bgImage})` }}/>
				<div className="face top" style={{ backgroundImage: `url(${bgImage})` }}/>
				<div className="face bottom" style={{ backgroundImage: `url(${bgImage})` }}/>

				{/* Center Image */}
				<img className="center-image" src={img3d} alt="Center Image" />
			</div>
		</div>

  );
};

export default Cube3D;