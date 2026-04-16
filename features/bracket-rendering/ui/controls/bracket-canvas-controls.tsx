"use client";

import { Button } from "@/shared/ui";
import { Maximize2, Minus, PlusIcon, RotateCcw } from "lucide-react";

export const BracketCanvasControls = () => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Zoom out"
        title="Zoom out"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Zoom in" title="Zoom in">
        <PlusIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Reset view"
        title="Reset view"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Fit to view"
        title="Fit to view (placeholder)"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
