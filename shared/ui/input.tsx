"use client";

import * as React from "react";

import { cn } from "@/shared/lib";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "h-10 w-full rounded-xl bg-white/5 px-3 text-[13px] text-white/90 ring-1 ring-border outline-none placeholder:text-muted-2",
          "focus:ring-2 focus:ring-accent/60",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

