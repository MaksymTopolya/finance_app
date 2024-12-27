import React from "react";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import useServerDarkMode from "@/hooks/useServerDarkMode";
const Header = ({ className }) => {
  const theme = useServerDarkMode("dark");
  return (
    <header className={`flex justify-between items-center mt-8 ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline unserline-offset-8 decoration-2"
      >
        FinanceApp
      </Link>

      <div className="flex space-x-4 items-center">
        <ThemeToggle defaultTheme={theme} />
        <h1>User Drop Down</h1>
      </div>
    </header>
  );
};

export default Header;
