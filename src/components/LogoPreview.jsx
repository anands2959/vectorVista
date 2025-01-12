import React, { useContext, useEffect, useRef, useState } from "react";
import UpdateStorageContext from "../context/UpdateStorageContext";
import html2canvas from "html2canvas";
import * as lucide from "lucide-react";

function LogoPreview({ downloadIcon }) {
  const { updateStorage } = useContext(UpdateStorageContext);
  const previewRef = useRef(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  // Calculate scale based on container size
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerSize = Math.min(container.clientWidth, container.clientHeight) - 32;
        const logoSize = (updateStorage?.iconSize || 280) + (updateStorage?.padding || 24) * 2;
        const newScale = Math.min(0.8, containerSize / logoSize);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateStorage]);

  useEffect(() => {
    if (downloadIcon) {
      html2canvas(previewRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "logo.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  }, [downloadIcon]);

  const {
    icon = "Smile",
    iconSize = 280,
    iconRotate = 0,
    iconColor = "#000000",
    rounded = 364,
    padding = 24,
    bgType = "solid",
    bgColor = "#ffffff",
    gradientColors = {
      start: "#4F46E5",
      end: "#9333EA",
    },
    gradientAngle = 90,
    gradientType = "linear",
    gradientPosition = {
      x: 50,
      y: 50,
    },
  } = updateStorage || {};

  const IconComponent = icon ? lucide[icon] : null;

  const getBackgroundStyle = () => {
    if (bgType === "solid") {
      return bgColor;
    }

    const { start, end } = gradientColors;
    return `linear-gradient(${gradientAngle}deg, ${start}, ${end})`;
  };

  return (
    <div ref={containerRef} className="h-full w-full flex items-center justify-center relative p-2">
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-12 h-12 border-2 border-gray-200 dark:border-gray-700 rounded-lg opacity-10"></div>
      </div>
      <div
        ref={previewRef}
        style={{
          width: `${iconSize + padding * 2}px`,
          height: `${iconSize + padding * 2}px`,
          background: getBackgroundStyle(),
          borderRadius: `${rounded}px`,
          transform: `scale(${scale})`,
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
        }}
        className="relative flex items-center justify-center hover:shadow-md"
      >
        {IconComponent && (
          <IconComponent
            style={{
              transform: `rotate(${iconRotate}deg)`,
              color: iconColor,
              width: '100%',
              height: '100%',
              padding: `${padding}px`,
              transition: 'all 0.2s ease',
            }}
          />
        )}
      </div>
    </div>
  );
}

export default LogoPreview;
