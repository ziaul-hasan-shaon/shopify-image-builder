import React, { useRef, useState } from "react";
import "./Cube3D.css";

const Cube3D = ({ img3d, bgImage }) => {
  const cubeRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPointer, setLastPointer] = useState({ x: 0, y: 0 });

  // Utility: clamp value between min and max
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  // Mouse events
  const handlePointerDown = (x, y) => {
    setIsDragging(true);
    setLastPointer({ x, y });
  };

  const handlePointerMove = (x, y) => {
    if (!isDragging) return;
    const deltaX = x - lastPointer.x;

    setRotation((prev) => ({
      x: 0, // no vertical rotation
      y: clamp(prev.y + deltaX, -20, 20),
    }));

    setLastPointer({ x, y });
  };

  const handlePointerUp = () => setIsDragging(false);

  // Mouse handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    handlePointerDown(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    handlePointerMove(e.clientX, e.clientY);
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    handlePointerUp();
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handlePointerDown(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handlePointerMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    handlePointerUp();
  };

  return (
    <div
      className="scene"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ touchAction: "none" }} // prevent scrolling when dragging
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
        />
        <div className="face back" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="face right" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="face left" style={{ backgroundColor: " rgba(255, 255, 255, 0.2)" }} />

        {img3d && <img className="center-image" src={img3d} alt="Center Image" />}
        {img3d && <div className="shadow"></div>}
      </div>
    </div>
  );
};

export default Cube3D;
