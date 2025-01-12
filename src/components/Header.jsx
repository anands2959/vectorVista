import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

function Header({ downloadIcon }) {
  return (
    <header className="h-16 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 theme-transition">
      <div className="h-full container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="VectorVista" 
            className="h-10 w-auto dark:invert theme-transition"
          />
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button
            size="sm"
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white flex items-center gap-2"
            onClick={() => downloadIcon(Date.now())}
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
