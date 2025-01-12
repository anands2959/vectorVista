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
    <div className="h-full py-4">
      <nav className="space-y-1">
        {manuList.map((menu, index) => (
          <button
            onClick={() => {
              setActiveIndex(index);
              selectedIndex(index);
            }}
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeIndex == index
                ? "bg-[#3333cc] text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <menu.icon className="h-5 w-5" />
            {menu.name}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default SideNav;
