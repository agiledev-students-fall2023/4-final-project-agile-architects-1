import React, { useEffect, useRef, useState } from "react";

const MasonryLayout = ({ images, columnCount = 3 }) => {
  const containerRef = useRef(null);
  const [columnHeights, setColumnHeights] = useState(Array(columnCount).fill(0));
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (images.length) {
      positionItems();
    }
    // Recalculate positions when the window resizes
    const handleResize = () => {
      setColumnHeights(Array(columnCount).fill(0));
      positionItems();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [images, columnCount]);

  const positionItems = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const columnWidth = containerWidth / columnCount;
    const newColumnHeights = Array(columnCount).fill(0);
    const newPositions = [];

    images.forEach((image, index) => {
      const shortestColumnIndex = newColumnHeights.indexOf(
        Math.min(...newColumnHeights)
      );
      const top = newColumnHeights[shortestColumnIndex];
      const left = shortestColumnIndex * columnWidth;

      newPositions.push({ top, left, width: columnWidth });
      newColumnHeights[shortestColumnIndex] += image.height * (columnWidth / image.width);
    });

    setPositions(newPositions);
    setColumnHeights(newColumnHeights);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: Math.max(...columnHeights),
      }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: positions[index]?.top || 0,
            left: positions[index]?.left || 0,
            width: positions[index]?.width || "auto",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <img
            src={image.src}
            alt={image.alt || ""}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              backgroundColor: "#f0f0f0", // Placeholder background
            }}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default MasonryLayout;
