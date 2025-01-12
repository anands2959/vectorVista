import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

function Header({ downloadIcon }) {
  return (
    <header className="h-14 lg:h-16">
      <div className="h-full container mx-auto px-3 lg:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="VectorVista" 
            className="h-8 lg:h-9 w-auto dark:invert theme-transition"
          />
        </div>
        <div className="flex items-center space-x-2 lg:space-x-4">
          <ThemeToggle />
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 h-9"
            onClick={() => downloadIcon(Date.now())}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">Download Logo</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
