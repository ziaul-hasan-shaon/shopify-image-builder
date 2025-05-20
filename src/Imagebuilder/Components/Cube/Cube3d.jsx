import React, { useRef, useState } from 'react';
// import cubeIMg from "../assets/Images/canvas-export@2x (11).png"
import "./Cube3D.css"

const Cube3D = ({img3d}) => {
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
        <div className="face front"><img src={img3d} alt="Front" /></div>
        <div className="face back"><img src={img3d} alt="Back" /></div>
        <div className="face right"><img src={img3d} alt="Right" /></div>
        <div className="face left"><img src={img3d} alt="Left" /></div>
        <div className="face top"><img src={img3d} alt="Top" /></div>
        <div className="face bottom"><img src={img3d} alt="Bottom" /></div>
      </div>
    </div>
  );
};

export default Cube3D;