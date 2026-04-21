"use client";

import { cn } from "@/shared/lib/cn";
import { usePanZoom } from "../hooks/use-pan-zoom";
import { forwardRef, ReactNode, useImperativeHandle } from "react";

type Transform = { x: number; y: number; scale: number };

export type PanZoomHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  fit: (bounds: {
    width: number;
    height: number;
    x: number;
    y: number;
  }) => void;
};

type PanZoomCanvasProps = {
  className?: string;
  children?: ReactNode;
  contentClassName?: string;
  grid?: "none" | "dots" | "lines";
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
  initialX?: number;
  initialY?: number;
  onTransformChange?: (t: Transform) => void;
};

export const PanZoomCanvas = forwardRef<PanZoomHandle, PanZoomCanvasProps>(
  ({ className, children, contentClassName, grid = "lines", ...rest }, ref) => {
    const { rootRef, gridStyle, t, zoomIn, zoomOut, reset, fit, ...handlers } =
      usePanZoom({
        ...rest,
        grid,
      });

    useImperativeHandle(ref, () => ({
      zoomIn,
      zoomOut,
      reset,
      fit,
    }));

    return (
      <div
        ref={rootRef}
        tabIndex={0}
        {...handlers}
        className={cn(
          "relative h-full w-full overflow-hidden rounded-3xl ring-1 ring-border",
          "bg-[radial-gradient(900px_500px_at_10%_0%,rgba(124,58,237,0.16),transparent_60%),radial-gradient(800px_500px_at_85%_25%,rgba(34,197,94,0.10),transparent_55%)]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
          className,
        )}
      >
        <div
          className={cn(
            "absolute inset-0 opacity-60",
            grid === "none" && "opacity-0",
          )}
          style={gridStyle}
        />

        <div
          className={cn("absolute inset-0", "touch-none")}
          aria-label="Canvas"
          role="application"
        >
          <div
            className={cn(
              "absolute left-0 top-0 will-change-transform",
              contentClassName,
            )}
            style={{
              transform: `translate3d(${t.x}px, ${t.y}px, 0) scale(${t.scale})`,
              transformOrigin: "0 0",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

PanZoomCanvas.displayName = "PanZoomCanvas";
