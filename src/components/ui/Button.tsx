import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "teal" | "pink" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "teal", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-sarcelle focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
      teal: "bg-teal-sarcelle text-white hover:bg-teal-dark shadow-sm",
      pink: "bg-pink-accent text-charcoal hover:opacity-90 shadow-sm",
      outline: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-parchment",
      ghost: "text-charcoal hover:bg-charcoal/5",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 rounded",
      md: "text-sm px-5 py-2.5 rounded-md",
      lg: "text-base px-8 py-3.5 rounded-md",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
