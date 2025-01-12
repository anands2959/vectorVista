import React, { useContext, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import ColorPickerController from "./ColorPickerController";
import UpdateStorageContext from "../context/UpdateStorageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function BackgroundController() {
  const storageValue = JSON.parse(localStorage.getItem("value")) || {};
  const [bgType, setBgType] = useState(storageValue?.bgType || 'solid');
  const [bgColor, setBgColor] = useState(storageValue?.bgColor || "#ffffff");
  const [gradientColors, setGradientColors] = useState(storageValue?.gradientColors || {
    start: "#4F46E5",
    end: "#9333EA"
  });
  const [gradientAngle, setGradientAngle] = useState(storageValue?.gradientAngle || 90);
  const [gradientType, setGradientType] = useState(storageValue?.gradientType || 'linear');
  const [gradientPosition, setGradientPosition] = useState(storageValue?.gradientPosition || {
    x: 50,
    y: 50
  });
  const [rounded, setRounded] = useState(storageValue?.rounded || 100);
  const [padding, setPadding] = useState(storageValue?.padding || 24);
  
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  const getBackgroundStyle = () => {
    if (bgType === 'solid') {
      return bgColor;
    }
    
    const { start, end } = gradientColors;
    switch (gradientType) {
      case 'linear':
        return `linear-gradient(${gradientAngle}deg, ${start}, ${end})`;
      case 'radial':
        return `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, ${start}, ${end})`;
      case 'conic':
        return `conic-gradient(from ${gradientAngle}deg at ${gradientPosition.x}% ${gradientPosition.y}%, ${start}, ${end})`;
      default:
        return `linear-gradient(${gradientAngle}deg, ${start}, ${end})`;
    }
  };

  useEffect(() => {
    const updateValue = {
      ...storageValue,
      bgType,
      bgColor,
      gradientColors,
      gradientAngle,
      gradientType,
      gradientPosition,
      rounded,
      padding,
      background: getBackgroundStyle()
    };
    setUpdateStorage(updateValue);
    localStorage.setItem("value", JSON.stringify(updateValue));
  }, [bgType, bgColor, gradientColors, gradientAngle, gradientType, gradientPosition, rounded, padding]);

  const gradientTypes = [
    { value: 'linear', label: 'Linear' },
    { value: 'radial', label: 'Radial' },
    { value: 'conic', label: 'Conic' }
  ];

  return (
    <div className="h-full bg-white dark:bg-gray-900">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Background Settings</h2>
        
        <div className="space-y-6">
          {/* Shape Controls */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Shape</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rounded Corners</label>
                  <span className="text-sm bg-white dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-600 dark:text-gray-300">
                    {rounded}px
                  </span>
                </div>
                <Slider
                  defaultValue={[rounded]}
                  value={[rounded]}
                  max={220}
                  step={1}
                  onValueChange={(value) => setRounded(value[0])}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Padding</label>
                  <span className="text-sm bg-white dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-600 dark:text-gray-300">
                    {padding}px
                  </span>
                </div>
                <Slider
                  defaultValue={[padding]}
                  value={[padding]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setPadding(value[0])}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Background Type Tabs */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <Tabs defaultValue={bgType} className="w-full" onValueChange={(value) => setBgType(value)}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="solid">Solid Color</TabsTrigger>
                <TabsTrigger value="gradient">Gradient</TabsTrigger>
              </TabsList>
              
              <TabsContent value="solid" className="mt-0">
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                    Background Color
                  </label>
                  <ColorPickerController
                    color={bgColor}
                    onChange={(color) => setBgColor(color)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="gradient" className="mt-0">
                <div className="space-y-6">
                  {/* Gradient Type Selector */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                      Gradient Type
                    </label>
                    <Select value={gradientType} onValueChange={setGradientType} >
                      <SelectTrigger className='dark:text-gray-300 dark:border-gray-600'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent >
                        {gradientTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Position Controls - For Radial and Conic */}
                  {(gradientType === 'radial' || gradientType === 'conic') && (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Center X</label>
                          <span className="text-sm bg-white dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-600 dark:text-gray-300">
                            {gradientPosition.x}%
                          </span>
                        </div>
                        <Slider
                          defaultValue={[gradientPosition.x]}
                          value={[gradientPosition.x]}
                          max={100}
                          step={1}
                          onValueChange={(value) => setGradientPosition(prev => ({...prev, x: value[0]}))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Center Y</label>
                          <span className="text-sm bg-white dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-600 dark:text-gray-300">
                            {gradientPosition.y}%
                          </span>
                        </div>
                        <Slider
                          defaultValue={[gradientPosition.y]}
                          value={[gradientPosition.y]}
                          max={100}
                          step={1}
                          onValueChange={(value) => setGradientPosition(prev => ({...prev, y: value[0]}))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-3">
                      Start Color
                    </label>
                    <ColorPickerController
                      color={gradientColors.start}
                      onChange={(color) => setGradientColors(prev => ({...prev, start: color}))}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-3">
                      End Color
                    </label>
                    <ColorPickerController
                      color={gradientColors.end}
                      onChange={(color) => setGradientColors(prev => ({...prev, end: color}))}
                    />
                  </div>

                  {/* Angle Control - Only for Linear and Conic */}
                  {(gradientType === 'linear' || gradientType === 'conic') && (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {gradientType === 'linear' ? 'Angle' : 'Rotation'}
                        </label>
                        <span className="text-sm bg-white dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-600 dark:text-gray-300">
                          {gradientAngle}°
                        </span>
                      </div>
                      <Slider
                        defaultValue={[gradientAngle]}
                        value={[gradientAngle]}
                        max={360}
                        step={1}
                        onValueChange={(value) => setGradientAngle(value[0])}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackgroundController;
