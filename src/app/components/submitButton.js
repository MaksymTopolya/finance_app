"use client";
import Button from "./button";
import { Loader } from "lucide-react";
export default function SubmitButton({ isPending, children, ...props }) {
  return (
    <Button
      {...props}
      className={`${props.className} flex items-center justify-center space-x-2`}
      disabled={isPending}
    >
      {isPending && <Loader className="animate-spin w-4 h-4" />}
      <span>{children}</span>
    </Button>
  );
}
