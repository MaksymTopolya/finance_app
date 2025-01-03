import SubmitButton from "@/app/components/submitButton";
import { logOut } from "@/utils/actions";
import { LogOut } from "lucide-react";
import React from "react";

const SignOutButton = () => {
  return (
    <form action={logOut}>
      <SubmitButton variant="ghost" size="sm">
        <LogOut className="w-6 h-6" />
      </SubmitButton>
    </form>
  );
};

export default SignOutButton;
