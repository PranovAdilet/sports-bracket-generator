"use client";

import { PanZoomCanvas, PanZoomHandle } from "@/shared/ui";
import { useMemo, useRef } from "react";
import { generateMatches } from "@/features/bracket-generation";
import { BracketCanvasControls } from "@/features/bracket-rendering";
import { TournamentBracketFormData } from "../../model/types";
import { BracketSummaryCard } from "./overlays/bracket-summary-card";
import { BracketConnections } from "./connections/bracket-connections";
import { MatchNode } from "./nodes/match-node";
import { NODE_HEIGHT, NODE_WIDTH } from "@/entities/tournament";

type Props = {
  formData: TournamentBracketFormData;
};

export const BracketCanvas = ({ formData }: Props) => {
  const panZoomRef = useRef<PanZoomHandle>(null);

  const matches = useMemo(() => {
    return generateMatches(formData.bracketSize, formData.teams);
  }, [formData.bracketSize, formData.teams]);

  const canvasSize = useMemo(() => {
    const MIN_WIDTH = 1500;
    const MIN_HEIGHT = 720;
    const PADDING = 80;

    const maxX = matches.reduce(
      (acc, match) => Math.max(acc, match.position.x + NODE_WIDTH),
      0,
    );
    const maxY = matches.reduce(
      (acc, match) => Math.max(acc, match.position.y + NODE_HEIGHT),
      0,
    );
    return {
      width: Math.max(MIN_WIDTH, maxX + PADDING),
      height: Math.max(MIN_HEIGHT, maxY + PADDING),
    };
  }, [matches]);

  return (
    <section className="flex flex-col h-full">
      <div className="flex-1 p-4 md:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[13px] text-muted-2">Preview</div>
          </div>
          <BracketCanvasControls
            onZoomIn={() => panZoomRef.current?.zoomIn()}
            onZoomOut={() => panZoomRef.current?.zoomOut()}
            onReset={() => panZoomRef.current?.reset()}
            onFit={() =>
              panZoomRef.current?.fit({
                width: canvasSize.width,
                height: canvasSize.height,
                x: 0,
                y: 0,
              })
            }
          />
        </div>

        <PanZoomCanvas ref={panZoomRef} className="flex-1" grid="lines">
          <BracketSummaryCard formData={formData} />
          <BracketConnections canvasSize={canvasSize} matches={matches}>
            {matches.map((m, index) => (
              <MatchNode key={m.id} match={m} index={index + 1} />
            ))}
          </BracketConnections>
        </PanZoomCanvas>
      </div>
    </section>
  );
};
