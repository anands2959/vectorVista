import React, { useState } from 'react';
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Button } from "./ui/button";

function ColorPickerController({ color, onChange }) {
  const [savedColors, setSavedColors] = useState(() => {
    const saved = localStorage.getItem('savedColors');
    return saved ? JSON.parse(saved) : [
      '#F44336', '#FF9800', '#FFEB3B', '#4CAF50', 
      '#00BCD4', '#2196F3', '#673AB7', '#E91E63',
      '#FF5252', '#FF7043', '#9575CD', '#4FC3F7',
      '#81C784', '#4DB6AC', '#7986CB'
    ];
  });

  const addColor = (colorToSave) => {
    if (!savedColors.includes(colorToSave)) {
      const newColors = [colorToSave, ...savedColors.slice(0, 14)];
      setSavedColors(newColors);
      localStorage.setItem('savedColors', JSON.stringify(newColors));
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <HexColorPicker 
          color={color} 
          onChange={onChange}
          style={{ width: '100%', height: '200px' }}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hex</label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">#</span>
              <HexColorInput
                color={color}
                onChange={onChange}
                className="bg-transparent border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-sm w-24 text-gray-900 dark:text-gray-100"
                prefixed={false}
              />
            </div>
          </div>
          <Button 
            onClick={() => addColor(color)}
            className="bg-[#3333cc] text-white hover:bg-opacity-90 dark:hover:bg-opacity-80"
          >
            Add
          </Button>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            Saved colors
          </label>
          <div className="grid grid-cols-5 gap-2">
            {savedColors.map((savedColor, index) => (
              <button
                key={index}
                className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3333cc] dark:focus:ring-offset-gray-800"
                style={{ backgroundColor: savedColor }}
                onClick={() => onChange(savedColor)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorPickerController;
