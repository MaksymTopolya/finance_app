import React from "react";
import Link from "next/link";
import ThemeToggle from "@/app/components/themeToggle";
import useServerDarkMode from "@/hooks/useServerDarkMode";
import { createClient } from "@/utils/supabase/server";
import Button from "@/app/components/button";
import { CircleUser, KeyRound } from "lucide-react";
import SignOutButton from "./signOutButton";
import { variants, sizes } from "@/utils/variants";
const Header = async ({ className }) => {
  const theme = useServerDarkMode("dark");
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return (
    <header className={`flex justify-between items-center mt-8 ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline unserline-offset-8 decoration-2"
      >
        FinanceApp
      </Link>

      <div className="flex items-center space-x-2">
        <ThemeToggle defaultTheme={theme} />
        {user && (
          <Link href="/dashboard/settings">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
            >
              <CircleUser className="w-6 h-6" />
              <span>{user?.email}</span>
            </Button>
          </Link>
        )}
        {user && <SignOutButton />}
        {!user && (
          <Link href="/login" className={`${variants["ghost"]} ${sizes["sm"]}`}>
            <KeyRound className="w-6 h-6" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
