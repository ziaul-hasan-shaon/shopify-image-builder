import React, { useRef, useState } from "react";
import "./Cube3D.css";

const Cube3D = ({ img3d, bgImage }) => {
  const cubeRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  // Utility: clamp value between min and max
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMouse.x;

    setRotation((prev) => ({
      x: 0, // always zero vertical rotation
      y: clamp(prev.y + deltaX, -20, 20),
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
          transform: `rotateX(0deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div
          className="face front"
          style={{ backgroundColor: " rgba(187, 187, 187, 0.2)" }}
          // style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="face back" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="face right" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="face left" style={{ backgroundColor: " rgba(255, 255, 255, 0.2)" }} />
        {/* <div className="face top" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="face bottom" style={{ backgroundImage: `url(${bgImage})` }} /> */}

        {
					img3d && <img className="center-image" src={img3d} alt="Center Image" />
				}
				{/* Floating shadow */}
				{
					img3d && <div className="shadow"></div>
				}
      </div>
    </div>
  );
};

export default Cube3D;
