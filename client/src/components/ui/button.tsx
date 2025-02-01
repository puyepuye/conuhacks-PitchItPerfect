// components/ui/button.tsx
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-all",
        variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "outline" && "border border-gray-300 text-gray-700 hover:bg-gray-100",
        variant === "ghost" && "text-gray-700 hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}