"use client";

import { Button } from "@/shared/ui";
import { Maximize2, Minus, PlusIcon, RotateCcw } from "lucide-react";

type Props = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFit: () => void;
};

export const BracketCanvasControls = ({
  onFit,
  onReset,
  onZoomIn,
  onZoomOut,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Zoom out"
        title="Zoom out"
        onClick={onZoomOut}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Zoom in"
        title="Zoom in"
        onClick={onZoomIn}
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Reset view"
        title="Reset view"
        onClick={onReset}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Fit to view"
        title="Fit to view (placeholder)"
        onClick={onFit}
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
