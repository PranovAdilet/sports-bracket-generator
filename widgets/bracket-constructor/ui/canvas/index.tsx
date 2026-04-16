"use client";

import { PanZoomCanvas } from "@/shared/ui";
import { useMemo } from "react";
import { generateMatches } from "@/features/bracket-generation";
import { BracketCanvasControls } from "@/features/bracket-rendering";
import { TournamentBracketFormData } from "../../model/types";
import { BracketSummaryCard } from "./overlays/bracket-summary-card";
import { BracketConnections } from "./connections/bracket-connections";
import { MatchNode } from "./nodes/match-node";

type Props = {
  formData: TournamentBracketFormData;
};

export const BracketCanvas = ({ formData }: Props) => {
  const matches = useMemo(() => {
    return generateMatches(formData.bracketSize, formData.teams);
  }, [formData.bracketSize, formData.teams]);

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
          <BracketConnections matches={matches}>
            {matches.map((m, index) => (
              <MatchNode key={m.id} match={m} index={index + 1} />
            ))}
          </BracketConnections>
        </PanZoomCanvas>
      </div>
    </section>
  );
};
