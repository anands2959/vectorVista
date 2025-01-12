import React, { useContext, useState, useEffect } from "react";
import { Image } from "lucide-react";
import UpdateStorageContext from "../context/UpdateStorageContext";

function FilePicker() {
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const storedValue = JSON.parse(localStorage.getItem("value")) || {};
    if (storedValue.selectedImage) {
      setSelectedImage(storedValue.selectedImage);
    }
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageBase64 = e.target.result;
        setSelectedImage(imageBase64);
        
        // Update both localStorage and context
        const storedValue = JSON.parse(localStorage.getItem("value")) || {};
        const newValue = { 
          ...storedValue, 
          selectedImage: imageBase64,
          icon: null // Clear icon when image is selected
        };
        localStorage.setItem("value", JSON.stringify(newValue));
        setUpdateStorage(newValue);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
      />
      
      {!selectedImage ? (
        <div
          onClick={handleImageClick}
          className="w-full h-28 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer bg-white dark:bg-gray-800 flex flex-col items-center justify-center gap-2 group"
        >
          <Image className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <p className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors">Click to upload</p>
          <p className="text-xs text-gray-400">PNG, JPG</p>
        </div>
      ) : (
        <div className="w-full">
          <div className="relative group">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-28 object-contain rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
            />
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              onClick={handleImageClick}
            >
              <p className="text-white text-sm">Change Image</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilePicker;
