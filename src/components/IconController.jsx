import React, { useContext, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import IconList from "./IconList";
import FilePicker from "./FilePicker";
import ColorPickerController from "./ColorPickerController";
import UpdateStorageContext from "../context/UpdateStorageContext";

function IconController() {
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);
  const [size, setSize] = useState(updateStorage?.iconSize || 100);
  const [rotate, setRotate] = useState(updateStorage?.iconRotate || 0);
  const [icon, setIcon] = useState(updateStorage?.icon || "Smile");
  const [color, setColor] = useState(updateStorage?.iconColor || "#000000");

  const handleUpdate = (updates) => {
    setUpdateStorage((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleIconSelect = (selectedIcon) => {
    setIcon(selectedIcon);
    handleUpdate({ icon: selectedIcon });
  };

  const handleSizeChange = (value) => {
    setSize(value[0]);
    handleUpdate({ iconSize: value[0] });
  };

  const handleRotateChange = (value) => {
    setRotate(value[0]);
    handleUpdate({ iconRotate: value[0] });
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    handleUpdate({ iconColor: newColor });
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-6">
          Logo Designer
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 ">
              Choose Icon
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer border border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700  dark:text-gray-300 mb-3">
                  Select Icon
                </h4>
                <IconList selectedIcon={handleIconSelect} />
              </div>
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer border border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 ">
                  Upload Image
                </h4>
                <FilePicker />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Size
                </label>
                <span className="text-sm bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700 dark:text-gray-300">
                  {size}px
                </span>
              </div>
              <Slider
                defaultValue={[size]}
                value={[size]}
                max={208}
                step={1}
                onValueChange={handleSizeChange}
                className="w-full"
              />
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rotation
                </label>
                <span className="text-sm bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700 dark:text-gray-300">
                  {rotate}°
                </span>
              </div>
              <Slider
                defaultValue={[rotate]}
                value={[rotate]}
                max={360}
                step={1}
                onValueChange={handleRotateChange}
                className="w-full"
              />
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-4">
                Icon Color
              </label>
              <ColorPickerController
                color={color}
                onChange={handleColorChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IconController;
