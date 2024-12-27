"use client";
import React from "react";
import { useCookies } from "react-cookie";

const useDarkMode = (defaultTheme = "dark") => {
  const [theme, setTheme] = React.useState(defaultTheme);
  const [_, setCoockie] = useCookies(["theme"]);

  const setAndSaveTheame = (theme) => {
    setTheme(theme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    setCoockie("theme", theme);
  };
  const toogleTheme = () => {
    setAndSaveTheame(theme === "dark" ? "light" : "dark");
  };

  return [theme, toogleTheme];
};

export default useDarkMode;
