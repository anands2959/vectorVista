import React, { useEffect, useState, useContext } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import * as lucide from "lucide-react";
import iconList from "../constants/icons";
import { useTheme } from "./theme-provider";
import UpdateStorageContext from "../context/UpdateStorageContext";

function IconList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentIcon, setCurrentIcon] = useState("Smile");
  const { theme } = useTheme();
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const storedValue = JSON.parse(localStorage.getItem("value")) || {};
    if (storedValue?.icon) {
      setCurrentIcon(storedValue.icon);
    }
  }, []);

  const handleIconSelect = (iconName) => {
    setCurrentIcon(iconName);
    const storedValue = JSON.parse(localStorage.getItem("value")) || {};
    const newValue = { 
      ...storedValue, 
      icon: iconName,
      selectedImage: null // Clear selected image when icon is chosen
    };
    localStorage.setItem("value", JSON.stringify(newValue));
    setUpdateStorage(newValue);
    setOpenDialog(false);
  };

  const renderIcon = (name, size = 40) => {
    const LucideIcon = lucide[name];
    return LucideIcon ? (
      <LucideIcon
        color={theme === "dark" ? "#ffffff" : "#000000"}
        size={size}
      />
    ) : null;
  };

  return (
    <>
      <div
        onClick={() => setOpenDialog(true)}
        className="flex p-3 cursor-pointer bg-gray-200 dark:bg-gray-700 my-2 rounded-md w-[80px] h-[80px] items-center justify-center hover:bg-[#3333cc] hover:text-white dark:hover:bg-[#3333cc] duration-300"
      >
        {renderIcon(currentIcon)}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog} className="dark:text-gray-300">
        <DialogContent className="max-w-4xl bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-4 dark:text-white">Choose an Icon</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 p-4 max-h-[60vh] overflow-y-auto">
            {iconList.map((name, index) => (
              <div
                key={index}
                onClick={() => handleIconSelect(name)}
                className="aspect-square flex items-center justify-center p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                {renderIcon(name, 24)}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default IconList;
