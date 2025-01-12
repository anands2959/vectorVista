import React from "react";
import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="transition-colors duration-200 border rounded-md w-9 h-9 flex items-center justify-center hover:bg-accent hover:text-accent-foreground dark:border-gray-800"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100 dark:text-gray-300 " />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeToggle;
