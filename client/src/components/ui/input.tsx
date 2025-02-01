// components/ui/input.tsx
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...props}
    />
  );
}