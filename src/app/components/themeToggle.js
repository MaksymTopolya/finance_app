"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import Button from "./button";
import useDarkMode from "@/hooks/useDarkMode";

const ThemeToggle = ({ defaultTheme = "dark" }) => {
  const [theme, toogleTheme] = useDarkMode(defaultTheme);

  return (
    <Button onClick={toogleTheme} variants="ghost" sizes="sm">
      {theme === "light" ? (
        <Moon className="w-6 h-6" />
      ) : (
        <Sun className="w-6 h-6" />
      )}
    </Button>
  );
};

export default ThemeToggle;
