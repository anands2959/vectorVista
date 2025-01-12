import { Image,  Wand2, User } from "lucide-react";
import React, { useState, useEffect } from "react";

function SideNav({ selectedIndex }) {
  const manuList = [
    {
      id: 1,
      name: "Icon",
      icon: Wand2,
    },
    {
      id: 2,
      name: "Background",
      icon: Image,
    },
    {
      id: 3,
      name: "About",
      icon: User,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0); 

  useEffect(() => {
    selectedIndex(0);
  }, []); 

  return (
    <div className="h-full py-2 lg:py-4">
      <nav className="flex lg:flex-col gap-1.5 lg:gap-1 px-2 lg:px-3">
        {manuList.map((menu, index) => (
          <button
            onClick={() => {
              setActiveIndex(index);
              selectedIndex(index);
            }}
            key={index}
            className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeIndex == index
                ? "bg-primary text-white shadow-sm dark:shadow-none"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            <menu.icon className="h-5 w-5" />
            <span className="hidden lg:inline tracking-wide">{menu.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default SideNav;
