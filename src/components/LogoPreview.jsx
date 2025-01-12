import React, { useContext, useEffect, useRef } from "react";
import UpdateStorageContext from "../context/UpdateStorageContext";
import html2canvas from "html2canvas";
import * as lucide from "lucide-react";

function LogoPreview({ downloadIcon }) {
  const { updateStorage } = useContext(UpdateStorageContext);
  const previewRef = useRef(null);

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
    selectedImage,
  } = updateStorage || JSON.parse(localStorage.getItem("value")) || {};

  const IconComponent = icon ? lucide[icon] : null;

  const getBackgroundStyle = () => {
    if (bgType === "solid") {
      return bgColor;
    }

    const { start, end } = gradientColors;
    switch (gradientType) {
      case "linear":
        return `linear-gradient(${gradientAngle}deg, ${start}, ${end})`;
      case "radial":
        return `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, ${start}, ${end})`;
      case "conic":
        return `conic-gradient(from ${gradientAngle}deg at ${gradientPosition.x}% ${gradientPosition.y}%, ${start}, ${end})`;
      default:
        return `linear-gradient(${gradientAngle}deg, ${start}, ${end})`;
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#f8f9fb] dark:bg-gray-800 rounded-lg border dark:border-gray-700">
      <div
        ref={previewRef}
        className="relative flex items-center justify-center"
        style={{
          width: iconSize * 2,
          height: iconSize * 2,
          background: getBackgroundStyle(),
          borderRadius: `${rounded}px`,
          padding: `${padding}px`,
        }}
      >
        {IconComponent && !selectedImage ? (
          <IconComponent
            style={{
              width: "100%",
              height: "100%",
              color: iconColor,
              transform: `rotate(${iconRotate}deg)`,
            }}
          />
        ) : selectedImage ? (
          <img
            src={selectedImage}
            alt="Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: `rotate(${iconRotate}deg)`,
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default LogoPreview;
