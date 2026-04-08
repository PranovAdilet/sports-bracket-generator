"use client";

import { Frame, GitBranch, Play, Settings2 } from "lucide-react";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";

export const Header = ({ className }: { className?: string }) => {
  return (
    <header
      className={cn(
        "px-3 md:px-5 py-3 border-b border-border bg-panel/70 backdrop-blur supports-[backdrop-filter]:bg-panel/50",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-border">
            <Frame className="h-5 w-5 text-white/90" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-[13px] text-muted-2">
              Sports bracket generation
            </div>
            <h1 className="truncate text-[15px] font-semibold leading-5">
              Bracket Constructor
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            <Settings2 className="h-4 w-4" />
            Settings
          </Button>
          <Button variant="primary" size="sm">
            <Play className="h-4 w-4" />
            Preview
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="GitHub"
            title="GitHub"
          >
            <GitBranch className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
