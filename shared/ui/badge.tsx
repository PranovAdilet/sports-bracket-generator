"use client";

import * as React from "react";

import { cn } from "@/shared/lib";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-white/6 px-2 py-1 text-[11px] font-medium text-white/85 ring-1 ring-border",
        className,
      )}
      {...props}
    />
  );
}

