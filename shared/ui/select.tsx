"use client";

import { cn } from "@/shared/lib";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

export type Option<TValue> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

type SelectProps<TValue> = {
  options: Option<TValue>[];
  value: TValue;
  onChange?: (value: TValue) => void;
  placeholder?: string;
  className?: string;
};

export function Select<TValue>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
}: SelectProps<TValue>) {
  const [open, setOpen] = useState(false);

  const selected = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);
  return (
    <div className={cn("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between",
          "rounded-xl px-3 py-2",
          "bg-panel/70 ring-1 ring-border",
          "text-[13px]",
          "hover:bg-panel/90",
          "transition",
          "focus:outline-none focus:ring-2 focus:ring-white/10",
        )}
      >
        <span className={cn(!selected && "text-muted-2")}>
          {selected?.label || placeholder}
        </span>

        <ChevronDown
          className={cn("h-4 w-4 transition", open && "rotate-180")}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-2 w-full",
            "rounded-xl overflow-hidden",
            "bg-panel/90 backdrop-blur",
            "ring-1 ring-border",
            "shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
          )}
        >
          <div className="p-1">
            {options.map((option, index) => {
              const isActive = option.value === value;
              const isDisabled = option.disabled;

              return (
                <button
                  key={index}
                  disabled={isDisabled}
                  onClick={() => {
                    onChange?.(option.value as TValue);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg",
                    "text-[13px]",
                    "transition",
                    { "bg-white/10 text-white": isActive },
                    { "hover:bg-white/5 text-white/85": !isDisabled },
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
