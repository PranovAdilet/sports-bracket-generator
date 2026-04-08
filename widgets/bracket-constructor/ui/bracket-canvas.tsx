"use client";

import { Button, PanZoomCanvas } from "@/shared/ui";
import { MatchNode } from "./match-node";
import { Maximize2, Minus, PlusIcon, RotateCcw } from "lucide-react";

export const BracketCanvas = () => {
  return (
    <section className="flex flex-col h-full">
      <div className="flex-1 p-4 md:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[13px] text-muted-2">Preview</div>
            <div className="truncate text-[15px] font-semibold">
              Pan: drag empty space • Zoom: wheel • Reset: 0
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Zoom out"
              title="Zoom out"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Zoom in"
              title="Zoom in"
            >
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
        </div>

        <PanZoomCanvas className="flex-1" grid="lines">
          <div className="relative h-[720px] w-[1500px]">
            <MatchNode title="Match 1" x={40} y={40} />
            <MatchNode title="Match 2" x={40} y={230} />
            <MatchNode title="Match 3" x={40} y={420} />
            <MatchNode title="Match 4" x={40} y={610} />

            <MatchNode title="Semifinal 1" x={410} y={110} />
            <MatchNode title="Semifinal 2" x={410} y={390} />

            <MatchNode title="Final" x={800} y={250} />
          </div>
        </PanZoomCanvas>
      </div>
    </section>
  );
};
