// canvasUtils.js

export const degToRad = angle => (angle / 180) * Math.PI;

export const getClientRect = (item) => {
  const { x, y, width, height, rotation = 0 } = item;
  const rad = degToRad(rotation);

  const corners = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ];

  const rotated = corners.map(({ x: cx, y: cy }) => {
    const dx = cx;
    const dy = cy;
    return {
      x: x + dx * Math.cos(rad) - dy * Math.sin(rad),
      y: y + dx * Math.sin(rad) + dy * Math.cos(rad),
    };
  });

  const xs = rotated.map(p => p.x);
  const ys = rotated.map(p => p.y);

  return {
    x: Math.min(...xs),
    y: Math.min(...ys),
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys),
  };
};

export const calculateSelection = (rectangles, selBox) => {
  return rectangles.filter(item =>
    window.Konva.Util.haveIntersection(selBox, getClientRect(item))
  );
};
