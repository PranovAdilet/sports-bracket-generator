"use client";

import { PanZoomCanvas } from "@/shared/ui";
import { BracketConnections, MatchId } from "./connections/bracket-connections";
import { MatchNode } from "./nodes/match-node";
import { useMemo, useRef } from "react";
import { BracketSummaryCard } from "./overlays/bracket-summary-card";
import { BracketCanvasControls } from "./controls/bracket-canvas-controls";
import { TournamentBracketFormData } from "../../model/types";

type MatchModel = { id: MatchId; title: string; x: number; y: number };

type Props = {
  formData: TournamentBracketFormData;
};

export const BracketCanvas = ({ formData }: Props) => {
  const nodeRefs = useRef(new Map<MatchId, HTMLDivElement>());

  const matches = useMemo<MatchModel[]>(
    () => [
      { id: "m1", title: "Match 1", x: 360, y: 40 },
      { id: "m2", title: "Match 2", x: 360, y: 230 },
      { id: "m3", title: "Match 3", x: 360, y: 420 },
      { id: "m4", title: "Match 4", x: 360, y: 610 },
      { id: "sf1", title: "Semifinal 1", x: 760, y: 135 },
      { id: "sf2", title: "Semifinal 2", x: 760, y: 515 },
      { id: "final", title: "Final", x: 1160, y: 325 },
    ],
    [],
  );

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
          <BracketCanvasControls />
        </div>

        <PanZoomCanvas className="flex-1" grid="lines">
          <BracketSummaryCard formData={formData} />
          <BracketConnections nodeRefs={nodeRefs}>
            {matches.map((m) => (
              <MatchNode
                key={m.id}
                ref={(el) => {
                  if (el) nodeRefs.current.set(m.id, el);
                  else nodeRefs.current.delete(m.id);
                }}
                title={m.title}
                x={m.x}
                y={m.y}
              />
            ))}
          </BracketConnections>
        </PanZoomCanvas>
      </div>
    </section>
  );
};
