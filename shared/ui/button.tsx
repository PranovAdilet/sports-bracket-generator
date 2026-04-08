"use client";

import * as React from "react";

import { cn } from "@/shared/lib";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "icon";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent/90 shadow-[0_8px_24px_rgba(124,58,237,0.20)]",
  secondary: "bg-white/8 text-white hover:bg-white/12 ring-1 ring-border",
  ghost: "bg-transparent text-white/90 hover:bg-white/8 ring-1 ring-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3",
  md: "h-10 px-4",
  icon: "h-9 w-9 p-0",
};

export function Button({
  className,
  variant = "secondary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

