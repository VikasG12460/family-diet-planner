import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-emerald-600 text-white hover:bg-emerald-700",
      outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };